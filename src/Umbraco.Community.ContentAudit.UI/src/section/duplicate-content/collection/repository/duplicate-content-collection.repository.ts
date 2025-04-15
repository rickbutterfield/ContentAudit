import { UmbRepositoryBase } from '@umbraco-cms/backoffice/repository';
import type { UmbCollectionFilterModel, UmbCollectionRepository } from '@umbraco-cms/backoffice/collection';
import { ContentAuditDuplicateContentCollectionDataSource } from "./duplicate-content-collection.server.data-source";
import { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import { PageDto } from '../../../../api';

export class ContentAuditDuplicateContentCollectionRepository extends UmbRepositoryBase implements UmbCollectionRepository<PageDto> {
    #collectionSource: ContentAuditDuplicateContentCollectionDataSource;

    constructor(host: UmbControllerHost) {
        super(host);
        this.#collectionSource = new ContentAuditDuplicateContentCollectionDataSource(host);
    }

    async requestCollection(filter: UmbCollectionFilterModel) {
        return this.#collectionSource.getCollection(filter);
    }
}

export default ContentAuditDuplicateContentCollectionRepository;