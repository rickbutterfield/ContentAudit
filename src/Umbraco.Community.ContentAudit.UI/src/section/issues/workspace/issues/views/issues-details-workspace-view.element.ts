import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { UmbModalRouteRegistrationController } from '@umbraco-cms/backoffice/router';
import { UMB_WORKSPACE_MODAL, UmbWorkspaceViewElement } from "@umbraco-cms/backoffice/workspace";
import { customElement, state } from "lit/decorators.js";
import { CONTENT_AUDIT_ISSUES_WORKSPACE_CONTEXT } from "../issues-workspace.context";
import { IssueDto, IssueReferenceDto, IssueService } from "../../../../../api";
import { css, html, nothing } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles } from "@umbraco-cms/backoffice/style";
import type { UmbTableConfig, UmbTableColumn, UmbTableItem } from "@umbraco-cms/backoffice/components";
import type { UUIPaginationEvent } from "@umbraco-cms/backoffice/external/uui";

const PAGE_SIZE = 50;

@customElement('content-audit-issues-details-workspace-view')
export class ContentAuditIssuesDetailsWorkspaceViewElement extends UmbLitElement implements UmbWorkspaceViewElement {
    @state()
    _data?: IssueDto;

    @state()
    private _references: IssueReferenceDto[] = [];

    @state()
    private _total = 0;

    @state()
    private _currentPage = 1;

    @state()
    private _tableConfig: UmbTableConfig = {
        allowSelection: false,
        hideIcon: true
    };

    @state()
    private _tableItems: Array<UmbTableItem> = [];

    #isImageIssue = false;
    #editPath = '';

    #workspaceContext?: typeof CONTENT_AUDIT_ISSUES_WORKSPACE_CONTEXT.TYPE;

    constructor() {
        super();

        new UmbModalRouteRegistrationController(this, UMB_WORKSPACE_MODAL)
            .addAdditionalPath('all-pages')
            .onSetup(() => {
                return { data: { entityType: 'all-pages', preset: {} } };
            })
            .observeRouteBuilder((routeBuilder) => {
                this.#editPath = routeBuilder({});
                this.#createTableItems();
            });

        this.consumeContext(CONTENT_AUDIT_ISSUES_WORKSPACE_CONTEXT, (instance) => {
            this.#workspaceContext = instance;
            this.#observeData();
        });
    }

    #observeData() {
        if (!this.#workspaceContext) return;
        this.observe(this.#workspaceContext.data, (data) => {
            this._data = data;
            if (data?.unique) {
                this._currentPage = 1;
                this.#loadReferences(0);
            }
        }, 'umbCollectionItemsObserver');
    }

    async #loadReferences(skip: number) {
        const unique = this._data?.unique;
        if (!unique) return;

        const { data } = await IssueService.getIssueReferences({
            path: { id: unique },
            query: { skip, take: PAGE_SIZE }
        });

        if (data) {
            this._total = data.total;
            this._references = data.items;
            this.#isImageIssue = this._references.length > 0 && !!this._references[0].foundPage;
            this.#createTableItems();
        }
    }

    #onPageChange(event: UUIPaginationEvent) {
        if (this._currentPage === event.target.current) return;
        this._currentPage = event.target.current;
        const skip = (this._currentPage - 1) * PAGE_SIZE;
        this.#loadReferences(skip);
    }

    get #tableColumns(): Array<UmbTableColumn> {
        const columns: UmbTableColumn[] = [];

        if (this._data == null) return columns;

        columns.push({
            name: this.#isImageIssue ? 'URL' : 'Page',
            alias: 'url'
        });

        if (!this.#isImageIssue && this._data.exposedProperties?.length) {
            this._data.exposedProperties.forEach(x => {
                columns.push({ name: x.name!, alias: x.alias!, elementName: x.elementName!, labelTemplate: x.labelTemplate! });
            });
        }

        if (this.#isImageIssue) {
            columns.push({
                name: 'Found Page',
                alias: 'foundPage'
            });
        }

        return columns;
    }

    #createTableItems() {
        if (this.#isImageIssue) {
            this._tableItems = this._references.map((ref) => ({
                id: ref.unique,
                data: [
                    { columnAlias: 'url', value: ref.url },
                    { columnAlias: 'foundPage', value: ref.foundPage }
                ]
            }));
        } else {
            this._tableItems = this._references.map((ref) => {
                const tableItem: UmbTableItem = {
                    id: ref.unique,
                    data: [
                        {
                            columnAlias: 'url',
                            value: html`<a href=${this.#editPath + 'edit/' + ref.unique}>${ref.url}</a>`
                        }
                    ]
                };

                if (this._data?.exposedProperties?.length) {
                    this._data.exposedProperties.forEach(x => {
                        tableItem.data.push({ columnAlias: x.alias!, value: ref.exposedValues?.[x.alias!] });
                    });
                }

                return tableItem;
            });
        }
    }

    #renderTable() {
        return html`
			<div>
				<umb-table
					.config=${this._tableConfig}
					.columns=${this.#tableColumns}
					.items=${this._tableItems}>
				</umb-table>
				${this.#renderPagination()}
			</div>
		`
    }

    #renderPagination() {
        if (!this._total) return nothing;

        const totalPages = Math.ceil(this._total / PAGE_SIZE);
        if (totalPages <= 1) return nothing;

        return html`
			<div class="pagination">
				<uui-pagination
					.total=${totalPages}
					.current=${this._currentPage}
					@change=${this.#onPageChange}></uui-pagination>
			</div>
		`;
    }

    #renderProperties() {
        return html`
			<uui-box style="align-self: flex-start;">
				<umb-property-layout label="Name" orientation="vertical">
					<div slot="editor">${this._data?.name}</div>
				</umb-property-layout>
				<umb-property-layout label="Category" orientation="vertical">
					<div slot="editor">${this._data?.category}</div>
				</umb-property-layout>
				<umb-property-layout label="Description" orientation="vertical">
					<div slot="editor">${this._data?.description}</div>
				</umb-property-layout>

				<umb-property-layout label="Issue Type" orientation="vertical">
					<div slot="editor">
						<content-audit-issue-type-label .type=${this._data?.type}></content-audit-issue-type-label>
					</div>
				</umb-property-layout>
				<umb-property-layout label="Issue Priority" orientation="vertical">
					<div slot="editor">
						<content-audit-priority-type-label .type=${this._data?.priority}></content-audit-priority-type-label>
					</div>
				</umb-property-layout>
			</uui-box>
		`
    }

    override render() {
        return html`
			${this.#renderTable()}
			${this.#renderProperties()}
		`
    }

    static override styles = [
        UmbTextStyles,
        css`
			:host {
				display: grid;
				gap: var(--uui-size-layout-1);
				padding: var(--uui-size-layout-1);
				grid-template-columns: 1fr 350px;
			}

            umb-property-layout {
                padding: var(--uui-size-space-4) 0;

                &:first-of-type {
                    padding-top: 0;
                }

                &:last-of-type {
                    padding-bottom: 0;
                }
            }

			.pagination {
				display: flex;
				justify-content: center;
				margin-top: var(--uui-size-layout-1);
			}
		`
    ]
}

export default ContentAuditIssuesDetailsWorkspaceViewElement;

declare global {
    interface HTMLElementTagNameMap {
        'content-audit-issues-details-workspace-view': ContentAuditIssuesDetailsWorkspaceViewElement;
    }
}
