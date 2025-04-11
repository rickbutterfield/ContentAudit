import { html as a, css as s, customElement as m } from "@umbraco-cms/backoffice/external/lit";
import { UmbCollectionDefaultElement as u, UMB_COLLECTION_CONTEXT as d } from "@umbraco-cms/backoffice/collection";
import { UUITextStyles as f } from "@umbraco-cms/backoffice/external/uui";
var b = Object.getOwnPropertyDescriptor, p = (t, n, c, r) => {
  for (var e = r > 1 ? void 0 : r ? b(n, c) : n, l = t.length - 1, i; l >= 0; l--)
    (i = t[l]) && (e = i(e) || e);
  return e;
};
let o = class extends u {
  constructor() {
    super(), this.consumeContext(d, (t) => {
      this._collectionContext = t;
    });
  }
  renderToolbar() {
    return a`
			<umb-collection-toolbar slot="header">
				<umb-collection-filter-field></umb-collection-filter-field>
			</umb-collection-toolbar>
		`;
  }
};
o.styles = [
  f,
  s`
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
o = p([
  m("content-audit-metadata-collection")
], o);
const g = o;
export {
  o as ContentAuditMetadataCollectionElement,
  g as default
};
//# sourceMappingURL=metadata.element-ZbBPm7dZ.js.map
