import { homePT } from "@/content/pt/home";
import { homeEN } from "@/content/en/home";

import { aboutPT } from "@/content/pt/about";
import { aboutEN } from "@/content/en/about";

import { servicesPT } from "@/content/pt/services";
import { servicesEN } from "@/content/en/services";

import { faqPT } from "@/content/pt/faq";
import { faqEN } from "@/content/en/faq";

import { privacyPT } from "@/content/pt/privacy";
import { privacyEN } from "@/content/en/privacy";

import { termsContentPT } from "@/content/pt/terms";
import { termsContentEN } from "@/content/en/terms";

import { trustContentPT } from "@/content/pt/trust";
import { trustContentEN } from "@/content/en/trust";

import { iaGenerativaPolicyPT } from "@/content/pt/iaGenerativaPolicy";
import { iaGenerativaPolicyEN } from "@/content/en/iaGenerativaPolicy";

import { modalsPT } from "@/content/pt/modals";
import { modalsEN } from "@/content/en/modals";

import { notFoundPT } from "@/content/pt/notFound";
import { notFoundEN } from "@/content/en/notFound";

const contentMap = {
  home: {
    pt: homePT,
    en: homeEN,
  },
  about: {
    pt: aboutPT,
    en: aboutEN,
  },
  services: {
    pt: servicesPT,
    en: servicesEN,
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
  generativeAIPolicy: {
    pt: iaGenerativaPolicyPT,
    en: iaGenerativaPolicyEN,
  },
  modals: {
    pt: modalsPT,
    en: modalsEN,
  },
  notFound: {
    pt: notFoundPT,
    en: notFoundEN,
  }
} as const;

export function getContent<Page extends keyof typeof contentMap>(page: Page, lang: string): (typeof contentMap)[Page]["pt" | "en"] {
  const safeLang = lang === "en" ? "en" : "pt";
  return contentMap[page][safeLang];
}
