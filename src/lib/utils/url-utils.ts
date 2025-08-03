export function urlToObject(url: URL): Record<string, string> {
	return Object.fromEntries(url.searchParams.entries());
}

export function urlToObjectString(url: URL): string {
	return JSON.stringify(urlToObject(url));
}
