import { CONTENT_AUDIT_MENU_0_ALIAS } from "../../constants";

const menuItem: UmbExtensionManifest = {
    type: 'menuItem',
    kind: 'tree',
    alias: 'Umb.MenuItem.ContentAudit.Audits',
    name: 'Audits Menu Item',
    weight: 10000,
    meta: {
        label: 'Audits',
        icon: 'icon-browser-window',
        treeAlias: 'Umb.Tree.ContentAudit.Audits',
        menus: [CONTENT_AUDIT_MENU_0_ALIAS],        
    }
};

export const manifests = [menuItem];
