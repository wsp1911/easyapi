import { type ButtonHTMLAttributes, type MouseEventHandler, type ReactNode } from "react";
import { type IconButtonProps } from "../IconButton";
export interface ActionItemAction {
    checked?: boolean;
    disabled?: boolean;
    icon: ReactNode;
    id: string;
    label: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    role?: "button" | "menuitem" | "menuitemcheckbox" | "menuitemradio";
    testAttributes?: Record<`data-${string}`, string | number | boolean | undefined>;
    testId?: string;
    tone?: IconButtonProps["tone"];
}
export type ActionItemTone = "neutral" | "danger";
export interface ActionItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> {
    actions?: readonly ActionItemAction[];
    /** Independently interactive trailing content, outside the primary button. */
    actionContent?: ReactNode;
    triggerClassName?: string;
    children: ReactNode;
    className?: string;
    leading?: ReactNode;
    /** Static labels preserve wrapping without implicit overflow motion or tooltips. */
    labelBehavior?: "overflow" | "static";
    metadata?: ReactNode;
    reserveLeadingSpace?: boolean;
    shortcut?: ReactNode;
    tone?: ActionItemTone;
}
export declare const ActionItem: import("react").ForwardRefExoticComponent<ActionItemProps & import("react").RefAttributes<HTMLButtonElement>>;
