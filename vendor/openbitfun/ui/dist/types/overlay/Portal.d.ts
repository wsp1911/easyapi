import { type Key, type ReactNode, type RefObject } from "react";
import type { OverlayDismissReason, OverlayPortalContainer, OverlayPortalTarget } from "./types";
/** A neutral, document-owned host. It never transforms viewport coordinates. */
export declare function getOverlayHost(ownerDocument: Document): HTMLDivElement;
export declare function resolvePortalTarget(target: OverlayPortalTarget | undefined, fallbackDocument?: Document | null): OverlayPortalContainer | null;
export interface PortalProps {
    children: ReactNode;
    ownerDocument?: Document | null;
    target?: OverlayPortalTarget;
    /** Keep mounted while exiting; logical closure immediately disables dismissal. */
    open?: boolean;
    modal?: boolean;
    preventScroll?: boolean;
    /** Background notices wait for the current modal before first presentation. */
    passive?: boolean;
    /** Portalled siblings can declare the trigger that owns their interaction. */
    ownerRef?: RefObject<HTMLElement | null>;
    surfaceRef?: RefObject<HTMLElement | null>;
    onDismiss?: (reason: OverlayDismissReason) => void;
    dismissOnEscape?: boolean;
    dismissOnPointerOutside?: boolean;
}
/** Layout-only portal: its children must each own an OverlayLayer. */
export declare function OverlayRegion({ children, target, ownerDocument }: Pick<PortalProps, "children" | "target" | "ownerDocument">): import("react").ReactPortal | null;
/** Independent paint order inside a neutral, non-stacking layout/scroll region. */
export declare function OverlayLayer({ children, ownerDocument, ...options }: Omit<PortalProps, "target">): import("react/jsx-runtime").JSX.Element | null;
export declare function Portal({ children, target, ownerDocument, ...options }: PortalProps): import("react/jsx-runtime").JSX.Element | null;
/** JSX-equivalent bridge for callers that compose a portal as an expression. */
export declare function createOverlayPortal(children: ReactNode, target?: OverlayPortalTarget, key?: Key | null, options?: Omit<PortalProps, "children" | "target">): import("react/jsx-runtime").JSX.Element;
