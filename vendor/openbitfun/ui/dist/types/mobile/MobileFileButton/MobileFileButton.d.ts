import { type ChangeEventHandler, type InputHTMLAttributes, type ReactNode } from "react";
export interface MobileFileButtonProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "children" | "type"> {
    children: ReactNode;
    leading?: ReactNode;
    loading?: boolean;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}
export declare const MobileFileButton: import("react").ForwardRefExoticComponent<MobileFileButtonProps & import("react").RefAttributes<HTMLInputElement>>;
