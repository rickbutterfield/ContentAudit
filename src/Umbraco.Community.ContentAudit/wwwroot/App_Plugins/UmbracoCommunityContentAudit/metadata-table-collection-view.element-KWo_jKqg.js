import { UMB_COLLECTION_CONTEXT as w } from "@umbraco-cms/backoffice/collection";
import { html as f, css as D, state as u, customElement as I } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as T } from "@umbraco-cms/backoffice/lit-element";
var x = Object.defineProperty, A = Object.getOwnPropertyDescriptor, p = (t) => {
  throw TypeError(t);
}, r = (t, e, a, i) => {
  for (var l = i > 1 ? void 0 : i ? A(e, a) : e, c = t.length - 1, m; c >= 0; c--)
    (m = t[c]) && (l = (i ? m(e, a, l) : m(l)) || l);
  return i && l && x(e, a, l), l;
}, _ = (t, e, a) => e.has(t) || p("Cannot " + a), h = (t, e, a) => (_(t, e, "read from private field"), e.get(t)), d = (t, e, a) => e.has(t) ? p("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), E = (t, e, a, i) => (_(t, e, "write to private field"), e.set(t, a), a), v = (t, e, a) => (_(t, e, "access private method"), a), s, n, C, b;
let o = class extends T {
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
        name: "noindex",
        alias: "noindex"
      },
      {
        name: "nofollow",
        alias: "nofollow"
      }
    ], this._tableItems = [], d(this, s), this.consumeContext(w, (t) => {
      E(this, s, t), v(this, n, C).call(this);
    });
  }
  render() {
    if (this._tableItems.length !== 0)
      return f`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
s = /* @__PURE__ */ new WeakMap();
n = /* @__PURE__ */ new WeakSet();
C = function() {
  h(this, s) && this.observe(h(this, s).items, (t) => v(this, n, b).call(this, t), "umbCollectionItemsObserver");
};
b = function(t) {
  this._tableItems = t.map((e) => ({
    id: e.unique,
    data: [
      {
        columnAlias: "url",
        value: f`<a href=${"section/audit/workspace/all-pages/edit/" + e.unique}>${e.pageData.url}</a>`
      },
      {
        columnAlias: "metaTitle",
        value: e.seoData.title
      },
      {
        columnAlias: "metaDescription",
        value: e.seoData.metaDescription
      },
      {
        columnAlias: "noindex",
        value: e.seoData.hasNoIndex ? "Yes" : "No"
      },
      {
        columnAlias: "nofollow",
        value: e.seoData.hasNoFollow ? "Yes" : "No"
      }
    ]
  }));
};
o.styles = [
  D`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
r([
  u()
], o.prototype, "_tableConfig", 2);
r([
  u()
], o.prototype, "_tableColumns", 2);
r([
  u()
], o.prototype, "_tableItems", 2);
o = r([
  I("content-audit-metadata-table-collection-view")
], o);
const N = o;
export {
  o as ContentAuditMetdataTableCollectionViewElement,
  N as default
};
//# sourceMappingURL=metadata-table-collection-view.element-KWo_jKqg.js.map
