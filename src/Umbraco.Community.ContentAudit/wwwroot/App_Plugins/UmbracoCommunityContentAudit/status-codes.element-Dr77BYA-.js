import { html as _, css as g, customElement as m } from "@umbraco-cms/backoffice/external/lit";
import { UmbCollectionDefaultElement as S, UMB_COLLECTION_CONTEXT as w } from "@umbraco-cms/backoffice/collection";
import { UUITextStyles as b } from "@umbraco-cms/backoffice/external/uui";
var y = Object.getOwnPropertyDescriptor, f = (t) => {
  throw TypeError(t);
}, E = (t, e, o, l) => {
  for (var a = l > 1 ? void 0 : l ? y(e, o) : e, s = t.length - 1, h; s >= 0; s--)
    (h = t[s]) && (a = h(a) || a);
  return a;
}, p = (t, e, o) => e.has(t) || f("Cannot " + o), u = (t, e, o) => (p(t, e, "read from private field"), e.get(t)), c = (t, e, o) => e.has(t) ? f("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, o), v = (t, e, o, l) => (p(t, e, "write to private field"), e.set(t, o), o), O = (t, e, o) => (p(t, e, "access private method"), o), n, i, d, C;
let r = class extends S {
  constructor() {
    super(), c(this, d), c(this, n), c(this, i, []), this.consumeContext(w, (t) => {
      var e;
      v(this, n, t), this.observe((e = u(this, n)) == null ? void 0 : e.items, (o) => {
        if (o != null && (o == null ? void 0 : o.length) !== 0) {
          const a = [...new Set(o.map((s) => s.statusCode))].sort().map((s) => ({ name: s == null ? void 0 : s.toString(), value: s == null ? void 0 : s.toString() }));
          v(this, i, [{ name: "All", value: "0" }, ...a]);
        }
      });
    });
  }
  renderToolbar() {
    return _`
			<umb-collection-toolbar slot="header">
				<div id="toolbar">
					<umb-collection-filter-field></umb-collection-filter-field>
					<uui-select
						label="Select status code..."
						placeholder="Select status code..."
						.options=${u(this, i)}
						@change=${O(this, d, C)}></uui-select>
				</div>
			</umb-collection-toolbar>
		`;
  }
};
n = /* @__PURE__ */ new WeakMap();
i = /* @__PURE__ */ new WeakMap();
d = /* @__PURE__ */ new WeakSet();
C = function(t) {
  var o;
  const e = t.target.value;
  (o = u(this, n)) == null || o.setFilter({ statusCode: parseInt(e) });
};
r.styles = [
  b,
  g`
			:host {
				display: flex;
				flex-direction: column;
				box-sizing: border-box;
				gap: var(--uui-size-space-5);
				height: 100%;
			}

			#toolbar {
				flex: 1;
				display: flex;
				gap: var(--uui-size-space-5);
				justify-content: space-between;
				align-items: center;
			}

			umb-collection-filter-field {
				width: 100%;
			}

			uui-select {
				width: 100%;
			}

			#empty-state {
				height: 80%;
				align-content: center;
				text-align: center;
			}
		`
];
r = E([
  m("content-audit-status-codes-collection")
], r);
const M = r;
export {
  r as ContentAuditStatusCodesCollectionElement,
  M as default
};
//# sourceMappingURL=status-codes.element-Dr77BYA-.js.map
