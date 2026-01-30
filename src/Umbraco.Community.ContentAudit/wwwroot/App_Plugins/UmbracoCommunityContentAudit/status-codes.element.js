import { html as _, css as m, customElement as g } from "@umbraco-cms/backoffice/external/lit";
import { UmbCollectionDefaultElement as S, UMB_COLLECTION_CONTEXT as w } from "@umbraco-cms/backoffice/collection";
import { UUITextStyles as x } from "@umbraco-cms/backoffice/external/uui";
var b = Object.getOwnPropertyDescriptor, f = (e) => {
  throw TypeError(e);
}, y = (e, t, o, a) => {
  for (var s = a > 1 ? void 0 : a ? b(t, o) : t, r = e.length - 1, h; r >= 0; r--)
    (h = e[r]) && (s = h(s) || s);
  return s;
}, p = (e, t, o) => t.has(e) || f("Cannot " + o), u = (e, t, o) => (p(e, t, "read from private field"), t.get(e)), c = (e, t, o) => t.has(e) ? f("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, o), v = (e, t, o, a) => (p(e, t, "write to private field"), t.set(e, o), o), E = (e, t, o) => (p(e, t, "access private method"), o), n, i, d, C;
let l = class extends S {
  constructor() {
    super(), c(this, d), c(this, n), c(this, i, []), this.consumeContext(w, (e) => {
      v(this, n, e), this.observe(u(this, n)?.items, (t) => {
        if (t != null && t?.length !== 0) {
          const a = [...new Set(t.map((s) => s.statusCode))].sort().map((s) => ({ name: s?.toString(), value: s?.toString() }));
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
						@change=${E(this, d, C)}></uui-select>
				</div>
			</umb-collection-toolbar>
		`;
  }
};
n = /* @__PURE__ */ new WeakMap();
i = /* @__PURE__ */ new WeakMap();
d = /* @__PURE__ */ new WeakSet();
C = function(e) {
  const t = e.target.value;
  u(this, n)?.setFilter({ statusCode: parseInt(t) });
};
l.styles = [
  x,
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
l = y([
  g("content-audit-status-codes-collection")
], l);
const k = l;
export {
  l as ContentAuditStatusCodesCollectionElement,
  k as default
};
//# sourceMappingURL=status-codes.element.js.map
