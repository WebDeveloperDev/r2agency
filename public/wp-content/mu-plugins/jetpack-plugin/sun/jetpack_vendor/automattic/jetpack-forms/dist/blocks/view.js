(() => {
  var o = {
      7940: () => {
        (window.jetpackForms = window.jetpackForms || {}),
          (window.jetpackForms.getBackgroundColor = function (o) {
            let t = window.getComputedStyle(o).backgroundColor;
            for (
              ;
              "rgba(0, 0, 0, 0)" === t &&
              o.parentNode &&
              o.parentNode.nodeType === window.Node.ELEMENT_NODE;

            )
              if ("wp-block-cover" !== (o = o.parentNode).className)
                t = window.getComputedStyle(o).backgroundColor;
              else {
                const e = o.querySelector(".wp-block-cover__background");
                t = window.getComputedStyle(e).backgroundColor;
              }
            return t;
          }),
          (window.jetpackForms.generateStyleVariables = function (o) {
            const t = window["editor-canvas"]
                ? window["editor-canvas"].document
                : document,
              e = t.querySelector("body");
            if (!o) return;
            const r = t.createElement("div");
            (r.className = "contact-form__style-probe"),
              (r.style =
                "position: absolute; z-index: -1; width: 1px; height: 1px; visibility: hidden"),
              (r.innerHTML =
                '\n			<div class="contact-form">\n				<div class="wp-block-button">\n					<div class="wp-block-button__link btn-primary">Test</div>\n				</div>\n				<div class="wp-block-button is-style-outline">\n					<div class="wp-block-button__link btn-outline">Test</div>\n				</div>\n				<div class="jetpack-field">\n					<input class="jetpack-field__input" type="text">\n				</div>\n			</div>\n		'),
              o.parentNode.appendChild(r);
            const n = r.querySelector(".btn-primary"),
              c = r.querySelector(".btn-outline"),
              a = r.querySelector('input[type="text"]'),
              d = window.jetpackForms.getBackgroundColor(e),
              i = window.jetpackForms.getBackgroundColor(a),
              l = window.getComputedStyle(a).backgroundColor,
              {
                border: p,
                borderColor: u,
                backgroundColor: b,
                color: s,
              } = window.getComputedStyle(n),
              {
                backgroundColor: k,
                border: m,
                borderWidth: f,
                borderRadius: w,
                color: g,
                padding: j,
                lineHeight: y,
              } = window.getComputedStyle(c),
              v = window.jetpackForms.getBackgroundColor(c),
              {
                color: C,
                padding: S,
                paddingTop: h,
                paddingLeft: _,
                border: x,
                borderColor: F,
                borderWidth: N,
                borderStyle: T,
                borderRadius: q,
                fontSize: E,
                fontFamily: z,
                lineHeight: B,
              } = window.getComputedStyle(a);
            return (
              r.remove(),
              {
                "--jetpack--contact-form--primary-color": b,
                "--jetpack--contact-form--background-color": d,
                "--jetpack--contact-form--text-color": C,
                "--jetpack--contact-form--border": x,
                "--jetpack--contact-form--border-color": F,
                "--jetpack--contact-form--border-size": N,
                "--jetpack--contact-form--border-style": T,
                "--jetpack--contact-form--border-radius": q,
                "--jetpack--contact-form--input-background": l,
                "--jetpack--contact-form--input-background-fallback": i,
                "--jetpack--contact-form--input-padding": S,
                "--jetpack--contact-form--input-padding-top": h,
                "--jetpack--contact-form--input-padding-left": _,
                "--jetpack--contact-form--font-size": E,
                "--jetpack--contact-form--font-family": z,
                "--jetpack--contact-form--line-height": B,
                "--jetpack--contact-form--button-primary--color": s,
                "--jetpack--contact-form--button-primary--background-color": b,
                "--jetpack--contact-form--button-primary--border": p,
                "--jetpack--contact-form--button-primary--border-color": u,
                "--jetpack--contact-form--button-outline--padding": j,
                "--jetpack--contact-form--button-outline--border": m,
                "--jetpack--contact-form--button-outline--background-color": k,
                "--jetpack--contact-form--button-outline--background-color-fallback":
                  v,
                "--jetpack--contact-form--button-outline--border-size": f,
                "--jetpack--contact-form--button-outline--border-radius": w,
                "--jetpack--contact-form--button-outline--text-color": g,
                "--jetpack--contact-form--button-outline--line-height": y,
              }
            );
          });
      },
    },
    t = {};
  function e(r) {
    var n = t[r];
    if (void 0 !== n) return n.exports;
    var c = (t[r] = { exports: {} });
    return o[r](c, c.exports, e), c.exports;
  }
  (e.n = (o) => {
    var t = o && o.__esModule ? () => o.default : () => o;
    return e.d(t, { a: t }), t;
  }),
    (e.d = (o, t) => {
      for (var r in t)
        e.o(t, r) &&
          !e.o(o, r) &&
          Object.defineProperty(o, r, { enumerable: !0, get: t[r] });
    }),
    (e.o = (o, t) => Object.prototype.hasOwnProperty.call(o, t)),
    (() => {
      "use strict";
      e(7940);
      const { generateStyleVariables: o } = window.jetpackForms,
        t = setTimeout(() => {
          r();
        }, 3e3);
      function r() {
        const t = document.querySelectorAll(
          ".wp-block-jetpack-contact-form-container"
        );
        for (const e of t) {
          const t = o(e);
          if (!t) return;
          for (const o in t) e.style.setProperty(o, t[o]);
        }
      }
      window.addEventListener("load", () => {
        clearTimeout(t), r();
      });
    })();
})();
