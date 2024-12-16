import type { ManifestMenuItem } from "@umbraco-cms/backoffice/menu";
import { AUDIT_IMAGES_ALT_TEXT_ROOT_ENTITY_TYPE } from '../entity';
import { CONTENT_AUDIT_MENU_1_ALIAS } from "../../constants";

const menuItem: ManifestMenuItem = {
    type: 'menuItem',
    alias: 'Umb.MenuItem.ContentAudit.ImagesAltText',
    name: 'Image Alt Text Menu Item',
    weight: 2000,
    meta: {
        label: 'Alt Text',
        icon: 'icon-picture',
        entityType: AUDIT_IMAGES_ALT_TEXT_ROOT_ENTITY_TYPE,
        menus: [CONTENT_AUDIT_MENU_1_ALIAS],
    }
};

export const manifests = [menuItem];
