//#region node_modules/@lit/reactive-element/css-tag.js
var e = globalThis, t = e.ShadowRoot && (e.ShadyCSS === void 0 || e.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, n = Symbol(), r = /* @__PURE__ */ new WeakMap(), i = class {
	constructor(e, t, r) {
		if (this._$cssResult$ = !0, r !== n) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
		this.cssText = e, this.t = t;
	}
	get styleSheet() {
		let e = this.o, n = this.t;
		if (t && e === void 0) {
			let t = n !== void 0 && n.length === 1;
			t && (e = r.get(n)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), t && r.set(n, e));
		}
		return e;
	}
	toString() {
		return this.cssText;
	}
}, a = (e) => new i(typeof e == "string" ? e : e + "", void 0, n), o = (e, ...t) => new i(e.length === 1 ? e[0] : t.reduce((t, n, r) => t + ((e) => {
	if (!0 === e._$cssResult$) return e.cssText;
	if (typeof e == "number") return e;
	throw Error("Value passed to 'css' function must be a 'css' function result: " + e + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
})(n) + e[r + 1], e[0]), e, n), s = (n, r) => {
	if (t) n.adoptedStyleSheets = r.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
	else for (let t of r) {
		let r = document.createElement("style"), i = e.litNonce;
		i !== void 0 && r.setAttribute("nonce", i), r.textContent = t.cssText, n.appendChild(r);
	}
}, c = t ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((e) => {
	let t = "";
	for (let n of e.cssRules) t += n.cssText;
	return a(t);
})(e) : e, { is: l, defineProperty: u, getOwnPropertyDescriptor: d, getOwnPropertyNames: f, getOwnPropertySymbols: p, getPrototypeOf: m } = Object, h = globalThis, g = h.trustedTypes, ee = g ? g.emptyScript : "", te = h.reactiveElementPolyfillSupport, _ = (e, t) => e, v = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean:
				e = e ? ee : null;
				break;
			case Object:
			case Array: e = e == null ? e : JSON.stringify(e);
		}
		return e;
	},
	fromAttribute(e, t) {
		let n = e;
		switch (t) {
			case Boolean:
				n = e !== null;
				break;
			case Number:
				n = e === null ? null : Number(e);
				break;
			case Object:
			case Array: try {
				n = JSON.parse(e);
			} catch {
				n = null;
			}
		}
		return n;
	}
}, y = (e, t) => !l(e, t), b = {
	attribute: !0,
	type: String,
	converter: v,
	reflect: !1,
	useDefault: !1,
	hasChanged: y
};
Symbol.metadata ??= Symbol("metadata"), h.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var x = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = b) {
		if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
			let n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
			r !== void 0 && u(this.prototype, e, r);
		}
	}
	static getPropertyDescriptor(e, t, n) {
		let { get: r, set: i } = d(this.prototype, e) ?? {
			get() {
				return this[t];
			},
			set(e) {
				this[t] = e;
			}
		};
		return {
			get: r,
			set(t) {
				let a = r?.call(this);
				i?.call(this, t), this.requestUpdate(e, a, n);
			},
			configurable: !0,
			enumerable: !0
		};
	}
	static getPropertyOptions(e) {
		return this.elementProperties.get(e) ?? b;
	}
	static _$Ei() {
		if (this.hasOwnProperty(_("elementProperties"))) return;
		let e = m(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(_("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(_("properties"))) {
			let e = this.properties, t = [...f(e), ...p(e)];
			for (let n of t) this.createProperty(n, e[n]);
		}
		let e = this[Symbol.metadata];
		if (e !== null) {
			let t = litPropertyMetadata.get(e);
			if (t !== void 0) for (let [e, n] of t) this.elementProperties.set(e, n);
		}
		this._$Eh = /* @__PURE__ */ new Map();
		for (let [e, t] of this.elementProperties) {
			let n = this._$Eu(e, t);
			n !== void 0 && this._$Eh.set(n, e);
		}
		this.elementStyles = this.finalizeStyles(this.styles);
	}
	static finalizeStyles(e) {
		let t = [];
		if (Array.isArray(e)) {
			let n = new Set(e.flat(Infinity).reverse());
			for (let e of n) t.unshift(c(e));
		} else e !== void 0 && t.push(c(e));
		return t;
	}
	static _$Eu(e, t) {
		let n = t.attribute;
		return !1 === n ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0;
	}
	constructor() {
		super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
	}
	_$Ev() {
		this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
	}
	addController(e) {
		(this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
	}
	removeController(e) {
		this._$EO?.delete(e);
	}
	_$E_() {
		let e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
		for (let n of t.keys()) this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
		e.size > 0 && (this._$Ep = e);
	}
	createRenderRoot() {
		let e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
		return s(e, this.constructor.elementStyles), e;
	}
	connectedCallback() {
		this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
	}
	enableUpdating(e) {}
	disconnectedCallback() {
		this._$EO?.forEach((e) => e.hostDisconnected?.());
	}
	attributeChangedCallback(e, t, n) {
		this._$AK(e, n);
	}
	_$ET(e, t) {
		let n = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, n);
		if (r !== void 0 && !0 === n.reflect) {
			let i = (n.converter?.toAttribute === void 0 ? v : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? v : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? y)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
			this.C(e, t, n);
		}
		!1 === this.isUpdatePending && (this._$ES = this._$EP());
	}
	C(e, t, { useDefault: n, reflect: r, wrapped: i }, a) {
		n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), !0 !== i || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (t = void 0), this._$AL.set(e, t)), !0 === r && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
	}
	async _$EP() {
		this.isUpdatePending = !0;
		try {
			await this._$ES;
		} catch (e) {
			Promise.reject(e);
		}
		let e = this.scheduleUpdate();
		return e != null && await e, !this.isUpdatePending;
	}
	scheduleUpdate() {
		return this.performUpdate();
	}
	performUpdate() {
		if (!this.isUpdatePending) return;
		if (!this.hasUpdated) {
			if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
				for (let [e, t] of this._$Ep) this[e] = t;
				this._$Ep = void 0;
			}
			let e = this.constructor.elementProperties;
			if (e.size > 0) for (let [t, n] of e) {
				let { wrapped: e } = n, r = this[t];
				!0 !== e || this._$AL.has(t) || r === void 0 || this.C(t, void 0, n, r);
			}
		}
		let e = !1, t = this._$AL;
		try {
			e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((e) => e.hostUpdate?.()), this.update(t)) : this._$EM();
		} catch (t) {
			throw e = !1, this._$EM(), t;
		}
		e && this._$AE(t);
	}
	willUpdate(e) {}
	_$AE(e) {
		this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
	}
	_$EM() {
		this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
	}
	get updateComplete() {
		return this.getUpdateComplete();
	}
	getUpdateComplete() {
		return this._$ES;
	}
	shouldUpdate(e) {
		return !0;
	}
	update(e) {
		this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
	}
	updated(e) {}
	firstUpdated(e) {}
};
x.elementStyles = [], x.shadowRootOptions = { mode: "open" }, x[_("elementProperties")] = /* @__PURE__ */ new Map(), x[_("finalized")] = /* @__PURE__ */ new Map(), te?.({ ReactiveElement: x }), (h.reactiveElementVersions ??= []).push("2.1.2");
//#endregion
//#region node_modules/lit-html/lit-html.js
var S = globalThis, ne = (e) => e, C = S.trustedTypes, w = C ? C.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, T = "$lit$", E = `lit$${Math.random().toFixed(9).slice(2)}$`, re = "?" + E, ie = `<${re}>`, D = document, O = () => D.createComment(""), k = (e) => e === null || typeof e != "object" && typeof e != "function", A = Array.isArray, ae = (e) => A(e) || typeof e?.[Symbol.iterator] == "function", j = "[ 	\n\f\r]", M = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, N = /-->/g, oe = />/g, P = RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), se = /'/g, ce = /"/g, F = /^(?:script|style|textarea|title)$/i, le = (e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}), I = le(1), L = le(2), R = Symbol.for("lit-noChange"), z = Symbol.for("lit-nothing"), B = /* @__PURE__ */ new WeakMap(), V = D.createTreeWalker(D, 129);
function H(e, t) {
	if (!A(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return w === void 0 ? t : w.createHTML(t);
}
var ue = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = M;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === M ? c[1] === "!--" ? o = N : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = P) : (F.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = P) : o = oe : o === P ? c[0] === ">" ? (o = i ?? M, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? P : c[3] === "\"" ? ce : se) : o === ce || o === se ? o = P : o === N || o === oe ? o = M : (o = P, i = void 0);
		let d = o === P && e[t + 1].startsWith("/>") ? " " : "";
		a += o === M ? n + ie : l >= 0 ? (r.push(s), n.slice(0, l) + T + n.slice(l) + E + d) : n + E + (l === -2 ? t : d);
	}
	return [H(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, U = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = ue(t, n);
		if (this.el = e.createElement(l, r), V.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = V.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(T)) {
					let t = u[o++], n = i.getAttribute(e).split(E), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? fe : r[1] === "?" ? pe : r[1] === "@" ? me : K
					}), i.removeAttribute(e);
				} else e.startsWith(E) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (F.test(i.tagName)) {
					let e = i.textContent.split(E), t = e.length - 1;
					if (t > 0) {
						i.textContent = C ? C.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], O()), V.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], O());
					}
				}
			} else if (i.nodeType === 8) if (i.data === re) c.push({
				type: 2,
				index: a
			});
			else {
				let e = -1;
				for (; (e = i.data.indexOf(E, e + 1)) !== -1;) c.push({
					type: 7,
					index: a
				}), e += E.length - 1;
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = D.createElement("template");
		return n.innerHTML = e, n;
	}
};
function W(e, t, n = e, r) {
	if (t === R) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = k(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = W(e, i._$AS(e, t.values), i, r)), t;
}
var de = class {
	constructor(e, t) {
		this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
	}
	get parentNode() {
		return this._$AM.parentNode;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	u(e) {
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? D).importNode(t, !0);
		V.currentNode = r;
		let i = V.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new G(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new he(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = V.nextNode(), a++);
		}
		return V.currentNode = D, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, G = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = z, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
	}
	get parentNode() {
		let e = this._$AA.parentNode, t = this._$AM;
		return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
	}
	get startNode() {
		return this._$AA;
	}
	get endNode() {
		return this._$AB;
	}
	_$AI(e, t = this) {
		e = W(this, e, t), k(e) ? e === z || e == null || e === "" ? (this._$AH !== z && this._$AR(), this._$AH = z) : e !== this._$AH && e !== R && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? ae(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== z && k(this._$AH) ? this._$AA.nextSibling.data = e : this.T(D.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = U.createElement(H(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new de(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = B.get(e.strings);
		return t === void 0 && B.set(e.strings, t = new U(e)), t;
	}
	k(t) {
		A(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(O()), this.O(O()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = ne(e).nextSibling;
			ne(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, K = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = z, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = z;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = W(this, e, t, 0), a = !k(e) || e !== this._$AH && e !== R, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = W(this, r[n + o], t, o), s === R && (s = this._$AH[o]), a ||= !k(s) || s !== this._$AH[o], s === z ? e = z : e !== z && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === z ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, fe = class extends K {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === z ? void 0 : e;
	}
}, pe = class extends K {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== z);
	}
}, me = class extends K {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = W(this, e, t, 0) ?? z) === R) return;
		let n = this._$AH, r = e === z && n !== z || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== z && (n === z || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, he = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		W(this, e);
	}
}, ge = S.litHtmlPolyfillSupport;
ge?.(U, G), (S.litHtmlVersions ??= []).push("3.3.3");
var _e = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new G(t.insertBefore(O(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, q = globalThis, J = class extends x {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = _e(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return R;
	}
};
J._$litElement$ = !0, J.finalized = !0, q.litElementHydrateSupport?.({ LitElement: J });
var ve = q.litElementPolyfillSupport;
ve?.({ LitElement: J }), (q.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region node_modules/@lit/reactive-element/decorators/custom-element.js
var ye = (e) => (t, n) => {
	n === void 0 ? customElements.define(e, t) : n.addInitializer(() => {
		customElements.define(e, t);
	});
}, be = {
	attribute: !0,
	type: String,
	converter: v,
	reflect: !1,
	hasChanged: y
}, xe = (e = be, t, n) => {
	let { kind: r, metadata: i } = n, a = globalThis.litPropertyMetadata.get(i);
	if (a === void 0 && globalThis.litPropertyMetadata.set(i, a = /* @__PURE__ */ new Map()), r === "setter" && ((e = Object.create(e)).wrapped = !0), a.set(n.name, e), r === "accessor") {
		let { name: r } = n;
		return {
			set(n) {
				let i = t.get.call(this);
				t.set.call(this, n), this.requestUpdate(r, i, e, !0, n);
			},
			init(t) {
				return t !== void 0 && this.C(r, void 0, e, t), t;
			}
		};
	}
	if (r === "setter") {
		let { name: r } = n;
		return function(n) {
			let i = this[r];
			t.call(this, n), this.requestUpdate(r, i, e, !0, n);
		};
	}
	throw Error("Unsupported decorator location: " + r);
};
function Y(e) {
	return (t, n) => typeof n == "object" ? xe(e, t, n) : ((e, t, n) => {
		let r = t.hasOwnProperty(n);
		return t.constructor.createProperty(n, e), r ? Object.getOwnPropertyDescriptor(t, n) : void 0;
	})(e, t, n);
}
//#endregion
//#region node_modules/@lit/reactive-element/decorators/state.js
function X(e) {
	return Y({
		...e,
		state: !0,
		attribute: !1
	});
}
//#endregion
//#region node_modules/@lit/reactive-element/decorators/base.js
var Se = (e, t, n) => (n.configurable = !0, n.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(e, t, n), n), Ce;
function we(e) {
	return (t, n) => Se(t, n, { get() {
		return (this.renderRoot ?? (Ce ??= document.createDocumentFragment())).querySelectorAll(e);
	} });
}
//#endregion
//#region src/styles.ts
var Te = o`
  :host {
    --ember-bg-color: var(--ha-card-background, #1c1c1c);
    --ember-text-color: var(--primary-text-color, #ffffff);
    
    /* Configurable variables with defaults */
    --color-grid: var(--ember-color-grid, #3498db);
    --color-solar: var(--ember-color-solar, #f1c40f);
    --color-battery: var(--ember-color-battery, #2ecc71);
    --color-home: var(--ember-color-home, #9b59b6);
    
    --path-color: rgba(255, 255, 255, 0.1);
    --dot-size: 4px;
    
    display: block;
  }

  ha-card {
    background: var(--ember-bg-color);
    color: var(--ember-text-color);
    border-radius: 16px;
    padding: 16px;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    overflow: hidden;
  }

  .card-content {
    position: relative;
    width: 100%;
    padding: 16px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .grid-container {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    grid-template-rows: auto auto auto;
    width: 100%;
    height: auto;
    gap: 32px;
    z-index: 2;
  }

  /* Node Sections */
  .node-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .solar-section {
    grid-column: 1 / span 3;
    grid-row: 1;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
  }

  .grid-section {
    grid-column: 1;
    grid-row: 2;
  }

  .home-section {
    grid-column: 2;
    grid-row: 2;
  }

  .battery-section {
    grid-column: 1 / span 3;
    grid-row: 3;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
    align-items: flex-start;
  }

  /* Battery Groups */
  .battery-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid var(--color-battery);
    border-radius: 20px;
    padding: 24px 32px 16px 32px;
    position: relative;
    background: rgba(255, 255, 255, 0.02);
    box-shadow: inset 0 0 15px rgba(46, 204, 113, 0.05);
  }

  .battery-group-title {
    position: absolute;
    top: -10px;
    background: var(--ember-bg-color);
    padding: 0 12px;
    font-size: 12px;
    color: var(--color-battery);
    font-weight: bold;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
  }

  .battery-group-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }

  /* Individual Node */
  .node {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 90px;
    padding: 12px 16px;
    border-radius: 16px;
    background: var(--ember-bg-color);
    border: 2px solid transparent;
    z-index: 10;
    position: relative;
    box-sizing: border-box;
  }

  .node.home {
    min-width: 110px;
    padding: 16px 20px;
    border-color: var(--color-home);
    box-shadow: 0 0 15px rgba(155, 89, 182, 0.2);
  }

  .node.solar {
    border-color: var(--color-solar);
    box-shadow: 0 0 15px rgba(241, 196, 15, 0.2);
  }

  .node.battery {
    border-color: var(--color-battery);
    box-shadow: 0 0 15px rgba(46, 204, 113, 0.2);
  }

  .node.grid {
    border-color: var(--color-grid);
    box-shadow: 0 0 15px rgba(52, 152, 219, 0.2);
  }

  .icon {
    font-size: 24px;
    margin-bottom: 4px;
  }

  .value {
    font-size: 14px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }
  
  .name {
    font-size: 11px;
    opacity: 0.7;
    text-align: center;
    margin-top: 4px;
    word-break: break-word;
    max-width: 100%;
  }

  .soc {
    font-size: 12px;
    color: var(--color-battery);
    margin-top: 2px;
    font-weight: bold;
  }

  .autarky {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 12px;
    background: rgba(255,255,255,0.1);
    padding: 4px 8px;
    border-radius: 12px;
  }

  /* SVG Animation Layer */
  .flow-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
  }

  .flow-path {
    fill: none;
    stroke: var(--path-color);
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .flow-circle {
    fill: var(--dot-color, #fff);
    filter: drop-shadow(0 0 4px var(--dot-color, #fff));
  }
`;
//#endregion
//#region \0@oxc-project+runtime@0.139.0/helpers/esm/decorate.js
function Z(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
//#endregion
//#region src/editor.ts
var Q = class extends J {
	setConfig(e) {
		this._config = e;
	}
	_valueChanged(e) {
		if (!this._config || !this.hass) return;
		let t = e.target;
		if (!t.configValue) return;
		let n = t.value;
		if (t.type === "checkbox" && (n = t.checked), this._config[t.configValue] === n) return;
		if (n === "") {
			let e = { ...this._config };
			delete e[t.configValue], this._config = e;
		} else this._config = {
			...this._config,
			[t.configValue]: n
		};
		let r = new CustomEvent("config-changed", {
			detail: { config: this._config },
			bubbles: !0,
			composed: !0
		});
		this.dispatchEvent(r);
	}
	_updateArrayValue(e, t, n, r) {
		let i = [...this._config[e] || []];
		i[t] = {
			...i[t],
			[n]: r
		}, this._config = {
			...this._config,
			[e]: i
		};
		let a = new CustomEvent("config-changed", {
			detail: { config: this._config },
			bubbles: !0,
			composed: !0
		});
		this.dispatchEvent(a);
	}
	_addArrayItem(e) {
		let t = [...this._config[e] || []];
		e === "solar_entities" ? t.push({
			entity: "",
			name: "Neue Solarquelle"
		}) : t.push({
			entity_power: "",
			entity_soc: "",
			name: "Neue Batterie",
			invert_power: !1
		}), this._config = {
			...this._config,
			[e]: t
		};
		let n = new CustomEvent("config-changed", {
			detail: { config: this._config },
			bubbles: !0,
			composed: !0
		});
		this.dispatchEvent(n);
	}
	_removeArrayItem(e, t) {
		let n = [...this._config[e] || []];
		n.splice(t, 1), this._config = {
			...this._config,
			[e]: n
		};
		let r = new CustomEvent("config-changed", {
			detail: { config: this._config },
			bubbles: !0,
			composed: !0
		});
		this.dispatchEvent(r);
	}
	render() {
		return !this.hass || !this._config ? I`` : I`
      <div class="card-config">
        <h3>Allgemein</h3>
        <div class="row">
          <label class="text-input-wrapper">
            Name (Verbrauch):
            <input type="text"
              .value=${this._config.name_home || ""}
              .configValue=${"name_home"}
              @input=${this._valueChanged}
            />
          </label>
          <label class="text-input-wrapper">
            Name (Netz):
            <input type="text"
              .value=${this._config.name_grid || ""}
              .configValue=${"name_grid"}
              @input=${this._valueChanged}
            />
          </label>
        </div>
        <div class="row checkbox-row">
          <label>
            <input 
              type="checkbox" 
              .checked=${this._config.always_show_paths !== !1}
              .configValue=${"always_show_paths"}
              @change=${this._valueChanged}
            />
            Pfade immer sichtbar (animieren nur bei Leistungsfluss)
          </label>
        </div>

        <h3>Basis Entitäten</h3>
        <p class="description">Hinweis: Wenn "Hausverbrauch" leer bleibt, wird er automatisch berechnet.</p>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this._config.home_consumption_entity || ""}
          .configValue=${"home_consumption_entity"}
          @value-changed=${this._valueChanged}
          allow-custom-entity
          label="Hausverbrauch (W) - Optional"
        ></ha-entity-picker>

        <ha-entity-picker
          .hass=${this.hass}
          .value=${this._config.grid_import_entity || ""}
          .configValue=${"grid_import_entity"}
          @value-changed=${this._valueChanged}
          allow-custom-entity
          label="Netzbezug (W)"
        ></ha-entity-picker>

        <ha-entity-picker
          .hass=${this.hass}
          .value=${this._config.grid_export_entity || ""}
          .configValue=${"grid_export_entity"}
          @value-changed=${this._valueChanged}
          allow-custom-entity
          label="Netzeinspeisung (W)"
        ></ha-entity-picker>

        <h3>Solaranlagen</h3>
        ${(this._config.solar_entities || []).map((e, t) => I`
          <div class="array-item">
            <ha-entity-picker
              .hass=${this.hass}
              .value=${e.entity}
              @value-changed=${(e) => this._updateArrayValue("solar_entities", t, "entity", e.target.value)}
              allow-custom-entity
              label="Solar Entität (W)"
            ></ha-entity-picker>
            <label class="text-input-wrapper">
              Anzeigename:
              <input type="text"
                .value=${e.name || ""}
                @input=${(e) => this._updateArrayValue("solar_entities", t, "name", e.target.value)}
              />
            </label>
            <button class="icon-button" @click=${() => this._removeArrayItem("solar_entities", t)}>
              Löschen
            </button>
          </div>
        `)}
        <button class="primary-button" @click=${() => this._addArrayItem("solar_entities")}>+ Solarquelle hinzufügen</button>

        <h3>Batterien</h3>
        ${(this._config.battery_entities || []).map((e, t) => I`
          <div class="array-item">
            <ha-entity-picker
              .hass=${this.hass}
              .value=${e.entity_power}
              @value-changed=${(e) => this._updateArrayValue("battery_entities", t, "entity_power", e.target.value)}
              allow-custom-entity
              label="Batterieleistung (W)"
            ></ha-entity-picker>
            <ha-entity-picker
              .hass=${this.hass}
              .value=${e.entity_soc}
              @value-changed=${(e) => this._updateArrayValue("battery_entities", t, "entity_soc", e.target.value)}
              allow-custom-entity
              label="Ladezustand (%)"
            ></ha-entity-picker>
            <label class="text-input-wrapper">
              Anzeigename:
              <input type="text"
                .value=${e.name || ""}
                @input=${(e) => this._updateArrayValue("battery_entities", t, "name", e.target.value)}
              />
            </label>
            <label class="text-input-wrapper">
              Gruppenname (Optional):
              <input type="text"
                .value=${e.group || ""}
                @input=${(e) => this._updateArrayValue("battery_entities", t, "group", e.target.value)}
              />
            </label>
            <label class="checkbox-row" style="margin-top: 8px;">
              <input 
                type="checkbox" 
                .checked=${e.invert_power || !1}
                @change=${(e) => this._updateArrayValue("battery_entities", t, "invert_power", e.target.checked)}
              />
              Logik umkehren (Positiver Wert = Laden)
            </label>
            <button class="icon-button" @click=${() => this._removeArrayItem("battery_entities", t)}>
              Löschen
            </button>
          </div>
        `)}
        <button class="primary-button" @click=${() => this._addArrayItem("battery_entities")}>+ Batterie hinzufügen</button>
      </div>
      
      <div style="margin-top: 24px; font-size: 12px; color: var(--secondary-text-color); text-align: center;">
        EmberWATT Card - v1.3.0
      </div>
    `;
	}
	static get styles() {
		return o`
      .card-config {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding-bottom: 24px;
      }
      h3 {
        margin: 16px 0 8px 0;
        font-size: 1.1em;
        font-weight: 500;
      }
      .description {
        font-size: 0.9em;
        color: var(--secondary-text-color);
        margin-top: -8px;
        margin-bottom: 8px;
      }
      .row {
        display: flex;
        gap: 12px;
      }
      .row > * {
        flex: 1;
      }
      .checkbox-row {
        display: flex;
        align-items: center;
        font-size: 0.9em;
        cursor: pointer;
      }
      .checkbox-row input {
        margin-right: 8px;
      }
      .text-input-wrapper {
        display: flex;
        flex-direction: column;
        font-size: 12px;
        color: var(--secondary-text-color);
      }
      .text-input-wrapper input {
        margin-top: 4px;
        padding: 8px;
        border: 1px solid var(--divider-color, rgba(255,255,255,0.1));
        border-radius: 4px;
        background: transparent;
        color: var(--primary-text-color);
        font-size: 14px;
      }
      .array-item {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 12px;
        border: 1px solid var(--divider-color, rgba(255,255,255,0.1));
        border-radius: 8px;
        margin-bottom: 8px;
      }
      .primary-button {
        align-self: flex-start;
        background: var(--primary-color);
        color: var(--text-primary-color, white);
        border: none;
        border-radius: 4px;
        padding: 8px 16px;
        cursor: pointer;
        font-weight: 500;
      }
      .icon-button {
        align-self: flex-end;
        background: transparent;
        color: var(--error-color, red);
        border: 1px solid var(--error-color, red);
        border-radius: 4px;
        padding: 4px 8px;
        cursor: pointer;
        font-size: 0.85em;
        margin-top: 8px;
      }
    `;
	}
};
//#endregion
//#region src/ember-watt-card.ts
Z([Y({ attribute: !1 })], Q.prototype, "hass", void 0), Z([X()], Q.prototype, "_config", void 0), Q = Z([ye("ember-watt-card-editor")], Q), console.info("%c EMBER-WATT-CARD %c v1.3.0 ", "color: orange; font-weight: bold; background: black", "color: white; font-weight: bold; background: dimgray");
var $ = class extends J {
	constructor(...e) {
		super(...e), this._paths = [], this._junctions = [];
	}
	static {
		this.styles = Te;
	}
	static async getConfigElement() {
		return document.createElement("ember-watt-card-editor");
	}
	static getStubConfig() {
		return {
			type: "custom:ember-watt-card",
			always_show_paths: !0
		};
	}
	setConfig(e) {
		if (!e) throw Error("Invalid configuration");
		this._config = e;
	}
	connectedCallback() {
		super.connectedCallback(), this._resizeObserver = new ResizeObserver(() => this._updatePaths());
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._resizeObserver && this._resizeObserver.disconnect();
	}
	firstUpdated(e) {
		super.firstUpdated(e);
		let t = this.shadowRoot?.querySelector(".card-content");
		t && this._resizeObserver.observe(t), setTimeout(() => this._updatePaths(), 100);
	}
	updated(e) {
		super.updated(e), (e.has("hass") || e.has("_config")) && this._updatePaths();
	}
	_getCenter(e, t) {
		let n = e.getBoundingClientRect();
		return {
			x: n.left - t.left + n.width / 2,
			y: n.top - t.top + n.height / 2
		};
	}
	_getEdges(e, t) {
		let n = e.getBoundingClientRect();
		return {
			top: n.top - t.top,
			bottom: n.bottom - t.top,
			left: n.left - t.left,
			right: n.right - t.left
		};
	}
	_updatePaths() {
		let e = this.shadowRoot?.querySelector(".card-content");
		if (!e) return;
		let t = e.getBoundingClientRect(), n = this.shadowRoot?.querySelector(".node.home"), r = this.shadowRoot?.querySelector(".node.grid");
		if (!n || !r) return;
		let i = this._getCenter(n, t), a = this._getEdges(n, t), o = this._getCenter(r, t), s = this._getEdges(r, t), c = [], l = [], u = this._config.always_show_paths !== !1, d = this._getState(this._config.grid_import_entity) - this._getState(this._config.grid_export_entity), f = this._config.colors?.grid || "#3498db";
		if (Math.abs(d) > 0 || u) {
			let e = s.right, t = a.left;
			c.push({
				id: "grid-home",
				d: `M ${e} ${o.y} L ${t} ${i.y}`,
				power: Math.abs(d),
				color: f,
				reverse: d < 0
			});
		}
		if (this._config.solar_entities && this._config.solar_entities.length > 0) {
			let e = this._config.colors?.solar || "#f1c40f";
			this._config.solar_entities.forEach((n, r) => {
				let o = this.shadowRoot?.querySelector(`#solar-${r}`);
				if (o) {
					let s = this._getCenter(o, t), d = this._getEdges(o, t), f = this._getState(n.entity);
					if (f > 0 || u) {
						let t = Math.abs(s.x - i.x) < 20, o = "";
						t ? o = `M ${s.x} ${d.bottom} L ${i.x} ${a.top}` : (o = `M ${s.x < i.x ? d.right : d.left} ${s.y} L ${i.x} ${s.y} L ${i.x} ${a.top}`, l.push({
							id: `solar-junc-${r}`,
							x: i.x,
							y: s.y,
							color: e
						})), c.push({
							id: `solar-${r}-path`,
							d: o,
							power: f,
							color: n.color || e,
							reverse: !1
						});
					}
				}
			});
		}
		if (this._config.battery_entities && this._config.battery_entities.length > 0) {
			let e = this._config.colors?.battery || "#2ecc71", n = {}, r = [];
			this._config.battery_entities.forEach((e, t) => {
				if (e.group && e.group.trim() !== "") {
					let r = e.group.trim();
					n[r] || (n[r] = []), n[r].push(t);
				} else r.push(t);
			}), Object.keys(n).forEach((r, o) => {
				let s = this.shadowRoot?.querySelector(`#battery-group-${o}`);
				if (!s) return;
				let d = this._getEdges(s, t), f = this._getCenter(s, t), p = d.top + 28, m = f.x < i.x, h = m ? d.right - 16 : d.left + 16, g = !1;
				n[r].forEach((n) => {
					let r = this._config.battery_entities[n], o = this.shadowRoot?.querySelector(`#battery-${n}`);
					if (o) {
						let s = this._getCenter(o, t), d = this._getEdges(o, t), f = this._getState(r.entity_power);
						if (r.invert_power && (f = -f), Math.abs(f) > 0 || u) {
							g = !0;
							let t = m ? d.right : d.left, o = s.y, u = `M ${t} ${o} L ${h} ${o} L ${h} ${p} L ${i.x} ${p} L ${i.x} ${a.bottom}`;
							c.push({
								id: `battery-${n}-path`,
								d: u,
								power: Math.abs(f),
								color: r.color || e,
								reverse: f > 0
							}), l.push({
								id: `battery-group-internal-${n}`,
								x: h,
								y: o,
								color: e
							});
						}
					}
				}), (g || u) && (l.push({
					id: `battery-group-junc-turn-${o}`,
					x: h,
					y: p,
					color: e
				}), l.push({
					id: `battery-group-junc-spine-${o}`,
					x: i.x,
					y: p,
					color: e
				}));
			}), r.forEach((n) => {
				let r = this._config.battery_entities[n], o = this.shadowRoot?.querySelector(`#battery-${n}`);
				if (o) {
					let s = this._getCenter(o, t), d = this._getEdges(o, t), f = this._getState(r.entity_power);
					if (r.invert_power && (f = -f), Math.abs(f) > 0 || u) {
						let t = Math.abs(s.x - i.x) < 20, o = "";
						t ? o = `M ${s.x} ${d.top} L ${i.x} ${a.bottom}` : (o = `M ${s.x < i.x ? d.right : d.left} ${s.y} L ${i.x} ${s.y} L ${i.x} ${a.bottom}`, l.push({
							id: `battery-single-junc-${n}`,
							x: i.x,
							y: s.y,
							color: e
						})), c.push({
							id: `battery-${n}-path`,
							d: o,
							power: Math.abs(f),
							color: r.color || e,
							reverse: f > 0
						});
					}
				}
			});
		}
		this._paths = c, this._junctions = l;
	}
	_getState(e) {
		if (!e || !this.hass || !this.hass.states[e]) return 0;
		let t = parseFloat(this.hass.states[e].state);
		return isNaN(t) ? 0 : t;
	}
	_formatPower(e) {
		return Math.round(e).toString();
	}
	_renderSVG() {
		let e = this._config.always_show_paths !== !1;
		return L`
      <svg class="flow-container">
        ${this._paths.map((t) => {
			let n = t.power > 0, r = n ? Math.max(.4, Math.min(4, 3e3 / Math.max(1, t.power))) : 0, i = n ? 1 : e ? .3 : 0;
			return L`
            <path id="${t.id}" class="flow-path" d="${t.d}" style="opacity: ${i};" />
            ${n ? L`
              <circle class="flow-circle" r="4" style="--dot-color: ${t.color}">
                <animateMotion 
                  dur="${r}s" 
                  repeatCount="indefinite"
                  keyPoints="${t.reverse ? "1;0" : "0;1"}"
                  keyTimes="0;1"
                  calcMode="linear"
                >
                  <mpath href="#${t.id}" />
                </animateMotion>
              </circle>
            ` : ""}
          `;
		})}
        ${this._junctions.map((e) => L`
          <circle cx="${e.x}" cy="${e.y}" r="3" fill="${e.color}" style="opacity: 0.8" />
        `)}
      </svg>
    `;
	}
	render() {
		if (!this._config || !this.hass) return I`<ha-card>Loading...</ha-card>`;
		let e = this._getState(this._config.grid_import_entity), t = e - this._getState(this._config.grid_export_entity), n = 0;
		this._config.solar_entities?.forEach((e) => {
			n += this._getState(e.entity);
		});
		let r = 0;
		this._config.battery_entities?.forEach((e) => {
			let t = this._getState(e.entity_power);
			e.invert_power && (t = -t), r += t;
		});
		let i = 0;
		this._config.home_consumption_entity ? i = this._getState(this._config.home_consumption_entity) : (i = n + t - r, i < 0 && (i = 0));
		let a = 100;
		i > 0 && (a = Math.max(0, (i - e) / i * 100), a > 100 && (a = 100));
		let o = {}, s = [];
		(this._config.battery_entities || []).forEach((e, t) => {
			if (e.group && e.group.trim() !== "") {
				let n = e.group.trim();
				o[n] || (o[n] = []), o[n].push(t);
			} else s.push(t);
		});
		let c = (e, t, n) => {
			let r = this._getState(e.entity_power);
			e.invert_power && (r = -r);
			let i = r > 0, a = r < 0, o = "mdi:battery";
			return i && (o = "mdi:battery-charging"), a && (o = "mdi:battery-minus"), I`
        <div id="battery-${t}" class="node battery ${n ? "ungrouped" : ""}" style="--color-battery: ${e.color || this._config.colors?.battery || "#2ecc71"}">
          <ha-icon class="icon" icon="${o}"></ha-icon>
          <div class="value">
            ${i ? I`<ha-icon icon="mdi:arrow-down" style="width: 14px; height: 14px; color: var(--color-battery)"></ha-icon>` : ""}
            ${a ? I`<ha-icon icon="mdi:arrow-up" style="width: 14px; height: 14px; color: var(--color-solar)"></ha-icon>` : ""}
            ${this._formatPower(Math.abs(r))} W
          </div>
          <div class="soc">${Math.round(this._getState(e.entity_soc))}%</div>
          <div class="name" title="${e.name}">${e.name || "Batterie"}</div>
        </div>
      `;
		};
		return I`
      <ha-card>
        <div class="autarky">Autarkie: ${a.toFixed(0)}%</div>
        <div class="card-content">
          ${this._renderSVG()}
          
          <div class="grid-container">
            <!-- Grid (Left) -->
            <div class="node-section grid-section">
              <div class="node grid" style="--color-grid: ${this._config.colors?.grid || "#3498db"}">
                <ha-icon class="icon" icon="mdi:transmission-tower"></ha-icon>
                <div class="value">${this._formatPower(Math.abs(t))} W</div>
                <div class="name">${this._config.name_grid || "Netz"}</div>
              </div>
            </div>

            <!-- Solar (Top) -->
            <div class="node-section solar-section">
              ${this._config.solar_entities?.map((e, t) => I`
                <div id="solar-${t}" class="node solar" style="--color-solar: ${e.color || this._config.colors?.solar || "#f1c40f"}">
                  <ha-icon class="icon" icon="mdi:solar-panel"></ha-icon>
                  <div class="value">${this._formatPower(this._getState(e.entity))} W</div>
                  <div class="name" title="${e.name}">${e.name || "Solar"}</div>
                </div>
              `)}
            </div>

            <!-- Home (Center) -->
            <div class="node-section home-section">
              <div class="node home" style="--color-home: ${this._config.colors?.home || "#9b59b6"}">
                <ha-icon class="icon" icon="mdi:home"></ha-icon>
                <div class="value">${this._formatPower(Math.abs(i))} W</div>
                <div class="name">${this._config.name_home || "Verbrauch"}</div>
              </div>
            </div>

            <!-- Battery (Bottom) -->
            <div class="node-section battery-section">
              ${Object.keys(o).map((e, t) => I`
                <div class="battery-group" id="battery-group-${t}" style="--color-battery: ${this._config.colors?.battery || "#2ecc71"}">
                  <div class="battery-group-title">${e}</div>
                  <div class="battery-group-content">
                    ${o[e].map((e) => c(this._config.battery_entities[e], e, !1))}
                  </div>
                </div>
              `)}
              
              ${s.map((e) => c(this._config.battery_entities[e], e, !0))}
            </div>
          </div>
        </div>
      </ha-card>
    `;
	}
};
Z([Y({ attribute: !1 })], $.prototype, "hass", void 0), Z([X()], $.prototype, "_config", void 0), Z([we(".node")], $.prototype, "_nodes", void 0), Z([X()], $.prototype, "_paths", void 0), Z([X()], $.prototype, "_junctions", void 0), $ = Z([ye("ember-watt-card")], $), window.customCards = window.customCards || [], window.customCards.push({
	type: "ember-watt-card",
	name: "EmberWATT Card",
	preview: !0,
	description: "Advanced animated power flow card."
});
//#endregion
export { $ as EmberWattCard };
