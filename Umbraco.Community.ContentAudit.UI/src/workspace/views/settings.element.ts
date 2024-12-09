import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { css, customElement, html, LitElement } from "@umbraco-cms/backoffice/external/lit";

@customElement('content-audit-settings-view')
export class ContentAuditSettingsViewElement extends UmbElementMixin(LitElement) {
    constructor() {
        super();
    }

    override render() {
        return html`<uui-box>Settings</uui-box>`
    }

    static override styles = [
        css`
            :host {
                display: block;
                padding: var(--uui-size-space-5);
            }
        `
    ]
}

export default ContentAuditSettingsViewElement;

declare global {
    interface HTMLElementTagNameMap {
        'content-audit-settings-view': ContentAuditSettingsViewElement;
    }
}
