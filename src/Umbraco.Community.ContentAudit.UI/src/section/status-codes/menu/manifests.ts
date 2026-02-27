import type { ManifestMenuItem } from "@umbraco-cms/backoffice/menu";
import { AUDIT_STATUS_CODES_ROOT_ENTITY_TYPE } from '../entity';
import { CONTENT_AUDIT_MENU_AUDIT_ALIAS } from "../../constants";

const menuItem: ManifestMenuItem = {
    type: 'menuItem',
    alias: 'ContentAudit.MenuItem.StatusCodes',
    name: 'Status Codes Menu Item',
    weight: 2000,
    meta: {
        label: 'Status Codes',
        icon: 'icon-stop-alt',
        entityType: AUDIT_STATUS_CODES_ROOT_ENTITY_TYPE,
        menus: [CONTENT_AUDIT_MENU_AUDIT_ALIAS],        
    }
};

export const manifests = [menuItem];
