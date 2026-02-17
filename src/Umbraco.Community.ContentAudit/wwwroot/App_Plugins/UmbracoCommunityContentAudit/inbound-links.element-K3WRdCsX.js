import { html as u, customElement as m } from "@umbraco-cms/backoffice/external/lit";
import { UmbCollectionDefaultElement as s } from "@umbraco-cms/backoffice/collection";
var a = Object.getOwnPropertyDescriptor, b = (o, n, c, r) => {
  for (var e = r > 1 ? void 0 : r ? a(n, c) : n, t = o.length - 1, i; t >= 0; t--)
    (i = o[t]) && (e = i(e) || e);
  return e;
};
let l = class extends s {
  renderToolbar() {
    return u`
			<umb-collection-toolbar slot="header">
				<umb-collection-filter-field></umb-collection-filter-field>
			</umb-collection-toolbar>
		`;
  }
};
l = b([
  m("content-audit-inbound-links-collection")
], l);
const p = l;
export {
  l as ContentAuditInboundLinksCollectionElement,
  p as default
};
//# sourceMappingURL=inbound-links.element-K3WRdCsX.js.map
