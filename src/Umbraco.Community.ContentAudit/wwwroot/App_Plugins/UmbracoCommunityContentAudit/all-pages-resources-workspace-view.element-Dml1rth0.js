import { UmbLitElement as g } from "@umbraco-cms/backoffice/lit-element";
import { t as y } from "./index-CQIca5UD.js";
import { r as p } from "./state-CrDZInRq.js";
import { CONTENT_AUDIT_ALL_PAGES_WORKSPACE_CONTEXT as w } from "./all-pages-workspace.context-CNI3Iq01.js";
import { html as n, css as A } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as T } from "@umbraco-cms/backoffice/style";
var x = Object.defineProperty, E = Object.getOwnPropertyDescriptor, d = (t) => {
  throw TypeError(t);
}, l = (t, e, a, o) => {
  for (var r = o > 1 ? void 0 : o ? E(e, a) : e, _ = t.length - 1, c; _ >= 0; _--)
    (c = t[_]) && (r = (o ? c(e, a, r) : c(r)) || r);
  return o && r && x(e, a, r), r;
}, h = (t, e, a) => e.has(t) || d("Cannot " + a), m = (t, e, a) => (h(t, e, "read from private field"), e.get(t)), f = (t, e, a) => e.has(t) ? d("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), I = (t, e, a, o) => (h(t, e, "write to private field"), e.set(t, a), a), v = (t, e, a) => (h(t, e, "access private method"), a), i, u, b, C;
let s = class extends g {
  constructor() {
    super(), f(this, u), f(this, i), this._tableConfig = {
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
      I(this, i, t), v(this, u, b).call(this);
    });
  }
  render() {
    if (!this._data) return n`<uui-box>No data available</uui-box>`;
    if (!this._data.resources) return n`<uui-box>No link data available</uui-box>`;
    if (this._data.resources.length == 0) return n`<uui-box>No resources to report for this page</uui-box>`;
    if (this._tableItems.length !== 0)
      return n`
				<umb-table
					.config=${this._tableConfig}
					.columns=${this._tableColumns}
					.items=${this._tableItems}
				></umb-table>
			`;
  }
};
i = /* @__PURE__ */ new WeakMap();
u = /* @__PURE__ */ new WeakSet();
b = function() {
  m(this, i) && this.observe(m(this, i).data, (t) => {
    t && (this._data = t, v(this, u, C).call(this, this._data.resources));
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
l([
  p()
], s.prototype, "_data", 2);
l([
  p()
], s.prototype, "_tableConfig", 2);
l([
  p()
], s.prototype, "_tableColumns", 2);
l([
  p()
], s.prototype, "_tableItems", 2);
s = l([
  y("content-audit-all-pages-resources-workspace-view")
], s);
const R = s;
export {
  s as ContentAuditAllPagesResourcesWorkspaceViewElement,
  R as default
};
//# sourceMappingURL=all-pages-resources-workspace-view.element-Dml1rth0.js.map
