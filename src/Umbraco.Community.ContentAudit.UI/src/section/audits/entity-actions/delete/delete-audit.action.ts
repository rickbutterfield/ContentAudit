import { UmbEntityActionBase } from '@umbraco-cms/backoffice/entity-action';
import { UMB_ACTION_EVENT_CONTEXT } from '@umbraco-cms/backoffice/action';
import { UMB_MODAL_MANAGER_CONTEXT } from '@umbraco-cms/backoffice/modal';
import { UMB_NOTIFICATION_CONTEXT } from '@umbraco-cms/backoffice/notification';
import { UmbRequestReloadChildrenOfEntityEvent } from '@umbraco-cms/backoffice/entity-action';
import { UMB_CONFIRM_MODAL } from '@umbraco-cms/backoffice/modal';
import { AuditService } from '../../../../api';
import { CONTENT_AUDIT_CONTEXT_TOKEN } from '../../../../context/audit.context';

export class DeleteAuditEntityAction extends UmbEntityActionBase<never> {
	async execute() {
		const modalManager = await this.getContext(UMB_MODAL_MANAGER_CONTEXT);
		const notificationContext = await this.getContext(UMB_NOTIFICATION_CONTEXT);

		if (!modalManager || !notificationContext) return;

		const modalContext = modalManager.open(this, UMB_CONFIRM_MODAL, {
			data: {
				headline: 'Delete Audit',
				content: 'Are you sure you want to delete this audit? This action cannot be undone.',
				confirmLabel: 'Delete',
				color: 'danger',
			},
		});

		await modalContext?.onSubmit();

		notificationContext.peek('default', {
			data: { headline: 'Deleting audit...', message: 'Please wait' },
		});

		try {
			await AuditService.delete({ path: { id: this.args.unique as string } });

			const eventContext = await this.getContext(UMB_ACTION_EVENT_CONTEXT);
			if (!eventContext) {
				throw new Error('Could not get the action event context');
			}
			const event = new UmbRequestReloadChildrenOfEntityEvent({
				entityType: 'audits-root',
				unique: null,
			});
			eventContext.dispatchEvent(event);

			const auditContext = await this.getContext(CONTENT_AUDIT_CONTEXT_TOKEN);
			auditContext?.getLatestAuditOverview();
			auditContext?.getAuditOverviews();
			auditContext?.getTopIssues();
			auditContext?.getHealthScore();

			notificationContext.peek('positive', {
				data: { headline: 'Audit deleted', message: 'The audit has been deleted successfully.' },
			});
		} catch (error) {
			notificationContext.peek('danger', {
				data: { headline: 'Delete failed', message: (error as Error).message },
			});
		}
	}
}

export default DeleteAuditEntityAction;
