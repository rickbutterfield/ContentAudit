var y = (t) => {
  throw TypeError(t);
};
var T = (t, s, e) => s.has(t) || y("Cannot " + e);
var a = (t, s, e) => (T(t, s, "read from private field"), e ? e.call(t) : s.get(t)), d = (t, s, e) => s.has(t) ? y("Cannot add the same private member more than once") : s instanceof WeakSet ? s.add(t) : s.set(t, e), _ = (t, s, e, r) => (T(t, s, "write to private field"), r ? r.call(t, e) : s.set(t, e), e);
import { UmbContextBase as C } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken as E } from "@umbraco-cms/backoffice/context-api";
import { UMB_WORKSPACE_PATH_PATTERN as P, UmbWorkspaceRouteManager as S } from "@umbraco-cms/backoffice/workspace";
import { UmbObjectState as A, UmbArrayState as g, UmbStringState as I, UmbBooleanState as k } from "@umbraco-cms/backoffice/observable-api";
import { d as N, b as D, A as W, I as q } from "./index.js";
import { html as R, state as V, customElement as x } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as K } from "@umbraco-cms/backoffice/lit-element";
import { tryExecute as b } from "@umbraco-cms/backoffice/resources";
var B = Object.defineProperty, M = Object.getOwnPropertyDescriptor, U = (t) => {
  throw TypeError(t);
}, w = (t, s, e, r) => {
  for (var i = r > 1 ? void 0 : r ? M(s, e) : s, h = t.length - 1, v; h >= 0; h--)
    (v = t[h]) && (i = (r ? v(s, e, i) : v(i)) || i);
  return r && i && B(s, e, i), i;
}, O = (t, s, e) => s.has(t) || U("Cannot " + e), H = (t, s, e) => (O(t, s, "read from private field"), s.get(t)), L = (t, s, e) => s.has(t) ? U("Cannot add the same private member more than once") : s instanceof WeakSet ? s.add(t) : s.set(t, e), Y = (t, s, e, r) => (O(t, s, "write to private field"), s.set(t, e), e), c;
let m = class extends K {
  constructor() {
    super(), L(this, c), this.consumeContext(f, (t) => {
      var s;
      Y(this, c, t), this.observe((s = H(this, c)) == null ? void 0 : s.data, (e) => {
        this._data = e;
      });
    });
  }
  render() {
    if (this._data)
      return R`
				<umb-workspace-editor back-path="${$}/edit/null" .enforceNoFooter="${!0}">
					<div slot="header">
						<h3 id="headline">Audit Details</h3>
					</div>
					<slot></slot>
				</umb-workspace-editor>
			`;
  }
};
c = /* @__PURE__ */ new WeakMap();
w([
  V()
], m.prototype, "_data", 2);
m = w([
  x("content-audit-audits-workspace-editor")
], m);
const $ = P.generateAbsolute({
  sectionName: "audit",
  entityType: "audits-root"
});
var n, u, p, l, o;
class et extends C {
  constructor(e) {
    super(e, f);
    d(this, n);
    d(this, u);
    d(this, p);
    d(this, l);
    d(this, o);
    this.workspaceAlias = N, _(this, n, new A(void 0)), this.data = a(this, n).asObservable(), _(this, u, new g([], (r) => r.unique)), this.issues = a(this, u).asObservable(), this.unique = a(this, n).asObservablePart((r) => r == null ? void 0 : r.key), _(this, p, new I(D)), this.entityType = a(this, p).asObservable(), _(this, l, new k(!1)), this.isNew = a(this, l).asObservable(), _(this, o, new A(void 0)), this._internal_createUnderParent = a(this, o).asObservable(), this._internal_createUnderParentEntityType = a(this, o).asObservablePart((r) => r == null ? void 0 : r.entityType), this._internal_createUnderParentEntityUnique = a(this, o).asObservablePart((r) => r == null ? void 0 : r.unique), this.routes = new S(this), this.routes.setRoutes([
      {
        path: "edit/:unique",
        component: m,
        setup: (r, i) => {
          const h = i.match.params.unique;
          this.load(h);
        }
      }
    ]);
  }
  // Required for UMB_SUBMITTABLE_TREE_ENTITY_WORKSPACE_CONTEXT (read-only, so no-op)
  async requestSubmit() {
  }
  getIsNew() {
    return a(this, l).getValue();
  }
  _internal_getCreateUnderParent() {
    return a(this, o).getValue();
  }
  _internal_setCreateUnderParent(e) {
    a(this, o).setValue(e);
  }
  async load(e) {
    const { data: r } = await b(this, W.overviewByKey({ path: { id: e } }));
    r && r.key === e && (a(this, n).setValue(r), await this.loadIssues());
  }
  async loadIssues() {
    const { data: e } = await b(this, q.getAllIssues({ query: { skip: 0, take: 100 } }));
    if (e && e.items) {
      const r = e.items.sort((i, h) => h.priorityScore - i.priorityScore);
      a(this, u).setValue(r);
    }
  }
  getData() {
    return a(this, n).getValue();
  }
  getIssues() {
    return a(this, u).getValue();
  }
  getUnique() {
    var e;
    return (e = this.getData()) == null ? void 0 : e.key;
  }
  getEntityType() {
    return "audits";
  }
  destroy() {
    a(this, n).destroy(), a(this, u).destroy(), super.destroy();
  }
}
n = new WeakMap(), u = new WeakMap(), p = new WeakMap(), l = new WeakMap(), o = new WeakMap();
const f = new E(
  "UmbWorkspaceContext",
  void 0,
  (t) => {
    var s;
    return ((s = t.getEntityType) == null ? void 0 : s.call(t)) === "audits";
  }
);
export {
  f as CONTENT_AUDIT_AUDITS_WORKSPACE_CONTEXT,
  et as ContentAuditAuditsWorkspaceContext,
  et as api
};
//# sourceMappingURL=audits-workspace.context.js.map
