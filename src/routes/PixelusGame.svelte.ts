import * as v from 'valibot';

export const PixelusGameSchema = v.object({
	languages: v.optional(v.string(), "artists"),
	template: v.optional(v.string(), ""),
	exclusions: v.optional(v.string(), ""),
	includes: v.optional(v.string(), ""),
});
