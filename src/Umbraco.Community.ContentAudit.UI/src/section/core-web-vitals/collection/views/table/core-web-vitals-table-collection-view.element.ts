import { UMB_COLLECTION_CONTEXT, UmbDefaultCollectionContext } from '@umbraco-cms/backoffice/collection';
import { css, customElement, html, state } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { PageAnalysisDto } from '../../../../../api';
import { UmbTableColumn, UmbTableItem, UmbTableConfig } from '../../../../../exports';
import { UMB_EDIT_DOCUMENT_WORKSPACE_PATH_PATTERN } from '@umbraco-cms/backoffice/document';
import { UmbModalRouteBuilder, UmbModalRouteRegistrationController } from '@umbraco-cms/backoffice/router';
import { UMB_WORKSPACE_MODAL } from '@umbraco-cms/backoffice/workspace';

@customElement('content-audit-core-web-vitals-table-collection-view')
export class ContentAuditCoreWebVitalsTableCollectionViewElement extends UmbLitElement {

    @state()
    private _tableConfig: UmbTableConfig = {
        allowSelection: false,
        hideIcon: true
    };

    @state()
    private _tableColumns: Array<UmbTableColumn> = [
        {
            name: 'URL',
            alias: 'url',
        },
        {
            name: 'Cumulative Layout Shift',
            alias: 'cumulativeLayoutShift',
            elementName: 'content-audit-metric-label'
        },
        {
            name: 'First Contentful Paint',
            alias: 'firstContentfulPaint',
            elementName: 'content-audit-metric-label'
        },
        {
            name: 'Largest Contentful Paint',
            alias: 'largestContentfulPaint',
            elementName: 'content-audit-metric-label'
        },
        //{
        //    name: 'Time to Interactive',
        //    alias: 'timeToInteractive',
        //    elementName: 'content-audit-metric-label'
        //},
        {
            name: 'Time to First Byte',
            alias: 'timeToFirstByte',
            elementName: 'content-audit-metric-label'
        }
    ];

    @state()
    private _tableItems: Array<UmbTableItem> = [];

    #collectionContext?: UmbDefaultCollectionContext<PageAnalysisDto>;
    #routeBuilder?: UmbModalRouteBuilder;

    constructor() {
        super();

        this.consumeContext(UMB_COLLECTION_CONTEXT, (instance) => {
            this.#collectionContext = instance;
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
        if (!this.#collectionContext) return;
        this.observe(this.#collectionContext.items, (items) => this.#createTableItems(items), 'umbCollectionItemsObserver');
    }

    #createTableItems(pages: PageAnalysisDto[]) {
        const routeBuilder = this.#routeBuilder;
        if (!routeBuilder) throw new Error('Route builder not ready');

        this._tableItems = pages.filter(x => x.pageData.statusCode === 200).map((page) => {
            const modalEditPath =
                routeBuilder({ entityType: page.entityType }) +
                UMB_EDIT_DOCUMENT_WORKSPACE_PATH_PATTERN.generateLocal({ unique: page.unique });

            return {
                id: page?.unique,
                entityType: page?.entityType,
                icon: 'icon-alert',
                data: [
                    {
                        columnAlias: 'url',
                        value: html`<a href=${modalEditPath}>${page.pageData?.url}</a>`
                    },
                    {
                        columnAlias: 'cumulativeLayoutShift',
                        value: page.performanceData.cumulativeLayoutShift
                    },
                    {
                        columnAlias: 'firstContentfulPaint',
                        value: page.performanceData.firstContentfulPaint
                    },
                    {
                        columnAlias: 'largestContentfulPaint',
                        value: page.performanceData.largestContentfulPaint
                    },
                    //{
                    //    columnAlias: 'timeToInteractive',
                    //    value: page.performanceData.timeToInteractive
                    //},
                    {
                        columnAlias: 'timeToFirstByte',
                        value: page.performanceData.timeToFirstByte
                    },
                ]
            }
        });
    }

    override render() {
        if (this._tableItems.length !== 0) {
            return html`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
        }
    }

    static override styles = [
        css`
			:host {
				display: flex;
				flex-direction: column;
			}
		`,
    ];
}

export default ContentAuditCoreWebVitalsTableCollectionViewElement;

declare global {
    interface HTMLElementTagNameMap {
        'content-audit-core-web-vitals-table-collection-view': ContentAuditCoreWebVitalsTableCollectionViewElement;
    }
}
