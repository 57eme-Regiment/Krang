import 'dotenv/config';
import axios from 'axios';
import * as cheerio from 'cheerio';
import * as crypto from 'crypto';
import { createApiClient } from './src/api.js';
import { scrapLocations } from './src/locations.js';
import { scrapRegions } from './src/regions.js';
import { scrapTowns } from './src/towns.js';

interface ItemInfo {
  itemName: string;
  itemImageUrl: string;
  className: string;
  superClassName: string;
  AmountPerCrate: number;
}

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

const getItemInfo = async (url: string) => {
  try {
    const response = await get('https://foxhole.wiki.gg' + url);
    const $ = cheerio.load(response.data);
    const infoBox = $('aside.portable-infobox');
    if (infoBox.length === 0) return undefined;
    //<div class="pi-item pi-data pi-item-spacing pi-border-color" data-source="ChassisName">
    const itemName = infoBox.children().first().text();
    const itemImageUrl = infoBox.children().find('a.image').attr('href') || '';
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
    const itemInfo: ItemInfo = {
      itemName,
      itemImageUrl,
      className: chassis ? chassis : type,
      superClassName: chassis ? type : '',
      AmountPerCrate: parseInt(crateAmount) || 0,
    };
    console.log(itemInfo);
  } catch (e) {
    console.error(`Error fetching item info for ${url}:`, e);
  }
};

// const getAllItems = async () => {
// 	const urls = await getAllUrls();

// 	// aside.portable-infobox

// 	for (const url of urls) {
// 		await getItemInfo(url);
// 	}
// }

const generateHash = (str: string): string => {
  return crypto.createHash('sha256').update(str).digest('hex');
};

class Scraper {
  url: string;
  constructor(url: string) {
    this.url = url;
  }
}

async function scrapeWiki() {
  const url = 'https://foxhole.wiki.gg/';

  // betterWay(url);

  getItemInfo('/wiki/BMS_-_Packmule_Flatbed');
  getItemInfo('/wiki/Vehicles#Railway_Vehicles-0');
  getItemInfo('/wiki/.44');
  // const urls = await getAllUrls();
}

async function main() {
  const api = createApiClient(process.env.API_BASE_URL ?? 'http://localhost:3000');

  const regions = await scrapRegions(api);
  await scrapTowns(api, regions);
  await scrapLocations(api, regions);
}

main();
