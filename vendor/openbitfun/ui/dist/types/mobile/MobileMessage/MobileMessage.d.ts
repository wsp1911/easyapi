import { type HTMLAttributes, type ReactNode } from "react";
export type MobileMessageRole = "user" | "assistant" | "system";
export interface MobileMessageProps extends HTMLAttributes<HTMLElement> {
    actions?: ReactNode;
    children: ReactNode;
    roleType: MobileMessageRole;
}
export declare function MobileMessage({ actions, children, className, roleType, ...props }: MobileMessageProps): import("react/jsx-runtime").JSX.Element;
