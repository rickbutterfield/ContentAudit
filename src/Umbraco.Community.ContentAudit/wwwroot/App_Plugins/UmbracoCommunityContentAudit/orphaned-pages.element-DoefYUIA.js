import { html as i, customElement as m } from "@umbraco-cms/backoffice/external/lit";
import { UmbCollectionDefaultElement as s } from "@umbraco-cms/backoffice/collection";
var u = Object.getOwnPropertyDescriptor, d = (o, n, a, r) => {
  for (var e = r > 1 ? void 0 : r ? u(n, a) : n, t = o.length - 1, c; t >= 0; t--)
    (c = o[t]) && (e = c(e) || e);
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
//# sourceMappingURL=orphaned-pages.element-DoefYUIA.js.map
