var l = (e) => {
  throw TypeError(e);
};
var u = (e, o, t) => o.has(e) || l("Cannot " + t);
var i = (e, o, t) => (u(e, o, "read from private field"), t ? t.call(e) : o.get(e)), n = (e, o, t) => o.has(e) ? l("Cannot add the same private member more than once") : o instanceof WeakSet ? o.add(e) : o.set(e, t), c = (e, o, t, r) => (u(e, o, "write to private field"), r ? r.call(e, t) : o.set(e, t), t);
import { UmbRepositoryBase as p } from "@umbraco-cms/backoffice/repository";
import { A } from "./index-BPPQFFw-.js";
import { tryExecute as C } from "@umbraco-cms/backoffice/resources";
var s;
class f {
  constructor(o) {
    n(this, s);
    c(this, s, o);
  }
  async getCollection(o) {
    const { data: t, error: r } = await C(i(this, s), A.getLatestAuditData({ query: o }));
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
class S extends p {
  constructor(t) {
    super(t);
    n(this, a);
    c(this, a, new f(t));
  }
  async requestCollection(t) {
    return i(this, a).getCollection(t);
  }
}
a = new WeakMap();
export {
  S as ContentAuditAllPagesCollectionRepository,
  S as default
};
//# sourceMappingURL=all-pages-collection.repository-D9siz0VH.js.map
