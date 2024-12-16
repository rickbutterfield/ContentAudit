import { html as a, customElement as m } from "@umbraco-cms/backoffice/external/lit";
import { UmbCollectionDefaultElement as s } from "@umbraco-cms/backoffice/collection";
var f = Object.defineProperty, u = Object.getOwnPropertyDescriptor, p = (i, t, o, l) => {
  for (var e = l > 1 ? void 0 : l ? u(t, o) : t, n = i.length - 1, r; n >= 0; n--)
    (r = i[n]) && (e = (l ? r(t, o, e) : r(e)) || e);
  return l && e && f(t, o, e), e;
};
let c = class extends s {
  renderToolbar() {
    return a`
			<umb-collection-toolbar slot="header">
				<umb-collection-filter-field></umb-collection-filter-field>
			</umb-collection-toolbar>
		`;
  }
};
c = p([
  m("content-audit-orphaned-pages-collection")
], c);
const h = c;
export {
  c as ContentAuditOrphanedPagesCollectionElement,
  h as default
};
//# sourceMappingURL=orphaned-pages.element-CR408Pgy.js.map
