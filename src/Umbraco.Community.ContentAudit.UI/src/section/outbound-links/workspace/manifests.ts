import { CONTENT_AUDIT_OUTBOUND_LINKS_COLLECTION_ALIAS } from '../collection';
import { AUDIT_OUTBOUND_LINKS_ROOT_ENTITY_TYPE } from '../entity';

const workspaceAlias = 'Umb.Workspace.ContentAudit.OutboundLinks';

export const manifests: Array<UmbExtensionManifest> = [
    {
        type: 'workspace',
        kind: 'default',
        alias: workspaceAlias,
        name: 'Outbound Links Root Workspace',
        meta: {
            entityType: AUDIT_OUTBOUND_LINKS_ROOT_ENTITY_TYPE,
            headline: 'Outbound Links'
        }
    },
    {
        type: 'workspaceView',
        kind: 'collection',
        alias: 'Umb.Workspace.OutboundLinks.Collection',
        name: 'Content Audit Outbound Links Collection Workspace View',
        meta: {
            label: 'Collection',
            icon: 'icon-layers',
            pathname: 'collection',
            collectionAlias: CONTENT_AUDIT_OUTBOUND_LINKS_COLLECTION_ALIAS
        },
        conditions: [
            {
                alias: "Umb.Condition.WorkspaceAlias",
                match: workspaceAlias
            }
        ]
    }
]