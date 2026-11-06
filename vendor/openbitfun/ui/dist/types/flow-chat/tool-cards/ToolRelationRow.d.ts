import { type HTMLAttributes, type ReactNode } from 'react';
import { type DialogSize } from '../../components/Dialog';
import type { FlowChatToolStatus } from './FlowChatToolCard';
import type { ToolCardInteraction } from './ToolCardInteraction';
export interface ToolRelationRowProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onClick'> {
    interaction: ToolCardInteraction;
    result: ReactNode;
    status: FlowChatToolStatus;
    details?: ReactNode;
    detailsTitle?: ReactNode;
    detailsSize?: DialogSize;
    resultLabel?: string;
}
/** The actor stays left; the arrow follows data flow. Only entities and the outcome are interactive. */
export declare function ToolRelationRow({ interaction, result, status, details, detailsTitle, detailsSize, resultLabel, className, ...props }: ToolRelationRowProps): import("react/jsx-runtime").JSX.Element;
