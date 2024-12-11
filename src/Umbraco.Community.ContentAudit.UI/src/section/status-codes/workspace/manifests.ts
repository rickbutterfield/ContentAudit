import { ManifestWorkspaceView } from '@umbraco-cms/backoffice/workspace';
import { CONTENT_AUDIT_STATUS_CODES_COLLECTION_ALIAS } from '../collection';
import { AUDIT_STATUS_CODES_ROOT_ENTITY_TYPE } from '../entity';

const workspaceAlias = 'Umb.Workspace.ContentAudit.StatusCodes';

export const manifests: Array<UmbExtensionManifest> = [
    {
        type: 'workspace',
        kind: 'default',
        alias: workspaceAlias,
        name: 'StatusCodes Root Workspace',
        meta: {
            entityType: AUDIT_STATUS_CODES_ROOT_ENTITY_TYPE,
            headline: 'Status Codes'
        }
    },
    {
        type: 'workspaceView',
        kind: 'collection',
        alias: 'Umb.Workspace.StatusCodes.Collection',
        name: 'Content Audit Status Codes Collection Workspace View',
        meta: {
            label: 'Collection',
            icon: 'icon-layers',
            pathname: 'collection',
            collectionAlias: CONTENT_AUDIT_STATUS_CODES_COLLECTION_ALIAS
        },
        conditions: [
            {
                alias: "Umb.Condition.WorkspaceAlias",
                match: workspaceAlias
            }
        ]
    }
]