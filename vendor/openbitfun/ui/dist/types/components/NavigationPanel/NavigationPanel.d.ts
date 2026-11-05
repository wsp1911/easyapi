import { type HTMLAttributes, type MouseEventHandler, type ReactNode } from "react";
import { type ActionItemProps } from "../ActionItem";
import { type IconButtonProps } from "../IconButton";
import { type ScrollAreaProps } from "../ScrollArea";
export interface NavigationPanelProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
    children: ReactNode;
}
export type NavigationPanelHeaderProps = HTMLAttributes<HTMLDivElement>;
export interface NavigationPanelBodyProps extends Omit<ScrollAreaProps, "orientation"> {
}
export type NavigationPanelContentProps = HTMLAttributes<HTMLDivElement>;
export type NavigationPanelFooterProps = HTMLAttributes<HTMLDivElement>;
export interface NavigationPanelItemProps extends ActionItemProps {
    selected?: boolean;
}
export interface NavigationPanelSectionAction {
    disabled?: boolean;
    icon: ReactNode;
    id: string;
    label: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    tone?: IconButtonProps["tone"];
}
export interface NavigationPanelSectionProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
    actions?: readonly NavigationPanelSectionAction[];
    children: ReactNode;
    title?: ReactNode;
}
export type NavigationPanelSeparatorProps = HTMLAttributes<HTMLDivElement>;
export declare const NavigationPanel: import("react").ForwardRefExoticComponent<NavigationPanelProps & import("react").RefAttributes<HTMLElement>>;
export declare const NavigationPanelHeader: import("react").ForwardRefExoticComponent<NavigationPanelHeaderProps & import("react").RefAttributes<HTMLDivElement>>;
export declare const NavigationPanelBody: import("react").ForwardRefExoticComponent<NavigationPanelBodyProps & import("react").RefAttributes<HTMLDivElement>>;
export declare const NavigationPanelContent: import("react").ForwardRefExoticComponent<NavigationPanelContentProps & import("react").RefAttributes<HTMLDivElement>>;
export declare const NavigationPanelFooter: import("react").ForwardRefExoticComponent<NavigationPanelFooterProps & import("react").RefAttributes<HTMLDivElement>>;
export declare const NavigationPanelItem: import("react").ForwardRefExoticComponent<NavigationPanelItemProps & import("react").RefAttributes<HTMLButtonElement>>;
export declare const NavigationPanelSection: import("react").ForwardRefExoticComponent<NavigationPanelSectionProps & import("react").RefAttributes<HTMLElement>>;
export declare const NavigationPanelSeparator: import("react").ForwardRefExoticComponent<NavigationPanelSeparatorProps & import("react").RefAttributes<HTMLDivElement>>;
