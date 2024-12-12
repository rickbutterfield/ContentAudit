import { CONTENT_AUDIT_ORPHANED_PAGES_COLLECTION_ALIAS } from '../collection';
import { AUDIT_ORPHANED_PAGES_ROOT_ENTITY_TYPE } from '../entity';

const workspaceAlias = 'Umb.Workspace.ContentAudit.OrphanedPages';

export const manifests: Array<UmbExtensionManifest> = [
    {
        type: 'workspace',
        kind: 'default',
        alias: workspaceAlias,
        name: 'Orphaned Pages Root Workspace',
        meta: {
            entityType: AUDIT_ORPHANED_PAGES_ROOT_ENTITY_TYPE,
            headline: 'Orphaned Pages'
        }
    },
    {
        type: 'workspaceView',
        kind: 'collection',
        alias: 'Umb.Workspace.OrphanedPages.Collection',
        name: 'Content Audit Orphaned Pages Collection Workspace View',
        meta: {
            label: 'Collection',
            icon: 'icon-layers',
            pathname: 'collection',
            collectionAlias: CONTENT_AUDIT_ORPHANED_PAGES_COLLECTION_ALIAS
        },
        conditions: [
            {
                alias: "Umb.Condition.WorkspaceAlias",
                match: workspaceAlias
            }
        ]
    }
]