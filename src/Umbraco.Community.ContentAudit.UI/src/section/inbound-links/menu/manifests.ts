import type { ManifestMenuItem } from "@umbraco-cms/backoffice/menu";
import { AUDIT_INBOUND_LINKS_ROOT_ENTITY_TYPE } from '../entity';
import { CONTENT_AUDIT_MENU_0_ALIAS } from "../../constants";

const menuItem: ManifestMenuItem = {
    type: 'menuItem',
    alias: 'Umb.MenuItem.ContentAudit.InboundLinks',
    name: 'Inbound Links Menu Item',
    weight: 2000,
    meta: {
        label: 'Inbound Links',
        icon: 'icon-window-popin',
        entityType: AUDIT_INBOUND_LINKS_ROOT_ENTITY_TYPE,
        menus: [CONTENT_AUDIT_MENU_0_ALIAS],
    }
};

export const manifests = [menuItem];
