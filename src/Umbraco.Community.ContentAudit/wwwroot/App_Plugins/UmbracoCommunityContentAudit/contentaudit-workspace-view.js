import { UMB_DOCUMENT_WORKSPACE_CONTEXT as P } from "@umbraco-cms/backoffice/document";
import { UmbElementMixin as f } from "@umbraco-cms/backoffice/element-api";
import { LitElement as C, html as l, state as h, customElement as g } from "@umbraco-cms/backoffice/external/lit";
import { ContentAuditAllPagesWorkspaceContext as y, CONTENT_AUDIT_ALL_PAGES_WORKSPACE_CONTEXT as E } from "./all-pages-workspace.context.js";
var $ = Object.defineProperty, w = Object.getOwnPropertyDescriptor, v = (t) => {
  throw TypeError(t);
}, u = (t, e, a, i) => {
  for (var r = i > 1 ? void 0 : i ? w(e, a) : e, p = t.length - 1, _; p >= 0; p--)
    (_ = t[p]) && (r = (i ? _(e, a, r) : _(r)) || r);
  return i && r && $(e, a, r), r;
}, b = (t, e, a) => e.has(t) || v("Cannot " + a), c = (t, e, a) => (b(t, e, "read from private field"), e.get(t)), m = (t, e, a) => e.has(t) ? v("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), d = (t, e, a, i) => (b(t, e, "write to private field"), e.set(t, a), a), n, o;
let s = class extends f(C) {
  constructor() {
    super(), this._documentUnique = "", this._routes = [], this._activePath = "", m(this, n), m(this, o), this.consumeContext(P, (t) => {
      var e;
      d(this, n, t), this.observe(
        (e = c(this, n)) == null ? void 0 : e.unique,
        (a) => {
          var i;
          this._documentUnique = a, d(this, o, new y(this)), (i = c(this, o)) == null || i.load(this._documentUnique);
        },
        "_documentUnique"
      );
    }), this.consumeContext(E, (t) => {
      var e;
      d(this, o, t), this.observe((e = c(this, o)) == null ? void 0 : e.data, (a) => {
        var i;
        this._data = a, this._data != null && (i = this._data.pageData) != null && i.auditKey && this._createRoutes();
      }, "umbCollectionItemsObserver");
    });
  }
  _createRoutes() {
    const t = [];
    t.push({
      path: "details",
      component: () => import("./all-pages-details-workspace-view.element.js"),
      setup: (e) => {
        e._data = this._data;
      }
    }), t.push({
      path: "links",
      component: () => import("./all-pages-links-workspace-view.element.js"),
      setup: (e) => {
        e._data = this._data;
      }
    }), t.push({
      path: "images",
      component: () => import("./all-pages-images-workspace-view.element.js"),
      setup: (e) => {
        e._data = this._data;
      }
    }), t.push({
      path: "resources",
      component: () => import("./all-pages-resources-workspace-view.element.js"),
      setup: (e) => {
        e._data = this._data;
      }
    }), t.push({
      path: "issues",
      component: () => import("./all-pages-issues-workspace-view.element.js"),
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
o = /* @__PURE__ */ new WeakMap();
u([
  h()
], s.prototype, "_documentUnique", 2);
u([
  h()
], s.prototype, "_data", 2);
u([
  h()
], s.prototype, "_routes", 2);
u([
  h()
], s.prototype, "_routerPath", 2);
u([
  h()
], s.prototype, "_activePath", 2);
s = u([
  g("contentaudit-workspace-view")
], s);
const U = s;
export {
  s as ContentAuditWorkspaceElement,
  U as default
};
//# sourceMappingURL=contentaudit-workspace-view.js.map
