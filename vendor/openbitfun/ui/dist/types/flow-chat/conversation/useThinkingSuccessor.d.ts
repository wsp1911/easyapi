import { type RefObject } from 'react';
import type { ThinkingContinuationResolver } from './useThinkingAnnotation';
type Phase = 'holding' | 'closing' | 'released';
interface Options {
    identity?: string;
    enabled: boolean;
    expanded: boolean;
    visuallyStreaming: boolean;
    resolveContinuation?: ThinkingContinuationResolver;
    onReadyChange?: (ready: boolean, immediate: boolean, pending: boolean) => void;
}
/** A live predecessor owns one handoff. The real successor stays mounted and
 * updating, but cannot paint below a row that is about to disappear. Nothing
 * here writes transcript scrolling or infers a live arrival from mounting. */
export declare function useThinkingSuccessor(rootRef: RefObject<HTMLDivElement>, options: Options): Phase | undefined;
export {};
