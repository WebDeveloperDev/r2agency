!(function (t) {
  var e = {};
  function n(o) {
    if (e[o]) return e[o].exports;
    var r = (e[o] = { i: o, l: !1, exports: {} });
    return t[o].call(r.exports, r, r.exports, n), (r.l = !0), r.exports;
  }
  (n.m = t),
    (n.c = e),
    (n.d = function (t, e, o) {
      n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: o });
    }),
    (n.r = function (t) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (n.t = function (t, e) {
      if ((1 & e && (t = n(t)), 8 & e)) return t;
      if (4 & e && "object" == typeof t && t && t.__esModule) return t;
      var o = Object.create(null);
      if (
        (n.r(o),
        Object.defineProperty(o, "default", { enumerable: !0, value: t }),
        2 & e && "string" != typeof t)
      )
        for (var r in t)
          n.d(
            o,
            r,
            function (e) {
              return t[e];
            }.bind(null, r)
          );
      return o;
    }),
    (n.n = function (t) {
      var e =
        t && t.__esModule
          ? function () {
              return t.default;
            }
          : function () {
              return t;
            };
      return n.d(e, "a", e), e;
    }),
    (n.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (n.p = ""),
    n((n.s = 9));
})([
  function (t, e) {
    function n(e) {
      return (
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? (t.exports = n =
              function (t) {
                return typeof t;
              })
          : (t.exports = n =
              function (t) {
                return t &&
                  "function" == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              }),
        n(e)
      );
    }
    t.exports = n;
  },
  function (t, e, n) {
    "use strict";
    n.d(e, "b", function () {
      return i;
    }),
      n.d(e, "a", function () {
        return a;
      });
    var o = null,
      r = function () {
        if (null == o) {
          o = "";
          var t,
            e = document.location.hostname.split(".");
          if ("undefined" != typeof TRACKS_COOKIE_DOMAIN)
            o = TRACKS_COOKIE_DOMAIN;
          else
            for (var n = 1; n <= e.length; ++n)
              if (
                ((t = "." + e.slice(-n).join(".")),
                (r = t),
                (i = void 0),
                (i = new Date().getTime()),
                (document.cookie =
                  encodeURIComponent("tk_tc") +
                  "=" +
                  i +
                  "; domain=" +
                  r +
                  "; path=/;"),
                a("tc") == i)
              ) {
                o = t;
                break;
              }
          "" != o &&
            (!(function (t) {
              var e = new Date();
              e.setTime(e.getTime() - 1e3),
                (document.cookie =
                  encodeURIComponent("tk_tc") +
                  "= ; domain=" +
                  t +
                  "; path=/; expires=" +
                  e.toUTCString());
            })(o),
            (o = "; domain=" + o));
        }
        var r, i;
        return o;
      },
      i = function (t, e, n) {
        var o = encodeURIComponent("tk_" + t),
          i = new Date();
        void 0 === n && (n = 15768e4),
          document.location.hostname.match(/((^|\.)wp\.com$|^.?w\.org$)/) ||
            (i.setTime(i.getTime() + 1e3 * n),
            (document.cookie =
              o +
              "=" +
              encodeURIComponent(e) +
              r() +
              "; path=/; expires=" +
              i.toUTCString()));
      },
      a = function (t) {
        var e = encodeURIComponent("tk_" + t) + "=",
          n = e.length,
          o = document.cookie.split("; "),
          r = o.length;
        for (
          1 === r && (r = (o = document.cookie.split(";")).length), r--;
          r >= 0;
          r--
        )
          if (o[r].substring(0, n) === e)
            return decodeURIComponent(o[r].substring(n));
        return null;
      };
  },
  function (t, e, n) {
    "use strict";
    n.d(e, "a", function () {
      return T;
    });
    var o = n(0),
      r = n.n(o),
      i = n(1);
    function a(t) {
      var e = [];
      if (window.crypto && window.crypto.getRandomValues)
        (e = new Uint8Array(t)), window.crypto.getRandomValues(e);
      else for (var n = 0; n < t; ++n) e[n] = Math.floor(256 * Math.random());
      return btoa(String.fromCharCode.apply(String, e));
    }
    var c, u, d, s, f, l, p, m;
    function v() {
      (c = void 0),
        (u = null),
        (d = null),
        [],
        (s = null),
        (f = {}),
        (l = {}),
        (p = {}),
        (m = {});
    }
    v();
    var w = function (t) {
      if (((this.a = 1), t && t.length))
        for (var e = 0; e < t.length; e++) this.push(t[e]);
    };
    w.prototype.push = function (t) {
      if (t)
        if ("object" == r()(t) && t.length) {
          var e = t.splice(0, 1);
          E[e] && E[e].apply(null, t);
        } else "function" == typeof t && t();
    };
    var h = function (t) {
        t._ui || t._ut || C(),
          j(),
          (t._ui = t._ui || c),
          (t._ut = t._ut || u),
          d && (t._ul = d);
        var e = new Date();
        (t._ts = e.getTime()), (t._tz = e.getTimezoneOffset() / 60);
        var n = window.navigator,
          o = window.screen;
        (t._lg = n.language),
          (t._pf = n.platform),
          (t._ht = o.height),
          (t._wd = o.width);
        var i =
            void 0 !== window.pageXOffset
              ? window.pageXOffset
              : (
                  document.documentElement ||
                  document.body.parentNode ||
                  document.body
                ).scrollLeft,
          a =
            void 0 !== window.pageYOffset
              ? window.pageYOffset
              : (
                  document.documentElement ||
                  document.body.parentNode ||
                  document.body
                ).scrollTop;
        (t._sx = void 0 !== i ? i : 0),
          (t._sy = void 0 !== a ? a : 0),
          void 0 !== document.location &&
            (t._dl = document.location.toString()),
          void 0 !== document.referrer && (t._dr = document.referrer),
          (function t(e, n) {
            if (null == e || "object" !== r()(e)) return e;
            for (var o in ((null != n && "object" === r()(n)) ||
              (n = e.constructor()),
            e))
              e.hasOwnProperty(o) && (n[o] = t(e[o]));
            return n;
          })(l, t),
          y(
            (function (t) {
              var e = [];
              for (var n in t)
                t.hasOwnProperty(n) &&
                  e.push(
                    encodeURIComponent(n) + "=" + encodeURIComponent(t[n])
                  );
              return e.join("&");
            })(t),
            t.use_beacon || !1
          );
      },
      y = function (t, e) {
        if (
          ((window._tkAllowE2ETests &&
            navigator.userAgent.includes("wp-e2e-tests")) ||
            !navigator.userAgent.match(
              /wp-e2e-tests|bingbot|bot|borg|google(^tv)|yahoo|slurp|msnbot|msrbot|openbot|archiver|netresearch|lycos|scooter|altavista|teoma|gigabot|baiduspider|blitzbot|oegp|charlotte|furlbot|http%20client|polybot|htdig|ichiro|mogimogi|larbin|pompos|scrubby|searchsight|seekbot|semanticdiscovery|silk|snappy|speedy|spider|voila|vortex|voyager|zao|zeal|fast\-webcrawler|converacrawler|dataparksearch|findlinks|crawler|Netvibes|Sogou Pic Spider|ICC\-Crawler|Innovazion Crawler|Daumoa|EtaoSpider|A6\-Indexer|YisouSpider|Riddler|DBot|wsr\-agent|Xenu|SeznamBot|PaperLiBot|SputnikBot|CCBot|ProoXiBot|Scrapy|Genieo|Screaming Frog|YahooCacheSystem|CiBra|Nutch/
            )) &&
          !(t in p)
        )
          if (((p[t] = !0), window.fetch && e))
            g(t),
              fetch(
                "//pixel.wp.com/t.gif?" +
                  t +
                  "&_rt=" +
                  new Date().getTime() +
                  "&_=_",
                { mode: "no-cors", keepalive: !0 }
              ).then(function () {
                _(t);
              });
          else {
            var n = new Image();
            g(t),
              (n.query = t),
              (n.onload = function () {
                delete p[t], n && _(n.query);
              }),
              (n.src =
                "//pixel.wp.com/t.gif?" +
                t +
                "&_rt=" +
                new Date().getTime() +
                "&_=_"),
              (n.alt = "");
          }
      },
      g = function (t) {
        var e,
          n = S();
        for (e = 0; e < n.length; ++e) if (t == n[e]) return;
        n.push(t), b(n);
      },
      b = function (t) {
        for (; t.join(" ").length > 2048; ) t = t.slice(1);
        k("qs", t.join(" "), 1800);
      },
      _ = function (t) {
        var e,
          n = [],
          o = S();
        for (e = 0; e < o.length; ++e) t != o[e] && n.push(o[e]);
        n.length !== o.length && b(n);
      },
      S = function () {
        var t = O("qs");
        return t ? t.split(" ") : [];
      },
      j = function () {
        null === s &&
          (s = window.setTimeout(function () {
            S().forEach(function (t) {
              y(t, !1);
            }),
              (s = null);
          }, 100));
      },
      x = function () {
        return a(18);
      },
      O = function (t) {
        return Object(i.a)(t) || f[t];
      },
      k = function (t, e, n) {
        (f[t] = n <= -1 ? null : e), Object(i.b)(t, e, n);
      },
      I = function () {
        var t = [],
          e = O("ai"),
          n = O("aip");
        return n && (t = n.split(",")), e && t.push(e), t;
      },
      C = function () {
        var t =
          !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
        if (!c) {
          var e = O("ai");
          e
            ? ((c = e), (u = "anon"))
            : t && ((c = x()), (u = "anon"), k("ai", c));
        }
      },
      E = {
        storeContext: function (t) {
          "object" === r()(t) && (l = t);
        },
        identifyUser: function (t, e) {
          if ((e && (d = e), "0" != t && "" != t && null != t && c != t)) {
            (c = t), (u = "wpcom:user_id");
            for (var n = I(), o = 0; o < n.length; o++)
              h({ _en: "_aliasUser", anonId: n[o] });
            var r = O("ai");
            r &&
              h({
                _en: "_aliasUserGeneral",
                nextuserid: c,
                nextuseridtype: u,
                prevuserid: r,
                prevuseridtype: "anon",
              }),
              k("ai", "", -1),
              k("aip", "", -1);
          }
        },
        identifyAnonUser: function (t) {
          if ((C(!1), c != t))
            if ("anon" === u || null === u) {
              if ("anon" == u && c) {
                var e = O("aip");
                e = e ? e.split(",") : [];
                for (var n = !1, o = 0; o < e.length; o++)
                  c == e[o] && (n = !0);
                n ||
                  (e.push(c),
                  k("aip", e.join(",")),
                  h({
                    _en: "_aliasUserGeneral",
                    nextuserid: t,
                    nextuseridtype: "anon",
                    prevuserid: c,
                    prevuseridtype: "anon",
                  }));
              }
              k("ai", t), (c = t), (u = "anon");
            } else h({ _en: "_aliasUser", anonId: t });
        },
        recordEvent: function (t, e, n) {
          "_setProperties" !== t &&
            (((e = e || {})._en = t),
            "string" == typeof n &&
              n.length > 0 &&
              (m[n] || (m[n] = a(18)),
              (e._ui = e._ui || m[n]),
              (e._ut = e._ut || "anon")),
            h(e));
        },
        setProperties: function (t) {
          (t._en = "_setProperties"), h(t);
        },
        clearIdentity: function () {
          (c = null), (d = null), k("ai", "", -1), k("aip", "", -1), C();
        },
        signalAliasUserGeneral: function (t, e) {
          C(),
            h({
              _en: "_aliasUserGeneral",
              nextuserid: c,
              nextuseridtype: u,
              prevuserid: t,
              prevuseridtype: e,
            });
        },
      };
    function T() {
      return (
        v(),
        (window._tkq = window._tkq || []),
        window._tkq.a || (j(), (window._tkq = new w(window._tkq))),
        E
      );
    }
  },
  function (t, e, n) {
    var o = n(10),
      r = n(11),
      i = n(12),
      a = n(14);
    t.exports = function (t, e) {
      return o(t) || r(t, e) || i(t, e) || a();
    };
  },
  ,
  ,
  ,
  ,
  ,
  function (t, e, n) {
    t.exports = n(16);
  },
  function (t, e) {
    t.exports = function (t) {
      if (Array.isArray(t)) return t;
    };
  },
  function (t, e) {
    t.exports = function (t, e) {
      if ("undefined" != typeof Symbol && Symbol.iterator in Object(t)) {
        var n = [],
          o = !0,
          r = !1,
          i = void 0;
        try {
          for (
            var a, c = t[Symbol.iterator]();
            !(o = (a = c.next()).done) &&
            (n.push(a.value), !e || n.length !== e);
            o = !0
          );
        } catch (t) {
          (r = !0), (i = t);
        } finally {
          try {
            o || null == c.return || c.return();
          } finally {
            if (r) throw i;
          }
        }
        return n;
      }
    };
  },
  function (t, e, n) {
    var o = n(13);
    t.exports = function (t, e) {
      if (t) {
        if ("string" == typeof t) return o(t, e);
        var n = Object.prototype.toString.call(t).slice(8, -1);
        return (
          "Object" === n && t.constructor && (n = t.constructor.name),
          "Map" === n || "Set" === n
            ? Array.from(n)
            : "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            ? o(t, e)
            : void 0
        );
      }
    };
  },
  function (t, e) {
    t.exports = function (t, e) {
      (null == e || e > t.length) && (e = t.length);
      for (var n = 0, o = new Array(e); n < e; n++) o[n] = t[n];
      return o;
    };
  },
  function (t, e) {
    t.exports = function () {
      throw new TypeError(
        "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
      );
    };
  },
  ,
  function (t, e, n) {
    "use strict";
    n.r(e);
    var o = n(3),
      r = n.n(o),
      i = n(0),
      a = n.n(i);
    var c = n(2);
    (window.wpcom = window.wpcom || {}),
      (window._tkq = window._tkq || []),
      (window._stq = window._stq || []),
      Array.prototype.forEach ||
        (Array.prototype.forEach = function (t, e) {
          for (var n = 0, o = this.length; n < o; n++)
            t.call(e || this, this[n], n, this);
        }),
      (window.wpcom.stats = (function () {
        var t,
          e,
          n,
          o,
          i,
          c,
          u,
          d =
            ((n = function (t, e, n) {
              "function" == typeof t.addEventListener
                ? t.addEventListener(e, n)
                : "object" === a()(t.attachEvent) && t.attachEvent("on" + e, n);
            }),
            (o = function (t) {
              return "object" === a()(t) && t.target
                ? t.target
                : window.event.srcElement;
            }),
            (i = function (t) {
              var e = 0;
              "object" ===
                ("undefined" == typeof InstallTrigger
                  ? "undefined"
                  : a()(InstallTrigger)) && (e = 100),
                7 === s() && (e = 100),
                u(o(t), e);
            }),
            (c = function (t) {
              u(o(t), 0);
            }),
            (u = function (n, o) {
              try {
                if ("object" !== a()(n)) return;
                for (; "A" !== n.nodeName; ) {
                  if (void 0 === n.nodeName) return;
                  if ("object" !== a()(n.parentNode)) return;
                  n = n.parentNode;
                }
                if (
                  (function (t) {
                    var e = document.location;
                    if (e.host === t.host) return !0;
                    if ("" === t.host) return !0;
                    if (e.protocol === t.protocol && e.host === t.hostname) {
                      if ("http:" === e.protocol && e.host + ":80" === t.host)
                        return !0;
                      if ("https:" === e.protocol && e.host + ":443" === t.host)
                        return !0;
                    }
                    return !1;
                  })(n)
                )
                  return;
                if ("javascript:" === n.protocol) return;
                if (
                  (function (t) {
                    for (var e = t; "BODY" !== e.nodeName; ) {
                      if ("wpcombar" === e.id) return !0;
                      if ("wpadminbar" === e.id) return !0;
                      if ("wpadvert" === e.className) return !0;
                      if (e.className.indexOf("wpcom-masterbar") > -1)
                        return !0;
                      if (void 0 === e.nodeName) return !0;
                      if ("object" !== a()(e.parentNode)) return !0;
                      e = e.parentNode;
                    }
                    return !1;
                  })(n)
                )
                  return;
                if (
                  (window._stq.push([
                    "click",
                    {
                      u: n.href,
                      r: void 0 !== n.rel ? n.rel : "0",
                      b: void 0 !== t ? t : "0",
                      p: void 0 !== e ? e : "0",
                    },
                  ]),
                  o)
                )
                  for (
                    var r = new Date(), i = r.getTime() + o;
                    !((r = new Date()).getTime() > i);

                  );
              } catch (t) {}
            }),
            {
              init: function (o, r) {
                (t = o),
                  (e = r),
                  document.body
                    ? (n(document.body, "click", i),
                      n(document.body, "contextmenu", c))
                    : document &&
                      (n(document, "click", i), n(document, "contextmenu", c));
              },
            }),
          s = function () {
            var t = 0;
            if (
              "object" ===
                ("undefined" == typeof navigator
                  ? "undefined"
                  : a()(navigator)) &&
              "Microsoft Internet Explorer" == navigator.appName
            ) {
              var e = navigator.userAgent.match(/MSIE ([0-9]{1,})[\.0-9]{0,}/);
              null !== e && (t = parseInt(e[1]));
            }
            return t;
          },
          f = function (t) {
            var e,
              n = [];
            for (e in t)
              t.hasOwnProperty(e) &&
                n.push(encodeURIComponent(e) + "=" + encodeURIComponent(t[e]));
            return n.join("&");
          },
          l = function (t, e, n) {
            var o = new Image();
            (o.src =
              document.location.protocol +
              "//pixel.wp.com/" +
              t +
              "?" +
              e +
              "&rand=" +
              Math.random()),
              (o.alt = ""),
              "string" == typeof n &&
                document.body &&
                ((o.id = n), p(n), document.body.appendChild(o));
          },
          p = function (t) {
            var e = document.createElement("style");
            (e.innerHTML = "img#".concat(
              t,
              " {\n			position: absolute !important;\n			clip: rect(0, 0, 0, 0);\n			padding: 0 !important;\n			border: 0 !important;\n			height: 0 !important;\n			width: 0 !important;\n			overflow: hidden;\n		}"
            )),
              document.body && document.body.appendChild(e);
          },
          m = function (t) {
            if (((this.a = 1), t && t.length))
              for (var e = 0; e < t.length; e++) this.push(t[e]);
          };
        m.prototype.push = function (t) {
          if (t)
            if ("object" === a()(t) && t.length) {
              var e = t.splice(0, 1);
              h[e] && h[e].apply(null, t);
            } else "function" == typeof t && t();
        };
        var v,
          w = function () {
            window._stq.a || (window._stq = new m(window._stq));
          },
          h = {
            view: function (t) {
              (t.host = document.location.host), (t.ref = document.referrer);
              try {
                if ("undefined" != typeof window && window.location) {
                  var e = new URL(window.location.href).searchParams,
                    n =
                      e &&
                      Array.from(e.entries()).filter(function (t) {
                        return r()(t, 1)[0].startsWith("utm_");
                      }),
                    o = n ? Object.fromEntries(n) : {},
                    i = Array.from(Object.entries(t)).filter(function (t) {
                      return !r()(t, 1)[0].startsWith("utm_");
                    });
                  (t = i ? Object.fromEntries(i) : t),
                    (t = Object.assign(t, o));
                }
              } catch (t) {
                window.console && window.console.log && window.console.log(t);
              }
              l("g.gif", f(t), "wpstats");
            },
            extra: function (t) {
              (t.v = "wpcom-no-pv"), l("g.gif", f(t), !1);
            },
            raw: function (t) {
              l("g.gif", f(t), !1);
            },
            click: function (t) {
              l("c.gif", f(t), !1);
            },
            clickTrackerInit: function (t, e) {
              d.init(t, e);
            },
          },
          y = function t() {
            document.hidden ||
              (document.removeEventListener("visibilitychange", t), w());
          };
        return (
          6 === s() &&
          "complete" !== document.readyState &&
          "object" === a()(document.attachEvent)
            ? document.attachEvent("onreadystatechange", function (t) {
                "complete" === document.readyState && window.setTimeout(w, 250);
              })
            : ((v = "unknown"),
              void 0 === document.visibilityState ||
                ("visible" !== document.visibilityState &&
                  "hidden" !== document.visibilityState &&
                  "prerender" !== document.visibilityState &&
                  "unloaded" !== document.visibilityState) ||
                (v = document.visibilityState),
              h.extra({ "x_stats-initial-visibility": v }),
              void 0 !== document.hidden && document.hidden
                ? document.addEventListener("visibilitychange", y)
                : w()),
          h
        );
      })()),
      (window.wpcom.tracks = Object(c.a)());
  },
]);
