import type { ManifestMenuItem } from "@umbraco-cms/backoffice/menu";
import { AUDIT_ALL_PAGES_ROOT_ENTITY_TYPE } from '../entity';
import { CONTENT_AUDIT_MENU_0_ALIAS } from "../../constants";

const menuItem: ManifestMenuItem = {
    type: 'menuItem',
    alias: 'Umb.MenuItem.ContentAudit.AllPages',
    name: 'All Pages Menu Item',
    weight: 10000,
    meta: {
        label: 'All Pages',
        icon: 'icon-browser-window',
        entityType: AUDIT_ALL_PAGES_ROOT_ENTITY_TYPE,
        menus: [CONTENT_AUDIT_MENU_0_ALIAS],        
    }
};

export const manifests = [menuItem];
