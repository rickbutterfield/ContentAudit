import { UmbLitElement as C } from "@umbraco-cms/backoffice/lit-element";
import { t as y } from "./index-Ck9ugKjL.js";
import { r as p } from "./state-DxkV9maw.js";
import { CONTENT_AUDIT_ALL_PAGES_WORKSPACE_CONTEXT as w } from "./all-pages-workspace.context-BX4pQmuu.js";
import { html as u, css as A } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as I } from "@umbraco-cms/backoffice/style";
var T = Object.defineProperty, x = Object.getOwnPropertyDescriptor, b = (t) => {
  throw TypeError(t);
}, n = (t, e, a, o) => {
  for (var i = o > 1 ? void 0 : o ? x(e, a) : e, _ = t.length - 1, h; _ >= 0; _--)
    (h = t[_]) && (i = (o ? h(e, a, i) : h(i)) || i);
  return o && i && T(e, a, i), i;
}, c = (t, e, a) => e.has(t) || b("Cannot " + a), f = (t, e, a) => (c(t, e, "read from private field"), e.get(t)), v = (t, e, a) => e.has(t) ? b("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), E = (t, e, a, o) => (c(t, e, "write to private field"), e.set(t, a), a), m = (t, e, a) => (c(t, e, "access private method"), a), l, r, g, d;
let s = class extends C {
  constructor() {
    super(), v(this, r), v(this, l), this._tableConfig = {
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
      E(this, l, t), m(this, r, g).call(this);
    });
  }
  updated(t) {
    var e;
    t.has("data") && this._data && ((e = this._data) == null ? void 0 : e.images.length) !== 0 && m(this, r, d).call(this, this._data.images);
  }
  render() {
    if (!this._data) return u`<uui-box>No data available</uui-box>`;
    if (!this._data.images) return u`<uui-box>No image data available</uui-box>`;
    if (this._data.images.length == 0) return u`<uui-box>No images to report for this page</uui-box>`;
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
r = /* @__PURE__ */ new WeakSet();
g = function() {
  f(this, l) && this.observe(f(this, l).data, (t) => {
    t && (this._data = t, m(this, r, d).call(this, this._data.images));
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
  I,
  A`
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
  y("content-audit-all-pages-images-workspace-view")
], s);
const L = s;
export {
  s as ContentAuditAllPagesImagesWorkspaceViewElement,
  L as default
};
//# sourceMappingURL=all-pages-images-workspace-view.element-C9b291FP.js.map
