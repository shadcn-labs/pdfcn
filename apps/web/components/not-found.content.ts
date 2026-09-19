import { t } from "intlayer";
import type { Dictionary } from "intlayer";

const notFoundContent = {
  content: {
    back: t({
      en: "Back",
      es: "Atrás",
      fr: "Retour",
      ja: "戻る",
      ko: "뒤로",
      pt: "Voltar",
      "zh-CN": "返回",
    }),
    backToHome: t({
      en: "Back to Home",
      es: "Volver al inicio",
      fr: "Retour à l'accueil",
      ja: "ホームに戻る",
      ko: "홈으로 돌아가기",
      pt: "Voltar para o início",
      "zh-CN": "返回首页",
    }),
    goToDocs: t({
      en: "Go to Docs",
      es: "Ir a la documentación",
      fr: "Accéder à la documentation",
      ja: "ドキュメントへ",
      ko: "문서로 이동",
      pt: "Ir para a documentação",
      "zh-CN": "前往文档",
    }),
    pageNotFound: t({
      en: "Page not found",
      es: "Página no encontrada",
      fr: "Page introuvable",
      ja: "ページが見つかりません",
      ko: "페이지를 찾을 수 없습니다",
      pt: "Página não encontrada",
      "zh-CN": "页面未找到",
    }),
    pageNotFoundDescription: t({
      en: "The page you're looking for may have been moved, removed, renamed, or might never have existed.",
      es: "Es posible que la página que buscas haya sido movida, eliminada, renombrada o que nunca haya existido.",
      fr: "La page que vous recherchez a peut-être été déplacée, supprimée, renommée, ou n'a peut-être jamais existé.",
      ja: "お探しのページは移動または削除されたか、名前が変更されたか、そもそも存在しなかった可能性があります。",
      ko: "찾으시는 페이지가 이동, 삭제, 이름 변경되었거나 애초에 존재하지 않았을 수 있습니다.",
      pt: "A página que você está procurando pode ter sido movida, removida, renomeada ou pode nunca ter existido.",
      "zh-CN": "您要查找的页面可能已被移动、删除、重命名，或者从未存在过。",
    }),
  },
  key: "not-found",
} satisfies Dictionary;

export default notFoundContent;
