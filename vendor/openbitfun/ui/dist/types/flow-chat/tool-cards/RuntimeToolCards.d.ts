import type { HTMLAttributes, ReactNode } from "react";
import { type FlowChatToolStatus } from "./FlowChatToolCard";
import { type ToolCardField } from "./ToolCardDetails";
interface RuntimeToolCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "title" | "onClick"> {
    action: ReactNode;
    summary?: ReactNode;
    resultSummary?: ReactNode;
    statusDescription?: string;
    status: FlowChatToolStatus;
    isExpanded?: boolean;
    onToggle?: () => void;
    requiresConfirmation?: boolean;
    error?: ReactNode;
}
export interface ListModelsToolCardModel {
    key: string;
    name: string;
    provider?: string;
    id?: string;
}
export interface ListModelsToolCardProps extends RuntimeToolCardProps {
    models: readonly ListModelsToolCardModel[];
    modelsLabel: ReactNode;
    modelIdLabel: ReactNode;
    query?: string;
    queryLabel?: ReactNode;
    emptyContent?: ReactNode;
    hasResult?: boolean;
    resultText?: string;
}
/** Enabled model identities, supplied by the executing host. No local model lookup. */
export declare function ListModelsToolCard({ action, summary, resultSummary, statusDescription, status, isExpanded, onToggle, requiresConfirmation, error, models, modelsLabel, modelIdLabel, query, queryLabel, emptyContent, resultText, hasResult, ...props }: ListModelsToolCardProps): import("react/jsx-runtime").JSX.Element;
export interface ControlHubToolCardRecord {
    key: string;
    title: string;
    description?: string;
    fields?: readonly ToolCardField[];
}
export interface ControlHubToolCardProps extends RuntimeToolCardProps {
    attention: "ambient" | "prominent";
    domain: "browser" | "terminal" | "meta" | "unknown";
    fields?: readonly ToolCardField[];
    records?: readonly ControlHubToolCardRecord[];
    resultLabel: ReactNode;
    resultText?: string;
    resultVariant?: "code" | "prose";
    resultDetailsText?: string;
    resultDetailsLabel?: ReactNode;
    notices?: readonly string[];
    noticesLabel?: ReactNode;
    images?: readonly {
        src: string;
        alt: string;
    }[];
    paramsText?: string;
    paramsLabel?: ReactNode;
    onParamsOpenChange?: () => void;
}
/** A shared control card; the adapter classifies the action and supplies recorded evidence. */
export declare function ControlHubToolCard({ action, summary, resultSummary, statusDescription, status, isExpanded, onToggle, requiresConfirmation, error, attention, domain, fields, records, resultLabel, resultText, resultVariant, resultDetailsText, resultDetailsLabel, notices, noticesLabel, images, paramsText, paramsLabel, onParamsOpenChange, ...props }: ControlHubToolCardProps): import("react/jsx-runtime").JSX.Element;
export {};
