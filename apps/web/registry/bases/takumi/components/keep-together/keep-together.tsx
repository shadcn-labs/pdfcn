import type { ReactNode } from "react";

import type { PDFComponentProps } from "@/registry/types/pdf-components";

export interface KeepTogetherProps {
  children?: ReactNode;
  minPresenceAhead?: number;
  style?: PDFComponentProps["style"];
}

export const KeepTogether = ({ children, style }: KeepTogetherProps) => (
  <div
    style={Object.assign(
      {},
      { breakInside: "avoid" },
      ...(style ? [style] : [])
    )}
  >
    {children}
  </div>
);
