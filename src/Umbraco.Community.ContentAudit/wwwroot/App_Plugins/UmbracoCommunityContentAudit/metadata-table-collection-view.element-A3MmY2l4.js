import { UMB_COLLECTION_CONTEXT as w } from "@umbraco-cms/backoffice/collection";
import { html as p, css as y, state as u, customElement as T } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as I } from "@umbraco-cms/backoffice/lit-element";
var A = Object.defineProperty, E = Object.getOwnPropertyDescriptor, v = (e) => {
  throw TypeError(e);
}, r = (e, t, a, o) => {
  for (var i = o > 1 ? void 0 : o ? E(t, a) : t, m = e.length - 1, c; m >= 0; m--)
    (c = e[m]) && (i = (o ? c(t, a, i) : c(i)) || i);
  return o && i && A(t, a, i), i;
}, _ = (e, t, a) => t.has(e) || v("Cannot " + a), h = (e, t, a) => (_(e, t, "read from private field"), t.get(e)), d = (e, t, a) => t.has(e) ? v("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), O = (e, t, a, o) => (_(e, t, "write to private field"), t.set(e, a), a), f = (e, t, a) => (_(e, t, "access private method"), a), l, n, b, C;
let s = class extends I {
  constructor() {
    super(), d(this, n), this._tableConfig = {
      allowSelection: !1,
      hideIcon: !0
    }, this._tableColumns = [
      {
        name: "URL",
        alias: "url"
      },
      {
        name: "Title",
        alias: "metaTitle"
      },
      {
        name: "Description",
        alias: "metaDescription"
      },
      {
        name: "Keywords",
        alias: "metaKeywords"
      },
      {
        name: "Robots",
        alias: "metaRobots"
      }
    ], this._tableItems = [], d(this, l), this.consumeContext(w, (e) => {
      O(this, l, e), f(this, n, b).call(this);
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
l = /* @__PURE__ */ new WeakMap();
n = /* @__PURE__ */ new WeakSet();
b = function() {
  h(this, l) && this.observe(h(this, l).items, (e) => f(this, n, C).call(this, e), "umbCollectionItemsObserver");
};
C = function(e) {
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
      },
      {
        columnAlias: "metaRobots",
        value: t.metaRobots
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
//# sourceMappingURL=metadata-table-collection-view.element-A3MmY2l4.js.map
