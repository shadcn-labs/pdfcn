"use client";

import { ArrowLeftIcon, BookOpenTextIcon } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useIntlayer } from "next-intlayer";
import Link from "next/link";
import { useState } from "react";

import { Daikanoid } from "@/components/daikanoid";
import {
  DaikanoidArtwork,
  DaikanoidPreview,
} from "@/components/daikanoid/preview";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ROUTES } from "@/constants/routes";

const GAME_TRANSITION_NAME = "not-found-daikanoid";
const GAME_TRANSITION = {
  duration: 0.42,
  ease: [0.4, 0, 0.2, 1],
} as const;

const NotFoundActions = () => {
  const content = useIntlayer("not-found");

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button asChild variant="outline">
        <Link href={ROUTES.HOME}>
          <ArrowLeftIcon />
          {content.backToHome}
        </Link>
      </Button>
      <Button asChild>
        <Link href={ROUTES.DOCS}>
          <BookOpenTextIcon />
          {content.goToDocs}
        </Link>
      </Button>
    </div>
  );
};

const NotFoundCopy = () => {
  const content = useIntlayer("not-found");

  return (
    <>
      <EmptyTitle className="text-xl md:text-2xl">
        <h1>{content.pageNotFound}</h1>
      </EmptyTitle>
      <EmptyDescription className="max-w-md md:text-base/relaxed">
        {content.pageNotFoundDescription}
      </EmptyDescription>
    </>
  );
};

export const NotFound = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const content = useIntlayer("not-found");
  const shouldReduceMotion = useReducedMotion();
  const gameTransition = shouldReduceMotion ? { duration: 0 } : GAME_TRANSITION;

  return (
    <main className="relative grid min-h-svh place-items-center overflow-hidden p-6 md:p-8">
      <Empty className="w-full max-w-md gap-6 p-0 md:hidden">
        <EmptyHeader className="w-full max-w-md">
          <EmptyMedia className="mb-3 w-full">
            <DaikanoidArtwork />
          </EmptyMedia>
          <NotFoundCopy />
        </EmptyHeader>
        <EmptyContent>
          <NotFoundActions />
        </EmptyContent>
      </Empty>

      <AnimatePresence initial={false}>
        {!isPlaying && (
          <motion.div
            key="not-found-empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.16 }}
            className="hidden w-full max-w-3xl md:block"
          >
            <Empty className="w-full gap-6 p-0">
              <EmptyHeader className="w-full max-w-3xl gap-3">
                <EmptyMedia className="mb-5 w-full">
                  <DaikanoidPreview
                    layoutId={GAME_TRANSITION_NAME}
                    transition={gameTransition}
                    onClick={() => setIsPlaying(true)}
                  />
                </EmptyMedia>
                <NotFoundCopy />
              </EmptyHeader>
              <EmptyContent>
                <NotFoundActions />
              </EmptyContent>
            </Empty>
          </motion.div>
        )}

        {isPlaying && (
          <motion.div
            key="not-found-game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
            className="absolute inset-0 z-20 hidden place-items-center bg-background p-6 md:grid"
          >
            <div className="flex w-[min(50rem,calc(100vw-3rem),calc(133.333svh-7.667rem))] flex-col items-start gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsPlaying(false)}
              >
                <ArrowLeftIcon />
                {content.back}
              </Button>
              <motion.div
                layoutId={GAME_TRANSITION_NAME}
                transition={gameTransition}
                className="aspect-4/3 w-full overflow-hidden bg-muted/35 ring-1 ring-border"
              >
                <Daikanoid
                  autoFocus
                  className="h-full w-full max-w-none ring-0 focus-visible:ring-0"
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};
