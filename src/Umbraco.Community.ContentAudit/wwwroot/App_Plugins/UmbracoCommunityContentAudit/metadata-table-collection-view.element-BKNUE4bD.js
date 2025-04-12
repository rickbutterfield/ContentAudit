import { UMB_COLLECTION_CONTEXT as E } from "@umbraco-cms/backoffice/collection";
import { html as C, css as M, state as h, customElement as O } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as A } from "@umbraco-cms/backoffice/lit-element";
import { UMB_EDIT_DOCUMENT_WORKSPACE_PATH_PATTERN as I } from "@umbraco-cms/backoffice/document";
import { UmbModalRouteRegistrationController as R } from "@umbraco-cms/backoffice/router";
import { UMB_WORKSPACE_MODAL as P } from "@umbraco-cms/backoffice/workspace";
var g = Object.defineProperty, D = Object.getOwnPropertyDescriptor, v = (t) => {
  throw TypeError(t);
}, l = (t, e, a, i) => {
  for (var o = i > 1 ? void 0 : i ? D(e, a) : e, c = t.length - 1, u; c >= 0; c--)
    (u = t[c]) && (o = (i ? u(e, a, o) : u(o)) || o);
  return i && o && g(e, a, o), o;
}, p = (t, e, a) => e.has(t) || v("Cannot " + a), d = (t, e, a) => (p(t, e, "read from private field"), e.get(t)), _ = (t, e, a) => e.has(t) ? v("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), b = (t, e, a, i) => (p(t, e, "write to private field"), e.set(t, a), a), f = (t, e, a) => (p(t, e, "access private method"), a), r, m, s, y, T, w;
let n = class extends A {
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
        name: "Keywords",
        alias: "metaKeywords"
      },
      {
        name: "Robots",
        alias: "metaRobots"
      }
    ], this._tableItems = [], _(this, r), _(this, m), this.consumeContext(E, (t) => {
      b(this, r, t);
    }), f(this, s, y).call(this);
  }
  render() {
    if (this._tableItems.length !== 0)
      return C`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
r = /* @__PURE__ */ new WeakMap();
m = /* @__PURE__ */ new WeakMap();
s = /* @__PURE__ */ new WeakSet();
y = function() {
  new R(this, P).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    b(this, m, t), f(this, s, T).call(this);
  });
};
T = function() {
  d(this, r) && this.observe(d(this, r).items, (t) => f(this, s, w).call(this, t), "umbCollectionItemsObserver");
};
w = function(t) {
  const e = d(this, m);
  if (!e) throw new Error("Route builder not ready");
  this._tableItems = t.map((a) => {
    const i = e({ entityType: "document" }) + I.generateLocal({ unique: a.nodeKey });
    return {
      id: a.unique,
      entityType: a.entityType,
      icon: "icon-alert",
      data: [
        {
          columnAlias: "url",
          value: C`<a href=${i}>${a.url}</a>`
        }
        //{
        //    columnAlias: 'metaTitle',
        //    value: page.metaTitle
        //},
        //{
        //    columnAlias: 'metaDescription',
        //    value: page.metaDescription
        //},
        //{
        //    columnAlias: 'metaKeywords',
        //    value: page.metaKeywords
        //},
        //{
        //    columnAlias: 'metaRobots',
        //    value: page.metaRobots
        //}
      ]
    };
  });
};
n.styles = [
  M`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
l([
  h()
], n.prototype, "_tableConfig", 2);
l([
  h()
], n.prototype, "_tableColumns", 2);
l([
  h()
], n.prototype, "_tableItems", 2);
n = l([
  O("content-audit-metadata-table-collection-view")
], n);
const $ = n;
export {
  n as ContentAuditMetdataTableCollectionViewElement,
  $ as default
};
//# sourceMappingURL=metadata-table-collection-view.element-BKNUE4bD.js.map
