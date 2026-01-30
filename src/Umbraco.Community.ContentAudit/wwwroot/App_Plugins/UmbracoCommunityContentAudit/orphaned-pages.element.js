import { html as i, customElement as m } from "@umbraco-cms/backoffice/external/lit";
import { UmbCollectionDefaultElement as s } from "@umbraco-cms/backoffice/collection";
var u = Object.getOwnPropertyDescriptor, d = (o, n, c, r) => {
  for (var e = r > 1 ? void 0 : r ? u(n, c) : n, t = o.length - 1, a; t >= 0; t--)
    (a = o[t]) && (e = a(e) || e);
  return e;
};
let l = class extends s {
  renderToolbar() {
    return i`
			<umb-collection-toolbar slot="header">
				<umb-collection-filter-field></umb-collection-filter-field>
			</umb-collection-toolbar>
		`;
  }
};
l = d([
  m("content-audit-orphaned-pages-collection")
], l);
const b = l;
export {
  l as ContentAuditOrphanedPagesCollectionElement,
  b as default
};
//# sourceMappingURL=orphaned-pages.element.js.map
