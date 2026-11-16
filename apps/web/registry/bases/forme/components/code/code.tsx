import { Text as FormeText } from "@formepdf/react";

import {
  usePdfcnTheme,
  useSafeMemo,
} from "@/registry/bases/forme/components/theme-provider";
import {
  View,
  Text as PDFText,
} from "@/registry/bases/forme/lib/pdf-primitives";
import type { Style } from "@/registry/bases/forme/lib/pdf-primitives";
import { resolveColor } from "@/registry/bases/forme/lib/resolve-color";

import { createCodeStyles } from "./code.styles";
import type { CodeProps } from "./code.types";
import { detectLanguage, tokenizeLine } from "./code.utils";
import type { CodeTokenType } from "./code.utils";

export const Code = ({
  code,
  title,
  language,
  maxLines,
  accentColor,
  style,
}: CodeProps) => {
  const theme = usePdfcnTheme();
  const styles = useSafeMemo(() => createCodeStyles(theme), [theme]);

  const allLines = code.split("\n");
  const truncated = maxLines !== undefined && allLines.length > maxLines;
  const lines = truncated ? allLines.slice(0, maxLines) : allLines;

  const containerStyles: Style[] = [styles.container];
  if (accentColor) {
    containerStyles.push({
      borderLeftColor: resolveColor(accentColor, theme.colors),
      borderLeftWidth: 2,
    });
  }
  if (style) {
    containerStyles.push(style);
  }

  const lang = language ?? detectLanguage(title);
  const tokenStyle: Record<CodeTokenType, Style | undefined> = {
    comment: styles.tokenComment,
    keyword: styles.tokenKeyword,
    number: styles.tokenNumber,
    plain: undefined,
    string: styles.tokenString,
  };

  return (
    <View style={containerStyles}>
      {title ? <PDFText style={styles.title}>{title}</PDFText> : null}
      {lines.map((line, i) => (
        <PDFText key={`${i}-${line.length}`} style={styles.code}>
          {line.length === 0
            ? " "
            : tokenizeLine(line, lang).map((token, j) =>
                token.type === "plain" ? (
                  token.text
                ) : (
                  // Raw <Text> required: Forme only produces styled runs from
                  // elements whose type it recognises (Text, Strong, Em…).
                  <FormeText key={`${i}-${j}`} style={tokenStyle[token.type]}>
                    {token.text}
                  </FormeText>
                )
              )}
        </PDFText>
      ))}
      {truncated ? (
        <PDFText style={[styles.code, styles.ellipsis]}>…</PDFText>
      ) : null}
    </View>
  );
};
