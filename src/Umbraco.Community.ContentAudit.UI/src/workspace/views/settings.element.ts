import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { css, customElement, html, LitElement, state } from "@umbraco-cms/backoffice/external/lit";
import { CONTENT_AUDIT_CONTEXT_TOKEN, ContentAuditContext } from "../../exports";
import { ContentAuditSettings } from "../../api";

@customElement('content-audit-settings-view')
export class ContentAuditSettingsViewElement extends UmbElementMixin(LitElement) {
    #context?: ContentAuditContext;

    @state()
    settings?: ContentAuditSettings = undefined;

    constructor() {
        super();

        this.consumeContext(CONTENT_AUDIT_CONTEXT_TOKEN, (context) => {
            this.#context = context;

            this.observe(context.settings, (settings) => {
                this.settings = settings;
            });

            this.#context.getSettings();
        });
    }

    override render() {
        if (this.settings !== undefined) {
            return html`
                <uui-box headline="Settings">
                    <div>
                        <div>Respect robots.txt</div>
                        <div>${this.settings.respectRobotsTxt ? `Yes` : `No`}</div>
                    </div>

                    <div>
                        <div>Use sitemap.xml</div>
                        <div>${this.settings.useSitemapXml ? `Yes` : `No`}</div>
                    </div>
                </uui-box>
            `
        }
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
