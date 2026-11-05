export declare const setupWizardMeta: {
    readonly name: "SetupWizard";
    readonly category: "form";
    readonly maturity: "stable";
    readonly description: "A controlled split-pane setup layout with effect-oriented guidance, one current-step indicator, form or editor content, and independent actions.";
    readonly props: readonly [{
        readonly name: "title";
        readonly type: "ReactNode";
    }, {
        readonly name: "titleId";
        readonly type: "string";
    }, {
        readonly name: "headerActions";
        readonly type: "ReactNode";
    }, {
        readonly name: "guideLabel";
        readonly type: "string";
    }, {
        readonly name: "step";
        readonly type: "SetupWizardStep";
    }, {
        readonly name: "footer";
        readonly type: "ReactNode";
    }, {
        readonly name: "contentMode";
        readonly type: "scroll | contained";
        readonly defaultValue: "scroll";
    }, {
        readonly name: "children";
        readonly type: "ReactNode";
    }];
    readonly states: readonly ["form", "contained", "narrow"];
    readonly tokens: readonly ["color.surface.chrome", "color.surface.scene", "color.content.primary", "color.content.muted", "space.2", "space.3", "space.4", "space.5", "space.6", "space.8", "type.heading.dialog.fontSize", "type.heading.page.fontSize", "type.body.lg.fontSize", "type.label.sm.fontSize"];
};
