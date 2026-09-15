import { t } from "intlayer";
import type { Dictionary } from "intlayer";

const pdfPreviewContent = {
  content: {
    downloadPdf: t({
      en: "Download PDF",
      es: "Descargar PDF",
      fr: "Télécharger le PDF",
      ja: "PDF をダウンロード",
      ko: "PDF 다운로드",
      pt: "Baixar PDF",
      "zh-CN": "下载 PDF",
    }),
    failedToRenderPdf: t({
      en: "Failed to render PDF",
      es: "Error al renderizar el PDF",
      fr: "Échec du rendu du PDF",
      ja: "PDF のレンダリングに失敗しました",
      ko: "PDF 렌더링에 실패했습니다",
      pt: "Falha ao renderizar o PDF",
      "zh-CN": "PDF 渲染失败",
    }),
    pdfPreviewOptimizedForLargerScreens: t({
      en: "PDF preview is optimized for larger screens.",
      es: "La vista previa del PDF está optimizada para pantallas más grandes.",
      fr: "L'aperçu du PDF est optimisé pour les grands écrans.",
      ja: "PDF プレビューは大きな画面に最適化されています。",
      ko: "PDF 미리보기는 큰 화면에 최적화되어 있습니다.",
      pt: "A visualização do PDF é otimizada para telas maiores.",
      "zh-CN": "PDF 预览针对大屏幕进行了优化。",
    }),
    renderingPdf: t({
      en: "Rendering PDF…",
      es: "Renderizando PDF…",
      fr: "Rendu du PDF en cours…",
      ja: "PDF をレンダリング中…",
      ko: "PDF 렌더링 중…",
      pt: "Renderizando PDF…",
      "zh-CN": "渲染 PDF 中…",
    }),
  },
  key: "pdf-preview",
} satisfies Dictionary;

export default pdfPreviewContent;
