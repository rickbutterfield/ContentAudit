import { UMB_COLLECTION_CONTEXT as I } from "@umbraco-cms/backoffice/collection";
import { html as v, css as w, state as u, customElement as A } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as y } from "@umbraco-cms/backoffice/lit-element";
var E = Object.defineProperty, g = Object.getOwnPropertyDescriptor, d = (e) => {
  throw TypeError(e);
}, r = (e, t, a, o) => {
  for (var l = o > 1 ? void 0 : o ? g(t, a) : t, c = e.length - 1, m; c >= 0; c--)
    (m = e[c]) && (l = (o ? m(t, a, l) : m(l)) || l);
  return o && l && E(t, a, l), l;
}, _ = (e, t, a) => t.has(e) || d("Cannot " + a), h = (e, t, a) => (_(e, t, "read from private field"), t.get(e)), p = (e, t, a) => t.has(e) ? d("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), x = (e, t, a, o) => (_(e, t, "write to private field"), t.set(e, a), a), f = (e, t, a) => (_(e, t, "access private method"), a), n, i, C, b;
let s = class extends y {
  constructor() {
    super(), p(this, i), this._tableConfig = {
      allowSelection: !1,
      hideIcon: !0
    }, this._tableColumns = [
      {
        name: "Run Date",
        alias: "runDate"
      },
      {
        name: "Total URLs",
        alias: "total"
      },
      {
        name: "Internal URLs",
        alias: "totalInternal"
      },
      {
        name: "External URLs",
        alias: "totalExternal"
      },
      {
        name: "Resources",
        alias: "totalResources"
      },
      {
        name: "Images",
        alias: "totalImages"
      },
      {
        name: "Blocked",
        alias: "totalBlocked"
      }
    ], this._tableItems = [], p(this, n), this.consumeContext(I, (e) => {
      x(this, n, e), f(this, i, C).call(this);
    });
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
i = /* @__PURE__ */ new WeakSet();
C = function() {
  h(this, n) && this.observe(h(this, n).items, (e) => f(this, i, b).call(this, e), "umbCollectionItemsObserver");
};
b = function(e) {
  this._tableItems = e.map((t) => ({
    id: t.key,
    entityType: "audits",
    icon: "icon-calendar",
    data: [
      {
        columnAlias: "runDate",
        value: v`<a href=${"section/audit/workspace/audits/edit/" + t.key}>${t.runDate ? this.localize.date(new Date(t.runDate), { dateStyle: "medium", timeStyle: "short" }) : "Unknown"}</a>`
      },
      {
        columnAlias: "total",
        value: t.total ?? 0
      },
      {
        columnAlias: "totalInternal",
        value: t.totalInternal ?? 0
      },
      {
        columnAlias: "totalExternal",
        value: t.totalExternal ?? 0
      },
      {
        columnAlias: "totalResources",
        value: t.totalResources ?? 0
      },
      {
        columnAlias: "totalImages",
        value: t.totalImages ?? 0
      },
      {
        columnAlias: "totalBlocked",
        value: t.totalBlocked ?? 0
      }
    ]
  }));
};
s.styles = [
  w`
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
  A("content-audit-audits-table-collection-view")
], s);
const R = s;
export {
  s as ContentAuditAuditsTableCollectionViewElement,
  R as default
};
//# sourceMappingURL=audits-table-collection-view.element-D-WAsCPJ.js.map
