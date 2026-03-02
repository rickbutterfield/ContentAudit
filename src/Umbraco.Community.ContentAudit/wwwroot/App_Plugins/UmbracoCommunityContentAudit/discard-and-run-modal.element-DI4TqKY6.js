import { UmbModalBaseElement as p } from "@umbraco-cms/backoffice/modal";
import { t as h } from "./index-BUsZH3tI.js";
import { html as v, css as _ } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as f } from "@umbraco-cms/backoffice/style";
var w = Object.getOwnPropertyDescriptor, c = (e) => {
  throw TypeError(e);
}, b = (e, t, a, i) => {
  for (var n = i > 1 ? void 0 : i ? w(t, a) : t, r = e.length - 1, d; r >= 0; r--)
    (d = e[r]) && (n = d(n) || n);
  return n;
}, g = (e, t, a) => t.has(e) || c("Cannot " + a), y = (e, t, a) => t.has(e) ? c("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), l = (e, t, a) => (g(e, t, "access private method"), a), o, u, m;
let s = class extends p {
  constructor() {
    super(...arguments), y(this, o);
  }
  render() {
    const e = this.modalContext?.data.pagesCrawled ?? 0;
    return v`
            <uui-dialog-layout headline="${this.modalContext?.data.headline ?? "Discard incomplete crawl?"}">
                <p>
                    The previous incomplete crawl with <strong>${e} URLs</strong> already processed will be permanently discarded. This cannot be undone.
                </p>
                <p>
                    Running an audit scan can be an intensive process, depending on the number of pages on your website. It is not recommended to run a scan at peak times on a live website, as it may cause performance issues.
                </p>
                <div slot="actions">
                    <uui-button label=${this.localize.term("general_close")} @click=${l(this, o, u)}></uui-button>
                    <uui-button
                        label="Discard & Start New"
                        look="primary"
                        color="danger"
                        @click=${l(this, o, m)}></uui-button>
                </div>
            </uui-dialog-layout>
        `;
  }
};
o = /* @__PURE__ */ new WeakSet();
u = function() {
  this.modalContext?.reject();
};
m = function() {
  this.value = { confirmed: !0 }, this.modalContext?.submit();
};
s.styles = [
  f,
  _`
            :host {
                display: block;
                min-width: 460px;
                max-width: 30vw;
            }
        `
];
s = b([
  h("content-audit-modal-discard-and-run")
], s);
const D = s;
export {
  s as ContentAuditDiscardAndRunModalElement,
  D as default
};
//# sourceMappingURL=discard-and-run-modal.element-DI4TqKY6.js.map
