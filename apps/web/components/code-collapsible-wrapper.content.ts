import { t } from "intlayer";
import type { Dictionary } from "intlayer";

const codeCollapsibleWrapperContent = {
  content: {
    collapse: t({
      en: "Collapse",
      es: "Contraer",
      fr: "Réduire",
      ja: "折りたたむ",
      ko: "접기",
      pt: "Recolher",
      "zh-CN": "折叠",
    }),
    expand: t({
      en: "Expand",
      es: "Expandir",
      fr: "Développer",
      ja: "展開",
      ko: "펼치기",
      pt: "Expandir",
      "zh-CN": "展开",
    }),
  },
  key: "code-collapsible-wrapper",
} satisfies Dictionary;

export default codeCollapsibleWrapperContent;
