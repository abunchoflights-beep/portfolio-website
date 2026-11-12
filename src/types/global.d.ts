import type Lenis from "@studio-freight/lenis";

declare global {
  interface Window {
    lenis?: Lenis;
    __introDone?: boolean;
  }
}

export {};

