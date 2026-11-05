export declare const pageHeaderMeta: {
    readonly category: "primitive";
    readonly description: "A title composition with independent leading content, semantic level, visual size, description, action, and alignment.";
    readonly maturity: "stable";
    readonly name: "PageHeader";
    readonly props: readonly [{
        readonly name: "title";
        readonly type: "ReactNode";
    }, {
        readonly name: "description";
        readonly type: "ReactNode";
    }, {
        readonly name: "leading";
        readonly type: "ReactNode";
    }, {
        readonly name: "action";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "1";
        readonly name: "level";
        readonly type: "1 | 2 | 3 | 4 | 5 | 6";
    }, {
        readonly defaultValue: "md";
        readonly name: "size";
        readonly type: "sm | md | lg | display";
    }, {
        readonly defaultValue: "start";
        readonly name: "align";
        readonly type: "start | center";
    }, {
        readonly defaultValue: "false";
        readonly name: "required";
        readonly type: "boolean";
    }];
    readonly states: readonly ["default"];
    readonly tokens: readonly ["color.content.requiredIndicator", "color.content.primary", "color.content.muted", "type.heading.page.fontSize", "type.heading.section.fontSize", "type.heading.display.fontSize", "type.heading.welcome.fontSize", "type.pageIntro.fontSize", "type.body.lg.fontSize", "type.body.sm.fontSize"];
};
