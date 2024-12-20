import { UMB_COLLECTION_CONTEXT as w } from "@umbraco-cms/backoffice/collection";
import { html as p, css as y, state as u, customElement as T } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as I } from "@umbraco-cms/backoffice/lit-element";
var E = Object.defineProperty, M = Object.getOwnPropertyDescriptor, v = (e) => {
  throw TypeError(e);
}, r = (e, t, a, l) => {
  for (var i = l > 1 ? void 0 : l ? M(t, a) : t, c = e.length - 1, m; c >= 0; c--)
    (m = e[c]) && (i = (l ? m(t, a, i) : m(i)) || i);
  return l && i && E(t, a, i), i;
}, _ = (e, t, a) => t.has(e) || v("Cannot " + a), h = (e, t, a) => (_(e, t, "read from private field"), t.get(e)), d = (e, t, a) => t.has(e) ? v("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), A = (e, t, a, l) => (_(e, t, "write to private field"), t.set(e, a), a), f = (e, t, a) => (_(e, t, "access private method"), a), n, o, C, b;
let s = class extends I {
  constructor() {
    super(), d(this, o), this._tableConfig = {
      allowSelection: !1,
      hideIcon: !0
    }, this._tableColumns = [
      {
        name: "URL",
        alias: "url"
      },
      {
        name: "Meta Title",
        alias: "metaTitle"
      },
      {
        name: "Meta Description",
        alias: "metaDescription"
      },
      {
        name: "Meta Keywords",
        alias: "metaKeywords"
      }
    ], this._tableItems = [], d(this, n), this.consumeContext(w, (e) => {
      A(this, n, e), f(this, o, C).call(this);
    });
  }
  render() {
    if (this._tableItems.length !== 0)
      return p`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
n = /* @__PURE__ */ new WeakMap();
o = /* @__PURE__ */ new WeakSet();
C = function() {
  h(this, n) && this.observe(h(this, n).items, (e) => f(this, o, b).call(this, e), "umbCollectionItemsObserver");
};
b = function(e) {
  this._tableItems = e.map((t) => ({
    id: t.unique,
    entityType: t.entityType,
    icon: "icon-alert",
    data: [
      {
        columnAlias: "url",
        value: p`<a href="section/content/workspace/document/edit/${t.unique}">${t.url}</a>`
      },
      {
        columnAlias: "metaTitle",
        value: t.metaTitle
      },
      {
        columnAlias: "metaDescription",
        value: t.metaDescription
      },
      {
        columnAlias: "metaKeywords",
        value: t.metaKeywords
      }
    ]
  }));
};
s.styles = [
  y`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
r([
  u()
], s.prototype, "_tableConfig", 2);
r([
  u()
], s.prototype, "_tableColumns", 2);
r([
  u()
], s.prototype, "_tableItems", 2);
s = r([
  T("content-audit-metadata-table-collection-view")
], s);
const $ = s;
export {
  s as ContentAuditMetdataTableCollectionViewElement,
  $ as default
};
//# sourceMappingURL=metadata-table-collection-view.element-B1OpfGY7.js.map
