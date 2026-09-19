import { t } from "intlayer";
import type { Dictionary } from "intlayer";

const docsPageContent = {
  content: {
    apiReferenceBadge: t({
      en: "API Reference",
      es: "Referencia de la API",
      fr: "Référence de l'API",
      ja: "API リファレンス",
      ko: "API 참조",
      pt: "Referência da API",
      "zh-CN": "API 参考",
    }),
    breadcrumbDocs: t({
      en: "Docs",
      es: "Documentación",
      fr: "Documentation",
      ja: "ドキュメント",
      ko: "문서",
      pt: "Documentação",
      "zh-CN": "文档",
    }),
    breadcrumbHome: t({
      en: "Home",
      es: "Inicio",
      fr: "Accueil",
      ja: "ホーム",
      ko: "홈",
      pt: "Início",
      "zh-CN": "首页",
    }),
    docsBadge: t({
      en: "Docs",
      es: "Documentación",
      fr: "Documentation",
      ja: "ドキュメント",
      ko: "문서",
      pt: "Documentação",
      "zh-CN": "文档",
    }),
    next: t({
      en: "Next",
      es: "Siguiente",
      fr: "Suivant",
      ja: "次へ",
      ko: "다음",
      pt: "Próximo",
      "zh-CN": "下一页",
    }),
    nextPageTooltip: t({
      en: "Next Page",
      es: "Página siguiente",
      fr: "Page suivante",
      ja: "次のページ",
      ko: "다음 페이지",
      pt: "Próxima página",
      "zh-CN": "下一页",
    }),
    previous: t({
      en: "Previous",
      es: "Anterior",
      fr: "Précédent",
      ja: "前へ",
      ko: "이전",
      pt: "Anterior",
      "zh-CN": "上一页",
    }),
    previousPageTooltip: t({
      en: "Previous Page",
      es: "Página anterior",
      fr: "Page précédente",
      ja: "前のページ",
      ko: "이전 페이지",
      pt: "Página anterior",
      "zh-CN": "上一页",
    }),
  },
  key: "docs-page",
} satisfies Dictionary;

export default docsPageContent;
