import { UmbRepositoryBase as a } from "@umbraco-cms/backoffice/repository";
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
    const { items: i, total: s } = e;
    return { data: { items: i, total: s } };
  }
}
class C extends a {
  #t;
  constructor(t) {
    super(t), this.#t = new l(t);
  }
  async requestCollection(t) {
    return this.#t.getCollection(t);
  }
}
export {
  C as ContentAuditCoreWebVitalsCollectionRepository,
  C as default
};
//# sourceMappingURL=core-web-vitals-collection.repository-DB2EzHtv.js.map
