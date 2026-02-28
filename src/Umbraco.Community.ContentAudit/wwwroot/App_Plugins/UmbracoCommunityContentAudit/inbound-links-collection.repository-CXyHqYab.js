import { UmbRepositoryBase as s } from "@umbraco-cms/backoffice/repository";
import { A as a } from "./index-B8flLQWi.js";
import { tryExecute as c } from "@umbraco-cms/backoffice/resources";
class l {
  #t;
  constructor(t) {
    this.#t = t;
  }
  async getCollection(t) {
    const { data: o, error: e } = await c(this.#t, a.getInternalLinks({ query: t }));
    if (e)
      return { error: e };
    if (!o)
      return { data: { items: [], total: 0 } };
    const { items: n, total: i } = o;
    return { data: { items: n, total: i } };
  }
}
class p extends s {
  #t;
  constructor(t) {
    super(t), this.#t = new l(t);
  }
  async requestCollection(t) {
    return this.#t.getCollection(t);
  }
}
export {
  p as ContentAuditInboundLinksCollectionRepository,
  p as default
};
//# sourceMappingURL=inbound-links-collection.repository-CXyHqYab.js.map
