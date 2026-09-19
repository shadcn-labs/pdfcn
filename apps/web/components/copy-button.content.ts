import { t } from "intlayer";
import type { Dictionary } from "intlayer";

const copyButtonContent = {
  content: {
    copied: t({
      en: "Copied",
      es: "Copiado",
      fr: "Copié",
      ja: "コピーしました",
      ko: "복사됨",
      pt: "Copiado",
      "zh-CN": "已复制",
    }),
    copy: t({
      en: "Copy",
      es: "Copiar",
      fr: "Copier",
      ja: "コピー",
      ko: "복사",
      pt: "Copiar",
      "zh-CN": "复制",
    }),
    copyToClipboard: t({
      en: "Copy to Clipboard",
      es: "Copiar al portapapeles",
      fr: "Copier dans le presse-papiers",
      ja: "クリップボードにコピー",
      ko: "클립보드에 복사",
      pt: "Copiar para a área de transferência",
      "zh-CN": "复制到剪贴板",
    }),
  },
  key: "copy-button",
} satisfies Dictionary;

export default copyButtonContent;
