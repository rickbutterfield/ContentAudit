import { UmbLitElement as g } from "@umbraco-cms/backoffice/lit-element";
import { t as k } from "./index-u7WOYzpE.js";
import { r as p } from "./state-DMHfRO1s.js";
import { CONTENT_AUDIT_ALL_PAGES_WORKSPACE_CONTEXT as w } from "./all-pages-workspace.context-jIiMw91l.js";
import { html as l, css as x } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as y } from "@umbraco-cms/backoffice/style";
var A = Object.defineProperty, E = Object.getOwnPropertyDescriptor, b = (t) => {
  throw TypeError(t);
}, u = (t, e, a, r) => {
  for (var s = r > 1 ? void 0 : r ? E(e, a) : e, _ = t.length - 1, h; _ >= 0; _--)
    (h = t[_]) && (s = (r ? h(e, a, s) : h(s)) || s);
  return r && s && A(e, a, s), s;
}, d = (t, e, a) => e.has(t) || b("Cannot " + a), f = (t, e, a) => (d(t, e, "read from private field"), e.get(t)), v = (t, e, a) => e.has(t) ? b("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), I = (t, e, a, r) => (d(t, e, "write to private field"), e.set(t, a), a), c = (t, e, a) => (d(t, e, "access private method"), a), n, o, C, m;
let i = class extends g {
  constructor() {
    super(), v(this, o), v(this, n), this._tableConfig = {
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
      I(this, n, t), c(this, o, C).call(this);
    });
  }
  updated(t) {
    var e;
    t.has("data") && this._data && ((e = this._data) == null ? void 0 : e.links.length) !== 0 && c(this, o, m).call(this, this._data.links);
  }
  render() {
    return this._data ? this._data.links ? this._data.links.length == 0 ? l`<uui-box>No links to report for this page</uui-box>` : l`
			<umb-table
				.config=${this._tableConfig}
				.columns=${this._tableColumns}
				.items=${this._tableItems}
			></umb-table>
		` : l`<uui-box>No link data available</uui-box>` : l`<uui-box>No data available</uui-box>`;
  }
};
n = /* @__PURE__ */ new WeakMap();
o = /* @__PURE__ */ new WeakSet();
C = function() {
  f(this, n) && this.observe(f(this, n).data, (t) => {
    t && (this._data = t, c(this, o, m).call(this, this._data.links));
  }, "umbCollectionItemsObserver");
};
m = function(t) {
  this._tableItems = t.map((e) => ({
    id: e.unique,
    data: [
      {
        columnAlias: "url",
        value: e.url
      },
      {
        columnAlias: "type",
        value: l`${e.isExternal ? "External" : "Internal"}`
      }
    ]
  }));
};
i.styles = [
  y,
  x`
			:host {
				display: block;
				padding: var(--uui-size-layout-1);
			}
		`
];
u([
  p()
], i.prototype, "_data", 2);
u([
  p()
], i.prototype, "_tableConfig", 2);
u([
  p()
], i.prototype, "_tableColumns", 2);
u([
  p()
], i.prototype, "_tableItems", 2);
i = u([
  k("content-audit-all-pages-links-workspace-view")
], i);
const N = i;
export {
  i as ContentAuditAllPagesLinksWorkspaceViewElement,
  N as default
};
//# sourceMappingURL=all-pages-links-workspace-view.element-B5eSbBW2.js.map
