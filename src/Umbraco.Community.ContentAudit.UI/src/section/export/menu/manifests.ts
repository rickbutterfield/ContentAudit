import type { ManifestMenuItem } from "@umbraco-cms/backoffice/menu";
import { AUDIT_EXPORT_ROOT_ENTITY_TYPE } from '../entity';
import { CONTENT_AUDIT_MENU_3_ALIAS } from "../../constants";

const menuItem: ManifestMenuItem = {
    type: 'menuItem',
    alias: 'Umb.MenuItem.ContentAudit.Export',
    name: 'Export Menu Item',
    weight: 2000,
    meta: {
        label: 'Export',
        icon: 'icon-download',
        entityType: AUDIT_EXPORT_ROOT_ENTITY_TYPE,
        menus: [CONTENT_AUDIT_MENU_3_ALIAS],        
    }
};

export const manifests = [menuItem];
