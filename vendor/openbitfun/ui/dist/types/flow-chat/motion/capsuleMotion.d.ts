import { type RefObject } from 'react';
export declare const TOOL_CAPSULE_COLLAPSE_DURATION_MS = 520;
type MotionKind = 'receive' | 'recall' | 'release' | 'failure' | 'settle' | 'cancel';
type MotionRecipe = (motion: MotionScope) => void;
interface MotionScope {
    root: HTMLElement;
    skin: HTMLElement;
    fromTransform: string;
    fromBody: {
        transform: string;
        opacity: string;
    } | null;
    animate: (target: Element, frames: Keyframe[], duration: number, delay?: number) => void;
    layer: () => HTMLElement;
}
/** Decorations share one clock and lifetime; no real card is cloned or reparented. */
export declare function useCapsuleMotion(rootRef: RefObject<HTMLElement>): {
    play: (kind: MotionKind, recipe: MotionRecipe) => void;
    cancel: () => void | undefined;
};
export declare const receiveCapsule: MotionRecipe;
export declare function useToolCapsuleMotion(rootRef: RefObject<HTMLElement>, enabled: boolean, expanded: boolean, status: string): void;
export {};
