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
