export const themeContractVersion = "0.1.0";
export const themes = Object.freeze({
  "dark": {
    "color.accent.border": "color-mix(in srgb, #60a5fa 40%, transparent)",
    "color.accent.borderSubtle": "color-mix(in srgb, #60a5fa 25%, transparent)",
    "color.accent.default": "#60a5fa",
    "color.accent.disabled": "rgba(96, 165, 250, 0.30)",
    "color.accent.hover": "#3b82f6",
    "color.accent.secondary": "#8b5cf6",
    "color.accent.secondaryBorder": "color-mix(in srgb, #8b5cf6 25%, transparent)",
    "color.accent.secondaryHover": "#7c6b99",
    "color.accent.secondarySurface": "color-mix(in srgb, #8b5cf6 9%, transparent)",
    "color.accent.secondarySurfaceStrong": "color-mix(in srgb, #8b5cf6 15%, transparent)",
    "color.accent.surface": "color-mix(in srgb, #60a5fa 9%, transparent)",
    "color.accent.surfaceStrong": "color-mix(in srgb, #60a5fa 15%, transparent)",
    "color.accent.surfaceSubtle": "color-mix(in srgb, #60a5fa 5%, transparent)",
    "color.action.neutral.border": "rgba(255, 255, 255, 0.18)",
    "color.action.neutral.content": "#b0b0b0",
    "color.action.neutral.contentDisabled": "#555555",
    "color.action.neutral.fillBorder": "rgba(255, 255, 255, 0.1)",
    "color.action.neutral.surface": "rgba(255, 255, 255, 0.1)",
    "color.action.neutral.surfaceHover": "rgba(255, 255, 255, 0.12)",
    "color.action.neutral.surfacePressed": "rgba(255, 255, 255, 0.15)",
    "color.action.primary.background": "rgba(255, 255, 255, 0.16)",
    "color.action.primary.content": "#f3f3f5",
    "color.action.primary.hover": "rgba(255, 255, 255, 0.24)",
    "color.action.primary.pressed": "rgba(255, 255, 255, 0.2)",
    "color.action.quiet.content": "#b0b0b0",
    "color.action.quiet.hover": "rgba(255, 255, 255, 0.06)",
    "color.action.quiet.pressed": "rgba(255, 255, 255, 0.1)",
    "color.action.secondary.background": "rgba(255, 255, 255, 0.06)",
    "color.action.secondary.content": "#e8e8e8",
    "color.action.secondary.hover": "rgba(255, 255, 255, 0.1)",
    "color.action.secondary.pressed": "rgba(255, 255, 255, 0.12)",
    "color.actionCard.background": "rgba(255, 255, 255, 0.1)",
    "color.border.default": "rgba(255, 255, 255, 0.18)",
    "color.border.strong": "rgba(255, 255, 255, 0.3)",
    "color.border.subtle": "rgba(255, 255, 255, 0.12)",
    "color.codeChange.added": "#1aa73e",
    "color.codeChange.removed": "#ec221f",
    "color.codeDiff.added.gutter": "color-mix(in srgb, #00cab1 5%, #1c1c1f)",
    "color.codeDiff.added.line": "color-mix(in srgb, #00cab1 8%, #1c1c1f)",
    "color.codeDiff.added.marker": "#00cab1",
    "color.codeDiff.added.word": "color-mix(in srgb, #00cab1 22%, #1c1c1f)",
    "color.codeDiff.foreground": "#e8e8e8",
    "color.codeDiff.gutterBorder": "#1c1c1f",
    "color.codeDiff.lineNumber": "#b0b0b0",
    "color.codeDiff.removed.gutter": "color-mix(in srgb, #ff2e3f 5%, #1c1c1f)",
    "color.codeDiff.removed.line": "color-mix(in srgb, #ff2e3f 8%, #1c1c1f)",
    "color.codeDiff.removed.marker": "#ff2e3f",
    "color.codeDiff.removed.word": "color-mix(in srgb, #ff2e3f 22%, #1c1c1f)",
    "color.codeDiff.syntax.comment": "#9a9a9a",
    "color.codeDiff.syntax.declaration": "#d568ea",
    "color.codeDiff.syntax.function": "#9d6afb",
    "color.codeDiff.syntax.keyword": "#ff678d",
    "color.codeDiff.syntax.number": "#7cdee9",
    "color.codeDiff.syntax.operator": "#08c0ef",
    "color.codeDiff.syntax.property": "#ffa359",
    "color.codeDiff.syntax.punctuation": "#b0b0b0",
    "color.codeDiff.syntax.string": "#34d399",
    "color.codeDiff.syntax.variable": "#ffcc00",
    "color.composer.border": "rgba(255, 255, 255, 0.18)",
    "color.composer.contextBackground": "rgba(255, 255, 255, 0.06)",
    "color.content.caption": "#858585",
    "color.content.disabled": "#555555",
    "color.content.inverse": "#0e0e10",
    "color.content.muted": "#858585",
    "color.content.onDark": "#ffffff",
    "color.content.onLight": "#000000",
    "color.content.primary": "#e8e8e8",
    "color.content.requiredIndicator": "#059cb0",
    "color.content.secondary": "#b0b0b0",
    "color.control.highlight.background": "#059cb0",
    "color.control.highlight.content": "#000000",
    "color.control.launcher.background": "rgba(255, 255, 255, 0.15)",
    "color.control.launcher.backgroundHover": "color-mix(in srgb, #059cb0 20%, transparent)",
    "color.control.launcher.backgroundPressed": "color-mix(in srgb, #059cb0 30%, transparent)",
    "color.control.launcher.content": "#b0b0b0",
    "color.control.launcher.contentDisabled": "#555555",
    "color.control.launcher.contentHover": "#059cb0",
    "color.control.launcher.contentPressed": "#059cb0",
    "color.control.switch.thumb": "#ffffff",
    "color.control.switch.track": "#555555",
    "color.control.switch.trackChecked": "#059cb0",
    "color.field.background": "#1c1c1f",
    "color.field.backgroundHover": "rgba(255, 255, 255, 0.06)",
    "color.field.border": "rgba(255, 255, 255, 0.18)",
    "color.field.borderActive": "#858585",
    "color.field.borderFocus": "#858585",
    "color.field.borderHover": "rgba(255, 255, 255, 0.24)",
    "color.field.groupBackground": "#0e0e10",
    "color.field.placeholder": "#858585",
    "color.focus.ring": "#60a5fa",
    "color.identity.assistant.border": "color-mix(in srgb, #ec4899 15%, transparent)",
    "color.identity.assistant.content": "#ec4899",
    "color.identity.assistant.contentHover": "#f472b6",
    "color.identity.assistant.surface": "color-mix(in srgb, #ec4899 9%, transparent)",
    "color.identity.assistant.surfaceSubtle": "color-mix(in srgb, #ec4899 5%, transparent)",
    "color.identity.globalSearch.newProject": "#3271d7",
    "color.identity.globalSearch.newSession": "#ec221f",
    "color.identity.globalSearch.openBrowser": "#ff8c00",
    "color.identity.globalSearch.openFiles": "#9e54ff",
    "color.identity.globalSearch.openProject": "#059cb0",
    "color.identity.globalSearch.openTerminal": "#b0b0b0",
    "color.identity.harness.creative": "#2e7eff",
    "color.identity.harness.minimal": "#b434ef",
    "color.identity.harness.standard": "#1aa73e",
    "color.identity.harness.ultimate": "#ff8c00",
    "color.keyHint.background": "rgba(255, 255, 255, 0.1)",
    "color.keyHint.content": "#858585",
    "color.link.default": "#059cb0",
    "color.link.hover": "#36c6d7",
    "color.numberBadge.background": "rgba(255, 255, 255, 0.1)",
    "color.overlay.scrim": "rgba(0, 0, 0, 0.56)",
    "color.scrollbar.thumb": "rgba(255, 255, 255, 0.20)",
    "color.scrollbar.thumbHover": "rgba(255, 255, 255, 0.30)",
    "color.selection.surface": "rgba(255, 255, 255, 0.12)",
    "color.status.danger.border": "rgba(236, 34, 31, 0.3)",
    "color.status.danger.content": "#f47f7d",
    "color.status.danger.emphasis": "#ec221f",
    "color.status.danger.surface": "rgba(236, 34, 31, 0.1)",
    "color.status.info.border": "rgba(46, 126, 255, 0.3)",
    "color.status.info.content": "#7dafff",
    "color.status.info.emphasis": "#2e7eff",
    "color.status.info.surface": "rgba(46, 126, 255, 0.1)",
    "color.status.success.border": "rgba(26, 167, 62, 0.3)",
    "color.status.success.content": "#5fc178",
    "color.status.success.emphasis": "#1aa73e",
    "color.status.success.surface": "rgba(26, 167, 62, 0.1)",
    "color.status.warning.border": "rgba(255, 140, 0, 0.3)",
    "color.status.warning.content": "#ff930f",
    "color.status.warning.emphasis": "#ff8c00",
    "color.status.warning.surface": "rgba(255, 140, 0, 0.1)",
    "color.surface.canvas": "#0e0e10",
    "color.surface.chrome": "#0e0e10",
    "color.surface.panel": "#1c1c1f",
    "color.surface.raised": "#1c1c1f",
    "color.surface.scene": "#1c1c1f",
    "color.surface.subtle": "rgba(255, 255, 255, 0.06)",
    "color.surface.tertiary": "#0e0e10",
    "color.surface.workbench": "#0e0e10",
    "component.button.content": "#b0b0b0",
    "component.button.fillBackground": "rgba(255, 255, 255, 0.1)",
    "component.button.fillBackgroundHover": "rgba(255, 255, 255, 0.12)",
    "component.button.fillBackgroundPressed": "rgba(255, 255, 255, 0.15)",
    "component.button.outlineBorder": "rgba(255, 255, 255, 0.18)",
    "component.button.outlineBorderInteractive": "rgba(255, 255, 255, 0.18)",
    "component.button.primaryBackground": "rgba(255, 255, 255, 0.16)",
    "component.button.primaryBackgroundHover": "rgba(255, 255, 255, 0.24)",
    "component.button.primaryBackgroundPressed": "rgba(255, 255, 255, 0.2)",
    "component.button.primaryContentDisabled": "#555555",
    "component.button.textContent": "#60a5fa",
    "component.button.textContentDisabled": "rgba(96, 165, 250, 0.30)",
    "component.button.textContentHover": "#3b82f6",
    "component.empty.media": "color-mix(in srgb, #858585 35%, #0e0e10)",
    "effect.blur.base": "blur(8px) saturate(1.1)",
    "effect.blur.medium": "blur(12px) saturate(1.2)",
    "effect.blur.subtle": "blur(4px) saturate(1.05)",
    "opacity.disabled": 0.6,
    "opacity.focus": 0.9,
    "opacity.hover": 0.8,
    "opacity.muted": 0.8,
    "shadow.accentGlow": "0 12px 32px color-mix(in srgb, #3b82f6 25%, transparent), 0 6px 16px color-mix(in srgb, #60a5fa 18%, transparent), 0 3px 8px rgba(0, 0, 0, 0.12)",
    "shadow.base": "0 4px 8px rgba(0, 0, 0, 0.7)",
    "shadow.composer": "0 2px 6px rgba(0, 0, 0, 0.32)",
    "shadow.innerHighlight": "inset 0 1px 0 rgba(255, 255, 255, 0.08)",
    "shadow.innerHighlightHover": "inset 0 1px 0 rgba(255, 255, 255, 0.24)",
    "shadow.lg": "0 8px 16px rgba(0, 0, 0, 0.6)",
    "shadow.menu": "0 4px 10px rgba(0, 0, 0, 0.48)",
    "shadow.overlay": "0 4px 20px rgba(0, 0, 0, 0.48)",
    "shadow.raised": "0 2px 4px rgba(0, 0, 0, 0.8)",
    "shadow.sm": "0 2px 4px rgba(0, 0, 0, 0.8)",
    "shadow.xl": "0 12px 24px rgba(0, 0, 0, 0.5)",
    "shadow.xs": "0 1px 2px rgba(0, 0, 0, 0.9)"
  },
  "highContrastDark": {
    "color.accent.border": "color-mix(in srgb, #60a5fa 40%, transparent)",
    "color.accent.borderSubtle": "color-mix(in srgb, #60a5fa 25%, transparent)",
    "color.accent.default": "#60a5fa",
    "color.accent.disabled": "rgba(96, 165, 250, 0.30)",
    "color.accent.hover": "#3b82f6",
    "color.accent.secondary": "#8b5cf6",
    "color.accent.secondaryBorder": "color-mix(in srgb, #8b5cf6 25%, transparent)",
    "color.accent.secondaryHover": "#7c6b99",
    "color.accent.secondarySurface": "color-mix(in srgb, #8b5cf6 9%, transparent)",
    "color.accent.secondarySurfaceStrong": "color-mix(in srgb, #8b5cf6 15%, transparent)",
    "color.accent.surface": "color-mix(in srgb, #60a5fa 9%, transparent)",
    "color.accent.surfaceStrong": "color-mix(in srgb, #60a5fa 15%, transparent)",
    "color.accent.surfaceSubtle": "color-mix(in srgb, #60a5fa 5%, transparent)",
    "color.action.neutral.border": "#ffffff",
    "color.action.neutral.content": "#ffffff",
    "color.action.neutral.contentDisabled": "#d0d0d0",
    "color.action.neutral.fillBorder": "#ffffff",
    "color.action.neutral.surface": "#343434",
    "color.action.neutral.surfaceHover": "#505050",
    "color.action.neutral.surfacePressed": "#6b6b6b",
    "color.action.primary.background": "#ffffff",
    "color.action.primary.content": "#000000",
    "color.action.primary.hover": "#e6e6e6",
    "color.action.primary.pressed": "#ffffff",
    "color.action.quiet.content": "#b0b0b0",
    "color.action.quiet.hover": "rgba(255, 255, 255, 0.06)",
    "color.action.quiet.pressed": "rgba(255, 255, 255, 0.1)",
    "color.action.secondary.background": "rgba(255, 255, 255, 0.06)",
    "color.action.secondary.content": "#e8e8e8",
    "color.action.secondary.hover": "rgba(255, 255, 255, 0.1)",
    "color.action.secondary.pressed": "rgba(255, 255, 255, 0.12)",
    "color.actionCard.background": "#343434",
    "color.border.default": "#b5b5b5",
    "color.border.strong": "#ffffff",
    "color.border.subtle": "#8a8a8a",
    "color.codeChange.added": "#1aa73e",
    "color.codeChange.removed": "#ec221f",
    "color.codeDiff.added.gutter": "color-mix(in srgb, #00cab1 5%, #090909)",
    "color.codeDiff.added.line": "color-mix(in srgb, #00cab1 8%, #090909)",
    "color.codeDiff.added.marker": "#00cab1",
    "color.codeDiff.added.word": "color-mix(in srgb, #00cab1 22%, #090909)",
    "color.codeDiff.foreground": "#ffffff",
    "color.codeDiff.gutterBorder": "#090909",
    "color.codeDiff.lineNumber": "#b0b0b0",
    "color.codeDiff.removed.gutter": "color-mix(in srgb, #ff2e3f 5%, #090909)",
    "color.codeDiff.removed.line": "color-mix(in srgb, #ff2e3f 8%, #090909)",
    "color.codeDiff.removed.marker": "#ff2e3f",
    "color.codeDiff.removed.word": "color-mix(in srgb, #ff2e3f 22%, #090909)",
    "color.codeDiff.syntax.comment": "#9a9a9a",
    "color.codeDiff.syntax.declaration": "#d568ea",
    "color.codeDiff.syntax.function": "#9d6afb",
    "color.codeDiff.syntax.keyword": "#ff678d",
    "color.codeDiff.syntax.number": "#7cdee9",
    "color.codeDiff.syntax.operator": "#08c0ef",
    "color.codeDiff.syntax.property": "#ffa359",
    "color.codeDiff.syntax.punctuation": "#b0b0b0",
    "color.codeDiff.syntax.string": "#34d399",
    "color.codeDiff.syntax.variable": "#ffcc00",
    "color.composer.border": "#b5b5b5",
    "color.composer.contextBackground": "rgba(255, 255, 255, 0.06)",
    "color.content.caption": "#d0d0d0",
    "color.content.disabled": "#555555",
    "color.content.inverse": "#0e0e10",
    "color.content.muted": "#d0d0d0",
    "color.content.onDark": "#ffffff",
    "color.content.onLight": "#000000",
    "color.content.primary": "#ffffff",
    "color.content.requiredIndicator": "#ffcc00",
    "color.content.secondary": "#f0f0f0",
    "color.control.highlight.background": "#ffcc00",
    "color.control.highlight.content": "#000000",
    "color.control.launcher.background": "#6b6b6b",
    "color.control.launcher.backgroundHover": "color-mix(in srgb, #ffcc00 20%, transparent)",
    "color.control.launcher.backgroundPressed": "color-mix(in srgb, #ffcc00 30%, transparent)",
    "color.control.launcher.content": "#ffffff",
    "color.control.launcher.contentDisabled": "#d0d0d0",
    "color.control.launcher.contentHover": "#ffcc00",
    "color.control.launcher.contentPressed": "#ffcc00",
    "color.control.switch.thumb": "#000000",
    "color.control.switch.track": "#b5b5b5",
    "color.control.switch.trackChecked": "#ffcc00",
    "color.field.background": "#1c1c1f",
    "color.field.backgroundHover": "rgba(255, 255, 255, 0.06)",
    "color.field.border": "#b5b5b5",
    "color.field.borderActive": "#ffcc00",
    "color.field.borderFocus": "#ffcc00",
    "color.field.borderHover": "#ffffff",
    "color.field.groupBackground": "#000000",
    "color.field.placeholder": "#d0d0d0",
    "color.focus.ring": "#ffcc00",
    "color.identity.assistant.border": "color-mix(in srgb, #ec4899 15%, transparent)",
    "color.identity.assistant.content": "#ec4899",
    "color.identity.assistant.contentHover": "#f472b6",
    "color.identity.assistant.surface": "color-mix(in srgb, #ec4899 9%, transparent)",
    "color.identity.assistant.surfaceSubtle": "color-mix(in srgb, #ec4899 5%, transparent)",
    "color.identity.globalSearch.newProject": "#3271d7",
    "color.identity.globalSearch.newSession": "#ec221f",
    "color.identity.globalSearch.openBrowser": "#ff8c00",
    "color.identity.globalSearch.openFiles": "#9e54ff",
    "color.identity.globalSearch.openProject": "#059cb0",
    "color.identity.globalSearch.openTerminal": "#ffffff",
    "color.identity.harness.creative": "#2e7eff",
    "color.identity.harness.minimal": "#b434ef",
    "color.identity.harness.standard": "#1aa73e",
    "color.identity.harness.ultimate": "#ff8c00",
    "color.keyHint.background": "#343434",
    "color.keyHint.content": "#d0d0d0",
    "color.link.default": "#7cdee9",
    "color.link.hover": "#b4eff5",
    "color.numberBadge.background": "#343434",
    "color.overlay.scrim": "rgba(0, 0, 0, 0.56)",
    "color.scrollbar.thumb": "rgba(255, 255, 255, 0.20)",
    "color.scrollbar.thumbHover": "rgba(255, 255, 255, 0.30)",
    "color.selection.surface": "#505050",
    "color.status.danger.border": "rgba(236, 34, 31, 0.3)",
    "color.status.danger.content": "#f7a7a5",
    "color.status.danger.emphasis": "#ec221f",
    "color.status.danger.surface": "rgba(236, 34, 31, 0.1)",
    "color.status.info.border": "rgba(46, 126, 255, 0.3)",
    "color.status.info.content": "#abcbff",
    "color.status.info.emphasis": "#2e7eff",
    "color.status.info.surface": "rgba(46, 126, 255, 0.1)",
    "color.status.success.border": "rgba(26, 167, 62, 0.3)",
    "color.status.success.content": "#afe0bb",
    "color.status.success.emphasis": "#1aa73e",
    "color.status.success.surface": "rgba(26, 167, 62, 0.1)",
    "color.status.warning.border": "rgba(255, 140, 0, 0.3)",
    "color.status.warning.content": "#ffa940",
    "color.status.warning.emphasis": "#ff8c00",
    "color.status.warning.surface": "rgba(255, 140, 0, 0.04)",
    "color.surface.canvas": "#000000",
    "color.surface.chrome": "#000000",
    "color.surface.panel": "#090909",
    "color.surface.raised": "#1c1c1f",
    "color.surface.scene": "#090909",
    "color.surface.subtle": "rgba(255, 255, 255, 0.06)",
    "color.surface.tertiary": "#000000",
    "color.surface.workbench": "#000000",
    "component.button.content": "#ffffff",
    "component.button.fillBackground": "#343434",
    "component.button.fillBackgroundHover": "#505050",
    "component.button.fillBackgroundPressed": "#6b6b6b",
    "component.button.outlineBorder": "#ffffff",
    "component.button.outlineBorderInteractive": "#ffffff",
    "component.button.primaryBackground": "#ffffff",
    "component.button.primaryBackgroundHover": "#e6e6e6",
    "component.button.primaryBackgroundPressed": "#ffffff",
    "component.button.primaryContentDisabled": "#d0d0d0",
    "component.button.textContent": "#60a5fa",
    "component.button.textContentDisabled": "rgba(96, 165, 250, 0.30)",
    "component.button.textContentHover": "#3b82f6",
    "component.empty.media": "color-mix(in srgb, #d0d0d0 35%, #000000)",
    "effect.blur.base": "blur(8px) saturate(1.1)",
    "effect.blur.medium": "blur(12px) saturate(1.2)",
    "effect.blur.subtle": "blur(4px) saturate(1.05)",
    "opacity.disabled": 0.6,
    "opacity.focus": 0.9,
    "opacity.hover": 0.8,
    "opacity.muted": 0.8,
    "shadow.accentGlow": "0 12px 32px color-mix(in srgb, #3b82f6 25%, transparent), 0 6px 16px color-mix(in srgb, #60a5fa 18%, transparent), 0 3px 8px rgba(0, 0, 0, 0.12)",
    "shadow.base": "0 4px 8px rgba(0, 0, 0, 0.7)",
    "shadow.composer": "0 2px 6px rgba(0, 0, 0, 0.32)",
    "shadow.innerHighlight": "inset 0 1px 0 rgba(255, 255, 255, 0.08)",
    "shadow.innerHighlightHover": "inset 0 1px 0 rgba(255, 255, 255, 0.24)",
    "shadow.lg": "0 8px 16px rgba(0, 0, 0, 0.6)",
    "shadow.menu": "0 4px 10px rgba(0, 0, 0, 0.48)",
    "shadow.overlay": "0 4px 20px rgba(0, 0, 0, 0.48)",
    "shadow.raised": "0 2px 4px rgba(0, 0, 0, 0.8)",
    "shadow.sm": "0 2px 4px rgba(0, 0, 0, 0.8)",
    "shadow.xl": "0 12px 24px rgba(0, 0, 0, 0.5)",
    "shadow.xs": "0 1px 2px rgba(0, 0, 0, 0.9)"
  },
  "highContrastLight": {
    "color.accent.border": "color-mix(in srgb, #059cb0 40%, transparent)",
    "color.accent.borderSubtle": "color-mix(in srgb, #059cb0 25%, transparent)",
    "color.accent.default": "#059cb0",
    "color.accent.disabled": "rgba(5, 156, 176, 0.30)",
    "color.accent.hover": "#059cb0",
    "color.accent.secondary": "#7c6b99",
    "color.accent.secondaryBorder": "color-mix(in srgb, #7c6b99 25%, transparent)",
    "color.accent.secondaryHover": "#655680",
    "color.accent.secondarySurface": "color-mix(in srgb, #7c6b99 9%, transparent)",
    "color.accent.secondarySurfaceStrong": "color-mix(in srgb, #7c6b99 15%, transparent)",
    "color.accent.surface": "color-mix(in srgb, #059cb0 9%, transparent)",
    "color.accent.surfaceStrong": "color-mix(in srgb, #059cb0 15%, transparent)",
    "color.accent.surfaceSubtle": "color-mix(in srgb, #059cb0 5%, transparent)",
    "color.action.neutral.border": "#000000",
    "color.action.neutral.content": "#000000",
    "color.action.neutral.contentDisabled": "#343434",
    "color.action.neutral.fillBorder": "#000000",
    "color.action.neutral.surface": "#e6e6e6",
    "color.action.neutral.surfaceHover": "#cccccc",
    "color.action.neutral.surfacePressed": "#b3b3b3",
    "color.action.primary.background": "#000000",
    "color.action.primary.content": "#ffffff",
    "color.action.primary.hover": "#262626",
    "color.action.primary.pressed": "#000000",
    "color.action.quiet.content": "#161616",
    "color.action.quiet.hover": "#f3f3f5",
    "color.action.quiet.pressed": "rgba(16, 26, 39, 0.09)",
    "color.action.secondary.background": "#f3f3f5",
    "color.action.secondary.content": "#000000",
    "color.action.secondary.hover": "rgba(16, 26, 39, 0.09)",
    "color.action.secondary.pressed": "rgba(16, 26, 39, 0.13)",
    "color.actionCard.background": "#e6e6e6",
    "color.border.default": "#3b3b3b",
    "color.border.strong": "#000000",
    "color.border.subtle": "#707070",
    "color.codeChange.added": "#1aa73e",
    "color.codeChange.removed": "#ec221f",
    "color.codeDiff.added.gutter": "#effbf8",
    "color.codeDiff.added.line": "#eaf9f5",
    "color.codeDiff.added.marker": "#00cab1",
    "color.codeDiff.added.word": "#c7f2eb",
    "color.codeDiff.foreground": "#090909",
    "color.codeDiff.gutterBorder": "#ffffff",
    "color.codeDiff.lineNumber": "#555555",
    "color.codeDiff.removed.gutter": "#ffefec",
    "color.codeDiff.removed.line": "#ffeae6",
    "color.codeDiff.removed.marker": "#ff2e3f",
    "color.codeDiff.removed.word": "#ffcecd",
    "color.codeDiff.syntax.comment": "#858585",
    "color.codeDiff.syntax.declaration": "#c635e4",
    "color.codeDiff.syntax.function": "#7b43f8",
    "color.codeDiff.syntax.keyword": "#fc2b73",
    "color.codeDiff.syntax.number": "#1ca1c7",
    "color.codeDiff.syntax.operator": "#08c0ef",
    "color.codeDiff.syntax.property": "#d47628",
    "color.codeDiff.syntax.punctuation": "#77777a",
    "color.codeDiff.syntax.string": "#199f43",
    "color.codeDiff.syntax.variable": "#d5a910",
    "color.composer.border": "#3b3b3b",
    "color.composer.contextBackground": "rgba(16, 26, 39, 0.03)",
    "color.content.caption": "#343434",
    "color.content.disabled": "rgba(0, 0, 0, 0.30)",
    "color.content.inverse": "#ffffff",
    "color.content.muted": "#343434",
    "color.content.onDark": "#ffffff",
    "color.content.onLight": "#000000",
    "color.content.primary": "#000000",
    "color.content.requiredIndicator": "#005fcc",
    "color.content.secondary": "#161616",
    "color.control.highlight.background": "#005fcc",
    "color.control.highlight.content": "#ffffff",
    "color.control.launcher.background": "#cccccc",
    "color.control.launcher.backgroundHover": "color-mix(in srgb, #005fcc 20%, transparent)",
    "color.control.launcher.backgroundPressed": "color-mix(in srgb, #005fcc 30%, transparent)",
    "color.control.launcher.content": "#000000",
    "color.control.launcher.contentDisabled": "#343434",
    "color.control.launcher.contentHover": "#005fcc",
    "color.control.launcher.contentPressed": "#005fcc",
    "color.control.switch.thumb": "#ffffff",
    "color.control.switch.track": "#3b3b3b",
    "color.control.switch.trackChecked": "#005fcc",
    "color.field.background": "#ffffff",
    "color.field.backgroundHover": "#ffffff",
    "color.field.border": "#3b3b3b",
    "color.field.borderActive": "#005fcc",
    "color.field.borderFocus": "#005fcc",
    "color.field.borderHover": "#000000",
    "color.field.groupBackground": "#f7f7f7",
    "color.field.placeholder": "#343434",
    "color.focus.ring": "#005fcc",
    "color.identity.assistant.border": "color-mix(in srgb, #db2777 15%, transparent)",
    "color.identity.assistant.content": "#db2777",
    "color.identity.assistant.contentHover": "#be185d",
    "color.identity.assistant.surface": "color-mix(in srgb, #db2777 9%, transparent)",
    "color.identity.assistant.surfaceSubtle": "color-mix(in srgb, #db2777 5%, transparent)",
    "color.identity.globalSearch.newProject": "#3271d7",
    "color.identity.globalSearch.newSession": "#ec221f",
    "color.identity.globalSearch.openBrowser": "#ff8c00",
    "color.identity.globalSearch.openFiles": "#9e54ff",
    "color.identity.globalSearch.openProject": "#059cb0",
    "color.identity.globalSearch.openTerminal": "#000000",
    "color.identity.harness.creative": "#2e7eff",
    "color.identity.harness.minimal": "#b434ef",
    "color.identity.harness.standard": "#1aa73e",
    "color.identity.harness.ultimate": "#ff8c00",
    "color.keyHint.background": "#cccccc",
    "color.keyHint.content": "#343434",
    "color.link.default": "#0a6d7d",
    "color.link.hover": "#0d5764",
    "color.numberBadge.background": "#e6e6e6",
    "color.overlay.scrim": "rgba(16, 26, 39, 0.20)",
    "color.scrollbar.thumb": "rgba(0, 0, 0, 0.20)",
    "color.scrollbar.thumbHover": "rgba(0, 0, 0, 0.30)",
    "color.selection.surface": "#cccccc",
    "color.status.danger.border": "rgba(236, 34, 31, 0.3)",
    "color.status.danger.content": "#8e1413",
    "color.status.danger.emphasis": "#ec221f",
    "color.status.danger.surface": "rgba(236, 34, 31, 0.1)",
    "color.status.info.border": "rgba(46, 126, 255, 0.3)",
    "color.status.info.content": "#1c4c99",
    "color.status.info.emphasis": "#2e7eff",
    "color.status.info.surface": "rgba(46, 126, 255, 0.1)",
    "color.status.success.border": "rgba(26, 167, 62, 0.3)",
    "color.status.success.content": "#0d541f",
    "color.status.success.emphasis": "#1aa73e",
    "color.status.success.surface": "rgba(26, 167, 62, 0.1)",
    "color.status.warning.border": "rgba(255, 140, 0, 0.3)",
    "color.status.warning.content": "#663800",
    "color.status.warning.emphasis": "#ff8c00",
    "color.status.warning.surface": "rgba(255, 140, 0, 0.04)",
    "color.surface.canvas": "#ffffff",
    "color.surface.chrome": "#f8f8f9",
    "color.surface.panel": "#ffffff",
    "color.surface.raised": "#ffffff",
    "color.surface.scene": "#ffffff",
    "color.surface.subtle": "rgba(16, 26, 39, 0.03)",
    "color.surface.tertiary": "#f7f7f7",
    "color.surface.workbench": "#f3f3f5",
    "component.button.content": "#000000",
    "component.button.fillBackground": "#e6e6e6",
    "component.button.fillBackgroundHover": "#cccccc",
    "component.button.fillBackgroundPressed": "#b3b3b3",
    "component.button.outlineBorder": "#000000",
    "component.button.outlineBorderInteractive": "#000000",
    "component.button.primaryBackground": "#000000",
    "component.button.primaryBackgroundHover": "#262626",
    "component.button.primaryBackgroundPressed": "#000000",
    "component.button.primaryContentDisabled": "#343434",
    "component.button.textContent": "#059cb0",
    "component.button.textContentDisabled": "rgba(5, 156, 176, 0.30)",
    "component.button.textContentHover": "#059cb0",
    "component.empty.media": "color-mix(in srgb, #343434 35%, #f7f7f7)",
    "effect.blur.base": "blur(8px) saturate(1.05)",
    "effect.blur.medium": "blur(12px) saturate(1.2)",
    "effect.blur.subtle": "blur(4px) saturate(1.02)",
    "opacity.disabled": 0.55,
    "opacity.focus": 0.9,
    "opacity.hover": 0.75,
    "opacity.muted": 0.75,
    "shadow.accentGlow": "0 12px 32px color-mix(in srgb, #059cb0 25%, transparent), 0 6px 16px color-mix(in srgb, #059cb0 18%, transparent), 0 3px 8px rgba(0, 0, 0, 0.12)",
    "shadow.base": "0 4px 8px rgba(16, 26, 39, 0.07)",
    "shadow.composer": "0 2px 12px rgba(0, 0, 0, 0.08)",
    "shadow.innerHighlight": "inset 0 1px 0 rgba(255, 255, 255, 0.08)",
    "shadow.innerHighlightHover": "inset 0 1px 0 rgba(255, 255, 255, 0.24)",
    "shadow.lg": "0 8px 16px rgba(16, 26, 39, 0.09)",
    "shadow.menu": "0 4px 20px rgba(0, 0, 0, 0.12)",
    "shadow.overlay": "0 4px 20px rgba(0, 0, 0, 0.12)",
    "shadow.raised": "0 2px 4px rgba(16, 26, 39, 0.055)",
    "shadow.sm": "0 2px 4px rgba(16, 26, 39, 0.055)",
    "shadow.xl": "0 12px 24px rgba(16, 26, 39, 0.11)",
    "shadow.xs": "0 1px 2px rgba(16, 26, 39, 0.04)"
  },
  "light": {
    "color.accent.border": "color-mix(in srgb, #059cb0 40%, transparent)",
    "color.accent.borderSubtle": "color-mix(in srgb, #059cb0 25%, transparent)",
    "color.accent.default": "#059cb0",
    "color.accent.disabled": "rgba(5, 156, 176, 0.30)",
    "color.accent.hover": "#059cb0",
    "color.accent.secondary": "#7c6b99",
    "color.accent.secondaryBorder": "color-mix(in srgb, #7c6b99 25%, transparent)",
    "color.accent.secondaryHover": "#655680",
    "color.accent.secondarySurface": "color-mix(in srgb, #7c6b99 9%, transparent)",
    "color.accent.secondarySurfaceStrong": "color-mix(in srgb, #7c6b99 15%, transparent)",
    "color.accent.surface": "color-mix(in srgb, #059cb0 9%, transparent)",
    "color.accent.surfaceStrong": "color-mix(in srgb, #059cb0 15%, transparent)",
    "color.accent.surfaceSubtle": "color-mix(in srgb, #059cb0 5%, transparent)",
    "color.action.neutral.border": "rgba(0, 0, 0, 0.05)",
    "color.action.neutral.content": "rgba(0, 0, 0, 0.80)",
    "color.action.neutral.contentDisabled": "rgba(0, 0, 0, 0.30)",
    "color.action.neutral.fillBorder": "rgba(0, 0, 0, 0.05)",
    "color.action.neutral.surface": "rgba(0, 0, 0, 0.05)",
    "color.action.neutral.surfaceHover": "rgba(0, 0, 0, 0.08)",
    "color.action.neutral.surfacePressed": "rgba(0, 0, 0, 0.10)",
    "color.action.primary.background": "#101a27",
    "color.action.primary.content": "#ffffff",
    "color.action.primary.hover": "#1c1c1f",
    "color.action.primary.pressed": "#000000",
    "color.action.quiet.content": "rgba(0, 0, 0, 0.60)",
    "color.action.quiet.hover": "#f3f3f5",
    "color.action.quiet.pressed": "rgba(16, 26, 39, 0.09)",
    "color.action.secondary.background": "#f3f3f5",
    "color.action.secondary.content": "rgba(0, 0, 0, 0.80)",
    "color.action.secondary.hover": "rgba(16, 26, 39, 0.09)",
    "color.action.secondary.pressed": "rgba(16, 26, 39, 0.13)",
    "color.actionCard.background": "rgba(0, 0, 0, 0.03)",
    "color.border.default": "rgba(16, 26, 39, 0.15)",
    "color.border.strong": "rgba(16, 26, 39, 0.34)",
    "color.border.subtle": "rgba(16, 26, 39, 0.08)",
    "color.codeChange.added": "#1aa73e",
    "color.codeChange.removed": "#ec221f",
    "color.codeDiff.added.gutter": "#effbf8",
    "color.codeDiff.added.line": "#eaf9f5",
    "color.codeDiff.added.marker": "#00cab1",
    "color.codeDiff.added.word": "#c7f2eb",
    "color.codeDiff.foreground": "#090909",
    "color.codeDiff.gutterBorder": "#ffffff",
    "color.codeDiff.lineNumber": "#555555",
    "color.codeDiff.removed.gutter": "#ffefec",
    "color.codeDiff.removed.line": "#ffeae6",
    "color.codeDiff.removed.marker": "#ff2e3f",
    "color.codeDiff.removed.word": "#ffcecd",
    "color.codeDiff.syntax.comment": "#858585",
    "color.codeDiff.syntax.declaration": "#c635e4",
    "color.codeDiff.syntax.function": "#7b43f8",
    "color.codeDiff.syntax.keyword": "#fc2b73",
    "color.codeDiff.syntax.number": "#1ca1c7",
    "color.codeDiff.syntax.operator": "#08c0ef",
    "color.codeDiff.syntax.property": "#d47628",
    "color.codeDiff.syntax.punctuation": "#77777a",
    "color.codeDiff.syntax.string": "#199f43",
    "color.codeDiff.syntax.variable": "#d5a910",
    "color.composer.border": "rgba(0, 0, 0, 0.08)",
    "color.composer.contextBackground": "rgba(0, 0, 0, 0.03)",
    "color.content.caption": "rgba(0, 0, 0, 0.40)",
    "color.content.disabled": "rgba(0, 0, 0, 0.30)",
    "color.content.inverse": "#ffffff",
    "color.content.muted": "#6a6a6a",
    "color.content.onDark": "#ffffff",
    "color.content.onLight": "#000000",
    "color.content.primary": "rgba(0, 0, 0, 0.80)",
    "color.content.requiredIndicator": "#059cb0",
    "color.content.secondary": "rgba(0, 0, 0, 0.60)",
    "color.control.highlight.background": "#059cb0",
    "color.control.highlight.content": "#000000",
    "color.control.launcher.background": "rgba(0, 0, 0, 0.08)",
    "color.control.launcher.backgroundHover": "color-mix(in srgb, #059cb0 20%, transparent)",
    "color.control.launcher.backgroundPressed": "color-mix(in srgb, #059cb0 30%, transparent)",
    "color.control.launcher.content": "rgba(0, 0, 0, 0.80)",
    "color.control.launcher.contentDisabled": "rgba(0, 0, 0, 0.30)",
    "color.control.launcher.contentHover": "#059cb0",
    "color.control.launcher.contentPressed": "#059cb0",
    "color.control.switch.thumb": "#ffffff",
    "color.control.switch.track": "rgba(0, 0, 0, 0.10)",
    "color.control.switch.trackChecked": "#059cb0",
    "color.field.background": "#ffffff",
    "color.field.backgroundHover": "#ffffff",
    "color.field.border": "rgba(0, 0, 0, 0.08)",
    "color.field.borderActive": "rgba(0, 0, 0, 0.20)",
    "color.field.borderFocus": "#858585",
    "color.field.borderHover": "rgba(0, 0, 0, 0.20)",
    "color.field.groupBackground": "rgba(0, 0, 0, 0.03)",
    "color.field.placeholder": "rgba(0, 0, 0, 0.40)",
    "color.focus.ring": "#6a6a6a",
    "color.identity.assistant.border": "color-mix(in srgb, #db2777 15%, transparent)",
    "color.identity.assistant.content": "#db2777",
    "color.identity.assistant.contentHover": "#be185d",
    "color.identity.assistant.surface": "color-mix(in srgb, #db2777 9%, transparent)",
    "color.identity.assistant.surfaceSubtle": "color-mix(in srgb, #db2777 5%, transparent)",
    "color.identity.globalSearch.newProject": "#3271d7",
    "color.identity.globalSearch.newSession": "#ec221f",
    "color.identity.globalSearch.openBrowser": "#ff8c00",
    "color.identity.globalSearch.openFiles": "#9e54ff",
    "color.identity.globalSearch.openProject": "#059cb0",
    "color.identity.globalSearch.openTerminal": "rgba(0, 0, 0, 0.80)",
    "color.identity.harness.creative": "#2e7eff",
    "color.identity.harness.minimal": "#b434ef",
    "color.identity.harness.standard": "#1aa73e",
    "color.identity.harness.ultimate": "#ff8c00",
    "color.keyHint.background": "rgba(0, 0, 0, 0.08)",
    "color.keyHint.content": "rgba(0, 0, 0, 0.60)",
    "color.link.default": "#059cb0",
    "color.link.hover": "#07879a",
    "color.numberBadge.background": "rgba(0, 0, 0, 0.08)",
    "color.overlay.scrim": "rgba(16, 26, 39, 0.20)",
    "color.scrollbar.thumb": "rgba(0, 0, 0, 0.20)",
    "color.scrollbar.thumbHover": "rgba(0, 0, 0, 0.30)",
    "color.selection.surface": "rgba(0, 0, 0, 0.08)",
    "color.status.danger.border": "rgba(236, 34, 31, 0.3)",
    "color.status.danger.content": "#bd1b19",
    "color.status.danger.emphasis": "#ec221f",
    "color.status.danger.surface": "rgba(236, 34, 31, 0.1)",
    "color.status.info.border": "rgba(46, 126, 255, 0.3)",
    "color.status.info.content": "#2360c2",
    "color.status.info.emphasis": "#2e7eff",
    "color.status.info.surface": "rgba(46, 126, 255, 0.1)",
    "color.status.success.border": "rgba(26, 167, 62, 0.3)",
    "color.status.success.content": "#12722a",
    "color.status.success.emphasis": "#1aa73e",
    "color.status.success.surface": "rgba(26, 167, 62, 0.1)",
    "color.status.warning.border": "rgba(255, 140, 0, 0.3)",
    "color.status.warning.content": "#8a4c00",
    "color.status.warning.emphasis": "#ff8c00",
    "color.status.warning.surface": "rgba(255, 140, 0, 0.1)",
    "color.surface.canvas": "#fdfdfd",
    "color.surface.chrome": "#f8f8f9",
    "color.surface.panel": "#ffffff",
    "color.surface.raised": "#ffffff",
    "color.surface.scene": "#ffffff",
    "color.surface.subtle": "rgba(16, 26, 39, 0.03)",
    "color.surface.tertiary": "#f7f7f7",
    "color.surface.workbench": "#f3f3f5",
    "component.button.content": "rgba(0, 0, 0, 0.80)",
    "component.button.fillBackground": "rgba(0, 0, 0, 0.08)",
    "component.button.fillBackgroundHover": "rgba(0, 0, 0, 0.08)",
    "component.button.fillBackgroundPressed": "rgba(0, 0, 0, 0.08)",
    "component.button.outlineBorder": "rgba(0, 0, 0, 0.08)",
    "component.button.outlineBorderInteractive": "rgba(0, 0, 0, 0.08)",
    "component.button.primaryBackground": "rgba(0, 0, 0, 0.80)",
    "component.button.primaryBackgroundHover": "rgba(0, 0, 0, 0.60)",
    "component.button.primaryBackgroundPressed": "rgba(0, 0, 0, 0.90)",
    "component.button.primaryContentDisabled": "rgba(0, 0, 0, 0.20)",
    "component.button.textContent": "#059cb0",
    "component.button.textContentDisabled": "rgba(5, 156, 176, 0.30)",
    "component.button.textContentHover": "#059cb0",
    "component.empty.media": "color-mix(in srgb, #6a6a6a 35%, #f7f7f7)",
    "effect.blur.base": "blur(8px) saturate(1.05)",
    "effect.blur.medium": "blur(12px) saturate(1.2)",
    "effect.blur.subtle": "blur(4px) saturate(1.02)",
    "opacity.disabled": 0.55,
    "opacity.focus": 0.9,
    "opacity.hover": 0.75,
    "opacity.muted": 0.75,
    "shadow.accentGlow": "0 12px 32px color-mix(in srgb, #059cb0 25%, transparent), 0 6px 16px color-mix(in srgb, #059cb0 18%, transparent), 0 3px 8px rgba(0, 0, 0, 0.12)",
    "shadow.base": "0 4px 8px rgba(16, 26, 39, 0.07)",
    "shadow.composer": "0 2px 12px rgba(0, 0, 0, 0.08)",
    "shadow.innerHighlight": "inset 0 1px 0 rgba(255, 255, 255, 0.08)",
    "shadow.innerHighlightHover": "inset 0 1px 0 rgba(255, 255, 255, 0.24)",
    "shadow.lg": "0 8px 16px rgba(16, 26, 39, 0.09)",
    "shadow.menu": "0 4px 20px rgba(0, 0, 0, 0.12)",
    "shadow.overlay": "0 4px 20px rgba(0, 0, 0, 0.12)",
    "shadow.raised": "0 2px 4px rgba(16, 26, 39, 0.055)",
    "shadow.sm": "0 2px 4px rgba(16, 26, 39, 0.055)",
    "shadow.xl": "0 12px 24px rgba(16, 26, 39, 0.11)",
    "shadow.xs": "0 1px 2px rgba(16, 26, 39, 0.04)"
  }
});
export const themeCssVariables = Object.freeze({
  "color.accent.border": "--openbitfun-color-accent-border",
  "color.accent.borderSubtle": "--openbitfun-color-accent-border-subtle",
  "color.accent.default": "--openbitfun-color-accent-default",
  "color.accent.disabled": "--openbitfun-color-accent-disabled",
  "color.accent.hover": "--openbitfun-color-accent-hover",
  "color.accent.secondary": "--openbitfun-color-accent-secondary",
  "color.accent.secondaryBorder": "--openbitfun-color-accent-secondary-border",
  "color.accent.secondaryHover": "--openbitfun-color-accent-secondary-hover",
  "color.accent.secondarySurface": "--openbitfun-color-accent-secondary-surface",
  "color.accent.secondarySurfaceStrong": "--openbitfun-color-accent-secondary-surface-strong",
  "color.accent.surface": "--openbitfun-color-accent-surface",
  "color.accent.surfaceStrong": "--openbitfun-color-accent-surface-strong",
  "color.accent.surfaceSubtle": "--openbitfun-color-accent-surface-subtle",
  "color.action.neutral.border": "--openbitfun-color-action-neutral-border",
  "color.action.neutral.content": "--openbitfun-color-action-neutral-content",
  "color.action.neutral.contentDisabled": "--openbitfun-color-action-neutral-content-disabled",
  "color.action.neutral.fillBorder": "--openbitfun-color-action-neutral-fill-border",
  "color.action.neutral.surface": "--openbitfun-color-action-neutral-surface",
  "color.action.neutral.surfaceHover": "--openbitfun-color-action-neutral-surface-hover",
  "color.action.neutral.surfacePressed": "--openbitfun-color-action-neutral-surface-pressed",
  "color.action.primary.background": "--openbitfun-color-action-primary-background",
  "color.action.primary.content": "--openbitfun-color-action-primary-content",
  "color.action.primary.hover": "--openbitfun-color-action-primary-hover",
  "color.action.primary.pressed": "--openbitfun-color-action-primary-pressed",
  "color.action.quiet.content": "--openbitfun-color-action-quiet-content",
  "color.action.quiet.hover": "--openbitfun-color-action-quiet-hover",
  "color.action.quiet.pressed": "--openbitfun-color-action-quiet-pressed",
  "color.action.secondary.background": "--openbitfun-color-action-secondary-background",
  "color.action.secondary.content": "--openbitfun-color-action-secondary-content",
  "color.action.secondary.hover": "--openbitfun-color-action-secondary-hover",
  "color.action.secondary.pressed": "--openbitfun-color-action-secondary-pressed",
  "color.actionCard.background": "--openbitfun-color-action-card-background",
  "color.border.default": "--openbitfun-color-border-default",
  "color.border.strong": "--openbitfun-color-border-strong",
  "color.border.subtle": "--openbitfun-color-border-subtle",
  "color.codeChange.added": "--openbitfun-color-code-change-added",
  "color.codeChange.removed": "--openbitfun-color-code-change-removed",
  "color.codeDiff.added.gutter": "--openbitfun-color-code-diff-added-gutter",
  "color.codeDiff.added.line": "--openbitfun-color-code-diff-added-line",
  "color.codeDiff.added.marker": "--openbitfun-color-code-diff-added-marker",
  "color.codeDiff.added.word": "--openbitfun-color-code-diff-added-word",
  "color.codeDiff.foreground": "--openbitfun-color-code-diff-foreground",
  "color.codeDiff.gutterBorder": "--openbitfun-color-code-diff-gutter-border",
  "color.codeDiff.lineNumber": "--openbitfun-color-code-diff-line-number",
  "color.codeDiff.removed.gutter": "--openbitfun-color-code-diff-removed-gutter",
  "color.codeDiff.removed.line": "--openbitfun-color-code-diff-removed-line",
  "color.codeDiff.removed.marker": "--openbitfun-color-code-diff-removed-marker",
  "color.codeDiff.removed.word": "--openbitfun-color-code-diff-removed-word",
  "color.codeDiff.syntax.comment": "--openbitfun-color-code-diff-syntax-comment",
  "color.codeDiff.syntax.declaration": "--openbitfun-color-code-diff-syntax-declaration",
  "color.codeDiff.syntax.function": "--openbitfun-color-code-diff-syntax-function",
  "color.codeDiff.syntax.keyword": "--openbitfun-color-code-diff-syntax-keyword",
  "color.codeDiff.syntax.number": "--openbitfun-color-code-diff-syntax-number",
  "color.codeDiff.syntax.operator": "--openbitfun-color-code-diff-syntax-operator",
  "color.codeDiff.syntax.property": "--openbitfun-color-code-diff-syntax-property",
  "color.codeDiff.syntax.punctuation": "--openbitfun-color-code-diff-syntax-punctuation",
  "color.codeDiff.syntax.string": "--openbitfun-color-code-diff-syntax-string",
  "color.codeDiff.syntax.variable": "--openbitfun-color-code-diff-syntax-variable",
  "color.composer.border": "--openbitfun-color-composer-border",
  "color.composer.contextBackground": "--openbitfun-color-composer-context-background",
  "color.content.caption": "--openbitfun-color-content-caption",
  "color.content.disabled": "--openbitfun-color-content-disabled",
  "color.content.inverse": "--openbitfun-color-content-inverse",
  "color.content.muted": "--openbitfun-color-content-muted",
  "color.content.onDark": "--openbitfun-color-content-on-dark",
  "color.content.onLight": "--openbitfun-color-content-on-light",
  "color.content.primary": "--openbitfun-color-content-primary",
  "color.content.requiredIndicator": "--openbitfun-color-content-required-indicator",
  "color.content.secondary": "--openbitfun-color-content-secondary",
  "color.control.highlight.background": "--openbitfun-color-control-highlight-background",
  "color.control.highlight.content": "--openbitfun-color-control-highlight-content",
  "color.control.launcher.background": "--openbitfun-color-control-launcher-background",
  "color.control.launcher.backgroundHover": "--openbitfun-color-control-launcher-background-hover",
  "color.control.launcher.backgroundPressed": "--openbitfun-color-control-launcher-background-pressed",
  "color.control.launcher.content": "--openbitfun-color-control-launcher-content",
  "color.control.launcher.contentDisabled": "--openbitfun-color-control-launcher-content-disabled",
  "color.control.launcher.contentHover": "--openbitfun-color-control-launcher-content-hover",
  "color.control.launcher.contentPressed": "--openbitfun-color-control-launcher-content-pressed",
  "color.control.switch.thumb": "--openbitfun-color-control-switch-thumb",
  "color.control.switch.track": "--openbitfun-color-control-switch-track",
  "color.control.switch.trackChecked": "--openbitfun-color-control-switch-track-checked",
  "color.field.background": "--openbitfun-color-field-background",
  "color.field.backgroundHover": "--openbitfun-color-field-background-hover",
  "color.field.border": "--openbitfun-color-field-border",
  "color.field.borderActive": "--openbitfun-color-field-border-active",
  "color.field.borderFocus": "--openbitfun-color-field-border-focus",
  "color.field.borderHover": "--openbitfun-color-field-border-hover",
  "color.field.groupBackground": "--openbitfun-color-field-group-background",
  "color.field.placeholder": "--openbitfun-color-field-placeholder",
  "color.focus.ring": "--openbitfun-color-focus-ring",
  "color.identity.assistant.border": "--openbitfun-color-identity-assistant-border",
  "color.identity.assistant.content": "--openbitfun-color-identity-assistant-content",
  "color.identity.assistant.contentHover": "--openbitfun-color-identity-assistant-content-hover",
  "color.identity.assistant.surface": "--openbitfun-color-identity-assistant-surface",
  "color.identity.assistant.surfaceSubtle": "--openbitfun-color-identity-assistant-surface-subtle",
  "color.identity.globalSearch.newProject": "--openbitfun-color-identity-global-search-new-project",
  "color.identity.globalSearch.newSession": "--openbitfun-color-identity-global-search-new-session",
  "color.identity.globalSearch.openBrowser": "--openbitfun-color-identity-global-search-open-browser",
  "color.identity.globalSearch.openFiles": "--openbitfun-color-identity-global-search-open-files",
  "color.identity.globalSearch.openProject": "--openbitfun-color-identity-global-search-open-project",
  "color.identity.globalSearch.openTerminal": "--openbitfun-color-identity-global-search-open-terminal",
  "color.identity.harness.creative": "--openbitfun-color-identity-harness-creative",
  "color.identity.harness.minimal": "--openbitfun-color-identity-harness-minimal",
  "color.identity.harness.standard": "--openbitfun-color-identity-harness-standard",
  "color.identity.harness.ultimate": "--openbitfun-color-identity-harness-ultimate",
  "color.keyHint.background": "--openbitfun-color-key-hint-background",
  "color.keyHint.content": "--openbitfun-color-key-hint-content",
  "color.link.default": "--openbitfun-color-link-default",
  "color.link.hover": "--openbitfun-color-link-hover",
  "color.numberBadge.background": "--openbitfun-color-number-badge-background",
  "color.overlay.scrim": "--openbitfun-color-overlay-scrim",
  "color.scrollbar.thumb": "--openbitfun-color-scrollbar-thumb",
  "color.scrollbar.thumbHover": "--openbitfun-color-scrollbar-thumb-hover",
  "color.selection.surface": "--openbitfun-color-selection-surface",
  "color.status.danger.border": "--openbitfun-color-status-danger-border",
  "color.status.danger.content": "--openbitfun-color-status-danger-content",
  "color.status.danger.emphasis": "--openbitfun-color-status-danger-emphasis",
  "color.status.danger.surface": "--openbitfun-color-status-danger-surface",
  "color.status.info.border": "--openbitfun-color-status-info-border",
  "color.status.info.content": "--openbitfun-color-status-info-content",
  "color.status.info.emphasis": "--openbitfun-color-status-info-emphasis",
  "color.status.info.surface": "--openbitfun-color-status-info-surface",
  "color.status.success.border": "--openbitfun-color-status-success-border",
  "color.status.success.content": "--openbitfun-color-status-success-content",
  "color.status.success.emphasis": "--openbitfun-color-status-success-emphasis",
  "color.status.success.surface": "--openbitfun-color-status-success-surface",
  "color.status.warning.border": "--openbitfun-color-status-warning-border",
  "color.status.warning.content": "--openbitfun-color-status-warning-content",
  "color.status.warning.emphasis": "--openbitfun-color-status-warning-emphasis",
  "color.status.warning.surface": "--openbitfun-color-status-warning-surface",
  "color.surface.canvas": "--openbitfun-color-surface-canvas",
  "color.surface.chrome": "--openbitfun-color-surface-chrome",
  "color.surface.panel": "--openbitfun-color-surface-panel",
  "color.surface.raised": "--openbitfun-color-surface-raised",
  "color.surface.scene": "--openbitfun-color-surface-scene",
  "color.surface.subtle": "--openbitfun-color-surface-subtle",
  "color.surface.tertiary": "--openbitfun-color-surface-tertiary",
  "color.surface.workbench": "--openbitfun-color-surface-workbench",
  "component.button.content": "--openbitfun-component-button-content",
  "component.button.fillBackground": "--openbitfun-component-button-fill-background",
  "component.button.fillBackgroundHover": "--openbitfun-component-button-fill-background-hover",
  "component.button.fillBackgroundPressed": "--openbitfun-component-button-fill-background-pressed",
  "component.button.outlineBorder": "--openbitfun-component-button-outline-border",
  "component.button.outlineBorderInteractive": "--openbitfun-component-button-outline-border-interactive",
  "component.button.primaryBackground": "--openbitfun-component-button-primary-background",
  "component.button.primaryBackgroundHover": "--openbitfun-component-button-primary-background-hover",
  "component.button.primaryBackgroundPressed": "--openbitfun-component-button-primary-background-pressed",
  "component.button.primaryContentDisabled": "--openbitfun-component-button-primary-content-disabled",
  "component.button.textContent": "--openbitfun-component-button-text-content",
  "component.button.textContentDisabled": "--openbitfun-component-button-text-content-disabled",
  "component.button.textContentHover": "--openbitfun-component-button-text-content-hover",
  "component.empty.media": "--openbitfun-component-empty-media",
  "effect.blur.base": "--openbitfun-effect-blur-base",
  "effect.blur.medium": "--openbitfun-effect-blur-medium",
  "effect.blur.subtle": "--openbitfun-effect-blur-subtle",
  "opacity.disabled": "--openbitfun-opacity-disabled",
  "opacity.focus": "--openbitfun-opacity-focus",
  "opacity.hover": "--openbitfun-opacity-hover",
  "opacity.muted": "--openbitfun-opacity-muted",
  "shadow.accentGlow": "--openbitfun-shadow-accent-glow",
  "shadow.base": "--openbitfun-shadow-base",
  "shadow.composer": "--openbitfun-shadow-composer",
  "shadow.innerHighlight": "--openbitfun-shadow-inner-highlight",
  "shadow.innerHighlightHover": "--openbitfun-shadow-inner-highlight-hover",
  "shadow.lg": "--openbitfun-shadow-lg",
  "shadow.menu": "--openbitfun-shadow-menu",
  "shadow.overlay": "--openbitfun-shadow-overlay",
  "shadow.raised": "--openbitfun-shadow-raised",
  "shadow.sm": "--openbitfun-shadow-sm",
  "shadow.xl": "--openbitfun-shadow-xl",
  "shadow.xs": "--openbitfun-shadow-xs"
});
export const themeModes = Object.freeze(["light","dark","highContrastLight","highContrastDark"]);
export const themeTokenCatalog = Object.freeze([
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-accent-border",
    "name": "color.accent.border",
    "type": "color",
    "values": {
      "light": "color-mix(in srgb, #059cb0 40%, transparent)",
      "dark": "color-mix(in srgb, #60a5fa 40%, transparent)",
      "highContrastLight": "color-mix(in srgb, #059cb0 40%, transparent)",
      "highContrastDark": "color-mix(in srgb, #60a5fa 40%, transparent)"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-accent-border-subtle",
    "name": "color.accent.borderSubtle",
    "type": "color",
    "values": {
      "light": "color-mix(in srgb, #059cb0 25%, transparent)",
      "dark": "color-mix(in srgb, #60a5fa 25%, transparent)",
      "highContrastLight": "color-mix(in srgb, #059cb0 25%, transparent)",
      "highContrastDark": "color-mix(in srgb, #60a5fa 25%, transparent)"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-accent-default",
    "name": "color.accent.default",
    "type": "color",
    "values": {
      "light": "#059cb0",
      "dark": "#60a5fa",
      "highContrastLight": "#059cb0",
      "highContrastDark": "#60a5fa"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-accent-disabled",
    "name": "color.accent.disabled",
    "type": "color",
    "values": {
      "light": "rgba(5, 156, 176, 0.30)",
      "dark": "rgba(96, 165, 250, 0.30)",
      "highContrastLight": "rgba(5, 156, 176, 0.30)",
      "highContrastDark": "rgba(96, 165, 250, 0.30)"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-accent-hover",
    "name": "color.accent.hover",
    "type": "color",
    "values": {
      "light": "#059cb0",
      "dark": "#3b82f6",
      "highContrastLight": "#059cb0",
      "highContrastDark": "#3b82f6"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-accent-secondary",
    "description": "Secondary product emphasis for paired accents and identity gradients.",
    "name": "color.accent.secondary",
    "type": "color",
    "values": {
      "light": "#7c6b99",
      "dark": "#8b5cf6",
      "highContrastLight": "#7c6b99",
      "highContrastDark": "#8b5cf6"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-accent-secondary-border",
    "name": "color.accent.secondaryBorder",
    "type": "color",
    "values": {
      "light": "color-mix(in srgb, #7c6b99 25%, transparent)",
      "dark": "color-mix(in srgb, #8b5cf6 25%, transparent)",
      "highContrastLight": "color-mix(in srgb, #7c6b99 25%, transparent)",
      "highContrastDark": "color-mix(in srgb, #8b5cf6 25%, transparent)"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-accent-secondary-hover",
    "name": "color.accent.secondaryHover",
    "type": "color",
    "values": {
      "light": "#655680",
      "dark": "#7c6b99",
      "highContrastLight": "#655680",
      "highContrastDark": "#7c6b99"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-accent-secondary-surface",
    "name": "color.accent.secondarySurface",
    "type": "color",
    "values": {
      "light": "color-mix(in srgb, #7c6b99 9%, transparent)",
      "dark": "color-mix(in srgb, #8b5cf6 9%, transparent)",
      "highContrastLight": "color-mix(in srgb, #7c6b99 9%, transparent)",
      "highContrastDark": "color-mix(in srgb, #8b5cf6 9%, transparent)"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-accent-secondary-surface-strong",
    "name": "color.accent.secondarySurfaceStrong",
    "type": "color",
    "values": {
      "light": "color-mix(in srgb, #7c6b99 15%, transparent)",
      "dark": "color-mix(in srgb, #8b5cf6 15%, transparent)",
      "highContrastLight": "color-mix(in srgb, #7c6b99 15%, transparent)",
      "highContrastDark": "color-mix(in srgb, #8b5cf6 15%, transparent)"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-accent-surface",
    "name": "color.accent.surface",
    "type": "color",
    "values": {
      "light": "color-mix(in srgb, #059cb0 9%, transparent)",
      "dark": "color-mix(in srgb, #60a5fa 9%, transparent)",
      "highContrastLight": "color-mix(in srgb, #059cb0 9%, transparent)",
      "highContrastDark": "color-mix(in srgb, #60a5fa 9%, transparent)"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-accent-surface-strong",
    "name": "color.accent.surfaceStrong",
    "type": "color",
    "values": {
      "light": "color-mix(in srgb, #059cb0 15%, transparent)",
      "dark": "color-mix(in srgb, #60a5fa 15%, transparent)",
      "highContrastLight": "color-mix(in srgb, #059cb0 15%, transparent)",
      "highContrastDark": "color-mix(in srgb, #60a5fa 15%, transparent)"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-accent-surface-subtle",
    "name": "color.accent.surfaceSubtle",
    "type": "color",
    "values": {
      "light": "color-mix(in srgb, #059cb0 5%, transparent)",
      "dark": "color-mix(in srgb, #60a5fa 5%, transparent)",
      "highContrastLight": "color-mix(in srgb, #059cb0 5%, transparent)",
      "highContrastDark": "color-mix(in srgb, #60a5fa 5%, transparent)"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-action-neutral-border",
    "name": "color.action.neutral.border",
    "type": "color",
    "values": {
      "light": "rgba(0, 0, 0, 0.05)",
      "dark": "rgba(255, 255, 255, 0.18)",
      "highContrastLight": "#000000",
      "highContrastDark": "#ffffff"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-action-neutral-content",
    "name": "color.action.neutral.content",
    "type": "color",
    "values": {
      "light": "rgba(0, 0, 0, 0.80)",
      "dark": "#b0b0b0",
      "highContrastLight": "#000000",
      "highContrastDark": "#ffffff"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-action-neutral-content-disabled",
    "name": "color.action.neutral.contentDisabled",
    "type": "color",
    "values": {
      "light": "rgba(0, 0, 0, 0.30)",
      "dark": "#555555",
      "highContrastLight": "#343434",
      "highContrastDark": "#d0d0d0"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-action-neutral-fill-border",
    "name": "color.action.neutral.fillBorder",
    "type": "color",
    "values": {
      "light": "rgba(0, 0, 0, 0.05)",
      "dark": "rgba(255, 255, 255, 0.1)",
      "highContrastLight": "#000000",
      "highContrastDark": "#ffffff"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-action-neutral-surface",
    "name": "color.action.neutral.surface",
    "type": "color",
    "values": {
      "light": "rgba(0, 0, 0, 0.05)",
      "dark": "rgba(255, 255, 255, 0.1)",
      "highContrastLight": "#e6e6e6",
      "highContrastDark": "#343434"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-action-neutral-surface-hover",
    "name": "color.action.neutral.surfaceHover",
    "type": "color",
    "values": {
      "light": "rgba(0, 0, 0, 0.08)",
      "dark": "rgba(255, 255, 255, 0.12)",
      "highContrastLight": "#cccccc",
      "highContrastDark": "#505050"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-action-neutral-surface-pressed",
    "name": "color.action.neutral.surfacePressed",
    "type": "color",
    "values": {
      "light": "rgba(0, 0, 0, 0.10)",
      "dark": "rgba(255, 255, 255, 0.15)",
      "highContrastLight": "#b3b3b3",
      "highContrastDark": "#6b6b6b"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-action-primary-background",
    "name": "color.action.primary.background",
    "type": "color",
    "values": {
      "light": "#101a27",
      "dark": "rgba(255, 255, 255, 0.16)",
      "highContrastLight": "#000000",
      "highContrastDark": "#ffffff"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-action-primary-content",
    "name": "color.action.primary.content",
    "type": "color",
    "values": {
      "light": "#ffffff",
      "dark": "#f3f3f5",
      "highContrastLight": "#ffffff",
      "highContrastDark": "#000000"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-action-primary-hover",
    "name": "color.action.primary.hover",
    "type": "color",
    "values": {
      "light": "#1c1c1f",
      "dark": "rgba(255, 255, 255, 0.24)",
      "highContrastLight": "#262626",
      "highContrastDark": "#e6e6e6"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-action-primary-pressed",
    "name": "color.action.primary.pressed",
    "type": "color",
    "values": {
      "light": "#000000",
      "dark": "rgba(255, 255, 255, 0.2)",
      "highContrastLight": "#000000",
      "highContrastDark": "#ffffff"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-action-quiet-content",
    "name": "color.action.quiet.content",
    "type": "color",
    "values": {
      "light": "rgba(0, 0, 0, 0.60)",
      "dark": "#b0b0b0",
      "highContrastLight": "#161616",
      "highContrastDark": "#b0b0b0"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-action-quiet-hover",
    "name": "color.action.quiet.hover",
    "type": "color",
    "values": {
      "light": "#f3f3f5",
      "dark": "rgba(255, 255, 255, 0.06)",
      "highContrastLight": "#f3f3f5",
      "highContrastDark": "rgba(255, 255, 255, 0.06)"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-action-quiet-pressed",
    "name": "color.action.quiet.pressed",
    "type": "color",
    "values": {
      "light": "rgba(16, 26, 39, 0.09)",
      "dark": "rgba(255, 255, 255, 0.1)",
      "highContrastLight": "rgba(16, 26, 39, 0.09)",
      "highContrastDark": "rgba(255, 255, 255, 0.1)"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-action-secondary-background",
    "name": "color.action.secondary.background",
    "type": "color",
    "values": {
      "light": "#f3f3f5",
      "dark": "rgba(255, 255, 255, 0.06)",
      "highContrastLight": "#f3f3f5",
      "highContrastDark": "rgba(255, 255, 255, 0.06)"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-action-secondary-content",
    "name": "color.action.secondary.content",
    "type": "color",
    "values": {
      "light": "rgba(0, 0, 0, 0.80)",
      "dark": "#e8e8e8",
      "highContrastLight": "#000000",
      "highContrastDark": "#e8e8e8"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-action-secondary-hover",
    "name": "color.action.secondary.hover",
    "type": "color",
    "values": {
      "light": "rgba(16, 26, 39, 0.09)",
      "dark": "rgba(255, 255, 255, 0.1)",
      "highContrastLight": "rgba(16, 26, 39, 0.09)",
      "highContrastDark": "rgba(255, 255, 255, 0.1)"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-action-secondary-pressed",
    "name": "color.action.secondary.pressed",
    "type": "color",
    "values": {
      "light": "rgba(16, 26, 39, 0.13)",
      "dark": "rgba(255, 255, 255, 0.12)",
      "highContrastLight": "rgba(16, 26, 39, 0.13)",
      "highContrastDark": "rgba(255, 255, 255, 0.12)"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-action-card-background",
    "name": "color.actionCard.background",
    "type": "color",
    "values": {
      "light": "rgba(0, 0, 0, 0.03)",
      "dark": "rgba(255, 255, 255, 0.1)",
      "highContrastLight": "#e6e6e6",
      "highContrastDark": "#343434"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-border-default",
    "name": "color.border.default",
    "type": "color",
    "values": {
      "light": "rgba(16, 26, 39, 0.15)",
      "dark": "rgba(255, 255, 255, 0.18)",
      "highContrastLight": "#3b3b3b",
      "highContrastDark": "#b5b5b5"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-border-strong",
    "name": "color.border.strong",
    "type": "color",
    "values": {
      "light": "rgba(16, 26, 39, 0.34)",
      "dark": "rgba(255, 255, 255, 0.3)",
      "highContrastLight": "#000000",
      "highContrastDark": "#ffffff"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-border-subtle",
    "name": "color.border.subtle",
    "type": "color",
    "values": {
      "light": "rgba(16, 26, 39, 0.08)",
      "dark": "rgba(255, 255, 255, 0.12)",
      "highContrastLight": "#707070",
      "highContrastDark": "#8a8a8a"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-code-change-added",
    "name": "color.codeChange.added",
    "type": "color",
    "values": {
      "light": "#1aa73e",
      "dark": "#1aa73e",
      "highContrastLight": "#1aa73e",
      "highContrastDark": "#1aa73e"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-code-change-removed",
    "name": "color.codeChange.removed",
    "type": "color",
    "values": {
      "light": "#ec221f",
      "dark": "#ec221f",
      "highContrastLight": "#ec221f",
      "highContrastDark": "#ec221f"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-code-diff-added-gutter",
    "name": "color.codeDiff.added.gutter",
    "type": "color",
    "values": {
      "light": "#effbf8",
      "dark": "color-mix(in srgb, #00cab1 5%, #1c1c1f)",
      "highContrastLight": "#effbf8",
      "highContrastDark": "color-mix(in srgb, #00cab1 5%, #090909)"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-code-diff-added-line",
    "name": "color.codeDiff.added.line",
    "type": "color",
    "values": {
      "light": "#eaf9f5",
      "dark": "color-mix(in srgb, #00cab1 8%, #1c1c1f)",
      "highContrastLight": "#eaf9f5",
      "highContrastDark": "color-mix(in srgb, #00cab1 8%, #090909)"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-code-diff-added-marker",
    "name": "color.codeDiff.added.marker",
    "type": "color",
    "values": {
      "light": "#00cab1",
      "dark": "#00cab1",
      "highContrastLight": "#00cab1",
      "highContrastDark": "#00cab1"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-code-diff-added-word",
    "name": "color.codeDiff.added.word",
    "type": "color",
    "values": {
      "light": "#c7f2eb",
      "dark": "color-mix(in srgb, #00cab1 22%, #1c1c1f)",
      "highContrastLight": "#c7f2eb",
      "highContrastDark": "color-mix(in srgb, #00cab1 22%, #090909)"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-code-diff-foreground",
    "name": "color.codeDiff.foreground",
    "type": "color",
    "values": {
      "light": "#090909",
      "dark": "#e8e8e8",
      "highContrastLight": "#090909",
      "highContrastDark": "#ffffff"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-code-diff-gutter-border",
    "name": "color.codeDiff.gutterBorder",
    "type": "color",
    "values": {
      "light": "#ffffff",
      "dark": "#1c1c1f",
      "highContrastLight": "#ffffff",
      "highContrastDark": "#090909"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-code-diff-line-number",
    "name": "color.codeDiff.lineNumber",
    "type": "color",
    "values": {
      "light": "#555555",
      "dark": "#b0b0b0",
      "highContrastLight": "#555555",
      "highContrastDark": "#b0b0b0"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-code-diff-removed-gutter",
    "name": "color.codeDiff.removed.gutter",
    "type": "color",
    "values": {
      "light": "#ffefec",
      "dark": "color-mix(in srgb, #ff2e3f 5%, #1c1c1f)",
      "highContrastLight": "#ffefec",
      "highContrastDark": "color-mix(in srgb, #ff2e3f 5%, #090909)"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-code-diff-removed-line",
    "name": "color.codeDiff.removed.line",
    "type": "color",
    "values": {
      "light": "#ffeae6",
      "dark": "color-mix(in srgb, #ff2e3f 8%, #1c1c1f)",
      "highContrastLight": "#ffeae6",
      "highContrastDark": "color-mix(in srgb, #ff2e3f 8%, #090909)"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-code-diff-removed-marker",
    "name": "color.codeDiff.removed.marker",
    "type": "color",
    "values": {
      "light": "#ff2e3f",
      "dark": "#ff2e3f",
      "highContrastLight": "#ff2e3f",
      "highContrastDark": "#ff2e3f"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-code-diff-removed-word",
    "name": "color.codeDiff.removed.word",
    "type": "color",
    "values": {
      "light": "#ffcecd",
      "dark": "color-mix(in srgb, #ff2e3f 22%, #1c1c1f)",
      "highContrastLight": "#ffcecd",
      "highContrastDark": "color-mix(in srgb, #ff2e3f 22%, #090909)"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-code-diff-syntax-comment",
    "name": "color.codeDiff.syntax.comment",
    "type": "color",
    "values": {
      "light": "#858585",
      "dark": "#9a9a9a",
      "highContrastLight": "#858585",
      "highContrastDark": "#9a9a9a"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-code-diff-syntax-declaration",
    "name": "color.codeDiff.syntax.declaration",
    "type": "color",
    "values": {
      "light": "#c635e4",
      "dark": "#d568ea",
      "highContrastLight": "#c635e4",
      "highContrastDark": "#d568ea"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-code-diff-syntax-function",
    "name": "color.codeDiff.syntax.function",
    "type": "color",
    "values": {
      "light": "#7b43f8",
      "dark": "#9d6afb",
      "highContrastLight": "#7b43f8",
      "highContrastDark": "#9d6afb"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-code-diff-syntax-keyword",
    "name": "color.codeDiff.syntax.keyword",
    "type": "color",
    "values": {
      "light": "#fc2b73",
      "dark": "#ff678d",
      "highContrastLight": "#fc2b73",
      "highContrastDark": "#ff678d"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-code-diff-syntax-number",
    "name": "color.codeDiff.syntax.number",
    "type": "color",
    "values": {
      "light": "#1ca1c7",
      "dark": "#7cdee9",
      "highContrastLight": "#1ca1c7",
      "highContrastDark": "#7cdee9"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-code-diff-syntax-operator",
    "name": "color.codeDiff.syntax.operator",
    "type": "color",
    "values": {
      "light": "#08c0ef",
      "dark": "#08c0ef",
      "highContrastLight": "#08c0ef",
      "highContrastDark": "#08c0ef"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-code-diff-syntax-property",
    "name": "color.codeDiff.syntax.property",
    "type": "color",
    "values": {
      "light": "#d47628",
      "dark": "#ffa359",
      "highContrastLight": "#d47628",
      "highContrastDark": "#ffa359"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-code-diff-syntax-punctuation",
    "name": "color.codeDiff.syntax.punctuation",
    "type": "color",
    "values": {
      "light": "#77777a",
      "dark": "#b0b0b0",
      "highContrastLight": "#77777a",
      "highContrastDark": "#b0b0b0"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-code-diff-syntax-string",
    "name": "color.codeDiff.syntax.string",
    "type": "color",
    "values": {
      "light": "#199f43",
      "dark": "#34d399",
      "highContrastLight": "#199f43",
      "highContrastDark": "#34d399"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-code-diff-syntax-variable",
    "name": "color.codeDiff.syntax.variable",
    "type": "color",
    "values": {
      "light": "#d5a910",
      "dark": "#ffcc00",
      "highContrastLight": "#d5a910",
      "highContrastDark": "#ffcc00"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-composer-border",
    "name": "color.composer.border",
    "type": "color",
    "values": {
      "light": "rgba(0, 0, 0, 0.08)",
      "dark": "rgba(255, 255, 255, 0.18)",
      "highContrastLight": "#3b3b3b",
      "highContrastDark": "#b5b5b5"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-composer-context-background",
    "name": "color.composer.contextBackground",
    "type": "color",
    "values": {
      "light": "rgba(0, 0, 0, 0.03)",
      "dark": "rgba(255, 255, 255, 0.06)",
      "highContrastLight": "rgba(16, 26, 39, 0.03)",
      "highContrastDark": "rgba(255, 255, 255, 0.06)"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-content-caption",
    "description": "Menu and navigation group captions; carries final opacity without attenuating primary text again.",
    "name": "color.content.caption",
    "type": "color",
    "values": {
      "light": "rgba(0, 0, 0, 0.40)",
      "dark": "#858585",
      "highContrastLight": "#343434",
      "highContrastDark": "#d0d0d0"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-content-disabled",
    "name": "color.content.disabled",
    "type": "color",
    "values": {
      "light": "rgba(0, 0, 0, 0.30)",
      "dark": "#555555",
      "highContrastLight": "rgba(0, 0, 0, 0.30)",
      "highContrastDark": "#555555"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-content-inverse",
    "name": "color.content.inverse",
    "type": "color",
    "values": {
      "light": "#ffffff",
      "dark": "#0e0e10",
      "highContrastLight": "#ffffff",
      "highContrastDark": "#0e0e10"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-content-muted",
    "name": "color.content.muted",
    "type": "color",
    "values": {
      "light": "#6a6a6a",
      "dark": "#858585",
      "highContrastLight": "#343434",
      "highContrastDark": "#d0d0d0"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-content-on-dark",
    "description": "Content that must remain legible on a known dark or image-backed surface.",
    "name": "color.content.onDark",
    "type": "color",
    "values": {
      "light": "#ffffff",
      "dark": "#ffffff",
      "highContrastLight": "#ffffff",
      "highContrastDark": "#ffffff"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-content-on-light",
    "description": "Content that must remain legible on a known light surface.",
    "name": "color.content.onLight",
    "type": "color",
    "values": {
      "light": "#000000",
      "dark": "#000000",
      "highContrastLight": "#000000",
      "highContrastDark": "#000000"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-content-primary",
    "name": "color.content.primary",
    "type": "color",
    "values": {
      "light": "rgba(0, 0, 0, 0.80)",
      "dark": "#e8e8e8",
      "highContrastLight": "#000000",
      "highContrastDark": "#ffffff"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-content-required-indicator",
    "description": "Required-field marker content aligned with the shared highlight color, distinct from validation danger.",
    "name": "color.content.requiredIndicator",
    "type": "color",
    "values": {
      "light": "#059cb0",
      "dark": "#059cb0",
      "highContrastLight": "#005fcc",
      "highContrastDark": "#ffcc00"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-content-secondary",
    "name": "color.content.secondary",
    "type": "color",
    "values": {
      "light": "rgba(0, 0, 0, 0.60)",
      "dark": "#b0b0b0",
      "highContrastLight": "#161616",
      "highContrastDark": "#f0f0f0"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-control-highlight-background",
    "name": "color.control.highlight.background",
    "type": "color",
    "values": {
      "light": "#059cb0",
      "dark": "#059cb0",
      "highContrastLight": "#005fcc",
      "highContrastDark": "#ffcc00"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-control-highlight-content",
    "name": "color.control.highlight.content",
    "type": "color",
    "values": {
      "light": "#000000",
      "dark": "#000000",
      "highContrastLight": "#ffffff",
      "highContrastDark": "#000000"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-control-launcher-background",
    "name": "color.control.launcher.background",
    "type": "color",
    "values": {
      "light": "rgba(0, 0, 0, 0.08)",
      "dark": "rgba(255, 255, 255, 0.15)",
      "highContrastLight": "#cccccc",
      "highContrastDark": "#6b6b6b"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-control-launcher-background-hover",
    "name": "color.control.launcher.backgroundHover",
    "type": "color",
    "values": {
      "light": "color-mix(in srgb, #059cb0 20%, transparent)",
      "dark": "color-mix(in srgb, #059cb0 20%, transparent)",
      "highContrastLight": "color-mix(in srgb, #005fcc 20%, transparent)",
      "highContrastDark": "color-mix(in srgb, #ffcc00 20%, transparent)"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-control-launcher-background-pressed",
    "name": "color.control.launcher.backgroundPressed",
    "type": "color",
    "values": {
      "light": "color-mix(in srgb, #059cb0 30%, transparent)",
      "dark": "color-mix(in srgb, #059cb0 30%, transparent)",
      "highContrastLight": "color-mix(in srgb, #005fcc 30%, transparent)",
      "highContrastDark": "color-mix(in srgb, #ffcc00 30%, transparent)"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-control-launcher-content",
    "name": "color.control.launcher.content",
    "type": "color",
    "values": {
      "light": "rgba(0, 0, 0, 0.80)",
      "dark": "#b0b0b0",
      "highContrastLight": "#000000",
      "highContrastDark": "#ffffff"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-control-launcher-content-disabled",
    "name": "color.control.launcher.contentDisabled",
    "type": "color",
    "values": {
      "light": "rgba(0, 0, 0, 0.30)",
      "dark": "#555555",
      "highContrastLight": "#343434",
      "highContrastDark": "#d0d0d0"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-control-launcher-content-hover",
    "name": "color.control.launcher.contentHover",
    "type": "color",
    "values": {
      "light": "#059cb0",
      "dark": "#059cb0",
      "highContrastLight": "#005fcc",
      "highContrastDark": "#ffcc00"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-control-launcher-content-pressed",
    "name": "color.control.launcher.contentPressed",
    "type": "color",
    "values": {
      "light": "#059cb0",
      "dark": "#059cb0",
      "highContrastLight": "#005fcc",
      "highContrastDark": "#ffcc00"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-control-switch-thumb",
    "name": "color.control.switch.thumb",
    "type": "color",
    "values": {
      "light": "#ffffff",
      "dark": "#ffffff",
      "highContrastLight": "#ffffff",
      "highContrastDark": "#000000"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-control-switch-track",
    "name": "color.control.switch.track",
    "type": "color",
    "values": {
      "light": "rgba(0, 0, 0, 0.10)",
      "dark": "#555555",
      "highContrastLight": "#3b3b3b",
      "highContrastDark": "#b5b5b5"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-control-switch-track-checked",
    "name": "color.control.switch.trackChecked",
    "type": "color",
    "values": {
      "light": "#059cb0",
      "dark": "#059cb0",
      "highContrastLight": "#005fcc",
      "highContrastDark": "#ffcc00"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-field-background",
    "name": "color.field.background",
    "type": "color",
    "values": {
      "light": "#ffffff",
      "dark": "#1c1c1f",
      "highContrastLight": "#ffffff",
      "highContrastDark": "#1c1c1f"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-field-background-hover",
    "name": "color.field.backgroundHover",
    "type": "color",
    "values": {
      "light": "#ffffff",
      "dark": "rgba(255, 255, 255, 0.06)",
      "highContrastLight": "#ffffff",
      "highContrastDark": "rgba(255, 255, 255, 0.06)"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-field-border",
    "name": "color.field.border",
    "type": "color",
    "values": {
      "light": "rgba(0, 0, 0, 0.08)",
      "dark": "rgba(255, 255, 255, 0.18)",
      "highContrastLight": "#3b3b3b",
      "highContrastDark": "#b5b5b5"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-field-border-active",
    "description": "Input and SearchField editing border, distinct from the stronger generic focus indicator used by other controls.",
    "name": "color.field.borderActive",
    "type": "color",
    "values": {
      "light": "rgba(0, 0, 0, 0.20)",
      "dark": "#858585",
      "highContrastLight": "#005fcc",
      "highContrastDark": "#ffcc00"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-field-border-focus",
    "name": "color.field.borderFocus",
    "type": "color",
    "values": {
      "light": "#858585",
      "dark": "#858585",
      "highContrastLight": "#005fcc",
      "highContrastDark": "#ffcc00"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-field-border-hover",
    "name": "color.field.borderHover",
    "type": "color",
    "values": {
      "light": "rgba(0, 0, 0, 0.20)",
      "dark": "rgba(255, 255, 255, 0.24)",
      "highContrastLight": "#000000",
      "highContrastDark": "#ffffff"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-field-group-background",
    "description": "Grouped form tint; independent of opaque tertiary containers and transient subtle feedback.",
    "name": "color.field.groupBackground",
    "type": "color",
    "values": {
      "light": "rgba(0, 0, 0, 0.03)",
      "dark": "#0e0e10",
      "highContrastLight": "#f7f7f7",
      "highContrastDark": "#000000"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-field-placeholder",
    "description": "Empty field hints and decorative adornments; distinct from general secondary prose.",
    "name": "color.field.placeholder",
    "type": "color",
    "values": {
      "light": "rgba(0, 0, 0, 0.40)",
      "dark": "#858585",
      "highContrastLight": "#343434",
      "highContrastDark": "#d0d0d0"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-focus-ring",
    "name": "color.focus.ring",
    "type": "color",
    "values": {
      "light": "#6a6a6a",
      "dark": "#60a5fa",
      "highContrastLight": "#005fcc",
      "highContrastDark": "#ffcc00"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-identity-assistant-border",
    "name": "color.identity.assistant.border",
    "type": "color",
    "values": {
      "light": "color-mix(in srgb, #db2777 15%, transparent)",
      "dark": "color-mix(in srgb, #ec4899 15%, transparent)",
      "highContrastLight": "color-mix(in srgb, #db2777 15%, transparent)",
      "highContrastDark": "color-mix(in srgb, #ec4899 15%, transparent)"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-identity-assistant-content",
    "name": "color.identity.assistant.content",
    "type": "color",
    "values": {
      "light": "#db2777",
      "dark": "#ec4899",
      "highContrastLight": "#db2777",
      "highContrastDark": "#ec4899"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-identity-assistant-content-hover",
    "name": "color.identity.assistant.contentHover",
    "type": "color",
    "values": {
      "light": "#be185d",
      "dark": "#f472b6",
      "highContrastLight": "#be185d",
      "highContrastDark": "#f472b6"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-identity-assistant-surface",
    "name": "color.identity.assistant.surface",
    "type": "color",
    "values": {
      "light": "color-mix(in srgb, #db2777 9%, transparent)",
      "dark": "color-mix(in srgb, #ec4899 9%, transparent)",
      "highContrastLight": "color-mix(in srgb, #db2777 9%, transparent)",
      "highContrastDark": "color-mix(in srgb, #ec4899 9%, transparent)"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-identity-assistant-surface-subtle",
    "name": "color.identity.assistant.surfaceSubtle",
    "type": "color",
    "values": {
      "light": "color-mix(in srgb, #db2777 5%, transparent)",
      "dark": "color-mix(in srgb, #ec4899 5%, transparent)",
      "highContrastLight": "color-mix(in srgb, #db2777 5%, transparent)",
      "highContrastDark": "color-mix(in srgb, #ec4899 5%, transparent)"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-identity-global-search-new-project",
    "name": "color.identity.globalSearch.newProject",
    "type": "color",
    "values": {
      "light": "#3271d7",
      "dark": "#3271d7",
      "highContrastLight": "#3271d7",
      "highContrastDark": "#3271d7"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-identity-global-search-new-session",
    "name": "color.identity.globalSearch.newSession",
    "type": "color",
    "values": {
      "light": "#ec221f",
      "dark": "#ec221f",
      "highContrastLight": "#ec221f",
      "highContrastDark": "#ec221f"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-identity-global-search-open-browser",
    "name": "color.identity.globalSearch.openBrowser",
    "type": "color",
    "values": {
      "light": "#ff8c00",
      "dark": "#ff8c00",
      "highContrastLight": "#ff8c00",
      "highContrastDark": "#ff8c00"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-identity-global-search-open-files",
    "name": "color.identity.globalSearch.openFiles",
    "type": "color",
    "values": {
      "light": "#9e54ff",
      "dark": "#9e54ff",
      "highContrastLight": "#9e54ff",
      "highContrastDark": "#9e54ff"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-identity-global-search-open-project",
    "name": "color.identity.globalSearch.openProject",
    "type": "color",
    "values": {
      "light": "#059cb0",
      "dark": "#059cb0",
      "highContrastLight": "#059cb0",
      "highContrastDark": "#059cb0"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-identity-global-search-open-terminal",
    "name": "color.identity.globalSearch.openTerminal",
    "type": "color",
    "values": {
      "light": "rgba(0, 0, 0, 0.80)",
      "dark": "#b0b0b0",
      "highContrastLight": "#000000",
      "highContrastDark": "#ffffff"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-identity-harness-creative",
    "name": "color.identity.harness.creative",
    "type": "color",
    "values": {
      "light": "#2e7eff",
      "dark": "#2e7eff",
      "highContrastLight": "#2e7eff",
      "highContrastDark": "#2e7eff"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-identity-harness-minimal",
    "name": "color.identity.harness.minimal",
    "type": "color",
    "values": {
      "light": "#b434ef",
      "dark": "#b434ef",
      "highContrastLight": "#b434ef",
      "highContrastDark": "#b434ef"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-identity-harness-standard",
    "name": "color.identity.harness.standard",
    "type": "color",
    "values": {
      "light": "#1aa73e",
      "dark": "#1aa73e",
      "highContrastLight": "#1aa73e",
      "highContrastDark": "#1aa73e"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-identity-harness-ultimate",
    "name": "color.identity.harness.ultimate",
    "type": "color",
    "values": {
      "light": "#ff8c00",
      "dark": "#ff8c00",
      "highContrastLight": "#ff8c00",
      "highContrastDark": "#ff8c00"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-key-hint-background",
    "name": "color.keyHint.background",
    "type": "color",
    "values": {
      "light": "rgba(0, 0, 0, 0.08)",
      "dark": "rgba(255, 255, 255, 0.1)",
      "highContrastLight": "#cccccc",
      "highContrastDark": "#343434"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-key-hint-content",
    "name": "color.keyHint.content",
    "type": "color",
    "values": {
      "light": "rgba(0, 0, 0, 0.60)",
      "dark": "#858585",
      "highContrastLight": "#343434",
      "highContrastDark": "#d0d0d0"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-link-default",
    "name": "color.link.default",
    "type": "color",
    "values": {
      "light": "#059cb0",
      "dark": "#059cb0",
      "highContrastLight": "#0a6d7d",
      "highContrastDark": "#7cdee9"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-link-hover",
    "name": "color.link.hover",
    "type": "color",
    "values": {
      "light": "#07879a",
      "dark": "#36c6d7",
      "highContrastLight": "#0d5764",
      "highContrastDark": "#b4eff5"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-number-badge-background",
    "name": "color.numberBadge.background",
    "type": "color",
    "values": {
      "light": "rgba(0, 0, 0, 0.08)",
      "dark": "rgba(255, 255, 255, 0.1)",
      "highContrastLight": "#e6e6e6",
      "highContrastDark": "#343434"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-overlay-scrim",
    "description": "Backdrop veil behind blocking modal surfaces.",
    "name": "color.overlay.scrim",
    "type": "color",
    "values": {
      "light": "rgba(16, 26, 39, 0.20)",
      "dark": "rgba(0, 0, 0, 0.56)",
      "highContrastLight": "rgba(16, 26, 39, 0.20)",
      "highContrastDark": "rgba(0, 0, 0, 0.56)"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-scrollbar-thumb",
    "name": "color.scrollbar.thumb",
    "type": "color",
    "values": {
      "light": "rgba(0, 0, 0, 0.20)",
      "dark": "rgba(255, 255, 255, 0.20)",
      "highContrastLight": "rgba(0, 0, 0, 0.20)",
      "highContrastDark": "rgba(255, 255, 255, 0.20)"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-scrollbar-thumb-hover",
    "name": "color.scrollbar.thumbHover",
    "type": "color",
    "values": {
      "light": "rgba(0, 0, 0, 0.30)",
      "dark": "rgba(255, 255, 255, 0.30)",
      "highContrastLight": "rgba(0, 0, 0, 0.30)",
      "highContrastDark": "rgba(255, 255, 255, 0.30)"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-selection-surface",
    "description": "Persistent neutral selection fill, distinct from transient pressed feedback.",
    "name": "color.selection.surface",
    "type": "color",
    "values": {
      "light": "rgba(0, 0, 0, 0.08)",
      "dark": "rgba(255, 255, 255, 0.12)",
      "highContrastLight": "#cccccc",
      "highContrastDark": "#505050"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-status-danger-border",
    "name": "color.status.danger.border",
    "type": "color",
    "values": {
      "light": "rgba(236, 34, 31, 0.3)",
      "dark": "rgba(236, 34, 31, 0.3)",
      "highContrastLight": "rgba(236, 34, 31, 0.3)",
      "highContrastDark": "rgba(236, 34, 31, 0.3)"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-status-danger-content",
    "name": "color.status.danger.content",
    "type": "color",
    "values": {
      "light": "#bd1b19",
      "dark": "#f47f7d",
      "highContrastLight": "#8e1413",
      "highContrastDark": "#f7a7a5"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-status-danger-emphasis",
    "description": "Status icons and short emphasis share the code-change anchor; use content for readable text.",
    "name": "color.status.danger.emphasis",
    "type": "color",
    "values": {
      "light": "#ec221f",
      "dark": "#ec221f",
      "highContrastLight": "#ec221f",
      "highContrastDark": "#ec221f"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-status-danger-surface",
    "name": "color.status.danger.surface",
    "type": "color",
    "values": {
      "light": "rgba(236, 34, 31, 0.1)",
      "dark": "rgba(236, 34, 31, 0.1)",
      "highContrastLight": "rgba(236, 34, 31, 0.1)",
      "highContrastDark": "rgba(236, 34, 31, 0.1)"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-status-info-border",
    "name": "color.status.info.border",
    "type": "color",
    "values": {
      "light": "rgba(46, 126, 255, 0.3)",
      "dark": "rgba(46, 126, 255, 0.3)",
      "highContrastLight": "rgba(46, 126, 255, 0.3)",
      "highContrastDark": "rgba(46, 126, 255, 0.3)"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-status-info-content",
    "name": "color.status.info.content",
    "type": "color",
    "values": {
      "light": "#2360c2",
      "dark": "#7dafff",
      "highContrastLight": "#1c4c99",
      "highContrastDark": "#abcbff"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-status-info-emphasis",
    "description": "Clear blue status emphasis, sharing the existing creative-action blue anchor.",
    "name": "color.status.info.emphasis",
    "type": "color",
    "values": {
      "light": "#2e7eff",
      "dark": "#2e7eff",
      "highContrastLight": "#2e7eff",
      "highContrastDark": "#2e7eff"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-status-info-surface",
    "name": "color.status.info.surface",
    "type": "color",
    "values": {
      "light": "rgba(46, 126, 255, 0.1)",
      "dark": "rgba(46, 126, 255, 0.1)",
      "highContrastLight": "rgba(46, 126, 255, 0.1)",
      "highContrastDark": "rgba(46, 126, 255, 0.1)"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-status-success-border",
    "name": "color.status.success.border",
    "type": "color",
    "values": {
      "light": "rgba(26, 167, 62, 0.3)",
      "dark": "rgba(26, 167, 62, 0.3)",
      "highContrastLight": "rgba(26, 167, 62, 0.3)",
      "highContrastDark": "rgba(26, 167, 62, 0.3)"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-status-success-content",
    "name": "color.status.success.content",
    "type": "color",
    "values": {
      "light": "#12722a",
      "dark": "#5fc178",
      "highContrastLight": "#0d541f",
      "highContrastDark": "#afe0bb"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-status-success-emphasis",
    "description": "Status icons and short emphasis share the code-change anchor; use content for readable text.",
    "name": "color.status.success.emphasis",
    "type": "color",
    "values": {
      "light": "#1aa73e",
      "dark": "#1aa73e",
      "highContrastLight": "#1aa73e",
      "highContrastDark": "#1aa73e"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-status-success-surface",
    "name": "color.status.success.surface",
    "type": "color",
    "values": {
      "light": "rgba(26, 167, 62, 0.1)",
      "dark": "rgba(26, 167, 62, 0.1)",
      "highContrastLight": "rgba(26, 167, 62, 0.1)",
      "highContrastDark": "rgba(26, 167, 62, 0.1)"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-status-warning-border",
    "name": "color.status.warning.border",
    "type": "color",
    "values": {
      "light": "rgba(255, 140, 0, 0.3)",
      "dark": "rgba(255, 140, 0, 0.3)",
      "highContrastLight": "rgba(255, 140, 0, 0.3)",
      "highContrastDark": "rgba(255, 140, 0, 0.3)"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-status-warning-content",
    "name": "color.status.warning.content",
    "type": "color",
    "values": {
      "light": "#8a4c00",
      "dark": "#ff930f",
      "highContrastLight": "#663800",
      "highContrastDark": "#ffa940"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-status-warning-emphasis",
    "description": "Short warning-state emphasis using the product orange anchor; use warning content for longer text.",
    "name": "color.status.warning.emphasis",
    "type": "color",
    "values": {
      "light": "#ff8c00",
      "dark": "#ff8c00",
      "highContrastLight": "#ff8c00",
      "highContrastDark": "#ff8c00"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-status-warning-surface",
    "name": "color.status.warning.surface",
    "type": "color",
    "values": {
      "light": "rgba(255, 140, 0, 0.1)",
      "dark": "rgba(255, 140, 0, 0.1)",
      "highContrastLight": "rgba(255, 140, 0, 0.04)",
      "highContrastDark": "rgba(255, 140, 0, 0.04)"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-surface-canvas",
    "name": "color.surface.canvas",
    "type": "color",
    "values": {
      "light": "#fdfdfd",
      "dark": "#0e0e10",
      "highContrastLight": "#ffffff",
      "highContrastDark": "#000000"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-surface-chrome",
    "description": "Structural application chrome behind persistent navigation and window controls.",
    "name": "color.surface.chrome",
    "type": "color",
    "values": {
      "light": "#f8f8f9",
      "dark": "#0e0e10",
      "highContrastLight": "#f8f8f9",
      "highContrastDark": "#000000"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-surface-panel",
    "name": "color.surface.panel",
    "type": "color",
    "values": {
      "light": "#ffffff",
      "dark": "#1c1c1f",
      "highContrastLight": "#ffffff",
      "highContrastDark": "#090909"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-surface-raised",
    "name": "color.surface.raised",
    "type": "color",
    "values": {
      "light": "#ffffff",
      "dark": "#1c1c1f",
      "highContrastLight": "#ffffff",
      "highContrastDark": "#1c1c1f"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-surface-scene",
    "description": "Primary content scene behind editors, terminals, and full-page work areas.",
    "name": "color.surface.scene",
    "type": "color",
    "values": {
      "light": "#ffffff",
      "dark": "#1c1c1f",
      "highContrastLight": "#ffffff",
      "highContrastDark": "#090909"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-surface-subtle",
    "description": "Translucent local tint for transient feedback and small inset details; not a persistent container surface.",
    "name": "color.surface.subtle",
    "type": "color",
    "values": {
      "light": "rgba(16, 26, 39, 0.03)",
      "dark": "rgba(255, 255, 255, 0.06)",
      "highContrastLight": "rgba(16, 26, 39, 0.03)",
      "highContrastDark": "rgba(255, 255, 255, 0.06)"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-surface-tertiary",
    "description": "Opaque low-emphasis container surface for persistent grouped content.",
    "name": "color.surface.tertiary",
    "type": "color",
    "values": {
      "light": "#f7f7f7",
      "dark": "#0e0e10",
      "highContrastLight": "#f7f7f7",
      "highContrastDark": "#000000"
    }
  },
  {
    "category": "color",
    "cssVariable": "--openbitfun-color-surface-workbench",
    "description": "Application workbench surrounding content scenes and panels.",
    "name": "color.surface.workbench",
    "type": "color",
    "values": {
      "light": "#f3f3f5",
      "dark": "#0e0e10",
      "highContrastLight": "#f3f3f5",
      "highContrastDark": "#000000"
    }
  },
  {
    "category": "component",
    "cssVariable": "--openbitfun-component-button-content",
    "name": "component.button.content",
    "type": "color",
    "values": {
      "light": "rgba(0, 0, 0, 0.80)",
      "dark": "#b0b0b0",
      "highContrastLight": "#000000",
      "highContrastDark": "#ffffff"
    }
  },
  {
    "category": "component",
    "cssVariable": "--openbitfun-component-button-fill-background",
    "name": "component.button.fillBackground",
    "type": "color",
    "values": {
      "light": "rgba(0, 0, 0, 0.08)",
      "dark": "rgba(255, 255, 255, 0.1)",
      "highContrastLight": "#e6e6e6",
      "highContrastDark": "#343434"
    }
  },
  {
    "category": "component",
    "cssVariable": "--openbitfun-component-button-fill-background-hover",
    "name": "component.button.fillBackgroundHover",
    "type": "color",
    "values": {
      "light": "rgba(0, 0, 0, 0.08)",
      "dark": "rgba(255, 255, 255, 0.12)",
      "highContrastLight": "#cccccc",
      "highContrastDark": "#505050"
    }
  },
  {
    "category": "component",
    "cssVariable": "--openbitfun-component-button-fill-background-pressed",
    "name": "component.button.fillBackgroundPressed",
    "type": "color",
    "values": {
      "light": "rgba(0, 0, 0, 0.08)",
      "dark": "rgba(255, 255, 255, 0.15)",
      "highContrastLight": "#b3b3b3",
      "highContrastDark": "#6b6b6b"
    }
  },
  {
    "category": "component",
    "cssVariable": "--openbitfun-component-button-outline-border",
    "name": "component.button.outlineBorder",
    "type": "color",
    "values": {
      "light": "rgba(0, 0, 0, 0.08)",
      "dark": "rgba(255, 255, 255, 0.18)",
      "highContrastLight": "#000000",
      "highContrastDark": "#ffffff"
    }
  },
  {
    "category": "component",
    "cssVariable": "--openbitfun-component-button-outline-border-interactive",
    "name": "component.button.outlineBorderInteractive",
    "type": "color",
    "values": {
      "light": "rgba(0, 0, 0, 0.08)",
      "dark": "rgba(255, 255, 255, 0.18)",
      "highContrastLight": "#000000",
      "highContrastDark": "#ffffff"
    }
  },
  {
    "category": "component",
    "cssVariable": "--openbitfun-component-button-primary-background",
    "name": "component.button.primaryBackground",
    "type": "color",
    "values": {
      "light": "rgba(0, 0, 0, 0.80)",
      "dark": "rgba(255, 255, 255, 0.16)",
      "highContrastLight": "#000000",
      "highContrastDark": "#ffffff"
    }
  },
  {
    "category": "component",
    "cssVariable": "--openbitfun-component-button-primary-background-hover",
    "name": "component.button.primaryBackgroundHover",
    "type": "color",
    "values": {
      "light": "rgba(0, 0, 0, 0.60)",
      "dark": "rgba(255, 255, 255, 0.24)",
      "highContrastLight": "#262626",
      "highContrastDark": "#e6e6e6"
    }
  },
  {
    "category": "component",
    "cssVariable": "--openbitfun-component-button-primary-background-pressed",
    "name": "component.button.primaryBackgroundPressed",
    "type": "color",
    "values": {
      "light": "rgba(0, 0, 0, 0.90)",
      "dark": "rgba(255, 255, 255, 0.2)",
      "highContrastLight": "#000000",
      "highContrastDark": "#ffffff"
    }
  },
  {
    "category": "component",
    "cssVariable": "--openbitfun-component-button-primary-content-disabled",
    "name": "component.button.primaryContentDisabled",
    "type": "color",
    "values": {
      "light": "rgba(0, 0, 0, 0.20)",
      "dark": "#555555",
      "highContrastLight": "#343434",
      "highContrastDark": "#d0d0d0"
    }
  },
  {
    "category": "component",
    "cssVariable": "--openbitfun-component-button-text-content",
    "name": "component.button.textContent",
    "type": "color",
    "values": {
      "light": "#059cb0",
      "dark": "#60a5fa",
      "highContrastLight": "#059cb0",
      "highContrastDark": "#60a5fa"
    }
  },
  {
    "category": "component",
    "cssVariable": "--openbitfun-component-button-text-content-disabled",
    "name": "component.button.textContentDisabled",
    "type": "color",
    "values": {
      "light": "rgba(5, 156, 176, 0.30)",
      "dark": "rgba(96, 165, 250, 0.30)",
      "highContrastLight": "rgba(5, 156, 176, 0.30)",
      "highContrastDark": "rgba(96, 165, 250, 0.30)"
    }
  },
  {
    "category": "component",
    "cssVariable": "--openbitfun-component-button-text-content-hover",
    "name": "component.button.textContentHover",
    "type": "color",
    "values": {
      "light": "#059cb0",
      "dark": "#3b82f6",
      "highContrastLight": "#059cb0",
      "highContrastDark": "#3b82f6"
    }
  },
  {
    "category": "component",
    "cssVariable": "--openbitfun-component-empty-media",
    "description": "Opaque low-emphasis color for decorative empty-state artwork, matching muted content at 35% over the tertiary empty-state surface without alpha accumulation.",
    "name": "component.empty.media",
    "type": "color",
    "values": {
      "light": "color-mix(in srgb, #6a6a6a 35%, #f7f7f7)",
      "dark": "color-mix(in srgb, #858585 35%, #0e0e10)",
      "highContrastLight": "color-mix(in srgb, #343434 35%, #f7f7f7)",
      "highContrastDark": "color-mix(in srgb, #d0d0d0 35%, #000000)"
    }
  },
  {
    "category": "effect",
    "cssVariable": "--openbitfun-effect-blur-base",
    "name": "effect.blur.base",
    "type": "filter",
    "values": {
      "light": "blur(8px) saturate(1.05)",
      "dark": "blur(8px) saturate(1.1)",
      "highContrastLight": "blur(8px) saturate(1.05)",
      "highContrastDark": "blur(8px) saturate(1.1)"
    }
  },
  {
    "category": "effect",
    "cssVariable": "--openbitfun-effect-blur-medium",
    "name": "effect.blur.medium",
    "type": "filter",
    "values": {
      "light": "blur(12px) saturate(1.2)",
      "dark": "blur(12px) saturate(1.2)",
      "highContrastLight": "blur(12px) saturate(1.2)",
      "highContrastDark": "blur(12px) saturate(1.2)"
    }
  },
  {
    "category": "effect",
    "cssVariable": "--openbitfun-effect-blur-subtle",
    "name": "effect.blur.subtle",
    "type": "filter",
    "values": {
      "light": "blur(4px) saturate(1.02)",
      "dark": "blur(4px) saturate(1.05)",
      "highContrastLight": "blur(4px) saturate(1.02)",
      "highContrastDark": "blur(4px) saturate(1.05)"
    }
  },
  {
    "category": "opacity",
    "cssVariable": "--openbitfun-opacity-disabled",
    "name": "opacity.disabled",
    "type": "number",
    "values": {
      "light": "0.55",
      "dark": "0.6",
      "highContrastLight": "0.55",
      "highContrastDark": "0.6"
    }
  },
  {
    "category": "opacity",
    "cssVariable": "--openbitfun-opacity-focus",
    "name": "opacity.focus",
    "type": "number",
    "values": {
      "light": "0.9",
      "dark": "0.9",
      "highContrastLight": "0.9",
      "highContrastDark": "0.9"
    }
  },
  {
    "category": "opacity",
    "cssVariable": "--openbitfun-opacity-hover",
    "name": "opacity.hover",
    "type": "number",
    "values": {
      "light": "0.75",
      "dark": "0.8",
      "highContrastLight": "0.75",
      "highContrastDark": "0.8"
    }
  },
  {
    "category": "opacity",
    "cssVariable": "--openbitfun-opacity-muted",
    "name": "opacity.muted",
    "type": "number",
    "values": {
      "light": "0.75",
      "dark": "0.8",
      "highContrastLight": "0.75",
      "highContrastDark": "0.8"
    }
  },
  {
    "category": "shadow",
    "cssVariable": "--openbitfun-shadow-accent-glow",
    "description": "Layered emphasis glow derived from the active accent.",
    "name": "shadow.accentGlow",
    "type": "shadow",
    "values": {
      "light": "0 12px 32px color-mix(in srgb, #059cb0 25%, transparent), 0 6px 16px color-mix(in srgb, #059cb0 18%, transparent), 0 3px 8px rgba(0, 0, 0, 0.12)",
      "dark": "0 12px 32px color-mix(in srgb, #3b82f6 25%, transparent), 0 6px 16px color-mix(in srgb, #60a5fa 18%, transparent), 0 3px 8px rgba(0, 0, 0, 0.12)",
      "highContrastLight": "0 12px 32px color-mix(in srgb, #059cb0 25%, transparent), 0 6px 16px color-mix(in srgb, #059cb0 18%, transparent), 0 3px 8px rgba(0, 0, 0, 0.12)",
      "highContrastDark": "0 12px 32px color-mix(in srgb, #3b82f6 25%, transparent), 0 6px 16px color-mix(in srgb, #60a5fa 18%, transparent), 0 3px 8px rgba(0, 0, 0, 0.12)"
    }
  },
  {
    "category": "shadow",
    "cssVariable": "--openbitfun-shadow-base",
    "name": "shadow.base",
    "type": "shadow",
    "values": {
      "light": "0 4px 8px rgba(16, 26, 39, 0.07)",
      "dark": "0 4px 8px rgba(0, 0, 0, 0.7)",
      "highContrastLight": "0 4px 8px rgba(16, 26, 39, 0.07)",
      "highContrastDark": "0 4px 8px rgba(0, 0, 0, 0.7)"
    }
  },
  {
    "category": "shadow",
    "cssVariable": "--openbitfun-shadow-composer",
    "name": "shadow.composer",
    "type": "shadow",
    "values": {
      "light": "0 2px 12px rgba(0, 0, 0, 0.08)",
      "dark": "0 2px 6px rgba(0, 0, 0, 0.32)",
      "highContrastLight": "0 2px 12px rgba(0, 0, 0, 0.08)",
      "highContrastDark": "0 2px 6px rgba(0, 0, 0, 0.32)"
    }
  },
  {
    "category": "shadow",
    "cssVariable": "--openbitfun-shadow-inner-highlight",
    "name": "shadow.innerHighlight",
    "type": "shadow",
    "values": {
      "light": "inset 0 1px 0 rgba(255, 255, 255, 0.08)",
      "dark": "inset 0 1px 0 rgba(255, 255, 255, 0.08)",
      "highContrastLight": "inset 0 1px 0 rgba(255, 255, 255, 0.08)",
      "highContrastDark": "inset 0 1px 0 rgba(255, 255, 255, 0.08)"
    }
  },
  {
    "category": "shadow",
    "cssVariable": "--openbitfun-shadow-inner-highlight-hover",
    "name": "shadow.innerHighlightHover",
    "type": "shadow",
    "values": {
      "light": "inset 0 1px 0 rgba(255, 255, 255, 0.24)",
      "dark": "inset 0 1px 0 rgba(255, 255, 255, 0.24)",
      "highContrastLight": "inset 0 1px 0 rgba(255, 255, 255, 0.24)",
      "highContrastDark": "inset 0 1px 0 rgba(255, 255, 255, 0.24)"
    }
  },
  {
    "category": "shadow",
    "cssVariable": "--openbitfun-shadow-lg",
    "name": "shadow.lg",
    "type": "shadow",
    "values": {
      "light": "0 8px 16px rgba(16, 26, 39, 0.09)",
      "dark": "0 8px 16px rgba(0, 0, 0, 0.6)",
      "highContrastLight": "0 8px 16px rgba(16, 26, 39, 0.09)",
      "highContrastDark": "0 8px 16px rgba(0, 0, 0, 0.6)"
    }
  },
  {
    "category": "shadow",
    "cssVariable": "--openbitfun-shadow-menu",
    "name": "shadow.menu",
    "type": "shadow",
    "values": {
      "light": "0 4px 20px rgba(0, 0, 0, 0.12)",
      "dark": "0 4px 10px rgba(0, 0, 0, 0.48)",
      "highContrastLight": "0 4px 20px rgba(0, 0, 0, 0.12)",
      "highContrastDark": "0 4px 10px rgba(0, 0, 0, 0.48)"
    }
  },
  {
    "category": "shadow",
    "cssVariable": "--openbitfun-shadow-overlay",
    "name": "shadow.overlay",
    "type": "shadow",
    "values": {
      "light": "0 4px 20px rgba(0, 0, 0, 0.12)",
      "dark": "0 4px 20px rgba(0, 0, 0, 0.48)",
      "highContrastLight": "0 4px 20px rgba(0, 0, 0, 0.12)",
      "highContrastDark": "0 4px 20px rgba(0, 0, 0, 0.48)"
    }
  },
  {
    "category": "shadow",
    "cssVariable": "--openbitfun-shadow-raised",
    "name": "shadow.raised",
    "type": "shadow",
    "values": {
      "light": "0 2px 4px rgba(16, 26, 39, 0.055)",
      "dark": "0 2px 4px rgba(0, 0, 0, 0.8)",
      "highContrastLight": "0 2px 4px rgba(16, 26, 39, 0.055)",
      "highContrastDark": "0 2px 4px rgba(0, 0, 0, 0.8)"
    }
  },
  {
    "category": "shadow",
    "cssVariable": "--openbitfun-shadow-sm",
    "name": "shadow.sm",
    "type": "shadow",
    "values": {
      "light": "0 2px 4px rgba(16, 26, 39, 0.055)",
      "dark": "0 2px 4px rgba(0, 0, 0, 0.8)",
      "highContrastLight": "0 2px 4px rgba(16, 26, 39, 0.055)",
      "highContrastDark": "0 2px 4px rgba(0, 0, 0, 0.8)"
    }
  },
  {
    "category": "shadow",
    "cssVariable": "--openbitfun-shadow-xl",
    "name": "shadow.xl",
    "type": "shadow",
    "values": {
      "light": "0 12px 24px rgba(16, 26, 39, 0.11)",
      "dark": "0 12px 24px rgba(0, 0, 0, 0.5)",
      "highContrastLight": "0 12px 24px rgba(16, 26, 39, 0.11)",
      "highContrastDark": "0 12px 24px rgba(0, 0, 0, 0.5)"
    }
  },
  {
    "category": "shadow",
    "cssVariable": "--openbitfun-shadow-xs",
    "name": "shadow.xs",
    "type": "shadow",
    "values": {
      "light": "0 1px 2px rgba(16, 26, 39, 0.04)",
      "dark": "0 1px 2px rgba(0, 0, 0, 0.9)",
      "highContrastLight": "0 1px 2px rgba(16, 26, 39, 0.04)",
      "highContrastDark": "0 1px 2px rgba(0, 0, 0, 0.9)"
    }
  }
]);
