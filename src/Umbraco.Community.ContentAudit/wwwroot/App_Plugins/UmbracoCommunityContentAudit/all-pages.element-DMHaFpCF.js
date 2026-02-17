import { html as s, css as a, customElement as m } from "@umbraco-cms/backoffice/external/lit";
import { UmbCollectionDefaultElement as u, UMB_COLLECTION_CONTEXT as f } from "@umbraco-cms/backoffice/collection";
import { UUITextStyles as p } from "@umbraco-cms/backoffice/external/uui";
var b = Object.getOwnPropertyDescriptor, d = (e, n, c, r) => {
  for (var t = r > 1 ? void 0 : r ? b(n, c) : n, o = e.length - 1, i; o >= 0; o--)
    (i = e[o]) && (t = i(t) || t);
  return t;
};
let l = class extends u {
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
l.styles = [
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
l = d([
  m("content-audit-all-pages-collection")
], l);
const x = l;
export {
  l as ContentAuditAllPagesCollectionElement,
  x as default
};
//# sourceMappingURL=all-pages.element-DMHaFpCF.js.map
