import type { ReactNode } from "react";
import { type MobileSheetProps } from "../MobileSheet";
export interface MobileConfirmSheetProps extends Omit<MobileSheetProps, "children" | "footer"> {
    cancelLabel: ReactNode;
    children?: ReactNode;
    confirmDisabled?: boolean;
    confirmLabel: ReactNode;
    confirmTone?: "primary" | "danger";
    icon?: ReactNode;
    pending?: boolean;
    onConfirm: () => void;
}
/** A mobile confirmation sheet with consistent pending and destructive behavior. */
export declare function MobileConfirmSheet({ cancelLabel, children, confirmDisabled, confirmLabel, confirmTone, icon, onConfirm, onKeyDown, onOpenChange, pending, ...sheetProps }: MobileConfirmSheetProps): import("react/jsx-runtime").JSX.Element;
