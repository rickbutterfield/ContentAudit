import { CONTENT_AUDIT_CARBON_RATING_COLLECTION_ALIAS } from '../collection';
import { AUDIT_CARBON_RATING_ROOT_ENTITY_TYPE } from '../entity';

const workspaceAlias = 'Umb.Workspace.ContentAudit.CarbonRating';

export const manifests: Array<UmbExtensionManifest> = [
    {
        type: 'workspace',
        kind: 'default',
        alias: workspaceAlias,
        name: 'Carbon Rating Root Workspace',
        meta: {
            entityType: AUDIT_CARBON_RATING_ROOT_ENTITY_TYPE,
            headline: 'Carbon Rating'
        }
    },
    {
        type: 'workspaceView',
        kind: 'collection',
        alias: 'Umb.Workspace.CarbonRating.Collection',
        name: 'Content Audit Carbon Rating Collection Workspace View',
        meta: {
            label: 'Collection',
            icon: 'icon-layers',
            pathname: 'collection',
            collectionAlias: CONTENT_AUDIT_CARBON_RATING_COLLECTION_ALIAS
        },
        conditions: [
            {
                alias: "Umb.Condition.WorkspaceAlias",
                match: workspaceAlias
            }
        ]
    }
]