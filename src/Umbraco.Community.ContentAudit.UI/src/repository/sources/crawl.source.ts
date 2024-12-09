import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";

export interface CrawlDataSource {
}

export class ContentCrawlDataSource implements CrawlDataSource {
    #host: UmbControllerHost;

    constructor(host: UmbControllerHost) {
        this.#host = host;
    }

}