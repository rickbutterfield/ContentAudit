import type { ManifestMenuItem } from "@umbraco-cms/backoffice/menu";
import { AUDIT_CARBON_RATING_ROOT_ENTITY_TYPE } from '../entity';
import { CONTENT_AUDIT_MENU_2_ALIAS } from "../../constants";

const menuItem: ManifestMenuItem = {
    type: 'menuItem',
    alias: 'Umb.MenuItem.ContentAudit.CarbonRating',
    name: 'Carbon Rating Menu Item',
    weight: 900,
    meta: {
        label: 'Carbon Rating',
        icon: 'icon-eco',
        entityType: AUDIT_CARBON_RATING_ROOT_ENTITY_TYPE,
        menus: [CONTENT_AUDIT_MENU_2_ALIAS],
    }
};

export const manifests = [menuItem];
