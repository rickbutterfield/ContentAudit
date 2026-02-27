import { UmbMenuTreeStructureWorkspaceContextBase } from '@umbraco-cms/backoffice/menu';
import type { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';

export const CONTENT_AUDIT_AUDITS_TREE_REPOSITORY_ALIAS = 'ContentAudit.Repository.Audits';

export class ContentAuditAuditsMenuStructureWorkspaceContext extends UmbMenuTreeStructureWorkspaceContextBase {
	constructor(host: UmbControllerHost) {
		super(host, { treeRepositoryAlias: CONTENT_AUDIT_AUDITS_TREE_REPOSITORY_ALIAS });
	}
}

export default ContentAuditAuditsMenuStructureWorkspaceContext;
