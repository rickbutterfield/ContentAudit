import { CONTENT_AUDIT_METADATA_COLLECTION_ALIAS } from '../collection/constants';
import { AUDIT_METADATA_ROOT_ENTITY_TYPE } from '../entity';

const workspaceAlias = 'Umb.Workspace.ContentAudit.Metadata';

export const manifests: Array<UmbExtensionManifest> = [
    {
        type: 'workspace',
        kind: 'default',
        alias: workspaceAlias,
        name: 'Metadata Root Workspace',
        meta: {
            entityType: AUDIT_METADATA_ROOT_ENTITY_TYPE,
            headline: 'Metadata'
        }
    },
    {
        type: 'workspaceView',
        kind: 'collection',
        alias: 'Umb.Workspace.Metadata.Collection',
        name: 'Content Audit Metadata Collection Workspace View',
        meta: {
            label: 'Collection',
            icon: 'icon-layers',
            pathname: 'collection',
            collectionAlias: CONTENT_AUDIT_METADATA_COLLECTION_ALIAS
        },
        conditions: [
            {
                alias: "Umb.Condition.WorkspaceAlias",
                match: workspaceAlias
            }
        ]
    }
]