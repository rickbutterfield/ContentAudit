import { AUDIT_URL_INVENTORY_ROOT_ENTITY_TYPE } from '../entity';

const workspaceAlias = 'Umb.Workspace.ContentAudit.UrlInventory';

export const manifests: Array<UmbExtensionManifest> = [
    {
        type: 'workspace',
        alias: workspaceAlias,
        name: 'URL Inventory Root Workspace',
        js: () => import('./views/overview-workspace-view.element'),
        meta: {
            entityType: AUDIT_URL_INVENTORY_ROOT_ENTITY_TYPE
        }
    }
]