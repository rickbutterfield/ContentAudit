import { AUDIT_AUDITS_ENTITY_TYPE, AUDIT_AUDITS_ROOT_ENTITY_TYPE } from '../entity';

export const manifests: Array<UmbExtensionManifest> = [
    {
        type: 'repository',
        alias: 'ContentAudit.Repository.Audits',
        name: 'Content Audit Audits Repository',
        api: () => import('./audits-tree.repository'),
    },
    {
        type: 'tree',
        kind: 'default',
        alias: 'ContentAudit.Tree.Audits',
        name: 'Content Audit Audits Tree',
        meta: {
            repositoryAlias: 'ContentAudit.Repository.Audits',
        }
    },
    {
        type: 'treeItem',
        kind: 'default',
        alias: 'ContentAudit.TreeItem.Audits',
        name: 'Content Audit Audits Tree Item',
        forEntityTypes: [AUDIT_AUDITS_ENTITY_TYPE, AUDIT_AUDITS_ROOT_ENTITY_TYPE]
    }
];