import { UmbModalBaseElement as h } from "@umbraco-cms/backoffice/modal";
import { t as p } from "./index-Bkks3_By.js";
import { html as v, css as _ } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as b } from "@umbraco-cms/backoffice/style";
var f = Object.getOwnPropertyDescriptor, c = (e) => {
  throw TypeError(e);
}, g = (e, t, a, r) => {
  for (var o = r > 1 ? void 0 : r ? f(t, a) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = l(o) || o);
  return o;
}, w = (e, t, a) => t.has(e) || c("Cannot " + a), y = (e, t, a) => t.has(e) ? c("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), u = (e, t, a) => (w(e, t, "access private method"), a), n, d, m;
let i = class extends h {
  constructor() {
    super(), y(this, n);
  }
  render() {
    return v`
            <uui-dialog-layout headline="${this.modalContext?.data.headline ?? "Default headline"}">
                <p id="subtitle">
                    Running an audit scan can be an intensive process, depending on the number of pages on your website. It is not recommended to run a scan at peak times on a live website, as it may cause performance issues. It is recommended to run the scan on a staging or development environment first, or at a quieter time on the live website.
                </p>
                <div slot="actions">
				    <uui-button label=${this.localize.term("general_close")} @click=${u(this, n, d)}></uui-button>
				    <uui-button
					    label="${this.localize.term("buttons_understand")}"
					    look="primary"
					    color="positive"
					    @click=${u(this, n, m)}></uui-button>
			    </div>
            </uui-dialog-layout>
        `;
  }
};
n = /* @__PURE__ */ new WeakSet();
d = function() {
  this.modalContext?.reject();
};
m = function() {
  this.value = { run: !0 }, this.modalContext?.submit();
};
i.styles = [
  b,
  _`
			:host {
				display: block;
				min-width: 460px;
				max-width: 30vw;
			}
		`
];
i = g([
  p("content-audit-modal-run-warning")
], i);
const M = i;
export {
  i as UmbBlockCatalogueModalElement,
  M as default
};
//# sourceMappingURL=run-warning-modal.element-BAFIqPbK.js.map
