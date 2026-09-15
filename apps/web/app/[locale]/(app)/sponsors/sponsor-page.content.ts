import { t } from "intlayer";
import type { Dictionary } from "intlayer";

const sponsorPageContent = {
  content: {
    becomeSponsorLabel: t({
      en: "Become a Sponsor",
      es: "Conviértete en patrocinador",
      fr: "Devenir sponsor",
      ja: "スポンサーになる",
      ko: "스폰서 되기",
      pt: "Torne-se um patrocinador",
      "zh-CN": "成为赞助商",
    }),
    ctaDescription: t({
      en: "Every bit helps — whether it's a sponsorship, a star, or sharing something you found useful.",
      es: "Cada aporte ayuda, ya sea un patrocinio, una estrella o compartir algo que te haya resultado útil.",
      fr: "Chaque geste compte, qu'il s'agisse d'un sponsoring, d'une étoile ou du partage de quelque chose que vous avez trouvé utile.",
      ja: "スポンサーでも、スターでも、役に立ったものをシェアするだけでも——どんな形の応援も力になります。",
      ko: "스폰서십이든, 스타든, 유용하다고 느낀 것을 공유하는 것이든 — 작은 도움도 큰 힘이 됩니다.",
      pt: "Cada contribuição ajuda — seja um patrocínio, uma estrela ou compartilhar algo que você achou útil.",
      "zh-CN":
        "每一份支持都有帮助——无论是赞助、点星标，还是分享你觉得有用的内容。",
    }),
    ctaTitle: t({
      en: "Want to back the project?",
      es: "¿Quieres apoyar el proyecto?",
      fr: "Vous souhaitez soutenir le projet ?",
      ja: "プロジェクトを応援しませんか？",
      ko: "이 프로젝트를 후원하고 싶으신가요?",
      pt: "Quer apoiar o projeto?",
      "zh-CN": "想要支持这个项目吗？",
    }),
    heroDescriptionPrimary: t({
      en: "pdfcn is a collection of beautifully designed, accessible, and customizable PDF components for React. Every component is free and that's not changing.",
      es: "pdfcn es una colección de componentes PDF para React, bellamente diseñados, accesibles y personalizables. Todos los componentes son gratuitos y eso no va a cambiar.",
      fr: "pdfcn est une collection de composants PDF pour React, magnifiquement conçus, accessibles et personnalisables. Chaque composant est gratuit, et cela ne changera pas.",
      ja: "pdfcn は、美しくデザインされ、アクセシブルでカスタマイズ可能な React 用 PDF コンポーネント集です。すべてのコンポーネントは無料で、それは今後も変わりません。",
      ko: "pdfcn은 아름답게 디자인되고 접근성이 뛰어나며 커스터마이징 가능한 React용 PDF 컴포넌트 모음입니다. 모든 컴포넌트는 무료이며, 이는 앞으로도 변하지 않습니다.",
      pt: "pdfcn é uma coleção de componentes PDF para React lindamente projetados, acessíveis e personalizáveis. Todo componente é gratuito e isso não vai mudar.",
      "zh-CN":
        "pdfcn 是一套设计精美、无障碍且可自定义的 React PDF 组件集合。每一个组件都是免费的，这一点不会改变。",
    }),
    heroDescriptionSecondary: t({
      en: "I'm not going to paywall features or gate components behind a sponsorship tier. But if pdfcn made your project better, or you just like that this exists in the open, sponsoring is a nice way to say so. It helps me justify spending real time on it instead of treating it like a side-of-desk thing.",
      es: "No voy a poner funciones tras un muro de pago ni a bloquear componentes detrás de un nivel de patrocinio. Pero si pdfcn mejoró tu proyecto, o simplemente te gusta que exista de forma abierta, patrocinar es una buena manera de demostrarlo. Me ayuda a justificar dedicarle tiempo real en lugar de tratarlo como algo secundario.",
      fr: "Je ne vais pas mettre de fonctionnalités derrière un mur payant ni réserver des composants à un palier de sponsoring. Mais si pdfcn a amélioré votre projet, ou si vous appréciez simplement que cela existe en open source, le sponsoring est une belle façon de le montrer. Cela m'aide à justifier d'y consacrer du temps réel plutôt que de le traiter comme un à-côté.",
      ja: "機能を有料化したり、コンポーネントをスポンサー階層の裏に隠したりするつもりはありません。ですが、pdfcn があなたのプロジェクトをより良くした、あるいはこれがオープンな形で存在していることが気に入っているなら、スポンサーになることはその気持ちを伝える良い方法です。片手間の作業としてではなく、きちんと時間を割く理由にもなります。",
      ko: "기능을 유료화하거나 컴포넌트를 스폰서 등급 뒤에 가두지는 않을 겁니다. 하지만 pdfcn이 여러분의 프로젝트를 더 낫게 만들었거나, 이것이 오픈소스로 존재한다는 사실이 마음에 든다면 스폰서십은 그 마음을 표현하는 좋은 방법입니다. 이는 제가 이 프로젝트에 부수적인 일이 아니라 진짜 시간을 투자할 명분이 되어줍니다.",
      pt: "Não vou colocar funcionalidades atrás de um paywall nem bloquear componentes por trás de um nível de patrocínio. Mas se o pdfcn melhorou seu projeto, ou você simplesmente gosta que isso exista de forma aberta, patrocinar é uma boa maneira de demonstrar isso. Isso me ajuda a justificar dedicar tempo de verdade a ele, em vez de tratá-lo como algo secundário.",
      "zh-CN":
        "我不会把功能设为付费墙，也不会把组件锁在赞助等级之后。但如果 pdfcn 让你的项目变得更好，或者你只是喜欢它以开源的方式存在，赞助是表达这份心意的一种好方式。这也能帮助我更有底气地为它投入真正的时间，而不是把它当成一件顺手做做的小事。",
    }),
    heroDescriptionTertiary: t({
      en: "Any amount is genuinely appreciated. And if money's not your thing, starring the repo or sharing something you liked works too.",
      es: "Cualquier cantidad se agradece de verdad. Y si el dinero no es lo tuyo, darle una estrella al repositorio o compartir algo que te haya gustado también ayuda.",
      fr: "Tout montant est vraiment apprécié. Et si l'argent n'est pas votre truc, mettre une étoile au dépôt ou partager quelque chose que vous avez aimé fonctionne aussi.",
      ja: "どんな金額でも心から感謝します。もしお金での支援が難しければ、リポジトリにスターを付けたり、気に入ったものをシェアしたりするだけでも十分です。",
      ko: "금액과 관계없이 진심으로 감사드립니다. 후원이 부담스럽다면 저장소에 스타를 눌러주거나 마음에 든 것을 공유해 주셔도 좋습니다.",
      pt: "Qualquer valor é genuinamente bem-vindo. E se dinheiro não for a sua praia, dar uma estrela no repositório ou compartilhar algo que você gostou também ajuda muito.",
      "zh-CN":
        "任何金额都由衷感激。如果不方便捐款，给仓库点个星标，或者分享你喜欢的内容同样很棒。",
    }),
    heroTitle: t({
      en: "Support the project",
      es: "Apoya el proyecto",
      fr: "Soutenir le projet",
      ja: "プロジェクトを応援する",
      ko: "프로젝트 후원하기",
      pt: "Apoie o projeto",
      "zh-CN": "支持这个项目",
    }),
    metadataDescription: t({
      en: "Support pdfcn — beautiful PDF components for React. Sponsor tiers, stargazers, and how to contribute.",
      es: "Apoya a pdfcn: hermosos componentes PDF para React. Niveles de patrocinio, quienes le dieron una estrella y cómo contribuir.",
      fr: "Soutenez pdfcn — de superbes composants PDF pour React. Paliers de sponsoring, personnes ayant mis une étoile, et comment contribuer.",
      ja: "pdfcn を応援しよう——React 向けの美しい PDF コンポーネント。スポンサー階層、スター登録者、そして貢献方法について。",
      ko: "pdfcn을 후원하세요 — React를 위한 아름다운 PDF 컴포넌트. 스폰서 등급, 스타를 눌러준 사용자, 기여 방법을 확인해보세요.",
      pt: "Apoie o pdfcn — belos componentes PDF para React. Níveis de patrocínio, quem deu estrela e como contribuir.",
      "zh-CN":
        "支持 pdfcn——精美的 React PDF 组件库。了解赞助等级、点星用户以及如何参与贡献。",
    }),
    metadataTitle: t({
      en: "Sponsors",
      es: "Patrocinadores",
      fr: "Sponsors",
      ja: "スポンサー",
      ko: "스폰서",
      pt: "Patrocinadores",
      "zh-CN": "赞助者",
    }),
    sponsorOnGithubLabel: t({
      en: "Sponsor on GitHub",
      es: "Patrocinar en GitHub",
      fr: "Sponsoriser sur GitHub",
      ja: "GitHub でスポンサーになる",
      ko: "GitHub에서 스폰서하기",
      pt: "Patrocinar no GitHub",
      "zh-CN": "在 GitHub 上赞助",
    }),
    starOnGithubLabel: t({
      en: "Star on GitHub",
      es: "Dar una estrella en GitHub",
      fr: "Mettre une étoile sur GitHub",
      ja: "GitHub でスターを付ける",
      ko: "GitHub에서 스타 누르기",
      pt: "Dar estrela no GitHub",
      "zh-CN": "在 GitHub 上点星",
    }),
    stargazersLabel: t({
      en: "Stargazers",
      es: "Personas que dieron estrella",
      fr: "Personnes ayant mis une étoile",
      ja: "スターを付けたユーザー",
      ko: "스타를 누른 사용자",
      pt: "Quem deu estrela",
      "zh-CN": "星标用户",
    }),
  },
  key: "sponsor-page",
} satisfies Dictionary;

export default sponsorPageContent;
