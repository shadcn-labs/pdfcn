import { t } from "intlayer";
import type { Dictionary } from "intlayer";

const localeSwitcherContent = {
  content: {
    changeLanguage: t({
      en: "Change language",
      es: "Cambiar idioma",
      fr: "Changer de langue",
      ja: "言語を変更",
      ko: "언어 변경",
      pt: "Alterar idioma",
      "zh-CN": "更改语言",
    }),
  },
  key: "locale-switcher",
} satisfies Dictionary;

export default localeSwitcherContent;
