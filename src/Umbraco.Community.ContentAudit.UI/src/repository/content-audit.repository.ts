import { UmbControllerBase } from "@umbraco-cms/backoffice/class-api";
import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { ContentAuditDataSource } from "./sources/audit.source";
import { ContentCrawlDataSource } from "./sources/crawl.source";

export class ContentAuditRepository extends UmbControllerBase {
    #auditDataSource: ContentAuditDataSource;
    #crawlDataSource: ContentCrawlDataSource;

    constructor(host: UmbControllerHost) {
        super(host);

        this.#auditDataSource = new ContentAuditDataSource(this);
        this.#crawlDataSource = new ContentCrawlDataSource(this);
    }

    async getLatestAuditOverview() {
        return this.#auditDataSource.getLatestAuditOverview();
    }

    async getPagesWithMissingMetadata() {
        return this.#auditDataSource.getPagesWithMissingMetadata();
    }

    async getAllIssues() {
        return this.#auditDataSource.getAllIssues();
    }
}