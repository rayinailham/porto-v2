/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// YouTube IFrame API — minimal typing for the AudioLoopPlayer.
// We only use the bits we need; everything else is `any` on purpose.
declare global {
  interface Window {
    YT?: {
      Player: new (
        target: HTMLElement | string,
        options: Record<string, unknown>,
      ) => any;
      PlayerState: { PLAYING: number; PAUSED: number; ENDED: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

export {};
