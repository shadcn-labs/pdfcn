import { t } from "intlayer";
import type { Dictionary } from "intlayer";

const siteHeaderContent = {
  content: {
    navBlocks: t({
      en: "Blocks",
      es: "Bloques",
      fr: "Blocs",
      ja: "ブロック",
      ko: "블록",
      pt: "Blocos",
      "zh-CN": "区块",
    }),
    navComponents: t({
      en: "Components",
      es: "Componentes",
      fr: "Composants",
      ja: "コンポーネント",
      ko: "컴포넌트",
      pt: "Componentes",
      "zh-CN": "组件",
    }),
    navDocs: t({
      en: "Docs",
      es: "Documentación",
      fr: "Documentation",
      ja: "ドキュメント",
      ko: "문서",
      pt: "Documentação",
      "zh-CN": "文档",
    }),
    navSponsors: t({
      en: "Sponsors",
      es: "Patrocinadores",
      fr: "Sponsors",
      ja: "スポンサー",
      ko: "스폰서",
      pt: "Patrocinadores",
      "zh-CN": "赞助者",
    }),
    navThemeBuilder: t({
      en: "Theme Builder",
      es: "Generador de temas",
      fr: "Générateur de thèmes",
      ja: "テーマビルダー",
      ko: "테마 빌더",
      pt: "Criador de temas",
      "zh-CN": "主题构建器",
    }),
  },
  key: "site-header",
} satisfies Dictionary;

export default siteHeaderContent;
