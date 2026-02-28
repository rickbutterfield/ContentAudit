import { UmbEntityActionBase as i, UmbRequestReloadChildrenOfEntityEvent as o } from "@umbraco-cms/backoffice/entity-action";
import { UMB_ACTION_EVENT_CONTEXT as s } from "@umbraco-cms/backoffice/action";
import { UMB_MODAL_MANAGER_CONTEXT as d, UMB_CONFIRM_MODAL as r } from "@umbraco-cms/backoffice/modal";
import { UMB_NOTIFICATION_CONTEXT as l } from "@umbraco-cms/backoffice/notification";
import { A as u } from "./index-B8flLQWi.js";
class T extends i {
  async execute() {
    const a = await this.getContext(d), e = await this.getContext(l);
    if (!a || !e) return;
    await a.open(this, r, {
      data: {
        headline: "Delete Audit",
        content: "Are you sure you want to delete this audit? This action cannot be undone.",
        confirmLabel: "Delete"
      }
    })?.onSubmit(), e.peek("default", {
      data: { headline: "Deleting audit...", message: "Please wait" }
    });
    try {
      await u.delete({ path: { id: this.args.unique } });
      const t = await this.getContext(s);
      if (!t)
        throw new Error("Could not get the action event context");
      const n = new o({
        entityType: "audits-root",
        unique: null
      });
      t.dispatchEvent(n), e.peek("positive", {
        data: { headline: "Audit deleted", message: "The audit has been deleted successfully." }
      });
    } catch (t) {
      e.peek("danger", {
        data: { headline: "Delete failed", message: t.message }
      });
    }
  }
}
export {
  T as DeleteAuditEntityAction,
  T as default
};
//# sourceMappingURL=delete-audit.action-dfQVfTxE.js.map
