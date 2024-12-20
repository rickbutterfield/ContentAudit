import { UmbDetailStoreBase } from '@umbraco-cms/backoffice/store';
import type { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import { UmbContextToken } from '@umbraco-cms/backoffice/context-api';
import { IssueDto } from '../../../../api/types.gen.js';

export class ContentAuditIssuesDetailStore extends UmbDetailStoreBase<IssueDto> {
	constructor(host: UmbControllerHost) {
		super(host, CONTENT_AUDIT_ISSUES_DETAIL_STORE_CONTEXT.toString());
	}
}

export default ContentAuditIssuesDetailStore;

export const CONTENT_AUDIT_ISSUES_DETAIL_STORE_CONTEXT = new UmbContextToken<ContentAuditIssuesDetailStore>('ContentAuditIssuesDetailStore');
