import { UmbRepositoryBase } from '@umbraco-cms/backoffice/repository';
import type { UmbCollectionRepository } from '@umbraco-cms/backoffice/collection';
import { ContentAuditStatusCodesCollectionDataSource } from "./status-codes-collection.server.data-source";
import { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import { InternalPageDto } from '../../../../api';
import { ContentAuditStatusCodesCollectionFilterModel } from '../types';

export class ContentAuditStatusCodesCollectionRepository extends UmbRepositoryBase implements UmbCollectionRepository<InternalPageDto, ContentAuditStatusCodesCollectionFilterModel> {
    #collectionSource: ContentAuditStatusCodesCollectionDataSource;

    constructor(host: UmbControllerHost) {
        super(host);
        this.#collectionSource = new ContentAuditStatusCodesCollectionDataSource(host);
    }

    async requestCollection(filter: ContentAuditStatusCodesCollectionFilterModel) {
        return this.#collectionSource.getCollection(filter);
    }
}

export default ContentAuditStatusCodesCollectionRepository;