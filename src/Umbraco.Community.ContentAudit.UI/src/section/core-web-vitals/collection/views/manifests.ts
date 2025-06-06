﻿import { UMB_COLLECTION_ALIAS_CONDITION } from '@umbraco-cms/backoffice/collection';
import { CONTENT_AUDIT_CORE_WEB_VITALS_COLLECTION_ALIAS, CONTENT_AUDIT_CORE_WEB_VITALS_TABLE_COLLECTION_VIEW_ALIAS } from '../constants.js';

export const manifests: Array<UmbExtensionManifest> = [
	{
		type: 'collectionView',
		alias: CONTENT_AUDIT_CORE_WEB_VITALS_TABLE_COLLECTION_VIEW_ALIAS,
		name: 'Core Web Vitals Table Collection View',
		js: () => import('./table/core-web-vitals-table-collection-view.element.js'),
		meta: {
			label: 'Table',
			icon: 'icon-list',
			pathName: 'table',
		},
		conditions: [
			{
				alias: UMB_COLLECTION_ALIAS_CONDITION,
				match: CONTENT_AUDIT_CORE_WEB_VITALS_COLLECTION_ALIAS
			},
		],
	},
];