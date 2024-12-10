import { css, customElement, html, state } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import ContentAuditContext, { CONTENT_AUDIT_CONTEXT_TOKEN } from "../../../../context/audit.context";
import { AuditIssueDto } from "../../../../api";

@customElement('overview-audit-workspace')
export class AuditOverviewWorkspaceElement extends UmbLitElement {

    #context?: ContentAuditContext;

    @state()
    _allIssues: Array<AuditIssueDto> = [];

    constructor() {
        super();

        this.consumeContext(CONTENT_AUDIT_CONTEXT_TOKEN, (context) => {
            this.#context = context;

            this.observe(context.allIssues, (allIssues) => {
                this._allIssues = allIssues;
            });

            this.#context?.getAllIssues();
        });
    }

    override render() {
        return html`
            <umb-body-layout headline="Issues">
                <uui-box style="--uui-box-default-padding: 0;">
                    <audit-issue-table .data=${this._allIssues} />
                </uui-box>
            </umb-body-layout>
        `
    }

    static styles = [
        css`
			:host {
				display: block;
				height: 100%;
				--uui-tab-background: var(--uui-color-surface);
			}
        `,
    ];
}

export default AuditOverviewWorkspaceElement;

declare global {
    interface HTMLElementTagNameMap {
        'overview-audit-workspace': AuditOverviewWorkspaceElement;
    }
}