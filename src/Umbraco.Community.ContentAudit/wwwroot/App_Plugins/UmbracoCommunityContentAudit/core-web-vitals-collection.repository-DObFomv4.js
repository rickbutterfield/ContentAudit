var l = (e) => {
  throw TypeError(e);
};
var u = (e, o, t) => o.has(e) || l("Cannot " + t);
var a = (e, o, t) => (u(e, o, "read from private field"), t ? t.call(e) : o.get(e)), n = (e, o, t) => o.has(e) ? l("Cannot add the same private member more than once") : o instanceof WeakSet ? o.add(e) : o.set(e, t), c = (e, o, t, r) => (u(e, o, "write to private field"), r ? r.call(e, t) : o.set(e, t), t);
import { UmbRepositoryBase as C } from "@umbraco-cms/backoffice/repository";
import { A as f } from "./index-BwZayLry.js";
import { tryExecuteAndNotify as p } from "@umbraco-cms/backoffice/resources";
var i;
class y {
  constructor(o) {
    n(this, i);
    c(this, i, o);
  }
  async getCollection(o) {
    const { data: t, error: r } = await p(a(this, i), f.getLatestAuditData(o));
    if (r)
      return { error: r };
    if (!t)
      return { data: { items: [], total: 0 } };
    const { items: d, total: m } = t;
    return { data: { items: d, total: m } };
  }
}
i = new WeakMap();
var s;
class x extends C {
  constructor(t) {
    super(t);
    n(this, s);
    c(this, s, new y(t));
  }
  async requestCollection(t) {
    return a(this, s).getCollection(t);
  }
}
s = new WeakMap();
export {
  x as ContentAuditCoreWebVitalsCollectionRepository,
  x as default
};
//# sourceMappingURL=core-web-vitals-collection.repository-DObFomv4.js.map
