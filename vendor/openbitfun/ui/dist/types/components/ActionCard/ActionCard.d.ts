import { type ButtonHTMLAttributes, type MouseEventHandler, type ReactNode } from "react";
import { type IconButtonProps } from "../IconButton";
export interface ActionCardAction extends Pick<IconButtonProps, "aria-controls" | "aria-expanded" | "aria-haspopup"> {
    disabled?: boolean;
    loading?: boolean;
    icon: ReactNode;
    id: string;
    label: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    tone?: IconButtonProps["tone"];
    tooltip?: ReactNode;
}
export type ActionCardSize = "sm" | "md";
export interface ActionCardProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> {
    actions?: readonly ActionCardAction[];
    /** Floating actions share tab-close glass styling without reducing the text width. */
    actionPlacement?: "inline" | "floating";
    children?: ReactNode;
    /** Rich card body (preview, multiline copy, selection marker) instead of title/description. */
    body?: ReactNode;
    triggerClassName?: string;
    className?: string;
    description?: ReactNode;
    leading?: ReactNode;
    selected?: boolean;
    size?: ActionCardSize;
}
export declare const ActionCard: import("react").ForwardRefExoticComponent<ActionCardProps & import("react").RefAttributes<HTMLButtonElement>>;
