export class PixelusGame {
	languages: string;
	template: string;
	exclusions: string;
	includes: string;

	constructor(template: string, exclusions: string, includes: string, languages: string) {
		this.template = template;
		this.exclusions = exclusions;
		this.includes = includes;
		this.languages = languages;
	}

	static fromState(state?: string): PixelusGame {
		if (!state) {
			state = '{}';
		}
		const {
			template = '',
			exclusions = '',
			includes = '',
			languages = 'en,fr'
		} = JSON.parse(state);
		return new PixelusGame(template, exclusions, includes, languages);
	}

	static fromFormData(data: FormData): PixelusGame {
		return PixelusGame.fromState(JSON.stringify(Object.fromEntries(data.entries())));
	}

	static fromURL(url: URL): PixelusGame {
		return PixelusGame.fromState(JSON.stringify(Object.fromEntries(url.searchParams.entries())));
	}

	private static getFormDataField(data: FormData, fieldName: string): string {
		return (data.get(fieldName) as string) || '';
	}

	toState(): string {
		return JSON.stringify(this);
	}
}
