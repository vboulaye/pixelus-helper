<script lang="ts">

	import LanguageSelection from './LanguageSelection.svelte';
	import TextInput from './TextInput.svelte';
	import { submitOnInput } from './submitOnInput';
	import { PixelusGameSchema } from './PixelusGame.svelte';
	import { page } from '$app/state';
	import * as v from 'valibot';
	import { urlToObject } from '$lib/utils/url-utils';
	import PixelusDictionaryWords from './PixelusDictionaryWords.svelte';
	import { untrack } from 'svelte';
	import TemplateInputField from './TemplateInputField.svelte';


	const game = $derived(v.parse(PixelusGameSchema, urlToObject(page.url)));
	let languages = $derived(game.languages);
	let template = $derived(game.template);
	let templateLength = $state(10); // valeur par défaut

	$effect(() => {
		const currentLength = untrack(() => template.length);
		if (currentLength < templateLength) {
			template += '.'.repeat(templateLength - currentLength);
		} else if (currentLength > templateLength) {
			template = template.slice(0, templateLength);
		}
	});

</script>


<h4 class="query-title">Query</h4>
<form class="main-form">

	<TemplateInputField bind:template={template} />

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

	<div class="language-selection">
		<LanguageSelection bind:languages={languages} language="en" />
		<LanguageSelection bind:languages={languages} language="fr" />
		<LanguageSelection bind:languages={languages} language="es" />
		<LanguageSelection bind:languages={languages} language="de" />
		<LanguageSelection bind:languages={languages} language="names" />
		<LanguageSelection bind:languages={languages} language="artists" />
	</div>

	<input class="input-submit" type="submit" value="search" onclick={submitOnInput} />
</form>
<svelte:boundary>

	{#snippet pending()}
		<p>loading...</p>
	{/snippet}

	<PixelusDictionaryWords {game} />

</svelte:boundary>



<style>
    .main-form {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 1.2rem;
        margin: 2rem auto;
        max-width: 40rem;
        padding: 2rem;
        background: #f8f9fa;
        border-radius: 0.7rem;
        box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    }
    .query-title {
        margin-bottom: 0.5rem;
        font-size: 1.3rem;
        color: #333;
        font-weight: 600;
    }

    .input-submit {
        background: #333;
        color: #fff;
        cursor: pointer;
        transition: background 0.15s;
        margin-top: 1rem;
        align-self: flex-end;
        font-weight: 600;
    }
    .input-submit:hover {
        background: #555;
    }

    .language-selection {
        display: flex;
        gap: 0.5rem;
        margin: 0.5rem 0 1rem 0;
    }

</style>