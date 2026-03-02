import { UmbLitElement as w } from "@umbraco-cms/backoffice/lit-element";
import { A as E, t as T } from "./index-BUsZH3tI.js";
import { r as l } from "./state-C-6jRtm-.js";
import { CONTENT_AUDIT_ALL_PAGES_WORKSPACE_CONTEXT as I } from "./all-pages-workspace.context-DEWmO3Vr.js";
import { html as h, nothing as x, css as S } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as O } from "@umbraco-cms/backoffice/style";
import { tryExecute as R } from "@umbraco-cms/backoffice/resources";
var W = Object.defineProperty, $ = Object.getOwnPropertyDescriptor, C = (t) => {
  throw TypeError(t);
}, o = (t, e, s, u) => {
  for (var i = u > 1 ? void 0 : u ? $(e, s) : e, p = t.length - 1, _; p >= 0; p--)
    (_ = t[p]) && (i = (u ? _(e, s, i) : _(i)) || i);
  return u && i && W(e, s, i), i;
}, g = (t, e, s) => e.has(t) || C("Cannot " + s), d = (t, e, s) => (g(t, e, "read from private field"), e.get(t)), v = (t, e, s) => e.has(t) ? C("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), k = (t, e, s, u) => (g(t, e, "write to private field"), e.set(t, s), s), n = (t, e, s) => (g(t, e, "access private method"), s), c, a, y, P, m, b, A;
const f = 50;
let r = class extends w {
  constructor() {
    super(), v(this, a), this._resources = [], this._loading = !0, this._currentPage = 1, v(this, c), this._tableConfig = {
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
    ], this._tableItems = [], this.consumeContext(I, (t) => {
      k(this, c, t), n(this, a, y).call(this);
    });
  }
  render() {
    return this._loading ? h`<uui-loader-bar></uui-loader-bar>` : this._resources.length == 0 ? h`<uui-box>No resources to report for this page</uui-box>` : h`
			<umb-table
				.config=${this._tableConfig}
				.columns=${this._tableColumns}
				.items=${this._tableItems}
			></umb-table>
			${n(this, a, A).call(this)}
		`;
  }
};
c = /* @__PURE__ */ new WeakMap();
a = /* @__PURE__ */ new WeakSet();
y = function() {
  d(this, c) && this.observe(d(this, c).unique, (t) => {
    t && n(this, a, P).call(this, t);
  }, "umbCollectionItemsObserver");
};
P = async function(t) {
  this._loading = !0;
  const { data: e } = await R(this, E.getPageResources({ path: { id: t } }));
  e && (this._resources = e, this._currentPage = 1, n(this, a, m).call(this)), this._loading = !1;
};
m = function() {
  const t = (this._currentPage - 1) * f, e = this._resources.slice(t, t + f);
  this._tableItems = e.map((s) => ({
    id: s.unique,
    data: [
      { columnAlias: "url", value: s.url },
      { columnAlias: "contentType", value: s.contentType }
    ]
  }));
};
b = function(t) {
  this._currentPage !== t.target.current && (this._currentPage = t.target.current, n(this, a, m).call(this));
};
A = function() {
  const t = Math.ceil(this._resources.length / f);
  return t <= 1 ? x : h`
			<div class="pagination">
				<uui-pagination .total=${t} .current=${this._currentPage} @change=${n(this, a, b)}></uui-pagination>
			</div>
		`;
};
r.styles = [
  O,
  S`
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
o([
  l()
], r.prototype, "_resources", 2);
o([
  l()
], r.prototype, "_loading", 2);
o([
  l()
], r.prototype, "_currentPage", 2);
o([
  l()
], r.prototype, "_tableConfig", 2);
o([
  l()
], r.prototype, "_tableColumns", 2);
o([
  l()
], r.prototype, "_tableItems", 2);
r = o([
  T("content-audit-all-pages-resources-workspace-view")
], r);
const z = r;
export {
  r as ContentAuditAllPagesResourcesWorkspaceViewElement,
  z as default
};
//# sourceMappingURL=all-pages-resources-workspace-view.element-CsuIQtJ9.js.map
