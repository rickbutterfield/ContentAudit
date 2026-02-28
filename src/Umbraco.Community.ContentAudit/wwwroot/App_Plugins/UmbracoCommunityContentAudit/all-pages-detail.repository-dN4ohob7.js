import { UmbRepositoryBase as s } from "@umbraco-cms/backoffice/repository";
import { CONTENT_AUDIT_ALL_PAGES_DETAIL_STORE_CONTEXT as o } from "./all-pages-detail.store-CNksov1D.js";
import { A as a } from "./index-Di-pAsgE.js";
import { tryExecute as n } from "@umbraco-cms/backoffice/resources";
class h {
  #t;
  constructor(t) {
    this.#t = t;
  }
  async read(t) {
    if (!t) throw new Error("Unique is missing");
    const { data: r, error: i } = await n(
      this.#t,
      a.getByKey({ path: { id: t } })
    );
    return i || !r ? { error: i } : { data: r };
  }
}
class l extends s {
  #t;
  #r;
  #i = new h(this);
  constructor(t) {
    super(t), this.#t = Promise.all([
      this.consumeContext(o, (r) => {
        this.#r = r;
      }).asPromise()
    ]);
  }
  async requestByUnique(t) {
    if (!t) throw new Error("Unique is missing");
    await this.#t;
    const { data: r, error: i } = await this.#i.read(t);
    return r && this.#r && this.#r.append(r), { data: r, error: i, asObservable: () => this.#r.byUnique(t) };
  }
  async byUnique(t) {
    if (!t) throw new Error("Unique is missing");
    return await this.#t, this.#r.byUnique(t);
  }
}
export {
  l as ContentAuditAllPagesDetailRepository,
  l as default
};
//# sourceMappingURL=all-pages-detail.repository-dN4ohob7.js.map
