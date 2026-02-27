import { UmbLitElement as C } from "@umbraco-cms/backoffice/lit-element";
import { t as y } from "./index-IUh43tSs.js";
import { r as p } from "./state-DW4knq5t.js";
import { CONTENT_AUDIT_ALL_PAGES_WORKSPACE_CONTEXT as w } from "./all-pages-workspace.context-CY7S7jbp.js";
import { html as n, css as A } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as I } from "@umbraco-cms/backoffice/style";
var T = Object.defineProperty, x = Object.getOwnPropertyDescriptor, d = (t) => {
  throw TypeError(t);
}, l = (t, e, a, o) => {
  for (var i = o > 1 ? void 0 : o ? x(e, a) : e, _ = t.length - 1, m; _ >= 0; _--)
    (m = t[_]) && (i = (o ? m(e, a, i) : m(i)) || i);
  return o && i && T(e, a, i), i;
}, c = (t, e, a) => e.has(t) || d("Cannot " + a), h = (t, e, a) => (c(t, e, "read from private field"), e.get(t)), f = (t, e, a) => e.has(t) ? d("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), E = (t, e, a, o) => (c(t, e, "write to private field"), e.set(t, a), a), v = (t, e, a) => (c(t, e, "access private method"), a), r, u, b, g;
let s = class extends C {
  constructor() {
    super(), f(this, u), f(this, r), this._tableConfig = {
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
      E(this, r, t), v(this, u, b).call(this);
    });
  }
  render() {
    if (!this._data) return n`<uui-box>No data available</uui-box>`;
    if (!this._data.images) return n`<uui-box>No image data available</uui-box>`;
    if (this._data.images.length == 0) return n`<uui-box>No images to report for this page</uui-box>`;
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
r = /* @__PURE__ */ new WeakMap();
u = /* @__PURE__ */ new WeakSet();
b = function() {
  h(this, r) && this.observe(h(this, r).data, (t) => {
    t && (this._data = t, v(this, u, g).call(this, this._data.images));
  }, "umbCollectionItemsObserver");
};
g = function(t) {
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
  I,
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
  y("content-audit-all-pages-images-workspace-view")
], s);
const L = s;
export {
  s as ContentAuditAllPagesImagesWorkspaceViewElement,
  L as default
};
//# sourceMappingURL=all-pages-images-workspace-view.element-Cv4uQSab.js.map
