import { f as u, u as l } from "./index-Bn_0n6ex.js";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const p = { attribute: !0, type: String, converter: l, reflect: !1, hasChanged: u }, d = (t = p, s, e) => {
  const { kind: a, metadata: i } = e;
  let r = globalThis.litPropertyMetadata.get(i);
  if (r === void 0 && globalThis.litPropertyMetadata.set(i, r = /* @__PURE__ */ new Map()), a === "setter" && ((t = Object.create(t)).wrapped = !0), r.set(e.name, t), a === "accessor") {
    const { name: n } = e;
    return { set(o) {
      const c = s.get.call(this);
      s.set.call(this, o), this.requestUpdate(n, c, t);
    }, init(o) {
      return o !== void 0 && this.C(n, void 0, t, o), o;
    } };
  }
  if (a === "setter") {
    const { name: n } = e;
    return function(o) {
      const c = this[n];
      s.call(this, o), this.requestUpdate(n, c, t);
    };
  }
  throw Error("Unsupported decorator location: " + a);
};
function h(t) {
  return (s, e) => typeof e == "object" ? d(t, s, e) : ((a, i, r) => {
    const n = i.hasOwnProperty(r);
    return i.constructor.createProperty(r, a), n ? Object.getOwnPropertyDescriptor(i, r) : void 0;
  })(t, s, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function b(t) {
  return h({ ...t, state: !0, attribute: !1 });
}
export {
  b as r
};
//# sourceMappingURL=state-rjnk12_K.js.map
