import { type HTMLAttributes, type ReactNode } from "react";
export type MobileStatusTone = "neutral" | "info" | "danger";
export interface MobileStatusProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    action?: ReactNode;
    description?: ReactNode;
    icon?: ReactNode;
    loading?: boolean;
    title?: ReactNode;
    tone?: MobileStatusTone;
}
export declare function MobileStatus({ action, className, description, icon, loading, role, title, tone, ...props }: MobileStatusProps): import("react/jsx-runtime").JSX.Element;
