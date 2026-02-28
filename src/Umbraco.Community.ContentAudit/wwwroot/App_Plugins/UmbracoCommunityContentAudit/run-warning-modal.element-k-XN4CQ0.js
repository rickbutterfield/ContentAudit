import { UmbModalBaseElement as h } from "@umbraco-cms/backoffice/modal";
import { t as p } from "./index-B8flLQWi.js";
import { html as v, css as _ } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as f } from "@umbraco-cms/backoffice/style";
var b = Object.getOwnPropertyDescriptor, d = (t) => {
  throw TypeError(t);
}, g = (t, e, n, s) => {
  for (var a = s > 1 ? void 0 : s ? b(e, n) : e, r = t.length - 1, l; r >= 0; r--)
    (l = t[r]) && (a = l(a) || a);
  return a;
}, w = (t, e, n) => e.has(t) || d("Cannot " + n), y = (t, e, n) => e.has(t) ? d("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), u = (t, e, n) => (w(t, e, "access private method"), n), o, c, m;
let i = class extends h {
  constructor() {
    super(), y(this, o);
  }
  render() {
    return v`
            <uui-dialog-layout headline="${this.modalContext?.data.headline ?? "Default headline"}">
                <p id="subtitle">
                    Running an audit scan can be an intensive process, depending on the number of pages on your website. It is not recommended to run a scan at peak times on a live website, as it may cause performance issues. It is recommended to run the scan on a staging or development environment first, or at a quieter time on the live website.
                </p>
                <div slot="actions">
				    <uui-button label=${this.localize.term("general_close")} @click=${u(this, o, c)}></uui-button>
				    <uui-button
					    label="${this.localize.term("buttons_understand")}"
					    look="primary"
					    color="positive"
					    @click=${u(this, o, m)}></uui-button>
			    </div>
            </uui-dialog-layout>
        `;
  }
};
o = /* @__PURE__ */ new WeakSet();
c = function() {
  this.modalContext?.reject();
};
m = function() {
  this.value = { run: !0 }, this.modalContext?.submit();
};
i.styles = [
  f,
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
  i as ContentAuditRunWarningModalElement,
  M as default
};
//# sourceMappingURL=run-warning-modal.element-k-XN4CQ0.js.map
