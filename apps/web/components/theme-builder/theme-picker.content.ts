import { t } from "intlayer";
import type { Dictionary } from "intlayer";

const themePickerContent = {
  content: {
    noThemeFound: t({
      en: "No theme found.",
      es: "No se encontró ningún tema.",
      fr: "Aucun thème trouvé.",
      ja: "テーマが見つかりません。",
      ko: "테마를 찾을 수 없습니다.",
      pt: "Nenhum tema encontrado.",
      "zh-CN": "未找到主题。",
    }),
    searchTheme: t({
      en: "Search theme...",
      es: "Buscar tema...",
      fr: "Rechercher un thème...",
      ja: "テーマを検索...",
      ko: "테마 검색...",
      pt: "Pesquisar tema...",
      "zh-CN": "搜索主题...",
    }),
    selectTheme: t({
      en: "Select theme",
      es: "Seleccionar tema",
      fr: "Sélectionner le thème",
      ja: "テーマを選択",
      ko: "테마 선택",
      pt: "Selecionar tema",
      "zh-CN": "选择主题",
    }),
  },
  key: "theme-picker",
} satisfies Dictionary;

export default themePickerContent;
