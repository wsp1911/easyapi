import { type ReactNode } from 'react';
import type { FlowChatToolStatus } from './FlowChatToolCard';
export interface ToolCapsulePresentation {
    label: string;
    /** Localized type, full target and state, also available to keyboard users. */
    description: string;
    statusLabel: string;
    countLabel?: string;
    status: FlowChatToolStatus;
    expanded: boolean;
    onExpandedChange: (expanded: boolean) => void;
    /** Used only when the existing card has neither details nor a direct action. */
    fallbackContent?: ReactNode;
}
/** Opt-in composition for explicitly lightweight tools; prominent cards ignore it. */
export declare function ToolCapsulePresentationProvider({ value, children, }: {
    value?: ToolCapsulePresentation;
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function useToolCapsulePresentation(): ToolCapsulePresentation | undefined;
/** Supporting record for lightweight cards which have no specialized detail body. */
export declare function ToolCapsuleDetails({ fields, error }: {
    fields: readonly {
        label: string;
        value: string;
    }[];
    error?: string;
}): import("react/jsx-runtime").JSX.Element;
