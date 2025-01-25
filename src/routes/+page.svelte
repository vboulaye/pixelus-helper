<script lang="ts">

	import { goto } from '$app/navigation';
	import LanguageSelection from './LanguageSelection.svelte';
	import TextInput from './TextInput.svelte';
	import { submitOnInput } from './submitOnInput';

	const { data } = $props();
	let languages = $state(data.languages);


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
	<LanguageSelection bind:languages={languages} language="en"  />
	<LanguageSelection bind:languages={languages} language="fr"  />
	<LanguageSelection bind:languages={languages} language="es"  />
	<LanguageSelection bind:languages={languages} language="de"  />
	<LanguageSelection bind:languages={languages} language="names"  />

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
