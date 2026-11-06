interface RollingTextMotionOptions {
    active: boolean;
    returning: boolean;
    revision: number;
    text: string | number;
    onComplete: () => void;
}
/** One interruptible motion owns both the line positions and its intrinsic width. */
export declare function useRollingTextMotion({ active, returning, revision, text, onComplete }: RollingTextMotionOptions): {
    rootRef: import("react").RefObject<HTMLSpanElement>;
    currentRef: import("react").RefObject<HTMLSpanElement>;
    outgoingRef: import("react").RefObject<HTMLSpanElement>;
};
export {};
