import * as v from 'valibot';

export const PixelusGameSchema = v.object({
	languages: v.string(),
	template: v.string(),
	exclusions: v.string(),
	includes: v.string()
});
