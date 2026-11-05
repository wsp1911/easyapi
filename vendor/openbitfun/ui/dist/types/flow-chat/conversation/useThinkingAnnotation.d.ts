import { type RefObject } from 'react';
export interface ThinkingContinuationResolution {
    element: HTMLElement | null;
    /** Watches peer containers that can mount or remove the continuation. */
    observeRoot: HTMLElement;
    /** Watches a mounted peer while its first visible item is still arriving. */
    observeSubtree?: HTMLElement | null;
}
export type ThinkingContinuationResolver = (root: HTMLDivElement) => ThinkingContinuationResolution | null;
/** Reads layout; writes positioning only on the thinking root. Never owns transcript scrolling. */
export declare function useThinkingAnnotation(rootRef: RefObject<HTMLDivElement>, toggleRef: RefObject<HTMLButtonElement>, docked: boolean, resolveContinuation?: ThinkingContinuationResolver, deferInactiveGeometry?: boolean): {
    hasContinuation: boolean;
    tooltipBlocked: boolean;
    tooltipActive: boolean;
    canShowTooltip: () => boolean;
};
