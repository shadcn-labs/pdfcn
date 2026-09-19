import { t } from "intlayer";
import type { Dictionary } from "intlayer";

const takumiPreviewContent = {
  content: {
    document: t({
      en: "document",
      es: "documento",
      fr: "document",
      ja: "ドキュメント",
      ko: "문서",
      pt: "documento",
      "zh-CN": "文档",
    }),
    openPdfInNewTab: t({
      en: "Open PDF in new tab",
      es: "Abrir PDF en nueva pestaña",
      fr: "Ouvrir le PDF dans un nouvel onglet",
      ja: "PDF を新しいタブで開く",
      ko: "새 탭에서 PDF 열기",
      pt: "Abrir PDF em nova aba",
      "zh-CN": "在新标签页中打开 PDF",
    }),
    pdfPreview: t({
      en: "PDF Preview",
      es: "Vista previa de PDF",
      fr: "Aperçu du PDF",
      ja: "PDF プレビュー",
      ko: "PDF 미리보기",
      pt: "Pré-visualização do PDF",
      "zh-CN": "PDF 预览",
    }),
    preview: t({
      en: "preview",
      es: "vista previa",
      fr: "aperçu",
      ja: "プレビュー",
      ko: "미리보기",
      pt: "pré-visualização",
      "zh-CN": "预览",
    }),
  },
  key: "takumi-preview",
} satisfies Dictionary;

export default takumiPreviewContent;
