import { type HTMLAttributes, type MouseEventHandler, type ReactNode } from "react";
import { type ActionItemProps } from "../ActionItem";
import { type IconButtonProps } from "../IconButton";
import { type ScrollbarVisibility } from "../ScrollArea";
export type MenuItemRole = "menuitem" | "menuitemcheckbox" | "menuitemradio";
/** `fixed` keeps the menu width token; `content` fits the rows between the menu minimum and that token. */
export type MenuInlineSize = "fixed" | "content";
export interface MenuProps extends Omit<HTMLAttributes<HTMLDivElement>, "autoFocus" | "role"> {
    autoFocusFirstItem?: boolean;
    children: ReactNode;
    inlineSize?: MenuInlineSize;
    scrollbarVisibility?: ScrollbarVisibility;
}
export interface MenuItemProps extends Omit<ActionItemProps, "aria-checked" | "role"> {
    checked?: boolean;
    role?: MenuItemRole;
}
/** A row stack for custom scroll or animation wrappers inside a Menu. */
export interface MenuListProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    "data-openbitfun-part"?: string;
}
export interface MenuSectionAction {
    disabled?: boolean;
    icon: ReactNode;
    id: string;
    label: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    tone?: IconButtonProps["tone"];
}
export interface MenuSectionProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    actions?: readonly MenuSectionAction[];
    children: ReactNode;
    title?: ReactNode;
}
export type MenuSeparatorProps = HTMLAttributes<HTMLDivElement>;
export declare const MenuList: import("react").ForwardRefExoticComponent<MenuListProps & import("react").RefAttributes<HTMLDivElement>>;
export declare const Menu: import("react").ForwardRefExoticComponent<MenuProps & import("react").RefAttributes<HTMLDivElement>>;
export declare const MenuItem: import("react").ForwardRefExoticComponent<MenuItemProps & import("react").RefAttributes<HTMLButtonElement>>;
export declare const MenuSection: import("react").ForwardRefExoticComponent<MenuSectionProps & import("react").RefAttributes<HTMLDivElement>>;
export declare const MenuSeparator: import("react").ForwardRefExoticComponent<MenuSeparatorProps & import("react").RefAttributes<HTMLDivElement>>;
