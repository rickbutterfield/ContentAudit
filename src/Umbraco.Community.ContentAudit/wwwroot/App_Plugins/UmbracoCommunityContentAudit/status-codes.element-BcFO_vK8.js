import { html as _, css as m, customElement as g } from "@umbraco-cms/backoffice/external/lit";
import { UmbCollectionDefaultElement as S, UMB_COLLECTION_CONTEXT as w } from "@umbraco-cms/backoffice/collection";
import { UUITextStyles as x } from "@umbraco-cms/backoffice/external/uui";
var b = Object.defineProperty, E = Object.getOwnPropertyDescriptor, v = (e) => {
  throw TypeError(e);
}, y = (e, t, o, a) => {
  for (var s = a > 1 ? void 0 : a ? E(t, o) : t, r = e.length - 1, c; r >= 0; r--)
    (c = e[r]) && (s = (a ? c(t, o, s) : c(s)) || s);
  return a && s && b(t, o, s), s;
}, h = (e, t, o) => t.has(e) || v("Cannot " + o), d = (e, t, o) => (h(e, t, "read from private field"), o ? o.call(e) : t.get(e)), u = (e, t, o) => t.has(e) ? v("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, o), f = (e, t, o, a) => (h(e, t, "write to private field"), t.set(e, o), o), O = (e, t, o) => (h(e, t, "access private method"), o), n, l, p, C;
let i = class extends S {
  constructor() {
    super(), u(this, p), u(this, n), u(this, l, []), this.consumeContext(w, (e) => {
      f(this, n, e), this.observe(d(this, n).items, (t) => {
        if (t != null && (t == null ? void 0 : t.length) !== 0) {
          const a = [...new Set(t.map((s) => s.statusCode))].sort().map((s) => ({ name: s.toString(), value: s.toString() }));
          f(this, l, [{ name: "All", value: "0" }, ...a]);
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
						.options=${d(this, l)}
						@change=${O(this, p, C)}></uui-select>
				</div>
			</umb-collection-toolbar>
		`;
  }
};
n = /* @__PURE__ */ new WeakMap();
l = /* @__PURE__ */ new WeakMap();
p = /* @__PURE__ */ new WeakSet();
C = function(e) {
  var o;
  const t = e.target.value;
  (o = d(this, n)) == null || o.setFilter({ statusCode: parseInt(t) });
};
i.styles = [
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
i = y([
  g("content-audit-status-codes-collection")
], i);
const P = i;
export {
  i as ContentAuditStatusCodesCollectionElement,
  P as default
};
//# sourceMappingURL=status-codes.element-BcFO_vK8.js.map
