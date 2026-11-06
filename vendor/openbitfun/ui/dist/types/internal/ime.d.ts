interface KeyboardEventWithNativeSignals {
    isComposing?: boolean;
    keyCode?: number;
    nativeEvent?: {
        isComposing?: boolean;
        keyCode?: number;
    };
}
export declare function isImeOwnedKeyboardEvent(event: KeyboardEventWithNativeSignals, compositionActive?: boolean): boolean;
export {};
