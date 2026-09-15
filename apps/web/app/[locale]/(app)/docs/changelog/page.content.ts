import { t } from "intlayer";
import type { Dictionary } from "intlayer";

const changelogContent = {
  content: {
    changelog: t({
      en: "Changelog",
      es: "Registro de cambios",
      fr: "Journal des modifications",
      ja: "更新履歴",
      ko: "변경 로그",
      pt: "Registro de alterações",
      "zh-CN": "更新日志",
    }),
    latestUpdatesDescription: t({
      en: "Latest updates and announcements for pdfcn.",
      es: "Últimas actualizaciones y anuncios de pdfcn.",
      fr: "Dernières mises à jour et annonces pour pdfcn.",
      ja: "pdfcn の最新アップデートとお知らせ。",
      ko: "pdfcn의 최신 업데이트 및 공지사항.",
      pt: "Últimas atualizações e anúncios do pdfcn.",
      "zh-CN": "pdfcn 的最新更新和公告。",
    }),
    moreUpdates: t({
      en: "More Updates",
      es: "Más actualizaciones",
      fr: "Plus de mises à jour",
      ja: "その他の更新",
      ko: "더 많은 업데이트",
      pt: "Mais atualizações",
      "zh-CN": "更多更新",
    }),
    onThisPage: t({
      en: "On This Page",
      es: "En esta página",
      fr: "Sur cette page",
      ja: "このページの内容",
      ko: "이 페이지의 내용",
      pt: "Nesta página",
      "zh-CN": "本页内容",
    }),
    rss: t({
      en: "RSS",
      es: "RSS",
      fr: "RSS",
      ja: "RSS",
      ko: "RSS",
      pt: "RSS",
      "zh-CN": "RSS",
    }),
  },
  key: "changelog",
} satisfies Dictionary;

export default changelogContent;
