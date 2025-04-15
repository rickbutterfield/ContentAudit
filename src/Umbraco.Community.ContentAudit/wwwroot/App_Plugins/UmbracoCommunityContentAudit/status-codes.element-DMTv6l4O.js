import { html as _, css as m, customElement as g } from "@umbraco-cms/backoffice/external/lit";
import { UmbCollectionDefaultElement as S, UMB_COLLECTION_CONTEXT as w } from "@umbraco-cms/backoffice/collection";
import { UUITextStyles as b } from "@umbraco-cms/backoffice/external/uui";
var y = Object.getOwnPropertyDescriptor, f = (e) => {
  throw TypeError(e);
}, E = (e, t, o, a) => {
  for (var s = a > 1 ? void 0 : a ? y(t, o) : t, r = e.length - 1, h; r >= 0; r--)
    (h = e[r]) && (s = h(s) || s);
  return s;
}, p = (e, t, o) => t.has(e) || f("Cannot " + o), u = (e, t, o) => (p(e, t, "read from private field"), o ? o.call(e) : t.get(e)), c = (e, t, o) => t.has(e) ? f("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, o), v = (e, t, o, a) => (p(e, t, "write to private field"), t.set(e, o), o), O = (e, t, o) => (p(e, t, "access private method"), o), n, l, d, C;
let i = class extends S {
  constructor() {
    super(), c(this, d), c(this, n), c(this, l, []), this.consumeContext(w, (e) => {
      v(this, n, e), this.observe(u(this, n).items, (t) => {
        if (t != null && (t == null ? void 0 : t.length) !== 0) {
          const a = [...new Set(t.map((s) => s.statusCode))].sort().map((s) => ({ name: s == null ? void 0 : s.toString(), value: s == null ? void 0 : s.toString() }));
          v(this, l, [{ name: "All", value: "0" }, ...a]);
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
						.options=${u(this, l)}
						@change=${O(this, d, C)}></uui-select>
				</div>
			</umb-collection-toolbar>
		`;
  }
};
n = /* @__PURE__ */ new WeakMap();
l = /* @__PURE__ */ new WeakMap();
d = /* @__PURE__ */ new WeakSet();
C = function(e) {
  var o;
  const t = e.target.value;
  (o = u(this, n)) == null || o.setFilter({ statusCode: parseInt(t) });
};
i.styles = [
  b,
  m`
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
i = E([
  g("content-audit-status-codes-collection")
], i);
const M = i;
export {
  i as ContentAuditStatusCodesCollectionElement,
  M as default
};
//# sourceMappingURL=status-codes.element-DMTv6l4O.js.map
