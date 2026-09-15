"use client";

import { motion, useReducedMotion } from "motion/react";
import { useIntlayer } from "next-intlayer";

import { cn } from "@/lib/utils";

const DIGIT_FOUR = [
  "...X.",
  "..X..",
  ".X...",
  "X..X.",
  "XXXXX",
  "...X.",
  "...X.",
];

const DIGIT_ZERO = [
  ".XXX.",
  "X...X",
  "X...X",
  "X...X",
  "X...X",
  "X...X",
  ".XXX.",
];

const NOT_FOUND_PATTERN = DIGIT_FOUR.map(
  (row, index) => `${row}.${DIGIT_ZERO[index]}.${row}`
);

const ARTWORK_CLASS_NAME = cn(
  "relative aspect-2/1 w-full overflow-hidden bg-muted/35 ring-1 ring-border"
);

const Brick = ({ active }: { active: boolean }) => (
  <span aria-hidden className="relative aspect-square">
    {active && (
      <span className="absolute inset-0.5 bg-foreground">
        <span className="absolute top-1 right-1 left-1 h-0.5 bg-background/20" />
        <span className="absolute top-1 bottom-1 left-1 w-0.5 bg-background/20" />
      </span>
    )}
  </span>
);

const ArtworkBricks = () => (
  <span
    aria-hidden
    className="absolute inset-x-[7%] top-1/2 grid -translate-y-1/2 gap-0.5"
    style={{ gridTemplateColumns: "repeat(17, minmax(0, 1fr))" }}
  >
    {NOT_FOUND_PATTERN.flatMap((row, rowIndex) =>
      [...row].map((brick, columnIndex) => (
        <Brick active={brick === "X"} key={`${rowIndex}-${columnIndex}`} />
      ))
    )}
  </span>
);

export const DaikanoidArtwork = ({
  className,
  style,
  ...props
}: React.ComponentProps<"div">) => (
  <div
    role="img"
    aria-label="404"
    className={cn(ARTWORK_CLASS_NAME, className)}
    style={style}
    {...props}
  >
    <ArtworkBricks />
  </div>
);

export interface DaikanoidPreviewProps extends Omit<
  React.ComponentProps<typeof motion.button>,
  "children"
> {
  className?: string;
}

export const DaikanoidPreview = ({
  className,
  style,
  ...props
}: DaikanoidPreviewProps) => {
  const content = useIntlayer("daikanoid-preview");
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      aria-label={content.playThe404BrickBreakerGame}
      initial="idle"
      whileHover={shouldReduceMotion ? "idle" : "hover"}
      whileFocus={shouldReduceMotion ? "idle" : "hover"}
      className={cn(
        ARTWORK_CLASS_NAME,
        "group cursor-pointer outline-none transition-colors duration-150 hover:bg-muted/55 focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
      style={style}
      {...props}
    >
      <ArtworkBricks />

      <motion.span
        variants={{
          hover: {
            opacity: [1, 0.42, 1, 0.64, 1],
            transition: { duration: 0.32, times: [0, 0.18, 0.42, 0.68, 1] },
          },
          idle: { opacity: 1 },
        }}
        className="absolute top-1/2 left-1/2 z-10 inline-flex min-h-14 min-w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-foreground/70 px-6 font-mono text-background text-base transition-colors duration-150 group-hover:bg-foreground/85 group-focus-visible:bg-foreground/85"
      >
        {content.play}
      </motion.span>
    </motion.button>
  );
};
