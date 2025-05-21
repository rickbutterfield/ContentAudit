import { UMB_DOCUMENT_WORKSPACE_CONTEXT as b } from "@umbraco-cms/backoffice/document";
import { UmbElementMixin as f } from "@umbraco-cms/backoffice/element-api";
import { LitElement as C, html as c, state as h, customElement as g } from "@umbraco-cms/backoffice/external/lit";
import { ContentAuditAllPagesWorkspaceContext as E, CONTENT_AUDIT_ALL_PAGES_WORKSPACE_CONTEXT as $ } from "./all-pages-workspace.context-DxsO9NbV.js";
var w = Object.defineProperty, y = Object.getOwnPropertyDescriptor, v = (t) => {
  throw TypeError(t);
}, u = (t, e, a, s) => {
  for (var r = s > 1 ? void 0 : s ? y(e, a) : e, p = t.length - 1, _; p >= 0; p--)
    (_ = t[p]) && (r = (s ? _(e, a, r) : _(r)) || r);
  return s && r && w(e, a, r), r;
}, P = (t, e, a) => e.has(t) || v("Cannot " + a), d = (t, e, a) => (P(t, e, "read from private field"), e.get(t)), m = (t, e, a) => e.has(t) ? v("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), l = (t, e, a, s) => (P(t, e, "write to private field"), e.set(t, a), a), n, o;
let i = class extends f(C) {
  constructor() {
    super(), this._documentUnique = "", this._routes = [], this._activePath = "", m(this, n), m(this, o), this.consumeContext(b, (t) => {
      var e;
      l(this, n, t), this.observe(
        (e = d(this, n)) == null ? void 0 : e.unique,
        (a) => {
          var s;
          this._documentUnique = a, l(this, o, new E(this)), (s = d(this, o)) == null || s.load(this._documentUnique);
        },
        "_documentUnique"
      );
    }), this.consumeContext($, (t) => {
      var e;
      l(this, o, t), this.observe((e = d(this, o)) == null ? void 0 : e.data, (a) => {
        var s;
        this._data = a, this._data != null && ((s = this._data.pageData) == null ? void 0 : s.runId) != 0 && this._createRoutes();
      }, "umbCollectionItemsObserver");
    });
  }
  _createRoutes() {
    const t = [];
    t.push({
      path: "details",
      component: () => import("./all-pages-details-workspace-view.element-CgHuEaP2.js"),
      setup: (e) => {
        e._data = this._data;
      }
    }), t.push({
      path: "links",
      component: () => import("./all-pages-links-workspace-view.element-DgZKywY4.js"),
      setup: (e) => {
        e._data = this._data;
      }
    }), t.push({
      path: "images",
      component: () => import("./all-pages-images-workspace-view.element-CK1fA6OM.js"),
      setup: (e) => {
        e._data = this._data;
      }
    }), t.push({
      path: "resources",
      component: () => import("./all-pages-resources-workspace-view.element-BhDMGOVL.js"),
      setup: (e) => {
        e._data = this._data;
      }
    }), t.push({
      path: "issues",
      component: () => import("./all-pages-issues-workspace-view.element-31K8AcTn.js"),
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
    return c`
            <umb-body-layout main-no-padding header-fit-height>
                ${this._routes.length !== 0 ? c`
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
				    </umb-router-slot>` : c`
                <uui-box>
                    Run a site audit to see data here
                </uui-box>
                `}
            </umb-body-layout>
        `;
  }
};
n = /* @__PURE__ */ new WeakMap();
o = /* @__PURE__ */ new WeakMap();
u([
  h()
], i.prototype, "_documentUnique", 2);
u([
  h()
], i.prototype, "_data", 2);
u([
  h()
], i.prototype, "_routes", 2);
u([
  h()
], i.prototype, "_routerPath", 2);
u([
  h()
], i.prototype, "_activePath", 2);
i = u([
  g("contentaudit-workspace-view")
], i);
const U = i;
export {
  i as ContentAuditWorkspaceElement,
  U as default
};
//# sourceMappingURL=contentaudit-workspace-view--oN-G60C.js.map
