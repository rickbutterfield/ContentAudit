import type { ManifestMenuItem } from "@umbraco-cms/backoffice/menu";
import { AUDIT_ISSUES_ROOT_ENTITY_TYPE } from '../entity';

const menuItem: ManifestMenuItem = {
    type: 'menuItem',
    alias: 'Umb.MenuItem.ContentAudit.Issues',
    name: 'Issues Menu Item',
    weight: 2000,
    meta: {
        label: 'Issues',
        icon: 'icon-alert',
        entityType: AUDIT_ISSUES_ROOT_ENTITY_TYPE,
        menus: ["Umb.Menu.ContentAudit"],        
    }
};

export const manifests = [menuItem];
