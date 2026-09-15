import { t } from "intlayer";
import type { Dictionary } from "intlayer";

const brandContextMenuContent = {
  content: {
    brandGuidelines: t({
      en: "Brand Guidelines",
      es: "Guías de marca",
      fr: "Directives de marque",
      ja: "ブランドガイドライン",
      ko: "브랜드 가이드라인",
      pt: "Diretrizes de marca",
      "zh-CN": "品牌指南",
    }),
    copyLogomarkAsSvg: t({
      en: "Copy Logomark as SVG",
      es: "Copiar el símbolo del logo como SVG",
      fr: "Copier le symbole du logo en SVG",
      ja: "ロゴマークをSVGとしてコピー",
      ko: "로고 마크를 SVG로 복사",
      pt: "Copiar o símbolo do logo como SVG",
      "zh-CN": "复制徽标符号为 SVG",
    }),
    copyLogotypeAsSvg: t({
      en: "Copy Logotype as SVG",
      es: "Copiar el logotipo como SVG",
      fr: "Copier le logotype en SVG",
      ja: "ロゴタイプをSVGとしてコピー",
      ko: "로고타입을 SVG로 복사",
      pt: "Copiar o logotipo como SVG",
      "zh-CN": "复制徽标文字为 SVG",
    }),
    downloadBrandAssets: t({
      en: "Download Brand Assets",
      es: "Descargar recursos de marca",
      fr: "Télécharger les ressources de marque",
      ja: "ブランドアセットをダウンロード",
      ko: "브랜드 에셋 다운로드",
      pt: "Baixar recursos da marca",
      "zh-CN": "下载品牌素材",
    }),
    logomarkCopiedToast: t({
      en: "Logomark as SVG copied",
      es: "Isotipo copiado como SVG",
      fr: "Symbole du logo copié en SVG",
      ja: "ロゴマークのSVGをコピーしました",
      ko: "로고 마크 SVG가 복사되었습니다",
      pt: "Símbolo do logo copiado como SVG",
      "zh-CN": "徽标符号 SVG 已复制",
    }),
    logotypeCopiedToast: t({
      en: "Logotype as SVG copied",
      es: "Logotipo copiado como SVG",
      fr: "Logotype copié en SVG",
      ja: "ロゴタイプのSVGをコピーしました",
      ko: "로고타입 SVG가 복사되었습니다",
      pt: "Logotipo copiado como SVG",
      "zh-CN": "徽标文字 SVG 已复制",
    }),
  },
  key: "brand-context-menu",
} satisfies Dictionary;

export default brandContextMenuContent;
