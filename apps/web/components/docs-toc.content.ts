import { t } from "intlayer";
import type { Dictionary } from "intlayer";

const docsTocContent = {
  content: {
    onThisPage: t({
      en: "On This Page",
      es: "En esta página",
      fr: "Sur cette page",
      ja: "このページの内容",
      ko: "이 페이지의 내용",
      pt: "Nesta página",
      "zh-CN": "本页内容",
    }),
  },
  key: "docs-toc",
} satisfies Dictionary;

export default docsTocContent;
