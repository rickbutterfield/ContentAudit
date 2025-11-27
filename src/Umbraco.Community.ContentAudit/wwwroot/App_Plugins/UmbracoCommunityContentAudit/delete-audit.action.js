import { UmbEntityActionBase as o, UmbRequestReloadChildrenOfEntityEvent as s } from "@umbraco-cms/backoffice/entity-action";
import { UMB_ACTION_EVENT_CONTEXT as d } from "@umbraco-cms/backoffice/action";
import { UMB_MODAL_MANAGER_CONTEXT as r, UMB_CONFIRM_MODAL as l } from "@umbraco-cms/backoffice/modal";
import { UMB_NOTIFICATION_CONTEXT as u } from "@umbraco-cms/backoffice/notification";
import { A as c } from "./index.js";
class g extends o {
  async execute() {
    const i = await this.getContext(r), e = await this.getContext(u);
    if (!i || !e) return;
    const a = i.open(this, l, {
      data: {
        headline: "Delete Audit",
        content: "Are you sure you want to delete this audit? This action cannot be undone.",
        confirmLabel: "Delete"
      }
    });
    await (a == null ? void 0 : a.onSubmit()), e.peek("default", {
      data: { headline: "Deleting audit...", message: "Please wait" }
    });
    try {
      await c.delete({ path: { id: this.args.unique } });
      const t = await this.getContext(d);
      if (!t)
        throw new Error("Could not get the action event context");
      const n = new s({
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
  g as DeleteAuditEntityAction,
  g as default
};
//# sourceMappingURL=delete-audit.action.js.map
