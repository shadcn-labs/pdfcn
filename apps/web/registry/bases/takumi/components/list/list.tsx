import type React from "react";

import {
  usePdfcnTheme,
  useSafeMemo,
} from "@/registry/bases/takumi/components/theme-provider";

import { createListStyles } from "./list.styles";
import type { ListItem, ListVariant, PdfListProps } from "./list.types";

type Styles = ReturnType<typeof createListStyles>;
type GapProp = "xs" | "sm" | "md";

const getGapStyle = (gap: GapProp, styles: Styles): React.CSSProperties => {
  if (gap === "xs") {
    return styles.itemRowGapXs;
  }
  if (gap === "md") {
    return styles.itemRowGapMd;
  }
  return styles.itemRowGapSm;
};

const buildRowStyles = (
  index: number,
  total: number,
  gap: GapProp,
  styles: Styles,
  align: "start" | "center" = "start"
): React.CSSProperties[] => {
  const row: React.CSSProperties[] = [
    align === "center" ? styles.itemRowCenter : styles.itemRow,
  ];
  if (index !== total - 1) {
    row.push(getGapStyle(gap, styles));
  }
  return row;
};

/** Bullet dot marker — solid filled for level 0, outline ring for nested levels. */
const dotMarker = (level: number, styles: Styles): React.ReactElement =>
  level === 0 ? (
    <div style={styles.markerBulletWrap}>
      <div style={styles.markerBulletDot} />
    </div>
  ) : (
    <div style={styles.markerBulletSubWrap}>
      <div style={styles.markerBulletSubDot} />
    </div>
  );

// eslint-disable-next-line no-use-before-define, prefer-const
let renderBulletItem: (
  item: ListItem,
  index: number,
  total: number,
  gap: GapProp,
  styles: Styles,
  level: number
) => React.ReactElement;
// eslint-disable-next-line no-use-before-define, prefer-const
let renderMultiLevelItem: (
  item: ListItem,
  index: number,
  total: number,
  gap: GapProp,
  styles: Styles,
  level: number
) => React.ReactElement;

const renderNumberedItem = (
  item: ListItem,
  index: number,
  total: number,
  gap: GapProp,
  styles: Styles
): React.ReactElement => (
  <div
    key={index}
    style={Object.assign(
      {},
      ...buildRowStyles(index, total, gap, styles, "center")
    )}
  >
    <div style={styles.markerNumberBadge}>
      <span style={styles.markerNumberText}>{`${index + 1}`}</span>
    </div>
    <div style={styles.itemTextWrap}>
      <span style={styles.itemText}>{item.text}</span>
    </div>
  </div>
);

const renderChecklistItem = (
  item: ListItem,
  index: number,
  total: number,
  gap: GapProp,
  styles: Styles
): React.ReactElement => {
  const isChecked = item.checked ?? true;
  return (
    <div
      key={index}
      style={Object.assign(
        {},
        ...buildRowStyles(index, total, gap, styles, "center")
      )}
    >
      <div
        style={{
          ...styles.checkBox,
          ...(isChecked ? styles.checkBoxChecked : {}),
        }}
      ></div>
      <div style={styles.itemTextWrap}>
        <span style={styles.itemText}>{item.text}</span>
      </div>
    </div>
  );
};

const renderIconItem = (
  item: ListItem,
  index: number,
  total: number,
  gap: GapProp,
  styles: Styles
): React.ReactElement => (
  <div
    key={index}
    style={Object.assign(
      {},
      ...buildRowStyles(index, total, gap, styles, "center")
    )}
  >
    <div style={styles.iconBox}>
      <span style={styles.iconMark}>★</span>
    </div>
    <div style={styles.itemTextWrap}>
      <span style={styles.itemText}>{item.text}</span>
    </div>
  </div>
);

const renderDescriptiveItem = (
  item: ListItem,
  index: number,
  total: number,
  gap: GapProp,
  styles: Styles
): React.ReactElement => (
  <div
    key={index}
    style={Object.assign({}, ...buildRowStyles(index, total, gap, styles))}
  >
    <div style={styles.descriptiveAccent} />
    <div style={styles.descriptiveContent}>
      <span style={styles.descriptiveTitle}>{item.text}</span>
      {item.description ? (
        <span style={styles.descriptiveDesc}>{item.description}</span>
      ) : null}
    </div>
  </div>
);

const renderItem = (
  item: ListItem,
  index: number,
  total: number,
  variant: ListVariant,
  gap: GapProp,
  styles: Styles,
  level: number
): React.ReactElement | null => {
  switch (variant) {
    case "bullet": {
      return renderBulletItem(item, index, total, gap, styles, level);
    }
    case "numbered": {
      return renderNumberedItem(item, index, total, gap, styles);
    }
    case "checklist": {
      return renderChecklistItem(item, index, total, gap, styles);
    }
    case "icon": {
      return renderIconItem(item, index, total, gap, styles);
    }
    case "multi-level": {
      return renderMultiLevelItem(item, index, total, gap, styles, level);
    }
    case "descriptive": {
      return renderDescriptiveItem(item, index, total, gap, styles);
    }
    default: {
      break;
    }
  }
  return null;
};

const renderItemList = (
  items: ListItem[],
  variant: ListVariant,
  gap: GapProp,
  styles: Styles,
  level: number
): React.ReactElement => (
  <div style={level > 0 ? styles.childrenContainer : undefined}>
    {items.map((item, index) =>
      renderItem(item, index, items.length, variant, gap, styles, level)
    )}
  </div>
);

renderBulletItem = (item, index, total, gap, styles, level) => (
  <div key={index}>
    <div
      style={Object.assign({}, ...buildRowStyles(index, total, gap, styles))}
    >
      {dotMarker(level, styles)}
      <div style={styles.itemTextWrap}>
        <span style={styles.itemText}>{item.text}</span>
      </div>
    </div>
    {item.children && item.children.length > 0
      ? renderItemList(item.children, "bullet", gap, styles, level + 1)
      : null}
  </div>
);

renderMultiLevelItem = (item, index, total, gap, styles, level) => (
  <div key={index}>
    <div
      style={Object.assign({}, ...buildRowStyles(index, total, gap, styles))}
    >
      {dotMarker(level, styles)}
      <div style={styles.itemTextWrap}>
        <span
          style={{
            ...(level === 0 ? styles.itemText : styles.itemTextSub),
            ...(level === 0 ? styles.itemTextBold : {}),
          }}
        >
          {item.text}
        </span>
      </div>
    </div>
    {item.children && item.children.length > 0
      ? renderItemList(item.children, "multi-level", gap, styles, level + 1)
      : null}
  </div>
);

export const PdfList = ({
  items,
  variant = "bullet",
  gap = "sm",
  style,
  _noWrap = false,
  _level = 0,
}: PdfListProps) => {
  const theme = usePdfcnTheme();
  const styles = useSafeMemo(() => createListStyles(theme), [theme]);

  const containerStyles: React.CSSProperties[] = [styles.container];
  if (_level > 0) {
    containerStyles.push(styles.childrenContainer);
  }
  const styleArray = style ? [...containerStyles, style] : containerStyles;

  return (
    <div style={Object.assign({}, ...styleArray)}>
      {items.map((item, index) =>
        renderItem(item, index, items.length, variant, gap, styles, _level)
      )}
    </div>
  );
};
