import { css, customElement, html } from '@umbraco-cms/backoffice/external/lit';
import { UMB_COLLECTION_CONTEXT, UmbCollectionDefaultElement, UmbDefaultCollectionContext } from '@umbraco-cms/backoffice/collection';
import { PageListItemDto } from '../../../api';
import { UUISelectEvent, UUITextStyles } from '@umbraco-cms/backoffice/external/uui';
import { ContentAuditStatusCodesCollectionFilterModel } from './types';

@customElement('content-audit-status-codes-collection')
export class ContentAuditStatusCodesCollectionElement extends UmbCollectionDefaultElement {
	#collectionContext?: UmbDefaultCollectionContext<PageListItemDto, ContentAuditStatusCodesCollectionFilterModel>;

	#options: Array<Option> = [
		{ name: 'All', value: '0' },
		{ name: '200 - OK', value: '200' },
		{ name: '301 - Moved Permanently', value: '301' },
		{ name: '302 - Found', value: '302' },
		{ name: '304 - Not Modified', value: '304' },
		{ name: '307 - Temporary Redirect', value: '307' },
		{ name: '308 - Permanent Redirect', value: '308' },
		{ name: '400 - Bad Request', value: '400' },
		{ name: '401 - Unauthorized', value: '401' },
		{ name: '403 - Forbidden', value: '403' },
		{ name: '404 - Not Found', value: '404' },
		{ name: '410 - Gone', value: '410' },
		{ name: '429 - Too Many Requests', value: '429' },
		{ name: '500 - Internal Server Error', value: '500' },
		{ name: '502 - Bad Gateway', value: '502' },
		{ name: '503 - Service Unavailable', value: '503' },
		{ name: '504 - Gateway Timeout', value: '504' },
	];

	constructor() {
		super();

		this.consumeContext(UMB_COLLECTION_CONTEXT, (collectionContext) => {
			this.#collectionContext = collectionContext;
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