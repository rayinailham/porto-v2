/**
 * Typography motion bundle — combines reveal + split-text in one call.
 * Use on any view's root ref to get the standard editorial motion stack
 * without wiring two composables every time.
 */
import type { Ref } from "vue";
import { useReveal } from "./useReveal";
import { useSplitText } from "./useSplitText";

export function useTypography(root: Ref<HTMLElement | null>) {
  useReveal(root);
  useSplitText(root);
}
