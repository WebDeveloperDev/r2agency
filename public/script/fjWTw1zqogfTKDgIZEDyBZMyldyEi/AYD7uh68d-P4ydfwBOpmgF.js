(() => {
  document.addEventListener("DOMContentLoaded", () => {
    t();
  });
  const { __: __, _n: _n } = wp.i18n,
    e = {
      /* translators: text read by a screen reader when a warning icon is displayed in front of an error message. */
      warning: __("Warning.", "jetpack-forms"),
      /* translators: error message shown when one or more fields of the form are invalid. */
      invalidForm: __(
        "Please make sure all fields are valid.",
        "jetpack-forms"
      ),
      /* translators: error message shown when a multiple choice field requires at least one option to be selected. */
      checkboxMissingValue: __(
        "Please select at least one option.",
        "jetpack-forms"
      ),
      /* translators: error message shown when a user enters an invalid date */
      invalidDate: __("The date is not valid.", "jetpack-forms"),
      /* translators: text read by a screen reader when a form is being submitted */
      submittingForm: __("Submitting form", "jetpack-forms"),
      /* translators: generic error message */
      genericError: __("Please correct this field", "jetpack-forms"),
      /* translators: message displayed when errors need to be fixed. %d is the number of errors. */
      errorCount: (e) =>
        _n(
          "You need to fix %d error.",
          "You need to fix %d errors.",
          e,
          "jetpack-forms"
        ),
    },
    t = () => {
      document
        .querySelectorAll(
          ".wp-block-jetpack-contact-form-container form.contact-form"
        )
        .forEach(r);
    },
    r = (e) => {
      e.hasAttribute("novalidate") || e.setAttribute("novalidate", !0);
      const t = { hasInsetLabel: m(e) };
      let r = {};
      const o = (i) => {
        i.preventDefault(),
          a(e) ||
            (L(e, r, t),
            n(e)
              ? ((r = {}), e.removeEventListener("submit", o), x(e))
              : (r = j(e, t)));
      };
      e.addEventListener("submit", o);
    },
    n = (e) => {
      let t = e.checkValidity();
      if (!t) return !1;
      const r = f(e);
      for (const e of r) if (s(e) && !d(e)) return !1;
      const n = h(e);
      for (const e of n) if (!u(e)) return !1;
      return t;
    },
    a = (e) => !0 === e.getAttribute("data-submitting"),
    o = (e) =>
      "fieldset" === e.tagName.toLowerCase() &&
      e.classList.contains("grunion-checkbox-multiple-options"),
    i = (e) =>
      "fieldset" === e.tagName.toLowerCase() &&
      e.classList.contains("grunion-radio-options"),
    s = (e) => e.hasAttribute("data-required"),
    c = (e) => {
      return "input" === (t = e).tagName.toLowerCase() &&
        t.classList.contains("jp-contact-form-date") &&
        e.value
        ? u(e)
        : e.validity.valid;
      var t;
    },
    l = (e) => {
      const t = Array.from(e.querySelectorAll('input[type="radio"]'));
      return t.length > 0 && t.every((e) => e.validity.valid);
    },
    d = (e) => {
      if (!s(e)) return !0;
      const t = Array.from(e.querySelectorAll('input[type="checkbox"]'));
      return t.length > 0 && t.some((e) => e.checked);
    },
    u = (t) => {
      const r = t.getAttribute("data-format"),
        n = t.value,
        a = window.jQuery;
      if (n && r && void 0 !== a)
        try {
          a.datepicker.parseDate(r, n);
        } catch (r) {
          return t.setCustomValidity(e.invalidDate), !1;
        }
      return !0;
    },
    m = (e) => {
      const t = e.querySelector(".wp-block-jetpack-contact-form");
      if (!t) return !1;
      const r = t.classList;
      return r.contains("is-style-outlined") || r.contains("is-style-animated");
    },
    p = (e) =>
      e.querySelector('[type="submit"]') ||
      e.querySelector('button:not([type="reset"])'),
    f = (e) =>
      Array.from(e.querySelectorAll(".grunion-checkbox-multiple-options")),
    h = (e) => Array.from(e.querySelectorAll("input.jp-contact-form-date")),
    b = (e) => {
      const t = C(
          ((e) =>
            Array.from(e.elements).filter(
              (e) =>
                !["hidden", "submit"].includes(e.type) &&
                null !== e.offsetParent
            ))(e)
        ),
        r = { simple: t.default, singleChoice: [], multipleChoice: [] },
        n = t.radios.reduce(
          (e, t) => (e.includes(t.name) ? e : [...e, t.name]),
          []
        );
      for (const t of n) {
        const n = e.querySelector(`input[type="radio"][name="${t}"]`);
        if (n) {
          const e = n.closest("fieldset");
          e && r.singleChoice.push(e);
        }
      }
      const a = t.checkboxes.reduce(
        (e, t) => (e.includes(t.name) ? e : [...e, t.name]),
        []
      );
      for (const t of a) {
        const n = e.querySelector(`input[type="checkbox"][name="${t}"]`);
        if (n) {
          const e = n.closest("fieldset");
          e && r.multipleChoice.push(e);
        }
      }
      return r;
    },
    v = (e) => e.querySelector(".contact-form__error"),
    y = (e) => e.querySelectorAll("[aria-invalid]"),
    g = (t) => {
      const r = document.createDocumentFragment();
      return (
        r.appendChild(
          (() => {
            const t = document.createElement("span"),
              r = document.createElement("span"),
              n = document.createElement("i");
            return (
              (r.textContent = e.warning),
              r.classList.add("visually-hidden"),
              n.setAttribute("aria-hidden", !0),
              t.classList.add("contact-form__warning-icon"),
              t.appendChild(r),
              t.appendChild(n),
              t
            );
          })()
        ),
        r.appendChild(
          ((e) => {
            const t = document.createElement("span");
            return (t.textContent = e), t;
          })(t)
        ),
        r
      );
    },
    A = (e) => {
      const t = document.createElement("div");
      return (t.id = e), t.classList.add("contact-form__input-error"), t;
    },
    C = (e) =>
      e.reduce(
        (e, t) => {
          switch (t.type) {
            case "radio":
              e.radios.push(t);
              break;
            case "checkbox":
              t.name.indexOf("[]") === t.name.length - 2
                ? e.checkboxes.push(t)
                : e.default.push(t);
              break;
            default:
              e.default.push(t);
          }
          return e;
        },
        { default: [], radios: [], checkboxes: [] }
      ),
    L = (e, t, r) => {
      k(e, r);
      for (const r in t)
        e.querySelectorAll(`[name="${r}"]`).forEach((e) =>
          e.removeEventListener(t[r][0], t[r][1])
        );
    },
    k = (e, t) => {
      q(e), E(e, t);
    },
    q = (e) => {
      const t = v(e);
      t && t.replaceChildren();
    },
    E = (e, t) => {
      for (const r of y(e)) i(r) || o(r) ? S(r) : w(r, t);
    },
    S = (e) => {
      e.removeAttribute("aria-invalid"), e.removeAttribute("aria-describedby");
      const t = e.querySelector(".contact-form__input-error");
      t && t.replaceChildren();
    },
    w = (e, t) => {
      e.removeAttribute("aria-invalid"), e.removeAttribute("aria-describedby");
      const r = e.closest(
        t.hasInsetLabel
          ? ".contact-form__inset-label-wrap"
          : ".grunion-field-wrap"
      );
      if (!r) return;
      const n = r.querySelector(".contact-form__input-error");
      n && n.replaceChildren();
    },
    x = (e) => {
      _(e), e.setAttribute("data-submitting", !0), e.submit();
    },
    _ = (t) => {
      const r = p(t);
      r &&
        (r.setAttribute("aria-disabled", !0),
        r.appendChild(
          (() => {
            const t = document.createElement("span"),
              r = document.createElement("span"),
              n = document.createElement("span");
            return (
              r.setAttribute("aria-hidden", !0),
              (r.innerHTML =
                '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/><path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"><animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite"/></path></svg>'),
              n.classList.add("visually-hidden"),
              (n.textContent = e.submittingForm),
              t.classList.add("contact-form__spinner"),
              t.appendChild(r),
              t.appendChild(n),
              t
            );
          })()
        ));
    },
    j = (e, t) => (N(e, t), M(e, t)),
    M = (e, t) => {
      let r = {};
      const n = () => T(e);
      for (const c of y(e)) {
        let l;
        (l =
          i(c) &&
          ((a = c),
          Array.from(a.querySelectorAll('input[type="radio"]')).some(
            (e) => e.hasAttribute("required") || e.hasAttribute("aria-required")
          ))
            ? $(c, n, e, t)
            : o(c) && s(c)
            ? D(c, n, e, t)
            : F(c, n, e, t)),
          (r = { ...r, ...l });
      }
      var a;
      return r;
    },
    $ = (e, t, r, n) => {
      const a = {},
        o = () => {
          l(e) ? S(e) : Z(e, r, n), t();
        },
        i = e.querySelectorAll('input[type="radio"]');
      for (const e of i)
        e.addEventListener("blur", o),
          e.addEventListener("change", o),
          (a[e.name] = ["blur", o]),
          (a[e.name] = ["change", o]);
      return a;
    },
    D = (e, t, r, n) => {
      const a = {},
        o = () => {
          d(e) ? S(e) : B(e, r, n), t();
        },
        i = e.querySelectorAll('input[type="checkbox"]');
      for (const e of i)
        e.addEventListener("blur", o),
          e.addEventListener("change", o),
          (a[e.name] = ["blur", o]),
          (a[e.name] = ["change", o]);
      return a;
    },
    F = (e, t, r, n) => {
      const a = e.validity.valueMissing,
        o = {},
        i = () => {
          c(e) ? w(e, n) : I(e, r, n), t();
        },
        s = () => {
          e.validity.valueMissing ? I(e, r, n) : w(e, n), t();
        };
      return (
        e.addEventListener("blur", i),
        (o[e.name] = ["blur", i]),
        a && (e.addEventListener("input", s), (o[e.name] = ["input", s])),
        o
      );
    },
    N = (e, t) => {
      const r = V(e, t);
      P(e, r);
    },
    P = (t, r, n = {}) => {
      let a = v(t);
      if (!a) {
        a = (() => {
          const e = document.createElement("div");
          return e.classList.add("contact-form__error"), e;
        })();
        const e = p(t);
        e ? e.parentNode.insertBefore(a, e) : t.appendChild(a);
      }
      const { disableLiveRegion: s } = n;
      s
        ? (a.removeAttribute("aria-live"), a.removeAttribute("role"))
        : (a.setAttribute("aria-live", "assertive"),
          a.setAttribute("role", "alert"));
      const c = r.length,
        l = [e.invalidForm];
      c > 0 && l.push(e.errorCount(c).replace("%d", c)),
        a.appendChild(g(l.join(" "))),
        c > 0 &&
          a.appendChild(
            ((e, t) => {
              const r = document.createElement("ul");
              for (const n of t) {
                const t = n.id;
                if (!t) continue;
                let a;
                if (
                  ((a =
                    o(n) || i(n)
                      ? n.querySelector("legend")
                      : e.querySelector(`label[for="${t}"]`)),
                  !a)
                )
                  continue;
                const s = document.createElement("li"),
                  c = document.createElement("a");
                (c.textContent = a.innerText),
                  c.setAttribute("href", `#${t}`),
                  s.appendChild(c),
                  r.appendChild(s);
              }
              return r;
            })(t, r)
          );
    },
    T = (e) => {
      q(e), n(e) || P(e, y(e), { disableLiveRegion: !0 });
    },
    V = (e, t) => {
      const r = [],
        { simple: n, singleChoice: a, multipleChoice: o } = b(e);
      for (const a of n) c(a) || (I(a, e, t), r.push(a));
      for (const n of a) l(n) || (Z(n, e, t), r.push(n));
      for (const n of o) d(n) || (B(n, e, t), r.push(n));
      return r;
    },
    I = (e, t, r) => {
      const n = `${e.name}-error`;
      let a = t.querySelector(`#${n}`);
      if (!a) {
        a = A(n);
        const t = e.closest(
          r.hasInsetLabel
            ? ".contact-form__inset-label-wrap"
            : ".grunion-field-wrap"
        );
        t && t.appendChild(a);
      }
      a.replaceChildren(g(e.validationMessage)),
        e.setAttribute("aria-invalid", "true"),
        e.setAttribute("aria-describedby", n);
    },
    Z = (e, t, r) => {
      O(e, t, r);
    },
    B = (t, r, n) => {
      O(t, r, { ...n, message: e.checkboxMissingValue });
    },
    O = (t, r, n) => {
      const a = t.querySelector("input");
      if (!a) return;
      const o = `${a.name.replace("[]", "")}-error`;
      let i = r.querySelector(`#${o}`);
      i || (i = A(o)),
        i.replaceChildren(
          g(a.validationMessage || n.message || e.genericError)
        ),
        t.appendChild(i),
        t.setAttribute("aria-invalid", "true"),
        t.setAttribute("aria-describedby", o);
    };
})();
// listen for rlt authentication events and pass them to children of this document.
(function () {
  var currentToken;
  var parentOrigin;
  var iframeOrigins;
  var initializationListeners = [];
  var hasBeenInitialized = false;
  var RLT_KEY = "jetpack:wpcomRLT";

  // IE11 compat version that doesn't require on `new URL( src )`
  function getOriginFromUrl(url) {
    var parser = document.createElement("a");
    parser.href = url;
    return parser.origin;
  }

  // run on `load` for suitable iframes, this injects the current token if available
  function rltIframeInjector(event) {
    if (!currentToken) {
      return;
    }
    rltInjectToken(
      currentToken,
      event.target.contentWindow,
      getOriginFromUrl(event.target.src)
    );
  }

  // run on DOMContentLoaded or later
  function rltMonitorIframes() {
    // wait until suitable iframes are loaded before trying to inject the RLT
    var iframes = document.querySelectorAll("iframe");
    for (var i = 0; i < iframes.length; i++) {
      var iframe = iframes[i];
      if (rltShouldAuthorizeIframe(iframe)) {
        iframe.addEventListener("load", rltIframeInjector);
      }
    }

    // listen for newly-created iframes, since some are injected dynamically
    var observer = new MutationObserver(function (mutationsList, observer) {
      for (var i = 0; i < mutationsList.length; i++) {
        var mutation = mutationsList[i];
        if (mutation.type === "childList") {
          for (var j = 0; j < mutation.addedNodes.length; j++) {
            var node = mutation.addedNodes[j];
            if (
              node instanceof HTMLElement &&
              node.nodeName === "IFRAME" &&
              rltShouldAuthorizeIframe(node)
            ) {
              node.addEventListener("load", rltIframeInjector);
            }
          }
        }
      }
    });

    observer.observe(document.body, { subtree: true, childList: true });
  }

  // should we inject RLT into this iframe?
  function rltShouldAuthorizeIframe(iframe) {
    if (!Array.isArray(iframeOrigins)) {
      return;
    }
    return iframeOrigins.indexOf(getOriginFromUrl(iframe.src)) >= 0;
  }

  function rltInvalidateWindowToken(token, target, origin) {
    if (target && typeof target.postMessage === "function") {
      try {
        target.postMessage(
          JSON.stringify({
            type: "rltMessage",
            data: {
              event: "invalidate",
              token: token,
              sourceOrigin: window.location.origin,
            },
          }),
          origin
        );
      } catch (err) {
        return;
      }
    }
  }

  /**
   * PUBLIC METHODS
   */
  window.rltInvalidateToken = function (token, sourceOrigin) {
    // invalidate in current context
    if (token === currentToken) {
      currentToken = null;
    }

    // remove from localstorage, but only if in a top level window, not iframe
    try {
      if (window.location === window.parent.location && window.localStorage) {
        if (window.localStorage.getItem(RLT_KEY) === token) {
          window.localStorage.removeItem(RLT_KEY);
        }
      }
    } catch (e) {
      console.info(
        "localstorage access for invalidate denied - probably blocked third-party access",
        window.location.href
      );
    }

    // invalidate in iframes
    var iframes = document.querySelectorAll("iframe");
    for (var i = 0; i < iframes.length; i++) {
      var iframe = iframes[i];
      var iframeOrigin = getOriginFromUrl(iframe.src);
      if (iframeOrigin !== sourceOrigin && rltShouldAuthorizeIframe(iframe)) {
        rltInvalidateWindowToken(token, iframe.contentWindow, iframeOrigin);
      }
    }

    // invalidate in parent
    if (parentOrigin && parentOrigin !== sourceOrigin && window.parent) {
      rltInvalidateWindowToken(token, window.parent, parentOrigin);
    }
  };

  window.rltInjectToken = function (token, target, origin) {
    if (target && typeof target.postMessage === "function") {
      try {
        target.postMessage(
          JSON.stringify({
            type: "loginMessage",
            data: {
              event: "login",
              success: true,
              type: "rlt",
              token: token,
              sourceOrigin: window.location.origin,
            },
          }),
          origin
        );
      } catch (err) {
        return;
      }
    }
  };

  window.rltIsAuthenticated = function () {
    return !!currentToken;
  };

  window.rltGetToken = function () {
    return currentToken;
  };

  window.rltAddInitializationListener = function (listener) {
    // if RLT is already initialized, call the listener immediately
    if (hasBeenInitialized) {
      listener(currentToken);
    } else {
      initializationListeners.push(listener);
    }
  };

  // store the token in localStorage
  window.rltStoreToken = function (token) {
    currentToken = token;
    try {
      if (window.location === window.parent.location && window.localStorage) {
        window.localStorage.setItem(RLT_KEY, token);
      }
    } catch (e) {
      console.info(
        "localstorage access denied - probably blocked third-party access",
        window.location.href
      );
    }
  };

  window.rltInitialize = function (config) {
    if (!config || typeof window.postMessage !== "function") {
      return;
    }

    currentToken = config.token;
    iframeOrigins = config.iframeOrigins;
    parentOrigin = config.parentOrigin; // needed?

    // load token from localStorage if possible, but only in top level window
    try {
      if (
        !currentToken &&
        window.location === window.parent.location &&
        window.localStorage
      ) {
        currentToken = window.localStorage.getItem(RLT_KEY);
      }
    } catch (e) {
      console.info(
        "localstorage access denied - probably blocked third-party access",
        window.location.href
      );
    }

    // listen for RLT events from approved origins
    window.addEventListener("message", function (e) {
      var message = e && e.data;
      if (typeof message === "string") {
        try {
          message = JSON.parse(message);
        } catch (err) {
          return;
        }
      }

      var type = message && message.type;
      var data = message && message.data;

      if (type !== "loginMessage") {
        return;
      }

      if (data && data.type === "rlt" && data.token !== currentToken) {
        // put into localStorage if running in top-level window (not iframe)
        rltStoreToken(data.token);

        // send to allowlisted iframes
        var iframes = document.querySelectorAll("iframe");
        for (var i = 0; i < iframes.length; i++) {
          var iframe = iframes[i];
          if (rltShouldAuthorizeIframe(iframe)) {
            rltInjectToken(
              currentToken,
              iframe.contentWindow,
              getOriginFromUrl(iframe.src)
            );
          }
        }

        // send to the parent, unless the event was sent _by_ the parent
        if (
          parentOrigin &&
          parentOrigin !== data.sourceOrigin &&
          window.parent
        ) {
          rltInjectToken(currentToken, window.parent, parentOrigin);
        }
      }
    });

    // listen for RLT events from approved origins
    window.addEventListener("message", function (e) {
      var message = e && e.data;
      if (typeof message === "string") {
        try {
          message = JSON.parse(message);
        } catch (err) {
          return;
        }
      }

      var type = message && message.type;
      var data = message && message.data;

      if (type !== "rltMessage") {
        return;
      }

      if (data && data.event === "invalidate" && data.token === currentToken) {
        rltInvalidateToken(data.token);
      }
    });

    if (iframeOrigins) {
      if (document.readyState !== "loading") {
        rltMonitorIframes();
      } else {
        window.addEventListener("DOMContentLoaded", rltMonitorIframes);
      }
    }

    initializationListeners.forEach(function (listener) {
      listener(currentToken);
    });

    initializationListeners = [];

    hasBeenInitialized = true;
  };
})();
(() => {
  var e = {
      951: (e, t, n) => {
        (t.formatArgs = function (t) {
          if (
            ((t[0] =
              (this.useColors ? "%c" : "") +
              this.namespace +
              (this.useColors ? " %c" : " ") +
              t[0] +
              (this.useColors ? "%c " : " ") +
              "+" +
              e.exports.humanize(this.diff)),
            !this.useColors)
          )
            return;
          const n = "color: " + this.color;
          t.splice(1, 0, n, "color: inherit");
          let r = 0,
            o = 0;
          t[0].replace(/%[a-zA-Z%]/g, (e) => {
            "%%" !== e && (r++, "%c" === e && (o = r));
          }),
            t.splice(o, 0, n);
        }),
          (t.save = function (e) {
            try {
              e ? t.storage.setItem("debug", e) : t.storage.removeItem("debug");
            } catch (e) {}
          }),
          (t.load = function () {
            let e;
            try {
              e = t.storage.getItem("debug");
            } catch (e) {}
            !e &&
              "undefined" != typeof process &&
              "env" in process &&
              (e = process.env.DEBUG);
            return e;
          }),
          (t.useColors = function () {
            if (
              "undefined" != typeof window &&
              window.process &&
              ("renderer" === window.process.type || window.process.__nwjs)
            )
              return !0;
            if (
              "undefined" != typeof navigator &&
              navigator.userAgent &&
              navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)
            )
              return !1;
            return (
              ("undefined" != typeof document &&
                document.documentElement &&
                document.documentElement.style &&
                document.documentElement.style.WebkitAppearance) ||
              ("undefined" != typeof window &&
                window.console &&
                (window.console.firebug ||
                  (window.console.exception && window.console.table))) ||
              ("undefined" != typeof navigator &&
                navigator.userAgent &&
                navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
                parseInt(RegExp.$1, 10) >= 31) ||
              ("undefined" != typeof navigator &&
                navigator.userAgent &&
                navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
            );
          }),
          (t.storage = (function () {
            try {
              return localStorage;
            } catch (e) {}
          })()),
          (t.destroy = (() => {
            let e = !1;
            return () => {
              e ||
                ((e = !0),
                console.warn(
                  "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
                ));
            };
          })()),
          (t.colors = [
            "#0000CC",
            "#0000FF",
            "#0033CC",
            "#0033FF",
            "#0066CC",
            "#0066FF",
            "#0099CC",
            "#0099FF",
            "#00CC00",
            "#00CC33",
            "#00CC66",
            "#00CC99",
            "#00CCCC",
            "#00CCFF",
            "#3300CC",
            "#3300FF",
            "#3333CC",
            "#3333FF",
            "#3366CC",
            "#3366FF",
            "#3399CC",
            "#3399FF",
            "#33CC00",
            "#33CC33",
            "#33CC66",
            "#33CC99",
            "#33CCCC",
            "#33CCFF",
            "#6600CC",
            "#6600FF",
            "#6633CC",
            "#6633FF",
            "#66CC00",
            "#66CC33",
            "#9900CC",
            "#9900FF",
            "#9933CC",
            "#9933FF",
            "#99CC00",
            "#99CC33",
            "#CC0000",
            "#CC0033",
            "#CC0066",
            "#CC0099",
            "#CC00CC",
            "#CC00FF",
            "#CC3300",
            "#CC3333",
            "#CC3366",
            "#CC3399",
            "#CC33CC",
            "#CC33FF",
            "#CC6600",
            "#CC6633",
            "#CC9900",
            "#CC9933",
            "#CCCC00",
            "#CCCC33",
            "#FF0000",
            "#FF0033",
            "#FF0066",
            "#FF0099",
            "#FF00CC",
            "#FF00FF",
            "#FF3300",
            "#FF3333",
            "#FF3366",
            "#FF3399",
            "#FF33CC",
            "#FF33FF",
            "#FF6600",
            "#FF6633",
            "#FF9900",
            "#FF9933",
            "#FFCC00",
            "#FFCC33",
          ]),
          (t.log = console.debug || console.log || (() => {})),
          (e.exports = n(1741)(t));
        const { formatters: r } = e.exports;
        r.j = function (e) {
          try {
            return JSON.stringify(e);
          } catch (e) {
            return "[UnexpectedJSONParseError]: " + e.message;
          }
        };
      },
      1741: (e, t, n) => {
        e.exports = function (e) {
          function t(e) {
            let n,
              o,
              s,
              a = null;
            function i(...e) {
              if (!i.enabled) return;
              const r = i,
                o = Number(new Date()),
                s = o - (n || o);
              (r.diff = s),
                (r.prev = n),
                (r.curr = o),
                (n = o),
                (e[0] = t.coerce(e[0])),
                "string" != typeof e[0] && e.unshift("%O");
              let a = 0;
              (e[0] = e[0].replace(/%([a-zA-Z%])/g, (n, o) => {
                if ("%%" === n) return "%";
                a++;
                const s = t.formatters[o];
                if ("function" == typeof s) {
                  const t = e[a];
                  (n = s.call(r, t)), e.splice(a, 1), a--;
                }
                return n;
              })),
                t.formatArgs.call(r, e);
              (r.log || t.log).apply(r, e);
            }
            return (
              (i.namespace = e),
              (i.useColors = t.useColors()),
              (i.color = t.selectColor(e)),
              (i.extend = r),
              (i.destroy = t.destroy),
              Object.defineProperty(i, "enabled", {
                enumerable: !0,
                configurable: !1,
                get: () =>
                  null !== a
                    ? a
                    : (o !== t.namespaces &&
                        ((o = t.namespaces), (s = t.enabled(e))),
                      s),
                set: (e) => {
                  a = e;
                },
              }),
              "function" == typeof t.init && t.init(i),
              i
            );
          }
          function r(e, n) {
            const r = t(this.namespace + (void 0 === n ? ":" : n) + e);
            return (r.log = this.log), r;
          }
          function o(e) {
            return e
              .toString()
              .substring(2, e.toString().length - 2)
              .replace(/\.\*\?$/, "*");
          }
          return (
            (t.debug = t),
            (t.default = t),
            (t.coerce = function (e) {
              if (e instanceof Error) return e.stack || e.message;
              return e;
            }),
            (t.disable = function () {
              const e = [
                ...t.names.map(o),
                ...t.skips.map(o).map((e) => "-" + e),
              ].join(",");
              return t.enable(""), e;
            }),
            (t.enable = function (e) {
              let n;
              t.save(e), (t.namespaces = e), (t.names = []), (t.skips = []);
              const r = ("string" == typeof e ? e : "").split(/[\s,]+/),
                o = r.length;
              for (n = 0; n < o; n++)
                r[n] &&
                  ("-" === (e = r[n].replace(/\*/g, ".*?"))[0]
                    ? t.skips.push(new RegExp("^" + e.slice(1) + "$"))
                    : t.names.push(new RegExp("^" + e + "$")));
            }),
            (t.enabled = function (e) {
              if ("*" === e[e.length - 1]) return !0;
              let n, r;
              for (n = 0, r = t.skips.length; n < r; n++)
                if (t.skips[n].test(e)) return !1;
              for (n = 0, r = t.names.length; n < r; n++)
                if (t.names[n].test(e)) return !0;
              return !1;
            }),
            (t.humanize = n(3171)),
            (t.destroy = function () {
              console.warn(
                "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
              );
            }),
            Object.keys(e).forEach((n) => {
              t[n] = e[n];
            }),
            (t.names = []),
            (t.skips = []),
            (t.formatters = {}),
            (t.selectColor = function (e) {
              let n = 0;
              for (let t = 0; t < e.length; t++)
                (n = (n << 5) - n + e.charCodeAt(t)), (n |= 0);
              return t.colors[Math.abs(n) % t.colors.length];
            }),
            t.enable(t.load()),
            t
          );
        };
      },
      3171: (e) => {
        var t = 1e3,
          n = 60 * t,
          r = 60 * n,
          o = 24 * r,
          s = 7 * o,
          a = 365.25 * o;
        function i(e, t, n, r) {
          var o = t >= 1.5 * n;
          return Math.round(e / n) + " " + r + (o ? "s" : "");
        }
        e.exports = function (e, c) {
          c = c || {};
          var d = typeof e;
          if ("string" === d && e.length > 0)
            return (function (e) {
              if ((e = String(e)).length > 100) return;
              var i =
                /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
                  e
                );
              if (!i) return;
              var c = parseFloat(i[1]);
              switch ((i[2] || "ms").toLowerCase()) {
                case "years":
                case "year":
                case "yrs":
                case "yr":
                case "y":
                  return c * a;
                case "weeks":
                case "week":
                case "w":
                  return c * s;
                case "days":
                case "day":
                case "d":
                  return c * o;
                case "hours":
                case "hour":
                case "hrs":
                case "hr":
                case "h":
                  return c * r;
                case "minutes":
                case "minute":
                case "mins":
                case "min":
                case "m":
                  return c * n;
                case "seconds":
                case "second":
                case "secs":
                case "sec":
                case "s":
                  return c * t;
                case "milliseconds":
                case "millisecond":
                case "msecs":
                case "msec":
                case "ms":
                  return c;
                default:
                  return;
              }
            })(e);
          if ("number" === d && isFinite(e))
            return c.long
              ? (function (e) {
                  var s = Math.abs(e);
                  if (s >= o) return i(e, s, o, "day");
                  if (s >= r) return i(e, s, r, "hour");
                  if (s >= n) return i(e, s, n, "minute");
                  if (s >= t) return i(e, s, t, "second");
                  return e + " ms";
                })(e)
              : (function (e) {
                  var s = Math.abs(e);
                  if (s >= o) return Math.round(e / o) + "d";
                  if (s >= r) return Math.round(e / r) + "h";
                  if (s >= n) return Math.round(e / n) + "m";
                  if (s >= t) return Math.round(e / t) + "s";
                  return e + "ms";
                })(e);
          throw new Error(
            "val is not a non-empty string or a valid number. val=" +
              JSON.stringify(e)
          );
        };
      },
      6998: (e, t, n) => {
        "use strict";
        n.d(t, { Z: () => i });
        var r = n(951),
          o = n.n(r),
          s = n(5368);
        const a = o()("videopress:get-media-token");
        const i = async function (e, t = {}) {
          const { id: n = 0, guid: r = 0, flushToken: o } = t,
            i = `vpc-${e}-${n}-${r}`,
            c = window?.videopressAjax?.context || "main";
          let d;
          const u = localStorage.getItem(i);
          if (o) a("(%s) Flushing %o token", c, i), localStorage.removeItem(i);
          else
            try {
              if (u) {
                if (((d = await JSON.parse(u)), d && d.expire > Date.now()))
                  return (
                    a("(%s) Providing %o token from the store", c, i), d.data
                  );
                a("(%s) Token %o expired. Clean.", c, i),
                  localStorage.removeItem(i);
              }
            } catch (e) {
              a("Invalid token in the localStore");
            }
          const l = await (function (e, t = {}) {
            const {
              id: n = 0,
              guid: r,
              subscriptionPlanId: o = 0,
              adminAjaxAPI: a,
              filename: i,
            } = t;
            return new Promise(function (t, c) {
              const d =
                a ||
                window.videopressAjax?.ajaxUrl ||
                window?.ajaxurl ||
                "/wp-admin/admin-ajax.php";
              if (!s.M.includes(e)) return c("Invalid scope");
              const u = { action: "videopress-get-playback-jwt" };
              switch (e) {
                case "upload":
                  (u.action = "videopress-get-upload-token"),
                    i && (u.filename = i);
                  break;
                case "upload-jwt":
                  u.action = "videopress-get-upload-jwt";
                  break;
                case "playback":
                  (u.action = "videopress-get-playback-jwt"),
                    (u.guid = r),
                    (u.post_id = String(n)),
                    (u.subscription_plan_id = o);
              }
              fetch(d, {
                method: "POST",
                credentials: "same-origin",
                body: new URLSearchParams(u),
              })
                .then((e) => {
                  if (!e.ok) throw new Error("Network response was not ok");
                  return e.json();
                })
                .then((n) => {
                  if (!n.success) throw new Error("Token is not achievable");
                  switch (e) {
                    case "upload":
                    case "upload-jwt":
                      t({
                        token: n.data.upload_token,
                        blogId: n.data.upload_blog_id,
                        url: n.data.upload_action_url,
                      });
                      break;
                    case "playback":
                      t({ token: n.data.jwt });
                  }
                })
                .catch(() => {
                  console.warn("Token is not achievable"), t({ token: null });
                });
            });
          })(e, t);
          return (
            "playback" === e &&
              l?.token &&
              (a("(%s) Storing %o token", c, i),
              localStorage.setItem(
                i,
                JSON.stringify({ data: l, expire: Date.now() + 864e5 })
              )),
            a("(%s) Providing %o token from request/response", c, i),
            l
          );
        };
      },
      5368: (e, t, n) => {
        "use strict";
        n.d(t, { M: () => r });
        const r = ["upload", "playback", "upload-jwt"];
      },
    },
    t = {};
  function n(r) {
    var o = t[r];
    if (void 0 !== o) return o.exports;
    var s = (t[r] = { exports: {} });
    return e[r](s, s.exports, n), s.exports;
  }
  (n.n = (e) => {
    var t = e && e.__esModule ? () => e.default : () => e;
    return n.d(t, { a: t }), t;
  }),
    (n.d = (e, t) => {
      for (var r in t)
        n.o(t, r) &&
          !n.o(e, r) &&
          Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
    }),
    (n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (() => {
      "use strict";
      var e = n(951),
        t = n.n(e),
        r = n(6998);
      const o = t()("videopress:token-bridge"),
        { videopressAjax: s } = window;
      async function a(e) {
        if (
          (await new Promise(function (e) {
            if ("loading" !== document.readyState) return e();
            document.addEventListener("DOMContentLoaded", function () {
              e();
            });
          }),
          !window.__guidsToPlanIds)
        )
          return 0;
        return window.__guidsToPlanIds[e] || 0;
      }
      async function i(e) {
        if ("videopress_token_request" !== e.data?.event) return;
        if (!s) return void o("(%s) videopressAjax is not accesible");
        const { context: t = "main" } = s,
          { guid: n, requestId: i, isRetry: c } = e.data;
        if (!n || !i) return void o("(%s) Invalid request", t);
        const d = window?.videopressAjax.post_id || 0,
          u = await a(n);
        if (
          -1 ===
          ["https://videopress.com", "https://video.wordpress.com"].indexOf(
            e.origin
          )
        )
          return void o("(%s) Invalid origin", t);
        const { source: l } = e;
        if (
          l instanceof MessagePort ||
          ("undefined" != typeof ServiceWorker && l instanceof ServiceWorker)
        )
          return void o("(%s) Invalid source", t);
        o("(%s) Token request accepted: %o | %o | %o", t, n, d, i),
          o("(%s) Send acknowledge receipt requested", t),
          l.postMessage(
            { event: "videopress_token_request_ack", guid: n, requestId: i },
            { targetOrigin: "*" }
          ),
          c && o("(%s) client retrying request. Flush the token.", t);
        const p = await (0, r.Z)("playback", {
          id: Number(d),
          guid: n,
          subscriptionPlanId: u,
          adminAjaxAPI: s.ajaxUrl,
          flushToken: c,
        });
        if (!p?.token)
          return (
            o("(%s) Error getting token", t),
            void l.postMessage(
              {
                event: "videopress_token_error",
                guid: e.data.guid,
                requestId: i,
              },
              { targetOrigin: "*" }
            )
          );
        o("(%s) sending token", t),
          l.postMessage(
            {
              event: "videopress_token_received",
              guid: n,
              jwt: p.token,
              requestId: i,
            },
            { targetOrigin: "*" }
          );
      }
      s
        ? (o("(%s) 👂 Listen token requester", s?.context || "main"),
          window.addEventListener("message", i))
        : o("(%s) videopressAjax is not accesible");
    })();
})();
