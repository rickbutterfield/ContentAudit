import { UmbRepositoryBase } from '@umbraco-cms/backoffice/repository';
import type { UmbCollectionFilterModel, UmbCollectionRepository } from '@umbraco-cms/backoffice/collection';
import { ContentAuditIssuesCollectionDataSource } from "./issue-collection.server.data-source";
import { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import { AuditIssueDto } from '../../../../api';

export class ContentAuditIssuesCollectionRepository extends UmbRepositoryBase implements UmbCollectionRepository<AuditIssueDto, UmbCollectionFilterModel> {
    #collectionSource: ContentAuditIssuesCollectionDataSource;

    constructor(host: UmbControllerHost) {
        super(host);
        this.#collectionSource = new ContentAuditIssuesCollectionDataSource(host);
    }

    async requestCollection(filter: UmbCollectionFilterModel) {
        return this.#collectionSource.getCollection(filter);
    }
}

export default ContentAuditIssuesCollectionRepository;