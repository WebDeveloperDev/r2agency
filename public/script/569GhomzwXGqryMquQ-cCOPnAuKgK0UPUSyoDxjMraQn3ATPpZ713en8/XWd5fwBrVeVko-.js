(() => {
  var e = {
      63166: (e, t, r) => {
        "use strict";
        r.d(t, { K4: () => n });
        let o = "";
        function s(e) {
          if ("https://subscribe.wordpress.com" === e.origin && e.data) {
            const t = JSON.parse(e.data);
            if (
              (t &&
                t.result &&
                t.result.jwt_token &&
                ((o = t.result.jwt_token), a(o)),
              t && "close" === t.action && o)
            )
              window.location.reload(!0);
            else if (t && "close" === t.action) {
              window.removeEventListener("message", s);
              document.getElementById("memberships-modal-window").close(),
                document.body.classList.remove("modal-open");
            }
          }
        }
        function n(e) {
          document.body.classList.add("modal-open");
          const t = document.getElementById("memberships-modal-window");
          t && document.body.removeChild(t);
          const r = document.createElement("dialog");
          r.setAttribute("id", "memberships-modal-window");
          const o = document.createElement("iframe"),
            n = document.querySelector('input[name="lang"]');
          let a = null;
          n && (a = n.value),
            o.setAttribute("id", "memberships-modal-iframe"),
            (o.innerText =
              "This feature requires inline frames. You have iframes disabled or your browser does not support them."),
            (o.src = e + "&display=alternate&jwt_token=" + i()),
            a && (o.src = o.src + "&lang=" + a),
            o.setAttribute("frameborder", "0"),
            o.setAttribute("allowtransparency", "true"),
            o.setAttribute("allowfullscreen", "true"),
            r.classList.add("jetpack-memberships-modal"),
            document.body.appendChild(r),
            r.appendChild(o),
            window.addEventListener("message", s, !1),
            r.showModal();
        }
        const i = function () {
            const e = `; ${document.cookie}`.split(
              "; wp-jp-premium-content-session="
            );
            if (2 === e.length) return e.pop().split(";").shift();
          },
          a = function (e) {
            const t = new Date(),
              r = new Date(t.setMonth(t.getMonth() + 1));
            document.cookie = `wp-jp-premium-content-session=${e}; expires=${r.toGMTString()}; path=/`;
          };
      },
      80425: (e, t, r) => {
        "object" == typeof window &&
          window.Jetpack_Block_Assets_Base_Url &&
          (r.p = window.Jetpack_Block_Assets_Base_Url);
      },
      47701: (e) => {
        "use strict";
        e.exports = window.wp.domReady;
      },
    },
    t = {};
  function r(o) {
    var s = t[o];
    if (void 0 !== s) return s.exports;
    var n = (t[o] = { exports: {} });
    return e[o](n, n.exports, r), n.exports;
  }
  (r.n = (e) => {
    var t = e && e.__esModule ? () => e.default : () => e;
    return r.d(t, { a: t }), t;
  }),
    (r.d = (e, t) => {
      for (var o in t)
        r.o(t, o) &&
          !r.o(e, o) &&
          Object.defineProperty(e, o, { enumerable: !0, get: t[o] });
    }),
    (r.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if ("object" == typeof window) return window;
      }
    })()),
    (r.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (() => {
      var e;
      r.g.importScripts && (e = r.g.location + "");
      var t = r.g.document;
      if (!e && t && (t.currentScript && (e = t.currentScript.src), !e)) {
        var o = t.getElementsByTagName("script");
        o.length && (e = o[o.length - 1].src);
      }
      if (!e)
        throw new Error(
          "Automatic publicPath is not supported in this browser"
        );
      (e = e
        .replace(/#.*$/, "")
        .replace(/\?.*$/, "")
        .replace(/\/[^\/]+$/, "/")),
        (r.p = e + "../");
    })(),
    (() => {
      "use strict";
      r(80425);
    })(),
    (() => {
      "use strict";
      var e = r(47701),
        t = r.n(e),
        o = r(63166);
      function s(e) {
        const t =
          "https://subscribe.wordpress.com/memberships/?" +
          new URLSearchParams(e).toString();
        (0, o.K4)(t);
      }
      t()(function () {
        const e = document.querySelector("#jp_retrieve_subscriptions_link");
        e &&
          e.addEventListener("click", function (e) {
            e.preventDefault(),
              (function () {
                const e = document.querySelector(
                  ".wp-block-jetpack-subscriptions__container form"
                );
                if (!e) return;
                if (!e.checkValidity()) return void e.reportValidity();
                s({
                  email: e.querySelector("input[type=email]").value,
                  blog: e.dataset.blog,
                  plan: "newsletter",
                  source: "jetpack_retrieve_subscriptions",
                  post_access_level: e.dataset.post_access_level,
                  display: "alternate",
                });
              })();
          });
        document
          .querySelectorAll(".wp-block-jetpack-subscriptions__container form")
          .forEach((e) => {
            e.payments_attached ||
              ((e.payments_attached = !0),
              e.addEventListener("submit", function (t) {
                if (e.resubmitted) return;
                const r = e.querySelector("input[type=email]"),
                  o = r ? r.value : e.dataset.subscriber_email;
                if (!o) return;
                if (
                  "subscribe" === e.querySelector("input[name=action]").value
                ) {
                  t.preventDefault();
                  const r = e.querySelector("input[name=post_id]")?.value ?? "",
                    n = e.querySelector("input[name=tier_id]")?.value ?? "",
                    i = e.querySelector("input[name=app_source]")?.value ?? "";
                  s({
                    email: o,
                    post_id: r,
                    tier_id: n,
                    blog: e.dataset.blog,
                    plan: "newsletter",
                    source: "jetpack_subscribe",
                    app_source: i,
                    post_access_level: e.dataset.post_access_level,
                    display: "alternate",
                  });
                }
              }));
          });
      });
    })();
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
