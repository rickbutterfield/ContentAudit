var l = (e) => {
  throw TypeError(e);
};
var u = (e, o, t) => o.has(e) || l("Cannot " + t);
var s = (e, o, t) => (u(e, o, "read from private field"), t ? t.call(e) : o.get(e)), c = (e, o, t) => o.has(e) ? l("Cannot add the same private member more than once") : o instanceof WeakSet ? o.add(e) : o.set(e, t), a = (e, o, t, r) => (u(e, o, "write to private field"), r ? r.call(e, t) : o.set(e, t), t);
import { UmbRepositoryBase as m } from "@umbraco-cms/backoffice/repository";
import { A as d } from "./index-BPPQFFw-.js";
import { tryExecute as f } from "@umbraco-cms/backoffice/resources";
var n;
class y {
  constructor(o) {
    c(this, n);
    a(this, n, o);
  }
  async getCollection(o) {
    const { data: t, error: r } = await f(s(this, n), d.getDuplicateContentUrls({ query: o }));
    if (r)
      return { error: r };
    if (!t)
      return { data: { items: [], total: 0 } };
    const { items: p, total: C } = t;
    return { data: { items: p, total: C } };
  }
}
n = new WeakMap();
var i;
class x extends m {
  constructor(t) {
    super(t);
    c(this, i);
    a(this, i, new y(t));
  }
  async requestCollection(t) {
    return s(this, i).getCollection(t);
  }
}
i = new WeakMap();
export {
  x as ContentAuditDuplicateContentCollectionRepository,
  x as default
};
//# sourceMappingURL=duplicate-content-collection.repository-DP0bn4Cg.js.map
