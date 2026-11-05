import { type MouseEvent, type ReactNode } from 'react';
export interface AgentWaitTargets {
    items: readonly {
        id: string;
        name: string;
        avatar: ReactNode;
        openLabel: string;
        onOpen?: (event: MouseEvent<HTMLButtonElement>) => void;
    }[];
    previousLabel: string;
    nextLabel: string;
}
/** Shared overflow and keyboard anatomy; hosts own identity, artwork and navigation. */
export declare function AgentWaitTargetRail({ items, previousLabel, nextLabel }: AgentWaitTargets): import("react/jsx-runtime").JSX.Element;
