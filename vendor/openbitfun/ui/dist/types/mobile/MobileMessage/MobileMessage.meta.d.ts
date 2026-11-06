export declare const mobileMessageMeta: {
    readonly category: "mobile";
    readonly description: "A responsive chat message shell for user, assistant, and system content.";
    readonly maturity: "stable";
    readonly name: "MobileMessage";
    readonly props: readonly [{
        readonly name: "roleType";
        readonly type: "\"user\" | \"assistant\" | \"system\"";
    }, {
        readonly name: "actions";
        readonly type: "ReactNode";
    }];
    readonly states: readonly ["user", "assistant", "system"];
    readonly tokens: readonly ["color.action.neutral.surface", "color.content.primary", "color.content.muted", "radius.xl", "space.3", "space.4"];
};
