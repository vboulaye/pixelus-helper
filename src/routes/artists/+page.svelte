<script lang="ts">

	import TextInput from '../TextInput.svelte';
	import { submitOnInput } from '../submitOnInput';

	const { data } = $props();
	let languages = $state(data.languages);
	let template = $derived(data.template);

	let templateLength = $state(10); // valeur par défaut
	$effect(() => {
		template = '.'.repeat(templateLength);
	});

</script>

<h4>Query</h4>
<form>

	<div>

		<TextInput name="wordLength"
							 label="word length"
							 style="width: 30rem;"
							 type="range" min="1" max="30" bind:value={templateLength} />
		{templateLength}
	</div>

	<TextInput name="template"
						 label="searched word"
						 bind:value={template}
						 pattern="[a-z.]*"
						 placeholder="the word to search with . for missing characters"
	/>
	<TextInput name="exclusions"
						 label="excluded letters"
						 bind:value={data.exclusions}
						 pattern="[a-z]*"
						 placeholder="excluded letters"
	/>
	<TextInput name="includes"
						 label="included letters"
						 bind:value={data.includes}
						 pattern="[a-z]*"
						 placeholder="included letters"
	/>

	<input
		id="languages"
		type="hidden"
		bind:value={languages}
		placeholder="includes letters"
		name="languages"
	/>

	<input type="submit" value="search" onclick={submitOnInput} />
</form>

<h4>Words</h4>

<div class="word" style:column-width="{data.template.length}rem">
	{#each data.words as word(word)}
		<div>{word}</div>
	{/each}
</div>

<style>
    .word {
        font-family: monospace;
    }
</style>
