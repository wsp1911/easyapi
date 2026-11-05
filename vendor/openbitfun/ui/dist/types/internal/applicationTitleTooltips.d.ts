export interface TitleTooltipTarget {
    element: HTMLElement;
    text: string;
}
/**
 * Route legacy HTML titles through the application tooltip while interacting.
 * Only the hovered/focused ancestor chains are observed; no document scan or
 * observer over streaming transcript content is needed. Restore the original
 * attributes on leave, so React and non-React controls retain their own state.
 */
export declare function subscribeApplicationTitleTooltips(ownerDocument: Document, onTargetChange: (target: TitleTooltipTarget | null) => void): () => void;
