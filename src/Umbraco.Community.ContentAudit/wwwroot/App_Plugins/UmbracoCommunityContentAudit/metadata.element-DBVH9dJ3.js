import { html as s, css as a, customElement as m } from "@umbraco-cms/backoffice/external/lit";
import { UmbCollectionDefaultElement as u, UMB_COLLECTION_CONTEXT as f } from "@umbraco-cms/backoffice/collection";
import { UUITextStyles as p } from "@umbraco-cms/backoffice/external/uui";
var b = Object.defineProperty, d = Object.getOwnPropertyDescriptor, C = (e, o, r, l) => {
  for (var t = l > 1 ? void 0 : l ? d(o, r) : o, i = e.length - 1, c; i >= 0; i--)
    (c = e[i]) && (t = (l ? c(o, r, t) : c(t)) || t);
  return l && t && b(o, r, t), t;
};
let n = class extends u {
  constructor() {
    super(), this.consumeContext(f, (e) => {
      this._collectionContext = e;
    });
  }
  renderToolbar() {
    return s`
			<umb-collection-toolbar slot="header">
				<umb-collection-filter-field></umb-collection-filter-field>
			</umb-collection-toolbar>
		`;
  }
};
n.styles = [
  p,
  a`
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
n = C([
  m("content-audit-metadata-collection")
], n);
const v = n;
export {
  n as ContentAuditMetadataCollectionElement,
  v as default
};
//# sourceMappingURL=metadata.element-DBVH9dJ3.js.map
