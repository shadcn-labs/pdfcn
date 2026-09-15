import { t } from "intlayer";
import type { Dictionary } from "intlayer";

const labsNavContent = {
  content: {
    closeMenu: t({
      en: "Close menu",
      es: "Cerrar menú",
      fr: "Fermer le menu",
      ja: "メニューを閉じる",
      ko: "메뉴 닫기",
      pt: "Fechar menu",
      "zh-CN": "关闭菜单",
    }),
    latest: t({
      en: "Latest",
      es: "Novedades",
      fr: "Nouveautés",
      ja: "最新",
      ko: "최신",
      pt: "Novidades",
      "zh-CN": "最新",
    }),
    ports: t({
      en: "Ports",
      es: "Adaptaciones",
      fr: "Portages",
      ja: "移植版",
      ko: "포트",
      pt: "Portes",
      "zh-CN": "移植版",
    }),
    registries: t({
      en: "Registries",
      es: "Registros",
      fr: "Registres",
      ja: "レジストリ",
      ko: "레지스트리",
      pt: "Registros",
      "zh-CN": "注册表",
    }),
    skills: t({
      en: "Skills",
      es: "Habilidades",
      fr: "Compétences",
      ja: "スキル",
      ko: "스킬",
      pt: "Habilidades",
      "zh-CN": "技能",
    }),
    templates: t({
      en: "Templates",
      es: "Plantillas",
      fr: "Modèles",
      ja: "テンプレート",
      ko: "템플릿",
      pt: "Modelos",
      "zh-CN": "模板",
    }),
  },
  key: "labs-nav",
} satisfies Dictionary;

export default labsNavContent;
