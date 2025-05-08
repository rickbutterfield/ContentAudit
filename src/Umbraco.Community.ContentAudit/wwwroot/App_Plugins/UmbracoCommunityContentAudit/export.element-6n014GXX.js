import { UmbElementMixin as p } from "@umbraco-cms/backoffice/element-api";
import { LitElement as l, html as m, css as v, customElement as h } from "@umbraco-cms/backoffice/external/lit";
import { tryExecuteAndNotify as x } from "@umbraco-cms/backoffice/resources";
import { A as f } from "./index-BwZayLry.js";
var E = Object.getOwnPropertyDescriptor, d = (t) => {
  throw TypeError(t);
}, _ = (t, e, r, a) => {
  for (var o = a > 1 ? void 0 : a ? E(e, r) : e, i = t.length - 1, c; i >= 0; i--)
    (c = t[i]) && (o = c(o) || o);
  return o;
}, b = (t, e, r) => e.has(t) || d("Cannot " + r), y = (t, e, r) => e.has(t) ? d("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, r), C = (t, e, r) => (b(t, e, "access private method"), r), s, u;
let n = class extends p(l) {
  constructor() {
    super(), y(this, s);
  }
  render() {
    return m`
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
  const { data: t, error: e } = await x(this, f.getExportData());
  if (t) {
    const r = new Blob([t], { type: "text/csv;charset=utf-8;" }), a = URL.createObjectURL(r), o = document.createElement("a");
    o.href = a, o.download = "content-audit-export.csv", document.body.appendChild(o), o.click(), document.body.removeChild(o), URL.revokeObjectURL(a);
  }
  e && console.error(e);
};
n.styles = [
  v`
            :host {
                display: block;
            }

            #main {
                padding: var(--uui-size-space-5);
            }
        `
];
n = _([
  h("content-audit-export")
], n);
const L = n;
export {
  n as ContentAuditExportElement,
  L as default
};
//# sourceMappingURL=export.element-6n014GXX.js.map
