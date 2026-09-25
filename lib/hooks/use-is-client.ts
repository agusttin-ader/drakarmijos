"use client";

import { useSyncExternalStore } from "react";

/** true solo en el cliente — evita hydration mismatch en portales. */
export function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}
