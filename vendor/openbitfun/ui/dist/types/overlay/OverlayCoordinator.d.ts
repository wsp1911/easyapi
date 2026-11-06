import type { OverlayDismissReason, OverlayLayerScope } from "./types";
export interface OverlayLayerDescriptor {
    id: symbol;
    onDismiss: (reason: OverlayDismissReason) => void;
    scope?: OverlayLayerScope;
    element?: () => HTMLElement | null;
    containsTarget?: (target: Node) => boolean;
    dismissOnEscape?: boolean;
    dismissOnPointerOutside?: boolean;
}
export interface OverlayLayerRegistration {
    id: symbol;
    sequence: number;
    element: HTMLElement;
    parentId?: symbol;
    ownerElement?: () => HTMLElement | null;
    activationFocus?: HTMLElement | null;
    open: boolean;
    modal: boolean;
    passive: boolean;
}
export interface OverlayFocusRegistration {
    id: symbol;
    element: HTMLElement;
    autoFocus: boolean;
    trapFocus: boolean;
    restoreFocus: boolean;
    initialFocus?: HTMLElement | null;
    previousFocus: HTMLElement | null;
}
export type OverlayInteractionType = "keydown" | "mousedown" | "pointerdown";
interface OverlayInteraction {
    id: symbol;
    type: OverlayInteractionType;
    element: () => HTMLElement | null;
    listener: (event: Event) => void;
}
/** Document-local ownership shared by paint, dismissal and modal focus. */
export declare class OverlayLayerStack {
    readonly ownerDocument?: Document | undefined;
    private layers;
    private dismissibles;
    private focusScopes;
    private interactions;
    private listeners;
    private hiddenElements;
    private version;
    private sequence;
    private listening;
    private redirectingFocus;
    private pointerGesture?;
    private pendingFocusRestores;
    constructor(ownerDocument?: Document | undefined);
    reserveSequence(): number;
    registerLayer(layer: OverlayLayerRegistration): () => void;
    updateLayer(id: symbol, values: Pick<OverlayLayerRegistration, "open" | "modal" | "passive">): void;
    getLayerForElement(element: Node | null): OverlayLayerRegistration | undefined;
    private parentOf;
    isDescendant(id: symbol | undefined, ancestor: symbol): boolean;
    hasModal(): boolean;
    hasOpenAncestors(id: symbol): boolean;
    canPresent(parentId?: symbol): boolean;
    register(descriptor: OverlayLayerDescriptor): () => void;
    isTopLayer(id: symbol): boolean;
    dismissTop(scope?: OverlayLayerScope): boolean;
    dismissAll(): boolean;
    hasLayers(scope?: OverlayLayerScope): boolean;
    registerFocusScope(scope: OverlayFocusRegistration): () => void;
    private restoreFocus;
    registerInteraction(interaction: OverlayInteraction): () => void;
    subscribe: (listener: () => void) => (() => void);
    getSnapshot: () => number;
    private orderedLayers;
    private topModal;
    private ancestorsOpen;
    private isAvailable;
    private orderedDismissibles;
    private interactionTop;
    private topDismissible;
    private topFocusScope;
    private trappingScope;
    private inFocusDomain;
    private focusFirst;
    private routeInteraction;
    private handleKeyDown;
    private handleKeyDownCapture;
    private handlePointerDown;
    private handleMouseDown;
    private handleFocusIn;
    private reconcileInert;
    private changed;
}
export declare function getOverlayLayerStack(ownerDocument?: Document | null): OverlayLayerStack;
export {};
