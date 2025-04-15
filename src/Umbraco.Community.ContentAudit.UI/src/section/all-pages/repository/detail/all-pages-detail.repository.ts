import { UmbReadDetailRepository, UmbRepositoryBase } from "@umbraco-cms/backoffice/repository";
import { PageAnalysisDto } from "../../../../api";
import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { CONTENT_AUDIT_ALL_PAGES_DETAIL_STORE_CONTEXT } from "./all-pages-detail.store";
import { ContentAuditAllPagesServerDataSource } from "./all-pages-detail.server.data-source";
import { UmbDetailStore } from "@umbraco-cms/backoffice/store";

export class ContentAuditAllPagesDetailRepository extends UmbRepositoryBase implements UmbReadDetailRepository<PageAnalysisDto> {

    #init: Promise<unknown>;
    #detailStore?: UmbDetailStore<PageAnalysisDto>;
    #detailSource = new ContentAuditAllPagesServerDataSource(this);

    constructor(host: UmbControllerHost) {
        super(host);

        this.#init = Promise.all([
            this.consumeContext(CONTENT_AUDIT_ALL_PAGES_DETAIL_STORE_CONTEXT, (instance) => {
                this.#detailStore = instance;
            }).asPromise(),
        ]);
    }

    async requestByUnique(unique: string) {
        if (!unique) throw new Error('Unique is missing');
        await this.#init;

        const { data, error } = await this.#detailSource.read(unique);

        if (data) {
            this.#detailStore!.append(data);
        }

        return { data, error, asObservable: () => this.#detailStore!.byUnique(unique) };
    }

    async byUnique(unique: string) {
        if (!unique) throw new Error('Unique is missing');
        await this.#init;
        return this.#detailStore!.byUnique(unique);
    }
}

export default ContentAuditAllPagesDetailRepository;