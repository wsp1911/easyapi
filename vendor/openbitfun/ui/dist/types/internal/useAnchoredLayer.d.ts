import { type CSSProperties, type RefObject } from "react";
export type LayerPlacement = "top" | "bottom" | "left" | "right";
export type PortalTarget = Element | DocumentFragment | (() => Element | DocumentFragment | null) | null;
/** Default portals stay inside the nearest theme scope; hosts may supply an overlay root. */
export declare function resolveLayerPortal(target: PortalTarget | undefined, anchor: HTMLElement | null): Element | DocumentFragment | null;
export declare function useAnchoredLayer({ open, anchorRef, layerRef, placement, matchWidth, overlapAnchor, revision, point }: {
    open: boolean;
    anchorRef: RefObject<HTMLElement | null>;
    layerRef: RefObject<HTMLElement | null>;
    placement?: LayerPlacement;
    matchWidth?: boolean;
    /** Position the layer over the anchor when the layer visually replaces it. */
    overlapAnchor?: boolean;
    revision?: unknown;
    point?: {
        x: number;
        y: number;
    };
}): {
    style: CSSProperties;
    placement: LayerPlacement;
} | null;
