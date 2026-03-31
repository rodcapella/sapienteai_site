import { homePT } from "@/content/pt/home";
import { homeEN } from "@/content/en/home";

import { aboutPT } from "@/content/pt/about";
import { aboutEN } from "@/content/en/about";

import { faqPT } from "@/content/pt/faq";
import { faqEN } from "@/content/en/faq";

import { privacyContentPT } from "@/content/pt/privacy";
import { privacyContentEN } from "@/content/en/privacy";

import { termsContentPT } from "@/content/pt/terms";
import { termsContentEN } from "@/content/en/terms";

import { trustContentPT } from "@/content/pt/trust";
import { trustContentEN } from "@/content/en/trust";

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
    pt: privacyContentPT,
    en: privacyContentEN
  },
  terms: {
    pt: termsContentPT,
    en: termsContentEN
  },
  trust: {
    pt: trustContentPT,
    en: trustContentEN
    }
} as const;

export function getContent<T extends keyof typeof contentMap>(
  page: T,
  lang: string
) {
  const safeLang = lang === "en" ? "en" : "pt";

  return contentMap[page][safeLang];
}