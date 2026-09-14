import en from "./dictionaries/en.json";
import pt from "./dictionaries/pt.json";
import de from "./dictionaries/de.json";

export type Locale = "en" | "pt" | "de";
export const LOCALES: Locale[] = ["en", "pt", "de"];
export const DEFAULT_LOCALE: Locale = "en";
export const SITE_URL = "https://www.gruntwrk.com";

const dictionaries = { en, pt, de } as const;

export type Dictionary = typeof en;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
}
