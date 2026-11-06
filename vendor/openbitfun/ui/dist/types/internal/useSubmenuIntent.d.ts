import { type RefObject } from 'react';
export interface SubmenuIntentPoint {
    x: number;
    y: number;
}
export interface SubmenuIntentRect {
    left: number;
    right: number;
    top: number;
    bottom: number;
}
interface PointerLikeEvent {
    clientX: number;
    clientY: number;
    pointerType?: string;
    timeStamp: number;
}
export interface UseSubmenuIntentOptions<T> {
    activeId: T | null;
    onActiveIdChange: (id: T | null) => void;
    parentRef: RefObject<HTMLElement | null>;
    submenuRef: RefObject<HTMLElement | null>;
    enabled?: boolean;
    openDelayMs?: number;
    closeDelayMs?: number;
    switchDelayMs?: number;
    tolerance?: number;
}
export interface SubmenuIntentControls<T> {
    requestChange: (targetId: T | null, event: PointerLikeEvent) => void;
    requestClose: (event?: PointerLikeEvent) => void;
    keepOpen: () => void;
    openNow: (id: T) => void;
    closeNow: () => void;
    cancelPending: () => void;
}
/** A stationary, bidirectional bridge across the gap; independent of menu aim. */
export declare const isPointInSubmenuBridge: (point: SubmenuIntentPoint, parentRect: SubmenuIntentRect, submenuRect: SubmenuIntentRect) => boolean;
/**
 * Returns true when the pointer is entering the corridor between its previous
 * position and the nearest vertical edge of the open submenu. The nearest edge
 * makes the same calculation work for menus that open to either side.
 */
export declare const isPointerMovingTowardSubmenu: (previous: SubmenuIntentPoint, current: SubmenuIntentPoint, submenuRect: SubmenuIntentRect, tolerance?: number) => boolean;
export declare const useSubmenuIntent: <T>({ activeId, onActiveIdChange, parentRef, submenuRef, enabled, openDelayMs, closeDelayMs, switchDelayMs, tolerance, }: UseSubmenuIntentOptions<T>) => SubmenuIntentControls<T>;
export {};
