import { t } from "intlayer";
import type { Dictionary } from "intlayer";

const homePageContent = {
  content: {
    breadcrumbHome: t({
      en: "Home",
      es: "Inicio",
      fr: "Accueil",
      ja: "ホーム",
      ko: "홈",
      pt: "Início",
      "zh-CN": "首页",
    }),
    descriptionLine1: t({
      en: "Ready to use, customizable pdf components for React.",
      es: "Componentes PDF para React listos para usar y personalizables.",
      fr: "Composants PDF prêts à l'emploi et personnalisables pour React.",
      ja: "React 用のすぐに使える、カスタマイズ可能な PDF コンポーネント。",
      ko: "즉시 사용 가능하고 커스터마이징 가능한 React용 PDF 컴포넌트입니다.",
      pt: "Componentes de PDF prontos para uso e personalizáveis para React.",
      "zh-CN": "开箱即用、可自定义的 React PDF 组件。",
    }),
    descriptionLine2: t({
      en: "Built on Takumi and Forme. Distributed via shadcn.",
      es: "Construido sobre Takumi y Forme. Distribuido a través de shadcn.",
      fr: "Construit sur Takumi et Forme. Distribué via shadcn.",
      ja: "Takumi と Forme を基盤に構築し、shadcn 経由で配布。",
      ko: "Takumi와 Forme를 기반으로 제작되었으며, shadcn을 통해 배포됩니다.",
      pt: "Criado com base em Takumi e Forme. Distribuído via shadcn.",
      "zh-CN": "基于 Takumi 和 Forme 构建，通过 shadcn 分发。",
    }),
    title: t({
      en: "Beautiful PDFs, made simple",
      es: "PDFs elegantes, hechos con sencillez",
      fr: "De beaux PDF, en toute simplicité",
      ja: "美しいPDFを、シンプルに作成",
      ko: "아름다운 PDF, 손쉽게 만들기",
      pt: "PDFs bonitos, feitos de forma simples",
      "zh-CN": "精美 PDF，制作更简单",
    }),
  },
  key: "home-page",
} satisfies Dictionary;

export default homePageContent;
