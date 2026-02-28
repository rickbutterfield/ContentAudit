import { UmbRepositoryBase as s } from "@umbraco-cms/backoffice/repository";
import { A as c } from "./index-Di-pAsgE.js";
import { tryExecute as a } from "@umbraco-cms/backoffice/resources";
class l {
  #t;
  constructor(t) {
    this.#t = t;
  }
  async getCollection(t) {
    const { data: e, error: o } = await a(this.#t, c.getDuplicateContentUrls({ query: t }));
    if (o)
      return { error: o };
    if (!e)
      return { data: { items: [], total: 0 } };
    const { items: n, total: i } = e;
    return { data: { items: n, total: i } };
  }
}
class m extends s {
  #t;
  constructor(t) {
    super(t), this.#t = new l(t);
  }
  async requestCollection(t) {
    return this.#t.getCollection(t);
  }
}
export {
  m as ContentAuditDuplicateContentCollectionRepository,
  m as default
};
//# sourceMappingURL=duplicate-content-collection.repository-DS0-0cv1.js.map
