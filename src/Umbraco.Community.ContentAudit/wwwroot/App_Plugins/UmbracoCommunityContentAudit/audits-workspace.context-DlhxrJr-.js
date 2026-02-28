import { UmbContextBase as m } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken as v } from "@umbraco-cms/backoffice/context-api";
import { UMB_WORKSPACE_PATH_PATTERN as y, UmbWorkspaceRouteManager as T } from "@umbraco-cms/backoffice/workspace";
import { UmbObjectState as h, UmbArrayState as A, UmbStringState as b, UmbBooleanState as U } from "@umbraco-cms/backoffice/observable-api";
import { c as w, a as O, A as f, I as C } from "./index-Di-pAsgE.js";
import { html as E, state as P, customElement as S } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as g } from "@umbraco-cms/backoffice/lit-element";
import { tryExecute as d } from "@umbraco-cms/backoffice/resources";
var I = Object.defineProperty, k = Object.getOwnPropertyDescriptor, p = (s) => {
  throw TypeError(s);
}, c = (s, t, e, r) => {
  for (var a = r > 1 ? void 0 : r ? k(t, e) : t, o = s.length - 1, u; o >= 0; o--)
    (u = s[o]) && (a = (r ? u(t, e, a) : u(a)) || a);
  return r && a && I(t, e, a), a;
}, _ = (s, t, e) => t.has(s) || p("Cannot " + e), N = (s, t, e) => (_(s, t, "read from private field"), t.get(s)), D = (s, t, e) => t.has(s) ? p("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(s) : t.set(s, e), x = (s, t, e, r) => (_(s, t, "write to private field"), t.set(s, e), e), i;
let n = class extends g {
  constructor() {
    super(), D(this, i), this.consumeContext(l, (s) => {
      x(this, i, s), this.observe(N(this, i)?.data, (t) => {
        this._data = t;
      });
    });
  }
  render() {
    if (this._data)
      return E`
				<umb-workspace-editor back-path="${W}/edit/null" .enforceNoFooter="${!0}">
					<div slot="header">
						<h3 id="headline">Audit Details</h3>
					</div>
					<slot></slot>
				</umb-workspace-editor>
			`;
  }
};
i = /* @__PURE__ */ new WeakMap();
c([
  P()
], n.prototype, "_data", 2);
n = c([
  S("content-audit-audits-workspace-editor")
], n);
const W = y.generateAbsolute({
  sectionName: "audit",
  entityType: "audits-root"
});
class Y extends m {
  constructor(t) {
    super(t, l), this.workspaceAlias = w, this.#t = new h(void 0), this.data = this.#t.asObservable(), this.#s = new A([], (e) => e.unique), this.issues = this.#s.asObservable(), this.unique = this.#t.asObservablePart((e) => e?.key), this.#r = new b(O), this.entityType = this.#r.asObservable(), this.#a = new U(!1), this.isNew = this.#a.asObservable(), this.#e = new h(void 0), this._internal_createUnderParent = this.#e.asObservable(), this._internal_createUnderParentEntityType = this.#e.asObservablePart((e) => e?.entityType), this._internal_createUnderParentEntityUnique = this.#e.asObservablePart((e) => e?.unique), this.routes = new T(this), this.routes.setRoutes([
      {
        path: "edit/:unique",
        component: n,
        setup: (e, r) => {
          const a = r.match.params.unique;
          this.load(a);
        }
      }
    ]);
  }
  #t;
  #s;
  #r;
  #a;
  #e;
  // Required for UMB_SUBMITTABLE_TREE_ENTITY_WORKSPACE_CONTEXT (read-only, so no-op)
  async requestSubmit() {
  }
  getIsNew() {
    return this.#a.getValue();
  }
  _internal_getCreateUnderParent() {
    return this.#e.getValue();
  }
  _internal_setCreateUnderParent(t) {
    this.#e.setValue(t);
  }
  async load(t) {
    const { data: e } = await d(this, f.overviewByKey({ path: { id: t } }));
    e && e.key === t && (this.#t.setValue(e), await this.loadIssues());
  }
  async loadIssues() {
    const { data: t } = await d(this, C.getAllIssues({ query: { skip: 0, take: 100 } }));
    if (t && t.items) {
      const e = t.items.sort((r, a) => (a.priorityScore ?? 0) - (r.priorityScore ?? 0));
      this.#s.setValue(e);
    }
  }
  getData() {
    return this.#t.getValue();
  }
  getIssues() {
    return this.#s.getValue();
  }
  getUnique() {
    return this.getData()?.key;
  }
  getEntityType() {
    return "audits";
  }
  destroy() {
    this.#t.destroy(), this.#s.destroy(), super.destroy();
  }
}
const l = new v(
  "UmbWorkspaceContext",
  void 0,
  (s) => s.getEntityType?.() === "audits"
);
export {
  l as CONTENT_AUDIT_AUDITS_WORKSPACE_CONTEXT,
  Y as ContentAuditAuditsWorkspaceContext,
  Y as api
};
//# sourceMappingURL=audits-workspace.context-DlhxrJr-.js.map
