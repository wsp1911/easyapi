import { type FieldsetHTMLAttributes, type HTMLAttributes, type ReactNode } from "react";
export interface ComposerProps extends Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, "children"> {
    children: ReactNode;
    contextBar?: ReactNode;
    disabled?: boolean;
    invalid?: boolean;
    toolbar?: ReactNode;
}
export interface ComposerBarProps extends HTMLAttributes<HTMLDivElement> {
    leading?: ReactNode;
    trailing?: ReactNode;
}
export type ComposerDividerProps = HTMLAttributes<HTMLSpanElement>;
export declare const Composer: import("react").ForwardRefExoticComponent<ComposerProps & import("react").RefAttributes<HTMLFieldSetElement>>;
export declare const ComposerContextBar: import("react").ForwardRefExoticComponent<ComposerBarProps & import("react").RefAttributes<HTMLDivElement>>;
export declare const ComposerToolbar: import("react").ForwardRefExoticComponent<ComposerBarProps & import("react").RefAttributes<HTMLDivElement>>;
export declare const ComposerDivider: import("react").ForwardRefExoticComponent<ComposerDividerProps & import("react").RefAttributes<HTMLSpanElement>>;
