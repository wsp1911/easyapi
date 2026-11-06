import { type HTMLAttributes, type ReactNode } from "react";
export interface TabGroupItem {
    disabled?: boolean;
    endAction?: ReactNode;
    icon?: ReactNode;
    id?: string;
    label: ReactNode;
    /** Non-interactive identity or metadata that stays outside label overflow. */
    labelSuffix?: ReactNode;
    /** Opt plain text into vertical replacement without remounting the tab. */
    labelTransitionKey?: string | number;
    panelId?: string;
    /** Presentation and product data attributes on the native tab; selection stays owned by TabGroup. */
    tabProps?: Pick<HTMLAttributes<HTMLButtonElement>, "className" | "style" | "title" | "aria-label" | "aria-describedby"> & Record<`data-${string}`, string | number | boolean | undefined>;
    value: string;
}
export type TabGroupSize = "sm" | "md";
export interface TabGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "defaultValue" | "onChange"> {
    defaultValue?: string;
    items: readonly TabGroupItem[];
    onValueChange?: (value: string) => void;
    /** Wrap the standard item with product context menus or drag targets. Keep the supplied node intact. */
    renderItem?: (item: TabGroupItem, node: ReactNode, index: number) => ReactNode;
    size?: TabGroupSize;
    value?: string;
}
export declare const TabGroup: import("react").ForwardRefExoticComponent<TabGroupProps & import("react").RefAttributes<HTMLDivElement>>;
