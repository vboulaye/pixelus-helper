import type { PageServerLoad } from './$types';
import { PixelusArtistGame } from './PixelusArtistGame.svelte';


const cache = new Map<string, string[]>();

async function getWords(lang: string, fetchFunction: typeof fetch): Promise<string[]> {
	let dictionaryWords = cache.get(lang);
	if (!dictionaryWords) {
		const langResponse = await fetchFunction(`artists.txt`);
		if (!langResponse.ok) {
			throw new Error(`Failed to fetch dictionary for ${lang}: ${langResponse.statusText}`);
		}
		let wordsList = await langResponse.text();
		wordsList = wordsList?.toLowerCase() || '';
		dictionaryWords = wordsList
			.split('\n')
			.filter((w) => !w.includes("'"))
			//transliterate accentuated caracters
			.map((w) => w.normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
		//keep distinct words
		dictionaryWords = [...new Set(dictionaryWords)];
		cache.set(lang, dictionaryWords || []);
	}
	if (!dictionaryWords) {
		throw new Error('No dictionary words found');
	}
	return dictionaryWords;
}

export const load: PageServerLoad = async ({ url, fetch }) => {
	const game = PixelusArtistGame.fromURL(url);
	const dictionaries = await Promise.all(
		game.languages
			.split(/ *, */)
			.map(async (lang) => await getWords(lang.trim(), fetch))
	);

	const dictionaryWords = dictionaries.flatMap((x) => x).toSorted((a, b) => a.localeCompare(b));
	// console.log('dictionaries', dictionaryWords);

	const words = dictionaryWords.filter(
		(word:string) =>
			word.length === game.template.length &&
			word.match(game.template) &&
			[...game.exclusions].filter((letter) => word.includes(letter)).length === 0 &&
			[...game.includes].filter((letter) => word.includes(letter)).length === game.includes.length
	);

	const uniqueWords = [...new Set(words)].sort((a, b) => a.localeCompare(b));
	console.log('uniqueWords', uniqueWords.length, {game});
	return {
		...game,
		words: uniqueWords
	};
};
