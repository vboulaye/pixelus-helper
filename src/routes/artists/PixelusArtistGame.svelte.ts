export class PixelusArtistGame {
	languages: string = $state('');
	template: string = $state('');
	exclusions: string = $state('');
	includes: string = $state('');

	constructor(template: string, exclusions: string, includes: string, languages: string) {
		this.template = template;
		this.exclusions = exclusions;
		this.includes = includes;
		this.languages = languages;
	}

	static fromState(state?: string): PixelusArtistGame {
		if (!state) {
			state = '{}';
		}
		const {
			template = '',
			exclusions = '',
			includes = '',
			languages = 'en,fr,names'
		} = JSON.parse(state);
		return new PixelusArtistGame(template, exclusions, includes, languages);
	}

	static fromFormData(data: FormData): PixelusArtistGame {
		return PixelusArtistGame.fromState(JSON.stringify(Object.fromEntries(data.entries())));
	}

	static fromURL(url: URL): PixelusArtistGame {
		return PixelusArtistGame.fromState(
			JSON.stringify(Object.fromEntries(url.searchParams.entries()))
		);
	}

	private static getFormDataField(data: FormData, fieldName: string): string {
		return (data.get(fieldName) as string) || '';
	}

	toState(): string {
		return JSON.stringify(this);
	}
}


