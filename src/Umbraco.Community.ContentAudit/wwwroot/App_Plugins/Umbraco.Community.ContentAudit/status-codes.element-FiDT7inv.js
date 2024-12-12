import { html as _, css as m, customElement as w } from "@umbraco-cms/backoffice/external/lit";
import { UmbCollectionDefaultElement as S, UMB_COLLECTION_CONTEXT as E } from "@umbraco-cms/backoffice/collection";
var g = Object.defineProperty, b = Object.getOwnPropertyDescriptor, f = (e) => {
  throw TypeError(e);
}, O = (e, t, o, a) => {
  for (var s = a > 1 ? void 0 : a ? b(t, o) : t, r = e.length - 1, c; r >= 0; r--)
    (c = e[r]) && (s = (a ? c(t, o, s) : c(s)) || s);
  return a && s && g(t, o, s), s;
}, h = (e, t, o) => t.has(e) || f("Cannot " + o), d = (e, t, o) => (h(e, t, "read from private field"), o ? o.call(e) : t.get(e)), u = (e, t, o) => t.has(e) ? f("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, o), v = (e, t, o, a) => (h(e, t, "write to private field"), t.set(e, o), o), x = (e, t, o) => (h(e, t, "access private method"), o), l, n, p, C;
let i = class extends S {
  constructor() {
    super(), u(this, p), u(this, l), u(this, n, []), this.consumeContext(E, (e) => {
      v(this, l, e), this.observe(d(this, l).items, (t) => {
        if (t != null && (t == null ? void 0 : t.length) !== 0) {
          const a = [...new Set(t.map((s) => s.statusCode))].sort().map((s) => ({ name: s.toString(), value: s.toString() }));
          v(this, n, [{ name: "All", value: "0" }, ...a]);
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
						.options=${d(this, n)}
						@change=${x(this, p, C)}></uui-select>
				</div>
			</umb-collection-toolbar>
		`;
  }
};
l = /* @__PURE__ */ new WeakMap();
n = /* @__PURE__ */ new WeakMap();
p = /* @__PURE__ */ new WeakSet();
C = function(e) {
  var o;
  const t = e.target.value;
  (o = d(this, l)) == null || o.setFilter({ statusCode: parseInt(t) });
};
i.styles = [
  m`
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
		`
];
i = O([
  w("content-audit-status-codes-collection")
], i);
const T = i;
export {
  i as ContentAuditStatusCodesCollectionElement,
  T as default
};
//# sourceMappingURL=status-codes.element-FiDT7inv.js.map
