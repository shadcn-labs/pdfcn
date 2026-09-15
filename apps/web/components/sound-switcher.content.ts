import { insert, t } from "intlayer";
import type { Dictionary } from "intlayer";

const soundSwitcherContent = {
  content: {
    sound: t({
      en: "Sound",
      es: "Sonido",
      fr: "Son",
      ja: "サウンド",
      ko: "사운드",
      pt: "Som",
      "zh-CN": "声音",
    }),
    switchSound: insert(
      t({
        en: "Switch sound {{label}}",
        es: "Cambiar sonido {{label}}",
        fr: "Basculer le son {{label}}",
        ja: "サウンド {{label}} に切り替え",
        ko: "사운드 {{label}}로 전환",
        pt: "Alternar som {{label}}",
        "zh-CN": "切换声音 {{label}}",
      })
    ),
  },
  key: "sound-switcher",
} satisfies Dictionary;

export default soundSwitcherContent;
