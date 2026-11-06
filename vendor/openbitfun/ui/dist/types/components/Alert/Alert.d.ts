import { type HTMLAttributes, type ReactNode } from "react";
export type AlertTone = "success" | "error" | "warning" | "info";
export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "title"> {
    closable?: boolean;
    closeLabel?: string;
    description?: ReactNode;
    message: ReactNode;
    onClose?: () => void;
    showIcon?: boolean;
    title?: ReactNode;
    tone?: AlertTone;
}
export declare const Alert: import("react").ForwardRefExoticComponent<AlertProps & import("react").RefAttributes<HTMLDivElement>>;
