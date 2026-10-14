"use client";

import { useReducedMotion } from "framer-motion";
import { useSyncExternalStore } from "react";

const noop = () => () => {};

/**
 * Reduced-motion check for acts that render a different tree when motion is off.
 * The server cannot know the preference, so the first client render matches the
 * server (motion version) and the static version swaps in right after hydration.
 */
export function useStaticMotion() {
  const reduce = useReducedMotion();
  const hydrated = useSyncExternalStore(noop, () => true, () => false);
  return hydrated && !!reduce;
}
