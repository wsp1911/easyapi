import { type ReactNode } from "react";
import { type DialogCloseReason } from "../Dialog";
export type ConfirmDialogCloseReason = DialogCloseReason | "cancel-button";
export type ConfirmDialogType = "info" | "warning" | "error" | "success";
export type ConfirmDialogAction = () => void | Promise<void>;
export interface ConfirmDialogProps {
    cancelText?: ReactNode;
    closeOnEscape?: boolean;
    closeOnPointerOutside?: boolean;
    confirmDanger?: boolean;
    confirmText?: ReactNode;
    icon?: ReactNode | false;
    message?: ReactNode;
    onActionError?: (error: unknown, action: "confirm" | "secondary") => void;
    onConfirm: ConfirmDialogAction;
    onOpenChange: (open: false, reason: ConfirmDialogCloseReason) => void;
    onSecondary?: ConfirmDialogAction;
    open: boolean;
    pendingAction?: "confirm" | "secondary" | null;
    preview?: ReactNode;
    /** Place an alternative action at the start, separate from cancel and confirm. */
    secondaryActionPlacement?: "inline" | "start";
    secondaryText?: ReactNode;
    showCancel?: boolean;
    showCloseButton?: boolean;
    testId?: string;
    title: ReactNode;
    type?: ConfirmDialogType;
}
export declare const ConfirmDialog: import("react").ForwardRefExoticComponent<ConfirmDialogProps & import("react").RefAttributes<HTMLDivElement>>;
