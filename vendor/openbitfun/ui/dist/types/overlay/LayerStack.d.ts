import type { OverlayLayerScope } from "./types";
export { OverlayLayerStack, getOverlayLayerStack, type OverlayLayerDescriptor } from "./OverlayCoordinator";
/** Synchronous boundary for host shortcut routers that run before React events. */
export declare function hasOverlayLayers(ownerDocument?: Document | null): boolean;
export declare function useOverlayLayerStack(ownerDocument?: Document | null): import("./OverlayCoordinator").OverlayLayerStack;
export declare function useHasOverlayLayers(scope?: OverlayLayerScope): boolean;
export declare function useHasModalOverlay(): boolean;
export declare function useOverlayLayerActions(): {
    dismissAll: () => boolean;
    dismissTop: (scope?: OverlayLayerScope) => boolean;
};
