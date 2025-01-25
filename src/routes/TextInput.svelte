<script lang="ts">

	import { goto } from '$app/navigation';
	import { submitOnInput } from './submitOnInput';

	let {
		value = $bindable(),
		name,
		label,
		...props
	}: {
		value: string,
		label: string,
		name: string,
		[k:string]: unknown,
	} = $props();


</script>

<label for={name}
>{label}
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
