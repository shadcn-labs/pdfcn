import { t } from "intlayer";
import type { Dictionary } from "intlayer";

const docsSidebarContent = {
  content: {
    new: t({
      en: "New",
      es: "Nuevo",
      fr: "Nouveau",
      ja: "新規",
      ko: "새로운",
      pt: "Novo",
      "zh-CN": "新",
    }),
    sections: t({
      en: "Sections",
      es: "Secciones",
      fr: "Sections",
      ja: "セクション",
      ko: "섹션",
      pt: "Seções",
      "zh-CN": "章节",
    }),
  },
  key: "docs-sidebar",
} satisfies Dictionary;

export default docsSidebarContent;
