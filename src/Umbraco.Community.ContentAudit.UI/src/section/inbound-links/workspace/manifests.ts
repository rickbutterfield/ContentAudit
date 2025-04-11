import { CONTENT_AUDIT_INBOUND_LINKS_COLLECTION_ALIAS } from '../collection';
import { AUDIT_INBOUND_LINKS_ROOT_ENTITY_TYPE } from '../entity';

const workspaceAlias = 'Umb.Workspace.ContentAudit.InboundLinks';

export const manifests: Array<UmbExtensionManifest> = [
    {
        type: 'workspace',
        kind: 'default',
        alias: workspaceAlias,
        name: 'Inbound Links Root Workspace',
        meta: {
            entityType: AUDIT_INBOUND_LINKS_ROOT_ENTITY_TYPE,
            headline: 'Inbound Links'
        }
    },
    {
        type: 'workspaceView',
        kind: 'collection',
        alias: 'Umb.Workspace.InboundLinks.Collection',
        name: 'Content Audit Inbound Links Collection Workspace View',
        meta: {
            label: 'Collection',
            icon: 'icon-layers',
            pathname: 'collection',
            collectionAlias: CONTENT_AUDIT_INBOUND_LINKS_COLLECTION_ALIAS
        },
        conditions: [
            {
                alias: "Umb.Condition.WorkspaceAlias",
                match: workspaceAlias
            }
        ]
    }
]