var l = (t) => {
  throw TypeError(t);
};
var m = (t, e, s) => e.has(t) || l("Cannot " + s);
var a = (t, e, s) => (m(t, e, "read from private field"), s ? s.call(t) : e.get(t)), c = (t, e, s) => e.has(t) ? l("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), _ = (t, e, s, r) => (m(t, e, "write to private field"), r ? r.call(t, s) : e.set(t, s), s);
import { UmbContextBase as O } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken as w } from "@umbraco-cms/backoffice/context-api";
import { UMB_WORKSPACE_PATH_PATTERN as E, UmbWorkspaceRouteManager as S } from "@umbraco-cms/backoffice/workspace";
import { UmbObjectState as U, UmbArrayState as g } from "@umbraco-cms/backoffice/observable-api";
import { d as k, A as v } from "./index.js";
import { html as b, state as I, customElement as P } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as D } from "@umbraco-cms/backoffice/lit-element";
import { tryExecute as A } from "@umbraco-cms/backoffice/resources";
var N = Object.defineProperty, W = Object.getOwnPropertyDescriptor, T = (t) => {
  throw TypeError(t);
}, y = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? W(e, s) : e, u = t.length - 1, h; u >= 0; u--)
    (h = t[u]) && (i = (r ? h(e, s, i) : h(i)) || i);
  return r && i && N(e, s, i), i;
}, f = (t, e, s) => e.has(t) || T("Cannot " + s), R = (t, e, s) => (f(t, e, "read from private field"), e.get(t)), q = (t, e, s) => e.has(t) ? T("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), x = (t, e, s, r) => (f(t, e, "write to private field"), e.set(t, s), s), d;
let p = class extends D {
  constructor() {
    super(), q(this, d), this.consumeContext(C, (t) => {
      var e;
      x(this, d, t), this.observe((e = R(this, d)) == null ? void 0 : e.data, (s) => {
        this._data = s;
      });
    });
  }
  render() {
    if (this._data)
      return b`
				<umb-workspace-editor back-path="${K}/edit/null" .enforceNoFooter="${!0}">
					<div slot="header">
						<h3 id="headline">Audit Details</h3>
					</div>
					<slot></slot>
				</umb-workspace-editor>
			`;
  }
};
d = /* @__PURE__ */ new WeakMap();
y([
  I()
], p.prototype, "_data", 2);
p = y([
  P("content-audit-audits-workspace-editor")
], p);
const K = E.generateAbsolute({
  sectionName: "audit",
  entityType: "audits-root"
});
var o, n;
class z extends O {
  constructor(s) {
    super(s, C);
    c(this, o);
    c(this, n);
    this.workspaceAlias = k, _(this, o, new U(void 0)), this.data = a(this, o).asObservable(), _(this, n, new g([], (r) => r.unique)), this.issues = a(this, n).asObservable(), this.unique = a(this, o).asObservablePart((r) => r == null ? void 0 : r.key), this.routes = new S(this), this.routes.setRoutes([
      {
        path: "edit/:unique",
        component: p,
        setup: (r, i) => {
          const u = i.match.params.unique;
          this.load(u);
        }
      }
    ]);
  }
  async load(s) {
    const { data: r } = await A(this, v.getLatestAuditOverview());
    r && r.key === s && (a(this, o).setValue(r), await this.loadIssues());
  }
  async loadIssues() {
    const { data: s } = await A(this, v.getAllIssues({ query: { skip: 0, take: 100 } }));
    if (s && s.items) {
      const r = s.items.sort((i, u) => u.priorityScore - i.priorityScore);
      a(this, n).setValue(r);
    }
  }
  getData() {
    return a(this, o).getValue();
  }
  getIssues() {
    return a(this, n).getValue();
  }
  getUnique() {
    var s;
    return (s = this.getData()) == null ? void 0 : s.key;
  }
  getEntityType() {
    return "audits";
  }
  destroy() {
    a(this, o).destroy(), a(this, n).destroy(), super.destroy();
  }
}
o = new WeakMap(), n = new WeakMap();
const C = new w(
  "UmbWorkspaceContext",
  void 0,
  (t) => {
    var e;
    return ((e = t.getEntityType) == null ? void 0 : e.call(t)) === "audits";
  }
);
export {
  C as CONTENT_AUDIT_AUDITS_WORKSPACE_CONTEXT,
  z as ContentAuditAuditsWorkspaceContext,
  z as api
};
//# sourceMappingURL=audits-workspace.context.js.map
