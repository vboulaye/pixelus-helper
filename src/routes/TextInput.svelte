<script lang="ts">

	import { goto } from '$app/navigation';

	let {
		value = $bindable(),
		name,
		label,
		...props
	}: {
		value: string,
		label: string,
		name: string,
		props: unknown[]
	} = $props();


	// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
	function debounce(func: Function, timeout = 300) {
		let timer: number;
		return (...args: any[]) => {
			clearTimeout(timer);
			timer = setTimeout(() => {
				func(...args);
			}, timeout) as unknown as number;
		};
	}

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

<label for={name}
>{label}
	<input
		id={name}
		type="text"
		class="word"
		bind:value={value}
		name={name}
		oninput={debounce(submitOnInput)}
		{...props}
	/>
</label>

<style>
    .word {
        font-family: monospace;
    }
</style>
