import { type ButtonHTMLAttributes, type DetailsHTMLAttributes, type HTMLAttributes, type ReactNode } from "react";
type DisclosureTriggerProps = Pick<ButtonHTMLAttributes<HTMLButtonElement>, "aria-controls" | "aria-expanded" | "disabled" | "id" | "onClick" | "type">;
interface CustomDisclosureProps extends Omit<HTMLAttributes<HTMLElement>, "children" | "onToggle" | "title"> {
    presentation?: "custom";
    actions?: ReactNode;
    /** Compose a header with independent controls using the supplied toggle attributes. */
    renderHeader?: (triggerProps: DisclosureTriggerProps) => ReactNode;
    contentClassName?: string;
    contentInnerClassName?: string;
    unmountOnClose?: boolean;
    exitDurationMs?: number;
    children: ReactNode;
    defaultOpen?: boolean;
    description?: ReactNode;
    disabled?: boolean;
    leading?: ReactNode;
    onOpenChange?: (open: boolean) => void;
    open?: boolean;
    summary: ReactNode;
}
interface NativeDisclosureProps extends Omit<DetailsHTMLAttributes<HTMLDetailsElement>, "children" | "title"> {
    /** Preserve browser details/summary semantics, including native toggle events. */
    presentation: "native";
    children: ReactNode;
    summary: ReactNode;
}
export type DisclosureProps = CustomDisclosureProps | NativeDisclosureProps;
export declare const Disclosure: import("react").ForwardRefExoticComponent<DisclosureProps & import("react").RefAttributes<HTMLElement>>;
export {};
