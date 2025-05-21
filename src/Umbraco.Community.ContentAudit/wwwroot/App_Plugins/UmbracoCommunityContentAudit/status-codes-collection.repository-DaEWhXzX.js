var u = (e) => {
  throw TypeError(e);
};
var l = (e, o, t) => o.has(e) || u("Cannot " + t);
var i = (e, o, t) => (l(e, o, "read from private field"), t ? t.call(e) : o.get(e)), n = (e, o, t) => o.has(e) ? u("Cannot add the same private member more than once") : o instanceof WeakSet ? o.add(e) : o.set(e, t), c = (e, o, t, r) => (l(e, o, "write to private field"), r ? r.call(e, t) : o.set(e, t), t);
import { UmbRepositoryBase as C } from "@umbraco-cms/backoffice/repository";
import { A as p } from "./index-BPPQFFw-.js";
import { tryExecute as f } from "@umbraco-cms/backoffice/resources";
var s;
class y {
  constructor(o) {
    n(this, s);
    c(this, s, o);
  }
  async getCollection(o) {
    const { data: t, error: r } = await f(i(this, s), p.getLatestAuditData({ query: o }));
    if (r)
      return { error: r };
    if (!t)
      return { data: { items: [], total: 0 } };
    const { items: d, total: m } = t;
    return { data: { items: d, total: m } };
  }
}
s = new WeakMap();
var a;
class x extends C {
  constructor(t) {
    super(t);
    n(this, a);
    c(this, a, new y(t));
  }
  async requestCollection(t) {
    return i(this, a).getCollection(t);
  }
}
a = new WeakMap();
export {
  x as ContentAuditStatusCodesCollectionRepository,
  x as default
};
//# sourceMappingURL=status-codes-collection.repository-DaEWhXzX.js.map
