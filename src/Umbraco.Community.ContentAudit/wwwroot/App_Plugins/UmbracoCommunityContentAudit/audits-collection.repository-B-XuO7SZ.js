import { UmbRepositoryBase as i } from "@umbraco-cms/backoffice/repository";
import { A as s } from "./index-IUh43tSs.js";
import { tryExecute as a } from "@umbraco-cms/backoffice/resources";
class n {
  #t;
  constructor(t) {
    this.#t = t;
  }
  async getCollection(t) {
    const { data: e, error: o } = await a(
      this.#t,
      s.getCollection({
        query: {
          skip: t.skip,
          take: t.take
        }
      })
    );
    return o ? { error: o } : e ? {
      data: {
        items: e.items,
        total: e.total
      }
    } : { data: { items: [], total: 0 } };
  }
}
class d extends i {
  #t;
  constructor(t) {
    super(t), this.#t = new n(t);
  }
  async requestCollection(t) {
    return this.#t.getCollection(t);
  }
}
export {
  d as ContentAuditAuditsCollectionRepository,
  d as default
};
//# sourceMappingURL=audits-collection.repository-B-XuO7SZ.js.map
