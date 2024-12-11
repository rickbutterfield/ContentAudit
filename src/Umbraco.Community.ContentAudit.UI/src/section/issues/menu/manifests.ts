import type { ManifestMenuItem } from "@umbraco-cms/backoffice/menu";
import { AUDIT_ISSUES_ROOT_ENTITY_TYPE } from '../entity';
import { CONTENT_AUDIT_MENU_0_ALIAS } from "../../constants";

const menuItem: ManifestMenuItem = {
    type: 'menuItem',
    alias: 'Umb.MenuItem.ContentAudit.Issues',
    name: 'Issues Menu Item',
    weight: 2000,
    meta: {
        label: 'Issues',
        icon: 'icon-alert',
        entityType: AUDIT_ISSUES_ROOT_ENTITY_TYPE,
        menus: [CONTENT_AUDIT_MENU_0_ALIAS],        
    }
};

export const manifests = [menuItem];
