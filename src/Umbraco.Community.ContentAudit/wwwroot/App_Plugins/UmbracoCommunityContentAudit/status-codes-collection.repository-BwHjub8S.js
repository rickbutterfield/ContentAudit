var u = (o) => {
  throw TypeError(o);
};
var l = (o, e, t) => e.has(o) || u("Cannot " + t);
var a = (o, e, t) => (l(o, e, "read from private field"), t ? t.call(o) : e.get(o)), n = (o, e, t) => e.has(o) ? u("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(o) : e.set(o, t), c = (o, e, t, r) => (l(o, e, "write to private field"), r ? r.call(o, t) : e.set(o, t), t);
import { UmbRepositoryBase as C } from "@umbraco-cms/backoffice/repository";
import { A as f } from "./index-Ca1vHQCw.js";
import { tryExecuteAndNotify as p } from "@umbraco-cms/backoffice/resources";
var s;
class y {
  constructor(e) {
    n(this, s);
    c(this, s, e);
  }
  async getCollection(e) {
    const { data: t, error: r } = await p(a(this, s), f.getLatestAuditData(e));
    if (r)
      return { error: r };
    if (!t)
      return { data: { items: [], total: 0 } };
    const { items: d, total: m } = t;
    return { data: { items: d, total: m } };
  }
}
s = new WeakMap();
var i;
class x extends C {
  constructor(t) {
    super(t);
    n(this, i);
    c(this, i, new y(t));
  }
  async requestCollection(t) {
    return a(this, i).getCollection(t);
  }
}
i = new WeakMap();
export {
  x as ContentAuditStatusCodesCollectionRepository,
  x as default
};
//# sourceMappingURL=status-codes-collection.repository-BwHjub8S.js.map
