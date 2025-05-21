var m = (r) => {
  throw TypeError(r);
};
var d = (r, s, t) => s.has(r) || m("Cannot " + t);
var i = (r, s, t) => (d(r, s, "read from private field"), t ? t.call(r) : s.get(r)), n = (r, s, t) => s.has(r) ? m("Cannot add the same private member more than once") : s instanceof WeakSet ? s.add(r) : s.set(r, t), c = (r, s, t, e) => (d(r, s, "write to private field"), e ? e.call(r, t) : s.set(r, t), t);
import { UmbRepositoryBase as y } from "@umbraco-cms/backoffice/repository";
import { CONTENT_AUDIT_ISSUES_DETAIL_STORE_CONTEXT as f } from "./issues-detail.store-C6E-MPVJ.js";
import { A as p } from "./index-BPPQFFw-.js";
import { tryExecute as U } from "@umbraco-cms/backoffice/resources";
var u;
class l {
  constructor(s) {
    n(this, u);
    c(this, u, s);
  }
  async read(s) {
    if (!s) throw new Error("Unique is missing");
    const { data: t, error: e } = await U(
      i(this, u),
      p.getIssue({ query: { issueGuid: s } })
    );
    return e || !t ? { error: e } : { data: t };
  }
}
u = new WeakMap();
var a, o, h;
class I extends y {
  constructor(t) {
    super(t);
    n(this, a);
    n(this, o);
    n(this, h, new l(this));
    c(this, a, Promise.all([
      this.consumeContext(f, (e) => {
        c(this, o, e);
      }).asPromise()
    ]));
  }
  async requestByUnique(t) {
    if (!t) throw new Error("Unique is missing");
    await i(this, a);
    const { data: e, error: w } = await i(this, h).read(t);
    return e && i(this, o).append(e), { data: e, error: w, asObservable: () => i(this, o).byUnique(t) };
  }
  async byUnique(t) {
    if (!t) throw new Error("Unique is missing");
    return await i(this, a), i(this, o).byUnique(t);
  }
}
a = new WeakMap(), o = new WeakMap(), h = new WeakMap();
export {
  I as ContentAuditIssuesDetailRepository,
  I as default
};
//# sourceMappingURL=issues-detail.repository-CHRtJw1H.js.map
