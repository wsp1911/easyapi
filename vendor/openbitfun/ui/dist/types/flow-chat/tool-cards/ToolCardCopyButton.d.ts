import type { MouseEvent as ReactMouseEvent } from "react";
export interface ToolCardCopyButtonProps {
    className?: string;
    copied?: boolean;
    copiedLabel?: string;
    disabled?: boolean;
    label: string;
    onPress: (event: ReactMouseEvent<HTMLButtonElement>) => void;
    testId?: string;
}
export declare function ToolCardCopyButton({ className, copied, copiedLabel, disabled, label, onPress, testId, }: ToolCardCopyButtonProps): import("react/jsx-runtime").JSX.Element;
