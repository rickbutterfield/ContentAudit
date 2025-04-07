var c = (t) => {
  throw TypeError(t);
};
var h = (t, e, s) => e.has(t) || c("Cannot " + s);
var i = (t, e, s) => (h(t, e, "read from private field"), s ? s.call(t) : e.get(t)), d = (t, e, s) => e.has(t) ? c("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), m = (t, e, s, r) => (h(t, e, "write to private field"), r ? r.call(t, s) : e.set(t, s), s);
import { UmbContextBase as T } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken as A } from "@umbraco-cms/backoffice/context-api";
import { UMB_WORKSPACE_PATH_PATTERN as f, UmbWorkspaceRouteManager as y } from "@umbraco-cms/backoffice/workspace";
import { state as O, customElement as S, html as w } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as U } from "@umbraco-cms/backoffice/lit-element";
import { ContentAuditIssuesDetailRepository as P } from "./issues-detail.repository-CvFYzWGH.js";
import { UmbObjectState as I } from "@umbraco-cms/backoffice/observable-api";
import { a as W } from "./index-BtsMjuJm.js";
var k = Object.defineProperty, b = Object.getOwnPropertyDescriptor, l = (t) => {
  throw TypeError(t);
}, v = (t, e, s, r) => {
  for (var o = r > 1 ? void 0 : r ? b(e, s) : e, n = t.length - 1, _; n >= 0; n--)
    (_ = t[n]) && (o = (r ? _(e, s, o) : _(o)) || o);
  return r && o && k(e, s, o), o;
}, C = (t, e, s) => e.has(t) || l("Cannot " + s), q = (t, e, s) => (C(t, e, "read from private field"), s ? s.call(t) : e.get(t)), N = (t, e, s) => e.has(t) ? l("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), R = (t, e, s, r) => (C(t, e, "write to private field"), e.set(t, s), s), p;
let u = class extends U {
  constructor() {
    super(), N(this, p), this.consumeContext(E, (t) => {
      R(this, p, t), this.observe(q(this, p).data, (e) => {
        this._data = e;
      });
    });
  }
  render() {
    return w`
			<umb-workspace-editor back-path="${D}">
			</umb-workspace-editor>
		`;
  }
};
p = /* @__PURE__ */ new WeakMap();
v([
  O()
], u.prototype, "_data", 2);
u = v([
  S("content-audit-issues-workspace-editor")
], u);
const g = u, D = f.generateAbsolute({
  sectionName: "audit",
  entityType: "issues-root"
});
var a;
class X extends T {
  constructor(s) {
    super(s, E);
    d(this, a);
    this.workspaceAlias = W, this.repository = new P(this), m(this, a, new I(void 0)), this.data = i(this, a).asObservable(), this.unique = i(this, a).asObservablePart((r) => r == null ? void 0 : r.unique), this.routes = new y(this), this.routes.setRoutes([
      {
        path: "edit/:unique",
        component: g,
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
const E = new A(
  "UmbWorkspaceContext",
  void 0,
  (t) => {
    var e;
    return ((e = t.getEntityType) == null ? void 0 : e.call(t)) === "issues";
  }
);
export {
  E as CONTENT_AUDIT_ISSUES_WORKSPACE_CONTEXT,
  X as ContentAuditIssuesWorkspaceContext,
  X as api
};
//# sourceMappingURL=issues-workspace.context-ChojdVoV.js.map
