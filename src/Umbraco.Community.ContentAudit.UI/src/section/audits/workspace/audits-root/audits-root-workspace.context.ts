import { UmbContextBase } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken } from "@umbraco-cms/backoffice/context-api";
import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";

export class ContentAuditAuditsRootWorkspaceContext extends UmbContextBase {
	public readonly workspaceAlias = 'ContentAudit.Workspace.AuditsRoot';

	constructor(host: UmbControllerHost) {
		super(host, CONTENT_AUDIT_AUDITS_ROOT_WORKSPACE_CONTEXT);
	}

	getEntityType() {
		return 'audits-root';
	}
}

export { ContentAuditAuditsRootWorkspaceContext as api };

export const CONTENT_AUDIT_AUDITS_ROOT_WORKSPACE_CONTEXT = new UmbContextToken<any, ContentAuditAuditsRootWorkspaceContext>(
	'UmbWorkspaceContext',
	undefined,
	(context): context is ContentAuditAuditsRootWorkspaceContext => context.getEntityType?.() === 'audits-root',
);
