import { t } from "intlayer";
import type { Dictionary } from "intlayer";

const docsTocFooterContent = {
  content: {
    editThisPage: t({
      en: "Edit this page",
      es: "Editar esta página",
      fr: "Modifier cette page",
      ja: "このページを編集",
      ko: "이 페이지 편집",
      pt: "Editar esta página",
      "zh-CN": "编辑此页",
    }),
    followHandle: t({
      en: "Follow @shadcnlabs",
      es: "Seguir a @shadcnlabs",
      fr: "Suivre @shadcnlabs",
      ja: "@shadcnlabs をフォロー",
      ko: "@shadcnlabs 팔로우",
      pt: "Seguir @shadcnlabs",
      "zh-CN": "关注 @shadcnlabs",
    }),
    joinCommunity: t({
      en: "Join community",
      es: "Unirse a la comunidad",
      fr: "Rejoindre la communauté",
      ja: "コミュニティに参加",
      ko: "커뮤니티 참여",
      pt: "Participar da comunidade",
      "zh-CN": "加入社区",
    }),
  },
  key: "docs-toc-footer",
} satisfies Dictionary;

export default docsTocFooterContent;
