import { UmbRepositoryBase } from '@umbraco-cms/backoffice/repository';
import type { UmbCollectionRepository } from '@umbraco-cms/backoffice/collection';
import { ContentAuditCoreWebVitalsCollectionDataSource } from "./core-web-vitals-collection.server.data-source";
import { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import { CoreWebVitalsListItemDto } from '../../../../api';
import { ContentAuditCoreWebVitalsCollectionFilterModel } from '../types';

export class ContentAuditCoreWebVitalsCollectionRepository extends UmbRepositoryBase implements UmbCollectionRepository<CoreWebVitalsListItemDto, ContentAuditCoreWebVitalsCollectionFilterModel> {
    #collectionSource: ContentAuditCoreWebVitalsCollectionDataSource;

    constructor(host: UmbControllerHost) {
        super(host);
        this.#collectionSource = new ContentAuditCoreWebVitalsCollectionDataSource(host);
    }

    async requestCollection(filter: ContentAuditCoreWebVitalsCollectionFilterModel) {
        return this.#collectionSource.getCollection(filter);
    }
}

export default ContentAuditCoreWebVitalsCollectionRepository;