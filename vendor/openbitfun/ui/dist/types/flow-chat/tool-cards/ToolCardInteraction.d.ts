import type { MouseEvent, ReactNode } from 'react';
export interface ToolCardParticipant {
    id?: string;
    label: string;
    kind: 'agent' | 'session' | 'process';
    /** Host-owned identity artwork, shared with the corresponding agent card. */
    avatar?: ReactNode;
    openLabel?: string;
    /** Navigate to the participant's owning surface; details belong to the outcome. */
    onOpen?: (event: MouseEvent<HTMLButtonElement>) => void;
}
export interface ToolCardInteraction {
    operation: 'send' | 'receive' | 'create' | 'interrupt' | 'terminate' | 'delete' | 'rename' | 'list';
    source?: ToolCardParticipant;
    target: ToolCardParticipant;
    targets?: readonly ToolCardParticipant[];
}
/** An operation participant is an identity, not a result or status badge. */
export declare function ToolCardParticipantLabel({ label, icon, part }: {
    label: string;
    icon: ReactNode;
    part?: 'source' | 'target';
}): import("react/jsx-runtime").JSX.Element;
/** Shared header anatomy; hosts supply identities and the recorded operation. */
export declare function ToolCardInteractionSummary({ interaction, targetContent }: {
    interaction: ToolCardInteraction;
    /** Existing multi-agent identity/navigation rails can occupy the target slot. */
    targetContent?: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
/** The target owns the domain; the adjacent action label describes the operation. */
export declare function ToolCardInteractionIcon({ target }: Pick<ToolCardInteraction, 'operation' | 'target'>): import("react/jsx-runtime").JSX.Element;
