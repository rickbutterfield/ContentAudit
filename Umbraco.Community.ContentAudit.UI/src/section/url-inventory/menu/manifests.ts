import type { ManifestMenuItem } from "@umbraco-cms/backoffice/menu";
import { AUDIT_URL_INVENTORY_ROOT_ENTITY_TYPE } from '../entity';

const menuItem: ManifestMenuItem = {
    type: 'menuItem',
    alias: 'Umb.MenuItem.ContentAudit.UrlInventory',
    name: 'URL Inventory Menu Item',
    weight: 2000,
    meta: {
        label: 'URL Inventory',
        icon: 'icon-scan',
        entityType: AUDIT_URL_INVENTORY_ROOT_ENTITY_TYPE,
        menus: ["Umb.Menu.ContentAudit"],        
    }
};

export const manifests = [menuItem];
