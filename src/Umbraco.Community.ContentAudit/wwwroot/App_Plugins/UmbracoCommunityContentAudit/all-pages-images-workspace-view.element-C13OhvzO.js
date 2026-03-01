import { UmbLitElement as y } from "@umbraco-cms/backoffice/lit-element";
import { A, t as w } from "./index-stcFC0Hx.js";
import { r as p } from "./state-Dm9341Sy.js";
import { CONTENT_AUDIT_ALL_PAGES_WORKSPACE_CONTEXT as I } from "./all-pages-workspace.context-C_4Z3Gw9.js";
import { html as m, css as T } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as E } from "@umbraco-cms/backoffice/style";
import { tryExecute as P } from "@umbraco-cms/backoffice/resources";
var x = Object.defineProperty, O = Object.getOwnPropertyDescriptor, g = (t) => {
  throw TypeError(t);
}, r = (t, e, a, o) => {
  for (var i = o > 1 ? void 0 : o ? O(e, a) : e, u = t.length - 1, _; u >= 0; u--)
    (_ = t[u]) && (i = (o ? _(e, a, i) : _(i)) || i);
  return o && i && x(e, a, i), i;
}, c = (t, e, a) => e.has(t) || g("Cannot " + a), f = (t, e, a) => (c(t, e, "read from private field"), e.get(t)), d = (t, e, a) => e.has(t) ? g("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), S = (t, e, a, o) => (c(t, e, "write to private field"), e.set(t, a), a), h = (t, e, a) => (c(t, e, "access private method"), a), n, l, v, C, b;
let s = class extends y {
  constructor() {
    super(), d(this, l), this._images = [], this._loading = !0, d(this, n), this._tableConfig = {
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
      S(this, n, t), h(this, l, v).call(this);
    });
  }
  render() {
    return this._loading ? m`<uui-loader-bar></uui-loader-bar>` : this._images.length == 0 ? m`<uui-box>No images to report for this page</uui-box>` : m`
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
v = function() {
  f(this, n) && this.observe(f(this, n).unique, (t) => {
    t && h(this, l, C).call(this, t);
  }, "umbCollectionItemsObserver");
};
C = async function(t) {
  this._loading = !0;
  const { data: e } = await P(this, A.getPageImages({ path: { id: t } }));
  e && (this._images = e, h(this, l, b).call(this, e)), this._loading = !1;
};
b = function(t) {
  this._tableItems = t.map((e) => ({
    id: e.unique,
    data: [
      {
        columnAlias: "url",
        value: e.url
      },
      {
        columnAlias: "contentType",
        value: e.contentType
      }
    ]
  }));
};
s.styles = [
  E,
  T`
			:host {
				display: block;
				padding: var(--uui-size-layout-1);
			}
		`
];
r([
  p()
], s.prototype, "_images", 2);
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
  w("content-audit-all-pages-images-workspace-view")
], s);
const $ = s;
export {
  s as ContentAuditAllPagesImagesWorkspaceViewElement,
  $ as default
};
//# sourceMappingURL=all-pages-images-workspace-view.element-C13OhvzO.js.map
