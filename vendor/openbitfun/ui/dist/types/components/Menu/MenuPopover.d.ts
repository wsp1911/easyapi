import { type ComponentType, type HTMLAttributes, type ReactNode, type RefObject } from "react";
import { Menu, MenuItem, MenuSeparator, type MenuProps, type MenuItemRole } from "./Menu";
import { type LayerPlacement } from "../../internal/useAnchoredLayer";
export interface MenuEntry {
    id: string;
    label: string;
    icon?: ReactNode;
    shortcut?: ReactNode;
    disabled?: boolean;
    separator?: boolean;
    submenu?: readonly MenuEntry[];
    role?: MenuItemRole;
    checked?: boolean;
    tone?: "neutral" | "danger";
    /** Dispatch only: the host owns async work and error presentation. */
    onSelect?: () => void;
}
export interface MenuPopoverProps extends Omit<MenuProps, "children"> {
    items: readonly MenuEntry[];
    open: boolean;
    onClose: () => void;
    anchorRef?: RefObject<HTMLElement | null>;
    /** Logical owner for coordinate menus rendered outside their source tree. */
    ownerRef?: RefObject<HTMLElement | null>;
    position?: {
        x: number;
        y: number;
    };
    placement?: LayerPlacement;
    /** Stable wrappers must forward all props (and refs for root/item/separator). */
    parts?: MenuPopoverParts;
}
export interface MenuPopoverParts {
    root?: typeof Menu;
    item?: typeof MenuItem;
    separator?: typeof MenuSeparator;
    icon?: ComponentType<HTMLAttributes<HTMLSpanElement>>;
    label?: ComponentType<HTMLAttributes<HTMLSpanElement>>;
    shortcut?: ComponentType<HTMLAttributes<HTMLSpanElement>>;
    submenuArrow?: ComponentType<HTMLAttributes<HTMLSpanElement>>;
    submenu?: ComponentType<HTMLAttributes<HTMLDivElement>>;
}
/** Anchored/coordinate menu with nested navigation, safe pointer corridors and focus return. */
export declare function MenuPopover({ items, open, onClose, anchorRef, ownerRef, position, placement, autoFocusFirstItem, ...props }: MenuPopoverProps): import("react/jsx-runtime").JSX.Element;
