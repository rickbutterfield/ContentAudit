import { html as f, css as h, customElement as u } from "@umbraco-cms/backoffice/external/lit";
import { UmbCollectionDefaultElement as _, UMB_COLLECTION_CONTEXT as m } from "@umbraco-cms/backoffice/collection";
import { UUITextStyles as v } from "@umbraco-cms/backoffice/external/uui";
var C = Object.defineProperty, x = Object.getOwnPropertyDescriptor, p = (t) => {
  throw TypeError(t);
}, E = (t, e, o, a) => {
  for (var r = a > 1 ? void 0 : a ? x(e, o) : e, l = t.length - 1, i; l >= 0; l--)
    (i = t[l]) && (r = (a ? i(e, o, r) : i(r)) || r);
  return a && r && C(e, o, r), r;
}, b = (t, e, o) => e.has(t) || p("Cannot " + o), c = (t, e, o) => e.has(t) ? p("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, o), O = (t, e, o, a) => (b(t, e, "write to private field"), e.set(t, o), o), s, d;
let n = class extends _ {
  constructor() {
    super(), c(this, s), c(this, d, []), this.consumeContext(m, (t) => {
      O(this, s, t);
    });
  }
  renderToolbar() {
    return f`
			<umb-collection-toolbar slot="header">
				<umb-collection-filter-field></umb-collection-filter-field>
			</umb-collection-toolbar>
		`;
  }
};
s = /* @__PURE__ */ new WeakMap();
d = /* @__PURE__ */ new WeakMap();
n.styles = [
  v,
  h`
			:host {
				display: flex;
				flex-direction: column;
				box-sizing: border-box;
				gap: var(--uui-size-space-5);
				height: 100%;
			}

			#empty-state {
				height: 80%;
				align-content: center;
				text-align: center;
			}
		`
];
n = E([
  u("content-audit-metadata-collection")
], n);
const T = n;
export {
  n as ContentAuditMetadataCollectionElement,
  T as default
};
//# sourceMappingURL=metadata.element-NLHFYxe2.js.map
