import { type HTMLAttributes, type ReactNode } from "react";
export type MobileRadioGroupAppearance = "plain" | "surface";
export interface MobileRadioOption {
    description?: ReactNode;
    disabled?: boolean;
    label: ReactNode;
    leading?: ReactNode;
    value: string;
}
export interface MobileRadioGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
    appearance?: MobileRadioGroupAppearance;
    defaultValue?: string;
    name: string;
    onValueChange?: (value: string) => void;
    options: readonly MobileRadioOption[];
    value?: string;
}
/** A single-choice list. The options share one input name, so the platform keeps arrow-key
    navigation; the group is a radiogroup rather than a menu of buttons. */
export declare const MobileRadioGroup: import("react").ForwardRefExoticComponent<MobileRadioGroupProps & import("react").RefAttributes<HTMLDivElement>>;
