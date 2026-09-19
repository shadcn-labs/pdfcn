"use client";

import { LayoutTemplate, Palette, Shuffle, Type } from "lucide-react";
import { useIntlayer } from "next-intlayer";
import { Fragment } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type {
  ColorTokenName,
  HeadingLevel,
  PageMargin,
  SpacingTokenName,
  ThemeBuilderActions,
} from "@/hooks/use-theme-builder";
import { cn } from "@/lib/utils";
import type { PdfcnTheme, ThemePresetName } from "@/registry/themes";
import { THEMES } from "@/registry/themes";

import { ThemePicker } from "./theme-picker";

const COLOR_LABELS: Record<ColorTokenName, string> = {
  accent: "Accent",
  background: "Background",
  border: "Border",
  destructive: "Destructive",
  foreground: "Foreground",
  info: "Info",
  muted: "Muted",
  mutedForeground: "Muted foreground",
  primary: "Primary",
  primaryForeground: "Primary foreground",
  success: "Success",
  warning: "Warning",
};

const COLOR_DESCRIPTIONS: Record<ColorTokenName, string> = {
  accent: "Links, highlights",
  background: "Page background",
  border: "Dividers, table lines",
  destructive: "Errors",
  foreground: "Primary text",
  info: "Info states",
  muted: "Secondary fill",
  mutedForeground: "Captions, footnotes",
  primary: "Brand emphasis",
  primaryForeground: "Text on primary",
  success: "Success states",
  warning: "Warning states",
};

const COLOR_FIELD_KEYS = [
  "foreground",
  "background",
  "primary",
  "primaryForeground",
  "muted",
  "mutedForeground",
  "accent",
  "border",
  "destructive",
  "success",
  "warning",
  "info",
] as const satisfies readonly ColorTokenName[];

const FONT_OPTIONS = [
  "Helvetica",
  "Times-Roman",
  "Courier",
  "Inter",
  "Lato",
  "Lora",
  "Merriweather",
  "Nunito",
  "Open Sans",
  "Playfair Display",
  "Source Code Pro",
  "JetBrains Mono",
] as const;

const HEADING_LEVELS = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;

interface NumberFieldProps {
  label: string;
  max: number;
  min: number;
  onCommit: (value: number) => void;
  step?: number;
  suffix?: string;
  value: number;
}

const NumberField = ({
  label,
  max,
  min,
  onCommit,
  step = 1,
  suffix,
  value,
}: NumberFieldProps) => (
  <label className="grid gap-1.5 text-xs font-medium text-foreground">
    <span className="flex items-center justify-between gap-2">
      {label}
      {suffix ? (
        <span className="font-normal text-muted-foreground">{suffix}</span>
      ) : null}
    </span>
    <Input
      key={`${label}-${value}`}
      className="h-8 tabular-nums"
      defaultValue={value}
      max={max}
      min={min}
      onBlur={(event) => {
        const parsed = Number(event.currentTarget.value);
        if (!Number.isFinite(parsed)) {
          event.currentTarget.value = String(value);
          return;
        }

        const nextValue = Math.min(max, Math.max(min, parsed));
        event.currentTarget.value = String(nextValue);
        onCommit(nextValue);
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.currentTarget.blur();
        }
      }}
      step={step}
      type="number"
    />
  </label>
);

interface ColorFieldProps {
  description: string;
  label: string;
  onCommit: (value: string) => void;
  value: string;
}

const ColorField = ({
  description,
  label,
  onCommit,
  value,
}: ColorFieldProps) => (
  <div className="flex items-center gap-3">
    <div className="min-w-0 flex-1">
      <span className="block truncate text-xs font-medium">{label}</span>
      <span className="block truncate text-[10px] text-muted-foreground">
        {description}
      </span>
    </div>
    <Input
      aria-label={`Choose ${label.toLowerCase()} color`}
      className="size-8 shrink-0 cursor-pointer rounded-md border-0 bg-transparent p-0.5 shadow-none"
      onChange={(event) => onCommit(event.currentTarget.value)}
      type="color"
      value={value}
    />
    <Input
      key={`${label}-${value}`}
      aria-label={`${label} hex value`}
      className="h-8 w-[5.5rem] shrink-0 px-2 font-mono text-[11px] uppercase"
      defaultValue={value}
      maxLength={7}
      onBlur={(event) => {
        const nextValue = event.currentTarget.value.trim();
        if (/^#[0-9a-f]{6}$/i.test(nextValue)) {
          onCommit(nextValue.toLowerCase());
        } else {
          event.currentTarget.value = value;
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.currentTarget.blur();
        }
      }}
      spellCheck={false}
    />
  </div>
);

