import axios from 'axios';
import * as cheerio from 'cheerio';
// import * as crypto from 'crypto';
import { createItemSchema, Faction, CategorySchema, SuperClassSchema, ClassSchema } from '@57eme-regiment/krang-api-contract';
import type { CreateItem } from '@57eme-regiment/krang-api-contract';
import { createApiClient, type ApiClient } from '../src/api.js';

const get = (url: string) => {
	return axios.get(url, {
		headers: {
			'User-Agent': 'Scrapper Bot/1.0',
		},
	});
};

const parseSpecialPage = (
	$: cheerio.CheerioAPI,
): [string[], string | undefined] => {
	const pageUrls: string[] = [];

	const nav = $('div.mw-allpages-nav');
	const nextPageLink =
		nav.children().last().text().includes('Next page') === false
			? undefined
			: nav.children().last().attr('href');

	const pageList = $('ul.mw-allpages-chunk');
	pageList.children().each((index, element) => {
		const pageUrl = $(element).find('a').attr('href');
		if (pageUrl) {
			pageUrls.push(pageUrl);
		} else {
			console.warn(
				`No href found for element at index ${index} : ${$(element).text()}`,
			);
		}
	});
	return [pageUrls, nextPageLink];
};

const getAllUrls = async (): Promise<string[]> => {
	let url = 'https://foxhole.wiki.gg/wiki/Special:AllPages?hideredirects=1';
	const urls: string[] = [];

	while (url) {
		try {
			const response = await get(url);
			const $ = cheerio.load(response.data);
			const [pageUrls, nextPageLink] = parseSpecialPage($);
			// console.log(`Scraped ${pageUrls.length} URLs from ${url}`);
			urls.push(...pageUrls);
			if (nextPageLink) {
				url = 'https://foxhole.wiki.gg' + nextPageLink;
				console.log(`Next page: ${url}`);
			} else {
				url = '';
				console.log('No more pages to scrape.');
			}
		} catch (error) {
			console.error('Error scraping the wiki:', error);
			break;
		}
	}

	console.log(`Total URLs collected: ${urls.length}`);
	return urls;
};

const transformUrl = (url: string): string => {
	const regex = /File:([^/?#]+)/;
	const match = url.match(regex);

	const filename = match ? match[1] : null;
	return "https://foxhole.wiki.gg/images/" + filename;
}

const getItemInfo = async (url: string) => {
	try {
		const response = await get('https://foxhole.wiki.gg' + url);
		const $ = cheerio.load(response.data);
		const infoBox = $('aside.portable-infobox');
		if (infoBox.length === 0) return undefined;
		//<div class="pi-item pi-data pi-item-spacing pi-border-color" data-source="ChassisName">
		const itemName = infoBox.children().first().text();
		const faction = infoBox.hasClass("pi-theme-War") ? Faction.WARDEN : infoBox.hasClass("pi-theme-Col") ? Faction.COLONIAL : Faction.NEUTRAL;
		const itemImageUrl = infoBox
		.children()
		.find('a.image')
		.attr('href') || '';
		const chassis = infoBox
			.find('div[data-source="ChassisName"]')
			.children()
			.last()
			.text();
		const type = infoBox
			.find('div[data-source="type"]')
			.children()
			.last()
			.text();
		const crateAmount = infoBox
			.find('div[data-source="crate_amount"]')
			.children()
			.last()
			.text();
		const categoryRaw = infoBox
			.find('div[data-source="category"]')
			.children()
			.last()
			.text().toUpperCase().replace(/ /g, '_');
		const category = CategorySchema.parse(categoryRaw);
		
		const superClassRaw = chassis ? type.toUpperCase().replace(/ /g, '_') : '';
		const superClass = SuperClassSchema.parse(superClassRaw);
		
		const classRaw = chassis ? chassis.toUpperCase().replace(/ /g, '_') : type.toUpperCase().replace(/ /g, '_');
		const class_ = ClassSchema.parse(classRaw);
		
		const maxQuantity = categoryRaw === "MATERIAL" && (superClassRaw === "LIQUID" || superClassRaw === "LARGE_MATERIAL") ? 100 : 300; // TODO
		const itemInfo: CreateItem = {
			name: itemName,
			shortName: undefined,
			// TODO : ask AI to see how to do it better
			category: category,
			superClass: superClass,
			class: class_,
			faction: faction,
			nbByCrate: parseInt(crateAmount) || 0,
			maxQuantity: maxQuantity,
			icon: transformUrl(itemImageUrl),
			attributes: {},
		};
		// console.log(itemInfo);
		return itemInfo;
	} catch (e) {
		// console.error(`Error fetching item info for ${url}:`, e);
		return undefined;
	}
};

// const getAllItems = async () => {
// 	const urls = await getAllUrls();

// 	// aside.portable-infobox

// 	for (const url of urls) {
// 		await getItemInfo(url);
// 	}
// }

// const generateHash = (str: string): string => {
// 	return crypto.createHash('sha256').update(str).digest('hex');
// };


export async function scrapeWiki(api: ApiClient) {
	// const baseurl = 'https://foxhole.wiki.gg/';

	const urls = await getAllUrls();

	for (const url of urls) {
		const itemInfo = await getItemInfo(url);
		if (itemInfo) {
			try {
				const parsedItem = createItemSchema.parse(itemInfo);
				await api.item.create({
					body: parsedItem,
				});
			} catch (e) {
				console.error(`Validation error for ${url}:`, e);
			}
		}
	}

	// try {
	// 	const toto = await getItemInfo('/wiki/.44');
	// 	const a = createItemSchema.parse(toto);
	// 	await api.item.create({ // #TODO : change to upsert when the endpoint will be ready
	// 		body: a
	// 	});
	// } catch (e) {
	// 	console.error('Validation error:', e);
	// }

	// betterWay(url);

	// getItemInfo('/wiki/BMS_-_Packmule_Flatbed');
	// getItemInfo('/wiki/Vehicles#Railway_Vehicles-0');
	// getItemInfo('/wiki/.44');
	// const urls = await getAllUrls();
}