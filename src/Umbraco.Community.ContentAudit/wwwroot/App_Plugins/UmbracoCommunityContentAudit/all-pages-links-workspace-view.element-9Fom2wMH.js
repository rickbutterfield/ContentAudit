import { UmbLitElement as g } from "@umbraco-cms/backoffice/lit-element";
import { t as w } from "./index-QfE00jYe.js";
import { r as p } from "./state-BzmnrHIF.js";
import { CONTENT_AUDIT_ALL_PAGES_WORKSPACE_CONTEXT as x } from "./all-pages-workspace.context-B73NURAJ.js";
import { html as o, css as y } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as A } from "@umbraco-cms/backoffice/style";
var k = Object.defineProperty, E = Object.getOwnPropertyDescriptor, d = (t) => {
  throw TypeError(t);
}, n = (t, e, a, r) => {
  for (var i = r > 1 ? void 0 : r ? E(e, a) : e, _ = t.length - 1, h; _ >= 0; _--)
    (h = t[_]) && (i = (r ? h(e, a, i) : h(i)) || i);
  return r && i && k(e, a, i), i;
}, c = (t, e, a) => e.has(t) || d("Cannot " + a), m = (t, e, a) => (c(t, e, "read from private field"), e.get(t)), f = (t, e, a) => e.has(t) ? d("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), I = (t, e, a, r) => (c(t, e, "write to private field"), e.set(t, a), a), v = (t, e, a) => (c(t, e, "access private method"), a), l, u, b, C;
let s = class extends g {
  constructor() {
    super(), f(this, u), f(this, l), this._tableConfig = {
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
    ], this._tableItems = [], this.consumeContext(x, (t) => {
      I(this, l, t), v(this, u, b).call(this);
    });
  }
  render() {
    return this._data ? this._data.links ? this._data.links.length == 0 ? o`<uui-box>No links to report for this page</uui-box>` : o`
			<umb-table
				.config=${this._tableConfig}
				.columns=${this._tableColumns}
				.items=${this._tableItems}
			></umb-table>
		` : o`<uui-box>No link data available</uui-box>` : o`<uui-box>No data available</uui-box>`;
  }
};
l = /* @__PURE__ */ new WeakMap();
u = /* @__PURE__ */ new WeakSet();
b = function() {
  m(this, l) && this.observe(m(this, l).data, (t) => {
    t && (this._data = t, v(this, u, C).call(this, this._data.links));
  }, "umbCollectionItemsObserver");
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
        value: o`${e.isExternal ? "External" : "Internal"}`
      }
    ]
  }));
};
s.styles = [
  A,
  y`
			:host {
				display: block;
				padding: var(--uui-size-layout-1);
			}
		`
];
n([
  p()
], s.prototype, "_data", 2);
n([
  p()
], s.prototype, "_tableConfig", 2);
n([
  p()
], s.prototype, "_tableColumns", 2);
n([
  p()
], s.prototype, "_tableItems", 2);
s = n([
  w("content-audit-all-pages-links-workspace-view")
], s);
const N = s;
export {
  s as ContentAuditAllPagesLinksWorkspaceViewElement,
  N as default
};
//# sourceMappingURL=all-pages-links-workspace-view.element-9Fom2wMH.js.map
