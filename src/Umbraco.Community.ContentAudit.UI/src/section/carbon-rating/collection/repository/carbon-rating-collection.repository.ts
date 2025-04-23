import { UmbRepositoryBase } from '@umbraco-cms/backoffice/repository';
import type { UmbCollectionRepository } from '@umbraco-cms/backoffice/collection';
import { ContentAuditCarbonRatingCollectionDataSource } from "./carbon-rating-collection.server.data-source";
import { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import { PageAnalysisDto } from '../../../../api';
import { ContentAuditCarbonRatingCollectionFilterModel } from '../types';

export class ContentAuditCarbonRatingCollectionRepository extends UmbRepositoryBase implements UmbCollectionRepository<PageAnalysisDto, ContentAuditCarbonRatingCollectionFilterModel> {
    #collectionSource: ContentAuditCarbonRatingCollectionDataSource;

    constructor(host: UmbControllerHost) {
        super(host);
        this.#collectionSource = new ContentAuditCarbonRatingCollectionDataSource(host);
    }

    async requestCollection(filter: ContentAuditCarbonRatingCollectionFilterModel) {
        return this.#collectionSource.getCollection(filter);
    }
}

export default ContentAuditCarbonRatingCollectionRepository;