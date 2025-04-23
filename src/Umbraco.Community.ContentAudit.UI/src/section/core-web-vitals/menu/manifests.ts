import type { ManifestMenuItem } from "@umbraco-cms/backoffice/menu";
import { AUDIT_CORE_WEB_VITALS_ROOT_ENTITY_TYPE } from '../entity';
import { CONTENT_AUDIT_MENU_2_ALIAS } from "../../constants";

const menuItem: ManifestMenuItem = {
    type: 'menuItem',
    alias: 'Umb.MenuItem.ContentAudit.CoreWebVitals',
    name: 'Core Web Vitals Menu Item',
    weight: 1000,
    meta: {
        label: 'Core Web Vitals',
        icon: 'icon-speed-gauge',
        entityType: AUDIT_CORE_WEB_VITALS_ROOT_ENTITY_TYPE,
        menus: [CONTENT_AUDIT_MENU_2_ALIAS],
    }
};

export const manifests = [menuItem];
