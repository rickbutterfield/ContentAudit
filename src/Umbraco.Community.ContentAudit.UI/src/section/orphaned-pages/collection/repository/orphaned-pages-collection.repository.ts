import { UmbRepositoryBase } from '@umbraco-cms/backoffice/repository';
import type { UmbCollectionFilterModel, UmbCollectionRepository } from '@umbraco-cms/backoffice/collection';
import { ContentAuditOrphanedPagesCollectionDataSource } from "./orphaned-pages-collection.server.data-source";
import { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import { PageDto } from '../../../../api';

export class ContentAuditOrphanedPagesCollectionRepository extends UmbRepositoryBase implements UmbCollectionRepository<PageDto, UmbCollectionFilterModel> {
    #collectionSource: ContentAuditOrphanedPagesCollectionDataSource;

    constructor(host: UmbControllerHost) {
        super(host);
        this.#collectionSource = new ContentAuditOrphanedPagesCollectionDataSource(host);
    }

    async requestCollection(filter: UmbCollectionFilterModel) {
        return this.#collectionSource.getCollection(filter);
    }
}

export default ContentAuditOrphanedPagesCollectionRepository;