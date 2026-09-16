import {
  usePdfcnTheme,
  useSafeMemo,
} from "@/registry/bases/takumi/components/theme-provider";

import { createFormStyles } from "./form.styles";
import type {
  FormLayout,
  PdfFormField,
  PdfFormGroup,
  PdfFormProps,
} from "./form.types";

const renderFieldAbove = (
  field: PdfFormField,
  idx: number,
  styles: ReturnType<typeof createFormStyles>
) => {
  const areaHeight = field.height ?? 18;
  const areaStyle: React.CSSProperties = {
    ...styles.fieldArea,
    minHeight: areaHeight,
  };

  return (
    <div key={`${field.label}-${idx}`} style={styles.fieldAbove}>
      <span style={styles.labelAbove}>{field.label}</span>
      <div style={areaStyle as React.CSSProperties}>
        {field.hint ? <span style={styles.hint}>{field.hint}</span> : null}
      </div>
    </div>
  );
};

const renderFieldLeft = (
  field: PdfFormField,
  idx: number,
  styles: ReturnType<typeof createFormStyles>
) => {
  const areaHeight = field.height ?? 18;
  const areaStyle: React.CSSProperties = {
    ...styles.fieldArea,
    ...styles.fieldLeftArea,
    minHeight: areaHeight,
  };

  return (
    <div key={`${field.label}-${idx}`} style={styles.fieldLeft}>
      <span style={styles.labelLeft}>{field.label}</span>
      <div style={areaStyle as React.CSSProperties}>
        {field.hint ? <span style={styles.hint}>{field.hint}</span> : null}
      </div>
    </div>
  );
};

const renderGroup = (
  group: PdfFormGroup,
  gi: number,
  styles: ReturnType<typeof createFormStyles>,
  labelPosition: "above" | "left"
) => {
  const layout: FormLayout = group.layout ?? "single";
  let cols: number;
  if (layout === "three-column") {
    cols = 3;
  } else if (layout === "two-column") {
    cols = 2;
  } else {
    cols = 1;
  }

  const renderField = (field: PdfFormField, idx: number) =>
    labelPosition === "left"
      ? renderFieldLeft(field, idx, styles)
      : renderFieldAbove(field, idx, styles);

  if (cols === 1) {
    return (
      <div key={`group-${gi}`} style={styles.group}>
        {group.title ? (
          <span style={styles.groupTitle}>{group.title}</span>
        ) : null}
        {group.fields.map(renderField)}
      </div>
    );
  }

  const chunkSize = Math.ceil(group.fields.length / cols);
  const chunks: PdfFormField[][] = [];
  for (let i = 0; i < group.fields.length; i += chunkSize) {
    chunks.push(group.fields.slice(i, i + chunkSize));
  }
  while (chunks.length < cols) {
    chunks.push([]);
  }

  return (
    <div key={`group-${gi}`} style={styles.group}>
      {group.title ? (
        <span style={styles.groupTitle}>{group.title}</span>
      ) : null}
      <div style={styles.columnsRow as React.CSSProperties}>
        {chunks.map((chunk, ci) => (
          <div key={`col-${gi}-${chunk[0]?.label ?? ci}`} style={styles.column}>
            {chunk.map(renderField)}
          </div>
        ))}
      </div>
    </div>
  );
};

export const PdfForm = ({
  title,
  subtitle,
  groups,
  variant = "underline",
  labelPosition = "above",
  noWrap = false,
  style,
}: PdfFormProps) => {
  const theme = usePdfcnTheme();
  const styles = useSafeMemo(
    () => createFormStyles(theme, variant),
    [theme, variant]
  );

  const rootStyles: React.CSSProperties[] = [styles.root];
  if (style) {
    rootStyles.push(style);
  }

  const inner = (
    <div style={Object.assign({}, ...rootStyles)}>
      {title ? <span style={styles.formTitle}>{title}</span> : null}
      {subtitle ? <span style={styles.formSubtitle}>{subtitle}</span> : null}
      {title || subtitle ? (
        <div style={styles.formDivider as React.CSSProperties} />
      ) : null}
      {groups.map((group, gi) => renderGroup(group, gi, styles, labelPosition))}
    </div>
  );

  return noWrap ? (
    <div style={{ breakInside: "avoid" as const }}>{inner}</div>
  ) : (
    inner
  );
};
