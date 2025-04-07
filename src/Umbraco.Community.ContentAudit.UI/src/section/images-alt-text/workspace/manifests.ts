import { CONTENT_AUDIT_IMAGES_ALT_TEXT_COLLECTION_ALIAS } from '../collection';
import { AUDIT_IMAGES_ALT_TEXT_ROOT_ENTITY_TYPE } from '../entity';

const workspaceAlias = 'Umb.Workspace.ContentAudit.ImagesAltText';

export const manifests: Array<UmbExtensionManifest> = [
    {
        type: 'workspace',
        kind: 'default',
        alias: workspaceAlias,
        name: 'Images Alt Text Root Workspace',
        meta: {
            entityType: AUDIT_IMAGES_ALT_TEXT_ROOT_ENTITY_TYPE,
            headline: 'Image Alt Text'
        }
    },
    {
        type: 'workspaceView',
        kind: 'collection',
        alias: 'Umb.Workspace.ImagesAltText.Collection',
        name: 'Content Audit Images Alt Text Collection Workspace View',
        meta: {
            label: 'Collection',
            icon: 'icon-layers',
            pathname: 'collection',
            collectionAlias: CONTENT_AUDIT_IMAGES_ALT_TEXT_COLLECTION_ALIAS
        },
        conditions: [
            {
                alias: "Umb.Condition.WorkspaceAlias",
                match: workspaceAlias
            }
        ]
    }
]