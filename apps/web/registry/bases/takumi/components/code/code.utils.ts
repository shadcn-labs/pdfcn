/** Language identifiers accepted by the Code component's `language` prop. */
export type CodeLanguage =
  | "bash"
  | "javascript"
  | "js"
  | "json"
  | "jsx"
  | "py"
  | "python"
  | "sh"
  | "shell"
  | "ts"
  | "tsx"
  | "typescript"
  | "zsh";

/** Visual category a code token is painted with. */
export type CodeTokenType =
  | "comment"
  | "keyword"
  | "number"
  | "plain"
  | "string";

export interface CodeToken {
  text: string;
  type: CodeTokenType;
}

interface LanguageConfig {
  /** Patterns that start a comment (matched to end of line). */
  comments: string[];
  /** Exact words painted as keywords (also covers literals and commands). */
  keywords: string[];
}

const STRING_RE = [
  String.raw`"(?:[^"\\\n]|\\.)*"`,
  String.raw`'(?:[^'\\\n]|\\.)*'`,
  "`(?:[^`\\\\\n]|\\\\.)*`",
].join("|");
const NUMBER_RE = String.raw`\b\d[\d_]*(?:\.[\d_]+)?\b`;
const SLASH_COMMENT = String.raw`\/\/[^\n]*|\/\*[^\n]*?\*\/`;
const HASH_COMMENT = String.raw`#[^\n]*`;

const C_KEYWORDS = [
  "async",
  "await",
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "debugger",
  "default",
  "delete",
  "do",
  "else",
  "export",
  "extends",
  "false",
  "finally",
  "for",
  "from",
  "function",
  "get",
  "if",
  "import",
  "in",
  "instanceof",
  "let",
  "new",
  "null",
  "of",
  "return",
  "set",
  "static",
  "super",
  "switch",
  "this",
  "throw",
  "true",
  "try",
  "typeof",
  "undefined",
  "var",
  "void",
  "while",
  "yield",
];

const PY_KEYWORDS = [
  "False",
  "None",
  "True",
  "and",
  "as",
  "assert",
  "async",
  "await",
  "break",
  "class",
  "continue",
  "def",
  "del",
  "elif",
  "else",
  "except",
  "finally",
  "for",
  "from",
  "global",
  "if",
  "import",
  "in",
  "is",
  "lambda",
  "nonlocal",
  "not",
  "or",
  "pass",
  "print",
  "raise",
  "return",
  "try",
  "while",
  "with",
  "yield",
];

const SH_KEYWORDS = [
  "alias",
  "apt",
  "brew",
  "case",
  "cd",
  "chmod",
  "cp",
  "curl",
  "docker",
  "do",
  "done",
  "echo",
  "elif",
  "else",
  "esac",
  "export",
  "fi",
  "for",
  "function",
  "git",
  "if",
  "in",
  "local",
  "ls",
  "mkdir",
  "mv",
  "npm",
  "npx",
  "pnpm",
  "printf",
  "read",
  "rm",
  "set",
  "source",
  "sudo",
  "then",
  "unset",
  "wget",
  "while",
  "yarn",
];

const normalizeLanguage = (language?: string): string => {
  switch (language?.toLowerCase()) {
    case "javascript":
    case "js":
    case "jsx":
    case "ts":
    case "tsx":
    case "typescript": {
      return "clike";
    }
    case "py":
    case "python": {
      return "python";
    }
    case "json": {
      return "json";
    }
    case "bash":
    case "sh":
    case "shell":
    case "zsh": {
      return "shell";
    }
    default: {
      return "";
    }
  }
};

const LANG_CONFIGS: Record<string, LanguageConfig> = {
  clike: { comments: [SLASH_COMMENT], keywords: C_KEYWORDS },
  json: { comments: [], keywords: ["false", "null", "true"] },
  python: { comments: [HASH_COMMENT], keywords: PY_KEYWORDS },
  shell: { comments: [HASH_COMMENT], keywords: SH_KEYWORDS },
};

/** Infers a language hint from a title/filename extension (`"app.ts"` → `"ts"`). */
export const detectLanguage = (title?: string): string | undefined => {
  const match = title
    ?.trim()
    .split(/\s+/)[0]
    ?.match(/\.([a-z]+)$/i);
  return match?.[1]?.toLowerCase();
};

/** Splits one line of source into typed tokens for inline highlighting. */
export const tokenizeLine = (line: string, language?: string): CodeToken[] => {
  const cfg = LANG_CONFIGS[normalizeLanguage(language)];
  if (!cfg) {
    return [{ text: line, type: "plain" }];
  }
  const keywordRe = `\\b(?:${cfg.keywords.join("|")})\\b`;
  const parts = [...cfg.comments, STRING_RE, NUMBER_RE, keywordRe];
  const re = new RegExp(`(${parts.join(")|(")})`, "g");
  const types: CodeTokenType[] = [
    ...cfg.comments.map(() => "comment" as const),
    "string",
    "number",
    "keyword",
  ];
  const tokens: CodeToken[] = [];
  let cursor = 0;
  for (const match of line.matchAll(re)) {
    const index = match.index ?? 0;
    if (index > cursor) {
      tokens.push({ text: line.slice(cursor, index), type: "plain" });
    }
    const group = match.slice(1).findIndex((g) => g !== undefined);
    tokens.push({ text: match[0], type: types[group] ?? "plain" });
    cursor = index + match[0].length;
  }
  if (cursor < line.length) {
    tokens.push({ text: line.slice(cursor), type: "plain" });
  }
  return tokens;
};
