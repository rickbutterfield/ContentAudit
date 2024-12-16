import { html as u, customElement as m } from "@umbraco-cms/backoffice/external/lit";
import { UmbCollectionDefaultElement as s } from "@umbraco-cms/backoffice/collection";
var b = Object.defineProperty, f = Object.getOwnPropertyDescriptor, a = (c, t, l, o) => {
  for (var e = o > 1 ? void 0 : o ? f(t, l) : t, n = c.length - 1, r; n >= 0; n--)
    (r = c[n]) && (e = (o ? r(t, l, e) : r(e)) || e);
  return o && e && b(t, l, e), e;
};
let i = class extends s {
  renderToolbar() {
    return u`
			<umb-collection-toolbar slot="header">
				<umb-collection-filter-field></umb-collection-filter-field>
			</umb-collection-toolbar>
		`;
  }
};
i = a([
  m("content-audit-outbound-links-collection")
], i);
const v = i;
export {
  i as ContentAuditOutboundLinksCollectionElement,
  v as default
};
//# sourceMappingURL=outbound-links.element-5JNyTazK.js.map
