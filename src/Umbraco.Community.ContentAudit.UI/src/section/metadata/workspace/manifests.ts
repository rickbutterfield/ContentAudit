import { AUDIT_METADATA_ROOT_ENTITY_TYPE } from '../entity';

const workspaceAlias = 'Umb.Workspace.ContentAudit.Metadata';

export const manifests: Array<UmbExtensionManifest> = [
    {
        type: 'workspace',
        alias: workspaceAlias,
        name: 'Metadata Root Workspace',
        js: () => import('./views/metadata-workspace-view.element'),
        meta: {
            entityType: AUDIT_METADATA_ROOT_ENTITY_TYPE
        }
    }
]