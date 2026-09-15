import { insert, t } from "intlayer";
import type { Dictionary } from "intlayer";

const modeSwitcherContent = {
  content: {
    switchToTheme: insert(
      t({
        en: "Switch to {{value}} theme",
        es: "Cambiar al tema {{value}}",
        fr: "Passer au thème {{value}}",
        ja: "{{value}} テーマに切り替え",
        ko: "{{value}} 테마로 전환",
        pt: "Mudar para o tema {{value}}",
        "zh-CN": "切换到 {{value}} 主题",
      })
    ),
    theme: t({
      en: "Theme",
      es: "Tema",
      fr: "Thème",
      ja: "テーマ",
      ko: "테마",
      pt: "Tema",
      "zh-CN": "主题",
    }),
  },
  key: "mode-switcher",
} satisfies Dictionary;

export default modeSwitcherContent;
