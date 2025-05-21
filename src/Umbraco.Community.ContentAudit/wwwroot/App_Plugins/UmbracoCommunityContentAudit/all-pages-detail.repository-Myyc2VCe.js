var m = (e) => {
  throw TypeError(e);
};
var d = (e, r, t) => r.has(e) || m("Cannot " + t);
var s = (e, r, t) => (d(e, r, "read from private field"), t ? t.call(e) : r.get(e)), n = (e, r, t) => r.has(e) ? m("Cannot add the same private member more than once") : r instanceof WeakSet ? r.add(e) : r.set(e, t), c = (e, r, t, i) => (d(e, r, "write to private field"), i ? i.call(e, t) : r.set(e, t), t);
import { UmbRepositoryBase as w } from "@umbraco-cms/backoffice/repository";
import { CONTENT_AUDIT_ALL_PAGES_DETAIL_STORE_CONTEXT as y } from "./all-pages-detail.store-CNksov1D.js";
import { A } from "./index-BPPQFFw-.js";
import { tryExecute as f } from "@umbraco-cms/backoffice/resources";
var u;
class p {
  constructor(r) {
    n(this, u);
    c(this, u, r);
  }
  async read(r) {
    if (!r) throw new Error("Unique is missing");
    const { data: t, error: i } = await f(
      s(this, u),
      A.getLatestPageAuditData({ query: { unique: r } })
    );
    return i || !t ? { error: i } : { data: t };
  }
}
u = new WeakMap();
var o, a, h;
class b extends w {
  constructor(t) {
    super(t);
    n(this, o);
    n(this, a);
    n(this, h, new p(this));
    c(this, o, Promise.all([
      this.consumeContext(y, (i) => {
        c(this, a, i);
      }).asPromise()
    ]));
  }
  async requestByUnique(t) {
    if (!t) throw new Error("Unique is missing");
    await s(this, o);
    const { data: i, error: l } = await s(this, h).read(t);
    return i && s(this, a).append(i), { data: i, error: l, asObservable: () => s(this, a).byUnique(t) };
  }
  async byUnique(t) {
    if (!t) throw new Error("Unique is missing");
    return await s(this, o), s(this, a).byUnique(t);
  }
}
o = new WeakMap(), a = new WeakMap(), h = new WeakMap();
export {
  b as ContentAuditAllPagesDetailRepository,
  b as default
};
//# sourceMappingURL=all-pages-detail.repository-Myyc2VCe.js.map
