import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { css, customElement, html, LitElement } from "@umbraco-cms/backoffice/external/lit";
import { tryExecuteAndNotify } from "@umbraco-cms/backoffice/resources";
import { AuditService } from "../../../../api";

@customElement('content-audit-export')
export class ContentAuditExportElement extends UmbElementMixin(LitElement) {
    constructor() {
        super();
    }

    async #exportCsv() {
        const { data, error } = await tryExecuteAndNotify(this, AuditService.getExportData());

        if (data) {
            const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'content-audit-export.csv';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }

        if (error) {
            console.error(error);
        }
    }

    override render() {
        return html`
		    <umb-workspace-editor headline="Export" .enforceNoFooter=${true}>
                <div id="main">
                    <uui-box headline="CSV export">
                        <p>Export your latest audit run to a CSV file.</p>
                        <uui-button look="primary" label="Export CSV" @click=${() => this.#exportCsv()}></uui-button>
                    </uui-box>
                </div>
		    </umb-workspace-editor>
	    `;
    }

    static override styles = [
        css`
            :host {
                display: block;
            }

            #main {
                padding: var(--uui-size-space-5);
            }
        `
    ]
}

export default ContentAuditExportElement;

declare global {
    interface HTMLElementTagNameMap {
        'content-audit-export-root': ContentAuditExportElement;
    }
}