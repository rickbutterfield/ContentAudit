import { UmbLitElement as O } from "@umbraco-cms/backoffice/lit-element";
import { UmbModalRouteRegistrationController as W } from "@umbraco-cms/backoffice/router";
import { UMB_WORKSPACE_MODAL as D } from "@umbraco-cms/backoffice/workspace";
import { I as k, t as M } from "./index-BUsZH3tI.js";
import { r as p } from "./state-C-6jRtm-.js";
import { CONTENT_AUDIT_ISSUES_WORKSPACE_CONTEXT as R } from "./issues-workspace.context-Dv3G-QEZ.js";
import { html as h, nothing as C, css as q } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as U } from "@umbraco-cms/backoffice/style";
var N = Object.defineProperty, z = Object.getOwnPropertyDescriptor, w = (t) => {
  throw TypeError(t);
}, u = (t, e, a, c) => {
  for (var n = c > 1 ? void 0 : c ? z(e, a) : e, m = t.length - 1, y; m >= 0; m--)
    (y = t[m]) && (n = (c ? y(e, a, n) : y(n)) || n);
  return c && n && N(e, a, n), n;
}, g = (t, e, a) => e.has(t) || w("Cannot " + a), o = (t, e, a) => (g(t, e, "read from private field"), a ? a.call(t) : e.get(t)), _ = (t, e, a) => e.has(t) ? w("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), v = (t, e, a, c) => (g(t, e, "write to private field"), e.set(t, a), a), r = (t, e, a) => (g(t, e, "access private method"), a), l, f, d, i, $, b, E, A, P, S, T, x;
const I = 50;
let s = class extends O {
  constructor() {
    super(), _(this, i), this._references = [], this._total = 0, this._currentPage = 1, this._tableConfig = {
      allowSelection: !1,
      hideIcon: !0
    }, this._tableItems = [], _(this, l, !1), _(this, f, ""), _(this, d), new W(this, D).addAdditionalPath("all-pages").onSetup(() => ({ data: { entityType: "all-pages", preset: {} } })).observeRouteBuilder((t) => {
      v(this, f, t({})), r(this, i, P).call(this);
    }), this.consumeContext(R, (t) => {
      v(this, d, t), r(this, i, $).call(this);
    });
  }
  render() {
    return h`
			${r(this, i, S).call(this)}
			${r(this, i, x).call(this)}
		`;
  }
};
l = /* @__PURE__ */ new WeakMap();
f = /* @__PURE__ */ new WeakMap();
d = /* @__PURE__ */ new WeakMap();
i = /* @__PURE__ */ new WeakSet();
$ = function() {
  o(this, d) && this.observe(o(this, d).data, (t) => {
    this._data = t, t?.unique && (this._currentPage = 1, r(this, i, b).call(this, 0));
  }, "umbCollectionItemsObserver");
};
b = async function(t) {
  const e = this._data?.unique;
  if (!e) return;
  const { data: a } = await k.getIssueReferences({
    path: { id: e },
    query: { skip: t, take: I }
  });
  a && (this._total = a.total, this._references = a.items, v(this, l, this._references.length > 0 && !!this._references[0].foundPage), r(this, i, P).call(this));
};
E = function(t) {
  if (this._currentPage === t.target.current) return;
  this._currentPage = t.target.current;
  const e = (this._currentPage - 1) * I;
  r(this, i, b).call(this, e);
};
A = function() {
  const t = [];
  return this._data == null || (t.push({
    name: o(this, l) ? "URL" : "Page",
    alias: "url"
  }), !o(this, l) && this._data.exposedProperties?.length && this._data.exposedProperties.forEach((e) => {
    t.push({ name: e.name, alias: e.alias, elementName: e.elementName, labelTemplate: e.labelTemplate });
  }), o(this, l) && t.push({
    name: "Found Page",
    alias: "foundPage"
  })), t;
};
P = function() {
  o(this, l) ? this._tableItems = this._references.map((t) => ({
    id: t.unique,
    data: [
      { columnAlias: "url", value: t.url },
      { columnAlias: "foundPage", value: t.foundPage }
    ]
  })) : this._tableItems = this._references.map((t) => {
    const e = {
      id: t.unique,
      data: [
        {
          columnAlias: "url",
          value: h`<a href=${o(this, f) + "edit/" + t.unique}>${t.url}</a>`
        }
      ]
    };
    return this._data?.exposedProperties?.length && this._data.exposedProperties.forEach((a) => {
      e.data.push({ columnAlias: a.alias, value: t.exposedValues?.[a.alias] });
    }), e;
  });
};
S = function() {
  return h`
			<div>
				<umb-table
					.config=${this._tableConfig}
					.columns=${o(this, i, A)}
					.items=${this._tableItems}>
				</umb-table>
				${r(this, i, T).call(this)}
			</div>
		`;
};
T = function() {
  if (!this._total) return C;
  const t = Math.ceil(this._total / I);
  return t <= 1 ? C : h`
			<div class="pagination">
				<uui-pagination
					.total=${t}
					.current=${this._currentPage}
					@change=${r(this, i, E)}></uui-pagination>
			</div>
		`;
};
x = function() {
  return h`
			<uui-box style="align-self: flex-start;">
				<umb-property-layout label="Name" orientation="vertical">
					<div slot="editor">${this._data?.name}</div>
				</umb-property-layout>
				<umb-property-layout label="Category" orientation="vertical">
					<div slot="editor">${this._data?.category}</div>
				</umb-property-layout>
				<umb-property-layout label="Description" orientation="vertical">
					<div slot="editor">${this._data?.description}</div>
				</umb-property-layout>

				<umb-property-layout label="Issue Type" orientation="vertical">
					<div slot="editor">
						<content-audit-issue-type-label .type=${this._data?.type}></content-audit-issue-type-label>
					</div>
				</umb-property-layout>
				<umb-property-layout label="Issue Priority" orientation="vertical">
					<div slot="editor">
						<content-audit-priority-type-label .type=${this._data?.priority}></content-audit-priority-type-label>
					</div>
				</umb-property-layout>
			</uui-box>
		`;
};
s.styles = [
  U,
  q`
			:host {
				display: grid;
				gap: var(--uui-size-layout-1);
				padding: var(--uui-size-layout-1);
				grid-template-columns: 1fr 350px;
			}

            umb-property-layout {
                padding: var(--uui-size-space-4) 0;

                &:first-of-type {
                    padding-top: 0;
                }

                &:last-of-type {
                    padding-bottom: 0;
                }
            }

			.pagination {
				display: flex;
				justify-content: center;
				margin-top: var(--uui-size-layout-1);
			}
		`
];
u([
  p()
], s.prototype, "_data", 2);
u([
  p()
], s.prototype, "_references", 2);
u([
  p()
], s.prototype, "_total", 2);
u([
  p()
], s.prototype, "_currentPage", 2);
u([
  p()
], s.prototype, "_tableConfig", 2);
u([
  p()
], s.prototype, "_tableItems", 2);
s = u([
  M("content-audit-issues-details-workspace-view")
], s);
const H = s;
export {
  s as ContentAuditIssuesDetailsWorkspaceViewElement,
  H as default
};
//# sourceMappingURL=issues-details-workspace-view.element-CnwbzYpJ.js.map
