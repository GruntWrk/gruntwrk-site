import en from "./dictionaries/en.json";
import pt from "./dictionaries/pt.json";

export type Locale = "en" | "pt";
export const LOCALES: Locale[] = ["en", "pt"];
export const DEFAULT_LOCALE: Locale = "en";
export const SITE_URL = "https://www.gruntwrk.com";

const dictionaries = { en, pt } as const;

export type Dictionary = typeof en;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
}
