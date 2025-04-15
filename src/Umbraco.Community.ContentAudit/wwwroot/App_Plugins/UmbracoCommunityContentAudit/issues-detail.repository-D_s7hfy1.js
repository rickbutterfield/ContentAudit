var m = (r) => {
  throw TypeError(r);
};
var d = (r, s, t) => s.has(r) || m("Cannot " + t);
var e = (r, s, t) => (d(r, s, "read from private field"), t ? t.call(r) : s.get(r)), n = (r, s, t) => s.has(r) ? m("Cannot add the same private member more than once") : s instanceof WeakSet ? s.add(r) : s.set(r, t), c = (r, s, t, i) => (d(r, s, "write to private field"), i ? i.call(r, t) : s.set(r, t), t);
import { UmbRepositoryBase as w } from "@umbraco-cms/backoffice/repository";
import { CONTENT_AUDIT_ISSUES_DETAIL_STORE_CONTEXT as y } from "./issues-detail.store-C6E-MPVJ.js";
import { A as p } from "./index-B3GcBdtE.js";
import { tryExecuteAndNotify as U } from "@umbraco-cms/backoffice/resources";
var u;
class l {
  constructor(s) {
    n(this, u);
    c(this, u, s);
  }
  async read(s) {
    if (!s) throw new Error("Unique is missing");
    const { data: t, error: i } = await U(
      e(this, u),
      p.getIssue({ issueGuid: s })
    );
    return i || !t ? { error: i } : { data: t };
  }
}
u = new WeakMap();
var a, o, h;
class I extends w {
  constructor(t) {
    super(t);
    n(this, a);
    n(this, o);
    n(this, h, new l(this));
    c(this, a, Promise.all([
      this.consumeContext(y, (i) => {
        c(this, o, i);
      }).asPromise()
    ]));
  }
  async requestByUnique(t) {
    if (!t) throw new Error("Unique is missing");
    await e(this, a);
    const { data: i, error: f } = await e(this, h).read(t);
    return i && e(this, o).append(i), { data: i, error: f, asObservable: () => e(this, o).byUnique(t) };
  }
  async byUnique(t) {
    if (!t) throw new Error("Unique is missing");
    return await e(this, a), e(this, o).byUnique(t);
  }
}
a = new WeakMap(), o = new WeakMap(), h = new WeakMap();
export {
  I as ContentAuditIssuesDetailRepository,
  I as default
};
//# sourceMappingURL=issues-detail.repository-D_s7hfy1.js.map
