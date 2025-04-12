var l = (o) => {
  throw TypeError(o);
};
var u = (o, e, t) => e.has(o) || l("Cannot " + t);
var s = (o, e, t) => (u(o, e, "read from private field"), t ? t.call(o) : e.get(o)), a = (o, e, t) => e.has(o) ? l("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(o) : e.set(o, t), c = (o, e, t, n) => (u(o, e, "write to private field"), n ? n.call(o, t) : e.set(o, t), t);
import { UmbRepositoryBase as f } from "@umbraco-cms/backoffice/repository";
import { A as p } from "./index-D_Li1N95.js";
import { tryExecuteAndNotify as C } from "@umbraco-cms/backoffice/resources";
var r;
class y {
  constructor(e) {
    a(this, r);
    c(this, r, e);
  }
  async getCollection(e) {
    const { data: t, error: n } = await C(s(this, r), p.getInteralLinks(e));
    if (n)
      return { error: n };
    if (!t)
      return { data: { items: [], total: 0 } };
    const { items: d, total: m } = t;
    return { data: { items: d, total: m } };
  }
}
r = new WeakMap();
var i;
class k extends f {
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
//# sourceMappingURL=inbound-links-collection.repository-GXZClsUo.js.map
