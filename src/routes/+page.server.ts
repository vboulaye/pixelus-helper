import type { PageLoad } from './$types';
import fs from 'fs';
import util from 'util';

const readFilePromise = util.promisify(fs.readFile);

const cache = new Map<string, string[]>();

export const load: PageLoad = async ({ url }) => {
	// redirect(302, '/products')
	const template = url.searchParams.get('template') || '';
	const exclusions = url.searchParams.get('exclusions') || '';
	const includes = url.searchParams.get('includes') || '';

	const file = '/usr/share/dict/british-english'; //path.join(__dirname, 'file.txt');
	let ductionarywords = cache.get(file);
	if (!ductionarywords) {
		let wordsList = await readFilePromise(file, 'utf8');
		wordsList = wordsList?.toLowerCase() || '';
		ductionarywords = wordsList.split('\n').filter((w) => !w.includes("'"));
		cache.set(file, ductionarywords);
	}
	console.log('template', template);
	const words = ductionarywords.filter(
		(word) =>
			word.length === template.length &&
			word.match(template) &&
			[...exclusions].filter((letter) => word.includes(letter)).length === 0 &&
			[...includes].filter((letter) => word.includes(letter)).length === includes.length
	);
	return {
		template,exclusions, includes,
		words
	};
};
