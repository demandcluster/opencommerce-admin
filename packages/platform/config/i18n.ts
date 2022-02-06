import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import config from "./index";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: `${config.VITE_PUBLIC_I18N_BASE_URL}/locales/resources.json?lng={{lng}}&ns={{ns}}`
    },
    fallbackLng: "en",
    load: 'languageOnly',
    interpolation: {
      escapeValue: false // react already safes from xss
    },
    react: {
      useSuspense: false
    },
    ns: ["demandcluster-merchants","reaction-i18n","reaction-email","reaction-address","reaction-translations","reaction-accounts","reaction-catalog","reaction-tags","reaction-simple-pricing","reaction-inventory","reaction-simple-inventory","reaction-orders","reaction-payments","reaction-stripe","example-paymentmethod","reaction-discounts","discount-codes","reaction-shipping","reaction-shipping-rates","reaction-taxes","reaction-navigation","reaction-sitemap-generator","reaction-demandcluster","reaction-demandcms","buckaroo-paymentmethod"]
  });

export default i18n;
