import * as pt from "./pt";
import * as en from "./en";

export function getContent(page: string, lang: string = "pt") {
  const map: any = {
    pt,
    en
  };

  return map[lang]?.[page] || map["pt"][page];
}