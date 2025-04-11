import { ManifestMenu } from '@umbraco-cms/backoffice/menu';
import { ManifestSection, ManifestSectionSidebarApp, ManifestSectionView } from '@umbraco-cms/backoffice/section';

import { manifests as issuesManifests } from './issues/manifests';
import { manifests as statusCodesManifests } from './status-codes/manifests';
import { manifests as orphanedPagesManifests } from './orphaned-pages/manifests';
import { manifests as imagesAltTextManifests } from './images-alt-text/manifests';
import { manifests as outboundLinksManifests } from './outbound-links/manifests';
import { manifests as inboundLinksManifests } from './inbound-links/manifests';
import { manifests as metadataManifests } from './metadata/manifests';
import { manifests as duplicateContentManifests } from './duplicate-content/manifests';
import { CONTENT_AUDIT_MENU_0_ALIAS, CONTENT_AUDIT_MENU_1_ALIAS } from './constants';

const sectionAlias = 'Umb.Section.ContentAudit';

const section: ManifestSection = {
    type: 'section',
    alias: sectionAlias,
    name: 'Content Audit',
    meta: {
        label: 'Audit',
        pathname: 'audit'
    }
}

const sectionView: ManifestSectionView = {
    type: 'sectionView',
    alias: 'Umb.SectionView.ContentAudit.Scan',
    name: 'Content Audit Scan Section View',
    element: () => import('./section.element'),
    meta: {
        label: 'Scan',
        icon: 'icon-scan',
        pathname: 'audit-root'
    },
    conditions: [
        {
            alias: 'Umb.Condition.SectionAlias',
            match: sectionAlias,
        },
    ]
}

const menus: ManifestMenu[] = [
    {
        type: 'menu',
        alias: CONTENT_AUDIT_MENU_0_ALIAS,
        name: 'Audit Menu'
    },
    {
        type: 'menu',
        alias: CONTENT_AUDIT_MENU_1_ALIAS,
        name: 'Content Menu'
    },
]

const menuSectionSidebarApps: ManifestSectionSidebarApp[] = [
    {
        type: 'sectionSidebarApp',
        kind: 'menu',
        alias: 'Umb.SidebarMenu.ContentAudit',
        name: 'Content Audit Sidebar Menu',
        meta: {
            label: 'Site Audit',
            menu: CONTENT_AUDIT_MENU_0_ALIAS
        },
        conditions: [
            {
                alias: 'Umb.Condition.SectionAlias',
                match: sectionAlias
            }
        ]
    },
    {
        type: 'sectionSidebarApp',
        kind: 'menu',
        alias: 'Umb.SidebarMenu.ContentMetadata',
        name: 'Content Sidebar Menu',
        meta: {
            label: 'Content',
            menu: CONTENT_AUDIT_MENU_1_ALIAS
        },
        conditions: [
            {
                alias: 'Umb.Condition.SectionAlias',
                match: sectionAlias
            }
        ]
    }
]

export const manifests = [
    section,
    sectionView,
    ...menus,
    ...menuSectionSidebarApps,
    ...issuesManifests,
    ...statusCodesManifests,
    ...orphanedPagesManifests,
    ...imagesAltTextManifests,
    ...outboundLinksManifests,
    ...inboundLinksManifests,
    ...metadataManifests,
    ...duplicateContentManifests
]