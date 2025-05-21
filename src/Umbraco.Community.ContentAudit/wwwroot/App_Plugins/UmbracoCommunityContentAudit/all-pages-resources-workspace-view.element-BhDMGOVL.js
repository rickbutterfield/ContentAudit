import { UmbLitElement as g } from "@umbraco-cms/backoffice/lit-element";
import { t as y } from "./index-BPPQFFw-.js";
import { r as c } from "./state-C_e_iIjQ.js";
import { CONTENT_AUDIT_ALL_PAGES_WORKSPACE_CONTEXT as w } from "./all-pages-workspace.context-DxsO9NbV.js";
import { html as u, css as A } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as T } from "@umbraco-cms/backoffice/style";
var x = Object.defineProperty, E = Object.getOwnPropertyDescriptor, b = (t) => {
  throw TypeError(t);
}, n = (t, e, a, i) => {
  for (var r = i > 1 ? void 0 : i ? E(e, a) : e, p = t.length - 1, _; p >= 0; p--)
    (_ = t[p]) && (r = (i ? _(e, a, r) : _(r)) || r);
  return i && r && x(e, a, r), r;
}, m = (t, e, a) => e.has(t) || b("Cannot " + a), f = (t, e, a) => (m(t, e, "read from private field"), e.get(t)), v = (t, e, a) => e.has(t) ? b("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), I = (t, e, a, i) => (m(t, e, "write to private field"), e.set(t, a), a), h = (t, e, a) => (m(t, e, "access private method"), a), l, o, C, d;
let s = class extends g {
  constructor() {
    super(), v(this, o), v(this, l), this._tableConfig = {
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
    ], this._tableItems = [], this.consumeContext(w, (t) => {
      I(this, l, t), h(this, o, C).call(this);
    });
  }
  updated(t) {
    var e;
    t.has("data") && this._data && ((e = this._data) == null ? void 0 : e.resources.length) !== 0 && h(this, o, d).call(this, this._data.resources);
  }
  render() {
    if (!this._data) return u`<uui-box>No data available</uui-box>`;
    if (!this._data.resources) return u`<uui-box>No link data available</uui-box>`;
    if (this._data.resources.length == 0) return u`<uui-box>No resources to report for this page</uui-box>`;
    if (this._tableItems.length !== 0)
      return u`
				<umb-table
					.config=${this._tableConfig}
					.columns=${this._tableColumns}
					.items=${this._tableItems}
				></umb-table>
			`;
  }
};
l = /* @__PURE__ */ new WeakMap();
o = /* @__PURE__ */ new WeakSet();
C = function() {
  f(this, l) && this.observe(f(this, l).data, (t) => {
    t && (this._data = t, h(this, o, d).call(this, this._data.resources));
  }, "umbCollectionItemsObserver");
};
d = function(t) {
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
  T,
  A`
			:host {
				display: block;
				padding: var(--uui-size-layout-1);
			}
		`
];
n([
  c()
], s.prototype, "_data", 2);
n([
  c()
], s.prototype, "_tableConfig", 2);
n([
  c()
], s.prototype, "_tableColumns", 2);
n([
  c()
], s.prototype, "_tableItems", 2);
s = n([
  y("content-audit-all-pages-resources-workspace-view")
], s);
const R = s;
export {
  s as ContentAuditAllPagesResourcesWorkspaceViewElement,
  R as default
};
//# sourceMappingURL=all-pages-resources-workspace-view.element-BhDMGOVL.js.map
