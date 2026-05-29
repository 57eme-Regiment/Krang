import axios from 'axios';
import * as cheerio from 'cheerio';
import { createItemSchema, Faction, CategorySchema, SuperClassSchema, ClassSchema } from '@57eme-regiment/krang-api-contract';
import type { CreateItem } from '@57eme-regiment/krang-api-contract';
import { type ApiClient } from './api.js';

const get = (url: string) => {
	return axios.get(url, {
		headers: {
			'User-Agent': 'Scrapper Bot/1.0',
		},
	});
};

const getAllPageTitles = async (): Promise<string[]> => {
	let continueToken = '';
	const titles: string[] = [];

	while (true) {
		let url = `https://foxhole.wiki.gg/api.php?action=query&list=allpages&aplimit=500&apfilterredir=nonredirects&format=json`;
		if (continueToken) {
			url += `&apcontinue=${encodeURIComponent(continueToken)}`;
		}

		try {
			const response = await get(url);
			const data = response.data;
			
			if (data.query && data.query.allpages) {
				const batch = data.query.allpages.map((p: any) => p.title);
				titles.push(...batch);
			}
			
			if (data.continue && data.continue.apcontinue) {
				continueToken = data.continue.apcontinue;
				console.log(`Next page titles batch...`);
			} else {
				console.log('No more pages to fetch.');
				break;
			}
		} catch (error: any) {
			console.error('Error fetching from Wiki API:', error.message);
			break;
		}
	}

	console.log(`Total titles collected: ${titles.length}`);
	return titles;
};

const transformUrl = (url: string): string => {
	const regex = /File:([^/?#]+)/;
	const match = url.match(regex);

	const filename = match ? match[1] : null;
	return filename ? `https://foxhole.wiki.gg/images/${filename}` : '';
};

// const className: Set<string> = new Set();
// const superClassName: Set<string> = new Set();
// const categoryName: Set<string> = new Set();

const getItemInfo = async (title: string) => {
	// let isundef = false;
	while(true) {
		try {
			const url = `https://foxhole.wiki.gg/api.php?action=parse&page=${encodeURIComponent(title)}&prop=text&format=json`;
			const response = await get(url);
			
			if (response.data.error) {
				return undefined;
			}
			
			if (!response.data.parse || !response.data.parse.text || !response.data.parse.text['*']) {
				return undefined;
			}
	
			const html = response.data.parse.text['*'];
			const $ = cheerio.load(html);
			const infoBox = $('aside.portable-infobox');
			
			if (infoBox.length === 0) return undefined;
	
			const itemName = infoBox.children().first().text();
			const faction = infoBox.hasClass("pi-theme-War") ? Faction.WARDEN : infoBox.hasClass("pi-theme-Col") ? Faction.COLONIAL : Faction.NEUTRAL;
			const itemImageUrl = infoBox
				.children()
				.find('a.image')
				.attr('href') || '';
				
			const chassisText = infoBox
				.find('div[data-source="ChassisName"]')
				.children()
				.first()
				.text();
			const chassis = infoBox
				.find('div[data-source="ChassisName"]')
				.children()
				.last()
				.text();
			const typeText = infoBox
				.find('div[data-source="type"]')
				.children()
				.first()
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
				.text().toUpperCase().trim().replace(/-|&|\/| /g, '_');
			const disableThreshold = infoBox
				.find('div[data-source="disable"]')
				.children()
				.last()
				.text();
				
			let category;
			let superClass;
			let class_;
			
			const rawChassis = chassis.toUpperCase().trim().replace(/-|&|\/| /g, '_') || '';
			const rawType = type.toUpperCase().trim().replace(/-|&|\/| /g, '_') || '';

			const superClassRaw = chassisText === "Super Class" ? rawChassis : typeText === "Super Class" ? rawType : 'NONE';
			// superClassName.add(superClassRaw);

			const classRaw = chassisText === "Class" ? rawChassis : typeText === "Class" ? rawType : 'NONE';
			// className.add(classRaw);

			try {
				if (categoryRaw === "" && disableThreshold !== "")
					category = CategorySchema.parse(`VEHICLE`);
				else
					category = CategorySchema.parse(categoryRaw);
			} catch (e) {
				console.error(`Error parsing category (${categoryRaw}) for ${title}`);
				return undefined;
				// isundef = true;
			}
			
			try {
				superClass = SuperClassSchema.parse(superClassRaw);
			} catch (e) {
				console.error(`Error parsing super class (${superClassRaw}) for ${title}`);
				return undefined;
				// isundef = true;
			}
			
			try {
				class_ = ClassSchema.parse(classRaw);
			} catch (e) {
				console.error(`Error parsing class (${classRaw}) for ${title}`);
				return undefined;
				// isundef = true;
			}

			// if (isundef) return undefined;
			
			const maxQuantity = categoryRaw === "MATERIAL" && (superClassRaw === "LIQUID" || superClassRaw === "LARGE_MATERIAL") ? 100 : 300;
			
			const itemInfo: CreateItem = {
				name: itemName,
				shortName: undefined,
				category: category!,
				superClass: superClass!,
				class: class_!,
				faction: faction,
				nbByCrate: parseInt(crateAmount) || 0,
				maxQuantity: maxQuantity,
				icon: transformUrl(itemImageUrl),
				attributes: {},
			};
	
			return itemInfo;
		} catch (e: any) {
			// the API has a rate limit that we hit about ~120 requests every minute.
			// with this loop, it will eventually finish but it'll take time.
			console.error(`Error fetching item info for ${title}:`, e.message, `Retrying in 10 seconds...`);
			await sleep(10000);
		}
	}
};

export async function scrapWikiV2(api: ApiClient) {
	let titles: string[] = [];
	try {
		titles = await getAllPageTitles();
	} catch (e) {
		console.error('Error fetching titles:', e);
		return;
	}

	
	const total = titles.length;
	for (let i = 0; i < total; i++) {
		const title = titles[i];
		if (!title) continue;
		const itemInfo = await getItemInfo(title!);
		if (itemInfo) {
			console.log(`[${i + 1}/${total}] Processing ${title}...`);
			try {
				const parsedItem = createItemSchema.parse(itemInfo);
				await api.item.upsert({
					body: parsedItem,
				})
			} catch (e) {
				console.error(`Validation error for ${title}:`, e);
			}
		} else {
			console.error(`[${i + 1}/${total}] Ignoring ${title}.`);
		}
		// Delay still helpful to avoid overloading their API, but usually 50ms-100ms is perfectly fine here.
		// await sleep(50);
	}

	// for (const category of categoryName) {
	// 	console.log(`Unknown category: ${category}`);
	// }

	// for (const superClass of superClassName) {
	// 	console.log(`Unknown super class: ${superClass}`);
	// }

	// for (const class_ of className) {
	// 	console.log(`Unknown class: ${class_}`);
	// }


}

function sleep(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
