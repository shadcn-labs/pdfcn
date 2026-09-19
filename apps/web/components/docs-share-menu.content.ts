import { t } from "intlayer";
import type { Dictionary } from "intlayer";

const docsShareMenuContent = {
  content: {
    copyLink: t({
      en: "Copy link",
      es: "Copiar enlace",
      fr: "Copier le lien",
      ja: "リンクをコピー",
      ko: "링크 복사",
      pt: "Copiar link",
      "zh-CN": "复制链接",
    }),
    linkCopied: t({
      en: "Link copied",
      es: "Enlace copiado",
      fr: "Lien copié",
      ja: "リンクをコピーしました",
      ko: "링크가 복사되었습니다",
      pt: "Link copiado",
      "zh-CN": "链接已复制",
    }),
    otherApp: t({
      en: "Other app",
      es: "Otra aplicación",
      fr: "Autre application",
      ja: "その他のアプリ",
      ko: "다른 앱",
      pt: "Outro aplicativo",
      "zh-CN": "其他应用",
    }),
    shareOnLinkedIn: t({
      en: "Share on LinkedIn",
      es: "Compartir en LinkedIn",
      fr: "Partager sur LinkedIn",
      ja: "LinkedIn で共有",
      ko: "LinkedIn에서 공유",
      pt: "Compartilhar no LinkedIn",
      "zh-CN": "分享到 LinkedIn",
    }),
    shareOnX: t({
      en: "Share on X",
      es: "Compartir en X",
      fr: "Partager sur X",
      ja: "X で共有",
      ko: "X에서 공유",
      pt: "Compartilhar no X",
      "zh-CN": "分享到 X",
    }),
  },
  key: "docs-share-menu",
} satisfies Dictionary;

export default docsShareMenuContent;
