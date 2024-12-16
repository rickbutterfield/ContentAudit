import { css, customElement, html, repeat } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { InternalPageDto } from "../../../../api";
import ContentAuditContext, { CONTENT_AUDIT_CONTEXT_TOKEN } from "../../../../context/audit.context";

@customElement('metadata-audit-workspace')
export class AuditMetadataWorkspaceElement extends UmbLitElement {

    #context?: ContentAuditContext;

    _pagesWithMissingMetadata?: InternalPageDto[] = [];

    constructor() {
        super();

        this.consumeContext(CONTENT_AUDIT_CONTEXT_TOKEN, (context) => {
            this.#context = context;

            this.observe(context.pagesWithMissingMetadata, (pagesWithMissingMetadata) => {
                this._pagesWithMissingMetadata = pagesWithMissingMetadata;
            });

            this.#context.getPagesWithMissingMetadata();
        });
    }

    #renderMissingTitlePages() {
        const filtered = this._pagesWithMissingMetadata?.filter(x => x.metaTitle == '') as InternalPageDto[];

        if (filtered?.length !== 0) {
            return html`
                <uui-box headline="Missing meta title">
                    ${this.#renderTable(filtered)}
                </uui-box>
            `;
        }
    }

    #renderMissingDescriptionPages() {
        const filtered = this._pagesWithMissingMetadata?.filter(x => x.metaDescription == '') as InternalPageDto[];

        if (filtered?.length !== 0) {
            return html`
                <uui-box headline="Missing meta description">
                    ${this.#renderTable(filtered)}
                </uui-box>
            `;
        }
    }

    #renderMissingKeywordPages() {
        const filtered = this._pagesWithMissingMetadata?.filter(x => x.metaKeywords == null) as InternalPageDto[];

        if (filtered?.length !== 0) {
            return html`
                <uui-box headline="Missing meta keywords">
                    ${this.#renderTable(filtered)}
                </uui-box>
            `;
        }
    }

    #renderTable(data: InternalPageDto[]) {
        debugger;
        if (data?.length !== 0) {
            return html`
                <uui-table>
                    <uui-table-column></uui-table-column>
                    <uui-table-column></uui-table-column>
                    <uui-table-column></uui-table-column>
                    <uui-table-column></uui-table-column>
                    <uui-table-column></uui-table-column>

                    <uui-table-head>
                    <uui-table-head-cell>URL</uui-table-head-cell>
                    <uui-table-head-cell>NodeKey</uui-table-head-cell>
                    <uui-table-head-cell>Title</uui-table-head-cell>
                    <uui-table-head-cell>Description</uui-table-head-cell>
                    <uui-table-head-cell>Keywords</uui-table-head-cell>
                    </uui-table-head>

                    ${repeat(
                        data,
                        (data) => data.id,
                        (data) =>
                            html`
                                <uui-table-row>
                                    <uui-table-cell>${data.url ?? data.canonicalUrl}</uui-table-cell>
                                    <uui-table-cell>
                                        <a href="/umbraco/section/content/workspace/document/edit/${data.nodeKey}">${data.nodeKey}</a>
                                    </uui-table-cell>
                                    <uui-table-cell>${data.metaTitle}</uui-table-cell>
                                    <uui-table-cell>${data.metaDescription}</uui-table-cell>
                                    <uui-table-cell>${data.metaKeywords}</uui-table-cell>
                                </uui-table-row>
                            `
                    )}
                </uui-table>
            `
        }
    }

    override render() {
        return html`
            <umb-body-layout headline="Metadata">
                <div id="main">
                    ${this.#renderMissingTitlePages()}
                    ${this.#renderMissingDescriptionPages()}
                    ${this.#renderMissingKeywordPages()}
                </div>
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

            
            #main {
                display: flex;
                flex-direction: column;
                gap: var(--uui-size-layout-1);
            }
        `,
    ];
}

export default AuditMetadataWorkspaceElement;

declare global {
    interface HTMLElementTagNameMap {
        'metadata-audit-workspace': AuditMetadataWorkspaceElement;
    }
}