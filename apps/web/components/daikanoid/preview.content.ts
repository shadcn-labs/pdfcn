import { t } from "intlayer";
import type { Dictionary } from "intlayer";

const daikanoidPreviewContent = {
  content: {
    play: t({
      en: "Play",
      es: "Jugar",
      fr: "Jouer",
      ja: "プレイ",
      ko: "플레이",
      pt: "Jogar",
      "zh-CN": "开始",
    }),
    playThe404BrickBreakerGame: t({
      en: "Play the 404 brick breaker game",
      es: "Jugar al juego de romper ladrillos 404",
      fr: "Jouer au jeu de casse-briques 404",
      ja: "404 ブリックブレイカーゲームをプレイ",
      ko: "404 벽돌 깨기 게임 플레이",
      pt: "Jogar o jogo de quebrar tijolos 404",
      "zh-CN": "玩 404 打砖块游戏",
    }),
  },
  key: "daikanoid-preview",
} satisfies Dictionary;

export default daikanoidPreviewContent;
