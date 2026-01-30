import { html as c, customElement as m } from "@umbraco-cms/backoffice/external/lit";
import { UmbCollectionDefaultElement as s } from "@umbraco-cms/backoffice/collection";
var a = Object.getOwnPropertyDescriptor, b = (l, n, u, r) => {
  for (var t = r > 1 ? void 0 : r ? a(n, u) : n, e = l.length - 1, i; e >= 0; e--)
    (i = l[e]) && (t = i(t) || t);
  return t;
};
let o = class extends s {
  renderToolbar() {
    return c`
			<umb-collection-toolbar slot="header">
				<umb-collection-filter-field></umb-collection-filter-field>
			</umb-collection-toolbar>
		`;
  }
};
o = b([
  m("content-audit-outbound-links-collection")
], o);
const p = o;
export {
  o as ContentAuditOutboundLinksCollectionElement,
  p as default
};
//# sourceMappingURL=outbound-links.element.js.map
