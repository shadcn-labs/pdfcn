import { t } from "intlayer";
import type { Dictionary } from "intlayer";

const siteSettingsContent = {
  content: {
    done: t({
      en: "Done",
      es: "Listo",
      fr: "Terminé",
      ja: "完了",
      ko: "완료",
      pt: "Concluído",
      "zh-CN": "完成",
    }),
    haptics: t({
      en: "Haptics",
      es: "Vibración háptica",
      fr: "Retour haptique",
      ja: "触覚フィードバック",
      ko: "햅틱",
      pt: "Retorno háptico",
      "zh-CN": "触觉反馈",
    }),
    language: t({
      en: "Language",
      es: "Idioma",
      fr: "Langue",
      ja: "言語",
      ko: "언어",
      pt: "Idioma",
      "zh-CN": "语言",
    }),
    manageSitePreferences: t({
      en: "Manage site preferences",
      es: "Gestiona las preferencias del sitio",
      fr: "Gérer les préférences du site",
      ja: "サイトの設定を管理する",
      ko: "사이트 환경설정 관리",
      pt: "Gerenciar preferências do site",
      "zh-CN": "管理网站偏好设置",
    }),
    settingsAriaLabel: t({
      en: "Settings",
      es: "Ajustes",
      fr: "Paramètres",
      ja: "設定",
      ko: "설정",
      pt: "Configurações",
      "zh-CN": "设置",
    }),
    settingsTitle: t({
      en: "Settings",
      es: "Ajustes",
      fr: "Paramètres",
      ja: "設定",
      ko: "설정",
      pt: "Configurações",
      "zh-CN": "设置",
    }),
    sound: t({
      en: "Sound",
      es: "Sonido",
      fr: "Son",
      ja: "サウンド",
      ko: "사운드",
      pt: "Som",
      "zh-CN": "声音",
    }),
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
  key: "site-settings",
} satisfies Dictionary;

export default siteSettingsContent;
