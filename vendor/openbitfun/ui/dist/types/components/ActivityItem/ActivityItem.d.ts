import { type HTMLAttributes, type MouseEventHandler, type ReactNode } from "react";
import { type IconButtonProps } from "../IconButton";
export type ActivityItemAppearance = "inline" | "surface";
export interface ActivityItemAction {
    disabled?: boolean;
    icon: ReactNode;
    id: string;
    label: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    tone?: IconButtonProps["tone"];
}
export interface ActivityItemProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children" | "onClick"> {
    actions?: readonly ActivityItemAction[];
    appearance?: ActivityItemAppearance;
    children: ReactNode;
    detail?: ReactNode;
    disabled?: boolean;
    label?: ReactNode;
    leading?: ReactNode;
    metadata?: ReactNode;
    onActivate?: MouseEventHandler<HTMLButtonElement>;
}
export interface ChangeCountProps extends HTMLAttributes<HTMLSpanElement> {
    additions?: number;
    deletions?: number;
}
export declare const ActivityItem: import("react").ForwardRefExoticComponent<ActivityItemProps & import("react").RefAttributes<HTMLSpanElement>>;
export declare const ChangeCount: import("react").ForwardRefExoticComponent<ChangeCountProps & import("react").RefAttributes<HTMLSpanElement>>;
