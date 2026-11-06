import { type HTMLAttributes, type ReactNode } from "react";
export type MobileTabBarAppearance = "surface" | "plain";
export interface MobileTabBarItem {
    badge?: ReactNode;
    disabled?: boolean;
    icon?: ReactNode;
    label: ReactNode;
    value: string;
}
export interface MobileTabBarProps extends Omit<HTMLAttributes<HTMLElement>, "onChange"> {
    appearance?: MobileTabBarAppearance;
    defaultValue?: string;
    items: readonly MobileTabBarItem[];
    label: string;
    onValueChange?: (value: string) => void;
    safeArea?: boolean;
    value?: string;
}
/** Destinations, not tabs: the bar swaps the screen, so each item is a link-like button marked with
    aria-current rather than a tab in a tablist. */
export declare function MobileTabBar({ appearance, className, defaultValue, items, label, onValueChange, safeArea, value, ...props }: MobileTabBarProps): import("react/jsx-runtime").JSX.Element;
