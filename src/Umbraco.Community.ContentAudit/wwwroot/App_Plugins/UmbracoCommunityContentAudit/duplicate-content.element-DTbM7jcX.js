import { html as s, css as a, customElement as u } from "@umbraco-cms/backoffice/external/lit";
import { UmbCollectionDefaultElement as m, UMB_COLLECTION_CONTEXT as p } from "@umbraco-cms/backoffice/collection";
import { UUITextStyles as f } from "@umbraco-cms/backoffice/external/uui";
var C = Object.getOwnPropertyDescriptor, b = (t, n, r, c) => {
  for (var e = c > 1 ? void 0 : c ? C(n, r) : n, l = t.length - 1, i; l >= 0; l--)
    (i = t[l]) && (e = i(e) || e);
  return e;
};
let o = class extends m {
  constructor() {
    super(), this.consumeContext(p, (t) => {
      this._collectionContext = t;
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
o.styles = [
  f,
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
o = b([
  u("content-audit-duplicate-content-collection")
], o);
const g = o;
export {
  o as ContentAuditDuplicateContentCollectionElement,
  g as default
};
//# sourceMappingURL=duplicate-content.element-DTbM7jcX.js.map
