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
                    <umb-property-layout label="Use Umbraco content index" description="If true, Content Audit will use content from the index instead of the crawler" style="padding-top: 0;">
                        <div slot="editor">${this.settings.useUmbracoContentIndex ? html`<uui-icon name="icon-check"></uui-icon>` : html`<uui-icon name="icon-wrong"></uui-icon>`}</div>
                    </umb-property-layout>

                    <umb-property-layout label="Respect robots.txt" description="If any content is set to 'disallow', it will be ignored by the crawler">
                        <div slot="editor">${this.settings.respectRobotsTxt ? html`<uui-icon name="icon-check"></uui-icon>` : html`<uui-icon name="icon-wrong"></uui-icon>`}</div>
                    </umb-property-layout>

                    <umb-property-layout label="Use sitemap.xml" description="If true, Content Audit will use pages listed in 'sitemap.xml' instead of the crawler">
                        <div slot="editor">${this.settings.useSitemapXml ? html`<uui-icon name="icon-check"></uui-icon>` : html`<uui-icon name="icon-wrong"></uui-icon>`}</div>
                    </umb-property-layout>

                    <umb-property-layout label="Sitemap URL" description="Custom path to sitemap. Defaults to '/sitemap.xml'">
                        <div slot="editor">${this.settings.sitemapUrl}</div>
                    </umb-property-layout>
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

            .audit-setting {
                display: flex;
                padding: var(--uui-size-space-2) 0;
                border-bottom: 1px solid var(--uui-color-divider);

                p {
                    margin: 0;
                }
            }

            .audit-setting__label {
                flex-grow: 1;
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
