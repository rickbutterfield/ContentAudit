import { UMB_COLLECTION_CONTEXT as E } from "@umbraco-cms/backoffice/collection";
import { html as v, css as A, state as h, customElement as D } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as M } from "@umbraco-cms/backoffice/lit-element";
import { UMB_EDIT_DOCUMENT_WORKSPACE_PATH_PATTERN as I } from "@umbraco-cms/backoffice/document";
import { UmbModalRouteRegistrationController as O } from "@umbraco-cms/backoffice/router";
import { UMB_WORKSPACE_MODAL as x } from "@umbraco-cms/backoffice/workspace";
var P = Object.defineProperty, R = Object.getOwnPropertyDescriptor, C = (t) => {
  throw TypeError(t);
}, r = (t, e, a, o) => {
  for (var i = o > 1 ? void 0 : o ? R(e, a) : e, m = t.length - 1, c; m >= 0; m--)
    (c = t[m]) && (i = (o ? c(e, a, i) : c(i)) || i);
  return o && i && P(e, a, i), i;
}, p = (t, e, a) => e.has(t) || C("Cannot " + a), d = (t, e, a) => (p(t, e, "read from private field"), e.get(t)), _ = (t, e, a) => e.has(t) ? C("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), b = (t, e, a, o) => (p(t, e, "write to private field"), e.set(t, a), a), f = (t, e, a) => (p(t, e, "access private method"), a), n, u, s, T, w, y;
let l = class extends M {
  constructor() {
    super(), _(this, s), this._tableConfig = {
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
    ], this._tableItems = [], _(this, n), _(this, u), this.consumeContext(E, (t) => {
      b(this, n, t);
    }), f(this, s, T).call(this);
  }
  render() {
    if (this._tableItems.length !== 0)
      return v`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
n = /* @__PURE__ */ new WeakMap();
u = /* @__PURE__ */ new WeakMap();
s = /* @__PURE__ */ new WeakSet();
T = function() {
  new O(this, x).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    b(this, u, t), f(this, s, w).call(this);
  });
};
w = function() {
  d(this, n) && this.observe(d(this, n).items, (t) => f(this, s, y).call(this, t), "umbCollectionItemsObserver");
};
y = function(t) {
  const e = d(this, u);
  if (!e) throw new Error("Route builder not ready");
  this._tableItems = t.map((a) => {
    const o = e({ entityType: "document" }) + I.generateLocal({ unique: a.unique });
    return {
      id: a.unique,
      data: [
        {
          columnAlias: "url",
          value: v`<a href=${o}>${a.pageData.url}</a>`
        },
        {
          columnAlias: "metaTitle",
          value: a.seoData.title
        },
        {
          columnAlias: "metaDescription",
          value: a.seoData.metaDescription
        },
        {
          columnAlias: "noindex",
          value: a.seoData.hasNoIndex ? "Yes" : "No"
        },
        {
          columnAlias: "nofollow",
          value: a.seoData.hasNoFollow ? "Yes" : "No"
        }
      ]
    };
  });
};
l.styles = [
  A`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
r([
  h()
], l.prototype, "_tableConfig", 2);
r([
  h()
], l.prototype, "_tableColumns", 2);
r([
  h()
], l.prototype, "_tableItems", 2);
l = r([
  D("content-audit-metadata-table-collection-view")
], l);
const $ = l;
export {
  l as ContentAuditMetdataTableCollectionViewElement,
  $ as default
};
//# sourceMappingURL=metadata-table-collection-view.element-Chej_Gw1.js.map
