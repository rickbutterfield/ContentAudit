import { UMB_DOCUMENT_WORKSPACE_CONTEXT as P } from "@umbraco-cms/backoffice/document";
import { UmbElementMixin as f } from "@umbraco-cms/backoffice/element-api";
import { LitElement as C, html as l, state as h, customElement as g } from "@umbraco-cms/backoffice/external/lit";
import { ContentAuditAllPagesWorkspaceContext as y, CONTENT_AUDIT_ALL_PAGES_WORKSPACE_CONTEXT as E } from "./all-pages-workspace.context-BljJo633.js";
var $ = Object.defineProperty, w = Object.getOwnPropertyDescriptor, v = (t) => {
  throw TypeError(t);
}, o = (t, e, a, u) => {
  for (var i = u > 1 ? void 0 : u ? w(e, a) : e, p = t.length - 1, _; p >= 0; p--)
    (_ = t[p]) && (i = (u ? _(e, a, i) : _(i)) || i);
  return u && i && $(e, a, i), i;
}, b = (t, e, a) => e.has(t) || v("Cannot " + a), c = (t, e, a) => (b(t, e, "read from private field"), a ? a.call(t) : e.get(t)), m = (t, e, a) => e.has(t) ? v("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), d = (t, e, a, u) => (b(t, e, "write to private field"), e.set(t, a), a), n, r;
let s = class extends f(C) {
  constructor() {
    super(), this._documentUnique = "", this._routes = [], this._activePath = "", m(this, n), m(this, r), this.consumeContext(P, (t) => {
      d(this, n, t), this.observe(
        c(this, n).unique,
        (e) => {
          var a;
          this._documentUnique = e, d(this, r, new y(this)), (a = c(this, r)) == null || a.load(this._documentUnique);
        },
        "_documentUnique"
      );
    }), this.consumeContext(E, (t) => {
      d(this, r, t), this.observe(c(this, r).data, (e) => {
        var a;
        this._data = e, this._data != null && ((a = this._data.pageData) == null ? void 0 : a.runId) != 0 && this._createRoutes();
      }, "umbCollectionItemsObserver");
    });
  }
  _createRoutes() {
    const t = [];
    t.push({
      path: "details",
      component: () => import("./all-pages-details-workspace-view.element-C2XRwGJ0.js"),
      setup: (e) => {
        e._data = this._data;
      }
    }), t.push({
      path: "links",
      component: () => import("./all-pages-links-workspace-view.element-aYeKuVbp.js"),
      setup: (e) => {
        e._data = this._data;
      }
    }), t.push({
      path: "images",
      component: () => import("./all-pages-images-workspace-view.element-mj0Dwdv2.js"),
      setup: (e) => {
        e._data = this._data;
      }
    }), t.push({
      path: "resources",
      component: () => import("./all-pages-resources-workspace-view.element-Co_xqqQ3.js"),
      setup: (e) => {
        e._data = this._data;
      }
    }), t.push({
      path: "issues",
      component: () => import("./all-pages-issues-workspace-view.element-y7Xv38uh.js"),
      setup: (e) => {
        e._data = this._data;
      }
    }), t.length !== 0 && t.push({
      path: "",
      redirectTo: t[0].path
    }), t.push({
      path: "**",
      component: async () => (await import("@umbraco-cms/backoffice/router")).UmbRouteNotFoundElement
    }), this._routes = t;
  }
  render() {
    return this._routes.length !== 0 ? l`
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
            </umb-body-layout>` : l`
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
], s.prototype, "_documentUnique", 2);
o([
  h()
], s.prototype, "_data", 2);
o([
  h()
], s.prototype, "_routes", 2);
o([
  h()
], s.prototype, "_routerPath", 2);
o([
  h()
], s.prototype, "_activePath", 2);
s = o([
  g("contentaudit-workspace-view")
], s);
const U = s;
export {
  s as ContentAuditWorkspaceElement,
  U as default
};
//# sourceMappingURL=contentaudit-workspace-view-CpZE3hf9.js.map
