import { t } from "intlayer";
import type { Dictionary } from "intlayer";

const homeCtasContent = {
  content: {
    browseComponents: t({
      en: "Browse Components",
      es: "Explorar componentes",
      fr: "Parcourir les composants",
      ja: "コンポーネントを見る",
      ko: "컴포넌트 둘러보기",
      pt: "Explorar componentes",
      "zh-CN": "浏览组件",
    }),
    getStarted: t({
      en: "Get Started",
      es: "Empezar",
      fr: "Commencer",
      ja: "はじめる",
      ko: "시작하기",
      pt: "Começar",
      "zh-CN": "开始使用",
    }),
  },
  key: "home-ctas",
} satisfies Dictionary;

export default homeCtasContent;
