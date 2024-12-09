import type { ManifestMenuItem } from "@umbraco-cms/backoffice/menu";
import { AUDIT_DUPLICATE_CONTENT_ROOT_ENTITY_TYPE } from '../entity';

const menuItem: ManifestMenuItem = {
    type: 'menuItem',
    alias: 'Umb.MenuItem.ContentAudit.DuplicateContent',
    name: 'Duplicate Content Menu Item',
    weight: 2000,
    meta: {
        label: 'Duplicate Content',
        icon: 'icon-documents',
        entityType: AUDIT_DUPLICATE_CONTENT_ROOT_ENTITY_TYPE,
        menus: ["Umb.Menu.ContentMetadata"],        
    }
};

export const manifests = [menuItem];
