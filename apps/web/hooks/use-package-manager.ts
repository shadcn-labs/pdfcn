import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export type PackageManager = "npm" | "yarn" | "pnpm" | "bun";

export type CommandTab = PackageManager | "shadcn" | "prompt";

const packageManagerAtom = atomWithStorage<PackageManager>(
  "package-manager",
  "pnpm"
);

const commandTabAtom = atomWithStorage<CommandTab>(
  "command-tab",
  "pnpm"
);

export const usePackageManager = () => useAtom(packageManagerAtom);

export const useCommandTab = () => useAtom(commandTabAtom);
