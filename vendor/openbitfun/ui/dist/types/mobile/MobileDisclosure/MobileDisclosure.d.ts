import { type HTMLAttributes, type ReactNode } from "react";
export interface MobileDisclosureProps extends Omit<HTMLAttributes<HTMLDivElement>, "onToggle" | "title"> {
    children: ReactNode;
    disabled?: boolean;
    leading?: ReactNode;
    metadata?: ReactNode;
    onToggle: () => void;
    open: boolean;
    title: ReactNode;
}
export declare function MobileDisclosure({ children, className, disabled, leading, metadata, onToggle, open, title, ...props }: MobileDisclosureProps): import("react/jsx-runtime").JSX.Element;
