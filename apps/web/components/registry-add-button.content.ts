import { t } from "intlayer";
import type { Dictionary } from "intlayer";

const registryAddButtonContent = {
  content: {
    add: t({
      en: "Add",
      es: "Agregar",
      fr: "Ajouter",
      ja: "追加",
      ko: "추가",
      pt: "Adicionar",
      "zh-CN": "添加",
    }),
    addRegistry: t({
      en: "Add Registry",
      es: "Agregar registro",
      fr: "Ajouter le registre",
      ja: "レジストリを追加",
      ko: "레지스트리 추가",
      pt: "Adicionar registro",
      "zh-CN": "添加注册表",
    }),
    addToProject: t({
      en: "to your project.",
      es: "a su proyecto.",
      fr: "à votre projet.",
      ja: "をプロジェクトに追加します。",
      ko: "프로젝트에 추가합니다.",
      pt: "ao seu projeto.",
      "zh-CN": "到您的项目。",
    }),
    done: t({
      en: "Done",
      es: "Listo",
      fr: "Terminé",
      ja: "完了",
      ko: "완료",
      pt: "Concluído",
      "zh-CN": "完成",
    }),
    runCommandDescription: t({
      en: "Run this command to add",
      es: "Ejecute este comando para agregar",
      fr: "Exécutez cette commande pour ajouter",
      ja: "このコマンドを実行して追加",
      ko: "이 명령어를 실행하여 추가",
      pt: "Execute este comando para adicionar",
      "zh-CN": "运行此命令以添加",
    }),
  },
  key: "registry-add-button",
} satisfies Dictionary;

export default registryAddButtonContent;
