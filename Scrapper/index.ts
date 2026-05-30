import 'dotenv/config';
import { createApiClient } from './src/api.js';
import { scrapLocations } from './src/locations.js';
import { scrapRegions } from './src/regions.js';
import { scrapTowns } from './src/towns.js';
import { scrapWiki } from './src/wiki.js';


async function main() {
	const api = createApiClient(process.env.API_BASE_URL ?? 'http://localhost:3000');

	const regions = await scrapRegions(api);
	await scrapTowns(api, regions);
	await scrapLocations(api, regions);
	await scrapWiki(api);
}

main();
