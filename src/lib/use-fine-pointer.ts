import { useSyncExternalStore } from "react";

const QUERY = "(hover: hover) and (pointer: fine)";

function subscribe(callback: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

/** true solo en dispositivos con puntero fino y hover real (no táctil). */
export function useFinePointer() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
