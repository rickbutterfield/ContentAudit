import { html as m, customElement as a } from "@umbraco-cms/backoffice/external/lit";
import { UmbCollectionDefaultElement as s } from "@umbraco-cms/backoffice/collection";
var u = Object.getOwnPropertyDescriptor, f = (o, n, i, r) => {
  for (var t = r > 1 ? void 0 : r ? u(n, i) : n, e = o.length - 1, c; e >= 0; e--)
    (c = o[e]) && (t = c(t) || t);
  return t;
};
let l = class extends s {
  renderToolbar() {
    return m`
			<umb-collection-toolbar slot="header">
				<umb-collection-filter-field></umb-collection-filter-field>
			</umb-collection-toolbar>
		`;
  }
};
l = f([
  a("content-audit-images-alt-text-collection")
], l);
const p = l;
export {
  l as ContentAuditImagesAltTextCollectionElement,
  p as default
};
//# sourceMappingURL=images-alt-text.element-DzMGILfL.js.map
