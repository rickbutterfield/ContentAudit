import { UmbRepositoryBase } from '@umbraco-cms/backoffice/repository';
import type { UmbCollectionFilterModel, UmbCollectionRepository } from '@umbraco-cms/backoffice/collection';
import { ContentAuditImagesAltTextCollectionDataSource } from "./images-alt-text-collection.server.data-source";
import { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import { ImageDto } from '../../../../api';

export class ContentAuditImagesAltTextCollectionRepository extends UmbRepositoryBase implements UmbCollectionRepository<ImageDto, UmbCollectionFilterModel> {
    #collectionSource: ContentAuditImagesAltTextCollectionDataSource;

    constructor(host: UmbControllerHost) {
        super(host);
        this.#collectionSource = new ContentAuditImagesAltTextCollectionDataSource(host);
    }

    async requestCollection(filter: UmbCollectionFilterModel) {
        return this.#collectionSource.getCollection(filter);
    }
}

export default ContentAuditImagesAltTextCollectionRepository;