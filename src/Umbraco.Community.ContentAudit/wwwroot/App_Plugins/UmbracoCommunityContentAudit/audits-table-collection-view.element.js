import { UMB_COLLECTION_CONTEXT as A } from "@umbraco-cms/backoffice/collection";
import { html as d, css as I, state as u, customElement as w } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as y } from "@umbraco-cms/backoffice/lit-element";
var E = Object.defineProperty, x = Object.getOwnPropertyDescriptor, v = (e) => {
  throw TypeError(e);
}, r = (e, t, a, n) => {
  for (var l = n > 1 ? void 0 : n ? x(t, a) : t, c = e.length - 1, m; c >= 0; c--)
    (m = e[c]) && (l = (n ? m(t, a, l) : m(l)) || l);
  return n && l && E(t, a, l), l;
}, _ = (e, t, a) => t.has(e) || v("Cannot " + a), h = (e, t, a) => (_(e, t, "read from private field"), t.get(e)), p = (e, t, a) => t.has(e) ? v("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), T = (e, t, a, n) => (_(e, t, "write to private field"), t.set(e, a), a), f = (e, t, a) => (_(e, t, "access private method"), a), o, i, C, b;
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
        name: "Assets",
        alias: "totalAssets"
      },
      {
        name: "Blocked",
        alias: "totalBlocked"
      }
    ], this._tableItems = [], p(this, o), this.consumeContext(A, (e) => {
      T(this, o, e), f(this, i, C).call(this);
    });
  }
  render() {
    if (this._tableItems.length !== 0)
      return d`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
o = /* @__PURE__ */ new WeakMap();
i = /* @__PURE__ */ new WeakSet();
C = function() {
  h(this, o) && this.observe(h(this, o).items, (e) => f(this, i, b).call(this, e), "umbCollectionItemsObserver");
};
b = function(e) {
  this._tableItems = e.map((t) => ({
    id: t.key,
    entityType: "audits",
    icon: "icon-calendar",
    data: [
      {
        columnAlias: "runDate",
        value: d`<a href=${"section/audit/workspace/audits/edit/" + t.key}>${t.runDate ? this.localize.date(t.runDate, { dateStyle: "medium", timeStyle: "short" }) : "Unknown"}</a>`
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
        columnAlias: "totalAssets",
        value: t.totalAssets ?? 0
      },
      {
        columnAlias: "totalBlocked",
        value: t.totalBlocked ?? 0
      }
    ]
  }));
};
s.styles = [
  I`
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
  w("content-audit-audits-table-collection-view")
], s);
const D = s;
export {
  s as ContentAuditAuditsTableCollectionViewElement,
  D as default
};
//# sourceMappingURL=audits-table-collection-view.element.js.map
