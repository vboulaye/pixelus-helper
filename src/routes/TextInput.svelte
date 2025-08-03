<script lang="ts">
	import { submitOnInput } from './submitOnInput';

	let {
		value = $bindable(),
		name,
		label,
		...props
	}: {
		value: string | number,
		label: string,
		name: string,
		[k: string]: unknown,
	} = $props();


</script>

<div class="labelled-field">
	<label for={name} class="label">{label}

	</label>
	<input
		id={name}
		type="text"
		class="word"
		bind:value={value}
		name={name}
		onchange={submitOnInput}
		{...props}
	/>
</div>
<style>

    .labelled-field {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .word {
        font-family: monospace;
    }

    .label {
        width: 10rem;
    }
</style>
