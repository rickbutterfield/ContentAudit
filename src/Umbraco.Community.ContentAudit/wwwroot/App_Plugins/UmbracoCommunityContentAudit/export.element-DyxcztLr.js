import { html as p, css as l, customElement as m } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as v } from "@umbraco-cms/backoffice/lit-element";
import { tryExecute as h } from "@umbraco-cms/backoffice/resources";
import { A as f } from "./index-QfE00jYe.js";
var x = Object.getOwnPropertyDescriptor, d = (t) => {
  throw TypeError(t);
}, _ = (t, e, o, a) => {
  for (var r = a > 1 ? void 0 : a ? x(e, o) : e, i = t.length - 1, c; i >= 0; i--)
    (c = t[i]) && (r = c(r) || r);
  return r;
}, E = (t, e, o) => e.has(t) || d("Cannot " + o), b = (t, e, o) => e.has(t) ? d("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, o), C = (t, e, o) => (E(t, e, "access private method"), o), s, u;
let n = class extends v {
  constructor() {
    super(), b(this, s);
  }
  render() {
    return p`
		    <umb-workspace-editor headline="Export" .enforceNoFooter=${!0}>
                <div id="main">
                    <uui-box headline="CSV export">
                        <p>Export your latest audit run to a CSV file.</p>
                        <uui-button look="primary" label="Export CSV" @click=${() => C(this, s, u).call(this)}></uui-button>
                    </uui-box>
                </div>
		    </umb-workspace-editor>
	    `;
  }
};
s = /* @__PURE__ */ new WeakSet();
u = async function() {
  const { data: t, error: e } = await h(this, f.export());
  if (t) {
    const o = new Blob([t], { type: "text/csv;charset=utf-8;" }), a = URL.createObjectURL(o), r = document.createElement("a");
    r.href = a, r.download = "content-audit-export.csv", document.body.appendChild(r), r.click(), document.body.removeChild(r), URL.revokeObjectURL(a);
  }
  e && console.error(e);
};
n.styles = [
  l`
            :host {
                display: block;
            }

            #main {
                padding: var(--uui-size-space-5);
            }
        `
];
n = _([
  m("content-audit-export")
], n);
const S = n;
export {
  n as ContentAuditExportElement,
  S as default
};
//# sourceMappingURL=export.element-DyxcztLr.js.map
