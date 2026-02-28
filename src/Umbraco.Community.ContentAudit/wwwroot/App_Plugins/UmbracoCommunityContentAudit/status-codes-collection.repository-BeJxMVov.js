import { UmbRepositoryBase as i } from "@umbraco-cms/backoffice/repository";
import { A as n } from "./index-DCD4XZJW.js";
import { tryExecute as c } from "@umbraco-cms/backoffice/resources";
class u {
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
class C extends i {
  #t;
  constructor(t) {
    super(t), this.#t = new u(t);
  }
  async requestCollection(t) {
    return this.#t.getCollection(t);
  }
}
export {
  C as ContentAuditStatusCodesCollectionRepository,
  C as default
};
//# sourceMappingURL=status-codes-collection.repository-BeJxMVov.js.map