interface SectionProps {
  children: React.ReactNode;
  description: string;
  title: string;
}

const Section = ({ children, description, title }: SectionProps) => (
  <div>
    <div className="mb-3 space-y-0.5">
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
    {children}
  </div>
);

interface ThemeControlsProps {
  actions: ThemeBuilderActions;
  basePreset: ThemePresetName;
  className?: string;
  idPrefix: string;
  theme: PdfcnTheme;
}

export const ThemeControls = ({
  actions,
  basePreset,
  className,
  idPrefix,
  theme,
}: ThemeControlsProps) => {
  const content = useIntlayer("theme-controls");
  return (
    <div className={cn("space-y-4 py-4", className)}>
      <div className="space-y-3 border-b px-6 pb-4">
        <label
          className="grid gap-1.5 text-xs font-medium"
          htmlFor={`${idPrefix}-theme-name`}
        >
          {content.exportName}
          <Input
            key={theme.name}
            id={`${idPrefix}-theme-name`}
            className="h-8"
            defaultValue={theme.name}
            maxLength={48}
            onBlur={(event) => {
              const nextName = event.currentTarget.value.trim();
              if (nextName) {
                actions.setName(nextName);
              } else {
                event.currentTarget.value = theme.name;
              }
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.currentTarget.blur();
              }
            }}
          />
        </label>

        <div className="flex items-center gap-1.5">
          <ThemePicker
            onThemeSelect={(name) => actions.loadPreset(name)}
            selectedTheme={basePreset}
          />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                aria-label="Pick a random preset"
                onClick={() => {
                  const others = THEMES.filter(
                    ({ name }) => name !== basePreset
                  );
                  const next =
                    others[Math.floor(Math.random() * others.length)];
                  if (next) {
                    actions.loadPreset(next.name);
                  }
                }}
                size="icon-sm"
                variant="outline"
              >
                <Shuffle />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{content.randomPreset}</TooltipContent>
          </Tooltip>
        </div>
      </div>

      <Tabs className="gap-4 px-6" defaultValue="colors">
        <TabsList className="grid w-full grid-cols-3 gap-1">
          <TabsTrigger value="colors">
            <Palette />
            {content.colors}
          </TabsTrigger>
          <TabsTrigger value="typography">
            <Type />
            {content.typography}
          </TabsTrigger>
          <TabsTrigger value="layout">
            <LayoutTemplate />
            {content.layout}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="colors">
          {COLOR_FIELD_KEYS.map((key, index) => (
            <Fragment key={key}>
              {index > 0 ? <Separator className="my-3" /> : null}
              <ColorField
                description={
                  (content[
                    `${key}Description` as keyof typeof content
                  ] as string) ?? COLOR_DESCRIPTIONS[key]
                }
                label={
                  (content[key as keyof typeof content] as string) ??
                  COLOR_LABELS[key]
                }
                onCommit={(value) => actions.setColor(key, value)}
                value={theme.colors[key]}
              />
            </Fragment>
          ))}
        </TabsContent>

        <TabsContent value="typography">
          <Section description={content.bodyDescription} title={content.body}>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <label
                className="grid gap-1.5 text-xs font-medium sm:col-span-2 lg:col-span-1 xl:col-span-2"
                htmlFor={`${idPrefix}-body-font`}
              >
                {content.fontFamily}
                <Select
                  onValueChange={actions.setBodyFontFamily}
                  value={theme.typography.body.fontFamily}
                >
                  <SelectTrigger
                    className="w-full"
                    id={`${idPrefix}-body-font`}
                    size="sm"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FONT_OPTIONS.map((font) => (
                      <SelectItem key={font} value={font}>
                        {font}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </label>
              <NumberField
                label={content.fontSize}
                max={18}
                min={8}
                onCommit={actions.setBodyFontSize}
                suffix="pt"
                value={theme.typography.body.fontSize}
              />
              <NumberField
                label={content.lineHeight}
                max={2.2}
                min={1}
                onCommit={actions.setBodyLineHeight}
                step={0.05}
                value={theme.typography.body.lineHeight}
              />
            </div>
          </Section>

          <Separator className="my-4" />

          <Section
            description={content.headingsDescription}
            title={content.headings}
          >
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <label
                className="grid gap-1.5 text-xs font-medium sm:col-span-2 lg:col-span-1 xl:col-span-2"
                htmlFor={`${idPrefix}-heading-font`}
              >
                {content.fontFamily}
                <Select
                  onValueChange={actions.setHeadingFontFamily}
                  value={theme.typography.heading.fontFamily}
                >
                  <SelectTrigger
                    className="w-full"
                    id={`${idPrefix}-heading-font`}
                    size="sm"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FONT_OPTIONS.map((font) => (
                      <SelectItem key={font} value={font}>
                        {font}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </label>
              <label
                className="grid gap-1.5 text-xs font-medium"
                htmlFor={`${idPrefix}-heading-weight`}
              >
                {content.weight}
                <Select
                  onValueChange={(value) =>
                    actions.setHeadingFontWeight(Number(value))
                  }
                  value={String(theme.typography.heading.fontWeight)}
                >
                  <SelectTrigger
                    className="w-full"
                    id={`${idPrefix}-heading-weight`}
                    size="sm"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[400, 500, 600, 700].map((weight) => (
                      <SelectItem key={weight} value={String(weight)}>
                        {weight}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </label>
              <NumberField
                label={content.lineHeight}
                max={2}
                min={1}
                onCommit={actions.setHeadingLineHeight}
                step={0.05}
                value={theme.typography.heading.lineHeight}
              />
              {HEADING_LEVELS.map((level) => (
                <NumberField
                  key={level}
                  label={level.toUpperCase()}
                  max={64}
                  min={8}
                  onCommit={(value) =>
                    actions.setHeadingFontSize(level as HeadingLevel, value)
                  }
                  suffix="pt"
                  value={theme.typography.heading.fontSize[level]}
                />
              ))}
            </div>
          </Section>
        </TabsContent>

        <TabsContent value="layout">
          <Section description={content.pageDescription} title={content.page}>
            <div className="grid grid-cols-2 gap-3">
              <label
                className="grid gap-1.5 text-xs font-medium"
                htmlFor={`${idPrefix}-page-size`}
              >
                {content.size}
                <Select
                  onValueChange={(value) =>
                    actions.setPageSize(value as PdfcnTheme["page"]["size"])
                  }
                  value={theme.page.size}
                >
                  <SelectTrigger
                    className="w-full"
                    id={`${idPrefix}-page-size`}
                    size="sm"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A4">A4</SelectItem>
                    <SelectItem value="LETTER">Letter</SelectItem>
                    <SelectItem value="LEGAL">Legal</SelectItem>
                  </SelectContent>
                </Select>
              </label>
              <label
                className="grid gap-1.5 text-xs font-medium"
                htmlFor={`${idPrefix}-page-orientation`}
              >
                {content.orientation}
                <Select
                  onValueChange={(value) =>
                    actions.setPageOrientation(
                      value as PdfcnTheme["page"]["orientation"]
                    )
                  }
                  value={theme.page.orientation}
                >
                  <SelectTrigger
                    className="w-full capitalize"
                    id={`${idPrefix}-page-orientation`}
                    size="sm"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="portrait">{content.portrait}</SelectItem>
                    <SelectItem value="landscape">
                      {content.landscape}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </label>
            </div>
          </Section>

          <Separator className="my-4" />

          <Section
            description={content.marginsDescription}
            title={content.margins}
          >
            <div className="grid grid-cols-2 gap-3">
              {(
                [
                  ["marginTop", content.top],
                  ["marginRight", content.right],
                  ["marginBottom", content.bottom],
                  ["marginLeft", content.left],
                ] as const satisfies readonly [PageMargin, string][]
              ).map(([edge, label]) => (
                <NumberField
                  key={edge}
                  label={label}
                  max={120}
                  min={0}
                  onCommit={(value) => actions.setPageMargin(edge, value)}
                  suffix="pt"
                  value={theme.spacing.page[edge]}
                />
              ))}
            </div>
          </Section>

          <Separator className="my-4" />

          <Section
            description={content.rhythmDescription}
            title={content.rhythm}
          >
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {(
                [
                  ["sectionGap", content.sections],
                  ["paragraphGap", content.paragraphs],
                  ["componentGap", content.components],
                ] as const satisfies readonly [SpacingTokenName, string][]
              ).map(([key, label]) => (
                <NumberField
                  key={key}
                  label={label}
                  max={80}
                  min={0}
                  onCommit={(value) => actions.setSpacing(key, value)}
                  suffix="pt"
                  value={theme.spacing[key]}
                />
              ))}
            </div>
          </Section>
        </TabsContent>
      </Tabs>
    </div>
  );
};
