import { html as f, css as _, customElement as C } from "@umbraco-cms/backoffice/external/lit";
import { UmbCollectionDefaultElement as y, UMB_COLLECTION_CONTEXT as g } from "@umbraco-cms/backoffice/collection";
import { UUITextStyles as w } from "@umbraco-cms/backoffice/external/uui";
var x = Object.getOwnPropertyDescriptor, m = (e) => {
  throw TypeError(e);
}, S = (e, t, a, i) => {
  for (var n = i > 1 ? void 0 : i ? x(t, a) : t, r = e.length - 1, v; r >= 0; r--)
    (v = e[r]) && (n = v(n) || n);
  return n;
}, d = (e, t, a) => t.has(e) || m("Cannot " + a), p = (e, t, a) => (d(e, t, "read from private field"), a ? a.call(e) : t.get(e)), s = (e, t, a) => t.has(e) ? m("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), b = (e, t, a, i) => (d(e, t, "write to private field"), t.set(e, a), a), E = (e, t, a) => (d(e, t, "access private method"), a), o, u, c, h;
let l = class extends y {
  constructor() {
    super(), s(this, c), s(this, o), s(this, u, [
      { name: "All", value: "0" },
      { name: "200 - OK", value: "200" },
      { name: "301 - Moved Permanently", value: "301" },
      { name: "302 - Found", value: "302" },
      { name: "304 - Not Modified", value: "304" },
      { name: "307 - Temporary Redirect", value: "307" },
      { name: "308 - Permanent Redirect", value: "308" },
      { name: "400 - Bad Request", value: "400" },
      { name: "401 - Unauthorized", value: "401" },
      { name: "403 - Forbidden", value: "403" },
      { name: "404 - Not Found", value: "404" },
      { name: "410 - Gone", value: "410" },
      { name: "429 - Too Many Requests", value: "429" },
      { name: "500 - Internal Server Error", value: "500" },
      { name: "502 - Bad Gateway", value: "502" },
      { name: "503 - Service Unavailable", value: "503" },
      { name: "504 - Gateway Timeout", value: "504" }
    ]), this.consumeContext(g, (e) => {
      b(this, o, e);
    });
  }
  renderToolbar() {
    return f`
			<umb-collection-toolbar slot="header">
				<div id="toolbar">
					<umb-collection-filter-field></umb-collection-filter-field>
					<uui-select
						label="Select status code..."
						placeholder="Select status code..."
						.options=${p(this, u)}
						@change=${E(this, c, h)}></uui-select>
				</div>
			</umb-collection-toolbar>
		`;
  }
};
o = /* @__PURE__ */ new WeakMap();
u = /* @__PURE__ */ new WeakMap();
c = /* @__PURE__ */ new WeakSet();
h = function(e) {
  const t = e.target.value;
  p(this, o)?.setFilter({ statusCode: parseInt(t) });
};
l.styles = [
  w,
  _`
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
		`
];
l = S([
  C("content-audit-status-codes-collection")
], l);
const U = l;
export {
  l as ContentAuditStatusCodesCollectionElement,
  U as default
};
//# sourceMappingURL=status-codes.element-ByVlvWD4.js.map
