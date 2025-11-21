import { UmbRepositoryBase } from '@umbraco-cms/backoffice/repository';
import type { UmbCollectionFilterModel, UmbCollectionRepository } from '@umbraco-cms/backoffice/collection';
import { ContentAuditAuditsCollectionDataSource } from "./audits-collection.server.data-source";
import { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import { OverviewDto } from '../../../../api';

export class ContentAuditAuditsCollectionRepository extends UmbRepositoryBase implements UmbCollectionRepository<OverviewDto, UmbCollectionFilterModel> {
    #collectionSource: ContentAuditAuditsCollectionDataSource;

    constructor(host: UmbControllerHost) {
        super(host);
        this.#collectionSource = new ContentAuditAuditsCollectionDataSource(host);
    }

    async requestCollection(filter: UmbCollectionFilterModel) {
        return this.#collectionSource.getCollection(filter);
    }
}

export default ContentAuditAuditsCollectionRepository;
