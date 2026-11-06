import type { CSSProperties, HTMLAttributes, MouseEvent, ReactNode } from 'react';
import type { FlowChatToolStatus } from './FlowChatToolCard';
export interface AgentControlToolCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onClick' | 'title'> {
    agentName: ReactNode;
    action?: string;
    /** Theme-aware identity color for the avatar's hover/focus label. */
    accentColor?: CSSProperties['color'];
    avatar?: ReactNode;
    isFailed?: boolean;
    onOpenAgent?: (event: MouseEvent<HTMLButtonElement>) => void;
    openAgentLabel?: string;
    openAgentTestId?: string;
    /** Localized metadata shown on the card and in its full hover preview. */
    preview?: {
        avatar?: ReactNode;
        agentType: ReactNode;
        model: ReactNode;
        labels: {
            agentType: string;
            model: string;
            description: string;
        };
    };
    requiresConfirmation?: boolean;
    status: FlowChatToolStatus;
    statusLabel?: ReactNode;
    statusTone?: 'danger' | 'neutral' | 'success' | 'warning';
    summary?: ReactNode;
}
/** An identity card with one action: open the agent in the host's detail pane. */
export declare function AgentControlToolCard({ agentName, action, accentColor, avatar, className, isFailed, onOpenAgent, openAgentLabel, openAgentTestId, preview, requiresConfirmation, status, statusLabel, statusTone, style, summary, ...props }: AgentControlToolCardProps): import("react/jsx-runtime").JSX.Element;
