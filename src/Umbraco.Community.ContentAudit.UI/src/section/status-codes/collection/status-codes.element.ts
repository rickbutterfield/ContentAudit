import { css, customElement, html } from '@umbraco-cms/backoffice/external/lit';
import { UMB_COLLECTION_CONTEXT, UmbCollectionDefaultElement, UmbDefaultCollectionContext } from '@umbraco-cms/backoffice/collection';
import { PageDto } from '../../../api';
import { UUISelectEvent, UUITextStyles } from '@umbraco-cms/backoffice/external/uui';
import { ContentAuditStatusCodesCollectionFilterModel } from './types';

@customElement('content-audit-status-codes-collection')
export class ContentAuditStatusCodesCollectionElement extends UmbCollectionDefaultElement {
	#collectionContext?: UmbDefaultCollectionContext<PageDto, ContentAuditStatusCodesCollectionFilterModel>;

	#options: Array<Option> = [];

	constructor() {
		super();

		this.consumeContext(UMB_COLLECTION_CONTEXT, (collectionContext) => {
			this.#collectionContext = collectionContext;

			this.observe(this.#collectionContext.items, (items) => {
				if (items != null && items?.length !== 0) {
					const statusCodes = [...new Set(items.map((x) => x.statusCode))];
					const options = statusCodes.sort().map((x) => ({ name: x?.toString(), value: x?.toString() }));
					this.#options = [{ name: 'All', value: '0' }, ...options];
				}
			});
		});
	}

	#onChange(event: UUISelectEvent) {
		const statusCode = event.target.value as string;
		this.#collectionContext?.setFilter({ statusCode: parseInt(statusCode) });
	}

	protected override renderToolbar() {
		return html`
			<umb-collection-toolbar slot="header">
				<div id="toolbar">
					<umb-collection-filter-field></umb-collection-filter-field>
					<uui-select
						label="Select status code..."
						placeholder="Select status code..."
						.options=${this.#options}
						@change=${this.#onChange}></uui-select>
				</div>
			</umb-collection-toolbar>
		`;
	}

	static override styles = [
		UUITextStyles,
		css`
			:host {
				display: flex;
				flex-direction: column;
				box-sizing: border-box;
				gap: var(--uui-size-space-5);
				height: 100%;
			}

			#toolbar {
				flex: 1;
				display: flex;
				gap: var(--uui-size-space-5);
				justify-content: space-between;
				align-items: center;
			}

			umb-collection-filter-field {
				width: 100%;
			}

			uui-select {
				width: 100%;
			}

			#empty-state {
				height: 80%;
				align-content: center;
				text-align: center;
			}
		`,
	];
}

export default ContentAuditStatusCodesCollectionElement;

declare global {
	interface HTMLElementTagNameMap {
		'content-audit-status-codes-collection': ContentAuditStatusCodesCollectionElement;
	}
}