<script lang="ts">
	import TextInput from './TextInput.svelte';
	import { untrack } from 'svelte';


	let { template = $bindable() }: {
		template: string,
	} = $props();

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
<div>

	<TextInput name="wordLength"
						 label="word length ({templateLength})"
						 style="width: 30rem;"
						 type="range" min="1" max="30" bind:value={templateLength} />

</div>
<div>
	<TextInput name="template"
						 label="searched word"
						 bind:value={template}
						 pattern="[a-z. ]+"
						 style="width: 30rem;"
						 placeholder="the word to search with . for missing characters"
	/>
</div>