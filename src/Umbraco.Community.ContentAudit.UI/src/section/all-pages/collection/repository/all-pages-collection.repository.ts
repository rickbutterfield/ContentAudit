import { UmbRepositoryBase } from '@umbraco-cms/backoffice/repository';
import type { UmbCollectionRepository } from '@umbraco-cms/backoffice/collection';
import { ContentAuditAllPagesCollectionDataSource } from "./all-pages-collection.server.data-source";
import { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import { PageAnalysisDto } from '../../../../api';
import { ContentAuditAllPagesCollectionFilterModel } from '../types';

export class ContentAuditAllPagesCollectionRepository extends UmbRepositoryBase implements UmbCollectionRepository<PageAnalysisDto, ContentAuditAllPagesCollectionFilterModel> {
    #collectionSource: ContentAuditAllPagesCollectionDataSource;

    constructor(host: UmbControllerHost) {
        super(host);
        this.#collectionSource = new ContentAuditAllPagesCollectionDataSource(host);
    }

    async requestCollection(filter: ContentAuditAllPagesCollectionFilterModel) {
        return this.#collectionSource.getCollection(filter);
    }
}

export default ContentAuditAllPagesCollectionRepository;