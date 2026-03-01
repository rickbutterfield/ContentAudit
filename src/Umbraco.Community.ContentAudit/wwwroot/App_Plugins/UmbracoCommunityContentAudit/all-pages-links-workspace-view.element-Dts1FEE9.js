import { UmbLitElement as y } from "@umbraco-cms/backoffice/lit-element";
import { A, t as k } from "./index-stcFC0Hx.js";
import { r as p } from "./state-Dm9341Sy.js";
import { CONTENT_AUDIT_ALL_PAGES_WORKSPACE_CONTEXT as w } from "./all-pages-workspace.context-C_4Z3Gw9.js";
import { html as u, css as E } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as x } from "@umbraco-cms/backoffice/style";
import { tryExecute as I } from "@umbraco-cms/backoffice/resources";
var P = Object.defineProperty, L = Object.getOwnPropertyDescriptor, v = (t) => {
  throw TypeError(t);
}, r = (t, e, i, o) => {
  for (var a = o > 1 ? void 0 : o ? L(e, i) : e, _ = t.length - 1, h; _ >= 0; _--)
    (h = t[_]) && (a = (o ? h(e, i, a) : h(a)) || a);
  return o && a && P(e, i, a), a;
}, c = (t, e, i) => e.has(t) || v("Cannot " + i), f = (t, e, i) => (c(t, e, "read from private field"), e.get(t)), d = (t, e, i) => e.has(t) ? v("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), T = (t, e, i, o) => (c(t, e, "write to private field"), e.set(t, i), i), m = (t, e, i) => (c(t, e, "access private method"), i), n, l, b, g, C;
let s = class extends y {
  constructor() {
    super(), d(this, l), this._links = [], this._loading = !0, d(this, n), this._tableConfig = {
      allowSelection: !1,
      hideIcon: !0
    }, this._tableColumns = [
      {
        name: "URL",
        alias: "url"
      },
      {
        name: "Type",
        alias: "type"
      }
    ], this._tableItems = [], this.consumeContext(w, (t) => {
      T(this, n, t), m(this, l, b).call(this);
    });
  }
  render() {
    return this._loading ? u`<uui-loader-bar></uui-loader-bar>` : this._links.length == 0 ? u`<uui-box>No links to report for this page</uui-box>` : u`
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
b = function() {
  f(this, n) && this.observe(f(this, n).unique, (t) => {
    t && m(this, l, g).call(this, t);
  }, "umbCollectionItemsObserver");
};
g = async function(t) {
  this._loading = !0;
  const { data: e } = await I(this, A.getPageLinks({ path: { id: t } }));
  e && (this._links = e, m(this, l, C).call(this, e)), this._loading = !1;
};
C = function(t) {
  this._tableItems = t.map((e) => ({
    id: e.unique,
    data: [
      {
        columnAlias: "url",
        value: e.url
      },
      {
        columnAlias: "type",
        value: u`${e.isExternal ? "External" : "Internal"}`
      }
    ]
  }));
};
s.styles = [
  x,
  E`
			:host {
				display: block;
				padding: var(--uui-size-layout-1);
			}
		`
];
r([
  p()
], s.prototype, "_links", 2);
r([
  p()
], s.prototype, "_loading", 2);
r([
  p()
], s.prototype, "_tableConfig", 2);
r([
  p()
], s.prototype, "_tableColumns", 2);
r([
  p()
], s.prototype, "_tableItems", 2);
s = r([
  k("content-audit-all-pages-links-workspace-view")
], s);
const V = s;
export {
  s as ContentAuditAllPagesLinksWorkspaceViewElement,
  V as default
};
//# sourceMappingURL=all-pages-links-workspace-view.element-Dts1FEE9.js.map
