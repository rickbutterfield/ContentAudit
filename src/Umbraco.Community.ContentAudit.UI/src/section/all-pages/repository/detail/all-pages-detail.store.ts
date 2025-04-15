import { UmbDetailStoreBase } from '@umbraco-cms/backoffice/store';
import type { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import { UmbContextToken } from '@umbraco-cms/backoffice/context-api';
import { PageAnalysisDto } from '../../../../api/types.gen.js';

export class ContentAuditAllPagesDetailStore extends UmbDetailStoreBase<PageAnalysisDto> {
	constructor(host: UmbControllerHost) {
		super(host, CONTENT_AUDIT_ALL_PAGES_DETAIL_STORE_CONTEXT.toString());
	}
}

export default ContentAuditAllPagesDetailStore;

export const CONTENT_AUDIT_ALL_PAGES_DETAIL_STORE_CONTEXT = new UmbContextToken<ContentAuditAllPagesDetailStore>('ContentAuditAllPagesDetailStore');
