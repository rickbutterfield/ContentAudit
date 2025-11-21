import { UmbTreeServerDataSourceBase as s, UmbTreeRepositoryBase as n } from "@umbraco-cms/backoffice/tree";
import { A as r, b as a, c as i } from "./index.js";
class u extends s {
  constructor(t) {
    super(t, {
      getRootItems: o,
      getChildrenOf: d,
      getAncestorsOf: c,
      mapper: p
    });
  }
}
const o = () => r.root({}), d = (e) => e.parent.unique === null ? o() : r.children({
  path: { parentId: e.parent.unique }
}), c = () => {
  throw new Error("Not supported for the forms tree");
}, p = (e) => {
  var t;
  return {
    unique: e.id,
    parent: {
      unique: ((t = e.parent) == null ? void 0 : t.id) || null,
      entityType: i
    },
    name: e.name,
    icon: "icon-scan",
    entityType: a,
    isFolder: e.isFolder,
    hasChildren: e.hasChildren
  };
};
class m extends n {
  constructor(t) {
    super(t, u);
  }
  async requestTreeRoot() {
    const { data: t } = await this._treeSource.getRootItems({ skip: 0, take: 0 });
    return { data: {
      unique: null,
      entityType: "audits-root",
      name: "Audits",
      hasChildren: t ? t.total > 0 : !1,
      isFolder: !0
    } };
  }
}
export {
  m as AuditAuditsTreeRepository,
  m as api
};
//# sourceMappingURL=audits-tree.repository.js.map
