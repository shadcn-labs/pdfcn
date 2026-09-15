import { t } from "intlayer";
import type { Dictionary } from "intlayer";

const siteFooterContent = {
  content: {
    builtBy: t({
      en: "Built by",
      es: "Creado por",
      fr: "Créé par",
      ja: "制作",
      ko: "제작",
      pt: "Criado por",
      "zh-CN": "开发者",
    }),
    sourceAvailableOn: t({
      en: ". The source code is available on",
      es: ". El código fuente está disponible en",
      fr: ". Le code source est disponible sur",
      ja: "。ソースコードは",
      ko: ". 소스 코드는",
      pt: ". O código-fonte está disponível no",
      "zh-CN": "。源代码托管在",
    }),
    trailingPeriod: t({
      en: ".",
      es: ".",
      fr: ".",
      ja: "で公開されています。",
      ko: "에서 확인할 수 있습니다.",
      pt: ".",
      "zh-CN": "。",
    }),
  },
  key: "site-footer",
} satisfies Dictionary;

export default siteFooterContent;
