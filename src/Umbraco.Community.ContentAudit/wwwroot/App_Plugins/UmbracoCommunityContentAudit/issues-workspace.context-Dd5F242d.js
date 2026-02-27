import { UmbContextBase as c } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken as m } from "@umbraco-cms/backoffice/context-api";
import { UMB_WORKSPACE_PATH_PATTERN as v, UmbWorkspaceRouteManager as l } from "@umbraco-cms/backoffice/workspace";
import { html as C, state as T, customElement as f } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as E } from "@umbraco-cms/backoffice/lit-element";
import { ContentAuditIssuesDetailRepository as A } from "./issues-detail.repository-CU8OFskI.js";
import { UmbObjectState as y } from "@umbraco-cms/backoffice/observable-api";
import { e as O } from "./index-IUh43tSs.js";
var S = Object.defineProperty, w = Object.getOwnPropertyDescriptor, u = (e) => {
  throw TypeError(e);
}, d = (e, t, s, a) => {
  for (var r = a > 1 ? void 0 : a ? w(t, s) : t, n = e.length - 1, p; n >= 0; n--)
    (p = e[n]) && (r = (a ? p(t, s, r) : p(r)) || r);
  return a && r && S(t, s, r), r;
}, h = (e, t, s) => t.has(e) || u("Cannot " + s), U = (e, t, s) => (h(e, t, "read from private field"), t.get(e)), P = (e, t, s) => t.has(e) ? u("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, s), b = (e, t, s, a) => (h(e, t, "write to private field"), t.set(e, s), s), o;
let i = class extends E {
  constructor() {
    super(), P(this, o), this.consumeContext(_, (e) => {
      b(this, o, e), this.observe(U(this, o)?.data, (t) => {
        this._data = t;
      });
    });
  }
  render() {
    if (this._data)
      return C`
				<umb-workspace-editor back-path="${g}" .enforceNoFooter="${!0}">
					<div slot="header">
						<h3 id="headline">${this._data.name}</h3>
					</div>
				</umb-workspace-editor>
			`;
  }
};
o = /* @__PURE__ */ new WeakMap();
d([
  T()
], i.prototype, "_data", 2);
i = d([
  f("content-audit-issues-workspace-editor")
], i);
const g = v.generateAbsolute({
  sectionName: "audit",
  entityType: "issues-root"
});
class K extends c {
  constructor(t) {
    super(t, _), this.workspaceAlias = O, this.repository = new A(this), this.#t = new y(void 0), this.data = this.#t.asObservable(), this.unique = this.#t.asObservablePart((s) => s?.unique), this.routes = new l(this), this.routes.setRoutes([
      {
        path: "edit/:unique",
        component: i,
        setup: (s, a) => {
          const r = a.match.params.unique;
          this.load(r);
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
    return "issues";
  }
  destroy() {
    this.#t.destroy(), super.destroy();
  }
}
const _ = new m(
  "UmbWorkspaceContext",
  void 0,
  (e) => e.getEntityType?.() === "issues"
);
export {
  _ as CONTENT_AUDIT_ISSUES_WORKSPACE_CONTEXT,
  K as ContentAuditIssuesWorkspaceContext,
  K as api
};
//# sourceMappingURL=issues-workspace.context-Dd5F242d.js.map
