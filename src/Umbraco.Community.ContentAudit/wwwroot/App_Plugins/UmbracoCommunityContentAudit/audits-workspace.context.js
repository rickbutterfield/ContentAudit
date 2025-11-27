var l = (t) => {
  throw TypeError(t);
};
var m = (t, e, s) => e.has(t) || l("Cannot " + s);
var i = (t, e, s) => (m(t, e, "read from private field"), s ? s.call(t) : e.get(t)), c = (t, e, s) => e.has(t) ? l("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), _ = (t, e, s, r) => (m(t, e, "write to private field"), r ? r.call(t, s) : e.set(t, s), s);
import { UmbContextBase as C } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken as w } from "@umbraco-cms/backoffice/context-api";
import { UMB_WORKSPACE_PATH_PATTERN as E, UmbWorkspaceRouteManager as O } from "@umbraco-cms/backoffice/workspace";
import { UmbObjectState as S, UmbArrayState as U } from "@umbraco-cms/backoffice/observable-api";
import { d as k, A as I, I as b } from "./index.js";
import { html as g, state as P, customElement as D } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as N } from "@umbraco-cms/backoffice/lit-element";
import { tryExecute as v } from "@umbraco-cms/backoffice/resources";
var W = Object.defineProperty, R = Object.getOwnPropertyDescriptor, A = (t) => {
  throw TypeError(t);
}, y = (t, e, s, r) => {
  for (var a = r > 1 ? void 0 : r ? R(e, s) : e, u = t.length - 1, h; u >= 0; u--)
    (h = t[u]) && (a = (r ? h(e, s, a) : h(a)) || a);
  return r && a && W(e, s, a), a;
}, T = (t, e, s) => e.has(t) || A("Cannot " + s), q = (t, e, s) => (T(t, e, "read from private field"), e.get(t)), x = (t, e, s) => e.has(t) ? A("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), K = (t, e, s, r) => (T(t, e, "write to private field"), e.set(t, s), s), p;
let d = class extends N {
  constructor() {
    super(), x(this, p), this.consumeContext(f, (t) => {
      var e;
      K(this, p, t), this.observe((e = q(this, p)) == null ? void 0 : e.data, (s) => {
        this._data = s;
      });
    });
  }
  render() {
    if (this._data)
      return g`
				<umb-workspace-editor back-path="${V}/edit/null" .enforceNoFooter="${!0}">
					<div slot="header">
						<h3 id="headline">Audit Details</h3>
					</div>
					<slot></slot>
				</umb-workspace-editor>
			`;
  }
};
p = /* @__PURE__ */ new WeakMap();
y([
  P()
], d.prototype, "_data", 2);
d = y([
  D("content-audit-audits-workspace-editor")
], d);
const V = E.generateAbsolute({
  sectionName: "audit",
  entityType: "audits-root"
});
var o, n;
class J extends C {
  constructor(s) {
    super(s, f);
    c(this, o);
    c(this, n);
    this.workspaceAlias = k, _(this, o, new S(void 0)), this.data = i(this, o).asObservable(), _(this, n, new U([], (r) => r.unique)), this.issues = i(this, n).asObservable(), this.unique = i(this, o).asObservablePart((r) => r == null ? void 0 : r.key), this.routes = new O(this), this.routes.setRoutes([
      {
        path: "edit/:unique",
        component: d,
        setup: (r, a) => {
          const u = a.match.params.unique;
          this.load(u);
        }
      }
    ]);
  }
  async load(s) {
    const { data: r } = await v(this, I.overviewByKey({ path: { id: s } }));
    r && r.key === s && (i(this, o).setValue(r), await this.loadIssues());
  }
  async loadIssues() {
    const { data: s } = await v(this, b.getAllIssues({ query: { skip: 0, take: 100 } }));
    if (s && s.items) {
      const r = s.items.sort((a, u) => u.priorityScore - a.priorityScore);
      i(this, n).setValue(r);
    }
  }
  getData() {
    return i(this, o).getValue();
  }
  getIssues() {
    return i(this, n).getValue();
  }
  getUnique() {
    var s;
    return (s = this.getData()) == null ? void 0 : s.key;
  }
  getEntityType() {
    return "audits";
  }
  destroy() {
    i(this, o).destroy(), i(this, n).destroy(), super.destroy();
  }
}
o = new WeakMap(), n = new WeakMap();
const f = new w(
  "UmbWorkspaceContext",
  void 0,
  (t) => {
    var e;
    return ((e = t.getEntityType) == null ? void 0 : e.call(t)) === "audits";
  }
);
export {
  f as CONTENT_AUDIT_AUDITS_WORKSPACE_CONTEXT,
  J as ContentAuditAuditsWorkspaceContext,
  J as api
};
//# sourceMappingURL=audits-workspace.context.js.map
