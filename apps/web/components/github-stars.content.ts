import { t } from "intlayer";
import type { Dictionary } from "intlayer";

const githubStarsContent = {
  content: {
    stars: t({
      en: "stars",
      es: "estrellas",
      fr: "étoiles",
      ja: "スター",
      ko: "별",
      pt: "estrelas",
      "zh-CN": "星标",
    }),
  },
  key: "github-stars",
} satisfies Dictionary;

export default githubStarsContent;
