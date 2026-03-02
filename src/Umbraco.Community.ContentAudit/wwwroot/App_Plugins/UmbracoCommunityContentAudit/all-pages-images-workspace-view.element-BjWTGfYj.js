import { UmbLitElement as I } from "@umbraco-cms/backoffice/lit-element";
import { A as w, t as E } from "./index-BUsZH3tI.js";
import { r as l } from "./state-C-6jRtm-.js";
import { CONTENT_AUDIT_ALL_PAGES_WORKSPACE_CONTEXT as T } from "./all-pages-workspace.context-DEWmO3Vr.js";
import { html as h, nothing as x, css as S } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as O } from "@umbraco-cms/backoffice/style";
import { tryExecute as W } from "@umbraco-cms/backoffice/resources";
var $ = Object.defineProperty, k = Object.getOwnPropertyDescriptor, C = (t) => {
  throw TypeError(t);
}, n = (t, e, a, u) => {
  for (var r = u > 1 ? void 0 : u ? k(e, a) : e, p = t.length - 1, _; p >= 0; p--)
    (_ = t[p]) && (r = (u ? _(e, a, r) : _(r)) || r);
  return u && r && $(e, a, r), r;
}, m = (t, e, a) => e.has(t) || C("Cannot " + a), d = (t, e, a) => (m(t, e, "read from private field"), e.get(t)), v = (t, e, a) => e.has(t) ? C("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), L = (t, e, a, u) => (m(t, e, "write to private field"), e.set(t, a), a), o = (t, e, a) => (m(t, e, "access private method"), a), c, s, y, P, f, b, A;
const g = 50;
let i = class extends I {
  constructor() {
    super(), v(this, s), this._images = [], this._loading = !0, this._currentPage = 1, v(this, c), this._tableConfig = {
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
    ], this._tableItems = [], this.consumeContext(T, (t) => {
      L(this, c, t), o(this, s, y).call(this);
    });
  }
  render() {
    return this._loading ? h`<uui-loader-bar></uui-loader-bar>` : this._images.length == 0 ? h`<uui-box>No images to report for this page</uui-box>` : h`
			<umb-table
				.config=${this._tableConfig}
				.columns=${this._tableColumns}
				.items=${this._tableItems}
			></umb-table>
			${o(this, s, A).call(this)}
		`;
  }
};
c = /* @__PURE__ */ new WeakMap();
s = /* @__PURE__ */ new WeakSet();
y = function() {
  d(this, c) && this.observe(d(this, c).unique, (t) => {
    t && o(this, s, P).call(this, t);
  }, "umbCollectionItemsObserver");
};
P = async function(t) {
  this._loading = !0;
  const { data: e } = await W(this, w.getPageImages({ path: { id: t } }));
  e && (this._images = e, this._currentPage = 1, o(this, s, f).call(this)), this._loading = !1;
};
f = function() {
  const t = (this._currentPage - 1) * g, e = this._images.slice(t, t + g);
  this._tableItems = e.map((a) => ({
    id: a.unique,
    data: [
      { columnAlias: "url", value: a.url },
      { columnAlias: "contentType", value: a.contentType }
    ]
  }));
};
b = function(t) {
  this._currentPage !== t.target.current && (this._currentPage = t.target.current, o(this, s, f).call(this));
};
A = function() {
  const t = Math.ceil(this._images.length / g);
  return t <= 1 ? x : h`
			<div class="pagination">
				<uui-pagination .total=${t} .current=${this._currentPage} @change=${o(this, s, b)}></uui-pagination>
			</div>
		`;
};
i.styles = [
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
n([
  l()
], i.prototype, "_images", 2);
n([
  l()
], i.prototype, "_loading", 2);
n([
  l()
], i.prototype, "_currentPage", 2);
n([
  l()
], i.prototype, "_tableConfig", 2);
n([
  l()
], i.prototype, "_tableColumns", 2);
n([
  l()
], i.prototype, "_tableItems", 2);
i = n([
  E("content-audit-all-pages-images-workspace-view")
], i);
const R = i;
export {
  i as ContentAuditAllPagesImagesWorkspaceViewElement,
  R as default
};
//# sourceMappingURL=all-pages-images-workspace-view.element-BjWTGfYj.js.map
