import { type RefObject } from "react";
import type { OverlayDismissReason, OverlayLayerScope } from "./types";
export interface UseDismissibleLayerOptions {
    branchRefs?: readonly RefObject<HTMLElement | null>[];
    containsTarget?: (target: Node) => boolean;
    dismissOnEscape?: boolean;
    dismissOnPointerOutside?: boolean;
    enabled: boolean;
    layerRef: RefObject<HTMLElement | null>;
    onDismiss: (reason: OverlayDismissReason) => void;
    ownerDocument?: Document | null;
    scope?: OverlayLayerScope;
}
/** Adds interaction policy to the painted layer; never allocates another z-index. */
export declare function useDismissibleLayer(options: UseDismissibleLayerOptions): symbol;
