import type { ManifestMenuItem } from "@umbraco-cms/backoffice/menu";
import { AUDIT_ORPHANED_PAGES_ROOT_ENTITY_TYPE } from '../entity';
import { CONTENT_AUDIT_MENU_METADATA_ALIAS } from "../../constants";

const menuItem: ManifestMenuItem = {
    type: 'menuItem',
    alias: 'ContentAudit.MenuItem.OrphanedPages',
    name: 'Orphaned Pages Menu Item',
    weight: 100,
    meta: {
        label: 'Orphaned Pages',
        icon: 'icon-tactics',
        entityType: AUDIT_ORPHANED_PAGES_ROOT_ENTITY_TYPE,
        menus: [CONTENT_AUDIT_MENU_METADATA_ALIAS],
    }
};

export const manifests = [menuItem];
