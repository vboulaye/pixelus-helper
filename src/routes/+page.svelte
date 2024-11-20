<script lang="ts">

	import { goto } from '$app/navigation';
	import LanguageSelection from './LanguageSelection.svelte';
	import TextInput from './TextInput.svelte';

	const { data } = $props();
	let languages = $state(data.languages);

	async function submitOnInput(e: Event) {
		if (!e.target) return;
		// retrieve the form submit url with encoded get search parameters
		const eventTarget = e.target as HTMLInputElement;
		const form = eventTarget.form as HTMLFormElement;
		const url = new URL(form.action || location.href);
		const params = new URLSearchParams(url.search);
		// update the search parameters with the form values
		for (const input of (form.elements as any)) {
			if (input.name) {
				params.set(input.name, input.value);
			}
		}
		// update the url with the new search parameters
		url.search = params.toString();
		// navigate to the new url
		// history.pushState(null, '', url.toString());
		await goto(url.toString(), { keepFocus: true, invalidateAll: true });
		// prevent the form from submitting
		e.preventDefault();

	}


</script>

<h4>Query</h4>
<form>
	<!--	<label for="template"-->
	<!--	>searched word-->
	<!--		<input-->
	<!--			id="template"-->
	<!--			pattern="[a-z.]*"-->
	<!--			type="text"-->
	<!--			class="word"-->
	<!--			placeholder="the word to search with . for missing characters"-->
	<!--			bind:value={data.template}-->
	<!--			name="template"-->
	<!--			oninput={submitOnInput}-->
	<!--		/>-->
	<!--	</label>-->
	<TextInput name="template"
						 label="searched word"
						 bind:value={data.template}
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
	<LanguageSelection bind:languages={languages} language="en" oninput={submitOnInput} />
	<LanguageSelection bind:languages={languages} language="fr" oninput={submitOnInput} />
	<LanguageSelection bind:languages={languages} language="es" oninput={submitOnInput} />
	<LanguageSelection bind:languages={languages} language="de" oninput={submitOnInput} />
	<LanguageSelection bind:languages={languages} language="names" oninput={submitOnInput} />

	<input type="submit" value="search" onclick={submitOnInput} />
</form>

<h4>Words</h4>

<div class="word" style:column-width="{data.template.length}rem">
	{#each data.words as word}
		<div>{word}</div>
	{/each}
</div>

<style>
    .word {
        font-family: monospace;
    }
</style>
