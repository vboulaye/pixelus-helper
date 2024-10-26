<script lang="ts">

	import { goto } from '$app/navigation';
	import LanguageSelection from './LanguageSelection.svelte';
	import { PixelusGame } from './PixelusGame';

	const { data } = $props();
// const data = PixelusGame.fromState()
	async function submitOnInput(e: Event) {
		if (!e.target) return;
		// retrieve the form submit url with encoded get search parameters
		const eventTarget = e.target as HTMLInputElement;
		const form = eventTarget.form as HTMLFormElement;
		const url = new URL(form.action || location.href);
		const params = new URLSearchParams(url.search);
		// update the search parameters with the form values
		for (const input of form.elements as any) {
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


	$effect( () => {
		console.log("data.languages",data.languages)
	})

</script>

<h4>Query</h4>
<form>
	<label for="template"
	>searched word
		<input
			id="template"
			type="text"
			class="word"
			placeholder="the word to search with . for missing characters"
			bind:value={data.template}
			name="template"
			oninput={submitOnInput}
		/>
	</label>

	<label for="exclusions"
	>excluded letters
		<input
			id="exclusions"
			type="text"
			bind:value={data.exclusions}
			placeholder="excluded letters"
			name="exclusions"
			oninput={submitOnInput}
		/>
	</label>

	<label for="includes"
	>includes letters
		<input
			id="includes"
			type="text"
			bind:value={data.includes}
			placeholder="includes letters"
			name="includes"
			oninput={submitOnInput}
		/>
	</label>
	<label for="languages"
	>languages
		<input
			id="languages"
			type="text"
			bind:value={data.languages}
			placeholder="includes letters"
			name="languages"
		/>
	</label>
	<LanguageSelection bind:languages={data.languages} language="en" />
<!--	<LanguageSelection bind:languages={data.languages} language="fr"/>-->
<!--	<LanguageSelection bind:languages={data.languages} language="es"/>-->
<!--	<LanguageSelection bind:languages={data.languages} language="de"/>-->

	<input type="submit" value="search" />
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
