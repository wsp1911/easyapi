import { type HTMLAttributes } from "react";
interface FloatingActionProps extends HTMLAttributes<HTMLSpanElement> {
    group?: boolean;
    size?: "xs" | "standard";
}
export declare function FloatingAction({ children, className, group, size, ...props }: FloatingActionProps): import("react/jsx-runtime").JSX.Element;
export {};
