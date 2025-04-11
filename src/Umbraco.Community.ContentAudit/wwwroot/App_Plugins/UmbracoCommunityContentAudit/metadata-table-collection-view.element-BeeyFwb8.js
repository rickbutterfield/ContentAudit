import { UMB_COLLECTION_CONTEXT as E } from "@umbraco-cms/backoffice/collection";
import { html as v, css as A, state as h, customElement as M } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as R } from "@umbraco-cms/backoffice/lit-element";
import { UMB_EDIT_DOCUMENT_WORKSPACE_PATH_PATTERN as O } from "@umbraco-cms/backoffice/document";
import { UmbModalRouteRegistrationController as I } from "@umbraco-cms/backoffice/router";
import { UMB_WORKSPACE_MODAL as P } from "@umbraco-cms/backoffice/workspace";
var D = Object.defineProperty, K = Object.getOwnPropertyDescriptor, C = (t) => {
  throw TypeError(t);
}, r = (t, e, a, i) => {
  for (var o = i > 1 ? void 0 : i ? K(e, a) : e, c = t.length - 1, u; c >= 0; c--)
    (u = t[c]) && (o = (i ? u(e, a, o) : u(o)) || o);
  return i && o && D(e, a, o), o;
}, p = (t, e, a) => e.has(t) || C("Cannot " + a), _ = (t, e, a) => (p(t, e, "read from private field"), e.get(t)), d = (t, e, a) => e.has(t) ? C("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), b = (t, e, a, i) => (p(t, e, "write to private field"), e.set(t, a), a), f = (t, e, a) => (p(t, e, "access private method"), a), n, m, s, y, T, w;
let l = class extends R {
  constructor() {
    super(), d(this, s), this._tableConfig = {
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
    ], this._tableItems = [], d(this, n), d(this, m), this.consumeContext(E, (t) => {
      b(this, n, t);
    }), f(this, s, y).call(this);
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
m = /* @__PURE__ */ new WeakMap();
s = /* @__PURE__ */ new WeakSet();
y = function() {
  new I(this, P).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    b(this, m, t), f(this, s, T).call(this);
  });
};
T = function() {
  _(this, n) && this.observe(_(this, n).items, (t) => f(this, s, w).call(this, t), "umbCollectionItemsObserver");
};
w = function(t) {
  const e = _(this, m);
  if (!e) throw new Error("Route builder not ready");
  this._tableItems = t.map((a) => {
    const i = e({ entityType: "document" }) + O.generateLocal({ unique: a.nodeKey });
    return {
      id: a.unique,
      entityType: a.entityType,
      icon: "icon-alert",
      data: [
        {
          columnAlias: "url",
          value: v`<a href=${i}>${a.url}</a>`
        },
        {
          columnAlias: "metaTitle",
          value: a.metaTitle
        },
        {
          columnAlias: "metaDescription",
          value: a.metaDescription
        },
        {
          columnAlias: "metaKeywords",
          value: a.metaKeywords
        },
        {
          columnAlias: "metaRobots",
          value: a.metaRobots
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
  M("content-audit-metadata-table-collection-view")
], l);
const $ = l;
export {
  l as ContentAuditMetdataTableCollectionViewElement,
  $ as default
};
//# sourceMappingURL=metadata-table-collection-view.element-BeeyFwb8.js.map
