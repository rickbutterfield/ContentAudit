﻿import { UMB_COLLECTION_ALIAS_CONDITION } from '@umbraco-cms/backoffice/collection';
import { CONTENT_AUDIT_METADATA_COLLECTION_ALIAS, CONTENT_AUDIT_METADATA_TABLE_COLLECTION_VIEW_ALIAS } from '../constants';

export const manifests: Array<UmbExtensionManifest> = [
	{
		type: 'collectionView',
		alias: CONTENT_AUDIT_METADATA_TABLE_COLLECTION_VIEW_ALIAS,
		name: 'Metadata Table Collection View',
		js: () => import('./table/metadata-table-collection-view.element'),
		meta: {
			label: 'Table',
			icon: 'icon-list',
			pathName: 'table',
		},
		conditions: [
			{
				alias: UMB_COLLECTION_ALIAS_CONDITION,
				match: CONTENT_AUDIT_METADATA_COLLECTION_ALIAS
			},
		],
	},
];