import { homePT } from "@/content/pt/home";
import { homeEN } from "@/content/en/home";

import { aboutPT } from "@/content/pt/about";
import { aboutEN } from "@/content/en/about";

import { faqPT } from "@/content/pt/faq";
import { faqEN } from "@/content/en/faq";

import { teamPT } from "@/content/pt/team";
import { teamEN } from "@/content/en/team";

import { privacyPT } from "@/content/pt/privacy";
import { privacyEN } from "@/content/en/privacy";

import { termsContentPT } from "@/content/pt/terms";
import { termsContentEN } from "@/content/en/terms";

import { trustContentPT } from "@/content/pt/trust";
import { trustContentEN } from "@/content/en/trust";

import { rgpdContentPT } from "@/content/pt/rgpd";
import { rgpdContentEN } from "@/content/en/gdpr";

import { iaGenerativaPolicyPT } from "@/content/pt/iaGenerativaPolicy";
import { iaGenerativaPolicyEN } from "@/content/en/iaGenerativaPolicy";

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
  team: {
    pt: teamPT,
    en: teamEN,
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
    en: rgpdContentEN,
  },
  rgpd: {
    pt: rgpdContentPT,
    en: rgpdContentEN,
  },
  generativeAIPolicy: {
    pt: iaGenerativaPolicyPT,
    en: iaGenerativaPolicyEN,
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
