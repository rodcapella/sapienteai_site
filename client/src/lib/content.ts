import { homePT } from "@/content/pt/home";
import { homeEN } from "@/content/en/home";

import { aboutPT } from "@/content/pt/about";
import { aboutEN } from "@/content/en/about";

import { faqPT } from "@/content/pt/faq";
import { faqEN } from "@/content/en/faq";

import { privacyPT } from "@/content/pt/privacy";
import { privacyEN } from "@/content/en/privacy";

import { termsContentPT } from "@/content/pt/terms";
import { termsContentEN } from "@/content/en/terms";

import { trustContentPT } from "@/content/pt/trust";
import { trustContentEN } from "@/content/en/trust";

import { rgpdContentPT } from "@/content/pt/rgpd";
import { gdprContentEN } from "@/content/en/gdpr";

import { contactPT } from "@/content/pt/contact";
import { contactEN } from "@/content/en/contact";

const contentMap = {
  home: {
    pt: homePT,
    en: homeEN,
  },
  about: {
    pt: aboutPT,
    en: aboutEN,
  },
  faq: {
    pt: faqPT,
    en: faqEN,
  },
  privacy: {
    pt: privacyPT,
    en: privacyEN,
  },
  terms: {
    pt: termsContentPT,
    en: termsContentEN,
  },
  trust: {
    pt: trustContentPT,
    en: trustContentEN,
  },
  RGPD: {
    pt: rgpdContentPT,
    en: gdprContentEN,
  },
  rgpd: {
    pt: rgpdContentPT,
    en: gdprContentEN,
  },
  contact: {
    pt: contactPT,
    en: contactEN,
},
} as const;

export function getContent(page: keyof typeof contentMap, lang: string) {
  const safeLang = lang === "en" ? "en" : "pt";
  return contentMap[page][safeLang];
}
