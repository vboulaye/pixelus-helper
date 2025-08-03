import { query } from '$app/server';
import { getMatchingWords } from './dictionary';
import { PixelusGameSchema } from './PixelusGame.svelte';

export const getMatchingWordsRemote = query(PixelusGameSchema, async (game) => {
	const uniqueWords = await getMatchingWords(game, fetch);
	return uniqueWords;
});