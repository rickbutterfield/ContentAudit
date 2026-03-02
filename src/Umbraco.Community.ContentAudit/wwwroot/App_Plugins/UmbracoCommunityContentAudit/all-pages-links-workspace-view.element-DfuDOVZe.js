import { UmbLitElement as A } from "@umbraco-cms/backoffice/lit-element";
import { A as E, t as w } from "./index-BUsZH3tI.js";
import { r as l } from "./state-C-6jRtm-.js";
import { CONTENT_AUDIT_ALL_PAGES_WORKSPACE_CONTEXT as I } from "./all-pages-workspace.context-DEWmO3Vr.js";
import { html as c, nothing as x, css as L } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as S } from "@umbraco-cms/backoffice/style";
import { tryExecute as T } from "@umbraco-cms/backoffice/resources";
var O = Object.defineProperty, $ = Object.getOwnPropertyDescriptor, C = (t) => {
  throw TypeError(t);
}, r = (t, e, i, u) => {
  for (var n = u > 1 ? void 0 : u ? $(e, i) : e, _ = t.length - 1, p; _ >= 0; _--)
    (p = t[_]) && (n = (u ? p(e, i, n) : p(n)) || n);
  return u && n && O(e, i, n), n;
}, g = (t, e, i) => e.has(t) || C("Cannot " + i), d = (t, e, i) => (g(t, e, "read from private field"), e.get(t)), v = (t, e, i) => e.has(t) ? C("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), W = (t, e, i, u) => (g(t, e, "write to private field"), e.set(t, i), i), o = (t, e, i) => (g(t, e, "access private method"), i), h, s, P, b, m, y, k;
const f = 50;
let a = class extends A {
  constructor() {
    super(), v(this, s), this._links = [], this._loading = !0, this._currentPage = 1, v(this, h), this._tableConfig = {
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
    ], this._tableItems = [], this.consumeContext(I, (t) => {
      W(this, h, t), o(this, s, P).call(this);
    });
  }
  render() {
    return this._loading ? c`<uui-loader-bar></uui-loader-bar>` : this._links.length == 0 ? c`<uui-box>No links to report for this page</uui-box>` : c`
			<umb-table
				.config=${this._tableConfig}
				.columns=${this._tableColumns}
				.items=${this._tableItems}
			></umb-table>
			${o(this, s, k).call(this)}
		`;
  }
};
h = /* @__PURE__ */ new WeakMap();
s = /* @__PURE__ */ new WeakSet();
P = function() {
  d(this, h) && this.observe(d(this, h).unique, (t) => {
    t && o(this, s, b).call(this, t);
  }, "umbCollectionItemsObserver");
};
b = async function(t) {
  this._loading = !0;
  const { data: e } = await T(this, E.getPageLinks({ path: { id: t } }));
  e && (this._links = e, this._currentPage = 1, o(this, s, m).call(this)), this._loading = !1;
};
m = function() {
  const t = (this._currentPage - 1) * f, e = this._links.slice(t, t + f);
  this._tableItems = e.map((i) => ({
    id: i.unique,
    data: [
      { columnAlias: "url", value: i.url },
      { columnAlias: "type", value: c`${i.isExternal ? "External" : "Internal"}` }
    ]
  }));
};
y = function(t) {
  this._currentPage !== t.target.current && (this._currentPage = t.target.current, o(this, s, m).call(this));
};
k = function() {
  const t = Math.ceil(this._links.length / f);
  return t <= 1 ? x : c`
			<div class="pagination">
				<uui-pagination .total=${t} .current=${this._currentPage} @change=${o(this, s, y)}></uui-pagination>
			</div>
		`;
};
a.styles = [
  S,
  L`
			:host {
				display: block;
				padding: var(--uui-size-layout-1);
			}

			.pagination {
				display: flex;
				justify-content: center;
				margin-top: var(--uui-size-layout-1);
			}
		`
];
r([
  l()
], a.prototype, "_links", 2);
r([
  l()
], a.prototype, "_loading", 2);
r([
  l()
], a.prototype, "_currentPage", 2);
r([
  l()
], a.prototype, "_tableConfig", 2);
r([
  l()
], a.prototype, "_tableColumns", 2);
r([
  l()
], a.prototype, "_tableItems", 2);
a = r([
  w("content-audit-all-pages-links-workspace-view")
], a);
const R = a;
export {
  a as ContentAuditAllPagesLinksWorkspaceViewElement,
  R as default
};
//# sourceMappingURL=all-pages-links-workspace-view.element-DfuDOVZe.js.map
