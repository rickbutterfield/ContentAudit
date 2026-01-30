import { UmbRepositoryBase as n } from "@umbraco-cms/backoffice/repository";
import { A as i } from "./index.js";
import { tryExecute as c } from "@umbraco-cms/backoffice/resources";
class l {
  #t;
  constructor(t) {
    this.#t = t;
  }
  async getCollection(t) {
    const { data: e, error: o } = await c(this.#t, i.getOrphanedPages({ query: t }));
    if (o)
      return { error: o };
    if (!e)
      return { data: { items: [], total: 0 } };
    const { items: s, total: a } = e;
    return { data: { items: s, total: a } };
  }
}
class m extends n {
  #t;
  constructor(t) {
    super(t), this.#t = new l(t);
  }
  async requestCollection(t) {
    return this.#t.getCollection(t);
  }
}
export {
  m as ContentAuditOrphanedPagesCollectionRepository,
  m as default
};
//# sourceMappingURL=orphaned-pages-collection.repository.js.map
