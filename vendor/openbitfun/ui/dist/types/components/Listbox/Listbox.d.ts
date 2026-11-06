import { type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from "react";
import { type ScrollbarVisibility } from "../ScrollArea";
export type ListboxValue = string | number;
export interface ListboxProps extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "role"> {
    autoFocusOption?: boolean;
    children: ReactNode;
    focusMode?: "roving" | "virtual";
    multiple?: boolean;
    scrollbarVisibility?: ScrollbarVisibility;
}
export interface ListboxOptionProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "value"> {
    active?: boolean;
    children: ReactNode;
    description?: ReactNode;
    indicator?: ReactNode;
    leading?: ReactNode;
    metadata?: ReactNode;
    selected?: boolean;
    value?: ListboxValue;
}
export interface ListboxGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "role"> {
    children: ReactNode;
    label?: ReactNode;
}
export type ListboxEmptyProps = HTMLAttributes<HTMLDivElement>;
export declare const Listbox: import("react").ForwardRefExoticComponent<ListboxProps & import("react").RefAttributes<HTMLDivElement>>;
export declare const ListboxOption: import("react").ForwardRefExoticComponent<ListboxOptionProps & import("react").RefAttributes<HTMLButtonElement>>;
export declare const ListboxGroup: import("react").ForwardRefExoticComponent<ListboxGroupProps & import("react").RefAttributes<HTMLDivElement>>;
export declare const ListboxEmpty: import("react").ForwardRefExoticComponent<ListboxEmptyProps & import("react").RefAttributes<HTMLDivElement>>;
