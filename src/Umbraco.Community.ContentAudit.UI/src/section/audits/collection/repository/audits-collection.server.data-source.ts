import { UmbCollectionDataSource, UmbCollectionFilterModel } from "@umbraco-cms/backoffice/collection";
import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { OverviewDto, AuditService } from "../../../../api";
import { tryExecute } from "@umbraco-cms/backoffice/resources";

export class ContentAuditAuditsCollectionDataSource implements UmbCollectionDataSource<OverviewDto> {
    #host: UmbControllerHost;

    constructor(host: UmbControllerHost) {
        this.#host = host;
    }

    async getCollection(filter: UmbCollectionFilterModel) {
        // Use the tree root endpoint to get all audits
        const { data, error } = await tryExecute(
            this.#host,
            AuditService.getCollection({
                query: {
                    skip: filter.skip,
                    take: filter.take,
                }
            })
        );

        if (error) {
            return { error };
        }

        if (!data) {
            return { data: { items: [], total: 0 } };
        }

        return {
            data: {
                items: data.items,
                total: data.total
            }
        };
    }
}
