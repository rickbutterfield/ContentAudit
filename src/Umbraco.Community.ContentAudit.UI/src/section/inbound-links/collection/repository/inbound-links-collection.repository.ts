import { UmbRepositoryBase } from '@umbraco-cms/backoffice/repository';
import type { UmbCollectionFilterModel, UmbCollectionRepository } from '@umbraco-cms/backoffice/collection';
import { ContentAuditInboundLinksCollectionDataSource } from "./inbound-links-collection.server.data-source";
import { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import { LinkGroupDto } from '../../../../api';

export class ContentAuditInboundLinksCollectionRepository extends UmbRepositoryBase implements UmbCollectionRepository<LinkGroupDto, UmbCollectionFilterModel> {
    #collectionSource: ContentAuditInboundLinksCollectionDataSource;

    constructor(host: UmbControllerHost) {
        super(host);
        this.#collectionSource = new ContentAuditInboundLinksCollectionDataSource(host);
    }

    async requestCollection(filter: UmbCollectionFilterModel) {
        return this.#collectionSource.getCollection(filter);
    }
}

export default ContentAuditInboundLinksCollectionRepository;