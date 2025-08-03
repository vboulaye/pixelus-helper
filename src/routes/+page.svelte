<script lang="ts">

	import LanguageSelection from './LanguageSelection.svelte';
	import TextInput from './TextInput.svelte';
	import { submitOnInput } from './submitOnInput';
	import { PixelusGameSchema } from './PixelusGame.svelte';
	import { page } from '$app/state';
	import * as v from 'valibot';
	import { urlToObject } from '$lib/utils/url-utils';
	import PixelusDictionaryWords from './PixelusDictionaryWords.svelte';


	const game = $derived(v.parse(PixelusGameSchema, urlToObject(page.url)));
	let languages = $derived(game.languages);
	let template = $derived(game.template);
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
						 bind:value={game.exclusions}
						 pattern="[a-z]*"
						 placeholder="excluded letters"
	/>
	<TextInput name="includes"
						 label="included letters"
						 bind:value={game.includes}
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
	<LanguageSelection bind:languages={languages} language="en" />
	<LanguageSelection bind:languages={languages} language="fr" />
	<LanguageSelection bind:languages={languages} language="es" />
	<LanguageSelection bind:languages={languages} language="de" />
	<LanguageSelection bind:languages={languages} language="names" />

	<input type="submit" value="search" onclick={submitOnInput} />
</form>
<svelte:boundary>

	{#snippet pending()}
		<p>loading...</p>
	{/snippet}

	<PixelusDictionaryWords {game} />

</svelte:boundary>

