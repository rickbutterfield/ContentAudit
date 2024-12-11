import { UmbRepositoryBase } from '@umbraco-cms/backoffice/repository';
import type { UmbCollectionFilterModel, UmbCollectionRepository } from '@umbraco-cms/backoffice/collection';
import { ContentAuditStatusCodesCollectionDataSource } from "./status-codes-collection.server.data-source";
import { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import { PageResponseDto } from '../../../../api';

export class ContentAuditStatusCodesCollectionRepository extends UmbRepositoryBase implements UmbCollectionRepository<PageResponseDto, UmbCollectionFilterModel> {
    #collectionSource: ContentAuditStatusCodesCollectionDataSource;

    constructor(host: UmbControllerHost) {
        super(host);
        this.#collectionSource = new ContentAuditStatusCodesCollectionDataSource(host);
    }

    async requestCollection(filter: UmbCollectionFilterModel) {
        return this.#collectionSource.getCollection(filter);
    }
}

export default ContentAuditStatusCodesCollectionRepository;