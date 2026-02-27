import type { ManifestMenuItem } from "@umbraco-cms/backoffice/menu";
import { AUDIT_METADATA_ROOT_ENTITY_TYPE } from '../entity';

const menuItem: ManifestMenuItem = {
    type: 'menuItem',
    alias: 'ContentAudit.MenuItem.Metadata',
    name: 'Metadata Menu Item',
    weight: 2000,
    meta: {
        label: 'Metadata',
        icon: 'icon-tags',
        entityType: AUDIT_METADATA_ROOT_ENTITY_TYPE,
        menus: ["ContentAudit.Menu.Metadata"],        
    }
};

export const manifests = [menuItem];
