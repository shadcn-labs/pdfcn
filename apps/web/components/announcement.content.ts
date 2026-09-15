import { t } from "intlayer";
import type { Dictionary } from "intlayer";

const announcementContent = {
  content: {
    newThemeBuilder: t({
      en: "New Theme builder",
      es: "Nuevo creador de temas",
      fr: "Nouveau générateur de thèmes",
      ja: "新しいテーマビルダー",
      ko: "새로운 테마 빌더",
      pt: "Novo criador de temas",
      "zh-CN": "全新主题构建器",
    }),
  },
  key: "announcement",
} satisfies Dictionary;

export default announcementContent;
