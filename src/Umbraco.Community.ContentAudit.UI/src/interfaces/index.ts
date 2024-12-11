export interface IssueLabelConfig {
    label: string;
    icon: string;
	class: string;
	color: string;
}

export interface UmbTableItem {
	id: string;
	icon?: string | null;
	entityType?: string;
	data: Array<UmbTableItemData>;
}

export interface UmbTableItemData {
	columnAlias: string;
	value: any;
}

export interface UmbTableColumn {
	name: string;
	alias: string;
	elementName?: string;
	width?: string;
	allowSorting?: boolean;
	align?: 'left' | 'center' | 'right';
	labelTemplate?: string;
}

export interface UmbTableColumnLayoutElement extends HTMLElement {
	column: UmbTableColumn;
	item: UmbTableItem;
	value: any;
}

export interface UmbTableConfig {
	allowSelection: boolean;
	hideIcon?: boolean;
}

export class UmbTableSelectedEvent extends Event {
	public constructor() {
		super('selected', { bubbles: true, composed: true });
	}
}

export class UmbTableDeselectedEvent extends Event {
	public constructor() {
		super('deselected', { bubbles: true, composed: true });
	}
}

export class UmbTableOrderedEvent extends Event {
	public constructor() {
		super('ordered', { bubbles: true, composed: true });
	}
}