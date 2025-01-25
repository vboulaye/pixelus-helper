import { goto } from '$app/navigation';

export async function submitOnInput(e: Event) {
	if (!e.target) return;
	// retrieve the form submit url with encoded get search parameters
	const eventTarget = e.target as HTMLInputElement;
	const form = eventTarget.form as HTMLFormElement;
	const url = new URL(form.action || location.href);
	const params = new URLSearchParams();
	// update the search parameters with the form values
	for (const input of (form.elements as any)) {
		if (input.name && input.type !== 'checkbox') {
			console.log("input", input);
			params.set(input.name, input.value);
		}
	}
	// update the url with the new search parameters
	url.search = params.toString();
	console.log("url", url.toString());
	// navigate to the new url
	// history.pushState(null, '', url.toString());
	await goto(url.toString(), { keepFocus: true, invalidateAll: true });
	// prevent the form from submitting
	e.preventDefault();

}
