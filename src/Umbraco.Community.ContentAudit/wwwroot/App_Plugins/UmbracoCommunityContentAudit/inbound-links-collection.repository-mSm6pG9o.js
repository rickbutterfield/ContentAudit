var l = (o) => {
  throw TypeError(o);
};
var u = (o, e, t) => e.has(o) || l("Cannot " + t);
var s = (o, e, t) => (u(o, e, "read from private field"), t ? t.call(o) : e.get(o)), a = (o, e, t) => e.has(o) ? l("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(o) : e.set(o, t), c = (o, e, t, r) => (u(o, e, "write to private field"), r ? r.call(o, t) : e.set(o, t), t);
import { UmbRepositoryBase as p } from "@umbraco-cms/backoffice/repository";
import { A as C } from "./index-BPPQFFw-.js";
import { tryExecute as f } from "@umbraco-cms/backoffice/resources";
var n;
class y {
  constructor(e) {
    a(this, n);
    c(this, n, e);
  }
  async getCollection(e) {
    const { data: t, error: r } = await f(s(this, n), C.getInteralLinks({ query: e }));
    if (r)
      return { error: r };
    if (!t)
      return { data: { items: [], total: 0 } };
    const { items: d, total: m } = t;
    return { data: { items: d, total: m } };
  }
}
n = new WeakMap();
var i;
class k extends p {
  constructor(t) {
    super(t);
    a(this, i);
    c(this, i, new y(t));
  }
  async requestCollection(t) {
    return s(this, i).getCollection(t);
  }
}
i = new WeakMap();
export {
  k as ContentAuditInboundLinksCollectionRepository,
  k as default
};
//# sourceMappingURL=inbound-links-collection.repository-mSm6pG9o.js.map
