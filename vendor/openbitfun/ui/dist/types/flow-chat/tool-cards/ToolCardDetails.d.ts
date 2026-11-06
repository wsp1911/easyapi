import type { HTMLAttributes, ReactNode } from "react";
import { type DisclosureProps } from "../../components/Disclosure";
export interface ToolCardSectionProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
    label?: ReactNode;
    actions?: ReactNode;
}
/** A subordinate section. The card shell owns the outer inset. */
export declare function ToolCardSection({ label, actions, children, className, ...props }: ToolCardSectionProps): import("react/jsx-runtime").JSX.Element;
export type ToolCardDisclosureProps = Omit<Extract<DisclosureProps, {
    presentation?: "custom";
}>, "presentation" | "renderHeader" | "leading">;
/** Supporting details share the section edges; Disclosure owns state and accessibility. */
export declare function ToolCardDisclosure({ actions, summary, description, children, className, contentInnerClassName, ...props }: ToolCardDisclosureProps): import("react/jsx-runtime").JSX.Element;
export interface ToolCardField {
    label: ReactNode;
    value: ReactNode;
    actions?: ReactNode;
}
export interface ToolCardFieldsProps extends HTMLAttributes<HTMLDListElement> {
    fields: readonly ToolCardField[];
}
/** Read-only metadata, with a shared value column and width-based stacking. */
export declare function ToolCardFields({ fields, className, ...props }: ToolCardFieldsProps): import("react/jsx-runtime").JSX.Element;
export interface ToolCardTextProps extends HTMLAttributes<HTMLPreElement> {
    variant?: "code" | "prose";
}
/** Bounded textual evidence; scrolling hands off to the conversation at its edges. */
export declare function ToolCardText({ children, className, variant, ...props }: ToolCardTextProps): import("react/jsx-runtime").JSX.Element;
