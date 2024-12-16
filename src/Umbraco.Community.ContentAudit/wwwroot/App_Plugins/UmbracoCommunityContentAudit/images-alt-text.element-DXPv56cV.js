import { html as m, customElement as a } from "@umbraco-cms/backoffice/external/lit";
import { UmbCollectionDefaultElement as s } from "@umbraco-cms/backoffice/collection";
var f = Object.defineProperty, u = Object.getOwnPropertyDescriptor, b = (i, t, o, l) => {
  for (var e = l > 1 ? void 0 : l ? u(t, o) : t, n = i.length - 1, r; n >= 0; n--)
    (r = i[n]) && (e = (l ? r(t, o, e) : r(e)) || e);
  return l && e && f(t, o, e), e;
};
let c = class extends s {
  renderToolbar() {
    return m`
			<umb-collection-toolbar slot="header">
				<umb-collection-filter-field></umb-collection-filter-field>
			</umb-collection-toolbar>
		`;
  }
};
c = b([
  a("content-audit-images-alt-text-collection")
], c);
const v = c;
export {
  c as ContentAuditImagesAltTextCollectionElement,
  v as default
};
//# sourceMappingURL=images-alt-text.element-DXPv56cV.js.map
