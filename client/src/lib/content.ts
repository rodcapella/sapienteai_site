import { homePT } from "@/content/pt/home";
import { homeEN } from "@/content/en/home";

import { aboutPT } from "@/content/pt/about";
import { aboutEN } from "@/content/en/about";

import { faqPT } from "@/content/pt/FAQ";
import { faqEN } from "@/content/en/FAQ";

import { privacyPT } from "@/content/pt/privacy";
import { privacyEN } from "@/content/en/privacy";

import { termsContentPT } from "@/content/pt/terms";
import { termsContentEN } from "@/content/en/terms";

import { trustContentPT } from "@/content/pt/trust";
import { trustContentEN } from "@/content/en/trust";

import { RGPDContentPT } from "@/content/pt/RGPD";
import { gdprContentEN } from "@/content/en/RGPD";

const contentMap = {
  home: {
    pt: homePT,
    en: homeEN
  },
  about: {
    pt: aboutPT,
    en: aboutEN
  },
  faq: {
    pt: faqPT,
    en: faqEN
  },
  privacy: {
    pt: privacyPT,
    en: privacyEN
  },
  terms: {
    pt: termsContentPT,
    en: termsContentEN
  },
  trust: {
    pt: trustContentPT,
    en: trustContentEN
  },
  RGPD: {
    pt: RGPDContentPT,
    en: gdprContentEN
  }
} as const;

export function getContent(
  page: keyof typeof contentMap,
  lang: string
) {
  const safeLang = lang === "en" ? "en" : "pt";

  return contentMap[page][safeLang as "pt" | "en"];
}
