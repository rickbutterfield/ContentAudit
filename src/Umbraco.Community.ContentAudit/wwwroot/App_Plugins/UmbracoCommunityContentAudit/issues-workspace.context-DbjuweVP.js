var _ = (t) => {
  throw TypeError(t);
};
var d = (t, e, s) => e.has(t) || _("Cannot " + s);
var i = (t, e, s) => (d(t, e, "read from private field"), s ? s.call(t) : e.get(t)), c = (t, e, s) => e.has(t) ? _("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), m = (t, e, s, r) => (d(t, e, "write to private field"), r ? r.call(t, s) : e.set(t, s), s);
import { UmbContextBase as f } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken as E } from "@umbraco-cms/backoffice/context-api";
import { UMB_WORKSPACE_PATH_PATTERN as A, UmbWorkspaceRouteManager as y } from "@umbraco-cms/backoffice/workspace";
import { html as O, state as S, customElement as w } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as U } from "@umbraco-cms/backoffice/lit-element";
import { ContentAuditIssuesDetailRepository as P } from "./issues-detail.repository-CyfuNoeV.js";
import { UmbObjectState as b } from "@umbraco-cms/backoffice/observable-api";
import { b as I } from "./index-BW3lOCKc.js";
var N = Object.defineProperty, W = Object.getOwnPropertyDescriptor, l = (t) => {
  throw TypeError(t);
}, v = (t, e, s, r) => {
  for (var o = r > 1 ? void 0 : r ? W(e, s) : e, n = t.length - 1, h; n >= 0; n--)
    (h = t[n]) && (o = (r ? h(e, s, o) : h(o)) || o);
  return r && o && N(e, s, o), o;
}, C = (t, e, s) => e.has(t) || l("Cannot " + s), k = (t, e, s) => (C(t, e, "read from private field"), s ? s.call(t) : e.get(t)), q = (t, e, s) => e.has(t) ? l("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), R = (t, e, s, r) => (C(t, e, "write to private field"), e.set(t, s), s), p;
let u = class extends U {
  constructor() {
    super(), q(this, p), this.consumeContext(T, (t) => {
      R(this, p, t), this.observe(k(this, p).data, (e) => {
        this._data = e;
      });
    });
  }
  render() {
    if (this._data)
      return O`
				<umb-workspace-editor back-path="${g}" .enforceNoFooter="${!0}">
					<div slot="header">
						<h3 id="headline">${this._data.name}</h3>
					</div>
				</umb-workspace-editor>
			`;
  }
};
p = /* @__PURE__ */ new WeakMap();
v([
  S()
], u.prototype, "_data", 2);
u = v([
  w("content-audit-issues-workspace-editor")
], u);
const g = A.generateAbsolute({
  sectionName: "audit",
  entityType: "issues-root"
});
var a;
class F extends f {
  constructor(s) {
    super(s, T);
    c(this, a);
    this.workspaceAlias = I, this.repository = new P(this), m(this, a, new b(void 0)), this.data = i(this, a).asObservable(), this.unique = i(this, a).asObservablePart((r) => r == null ? void 0 : r.unique), this.routes = new y(this), this.routes.setRoutes([
      {
        path: "edit/:unique",
        component: u,
        setup: (r, o) => {
          const n = o.match.params.unique;
          this.load(n);
        }
      }
    ]);
  }
  async load(s) {
    const { data: r } = await this.repository.requestByUnique(s);
    r && i(this, a).setValue(r);
  }
  getData() {
    return i(this, a).getValue();
  }
  getUnique() {
    var s;
    return (s = this.getData()) == null ? void 0 : s.unique;
  }
  getEntityType() {
    return "issues";
  }
  destroy() {
    i(this, a).destroy(), super.destroy();
  }
}
a = new WeakMap();
const T = new E(
  "UmbWorkspaceContext",
  void 0,
  (t) => {
    var e;
    return ((e = t.getEntityType) == null ? void 0 : e.call(t)) === "issues";
  }
);
export {
  T as CONTENT_AUDIT_ISSUES_WORKSPACE_CONTEXT,
  F as ContentAuditIssuesWorkspaceContext,
  F as api
};
//# sourceMappingURL=issues-workspace.context-DbjuweVP.js.map
