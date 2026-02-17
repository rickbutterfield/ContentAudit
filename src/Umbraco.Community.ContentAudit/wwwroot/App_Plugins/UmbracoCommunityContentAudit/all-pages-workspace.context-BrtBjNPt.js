import { UmbContextBase as _ } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken as c } from "@umbraco-cms/backoffice/context-api";
import { UMB_WORKSPACE_PATH_PATTERN as m, UmbWorkspaceRouteManager as A } from "@umbraco-cms/backoffice/workspace";
import { html as v, css as T, state as f, customElement as C } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as E } from "@umbraco-cms/backoffice/lit-element";
import { ContentAuditAllPagesDetailRepository as g } from "./all-pages-detail.repository-iY0_8dQt.js";
import { UmbObjectState as y } from "@umbraco-cms/backoffice/observable-api";
import { e as P } from "./index-Bkks3_By.js";
import { UmbTextStyles as O } from "@umbraco-cms/backoffice/style";
var w = Object.defineProperty, U = Object.getOwnPropertyDescriptor, u = (e) => {
  throw TypeError(e);
}, d = (e, t, s, r) => {
  for (var a = r > 1 ? void 0 : r ? U(t, s) : t, n = e.length - 1, p; n >= 0; n--)
    (p = e[n]) && (a = (r ? p(t, s, a) : p(a)) || a);
  return r && a && w(t, s, a), a;
}, h = (e, t, s) => t.has(e) || u("Cannot " + s), S = (e, t, s) => (h(e, t, "read from private field"), t.get(e)), b = (e, t, s) => t.has(e) ? u("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, s), x = (e, t, s, r) => (h(e, t, "write to private field"), t.set(e, s), s), i;
let o = class extends E {
  constructor() {
    super(), b(this, i), this.consumeContext(l, (e) => {
      x(this, i, e), this.observe(S(this, i)?.data, (t) => {
        this._data = t;
      });
    });
  }
  render() {
    if (this._data)
      return v`
				<umb-workspace-editor back-path="${N}" .enforceNoFooter="${!0}">
					<div slot="header">
						<h3 id="headline">${this._data.pageData?.url}</h3>
					</div>
					<slot></slot>
				</umb-workspace-editor>
			`;
  }
};
i = /* @__PURE__ */ new WeakMap();
o.styles = [
  O,
  T`
			:host {
				//padding: 
			}
		`
];
d([
  f()
], o.prototype, "_data", 2);
o = d([
  C("content-audit-all-pages-workspace-editor")
], o);
const N = m.generateAbsolute({
  sectionName: "audit",
  entityType: "all-pages-root"
});
class B extends _ {
  constructor(t) {
    super(t, l), this.workspaceAlias = P, this.repository = new g(this), this.#t = new y(void 0), this.data = this.#t.asObservable(), this.unique = this.#t.asObservablePart((s) => s?.unique), this.routes = new A(this), this.routes.setRoutes([
      {
        path: "edit/:unique",
        component: o,
        setup: (s, r) => {
          const a = r.match.params.unique;
          this.load(a);
        }
      }
    ]);
  }
  #t;
  async load(t) {
    const { data: s } = await this.repository.requestByUnique(t);
    s && this.#t.setValue(s);
  }
  getData() {
    return this.#t.getValue();
  }
  getUnique() {
    return this.getData()?.unique;
  }
  getEntityType() {
    return "all-pages";
  }
  destroy() {
    this.#t.destroy(), super.destroy();
  }
}
const l = new c(
  "UmbWorkspaceContext",
  void 0,
  (e) => e.getEntityType?.() === "all-pages"
);
export {
  l as CONTENT_AUDIT_ALL_PAGES_WORKSPACE_CONTEXT,
  B as ContentAuditAllPagesWorkspaceContext,
  B as api
};
//# sourceMappingURL=all-pages-workspace.context-BrtBjNPt.js.map
