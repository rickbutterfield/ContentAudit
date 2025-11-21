var l = (t) => {
  throw TypeError(t);
};
var m = (t, e, s) => e.has(t) || l("Cannot " + s);
var a = (t, e, s) => (m(t, e, "read from private field"), s ? s.call(t) : e.get(t)), c = (t, e, s) => e.has(t) ? l("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), _ = (t, e, s, r) => (m(t, e, "write to private field"), r ? r.call(t, s) : e.set(t, s), s);
import { UmbContextBase as C } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken as O } from "@umbraco-cms/backoffice/context-api";
import { UMB_WORKSPACE_PATH_PATTERN as w, UmbWorkspaceRouteManager as E } from "@umbraco-cms/backoffice/workspace";
import { UmbObjectState as S, UmbArrayState as U } from "@umbraco-cms/backoffice/observable-api";
import { d as g, A as k, I } from "./index.js";
import { html as b, state as P, customElement as D } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as N } from "@umbraco-cms/backoffice/lit-element";
import { tryExecute as v } from "@umbraco-cms/backoffice/resources";
var W = Object.defineProperty, R = Object.getOwnPropertyDescriptor, A = (t) => {
  throw TypeError(t);
}, T = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? R(e, s) : e, u = t.length - 1, h; u >= 0; u--)
    (h = t[u]) && (i = (r ? h(e, s, i) : h(i)) || i);
  return r && i && W(e, s, i), i;
}, y = (t, e, s) => e.has(t) || A("Cannot " + s), q = (t, e, s) => (y(t, e, "read from private field"), e.get(t)), x = (t, e, s) => e.has(t) ? A("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), K = (t, e, s, r) => (y(t, e, "write to private field"), e.set(t, s), s), d;
let p = class extends N {
  constructor() {
    super(), x(this, d), this.consumeContext(f, (t) => {
      var e;
      K(this, d, t), this.observe((e = q(this, d)) == null ? void 0 : e.data, (s) => {
        this._data = s;
      });
    });
  }
  render() {
    if (this._data)
      return b`
				<umb-workspace-editor back-path="${V}/edit/null" .enforceNoFooter="${!0}">
					<div slot="header">
						<h3 id="headline">Audit Details</h3>
					</div>
					<slot></slot>
				</umb-workspace-editor>
			`;
  }
};
d = /* @__PURE__ */ new WeakMap();
T([
  P()
], p.prototype, "_data", 2);
p = T([
  D("content-audit-audits-workspace-editor")
], p);
const V = w.generateAbsolute({
  sectionName: "audit",
  entityType: "audits-root"
});
var o, n;
class J extends C {
  constructor(s) {
    super(s, f);
    c(this, o);
    c(this, n);
    this.workspaceAlias = g, _(this, o, new S(void 0)), this.data = a(this, o).asObservable(), _(this, n, new U([], (r) => r.unique)), this.issues = a(this, n).asObservable(), this.unique = a(this, o).asObservablePart((r) => r == null ? void 0 : r.key), this.routes = new E(this), this.routes.setRoutes([
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
    const { data: r } = await v(this, k.getLatestAuditOverview());
    r && r.key === s && (a(this, o).setValue(r), await this.loadIssues());
  }
  async loadIssues() {
    const { data: s } = await v(this, I.getAllIssues({ query: { skip: 0, take: 100 } }));
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
const f = new O(
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
