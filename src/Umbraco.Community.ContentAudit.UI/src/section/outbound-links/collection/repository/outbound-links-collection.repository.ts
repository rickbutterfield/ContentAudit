import { UmbRepositoryBase } from '@umbraco-cms/backoffice/repository';
import type { UmbCollectionFilterModel, UmbCollectionRepository } from '@umbraco-cms/backoffice/collection';
import { ContentAuditOutboundLinksCollectionDataSource } from "./outbound-links-collection.server.data-source";
import { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import { LinkGroupDto } from '../../../../api';

export class ContentAuditOutboundLinksCollectionRepository extends UmbRepositoryBase implements UmbCollectionRepository<LinkGroupDto, UmbCollectionFilterModel> {
    #collectionSource: ContentAuditOutboundLinksCollectionDataSource;

    constructor(host: UmbControllerHost) {
        super(host);
        this.#collectionSource = new ContentAuditOutboundLinksCollectionDataSource(host);
    }

    async requestCollection(filter: UmbCollectionFilterModel) {
        return this.#collectionSource.getCollection(filter);
    }
}

export default ContentAuditOutboundLinksCollectionRepository;