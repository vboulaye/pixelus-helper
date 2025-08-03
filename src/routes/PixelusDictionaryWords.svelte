<script lang="ts">

	import { getMatchingWordsRemote } from './dictionary.remote';

	const { game } = $props();
	const words = $derived(await getMatchingWordsRemote(game));
</script>


<h4>{words.length} Words</h4>

<div class="word" style:column-width="{game.template.length}rem">
	{#each words as word(word)}
		<div>{word}</div>
	{/each}
</div>


<style>
    .word {
        font-family: monospace;
    }
</style>
