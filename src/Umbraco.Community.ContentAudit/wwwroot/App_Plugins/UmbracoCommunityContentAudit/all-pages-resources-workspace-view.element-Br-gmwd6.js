import { UmbLitElement as y } from "@umbraco-cms/backoffice/lit-element";
import { A, t as w } from "./index-stcFC0Hx.js";
import { r as u } from "./state-Dm9341Sy.js";
import { CONTENT_AUDIT_ALL_PAGES_WORKSPACE_CONTEXT as T } from "./all-pages-workspace.context-C_4Z3Gw9.js";
import { html as _, css as E } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as P } from "@umbraco-cms/backoffice/style";
import { tryExecute as I } from "@umbraco-cms/backoffice/resources";
var x = Object.defineProperty, O = Object.getOwnPropertyDescriptor, v = (e) => {
  throw TypeError(e);
}, o = (e, t, s, i) => {
  for (var a = i > 1 ? void 0 : i ? O(t, s) : t, c = e.length - 1, p; c >= 0; c--)
    (p = e[c]) && (a = (i ? p(t, s, a) : p(a)) || a);
  return i && a && x(t, s, a), a;
}, h = (e, t, s) => t.has(e) || v("Cannot " + s), f = (e, t, s) => (h(e, t, "read from private field"), t.get(e)), d = (e, t, s) => t.has(e) ? v("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, s), S = (e, t, s, i) => (h(e, t, "write to private field"), t.set(e, s), s), m = (e, t, s) => (h(e, t, "access private method"), s), n, l, C, b, g;
let r = class extends y {
  constructor() {
    super(), d(this, l), this._resources = [], this._loading = !0, d(this, n), this._tableConfig = {
      allowSelection: !1,
      hideIcon: !0
    }, this._tableColumns = [
      {
        name: "URL",
        alias: "url"
      },
      {
        name: "Content Type",
        alias: "contentType"
      }
    ], this._tableItems = [], this.consumeContext(T, (e) => {
      S(this, n, e), m(this, l, C).call(this);
    });
  }
  render() {
    return this._loading ? _`<uui-loader-bar></uui-loader-bar>` : this._resources.length == 0 ? _`<uui-box>No resources to report for this page</uui-box>` : _`
			<umb-table
				.config=${this._tableConfig}
				.columns=${this._tableColumns}
				.items=${this._tableItems}
			></umb-table>
		`;
  }
};
n = /* @__PURE__ */ new WeakMap();
l = /* @__PURE__ */ new WeakSet();
C = function() {
  f(this, n) && this.observe(f(this, n).unique, (e) => {
    e && m(this, l, b).call(this, e);
  }, "umbCollectionItemsObserver");
};
b = async function(e) {
  this._loading = !0;
  const { data: t } = await I(this, A.getPageResources({ path: { id: e } }));
  t && (this._resources = t, m(this, l, g).call(this, t)), this._loading = !1;
};
g = function(e) {
  this._tableItems = e.map((t) => ({
    id: t.unique,
    data: [
      {
        columnAlias: "url",
        value: t.url
      },
      {
        columnAlias: "contentType",
        value: t.contentType
      }
    ]
  }));
};
r.styles = [
  P,
  E`
			:host {
				display: block;
				padding: var(--uui-size-layout-1);
			}
		`
];
o([
  u()
], r.prototype, "_resources", 2);
o([
  u()
], r.prototype, "_loading", 2);
o([
  u()
], r.prototype, "_tableConfig", 2);
o([
  u()
], r.prototype, "_tableColumns", 2);
o([
  u()
], r.prototype, "_tableItems", 2);
r = o([
  w("content-audit-all-pages-resources-workspace-view")
], r);
const V = r;
export {
  r as ContentAuditAllPagesResourcesWorkspaceViewElement,
  V as default
};
//# sourceMappingURL=all-pages-resources-workspace-view.element-Br-gmwd6.js.map
