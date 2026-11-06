import { type HTMLAttributes, type ReactNode } from "react";
import { type IconButtonProps } from "../../components/IconButton";
export type ChatComposerLayout = "compact" | "expanded";
export interface ChatComposerProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    busy?: boolean;
    children: ReactNode;
    contextBar?: ReactNode;
    disabled?: boolean;
    endActions?: ReactNode;
    layout?: ChatComposerLayout;
    queue?: ReactNode;
    startActions?: ReactNode;
}
export interface ChatComposerSlotProps {
    children: ReactNode;
}
export type ChatComposerActionButtonProps = Omit<IconButtonProps, "shape" | "size">;
/** Stable icon action for ChatComposer start and end action tracks. */
export declare const ChatComposerActionButton: import("react").ForwardRefExoticComponent<ChatComposerActionButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
/** Compound slot for complex consumers that keep content and actions adjacent. */
export declare function ChatComposerContent({ children }: ChatComposerSlotProps): import("react/jsx-runtime").JSX.Element;
/** Compound slot for controls at the leading edge of the composer. */
export declare function ChatComposerStartActions({ children }: ChatComposerSlotProps): import("react/jsx-runtime").JSX.Element;
/** Compound slot for controls at the trailing edge of the composer. */
export declare function ChatComposerEndActions({ children }: ChatComposerSlotProps): import("react/jsx-runtime").JSX.Element;
/**
 * Theme-independent FlowChat composer anatomy.
 *
 * Product state, localization, rich-text behavior, menus, and host actions are
 * supplied through slots. The package owns the stable context-bar/surface
 * geometry and the responsive compact/expanded layout.
 */
export declare const ChatComposer: import("react").ForwardRefExoticComponent<ChatComposerProps & import("react").RefAttributes<HTMLDivElement>>;
