import { html as s, css as M, customElement as v, repeat as y } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as w } from "@umbraco-cms/backoffice/lit-element";
import { CONTENT_AUDIT_CONTEXT_TOKEN as $ } from "./assets.js";
var W = Object.defineProperty, T = Object.getOwnPropertyDescriptor, m = (e) => {
  throw TypeError(e);
}, x = (e, t, i, n) => {
  for (var l = n > 1 ? void 0 : n ? T(t, i) : t, h = e.length - 1, d; h >= 0; h--)
    (d = e[h]) && (l = (n ? d(t, i, l) : d(l)) || l);
  return n && l && W(t, i, l), l;
}, b = (e, t, i) => t.has(e) || m("Cannot " + i), E = (e, t, i) => (b(e, t, "read from private field"), i ? i.call(e) : t.get(e)), p = (e, t, i) => t.has(e) ? m("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), K = (e, t, i, n) => (b(e, t, "write to private field"), t.set(e, i), i), u = (e, t, i) => (b(e, t, "access private method"), i), r, a, g, _, f, o;
let c = class extends w {
  constructor() {
    super(), p(this, a), p(this, r), this._pagesWithMissingMetadata = [], this.consumeContext($, (e) => {
      K(this, r, e), this.observe(e.pagesWithMissingMetadata, (t) => {
        this._pagesWithMissingMetadata = t;
      }), E(this, r).getPagesWithMissingMetadata();
    });
  }
  render() {
    return s`
            <umb-body-layout headline="Metadata">
                <div id="main">
                    ${u(this, a, g).call(this)}
                    ${u(this, a, _).call(this)}
                    ${u(this, a, f).call(this)}
                </div>
            </umb-body-layout>
        `;
  }
};
r = /* @__PURE__ */ new WeakMap();
a = /* @__PURE__ */ new WeakSet();
g = function() {
  var t;
  const e = (t = this._pagesWithMissingMetadata) == null ? void 0 : t.filter((i) => i.metaTitle == "");
  if ((e == null ? void 0 : e.length) !== 0)
    return s`
                <uui-box headline="Missing meta title">
                    ${u(this, a, o).call(this, e)}
                </uui-box>
            `;
};
_ = function() {
  var t;
  const e = (t = this._pagesWithMissingMetadata) == null ? void 0 : t.filter((i) => i.metaDescription == "");
  if ((e == null ? void 0 : e.length) !== 0)
    return s`
                <uui-box headline="Missing meta description">
                    ${u(this, a, o).call(this, e)}
                </uui-box>
            `;
};
f = function() {
  var t;
  const e = (t = this._pagesWithMissingMetadata) == null ? void 0 : t.filter((i) => i.metaKeywords == null);
  if ((e == null ? void 0 : e.length) !== 0)
    return s`
                <uui-box headline="Missing meta keywords">
                    ${u(this, a, o).call(this, e)}
                </uui-box>
            `;
};
o = function(e) {
  debugger;
  if ((e == null ? void 0 : e.length) !== 0)
    return s`
                <uui-table>
                    <uui-table-column></uui-table-column>
                    <uui-table-column></uui-table-column>
                    <uui-table-column></uui-table-column>
                    <uui-table-column></uui-table-column>
                    <uui-table-column></uui-table-column>

                    <uui-table-head>
                    <uui-table-head-cell>URL</uui-table-head-cell>
                    <uui-table-head-cell>NodeKey</uui-table-head-cell>
                    <uui-table-head-cell>Title</uui-table-head-cell>
                    <uui-table-head-cell>Description</uui-table-head-cell>
                    <uui-table-head-cell>Keywords</uui-table-head-cell>
                    </uui-table-head>

                    ${y(
      e,
      (t) => t.id,
      (t) => s`
                                <uui-table-row>
                                    <uui-table-cell>${t.url ?? t.canonicalUrl}</uui-table-cell>
                                    <uui-table-cell>
                                        <a href="/umbraco/section/content/workspace/document/edit/${t.nodeKey}">${t.nodeKey}</a>
                                    </uui-table-cell>
                                    <uui-table-cell>${t.metaTitle}</uui-table-cell>
                                    <uui-table-cell>${t.metaDescription}</uui-table-cell>
                                    <uui-table-cell>${t.metaKeywords}</uui-table-cell>
                                </uui-table-row>
                            `
    )}
                </uui-table>
            `;
};
c.styles = [
  M`
			:host {
				display: block;
				height: 100%;
				--uui-tab-background: var(--uui-color-surface);
			}

            
            #main {
                display: flex;
                flex-direction: column;
                gap: var(--uui-size-layout-1);
            }
        `
];
c = x([
  v("metadata-audit-workspace")
], c);
const D = c;
export {
  c as AuditMetadataWorkspaceElement,
  D as default
};
//# sourceMappingURL=metadata-workspace-view.element-CEt9ukrj.js.map
