import { type RefObject } from "react";
export interface UseFocusScopeOptions {
    active: boolean;
    autoFocus?: boolean;
    containerRef: RefObject<HTMLElement | null>;
    initialFocusRef?: RefObject<HTMLElement | null>;
    ownerDocument?: Document | null;
    restoreFocus?: boolean;
    trapFocus?: boolean;
}
export declare function useFocusScope({ active, autoFocus, containerRef, initialFocusRef, ownerDocument, restoreFocus, trapFocus, }: UseFocusScopeOptions): void;
