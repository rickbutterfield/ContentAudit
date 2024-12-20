import { UmbRepositoryBase } from '@umbraco-cms/backoffice/repository';
import type { UmbCollectionFilterModel, UmbCollectionRepository } from '@umbraco-cms/backoffice/collection';
import { ContentAuditMetadataCollectionDataSource } from "./metadata-collection.server.data-source";
import { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import { InternalPageDto } from '../../../../api';

export class ContentAuditMetadataCollectionRepository extends UmbRepositoryBase implements UmbCollectionRepository<InternalPageDto, UmbCollectionFilterModel> {
    #collectionSource: ContentAuditMetadataCollectionDataSource;

    constructor(host: UmbControllerHost) {
        super(host);
        this.#collectionSource = new ContentAuditMetadataCollectionDataSource(host);
    }

    async requestCollection(filter: UmbCollectionFilterModel) {
        return this.#collectionSource.getCollection(filter);
    }
}

export default ContentAuditMetadataCollectionRepository;