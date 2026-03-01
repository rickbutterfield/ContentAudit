import { UMB_DOCUMENT_WORKSPACE_CONTEXT as P } from "@umbraco-cms/backoffice/document";
import { html as d, state as h, customElement as f } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as C } from "@umbraco-cms/backoffice/lit-element";
import { ContentAuditAllPagesWorkspaceContext as g, CONTENT_AUDIT_ALL_PAGES_WORKSPACE_CONTEXT as y } from "./all-pages-workspace.context-C_4Z3Gw9.js";
var E = Object.defineProperty, $ = Object.getOwnPropertyDescriptor, v = (t) => {
  throw TypeError(t);
}, o = (t, e, a, u) => {
  for (var s = u > 1 ? void 0 : u ? $(e, a) : e, p = t.length - 1, _; p >= 0; p--)
    (_ = t[p]) && (s = (u ? _(e, a, s) : _(s)) || s);
  return u && s && E(e, a, s), s;
}, b = (t, e, a) => e.has(t) || v("Cannot " + a), c = (t, e, a) => (b(t, e, "read from private field"), e.get(t)), m = (t, e, a) => e.has(t) ? v("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), l = (t, e, a, u) => (b(t, e, "write to private field"), e.set(t, a), a), n, r;
let i = class extends C {
  constructor() {
    super(), this._documentUnique = "", this._routes = [], this._activePath = "", m(this, n), m(this, r), this.consumeContext(P, (t) => {
      l(this, n, t), this.observe(
        c(this, n)?.unique,
        (e) => {
          this._documentUnique = e, l(this, r, new g(this)), c(this, r)?.load(this._documentUnique);
        },
        "_documentUnique"
      );
    }), this.consumeContext(y, (t) => {
      l(this, r, t), this.observe(c(this, r)?.data, (e) => {
        this._data = e, this._data != null && this._data.pageData?.auditKey && this._createRoutes();
      }, "umbCollectionItemsObserver");
    });
  }
  _createRoutes() {
    const t = [];
    t.push({
      path: "details",
      component: () => import("./all-pages-details-workspace-view.element-fKjj9Ik3.js")
      //setup: (component) => {
      //    (component as ContentAuditAllPagesDetailsWorkspaceViewElement)._data = this._data;
      //}
    }), t.push({
      path: "links",
      component: () => import("./all-pages-links-workspace-view.element-Dts1FEE9.js")
      //setup: (component) => {
      //    //(component as ContentAuditAllPagesLinksWorkspaceViewElement)._data = this._data;
      //}
    }), t.push({
      path: "images",
      component: () => import("./all-pages-images-workspace-view.element-C13OhvzO.js")
      //setup: (component) => {
      //    //(component as ContentAuditAllPagesImagesWorkspaceViewElement)._data = this._data;
      //}
    }), t.push({
      path: "resources",
      component: () => import("./all-pages-resources-workspace-view.element-Br-gmwd6.js")
      //setup: (component) => {
      //    //(component as ContentAuditAllPagesResourcesWorkspaceViewElement)._data = this._data;
      //}
    }), t.push({
      path: "issues",
      component: () => import("./all-pages-issues-workspace-view.element-CA5jQKXN.js")
      //setup: (component) => {
      //    //(component as ContentAuditAllPagesIssuesWorkspaceViewElement)._data = this._data;
      //}
    }), t.length !== 0 && t.push({
      path: "",
      redirectTo: t[0].path
    }), t.push({
      path: "**",
      component: async () => (await import("@umbraco-cms/backoffice/router")).UmbRouteNotFoundElement
    }), this._routes = t;
  }
  render() {
    return this._routes.length !== 0 ? d`
            <umb-body-layout header-fit-height main-no-padding>
                <uui-tab-group slot="header">
                    <uui-tab
					    label="Details"
					    .active=${this._routerPath + "/details" === this._activePath}
					    .href=${this._routerPath + "/details"}></uui-tab>

                    <uui-tab
                        label="Links"
                        .active=${this._routerPath + "/links" === this._activePath}
                        .href=${this._routerPath + "/links"}></uui-tab>

                    <uui-tab
                        label="Images"
                        .active=${this._routerPath + "/images" === this._activePath}
                        .href=${this._routerPath + "/images"}></uui-tab>

                    <uui-tab
                        label="Resources"
                        .active=${this._routerPath + "/resources" === this._activePath}
                        .href=${this._routerPath + "/resources"}></uui-tab>

                    <uui-tab
                        label="Issues"
                        .active=${this._routerPath + "/issues" === this._activePath}
                        .href=${this._routerPath + "/issues"}></uui-tab>
                </uui-tab-group>

                <umb-router-slot
				    inherit-addendum
				    .routes=${this._routes}
				    @init=${(t) => {
      this._routerPath = t.target.absoluteRouterPath;
    }}
				    @change=${(t) => {
      this._activePath = t.target.absoluteActiveViewPath || "";
    }}>
			    </umb-router-slot>
            </umb-body-layout>` : d`
            <umb-body-layout header-fit-height>
                <uui-box>
                    Run a site audit to see data here
                </uui-box>
            </umb-body-layout>`;
  }
};
n = /* @__PURE__ */ new WeakMap();
r = /* @__PURE__ */ new WeakMap();
o([
  h()
], i.prototype, "_documentUnique", 2);
o([
  h()
], i.prototype, "_data", 2);
o([
  h()
], i.prototype, "_routes", 2);
o([
  h()
], i.prototype, "_routerPath", 2);
o([
  h()
], i.prototype, "_activePath", 2);
i = o([
  f("contentaudit-workspace-view")
], i);
const U = i;
export {
  i as ContentAuditWorkspaceElement,
  U as default
};
//# sourceMappingURL=contentaudit-workspace-view-BOz79-0D.js.map
