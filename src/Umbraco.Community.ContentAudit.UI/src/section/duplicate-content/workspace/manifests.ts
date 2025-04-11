import { CONTENT_AUDIT_DUPLICATE_CONTENT_COLLECTION_ALIAS } from '../collection';
import { AUDIT_DUPLICATE_CONTENT_ROOT_ENTITY_TYPE } from '../entity';

const workspaceAlias = 'Umb.Workspace.ContentAudit.DuplicateContent';

export const manifests: Array<UmbExtensionManifest> = [
    {
        type: 'workspace',
        kind: 'default',
        alias: workspaceAlias,
        name: 'Duplicate Content Root Workspace',
        meta: {
            entityType: AUDIT_DUPLICATE_CONTENT_ROOT_ENTITY_TYPE,
            headline: 'Duplicate Content'
        }
    },
    {
        type: 'workspaceView',
        kind: 'collection',
        alias: 'Umb.Workspace.DuplicateContent.Collection',
        name: 'Content Audit Duplicate Content Collection Workspace View',
        meta: {
            label: 'Collection',
            icon: 'icon-layers',
            pathname: 'collection',
            collectionAlias: CONTENT_AUDIT_DUPLICATE_CONTENT_COLLECTION_ALIAS
        },
        conditions: [
            {
                alias: "Umb.Condition.WorkspaceAlias",
                match: workspaceAlias
            }
        ]
    }
]