import { insert, t } from "intlayer";
import type { Dictionary } from "intlayer";

const hapticsSwitcherContent = {
  content: {
    haptics: t({
      en: "Haptics",
      es: "Hápticos",
      fr: "Haptiques",
      ja: "触覚",
      ko: "햅틱",
      pt: "Hápticos",
      "zh-CN": "触觉反馈",
    }),
    switchHaptics: insert(
      t({
        en: "Switch haptics {{label}}",
        es: "Cambiar hápticos {{label}}",
        fr: "Basculer les haptiques {{label}}",
        ja: "触覚 {{label}} に切り替え",
        ko: "햅틱 {{label}}로 전환",
        pt: "Alternar hápticos {{label}}",
        "zh-CN": "切换触觉反馈 {{label}}",
      })
    ),
  },
  key: "haptics-switcher",
} satisfies Dictionary;

export default hapticsSwitcherContent;
