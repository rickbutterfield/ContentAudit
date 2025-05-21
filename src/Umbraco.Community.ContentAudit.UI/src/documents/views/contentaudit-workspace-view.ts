import { UMB_DOCUMENT_WORKSPACE_CONTEXT } from "@umbraco-cms/backoffice/document";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { customElement, html, LitElement, state } from "@umbraco-cms/backoffice/external/lit";
import { UmbRoute, UmbRouterSlotChangeEvent, UmbRouterSlotInitEvent } from "@umbraco-cms/backoffice/router";
import { ContentAuditAllPagesDetailsWorkspaceViewElement } from "../../section/all-pages/workspace/all-pages/views/all-pages-details-workspace-view.element";
import { CONTENT_AUDIT_ALL_PAGES_WORKSPACE_CONTEXT, ContentAuditAllPagesWorkspaceContext } from "../../section/all-pages/workspace/all-pages/all-pages-workspace.context";
import { PageAnalysisDto } from "../../api";
import ContentAuditAllPagesLinksWorkspaceViewElement from "../../section/all-pages/workspace/all-pages/views/all-pages-links-workspace-view.element";
import ContentAuditAllPagesResourcesWorkspaceViewElement from "../../section/all-pages/workspace/all-pages/views/all-pages-resources-workspace-view.element";
import ContentAuditAllPagesImagesWorkspaceViewElement from "../../section/all-pages/workspace/all-pages/views/all-pages-images-workspace-view.element";
import ContentAuditAllPagesIssuesWorkspaceViewElement from "../../section/all-pages/workspace/all-pages/views/all-pages-issues-workspace-view.element";

@customElement('contentaudit-workspace-view')
export class ContentAuditWorkspaceElement extends UmbElementMixin(LitElement) {
    @state()
    private _documentUnique = '';

    @state()
    _data?: PageAnalysisDto;

    @state()
    private _routes: UmbRoute[] = [];

    @state()
    private _routerPath?: string;

    @state()
    private _activePath = '';

    #workspaceContext?: typeof UMB_DOCUMENT_WORKSPACE_CONTEXT.TYPE;
    #contentAuditWorkspaceContext?: typeof CONTENT_AUDIT_ALL_PAGES_WORKSPACE_CONTEXT.TYPE;

    constructor() {
        super();

        this.consumeContext(UMB_DOCUMENT_WORKSPACE_CONTEXT, (context) => {
            this.#workspaceContext = context;

            this.observe(
                this.#workspaceContext?.unique,
                (unique) => {
                    this._documentUnique = unique!;

                    this.#contentAuditWorkspaceContext = new ContentAuditAllPagesWorkspaceContext(this);
                    this.#contentAuditWorkspaceContext?.load(this._documentUnique);
                },
                '_documentUnique',
            );
        });

        this.consumeContext(CONTENT_AUDIT_ALL_PAGES_WORKSPACE_CONTEXT, (instance) => {
            this.#contentAuditWorkspaceContext = instance;
            this.observe(this.#contentAuditWorkspaceContext?.data, (data) => {
                this._data = data;

                if (this._data != null) {
                    if (this._data.pageData?.runId != 0) {
                        this._createRoutes();
                    }
                }
            }, 'umbCollectionItemsObserver');
        });
    }

    private _createRoutes() {
        const routes: UmbRoute[] = [];

        routes.push({
            path: `details`,
            component: () => import('../../section/all-pages/workspace/all-pages/views/all-pages-details-workspace-view.element'),
            setup: (component) => {
                (component as ContentAuditAllPagesDetailsWorkspaceViewElement)._data = this._data;
            }
        });

        routes.push({
            path: `links`,
            component: () => import('../../section/all-pages/workspace/all-pages/views/all-pages-links-workspace-view.element'),
            setup: (component) => {
                (component as ContentAuditAllPagesLinksWorkspaceViewElement)._data = this._data;
            }
        });

        routes.push({
            path: `images`,
            component: () => import('../../section/all-pages/workspace/all-pages/views/all-pages-images-workspace-view.element'),
            setup: (component) => {
                (component as ContentAuditAllPagesImagesWorkspaceViewElement)._data = this._data;
            }
        });

        routes.push({
            path: `resources`,
            component: () => import('../../section/all-pages/workspace/all-pages/views/all-pages-resources-workspace-view.element'),
            setup: (component) => {
                (component as ContentAuditAllPagesResourcesWorkspaceViewElement)._data = this._data;
            }
        });

        routes.push({
            path: `issues`,
            component: () => import('../../section/all-pages/workspace/all-pages/views/all-pages-issues-workspace-view.element'),
            setup: (component) => {
                (component as ContentAuditAllPagesIssuesWorkspaceViewElement)._data = this._data;
            }
        });

        if (routes.length !== 0) {
            routes.push({
                path: '',
                redirectTo: routes[0].path,
            });
        }

        routes.push({
            path: `**`,
            component: async () => (await import('@umbraco-cms/backoffice/router')).UmbRouteNotFoundElement,
        });

        this._routes = routes;
    }

    override render() {
        return html`
            <umb-body-layout main-no-padding header-fit-height>
                ${this._routes.length !== 0 ?
                html`
                    <uui-tab-group slot="header">
                        <uui-tab
					        label="Details"
					        .active=${this._routerPath + '/details' === this._activePath}
					        .href=${this._routerPath + '/details'}></uui-tab>

                        <uui-tab
                            label="Links"
                            .active=${this._routerPath + '/links' === this._activePath}
                            .href=${this._routerPath + '/links'}></uui-tab>

                        <uui-tab
                            label="Images"
                            .active=${this._routerPath + '/images' === this._activePath}
                            .href=${this._routerPath + '/images'}></uui-tab>

                        <uui-tab
                            label="Resources"
                            .active=${this._routerPath + '/resources' === this._activePath}
                            .href=${this._routerPath + '/resources'}></uui-tab>

                        <uui-tab
                            label="Issues"
                            .active=${this._routerPath + '/issues' === this._activePath}
                            .href=${this._routerPath + '/issues'}></uui-tab>
                    </uui-tab-group>

                    <umb-router-slot
					    inherit-addendum
					    .routes=${this._routes}
					    @init=${(event: UmbRouterSlotInitEvent) => {
                    this._routerPath = event.target.absoluteRouterPath;
                }}
					    @change=${(event: UmbRouterSlotChangeEvent) => {
                    this._activePath = event.target.absoluteActiveViewPath || '';
                }}>
				    </umb-router-slot>`
            : html`
                <uui-box>
                    Run a site audit to see data here
                </uui-box>
                `
            }
            </umb-body-layout>
        `
    }
}

export default ContentAuditWorkspaceElement;