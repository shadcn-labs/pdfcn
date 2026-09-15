import { t } from "intlayer";
import type { Dictionary } from "intlayer";

const commandMenuContent = {
  content: {
    goToPage: t({
      en: "Go to Page",
      es: "Ir a la página",
      fr: "Aller à la page",
      ja: "ページに移動",
      ko: "페이지로 이동",
      pt: "Ir para a página",
      "zh-CN": "前往页面",
    }),
    noResultsFound: t({
      en: "No results found.",
      es: "No se encontraron resultados.",
      fr: "Aucun résultat trouvé.",
      ja: "結果が見つかりません。",
      ko: "결과를 찾을 수 없습니다.",
      pt: "Nenhum resultado encontrado.",
      "zh-CN": "未找到结果。",
    }),
    pages: t({
      en: "Pages",
      es: "Páginas",
      fr: "Pages",
      ja: "ページ",
      ko: "페이지",
      pt: "Páginas",
      "zh-CN": "页面",
    }),
    search: t({
      en: "Search...",
      es: "Buscar...",
      fr: "Rechercher...",
      ja: "検索...",
      ko: "검색...",
      pt: "Pesquisar...",
      "zh-CN": "搜索...",
    }),
    searchDocumentation: t({
      en: "Search documentation...",
      es: "Buscar documentación...",
      fr: "Rechercher dans la documentation...",
      ja: "ドキュメントを検索...",
      ko: "문서 검색...",
      pt: "Pesquisar documentação...",
      "zh-CN": "搜索文档...",
    }),
    searchForCommand: t({
      en: "Search for a command to run...",
      es: "Busca un comando para ejecutar...",
      fr: "Recherchez une commande à exécuter...",
      ja: "実行するコマンドを検索...",
      ko: "실행할 명령 검색...",
      pt: "Pesquise um comando para executar...",
      "zh-CN": "搜索要运行的命令...",
    }),
  },
  key: "command-menu",
} satisfies Dictionary;

export default commandMenuContent;
