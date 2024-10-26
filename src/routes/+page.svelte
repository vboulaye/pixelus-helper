<script lang="ts">
	let { data } = $props();

	let { template, exclusions, includes, words } = $state(data);
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
			bind:value={template}
			name="template"
		/>
	</label>

	<label for="exclusions"
		>excluded letters
		<input
			id="exclusions"
			type="text"
			bind:value={exclusions}
			placeholder="excluded letters"
			name="exclusions"
		/>
	</label>

	<label for="includes"
		>includes letters
		<input
			id="includes"
			type="text"
			bind:value={includes}
			placeholder="includes letters"
			name="includes"
		/>
	</label>

	<input type="submit" value="search" />
</form>

<h4>Words</h4>

<div class="word" style:column-width="{template.length}rem">
	{#each words as word}
		<div>{word}</div>
	{/each}
</div>

<style>
	.word {
		font-family: monospace;
	}
</style>
