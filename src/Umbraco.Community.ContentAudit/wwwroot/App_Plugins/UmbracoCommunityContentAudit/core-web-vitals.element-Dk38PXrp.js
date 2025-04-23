import { html as s, css as a, customElement as m } from "@umbraco-cms/backoffice/external/lit";
import { UmbCollectionDefaultElement as u, UMB_COLLECTION_CONTEXT as b } from "@umbraco-cms/backoffice/collection";
import { UUITextStyles as f } from "@umbraco-cms/backoffice/external/uui";
var C = Object.getOwnPropertyDescriptor, p = (e, n, c, r) => {
  for (var t = r > 1 ? void 0 : r ? C(n, c) : n, l = e.length - 1, i; l >= 0; l--)
    (i = e[l]) && (t = i(t) || t);
  return t;
};
let o = class extends u {
  constructor() {
    super(), this.consumeContext(b, (e) => {
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
o = p([
  m("content-audit-core-web-vitals-collection")
], o);
const g = o;
export {
  o as ContentAuditCoreWebVitalsCollectionElement,
  g as default
};
//# sourceMappingURL=core-web-vitals.element-Dk38PXrp.js.map
