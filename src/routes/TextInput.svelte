<script lang="ts">
	import { submitOnInput } from './submitOnInput';

	let {
		value = $bindable(),
		name,
		label,
		...props
	}: {
		value: string|number,
		label: string,
		name: string,
		[k:string]: unknown,
	} = $props();


</script>

<label for={name}>{label}
	<input
		id={name}
		type="text"
		class="word"
		bind:value={value}
		name={name}
		onchange={submitOnInput}
		{...props}
	/>
</label>

<style>
    .word {
        font-family: monospace;
    }
</style>
