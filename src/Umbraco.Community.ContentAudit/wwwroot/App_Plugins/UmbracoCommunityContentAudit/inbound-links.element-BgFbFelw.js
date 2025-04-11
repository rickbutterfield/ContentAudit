import { html as u, customElement as m } from "@umbraco-cms/backoffice/external/lit";
import { UmbCollectionDefaultElement as s } from "@umbraco-cms/backoffice/collection";
var a = Object.getOwnPropertyDescriptor, b = (l, n, c, r) => {
  for (var e = r > 1 ? void 0 : r ? a(n, c) : n, t = l.length - 1, i; t >= 0; t--)
    (i = l[t]) && (e = i(e) || e);
  return e;
};
let o = class extends s {
  renderToolbar() {
    return u`
			<umb-collection-toolbar slot="header">
				<umb-collection-filter-field></umb-collection-filter-field>
			</umb-collection-toolbar>
		`;
  }
};
o = b([
  m("content-audit-inbound-links-collection")
], o);
const p = o;
export {
  o as ContentAuditInboundLinksCollectionElement,
  p as default
};
//# sourceMappingURL=inbound-links.element-BgFbFelw.js.map
