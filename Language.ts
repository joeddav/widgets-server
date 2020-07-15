import { MAPPING_CROSS_ISO } from './iso/Iso639-3166-mapping';
import { flagEmoji } from './iso/Iso3166';
import { MAPPING_ISO_639_1, MAPPING_ISO_639_2 } from './iso/Iso639';
import { MAPPING_ISO_639_3 } from './iso/iso-639-3';


export class Language {
	code: string;
	name: string;
	nativeName?: string;
	/**
	 * Hydrated
	 */
	numModels?: number;
	
	constructor(o: any) {
		return Object.assign(this, o);
	}
	/**
	 * Works with all different parts of ISO 639.
	 */
	get wikiLink() {
		return `https://en.wikipedia.org/wiki/ISO_639:${this.code}`;
	}
	/**
	 * Return tuple with emoji and country code.
	 */
	get flagEmoji(): [string, string] | undefined {
		/// Overrides or missing codes:
		switch (this.code) {
			case 'ar':
				return [ `🟢 ض`, 'AA' ];
		}
		
		const x = MAPPING_CROSS_ISO[this.code];
		if (typeof x === "string") {
			return [ flagEmoji(x), x ];
		}
	}
	
	/**
	 * List of languages used in huggingface.co/languages
	 */
	static all(): Map<string, Language> {
		const all = new Map<string, Language>();
		for (const [code, v] of Object.entries(MAPPING_ISO_639_1)) {
			all.set(code, new Language({ code, ...v }));
		}
		for (const code of [
			"bcl",
			"crs",
			"gaa",
			"guw",
			"niu",
			"nso",
			"bzs",
			"efi",
			"gil",
			"ilo",
			"iso",
			"lua",
			"pag",
			"pap",
			"pis",
			"pon",
			"ceb",
			"loz",
			"lus",
			"swc",
			"tll",
			"tvl",
			"ase",
			"bem",
			"hil",
			"lue",
			"kqn",
			"toi",
			"srn",
			"war",
			"run",
			"tiv",
			"tpi",
			"wls",
			"zne",
			"ber",
			"chk",
			"kwy",
			"mfe",
			"rnd",
			"yap",
			"tum",
			"mos",
			"yue",
			"umb",
			"roa",
			"aed",
			"csg",
			"csn",
			"kwn",
			"lun",
			"luo",
			"nyk",
			"mfs",
			"prl",
			"tzo",
			"zai",
			"fse",
			"cel",
			"tdt",
			"yua",
			"kab",
			"ssp",
			"vsl",
			"wal",
		]) {
			/// Subset of valid 639-2 or 639-3 codes that are in Helsinki-NLP models
			const name = MAPPING_ISO_639_2[code] ?? MAPPING_ISO_639_3[code];
			if (name) {
				all.set(
					code,
					new Language({ code, name })
				);
			} else {
				console.error(`Code not found`, code);
			}
		}
		return all;
	}
}
