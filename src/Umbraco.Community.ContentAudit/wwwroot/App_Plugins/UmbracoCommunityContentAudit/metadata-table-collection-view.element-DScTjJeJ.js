import { UMB_COLLECTION_CONTEXT as D } from "@umbraco-cms/backoffice/collection";
import { html as b, css as T, state as f, customElement as I } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as x } from "@umbraco-cms/backoffice/lit-element";
import { UmbModalRouteRegistrationController as E } from "@umbraco-cms/backoffice/router";
import { UMB_WORKSPACE_MODAL as M } from "@umbraco-cms/backoffice/workspace";
var O = Object.defineProperty, y = Object.getOwnPropertyDescriptor, w = (e) => {
  throw TypeError(e);
}, m = (e, t, a, o) => {
  for (var i = o > 1 ? void 0 : o ? y(t, a) : t, c = e.length - 1, u; c >= 0; c--)
    (u = e[c]) && (i = (o ? u(t, a, i) : u(i)) || i);
  return o && i && O(t, a, i), i;
}, v = (e, t, a) => t.has(e) || w("Cannot " + a), _ = (e, t, a) => (v(e, t, "read from private field"), t.get(e)), h = (e, t, a) => t.has(e) ? w("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), C = (e, t, a, o) => (v(e, t, "write to private field"), t.set(e, a), a), d = (e, t, a) => (v(e, t, "access private method"), a), n, r, s, p, A;
let l = class extends x {
  constructor() {
    super(), h(this, s), this._tableConfig = {
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
    ], this._tableItems = [], h(this, n), h(this, r, ""), new E(this, M).addAdditionalPath("all-pages").onSetup(() => ({ data: { entityType: "all-pages", preset: {} } })).observeRouteBuilder((e) => {
      C(this, r, e({})), d(this, s, p).call(this);
    }), this.consumeContext(D, (e) => {
      C(this, n, e), d(this, s, p).call(this);
    });
  }
  render() {
    if (this._tableItems.length !== 0)
      return b`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
n = /* @__PURE__ */ new WeakMap();
r = /* @__PURE__ */ new WeakMap();
s = /* @__PURE__ */ new WeakSet();
p = function() {
  _(this, n) && this.observe(_(this, n).items, (e) => d(this, s, A).call(this, e), "umbCollectionItemsObserver");
};
A = function(e) {
  this._tableItems = e.map((t) => ({
    id: t.unique,
    data: [
      {
        columnAlias: "url",
        value: b`<a href=${_(this, r) + "edit/" + t.unique}>${t.pageData.url}</a>`
      },
      {
        columnAlias: "metaTitle",
        value: t.seoData.title
      },
      {
        columnAlias: "metaDescription",
        value: t.seoData.metaDescription
      },
      {
        columnAlias: "noindex",
        value: t.seoData.hasNoIndex ? "Yes" : "No"
      },
      {
        columnAlias: "nofollow",
        value: t.seoData.hasNoFollow ? "Yes" : "No"
      }
    ]
  }));
};
l.styles = [
  T`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
m([
  f()
], l.prototype, "_tableConfig", 2);
m([
  f()
], l.prototype, "_tableColumns", 2);
m([
  f()
], l.prototype, "_tableItems", 2);
l = m([
  I("content-audit-metadata-table-collection-view")
], l);
const R = l;
export {
  l as ContentAuditMetdataTableCollectionViewElement,
  R as default
};
//# sourceMappingURL=metadata-table-collection-view.element-DScTjJeJ.js.map
