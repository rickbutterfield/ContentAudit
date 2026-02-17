import { UmbRepositoryBase as i } from "@umbraco-cms/backoffice/repository";
import { A as n } from "./index-Bkks3_By.js";
import { tryExecute as c } from "@umbraco-cms/backoffice/resources";
class l {
  #t;
  constructor(t) {
    this.#t = t;
  }
  async getCollection(t) {
    const { data: e, error: o } = await c(this.#t, n.getLatestAuditData({ query: t }));
    if (o)
      return { error: o };
    if (!e)
      return { data: { items: [], total: 0 } };
    const { items: s, total: a } = e;
    return { data: { items: s, total: a } };
  }
}
class p extends i {
  #t;
  constructor(t) {
    super(t), this.#t = new l(t);
  }
  async requestCollection(t) {
    return this.#t.getCollection(t);
  }
}
export {
  p as ContentAuditAllPagesCollectionRepository,
  p as default
};
//# sourceMappingURL=all-pages-collection.repository-D3Sa1qVr.js.map
