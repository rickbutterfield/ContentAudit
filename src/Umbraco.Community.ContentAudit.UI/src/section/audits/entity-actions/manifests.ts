import { AUDIT_AUDITS_ENTITY_TYPE } from '../entity';

export const manifests: Array<UmbExtensionManifest> = [
	{
		type: 'entityAction',
		kind: 'default',
		alias: 'Umb.EntityAction.ContentAudit.Audit.Delete',
		name: 'Delete Audit Entity Action',
		weight: 100,
		api: () => import('./delete/delete-audit.action'),
		forEntityTypes: [AUDIT_AUDITS_ENTITY_TYPE],
		meta: {
			icon: 'icon-trash',
			label: 'Delete',
		},
	},
];
