import { UmbTreeServerDataSourceBase, type UmbTreeChildrenOfRequestArgs } from "@umbraco-cms/backoffice/tree";
import { type AuditTreeItemResponseModel, AuditService } from "../../../api";
import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { AuditAuditsTreeItemModel } from "./types";
import { AUDIT_AUDITS_ROOT_ENTITY_TYPE, AUDIT_AUDITS_ENTITY_TYPE } from "../entity";

export class AuditAuditsTreeServerDataSource
    extends UmbTreeServerDataSourceBase<
        AuditTreeItemResponseModel,
        AuditAuditsTreeItemModel
    > {
    constructor(host: UmbControllerHost) {
        super(host, {
            getRootItems,
            getChildrenOf,
            getAncestorsOf,
            mapper
        });
    }
}

const getRootItems = () =>
    AuditService.root({});

const getChildrenOf = (args: UmbTreeChildrenOfRequestArgs) => {
    if (args.parent.unique === null) {
        return getRootItems();
    }

    return AuditService.children({
        path: { parentId: args.parent.unique },
    });  
}

const getAncestorsOf = () => {
    // Audits are flat (direct children of root), so they have no ancestors
    // The root is fetched separately by the menu structure context
    return Promise.resolve({ data: [] });
};

const mapper = (item: AuditTreeItemResponseModel): AuditAuditsTreeItemModel => {
    return {
        unique: item.id,
        parent: {
            unique: item.parent?.id || null,
            entityType: AUDIT_AUDITS_ROOT_ENTITY_TYPE,
        },
        name: item.name,
        icon: 'icon-dashboard',
        entityType: AUDIT_AUDITS_ENTITY_TYPE,
        isFolder: item.isFolder,
        hasChildren: item.hasChildren,
    };
}