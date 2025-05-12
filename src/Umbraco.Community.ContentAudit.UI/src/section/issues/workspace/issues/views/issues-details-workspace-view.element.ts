import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { UMB_WORKSPACE_MODAL, UmbWorkspaceViewElement } from "@umbraco-cms/backoffice/workspace";
import { customElement, state } from "lit/decorators.js";
import { CONTENT_AUDIT_ISSUES_WORKSPACE_CONTEXT } from "../issues-workspace.context";
import { IssueDto } from "../../../../../api";
import { css, html } from "@umbraco-cms/backoffice/external/lit";
import { UMB_EDIT_DOCUMENT_WORKSPACE_PATH_PATTERN } from '@umbraco-cms/backoffice/document';
import { UmbTextStyles } from "@umbraco-cms/backoffice/style";
import { UmbTableConfig, UmbTableColumn, UmbTableItem } from "../../../../../interfaces";
import { UmbModalRouteBuilder, UmbModalRouteRegistrationController } from "@umbraco-cms/backoffice/router";

@customElement('content-audit-issues-details-workspace-view')
export class ContentAuditIssuesDetailsWorkspaceViewElement extends UmbLitElement implements UmbWorkspaceViewElement {
    @state()
    _data?: IssueDto;

    @state()
    private _tableConfig: UmbTableConfig = {
        allowSelection: false,
        hideIcon: true
    };

    @state()
    private get _tableColumns(): Array<UmbTableColumn> {
        let columns: UmbTableColumn[] = [];

        if (this._data != null) {
            columns.push({
                name: this._data?.images != null ? 'URL' : 'Page',
                alias: 'url'
            });

            if (this._data?.exposedProperties != null) {
                if (this._data?.exposedProperties?.length !== 0) {
                    this._data.exposedProperties.forEach(x => {
                        columns.push({ name: x.name!, alias: x.alias!, elementName: x.elementName!, labelTemplate: x.labelTemplate! });
                    })
                }
            }

            if (this._data?.images != null) {
                if (this._data?.images?.length !== 0) {
                    columns.push({
                        name: 'Found Page',
                        alias: 'foundPage'
                    });
                }
            }
        }

        return columns;
    };

    @state()
    private _tableItems: Array<UmbTableItem> = [];

    #workspaceContext?: typeof CONTENT_AUDIT_ISSUES_WORKSPACE_CONTEXT.TYPE;
    #routeBuilder?: UmbModalRouteBuilder;

    constructor() {
        super();

        this.consumeContext(CONTENT_AUDIT_ISSUES_WORKSPACE_CONTEXT, (instance) => {
            this.#workspaceContext = instance;
        });

        this.#registerModalRoute();
    }

    #registerModalRoute() {
        new UmbModalRouteRegistrationController(this, UMB_WORKSPACE_MODAL)
            .addAdditionalPath(':entityType')
            .onSetup((params) => {
                return { data: { entityType: params.entityType, preset: {} } };
            })
            .observeRouteBuilder((routeBuilder) => {
                this.#routeBuilder = routeBuilder;

                this.#observeCollectionItems();
            });
    }

    #observeCollectionItems() {
        if (!this.#workspaceContext) return;
        this.observe(this.#workspaceContext.data, (data) => {
            this._data = data;
            this.#createTableItems(data);
        }, 'umbCollectionItemsObserver');
    }

    #createTableItems(data: IssueDto | undefined) {
        let tableItems: UmbTableItem[] | undefined = [];

        const routeBuilder = this.#routeBuilder;
        if (!routeBuilder) throw new Error('Route builder not ready');

        if (data != null) {
            if (data.pages?.length !== 0) {
                tableItems = data?.pages?.map((page) => {
                    const modalEditPath =
                        routeBuilder({ entityType: 'document' }) +
                        UMB_EDIT_DOCUMENT_WORKSPACE_PATH_PATTERN.generateLocal({ unique: page.unique! });

                    let tableItem: UmbTableItem = {
                        id: page.unique,
                        data: [
                            {
                                columnAlias: 'url',
                                value: html`<a href="${modalEditPath}">${page.pageData?.url}</a>`
                            }
                        ]
                    };

                    if (this._data?.exposedProperties != null) {
                        if (this._data?.exposedProperties?.length !== 0) {
                            this._data.exposedProperties.forEach(x => {
                                const aliasParts = x.alias!.split('.');
                                let value = page as any;
                                for (const part of aliasParts) {
                                    if (value && typeof value === 'object') {
                                        value = value[part];
                                    } else {
                                        break;
                                    }
                                }

                                tableItem.data.push({ columnAlias: x.alias!, value: value });
                            });
                        }
                    }

                    return tableItem;
                });
            }

            if (data?.images != null) {
                if (data?.images.length !== 0) {
                    tableItems = data?.images?.map((page) => {
                        let tableItem: UmbTableItem = {
                            id: page.unique,
                            data: [
                                {
                                    columnAlias: 'url',
                                    value: page.url
                                },
                                {
                                    columnAlias: 'foundPage',
                                    value: page.foundPage
                                }
                            ]
                        }

                        return tableItem;
                    });
                }
            }
        }

        this._tableItems = tableItems || [];
    }

    #renderPages() {
        return html`
			<div>
				<umb-table
					.config=${this._tableConfig}
					.columns=${this._tableColumns}
					.items=${this._tableItems}>
				</umb-table>
			</div>
		`
    }

    #renderProperties() {
        return html`
			<uui-box style="align-self: flex-start;">
				<umb-property-layout label="Name" orientation="vertical" style="padding-top: 0;">
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
				<umb-property-layout label="Issue Priority" orientation="vertical" style="padding-bottom: 0;">
					<div slot="editor">
						<content-audit-priority-type-label .type=${this._data?.priority}></content-audit-priority-type-label>
					</div>
				</umb-property-layout>
			</uui-box>
		`
    }

    override render() {
        return html`
			${this.#renderPages()}
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
		`
    ]
}

export default ContentAuditIssuesDetailsWorkspaceViewElement;

declare global {
    interface HTMLElementTagNameMap {
        'content-audit-issues-details-workspace-view': ContentAuditIssuesDetailsWorkspaceViewElement;
    }
}
