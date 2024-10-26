<script lang="ts">

	import type { EventHandler } from 'svelte/elements';

	let { languages = $bindable(), language, oninput }: {
		languages: string,
		language: string,
		oninput: EventHandler
	} = $props();

	function isSelected() {
		// console.log({ languages, language });
		return languages.includes(language);
	}

	function flipLanguage() {
		// console.log('before:', { languages, language });
		const languageArray = languages.split(/ *, */).filter(Boolean);
		const index = languageArray.indexOf(language);
		if (index !== -1) {
			languageArray.splice(index, 1);
		} else {
			languageArray.push(language);
		}
		languages = languageArray
			.toSorted((a, b) => a.localeCompare(b))
			.join(',');
		// console.log('after:', { languages, language });
	}

</script>


<label for={language}
>{language}
	<input
		id={language}
		type="checkbox"
		checked={isSelected()}
		name={language}
		onclick={()=>flipLanguage()}
		{oninput}

	/>
</label>