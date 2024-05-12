(function (g) {
  var t = {
    PLATFORM_WINDOWS: "windows",
    PLATFORM_IPHONE: "iphone",
    PLATFORM_IPOD: "ipod",
    PLATFORM_IPAD: "ipad",
    PLATFORM_BLACKBERRY: "blackberry",
    PLATFORM_BLACKBERRY_10: "blackberry_10",
    PLATFORM_SYMBIAN: "symbian_series60",
    PLATFORM_SYMBIAN_S40: "symbian_series40",
    PLATFORM_J2ME_MIDP: "j2me_midp",
    PLATFORM_ANDROID: "android",
    PLATFORM_ANDROID_TABLET: "android_tablet",
    PLATFORM_FIREFOX_OS: "firefoxOS",
    PLATFORM_MOBILE_GENERIC: "mobile_generic",

    userAgent: false, // Shortcut to the browser User Agent String.
    matchedPlatformName: false, // Matched platform name. False otherwise.
    matchedUserAgentName: false, // Matched UA String. False otherwise.

    init: function () {
      try {
        t.userAgent = g.navigator.userAgent.toLowerCase();
        t.getPlatformName();
        t.getMobileUserAgentName();
      } catch (e) {
        console.error(e);
      }
    },

    initForTest: function (userAgent) {
      t.matchedPlatformName = false;
      t.matchedUserAgentName = false;
      try {
        t.userAgent = userAgent.toLowerCase();
        t.getPlatformName();
        t.getMobileUserAgentName();
      } catch (e) {
        console.error(e);
      }
    },

    /**
     * This method detects the mobile User Agent name.
     */
    getMobileUserAgentName: function () {
      if (t.matchedUserAgentName !== false) return t.matchedUserAgentName;

      if (t.userAgent === false) return false;

      if (t.isChromeForIOS()) t.matchedUserAgentName = "chrome-for-ios";
      else if (t.isTwitterForIpad())
        t.matchedUserAgentName = "twitter-for-ipad";
      else if (t.isTwitterForIphone())
        t.matchedUserAgentName = "twitter-for-iphone";
      else if (t.isIPhoneOrIPod()) t.matchedUserAgentName = "iphone";
      else if (t.isIPad()) t.matchedUserAgentName = "ipad";
      else if (t.isAndroidTablet()) t.matchedUserAgentName = "android_tablet";
      else if (t.isAndroid()) t.matchedUserAgentName = "android";
      else if (t.isBlackberry10()) t.matchedUserAgentName = "blackberry_10";
      else if (has("blackberry")) t.matchedUserAgentName = "blackberry";
      else if (t.isBlackberryTablet())
        t.matchedUserAgentName = "blackberry_tablet";
      else if (t.isWindowsPhone7()) t.matchedUserAgentName = "win7";
      else if (t.isWindowsPhone8()) t.matchedUserAgentName = "winphone8";
      else if (t.isOperaMini()) t.matchedUserAgentName = "opera-mini";
      else if (t.isOperaMobile()) t.matchedUserAgentName = "opera-mobi";
      else if (t.isKindleFire()) t.matchedUserAgentName = "kindle-fire";
      else if (t.isSymbianPlatform()) t.matchedUserAgentName = "series60";
      else if (t.isFirefoxMobile()) t.matchedUserAgentName = "firefox_mobile";
      else if (t.isFirefoxOS()) t.matchedUserAgentName = "firefoxOS";
      else if (t.isFacebookForIphone())
        t.matchedUserAgentName = "facebook-for-iphone";
      else if (t.isFacebookForIpad())
        t.matchedUserAgentName = "facebook-for-ipad";
      else if (t.isWordPressForIos()) t.matchedUserAgentName = "ios-app";
      else if (has("iphone")) t.matchedUserAgentName = "iphone-unknown";
      else if (has("ipad")) t.matchedUserAgentName = "ipad-unknown";

      return t.matchedUserAgentName;
    },

    /**
     * This method detects the mobile platform name.
     */
    getPlatformName: function () {
      if (t.matchedPlatformName !== false) return t.matchedPlatformName;

      if (t.userAgent === false) return false;

      if (has("windows ce") || has("windows phone")) {
        t.matchedPlatformName = t.PLATFORM_WINDOWS;
      } else if (has("ipad")) {
        t.matchedPlatformName = t.PLATFORM_IPAD;
      } else if (has("ipod")) {
        t.matchedPlatformName = t.PLATFORM_IPOD;
      } else if (has("iphone")) {
        t.matchedPlatformName = t.PLATFORM_IPHONE;
      } else if (has("android")) {
        if (t.isAndroidTablet())
          t.matchedPlatformName = t.PLATFORM_ANDROID_TABLET;
        else t.matchedPlatformName = t.PLATFORM_ANDROID;
      } else if (t.isKindleFire()) {
        t.matchedPlatformName = t.PLATFORM_ANDROID_TABLET;
      } else if (t.isBlackberry10()) {
        t.matchedPlatformName = t.PLATFORM_BLACKBERRY_10;
      } else if (has("blackberry")) {
        t.matchedPlatformName = t.PLATFORM_BLACKBERRY;
      } else if (t.isBlackberryTablet()) {
        t.matchedPlatformName = t.PLATFORM_BLACKBERRY;
      } else if (t.isSymbianPlatform()) {
        t.matchedPlatformName = t.PLATFORM_SYMBIAN;
      } else if (t.isSymbianS40Platform()) {
        t.matchedPlatformName = t.PLATFORM_SYMBIAN_S40;
      } else if (t.isJ2MEPlatform()) {
        t.matchedPlatformName = t.PLATFORM_J2ME_MIDP;
      } else if (t.isFirefoxOS()) {
        t.matchedPlatformName = t.PLATFORM_FIREFOX_OS;
      } else if (t.isFirefoxMobile()) {
        t.matchedPlatformName = t.PLATFORM_MOBILE_GENERIC;
      }

      return t.matchedPlatformName;
    },

    /**
     * Detect the BlackBerry OS version.
     *
     * Note: This is for smartphones only. Does not work on BB tablets.
     */
    getBlackBerryOSVersion: check(function () {
      if (t.isBlackberry10()) return "10";

      if (!has("blackberry")) return false;

      var rv = -1; // Return value assumes failure.
      var re;

      if (has("webkit")) {
        // Detecting the BB OS version for devices running OS 6.0 or higher
        re = /Version\/([\d\.]+)/i;
      } else {
        // BlackBerry devices <= 5.XX
        re = /BlackBerry\w+\/([\d\.]+)/i;
      }
      if (re.exec(t.userAgent) != null) rv = RegExp.$1.toString();

      return rv === -1 ? false : rv;
    }),

    /**
     * Detects if the current UA is iPhone Mobile Safari or another iPhone or iPod Touch Browser.
     */
    isIPhoneOrIPod: check(function () {
      return has("safari") && (has("iphone") || has("ipod"));
    }),

    /**
     * Detects if the current device is an iPad.
     */
    isIPad: check(function () {
      return has("ipad") && has("safari");
    }),

    /**
     *  Detects if the current UA is Chrome for iOS
     */
    isChromeForIOS: check(function () {
      return t.isIPhoneOrIPod() && has("crios/");
    }),

    /**
     * Detects if the current browser is the Native Android browser.
     */
    isAndroid: check(function () {
      if (has("android")) {
        return !(t.isOperaMini() || t.isOperaMobile() || t.isFirefoxMobile());
      }
    }),

    /**
     * Detects if the current browser is the Native Android Tablet browser.
     */
    isAndroidTablet: check(function () {
      if (has("android") && !has("mobile")) {
        return !(t.isOperaMini() || t.isOperaMobile() || t.isFirefoxMobile());
      }
    }),

    /**
     * Detects if the current browser is Opera Mobile
     */
    isOperaMobile: check(function () {
      return has("opera") && has("mobi");
    }),

    /**
     * Detects if the current browser is Opera Mini
     */
    isOperaMini: check(function () {
      return has("opera") && has("mini");
    }),

    /**
     * isBlackberry10() can be used to check the User Agent for a BlackBerry 10 device.
     */
    isBlackberry10: check(function () {
      return has("bb10") && has("mobile");
    }),

    /**
     * isBlackberryTablet() can be used to check the User Agent for a RIM blackberry tablet
     */
    isBlackberryTablet: check(function () {
      return has("playbook") && has("rim tablet");
    }),

    /**
     * Detects if the current browser is a Windows Phone 7 device.
     */
    isWindowsPhone7: check(function () {
      return has("windows phone os 7");
    }),

    /**
     * Detects if the current browser is a Windows Phone 8 device.
     */
    isWindowsPhone8: check(function () {
      return has("windows phone 8");
    }),

    /**
     * Detects if the device platform is J2ME.
     */
    isJ2MEPlatform: check(function () {
      return has("j2me/midp") || (has("midp") && has("cldc"));
    }),

    /**
     * Detects if the device platform is the Symbian Series 40.
     */
    isSymbianS40Platform: check(function () {
      if (has("series40")) {
        return has("nokia") || has("ovibrowser") || has("nokiabrowser");
      }
    }),

    /**
     * Detects if the device platform is the Symbian Series 60.
     */
    isSymbianPlatform: check(function () {
      if (has("webkit")) {
        // First, test for WebKit, then make sure it's either Symbian or S60.
        return has("symbian") || has("series60");
      } else if (has("symbianos") && has("series60")) {
        return true;
      } else if (has("nokia") && has("series60")) {
        return true;
      } else if (has("opera mini")) {
        return has("symbianos") || has("symbos") || has("series 60");
      }
    }),

    /**
     * Detects if the current browser is the Kindle Fire Native browser.
     */
    isKindleFire: check(function () {
      return has("silk/") && has("silk-accelerated=");
    }),

    /**
     * Detects if the current browser is Firefox Mobile (Fennec)
     */
    isFirefoxMobile: check(function () {
      return has("fennec");
    }),

    /**
     * Detects if the current browser is the native FirefoxOS browser
     */
    isFirefoxOS: check(function () {
      return has("mozilla") && has("mobile") && has("gecko") && has("firefox");
    }),

    /**
     * Detects if the current UA is Facebook for iPad
     */
    isFacebookForIpad: check(function () {
      if (!has("ipad")) return false;

      return has("facebook") || has("fbforiphone") || has("fban/fbios;");
    }),

    /**
     * Detects if the current UA is Facebook for iPhone
     */
    isFacebookForIphone: check(function () {
      if (!has("iphone")) return false;

      return (
        (has("facebook") && !has("ipad")) ||
        (has("fbforiphone") && !has("tablet")) ||
        (has("fban/fbios;") && !has("tablet"))
      ); // FB app v5.0 or higher
    }),

    /**
     * Detects if the current UA is Twitter for iPhone
     */
    isTwitterForIphone: check(function () {
      if (has("ipad")) return false;

      return has("twitter for iphone");
    }),

    /**
     * Detects if the current UA is Twitter for iPad
     */
    isTwitterForIpad: check(function () {
      return (
        has("twitter for ipad") || (has("ipad") && has("twitter for iphone"))
      );
    }),

    /**
     * Detects if the current UA is WordPress for iOS
     */
    isWordPressForIos: check(function () {
      return has("wp-iphone");
    }),
  };

  function has(str) {
    return t.userAgent.indexOf(str) != -1;
  }

  function check(fn) {
    return function () {
      return t.userAgent === false ? false : fn() || false;
    };
  }

  g.wpcom_mobile_user_agent_info = t;
})(typeof window !== "undefined" ? window : this);
!(function (e) {
  ("object" == typeof exports && "undefined" != typeof module) ||
  "function" != typeof define ||
  !define.amd
    ? e()
    : define("inert", e);
})(function () {
  "use strict";
  var e,
    t,
    n,
    i,
    o,
    r,
    s = function (e, t, n) {
      return t && a(e.prototype, t), n && a(e, n), e;
    };
  function a(e, t) {
    for (var n = 0; n < t.length; n++) {
      var i = t[n];
      (i.enumerable = i.enumerable || !1),
        (i.configurable = !0),
        "value" in i && (i.writable = !0),
        Object.defineProperty(e, i.key, i);
    }
  }
  function d(e, t) {
    if (!(e instanceof t))
      throw new TypeError("Cannot call a class as a function");
  }
  function u(e, t) {
    d(this, u),
      (this._inertManager = t),
      (this._rootElement = e),
      (this._managedNodes = new Set()),
      this._rootElement.hasAttribute("aria-hidden")
        ? (this._savedAriaHidden =
            this._rootElement.getAttribute("aria-hidden"))
        : (this._savedAriaHidden = null),
      this._rootElement.setAttribute("aria-hidden", "true"),
      this._makeSubtreeUnfocusable(this._rootElement),
      (this._observer = new MutationObserver(this._onMutation.bind(this))),
      this._observer.observe(this._rootElement, {
        attributes: !0,
        childList: !0,
        subtree: !0,
      });
  }
  function h(e, t) {
    d(this, h),
      (this._node = e),
      (this._overrodeFocusMethod = !1),
      (this._inertRoots = new Set([t])),
      (this._savedTabIndex = null),
      (this._destroyed = !1),
      this.ensureUntabbable();
  }
  function l(e) {
    if ((d(this, l), !e))
      throw new Error(
        "Missing required argument; InertManager needs to wrap a document."
      );
    (this._document = e),
      (this._managedNodes = new Map()),
      (this._inertRoots = new Map()),
      (this._observer = new MutationObserver(this._watchForInert.bind(this))),
      _(e.head || e.body || e.documentElement),
      "loading" === e.readyState
        ? e.addEventListener(
            "DOMContentLoaded",
            this._onDocumentLoaded.bind(this)
          )
        : this._onDocumentLoaded();
  }
  function c(e, t, n) {
    if (e.nodeType == Node.ELEMENT_NODE) {
      var i = e;
      if ((s = (t && t(i), i.shadowRoot))) return void c(s, t, s);
      if ("content" == i.localName) {
        for (
          var o = (s = i).getDistributedNodes ? s.getDistributedNodes() : [],
            r = 0;
          r < o.length;
          r++
        )
          c(o[r], t, n);
        return;
      }
      if ("slot" == i.localName) {
        for (
          var s,
            a = (s = i).assignedNodes ? s.assignedNodes({ flatten: !0 }) : [],
            d = 0;
          d < a.length;
          d++
        )
          c(a[d], t, n);
        return;
      }
    }
    for (var u = e.firstChild; null != u; ) c(u, t, n), (u = u.nextSibling);
  }
  function _(e) {
    var t;
    e.querySelector("style#inert-style, link#inert-style") ||
      ((t = document.createElement("style")).setAttribute("id", "inert-style"),
      (t.textContent =
        "\n[inert] {\n  pointer-events: none;\n  cursor: default;\n}\n\n[inert], [inert] * {\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n"),
      e.appendChild(t));
  }
  "undefined" != typeof window &&
    ((e = Array.prototype.slice),
    (t = Element.prototype.matches || Element.prototype.msMatchesSelector),
    (n = [
      "a[href]",
      "area[href]",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      "button:not([disabled])",
      "details",
      "summary",
      "iframe",
      "object",
      "embed",
      "[contenteditable]",
    ].join(",")),
    s(u, [
      {
        key: "destructor",
        value: function () {
          this._observer.disconnect(),
            this._rootElement &&
              (null !== this._savedAriaHidden
                ? this._rootElement.setAttribute(
                    "aria-hidden",
                    this._savedAriaHidden
                  )
                : this._rootElement.removeAttribute("aria-hidden")),
            this._managedNodes.forEach(function (e) {
              this._unmanageNode(e.node);
            }, this),
            (this._observer = null),
            (this._rootElement = null),
            (this._managedNodes = null),
            (this._inertManager = null);
        },
      },
      {
        key: "_makeSubtreeUnfocusable",
        value: function (e) {
          var t = this,
            n =
              (c(e, function (e) {
                return t._visitNode(e);
              }),
              document.activeElement);
          if (!document.body.contains(e)) {
            for (var i = e, o = void 0; i; ) {
              if (i.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
                o = i;
                break;
              }
              i = i.parentNode;
            }
            o && (n = o.activeElement);
          }
          e.contains(n) &&
            (n.blur(), n === document.activeElement && document.body.focus());
        },
      },
      {
        key: "_visitNode",
        value: function (e) {
          e.nodeType === Node.ELEMENT_NODE &&
            (e !== this._rootElement &&
              e.hasAttribute("inert") &&
              this._adoptInertRoot(e),
            (t.call(e, n) || e.hasAttribute("tabindex")) &&
              this._manageNode(e));
        },
      },
      {
        key: "_manageNode",
        value: function (e) {
          (e = this._inertManager.register(e, this)), this._managedNodes.add(e);
        },
      },
      {
        key: "_unmanageNode",
        value: function (e) {
          (e = this._inertManager.deregister(e, this)) &&
            this._managedNodes.delete(e);
        },
      },
      {
        key: "_unmanageSubtree",
        value: function (e) {
          var t = this;
          c(e, function (e) {
            return t._unmanageNode(e);
          });
        },
      },
      {
        key: "_adoptInertRoot",
        value: function (e) {
          var t = this._inertManager.getInertRoot(e);
          t ||
            (this._inertManager.setInert(e, !0),
            (t = this._inertManager.getInertRoot(e))),
            t.managedNodes.forEach(function (e) {
              this._manageNode(e.node);
            }, this);
        },
      },
      {
        key: "_onMutation",
        value: function (t, n) {
          t.forEach(function (t) {
            var n,
              i = t.target;
            "childList" === t.type
              ? (e.call(t.addedNodes).forEach(function (e) {
                  this._makeSubtreeUnfocusable(e);
                }, this),
                e.call(t.removedNodes).forEach(function (e) {
                  this._unmanageSubtree(e);
                }, this))
              : "attributes" === t.type &&
                ("tabindex" === t.attributeName
                  ? this._manageNode(i)
                  : i !== this._rootElement &&
                    "inert" === t.attributeName &&
                    i.hasAttribute("inert") &&
                    (this._adoptInertRoot(i),
                    (n = this._inertManager.getInertRoot(i)),
                    this._managedNodes.forEach(function (e) {
                      i.contains(e.node) && n._manageNode(e.node);
                    })));
          }, this);
        },
      },
      {
        key: "managedNodes",
        get: function () {
          return new Set(this._managedNodes);
        },
      },
      {
        key: "hasSavedAriaHidden",
        get: function () {
          return null !== this._savedAriaHidden;
        },
      },
      {
        key: "savedAriaHidden",
        set: function (e) {
          this._savedAriaHidden = e;
        },
        get: function () {
          return this._savedAriaHidden;
        },
      },
    ]),
    (i = u),
    s(h, [
      {
        key: "destructor",
        value: function () {
          var e;
          this._throwIfDestroyed(),
            this._node &&
              this._node.nodeType === Node.ELEMENT_NODE &&
              ((e = this._node),
              null !== this._savedTabIndex
                ? e.setAttribute("tabindex", this._savedTabIndex)
                : e.removeAttribute("tabindex"),
              this._overrodeFocusMethod && delete e.focus),
            (this._node = null),
            (this._inertRoots = null),
            (this._destroyed = !0);
        },
      },
      {
        key: "_throwIfDestroyed",
        value: function () {
          if (this.destroyed)
            throw new Error("Trying to access destroyed InertNode");
        },
      },
      {
        key: "ensureUntabbable",
        value: function () {
          var e;
          this.node.nodeType === Node.ELEMENT_NODE &&
            ((e = this.node),
            t.call(e, n)
              ? (-1 === e.tabIndex && this.hasSavedTabIndex) ||
                (e.hasAttribute("tabindex") &&
                  (this._savedTabIndex = e.tabIndex),
                e.setAttribute("tabindex", "-1"),
                e.nodeType === Node.ELEMENT_NODE &&
                  ((e.focus = function () {}),
                  (this._overrodeFocusMethod = !0)))
              : e.hasAttribute("tabindex") &&
                ((this._savedTabIndex = e.tabIndex),
                e.removeAttribute("tabindex")));
        },
      },
      {
        key: "addInertRoot",
        value: function (e) {
          this._throwIfDestroyed(), this._inertRoots.add(e);
        },
      },
      {
        key: "removeInertRoot",
        value: function (e) {
          this._throwIfDestroyed(),
            this._inertRoots.delete(e),
            0 === this._inertRoots.size && this.destructor();
        },
      },
      {
        key: "destroyed",
        get: function () {
          return this._destroyed;
        },
      },
      {
        key: "hasSavedTabIndex",
        get: function () {
          return null !== this._savedTabIndex;
        },
      },
      {
        key: "node",
        get: function () {
          return this._throwIfDestroyed(), this._node;
        },
      },
      {
        key: "savedTabIndex",
        set: function (e) {
          this._throwIfDestroyed(), (this._savedTabIndex = e);
        },
        get: function () {
          return this._throwIfDestroyed(), this._savedTabIndex;
        },
      },
    ]),
    (o = h),
    s(l, [
      {
        key: "setInert",
        value: function (e, t) {
          if (t) {
            if (
              !this._inertRoots.has(e) &&
              ((t = new i(e, this)),
              e.setAttribute("inert", ""),
              this._inertRoots.set(e, t),
              !this._document.body.contains(e))
            )
              for (var n = e.parentNode; n; )
                11 === n.nodeType && _(n), (n = n.parentNode);
          } else
            this._inertRoots.has(e) &&
              (this._inertRoots.get(e).destructor(),
              this._inertRoots.delete(e),
              e.removeAttribute("inert"));
        },
      },
      {
        key: "getInertRoot",
        value: function (e) {
          return this._inertRoots.get(e);
        },
      },
      {
        key: "register",
        value: function (e, t) {
          var n = this._managedNodes.get(e);
          return (
            void 0 !== n ? n.addInertRoot(t) : (n = new o(e, t)),
            this._managedNodes.set(e, n),
            n
          );
        },
      },
      {
        key: "deregister",
        value: function (e, t) {
          var n = this._managedNodes.get(e);
          return n
            ? (n.removeInertRoot(t),
              n.destroyed && this._managedNodes.delete(e),
              n)
            : null;
        },
      },
      {
        key: "_onDocumentLoaded",
        value: function () {
          e
            .call(this._document.querySelectorAll("[inert]"))
            .forEach(function (e) {
              this.setInert(e, !0);
            }, this),
            this._observer.observe(
              this._document.body || this._document.documentElement,
              { attributes: !0, subtree: !0, childList: !0 }
            );
        },
      },
      {
        key: "_watchForInert",
        value: function (n, i) {
          var o = this;
          n.forEach(function (n) {
            switch (n.type) {
              case "childList":
                e.call(n.addedNodes).forEach(function (n) {
                  var i;
                  n.nodeType === Node.ELEMENT_NODE &&
                    ((i = e.call(n.querySelectorAll("[inert]"))),
                    t.call(n, "[inert]") && i.unshift(n),
                    i.forEach(function (e) {
                      this.setInert(e, !0);
                    }, o));
                }, o);
                break;
              case "attributes":
                if ("inert" !== n.attributeName) return;
                var i = n.target,
                  r = i.hasAttribute("inert");
                o.setInert(i, r);
            }
          }, this);
        },
      },
    ]),
    (s = l),
    HTMLElement.prototype.hasOwnProperty("inert") ||
      ((r = new s(document)),
      Object.defineProperty(HTMLElement.prototype, "inert", {
        enumerable: !0,
        get: function () {
          return this.hasAttribute("inert");
        },
        set: function (e) {
          r.setInert(this, e);
        },
      })));
});
var runtime = (function (t) {
  "use strict";
  var e,
    r = Object.prototype,
    n = r.hasOwnProperty,
    o =
      Object.defineProperty ||
      function (t, e, r) {
        t[e] = r.value;
      },
    i =
      (w = "function" == typeof Symbol ? Symbol : {}).iterator || "@@iterator",
    a = w.asyncIterator || "@@asyncIterator",
    c = w.toStringTag || "@@toStringTag";
  function u(t, e, r) {
    return (
      Object.defineProperty(t, e, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0,
      }),
      t[e]
    );
  }
  try {
    u({}, "");
  } catch (r) {
    u = function (t, e, r) {
      return (t[e] = r);
    };
  }
  function h(t, r, n, i) {
    var a, c, u, h;
    (r = r && r.prototype instanceof v ? r : v),
      (r = Object.create(r.prototype)),
      (i = new O(i || []));
    return (
      o(r, "_invoke", {
        value:
          ((a = t),
          (c = n),
          (u = i),
          (h = f),
          function (t, r) {
            if (h === p) throw new Error("Generator is already running");
            if (h === y) {
              if ("throw" === t) throw r;
              return { value: e, done: !0 };
            }
            for (u.method = t, u.arg = r; ; ) {
              var n = u.delegate;
              if (
                n &&
                ((n = (function t(r, n) {
                  var o = n.method,
                    i = r.iterator[o];
                  return i === e
                    ? ((n.delegate = null),
                      ("throw" === o &&
                        r.iterator.return &&
                        ((n.method = "return"),
                        (n.arg = e),
                        t(r, n),
                        "throw" === n.method)) ||
                        ("return" !== o &&
                          ((n.method = "throw"),
                          (n.arg = new TypeError(
                            "The iterator does not provide a '" + o + "' method"
                          )))),
                      g)
                    : "throw" === (o = l(i, r.iterator, n.arg)).type
                    ? ((n.method = "throw"),
                      (n.arg = o.arg),
                      (n.delegate = null),
                      g)
                    : (i = o.arg)
                    ? i.done
                      ? ((n[r.resultName] = i.value),
                        (n.next = r.nextLoc),
                        "return" !== n.method &&
                          ((n.method = "next"), (n.arg = e)),
                        (n.delegate = null),
                        g)
                      : i
                    : ((n.method = "throw"),
                      (n.arg = new TypeError(
                        "iterator result is not an object"
                      )),
                      (n.delegate = null),
                      g);
                })(n, u)),
                n)
              ) {
                if (n === g) continue;
                return n;
              }
              if ("next" === u.method) u.sent = u._sent = u.arg;
              else if ("throw" === u.method) {
                if (h === f) throw ((h = y), u.arg);
                u.dispatchException(u.arg);
              } else "return" === u.method && u.abrupt("return", u.arg);
              if (((h = p), "normal" === (n = l(a, c, u)).type)) {
                if (((h = u.done ? y : s), n.arg !== g))
                  return { value: n.arg, done: u.done };
              } else
                "throw" === n.type &&
                  ((h = y), (u.method = "throw"), (u.arg = n.arg));
            }
          }),
      }),
      r
    );
  }
  function l(t, e, r) {
    try {
      return { type: "normal", arg: t.call(e, r) };
    } catch (t) {
      return { type: "throw", arg: t };
    }
  }
  t.wrap = h;
  var f = "suspendedStart",
    s = "suspendedYield",
    p = "executing",
    y = "completed",
    g = {};
  function v() {}
  function d() {}
  function m() {}
  var w,
    b,
    L =
      ((b =
        (b =
          (u((w = {}), i, function () {
            return this;
          }),
          Object.getPrototypeOf)) && b(b(k([])))) &&
        b !== r &&
        n.call(b, i) &&
        (w = b),
      (m.prototype = v.prototype = Object.create(w)));
  function x(t) {
    ["next", "throw", "return"].forEach(function (e) {
      u(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function E(t, e) {
    var r;
    o(this, "_invoke", {
      value: function (o, i) {
        function a() {
          return new e(function (r, a) {
            !(function r(o, i, a, c) {
              var u;
              if ("throw" !== (o = l(t[o], t, i)).type)
                return (i = (u = o.arg).value) &&
                  "object" == typeof i &&
                  n.call(i, "__await")
                  ? e.resolve(i.__await).then(
                      function (t) {
                        r("next", t, a, c);
                      },
                      function (t) {
                        r("throw", t, a, c);
                      }
                    )
                  : e.resolve(i).then(
                      function (t) {
                        (u.value = t), a(u);
                      },
                      function (t) {
                        return r("throw", t, a, c);
                      }
                    );
              c(o.arg);
            })(o, i, r, a);
          });
        }
        return (r = r ? r.then(a, a) : a());
      },
    });
  }
  function j(t) {
    var e = { tryLoc: t[0] };
    1 in t && (e.catchLoc = t[1]),
      2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
      this.tryEntries.push(e);
  }
  function _(t) {
    var e = t.completion || {};
    (e.type = "normal"), delete e.arg, (t.completion = e);
  }
  function O(t) {
    (this.tryEntries = [{ tryLoc: "root" }]),
      t.forEach(j, this),
      this.reset(!0);
  }
  function k(t) {
    if (t || "" === t) {
      var r,
        o = t[i];
      if (o) return o.call(t);
      if ("function" == typeof t.next) return t;
      if (!isNaN(t.length))
        return (
          (r = -1),
          ((o = function o() {
            for (; ++r < t.length; )
              if (n.call(t, r)) return (o.value = t[r]), (o.done = !1), o;
            return (o.value = e), (o.done = !0), o;
          }).next = o)
        );
    }
    throw new TypeError(typeof t + " is not iterable");
  }
  return (
    o(L, "constructor", { value: (d.prototype = m), configurable: !0 }),
    o(m, "constructor", { value: d, configurable: !0 }),
    (d.displayName = u(m, c, "GeneratorFunction")),
    (t.isGeneratorFunction = function (t) {
      return (
        !!(t = "function" == typeof t && t.constructor) &&
        (t === d || "GeneratorFunction" === (t.displayName || t.name))
      );
    }),
    (t.mark = function (t) {
      return (
        Object.setPrototypeOf
          ? Object.setPrototypeOf(t, m)
          : ((t.__proto__ = m), u(t, c, "GeneratorFunction")),
        (t.prototype = Object.create(L)),
        t
      );
    }),
    (t.awrap = function (t) {
      return { __await: t };
    }),
    x(E.prototype),
    u(E.prototype, a, function () {
      return this;
    }),
    (t.AsyncIterator = E),
    (t.async = function (e, r, n, o, i) {
      void 0 === i && (i = Promise);
      var a = new E(h(e, r, n, o), i);
      return t.isGeneratorFunction(r)
        ? a
        : a.next().then(function (t) {
            return t.done ? t.value : a.next();
          });
    }),
    x(L),
    u(L, c, "Generator"),
    u(L, i, function () {
      return this;
    }),
    u(L, "toString", function () {
      return "[object Generator]";
    }),
    (t.keys = function (t) {
      var e,
        r = Object(t),
        n = [];
      for (e in r) n.push(e);
      return (
        n.reverse(),
        function t() {
          for (; n.length; ) {
            var e = n.pop();
            if (e in r) return (t.value = e), (t.done = !1), t;
          }
          return (t.done = !0), t;
        }
      );
    }),
    (t.values = k),
    (O.prototype = {
      constructor: O,
      reset: function (t) {
        if (
          ((this.prev = 0),
          (this.next = 0),
          (this.sent = this._sent = e),
          (this.done = !1),
          (this.delegate = null),
          (this.method = "next"),
          (this.arg = e),
          this.tryEntries.forEach(_),
          !t)
        )
          for (var r in this)
            "t" === r.charAt(0) &&
              n.call(this, r) &&
              !isNaN(+r.slice(1)) &&
              (this[r] = e);
      },
      stop: function () {
        this.done = !0;
        var t = this.tryEntries[0].completion;
        if ("throw" === t.type) throw t.arg;
        return this.rval;
      },
      dispatchException: function (t) {
        if (this.done) throw t;
        var r = this;
        function o(n, o) {
          return (
            (c.type = "throw"),
            (c.arg = t),
            (r.next = n),
            o && ((r.method = "next"), (r.arg = e)),
            !!o
          );
        }
        for (var i = this.tryEntries.length - 1; 0 <= i; --i) {
          var a = this.tryEntries[i],
            c = a.completion;
          if ("root" === a.tryLoc) return o("end");
          if (a.tryLoc <= this.prev) {
            var u = n.call(a, "catchLoc"),
              h = n.call(a, "finallyLoc");
            if (u && h) {
              if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
              if (this.prev < a.finallyLoc) return o(a.finallyLoc);
            } else if (u) {
              if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
            } else {
              if (!h) throw new Error("try statement without catch or finally");
              if (this.prev < a.finallyLoc) return o(a.finallyLoc);
            }
          }
        }
      },
      abrupt: function (t, e) {
        for (var r = this.tryEntries.length - 1; 0 <= r; --r) {
          var o = this.tryEntries[r];
          if (
            o.tryLoc <= this.prev &&
            n.call(o, "finallyLoc") &&
            this.prev < o.finallyLoc
          ) {
            var i = o;
            break;
          }
        }
        var a = (i =
          i &&
          ("break" === t || "continue" === t) &&
          i.tryLoc <= e &&
          e <= i.finallyLoc
            ? null
            : i)
          ? i.completion
          : {};
        return (
          (a.type = t),
          (a.arg = e),
          i
            ? ((this.method = "next"), (this.next = i.finallyLoc), g)
            : this.complete(a)
        );
      },
      complete: function (t, e) {
        if ("throw" === t.type) throw t.arg;
        return (
          "break" === t.type || "continue" === t.type
            ? (this.next = t.arg)
            : "return" === t.type
            ? ((this.rval = this.arg = t.arg),
              (this.method = "return"),
              (this.next = "end"))
            : "normal" === t.type && e && (this.next = e),
          g
        );
      },
      finish: function (t) {
        for (var e = this.tryEntries.length - 1; 0 <= e; --e) {
          var r = this.tryEntries[e];
          if (r.finallyLoc === t)
            return this.complete(r.completion, r.afterLoc), _(r), g;
        }
      },
      catch: function (t) {
        for (var e = this.tryEntries.length - 1; 0 <= e; --e) {
          var r,
            n,
            o = this.tryEntries[e];
          if (o.tryLoc === t)
            return (
              "throw" === (r = o.completion).type && ((n = r.arg), _(o)), n
            );
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function (t, r, n) {
        return (
          (this.delegate = { iterator: k(t), resultName: r, nextLoc: n }),
          "next" === this.method && (this.arg = e),
          g
        );
      },
    }),
    t
  );
})("object" == typeof module ? module.exports : {});
try {
  regeneratorRuntime = runtime;
} catch (t) {
  "object" == typeof globalThis
    ? (globalThis.regeneratorRuntime = runtime)
    : Function("r", "regeneratorRuntime = r")(runtime);
}
!(function (r) {
  "use strict";
  var t, e, n;
  (e = {}),
    ((n = function (r) {
      if (e[r]) return e[r].exports;
      var o = (e[r] = { i: r, l: !1, exports: {} });
      return t[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
    }).m = t =
      [
        function (r, t, e) {
          e(1),
            e(70),
            e(77),
            e(80),
            e(81),
            e(83),
            e(95),
            e(96),
            e(98),
            e(101),
            e(103),
            e(104),
            e(113),
            e(114),
            e(117),
            e(123),
            e(138),
            e(140),
            e(141),
            (r.exports = e(142));
        },
        function (r, t, e) {
          var n = e(2),
            o = e(38),
            a = e(62),
            c = e(67),
            i = e(69);
          n(
            {
              target: "Array",
              proto: !0,
              arity: 1,
              forced:
                e(6)(function () {
                  return 4294967297 !== [].push.call({ length: 4294967296 }, 1);
                }) ||
                !(function () {
                  try {
                    Object.defineProperty([], "length", {
                      writable: !1,
                    }).push();
                  } catch (r) {
                    return r instanceof TypeError;
                  }
                })(),
            },
            {
              push: function (r) {
                var t = o(this),
                  e = a(t),
                  n = arguments.length;
                i(e + n);
                for (var u = 0; u < n; u++) (t[e] = arguments[u]), e++;
                return c(t, e), e;
              },
            }
          );
        },
        function (t, e, n) {
          var o = n(3),
            a = n(4).f,
            c = n(42),
            i = n(46),
            u = n(36),
            f = n(54),
            s = n(66);
          t.exports = function (t, e) {
            var n,
              p,
              l,
              y = t.target,
              h = t.global,
              v = t.stat,
              g = h ? o : v ? o[y] || u(y, {}) : o[y] && o[y].prototype;
            if (g)
              for (n in e) {
                if (
                  ((p = e[n]),
                  (l = t.dontCallGetSet ? (l = a(g, n)) && l.value : g[n]),
                  !s(h ? n : y + (v ? "." : "#") + n, t.forced) && l !== r)
                ) {
                  if (typeof p == typeof l) continue;
                  f(p, l);
                }
                (t.sham || (l && l.sham)) && c(p, "sham", !0), i(g, n, p, t);
              }
          };
        },
        function (r, t, e) {
          function n(r) {
            return r && r.Math === Math && r;
          }
          r.exports =
            n("object" == typeof globalThis && globalThis) ||
            n("object" == typeof window && window) ||
            n("object" == typeof self && self) ||
            n("object" == typeof global && global) ||
            n("object" == typeof this && this) ||
            (function () {
              return this;
            })() ||
            Function("return this")();
        },
        function (r, t, e) {
          var n = e(5),
            o = e(7),
            a = e(9),
            c = e(10),
            i = e(11),
            u = e(17),
            f = e(37),
            s = e(40),
            p = Object.getOwnPropertyDescriptor;
          t.f = n
            ? p
            : function (r, t) {
                if (((r = i(r)), (t = u(t)), s))
                  try {
                    return p(r, t);
                  } catch (r) {}
                if (f(r, t)) return c(!o(a.f, r, t), r[t]);
              };
        },
        function (r, t, e) {
          (e = e(6)),
            (r.exports = !e(function () {
              return (
                7 !==
                Object.defineProperty({}, 1, {
                  get: function () {
                    return 7;
                  },
                })[1]
              );
            }));
        },
        function (r, t, e) {
          r.exports = function (r) {
            try {
              return !!r();
            } catch (r) {
              return !0;
            }
          };
        },
        function (r, t, e) {
          e = e(8);
          var n = Function.prototype.call;
          r.exports = e
            ? n.bind(n)
            : function () {
                return n.apply(n, arguments);
              };
        },
        function (r, t, e) {
          (e = e(6)),
            (r.exports = !e(function () {
              var r = function () {}.bind();
              return "function" != typeof r || r.hasOwnProperty("prototype");
            }));
        },
        function (r, t, e) {
          var n = {}.propertyIsEnumerable,
            o = Object.getOwnPropertyDescriptor,
            a = o && !n.call({ 1: 2 }, 1);
          t.f = a
            ? function (r) {
                return !!(r = o(this, r)) && r.enumerable;
              }
            : n;
        },
        function (r, t, e) {
          r.exports = function (r, t) {
            return {
              enumerable: !(1 & r),
              configurable: !(2 & r),
              writable: !(4 & r),
              value: t,
            };
          };
        },
        function (r, t, e) {
          var n = e(12),
            o = e(15);
          r.exports = function (r) {
            return n(o(r));
          };
        },
        function (r, t, e) {
          var n = e(13),
            o = e(6),
            a = e(14),
            c = Object,
            i = n("".split);
          r.exports = o(function () {
            return !c("z").propertyIsEnumerable(0);
          })
            ? function (r) {
                return "String" === a(r) ? i(r, "") : c(r);
              }
            : c;
        },
        function (r, t, e) {
          var n = e(8),
            o = (e = Function.prototype).call;
          e = n && e.bind.bind(o, o);
          r.exports = n
            ? e
            : function (r) {
                return function () {
                  return o.apply(r, arguments);
                };
              };
        },
        function (r, t, e) {
          var n = (e = e(13))({}.toString),
            o = e("".slice);
          r.exports = function (r) {
            return o(n(r), 8, -1);
          };
        },
        function (r, t, e) {
          var n = e(16),
            o = TypeError;
          r.exports = function (r) {
            if (n(r)) throw new o("Can't call method on " + r);
            return r;
          };
        },
        function (t, e, n) {
          t.exports = function (t) {
            return null === t || t === r;
          };
        },
        function (r, t, e) {
          var n = e(18),
            o = e(21);
          r.exports = function (r) {
            return (r = n(r, "string")), o(r) ? r : r + "";
          };
        },
        function (t, e, n) {
          var o = n(7),
            a = n(19),
            c = n(21),
            i = n(28),
            u = n(31),
            f = ((n = n(32)), TypeError),
            s = n("toPrimitive");
          t.exports = function (t, e) {
            if (!a(t) || c(t)) return t;
            var n = i(t, s);
            if (n) {
              if (((n = o(n, t, (e = e === r ? "default" : e))), !a(n) || c(n)))
                return n;
              throw new f("Can't convert object to primitive value");
            }
            return u(t, (e = e === r ? "number" : e));
          };
        },
        function (r, t, e) {
          var n = e(20);
          r.exports = function (r) {
            return "object" == typeof r ? null !== r : n(r);
          };
        },
        function (t, e, n) {
          var o = "object" == typeof document && document.all;
          t.exports =
            void 0 === o && o !== r
              ? function (r) {
                  return "function" == typeof r || r === o;
                }
              : function (r) {
                  return "function" == typeof r;
                };
        },
        function (r, t, e) {
          var n = e(22),
            o = e(20),
            a = e(23),
            c = ((e = e(24)), Object);
          r.exports = e
            ? function (r) {
                return "symbol" == typeof r;
              }
            : function (r) {
                var t = n("Symbol");
                return o(t) && a(t.prototype, c(r));
              };
        },
        function (t, e, n) {
          var o = n(3),
            a = n(20);
          t.exports = function (t, e) {
            return arguments.length < 2
              ? ((n = o[t]), a(n) ? n : r)
              : o[t] && o[t][e];
            var n;
          };
        },
        function (r, t, e) {
          (e = e(13)), (r.exports = e({}.isPrototypeOf));
        },
        function (r, t, e) {
          (e = e(25)),
            (r.exports =
              e && !Symbol.sham && "symbol" == typeof Symbol.iterator);
        },
        function (r, t, e) {
          var n = e(26),
            o = e(6),
            a = e(3).String;
          r.exports =
            !!Object.getOwnPropertySymbols &&
            !o(function () {
              var r = Symbol("symbol detection");
              return (
                !a(r) ||
                !(Object(r) instanceof Symbol) ||
                (!Symbol.sham && n && n < 41)
              );
            });
        },
        function (r, t, e) {
          var n,
            o,
            a = e(3),
            c = e(27);
          (e = a.process), (a = a.Deno);
          !(o = (a = (a = (e && e.versions) || (a && a.version)) && a.v8)
            ? 0 < (n = a.split("."))[0] && n[0] < 4
              ? 1
              : +(n[0] + n[1])
            : o) &&
            c &&
            (!(n = c.match(/Edge\/(\d+)/)) || 74 <= n[1]) &&
            (n = c.match(/Chrome\/(\d+)/)) &&
            (o = +n[1]),
            (r.exports = o);
        },
        function (r, t, e) {
          r.exports =
            ("undefined" != typeof navigator && String(navigator.userAgent)) ||
            "";
        },
        function (t, e, n) {
          var o = n(29),
            a = n(16);
          t.exports = function (t, e) {
            return (e = t[e]), a(e) ? r : o(e);
          };
        },
        function (r, t, e) {
          var n = e(20),
            o = e(30),
            a = TypeError;
          r.exports = function (r) {
            if (n(r)) return r;
            throw new a(o(r) + " is not a function");
          };
        },
        function (r, t, e) {
          var n = String;
          r.exports = function (r) {
            try {
              return n(r);
            } catch (r) {
              return "Object";
            }
          };
        },
        function (r, t, e) {
          var n = e(7),
            o = e(20),
            a = e(19),
            c = TypeError;
          r.exports = function (r, t) {
            var e, i;
            if ("string" === t && o((e = r.toString)) && !a((i = n(e, r))))
              return i;
            if (o((e = r.valueOf)) && !a((i = n(e, r)))) return i;
            if ("string" !== t && o((e = r.toString)) && !a((i = n(e, r))))
              return i;
            throw new c("Can't convert object to primitive value");
          };
        },
        function (r, t, e) {
          var n = e(3),
            o = e(33),
            a = e(37),
            c = e(39),
            i = e(25),
            u = ((e = e(24)), n.Symbol),
            f = o("wks"),
            s = e ? u.for || u : (u && u.withoutSetter) || c;
          r.exports = function (r) {
            return (
              a(f, r) || (f[r] = i && a(u, r) ? u[r] : s("Symbol." + r)), f[r]
            );
          };
        },
        function (t, e, n) {
          var o = n(34),
            a = n(35);
          (t.exports = function (t, e) {
            return a[t] || (a[t] = e !== r ? e : {});
          })("versions", []).push({
            version: "3.35.1",
            mode: o ? "pure" : "global",
            copyright: "© 2014-2024 Denis Pushkarev (zloirock.ru)",
            license: "https://github.com/zloirock/core-js/blob/v3.35.1/LICENSE",
            source: "https://github.com/zloirock/core-js",
          });
        },
        function (r, t, e) {
          r.exports = !1;
        },
        function (r, t, e) {
          var n = e(3),
            o = e(36);
          e = n[(e = "__core-js_shared__")] || o(e, {});
          r.exports = e;
        },
        function (r, t, e) {
          var n = e(3),
            o = Object.defineProperty;
          r.exports = function (r, t) {
            try {
              o(n, r, { value: t, configurable: !0, writable: !0 });
            } catch (e) {
              n[r] = t;
            }
            return t;
          };
        },
        function (r, t, e) {
          var n = e(13),
            o = e(38),
            a = n({}.hasOwnProperty);
          r.exports =
            Object.hasOwn ||
            function (r, t) {
              return a(o(r), t);
            };
        },
        function (r, t, e) {
          var n = e(15),
            o = Object;
          r.exports = function (r) {
            return o(n(r));
          };
        },
        function (t, e, n) {
          n = n(13);
          var o = 0,
            a = Math.random(),
            c = n((1).toString);
          t.exports = function (t) {
            return "Symbol(" + (t === r ? "" : t) + ")_" + c(++o + a, 36);
          };
        },
        function (r, t, e) {
          var n = e(5),
            o = e(6),
            a = e(41);
          r.exports =
            !n &&
            !o(function () {
              return (
                7 !==
                Object.defineProperty(a("div"), "a", {
                  get: function () {
                    return 7;
                  },
                }).a
              );
            });
        },
        function (r, t, e) {
          var n = e(3),
            o = ((e = e(19)), n.document),
            a = e(o) && e(o.createElement);
          r.exports = function (r) {
            return a ? o.createElement(r) : {};
          };
        },
        function (r, t, e) {
          var n = e(5),
            o = e(43),
            a = e(10);
          r.exports = n
            ? function (r, t, e) {
                return o.f(r, t, a(1, e));
              }
            : function (r, t, e) {
                return (r[t] = e), r;
              };
        },
        function (r, t, e) {
          var n = e(5),
            o = e(40),
            a = e(44),
            c = e(45),
            i = e(17),
            u = TypeError,
            f = Object.defineProperty,
            s = Object.getOwnPropertyDescriptor,
            p = "enumerable",
            l = "configurable",
            y = "writable";
          t.f = n
            ? a
              ? function (r, t, e) {
                  var n;
                  return (
                    c(r),
                    (t = i(t)),
                    c(e),
                    "function" == typeof r &&
                      "prototype" === t &&
                      "value" in e &&
                      y in e &&
                      !e[y] &&
                      (n = s(r, t)) &&
                      n[y] &&
                      ((r[t] = e.value),
                      (e = {
                        configurable: (l in e ? e : n)[l],
                        enumerable: (p in e ? e : n)[p],
                        writable: !1,
                      })),
                    f(r, t, e)
                  );
                }
              : f
            : function (r, t, e) {
                if ((c(r), (t = i(t)), c(e), o))
                  try {
                    return f(r, t, e);
                  } catch (r) {}
                if ("get" in e || "set" in e)
                  throw new u("Accessors not supported");
                return "value" in e && (r[t] = e.value), r;
              };
        },
        function (r, t, e) {
          var n = e(5);
          e = e(6);
          r.exports =
            n &&
            e(function () {
              return (
                42 !==
                Object.defineProperty(function () {}, "prototype", {
                  value: 42,
                  writable: !1,
                }).prototype
              );
            });
        },
        function (r, t, e) {
          var n = e(19),
            o = String,
            a = TypeError;
          r.exports = function (r) {
            if (n(r)) return r;
            throw new a(o(r) + " is not an object");
          };
        },
        function (t, e, n) {
          var o = n(20),
            a = n(43),
            c = n(47),
            i = n(36);
          t.exports = function (t, e, n, u) {
            var f = (u = u || {}).enumerable,
              s = u.name !== r ? u.name : e;
            if ((o(n) && c(n, s, u), u.global)) f ? (t[e] = n) : i(e, n);
            else {
              try {
                u.unsafe ? t[e] && (f = !0) : delete t[e];
              } catch (t) {}
              f
                ? (t[e] = n)
                : a.f(t, e, {
                    value: n,
                    enumerable: !1,
                    configurable: !u.nonConfigurable,
                    writable: !u.nonWritable,
                  });
            }
            return t;
          };
        },
        function (t, e, n) {
          var o = n(13),
            a = n(6),
            c = n(20),
            i = n(37),
            u = n(5),
            f = n(48).CONFIGURABLE,
            s = n(49),
            p = (n = n(50)).enforce,
            l = n.get,
            y = String,
            h = Object.defineProperty,
            v = o("".slice),
            g = o("".replace),
            d = o([].join),
            b =
              u &&
              !a(function () {
                return 8 !== h(function () {}, "length", { value: 8 }).length;
              }),
            m = String(String).split("String");
          t = t.exports = function (t, e, n) {
            "Symbol(" === v(y(e), 0, 7) &&
              (e = "[" + g(y(e), /^Symbol\(([^)]*)\).*$/, "$1") + "]"),
              n && n.getter && (e = "get " + e),
              n && n.setter && (e = "set " + e),
              (!i(t, "name") || (f && t.name !== e)) &&
                (u
                  ? h(t, "name", { value: e, configurable: !0 })
                  : (t.name = e)),
              b &&
                n &&
                i(n, "arity") &&
                t.length !== n.arity &&
                h(t, "length", { value: n.arity });
            try {
              n && i(n, "constructor") && n.constructor
                ? u && h(t, "prototype", { writable: !1 })
                : t.prototype && (t.prototype = r);
            } catch (t) {}
            return (
              (n = p(t)),
              i(n, "source") ||
                (n.source = d(m, "string" == typeof e ? e : "")),
              t
            );
          };
          Function.prototype.toString = t(function () {
            return (c(this) && l(this).source) || s(this);
          }, "toString");
        },
        function (r, t, e) {
          var n = e(5),
            o = e(37),
            a = Function.prototype,
            c = n && Object.getOwnPropertyDescriptor;
          (o = (e = o(a, "name")) && "something" === function () {}.name),
            (a = e && (!n || (n && c(a, "name").configurable)));
          r.exports = { EXISTS: e, PROPER: o, CONFIGURABLE: a };
        },
        function (r, t, e) {
          var n = e(13),
            o = e(20),
            a = ((e = e(35)), n(Function.toString));
          o(e.inspectSource) ||
            (e.inspectSource = function (r) {
              return a(r);
            }),
            (r.exports = e.inspectSource);
        },
        function (r, t, e) {
          var n,
            o,
            a,
            c,
            i = e(51),
            u = e(3),
            f = e(19),
            s = e(42),
            p = e(37),
            l = e(35),
            y = e(52),
            h = ((e = e(53)), "Object already initialized"),
            v = u.TypeError,
            g =
              ((u = u.WeakMap),
              i || l.state
                ? (((a = l.state || (l.state = new u())).get = a.get),
                  (a.has = a.has),
                  (a.set = a.set),
                  (n = function (r, t) {
                    if (a.has(r)) throw new v(h);
                    return (t.facade = r), a.set(r, t), t;
                  }),
                  (o = function (r) {
                    return a.get(r) || {};
                  }),
                  function (r) {
                    return a.has(r);
                  })
                : ((e[(c = y("state"))] = !0),
                  (n = function (r, t) {
                    if (p(r, c)) throw new v(h);
                    return (t.facade = r), s(r, c, t), t;
                  }),
                  (o = function (r) {
                    return p(r, c) ? r[c] : {};
                  }),
                  function (r) {
                    return p(r, c);
                  }));
          r.exports = {
            set: n,
            get: o,
            has: g,
            enforce: function (r) {
              return g(r) ? o(r) : n(r, {});
            },
            getterFor: function (r) {
              return function (t) {
                var e;
                if (!f(t) || (e = o(t)).type !== r)
                  throw new v("Incompatible receiver, " + r + " required");
                return e;
              };
            },
          };
        },
        function (r, t, e) {
          var n = e(3);
          (e = e(20)), (n = n.WeakMap);
          r.exports = e(n) && /native code/.test(String(n));
        },
        function (r, t, e) {
          var n = e(33),
            o = e(39),
            a = n("keys");
          r.exports = function (r) {
            return a[r] || (a[r] = o(r));
          };
        },
        function (r, t, e) {
          r.exports = {};
        },
        function (r, t, e) {
          var n = e(37),
            o = e(55),
            a = e(4),
            c = e(43);
          r.exports = function (r, t, e) {
            for (var i = o(t), u = c.f, f = a.f, s = 0; s < i.length; s++) {
              var p = i[s];
              n(r, p) || (e && n(e, p)) || u(r, p, f(t, p));
            }
          };
        },
        function (r, t, e) {
          var n = e(22),
            o = e(13),
            a = e(56),
            c = e(65),
            i = e(45),
            u = o([].concat);
          r.exports =
            n("Reflect", "ownKeys") ||
            function (r) {
              var t = a.f(i(r)),
                e = c.f;
              return e ? u(t, e(r)) : t;
            };
        },
        function (r, t, e) {
          var n = e(57),
            o = e(64).concat("length", "prototype");
          t.f =
            Object.getOwnPropertyNames ||
            function (r) {
              return n(r, o);
            };
        },
        function (r, t, e) {
          var n = e(13),
            o = e(37),
            a = e(11),
            c = e(58).indexOf,
            i = e(53),
            u = n([].push);
          r.exports = function (r, t) {
            var e,
              n = a(r),
              f = 0,
              s = [];
            for (e in n) !o(i, e) && o(n, e) && u(s, e);
            for (; t.length > f; ) o(n, (e = t[f++])) && (~c(s, e) || u(s, e));
            return s;
          };
        },
        function (r, t, e) {
          var n = e(11),
            o = e(59),
            a = e(62);
          e = function (r) {
            return function (t, e, c) {
              var i,
                u = n(t),
                f = a(u),
                s = o(c, f);
              if (r && e != e) {
                for (; s < f; ) if ((i = u[s++]) != i) return !0;
              } else
                for (; s < f; s++)
                  if ((r || s in u) && u[s] === e) return r || s || 0;
              return !r && -1;
            };
          };
          r.exports = { includes: e(!0), indexOf: e(!1) };
        },
        function (r, t, e) {
          var n = e(60),
            o = Math.max,
            a = Math.min;
          r.exports = function (r, t) {
            return (r = n(r)) < 0 ? o(r + t, 0) : a(r, t);
          };
        },
        function (r, t, e) {
          var n = e(61);
          r.exports = function (r) {
            return (r = +r) != r || 0 == r ? 0 : n(r);
          };
        },
        function (r, t, e) {
          var n = Math.ceil,
            o = Math.floor;
          r.exports =
            Math.trunc ||
            function (r) {
              return (0 < (r = +r) ? o : n)(r);
            };
        },
        function (r, t, e) {
          var n = e(63);
          r.exports = function (r) {
            return n(r.length);
          };
        },
        function (r, t, e) {
          var n = e(60),
            o = Math.min;
          r.exports = function (r) {
            return 0 < (r = n(r)) ? o(r, 9007199254740991) : 0;
          };
        },
        function (r, t, e) {
          r.exports = [
            "constructor",
            "hasOwnProperty",
            "isPrototypeOf",
            "propertyIsEnumerable",
            "toLocaleString",
            "toString",
            "valueOf",
          ];
        },
        function (r, t, e) {
          t.f = Object.getOwnPropertySymbols;
        },
        function (r, t, e) {
          var n = e(6),
            o = e(20),
            a = /#|\.prototype\./,
            c =
              ((e = function (r, t) {
                return (r = i[c(r)]) === f || (r !== u && (o(t) ? n(t) : !!t));
              }),
              (e.normalize = function (r) {
                return String(r).replace(a, ".").toLowerCase();
              })),
            i = (e.data = {}),
            u = (e.NATIVE = "N"),
            f = (e.POLYFILL = "P");
          r.exports = e;
        },
        function (t, e, n) {
          var o = n(5),
            a = n(68),
            c = TypeError,
            i = Object.getOwnPropertyDescriptor;
          o =
            o &&
            !(function () {
              if (this !== r) return 1;
              try {
                Object.defineProperty([], "length", {
                  writable: !1,
                }).length = 1;
              } catch (r) {
                return r instanceof TypeError;
              }
            })();
          t.exports = o
            ? function (r, t) {
                if (a(r) && !i(r, "length").writable)
                  throw new c("Cannot set read only .length");
                return (r.length = t);
              }
            : function (r, t) {
                return (r.length = t);
              };
        },
        function (r, t, e) {
          var n = e(14);
          r.exports =
            Array.isArray ||
            function (r) {
              return "Array" === n(r);
            };
        },
        function (r, t, e) {
          var n = TypeError;
          r.exports = function (r) {
            if (9007199254740991 < r) throw n("Maximum allowed index exceeded");
            return r;
          };
        },
        function (r, t, e) {
          var n = e(2),
            o = e(71),
            a = e(11),
            c = ((e = e(72)), Array);
          n(
            { target: "Array", proto: !0 },
            {
              toReversed: function () {
                return o(a(this), c);
              },
            }
          ),
            e("toReversed");
        },
        function (r, t, e) {
          var n = e(62);
          r.exports = function (r, t) {
            for (var e = n(r), o = new t(e), a = 0; a < e; a++)
              o[a] = r[e - a - 1];
            return o;
          };
        },
        function (t, e, n) {
          var o = n(32),
            a = n(73),
            c = ((n = n(43).f), o("unscopables")),
            i = Array.prototype;
          i[c] === r && n(i, c, { configurable: !0, value: a(null) }),
            (t.exports = function (r) {
              i[c][r] = !0;
            });
        },
        function (t, e, n) {
          function o() {}
          function a(r) {
            return "<script>" + r + "</" + h + ">";
          }
          var c,
            i = n(45),
            u = n(74),
            f = n(64),
            s = n(53),
            p = n(76),
            l = n(41),
            y = ((n = n(52)), "prototype"),
            h = "script",
            v = n("IE_PROTO"),
            g = function () {
              try {
                c = new ActiveXObject("htmlfile");
              } catch (r) {}
              var r;
              g =
                "undefined" == typeof document || (document.domain && c)
                  ? (function (r) {
                      r.write(a("")), r.close();
                      var t = r.parentWindow.Object;
                      return (r = null), t;
                    })(c)
                  : (((r = l("iframe")).style.display = "none"),
                    p.appendChild(r),
                    (r.src = String("javascript:")),
                    (r = r.contentWindow.document).open(),
                    r.write(a("document.F=Object")),
                    r.close(),
                    r.F);
              for (var t = f.length; t--; ) delete g[y][f[t]];
              return g();
            };
          (s[v] = !0),
            (t.exports =
              Object.create ||
              function (t, e) {
                var n;
                return (
                  null !== t
                    ? ((o[y] = i(t)), (n = new o()), (o[y] = null), (n[v] = t))
                    : (n = g()),
                  e === r ? n : u.f(n, e)
                );
              });
        },
        function (r, t, e) {
          var n = e(5),
            o = e(44),
            a = e(43),
            c = e(45),
            i = e(11),
            u = e(75);
          t.f =
            n && !o
              ? Object.defineProperties
              : function (r, t) {
                  c(r);
                  for (var e, n = i(t), o = u(t), f = o.length, s = 0; s < f; )
                    a.f(r, (e = o[s++]), n[e]);
                  return r;
                };
        },
        function (r, t, e) {
          var n = e(57),
            o = e(64);
          r.exports =
            Object.keys ||
            function (r) {
              return n(r, o);
            };
        },
        function (r, t, e) {
          (e = e(22)), (r.exports = e("document", "documentElement"));
        },
        function (t, e, n) {
          var o = n(2),
            a = n(13),
            c = n(29),
            i = n(11),
            u = n(78),
            f = n(79),
            s = ((n = n(72)), Array),
            p = a(f("Array", "sort"));
          o(
            { target: "Array", proto: !0 },
            {
              toSorted: function (t) {
                t !== r && c(t);
                var e = i(this);
                e = u(s, e);
                return p(e, t);
              },
            }
          ),
            n("toSorted");
        },
        function (r, t, e) {
          var n = e(62);
          r.exports = function (r, t, e) {
            for (
              var o = 0, a = 2 < arguments.length ? e : n(t), c = new r(a);
              o < a;

            )
              c[o] = t[o++];
            return c;
          };
        },
        function (r, t, e) {
          var n = e(3);
          r.exports = function (r, t) {
            return (r = (r = n[r]) && r.prototype) && r[t];
          };
        },
        function (r, t, e) {
          var n = e(2),
            o = e(72),
            a = e(69),
            c = e(62),
            i = e(59),
            u = e(11),
            f = e(60),
            s = Array,
            p = Math.max,
            l = Math.min;
          n(
            { target: "Array", proto: !0 },
            {
              toSpliced: function (r, t) {
                var e,
                  n,
                  o,
                  y,
                  h = u(this),
                  v = c(h),
                  g = i(r, v),
                  d = 0;
                for (
                  0 === (r = arguments.length)
                    ? (e = n = 0)
                    : (n =
                        1 === r
                          ? ((e = 0), v - g)
                          : ((e = r - 2), l(p(f(t), 0), v - g))),
                    o = a(v + e - n),
                    y = s(o);
                  d < g;
                  d++
                )
                  y[d] = h[d];
                for (; d < g + e; d++) y[d] = arguments[d - g + 2];
                for (; d < o; d++) y[d] = h[d + n - e];
                return y;
              },
            }
          ),
            o("toSpliced");
        },
        function (r, t, e) {
          var n = e(2),
            o = e(82),
            a = e(11),
            c = Array;
          n(
            { target: "Array", proto: !0 },
            {
              with: function (r, t) {
                return o(a(this), c, r, t);
              },
            }
          );
        },
        function (r, t, e) {
          var n = e(62),
            o = e(60),
            a = RangeError;
          r.exports = function (r, t, e, c) {
            var i = n(r),
              u = (e = o(e)) < 0 ? i + e : e;
            if (i <= u || u < 0) throw new a("Incorrect index");
            for (var f = new t(i), s = 0; s < i; s++) f[s] = s === u ? c : r[s];
            return f;
          };
        },
        function (r, t, e) {
          var n = e(2),
            o = e(13),
            a = e(29),
            c = e(15),
            i = e(84),
            u = e(94),
            f = ((e = e(34)), u.Map),
            s = u.has,
            p = u.get,
            l = u.set,
            y = o([].push);
          n(
            { target: "Map", stat: !0, forced: e },
            {
              groupBy: function (r, t) {
                c(r), a(t);
                var e = new f(),
                  n = 0;
                return (
                  i(r, function (r) {
                    var o = t(r, n++);
                    s(e, o) ? y(p(e, o), r) : l(e, o, [r]);
                  }),
                  e
                );
              },
            }
          );
        },
        function (r, t, e) {
          function n(r, t) {
            (this.stopped = r), (this.result = t);
          }
          var o = e(85),
            a = e(7),
            c = e(45),
            i = e(30),
            u = e(87),
            f = e(62),
            s = e(23),
            p = e(89),
            l = e(90),
            y = e(93),
            h = TypeError,
            v = n.prototype;
          r.exports = function (r, t, e) {
            function g(r) {
              return b && y(b, "normal", r), new n(!0, r);
            }
            function d(r) {
              return S
                ? (c(r), _ ? j(r[0], r[1], g) : j(r[0], r[1]))
                : _
                ? j(r, g)
                : j(r);
            }
            var b,
              m,
              w,
              E,
              x,
              A,
              O = e && e.that,
              S = !(!e || !e.AS_ENTRIES),
              R = !(!e || !e.IS_RECORD),
              T = !(!e || !e.IS_ITERATOR),
              _ = !(!e || !e.INTERRUPTED),
              j = o(t, O);
            if (R) b = r.iterator;
            else if (T) b = r;
            else {
              if (!(T = l(r))) throw new h(i(r) + " is not iterable");
              if (u(T)) {
                for (m = 0, w = f(r); m < w; m++)
                  if ((E = d(r[m])) && s(v, E)) return E;
                return new n(!1);
              }
              b = p(r, T);
            }
            for (x = (R ? r : b).next; !(A = a(x, b)).done; ) {
              try {
                E = d(A.value);
              } catch (r) {
                y(b, "throw", r);
              }
              if ("object" == typeof E && E && s(v, E)) return E;
            }
            return new n(!1);
          };
        },
        function (t, e, n) {
          var o = n(86),
            a = n(29),
            c = n(8),
            i = o(o.bind);
          t.exports = function (t, e) {
            return (
              a(t),
              e === r
                ? t
                : c
                ? i(t, e)
                : function () {
                    return t.apply(e, arguments);
                  }
            );
          };
        },
        function (r, t, e) {
          var n = e(14),
            o = e(13);
          r.exports = function (r) {
            if ("Function" === n(r)) return o(r);
          };
        },
        function (t, e, n) {
          var o = n(32),
            a = n(88),
            c = o("iterator"),
            i = Array.prototype;
          t.exports = function (t) {
            return t !== r && (a.Array === t || i[c] === t);
          };
        },
        function (r, t, e) {
          r.exports = {};
        },
        function (r, t, e) {
          var n = e(7),
            o = e(29),
            a = e(45),
            c = e(30),
            i = e(90),
            u = TypeError;
          r.exports = function (r, t) {
            if (((t = arguments.length < 2 ? i(r) : t), o(t)))
              return a(n(t, r));
            throw new u(c(r) + " is not iterable");
          };
        },
        function (r, t, e) {
          var n = e(91),
            o = e(28),
            a = e(16),
            c = e(88),
            i = e(32)("iterator");
          r.exports = function (r) {
            if (!a(r)) return o(r, i) || o(r, "@@iterator") || c[n(r)];
          };
        },
        function (t, e, n) {
          var o = n(92),
            a = n(20),
            c = n(14),
            i = n(32)("toStringTag"),
            u = Object,
            f =
              "Arguments" ===
              c(
                (function () {
                  return arguments;
                })()
              );
          t.exports = o
            ? c
            : function (t) {
                var e;
                return t === r
                  ? "Undefined"
                  : null === t
                  ? "Null"
                  : "string" ==
                    typeof (t = (function (r, t) {
                      try {
                        return r[t];
                      } catch (r) {}
                    })((e = u(t)), i))
                  ? t
                  : f
                  ? c(e)
                  : "Object" === (t = c(e)) && a(e.callee)
                  ? "Arguments"
                  : t;
              };
        },
        function (r, t, e) {
          var n = {};
          (n[e(32)("toStringTag")] = "z"),
            (r.exports = "[object z]" === String(n));
        },
        function (r, t, e) {
          var n = e(7),
            o = e(45),
            a = e(28);
          r.exports = function (r, t, e) {
            var c, i;
            o(r);
            try {
              if (!(c = a(r, "return"))) {
                if ("throw" === t) throw e;
                return e;
              }
              c = n(c, r);
            } catch (r) {
              (i = !0), (c = r);
            }
            if ("throw" === t) throw e;
            if (i) throw c;
            return o(c), e;
          };
        },
        function (r, t, e) {
          var n = e(13);
          e = Map.prototype;
          r.exports = {
            Map,
            set: n(e.set),
            get: n(e.get),
            has: n(e.has),
            remove: n(e.delete),
            proto: e,
          };
        },
        function (r, t, e) {
          var n = e(2),
            o = e(22),
            a = e(13),
            c = e(29),
            i = e(15),
            u = e(17),
            f = e(84),
            s = o("Object", "create"),
            p = a([].push);
          n(
            { target: "Object", stat: !0 },
            {
              groupBy: function (r, t) {
                i(r), c(t);
                var e = s(null),
                  n = 0;
                return (
                  f(r, function (r) {
                    var o = u(t(r, n++));
                    o in e ? p(e[o], r) : (e[o] = [r]);
                  }),
                  e
                );
              },
            }
          );
        },
        function (r, t, e) {
          var n = e(2),
            o = e(97);
          n(
            { target: "Promise", stat: !0 },
            {
              withResolvers: function () {
                var r = o.f(this);
                return {
                  promise: r.promise,
                  resolve: r.resolve,
                  reject: r.reject,
                };
              },
            }
          );
        },
        function (t, e, n) {
          function o(t) {
            var e, n;
            (this.promise = new t(function (t, o) {
              if (e !== r || n !== r) throw new c("Bad Promise constructor");
              (e = t), (n = o);
            })),
              (this.resolve = a(e)),
              (this.reject = a(n));
          }
          var a = n(29),
            c = TypeError;
          t.exports.f = function (r) {
            return new o(r);
          };
        },
        function (r, t, e) {
          var n = e(3),
            o = e(5),
            a = e(99),
            c = e(100),
            i = ((e = e(6)), n.RegExp),
            u = i.prototype;
          o &&
            e(function () {
              var r = !0;
              try {
                i(".", "d");
              } catch (t) {
                r = !1;
              }
              var t,
                e = {},
                n = "",
                o = r ? "dgimsy" : "gimsy",
                a = {
                  dotAll: "s",
                  global: "g",
                  ignoreCase: "i",
                  multiline: "m",
                  sticky: "y",
                };
              for (t in (r && (a.hasIndices = "d"), a))
                !(function (r, t) {
                  Object.defineProperty(e, r, {
                    get: function () {
                      return (n += t), !0;
                    },
                  });
                })(t, a[t]);
              return (
                Object.getOwnPropertyDescriptor(u, "flags").get.call(e) !== o ||
                n !== o
              );
            }) &&
            a(u, "flags", { configurable: !0, get: c });
        },
        function (r, t, e) {
          var n = e(47),
            o = e(43);
          r.exports = function (r, t, e) {
            return (
              e.get && n(e.get, t, { getter: !0 }),
              e.set && n(e.set, t, { setter: !0 }),
              o.f(r, t, e)
            );
          };
        },
        function (r, t, e) {
          var n = e(45);
          r.exports = function () {
            var r = n(this),
              t = "";
            return (
              r.hasIndices && (t += "d"),
              r.global && (t += "g"),
              r.ignoreCase && (t += "i"),
              r.multiline && (t += "m"),
              r.dotAll && (t += "s"),
              r.unicode && (t += "u"),
              r.unicodeSets && (t += "v"),
              r.sticky && (t += "y"),
              t
            );
          };
        },
        function (r, t, e) {
          var n = e(2),
            o = e(13),
            a = e(15),
            c = e(102),
            i = o("".charCodeAt);
          n(
            { target: "String", proto: !0 },
            {
              isWellFormed: function () {
                for (var r = c(a(this)), t = r.length, e = 0; e < t; e++) {
                  var n = i(r, e);
                  if (
                    55296 == (63488 & n) &&
                    (56320 <= n || ++e >= t || 56320 != (64512 & i(r, e)))
                  )
                    return !1;
                }
                return !0;
              },
            }
          );
        },
        function (r, t, e) {
          var n = e(91),
            o = String;
          r.exports = function (r) {
            if ("Symbol" === n(r))
              throw new TypeError("Cannot convert a Symbol value to a string");
            return o(r);
          };
        },
        function (r, t, e) {
          var n = e(2),
            o = e(7),
            a = e(13),
            c = e(15),
            i = e(102),
            u = ((e = e(6)), Array),
            f = a("".charAt),
            s = a("".charCodeAt),
            p = a([].join),
            l = "".toWellFormed,
            y =
              l &&
              e(function () {
                return "1" !== o(l, 1);
              });
          n(
            { target: "String", proto: !0, forced: y },
            {
              toWellFormed: function () {
                var r = i(c(this));
                if (y) return o(l, r);
                for (var t = r.length, e = u(t), n = 0; n < t; n++) {
                  var a = s(r, n);
                  55296 != (63488 & a)
                    ? (e[n] = f(r, n))
                    : 56320 <= a || t <= n + 1 || 56320 != (64512 & s(r, n + 1))
                    ? (e[n] = "�")
                    : ((e[n] = f(r, n)), (e[++n] = f(r, n)));
                }
                return p(e, "");
              },
            }
          );
        },
        function (r, t, e) {
          var n = e(71),
            o = e(105),
            a = o.aTypedArray,
            c = ((e = o.exportTypedArrayMethod), o.getTypedArrayConstructor);
          e("toReversed", function () {
            return n(a(this), c(this));
          });
        },
        function (t, e, n) {
          function o(r) {
            return !!l(r) && ((r = h(r)), y(k, r) || y(C, r));
          }
          var a,
            c,
            i,
            u = n(106),
            f = n(5),
            s = n(3),
            p = n(20),
            l = n(19),
            y = n(37),
            h = n(91),
            v = n(30),
            g = n(42),
            d = n(46),
            b = n(99),
            m = n(23),
            w = n(107),
            E = n(109),
            x = n(32),
            A = n(39),
            O = (T = n(50)).enforce,
            S = T.get,
            R = (n = s.Int8Array) && n.prototype,
            T = (T = s.Uint8ClampedArray) && T.prototype,
            _ = n && w(n),
            j = R && w(R),
            I = ((n = Object.prototype), s.TypeError),
            P = ((x = x("toStringTag")), A("TYPED_ARRAY_TAG")),
            D = "TypedArrayConstructor",
            M = u && !!E && "Opera" !== h(s.opera),
            k =
              ((u = !1),
              {
                Int8Array: 1,
                Uint8Array: 1,
                Uint8ClampedArray: 1,
                Int16Array: 2,
                Uint16Array: 2,
                Int32Array: 4,
                Uint32Array: 4,
                Float32Array: 4,
                Float64Array: 8,
              }),
            C = { BigInt64Array: 8, BigUint64Array: 8 },
            U = function (r) {
              var t = w(r);
              if (l(t)) return (r = S(t)) && y(r, D) ? r[D] : U(t);
            };
          for (a in k)
            (i = (c = s[a]) && c.prototype) ? (O(i)[D] = c) : (M = !1);
          for (a in C) (i = (c = s[a]) && c.prototype) && (O(i)[D] = c);
          if (
            (!M || !p(_) || _ === Function.prototype) &&
            ((_ = function () {
              throw new I("Incorrect invocation");
            }),
            M)
          )
            for (a in k) s[a] && E(s[a], _);
          if ((!M || !j || j === n) && ((j = _.prototype), M))
            for (a in k) s[a] && E(s[a].prototype, j);
          if ((M && w(T) !== j && E(T, j), f && !y(j, x)))
            for (a in (b(j, x, {
              configurable: (u = !0),
              get: function () {
                return l(this) ? this[P] : r;
              },
            }),
            k))
              s[a] && g(s[a], P, a);
          t.exports = {
            NATIVE_ARRAY_BUFFER_VIEWS: M,
            TYPED_ARRAY_TAG: u && P,
            aTypedArray: function (r) {
              if (o(r)) return r;
              throw new I("Target is not a typed array");
            },
            aTypedArrayConstructor: function (r) {
              if (p(r) && (!E || m(_, r))) return r;
              throw new I(v(r) + " is not a typed array constructor");
            },
            exportTypedArrayMethod: function (r, t, e, n) {
              if (f) {
                if (e)
                  for (var o in k)
                    if ((o = s[o]) && y(o.prototype, r))
                      try {
                        delete o.prototype[r];
                      } catch (e) {
                        try {
                          o.prototype[r] = t;
                        } catch (e) {}
                      }
                (j[r] && !e) || d(j, r, (!e && M && R[r]) || t, n);
              }
            },
            exportTypedArrayStaticMethod: function (r, t, e) {
              var n, o;
              if (f) {
                if (E) {
                  if (e)
                    for (n in k)
                      if ((o = s[n]) && y(o, r))
                        try {
                          delete o[r];
                        } catch (r) {}
                  if (_[r] && !e) return;
                  try {
                    return d(_, r, (!e && M && _[r]) || t);
                  } catch (r) {}
                }
                for (n in k) !(o = s[n]) || (o[r] && !e) || d(o, r, t);
              }
            },
            getTypedArrayConstructor: U,
            isView: function (r) {
              return (
                !!l(r) && ("DataView" === (r = h(r)) || y(k, r) || y(C, r))
              );
            },
            isTypedArray: o,
            TypedArray: _,
            TypedArrayPrototype: j,
          };
        },
        function (r, t, e) {
          r.exports =
            "undefined" != typeof ArrayBuffer && "undefined" != typeof DataView;
        },
        function (r, t, e) {
          var n = e(37),
            o = e(20),
            a = e(38),
            c = e(52),
            i = ((e = e(108)), c("IE_PROTO")),
            u = Object,
            f = u.prototype;
          r.exports = e
            ? u.getPrototypeOf
            : function (r) {
                var t = a(r);
                return n(t, i)
                  ? t[i]
                  : ((r = t.constructor),
                    o(r) && t instanceof r
                      ? r.prototype
                      : t instanceof u
                      ? f
                      : null);
              };
        },
        function (r, t, e) {
          (e = e(6)),
            (r.exports = !e(function () {
              function r() {}
              return (
                (r.prototype.constructor = null),
                Object.getPrototypeOf(new r()) !== r.prototype
              );
            }));
        },
        function (t, e, n) {
          var o = n(110),
            a = n(45),
            c = n(111);
          t.exports =
            Object.setPrototypeOf ||
            ("__proto__" in {}
              ? (function () {
                  var r,
                    t = !1,
                    e = {};
                  try {
                    (r = o(Object.prototype, "__proto__", "set"))(e, []),
                      (t = e instanceof Array);
                  } catch (e) {}
                  return function (e, n) {
                    return a(e), c(n), t ? r(e, n) : (e.__proto__ = n), e;
                  };
                })()
              : r);
        },
        function (r, t, e) {
          var n = e(13),
            o = e(29);
          r.exports = function (r, t, e) {
            try {
              return n(o(Object.getOwnPropertyDescriptor(r, t)[e]));
            } catch (r) {}
          };
        },
        function (r, t, e) {
          var n = e(112),
            o = String,
            a = TypeError;
          r.exports = function (r) {
            if (n(r)) return r;
            throw new a("Can't set " + o(r) + " as a prototype");
          };
        },
        function (r, t, e) {
          var n = e(19);
          r.exports = function (r) {
            return n(r) || null === r;
          };
        },
        function (t, e, n) {
          var o = n(105),
            a = n(13),
            c = n(29),
            i = n(78),
            u = o.aTypedArray,
            f = o.getTypedArrayConstructor,
            s = ((n = o.exportTypedArrayMethod), a(o.TypedArrayPrototype.sort));
          n("toSorted", function (t) {
            t !== r && c(t);
            var e = u(this);
            e = i(f(e), e);
            return s(e, t);
          });
        },
        function (r, t, e) {
          var n = e(82),
            o = e(105),
            a = e(115),
            c = e(60),
            i = e(116),
            u = o.aTypedArray,
            f = o.getTypedArrayConstructor;
          (0, o.exportTypedArrayMethod)(
            "with",
            function (r, t) {
              var e = u(this);
              (r = c(r)), (t = a(e) ? i(t) : +t);
              return n(e, f(e), r, t);
            },
            !(function () {
              try {
                new Int8Array(1).with(2, {
                  valueOf: function () {
                    throw 8;
                  },
                });
              } catch (r) {
                return 8 === r;
              }
            })()
          );
        },
        function (r, t, e) {
          var n = e(91);
          r.exports = function (r) {
            return "BigInt64Array" === (r = n(r)) || "BigUint64Array" === r;
          };
        },
        function (r, t, e) {
          var n = e(18),
            o = TypeError;
          r.exports = function (r) {
            if ("number" == typeof (r = n(r, "number")))
              throw new o("Can't convert number to bigint");
            return BigInt(r);
          };
        },
        function (t, e, n) {
          var o = n(2),
            a = n(3),
            c = n(22),
            i = n(10),
            u = n(43).f,
            f = n(37),
            s = n(118),
            p = n(119),
            l = n(120),
            y = n(121),
            h = n(122),
            v = n(5),
            g = n(34),
            d = "DOMException",
            b = c("Error"),
            m = c(d),
            w = function () {
              s(this, E);
              var t = l((e = arguments.length) < 1 ? r : arguments[0]),
                e = l(e < 2 ? r : arguments[1], "Error");
              e = new m(t, e);
              return (
                ((t = new b(t)).name = d),
                u(e, "stack", i(1, h(t.stack, 1))),
                p(e, this, w),
                e
              );
            },
            E = (w.prototype = m.prototype),
            x = "stack" in new b(d);
          (n = "stack" in new m(1, 2)),
            (a = !(
              !(a = m && v && Object.getOwnPropertyDescriptor(a, d)) ||
              (a.writable && a.configurable)
            )),
            (n = x && !a && !n);
          o(
            { global: !0, constructor: !0, forced: g || n },
            { DOMException: n ? w : m }
          );
          var A,
            O = c(d);
          if ((c = O.prototype).constructor !== O)
            for (var S in (g || u(c, "constructor", i(1, O)), y))
              f(y, S) && (f(O, (S = (A = y[S]).s)) || u(O, S, i(6, A.c)));
        },
        function (r, t, e) {
          var n = e(23),
            o = TypeError;
          r.exports = function (r, t) {
            if (n(t, r)) return r;
            throw new o("Incorrect invocation");
          };
        },
        function (r, t, e) {
          var n = e(20),
            o = e(19),
            a = e(109);
          r.exports = function (r, t, e) {
            var c, i;
            return (
              a &&
                n((c = t.constructor)) &&
                c !== e &&
                o((i = c.prototype)) &&
                i !== e.prototype &&
                a(r, i),
              r
            );
          };
        },
        function (t, e, n) {
          var o = n(102);
          t.exports = function (t, e) {
            return t === r ? (arguments.length < 2 ? "" : e) : o(t);
          };
        },
        function (r, t, e) {
          r.exports = {
            IndexSizeError: { s: "INDEX_SIZE_ERR", c: 1, m: 1 },
            DOMStringSizeError: { s: "DOMSTRING_SIZE_ERR", c: 2, m: 0 },
            HierarchyRequestError: { s: "HIERARCHY_REQUEST_ERR", c: 3, m: 1 },
            WrongDocumentError: { s: "WRONG_DOCUMENT_ERR", c: 4, m: 1 },
            InvalidCharacterError: { s: "INVALID_CHARACTER_ERR", c: 5, m: 1 },
            NoDataAllowedError: { s: "NO_DATA_ALLOWED_ERR", c: 6, m: 0 },
            NoModificationAllowedError: {
              s: "NO_MODIFICATION_ALLOWED_ERR",
              c: 7,
              m: 1,
            },
            NotFoundError: { s: "NOT_FOUND_ERR", c: 8, m: 1 },
            NotSupportedError: { s: "NOT_SUPPORTED_ERR", c: 9, m: 1 },
            InUseAttributeError: { s: "INUSE_ATTRIBUTE_ERR", c: 10, m: 1 },
            InvalidStateError: { s: "INVALID_STATE_ERR", c: 11, m: 1 },
            SyntaxError: { s: "SYNTAX_ERR", c: 12, m: 1 },
            InvalidModificationError: {
              s: "INVALID_MODIFICATION_ERR",
              c: 13,
              m: 1,
            },
            NamespaceError: { s: "NAMESPACE_ERR", c: 14, m: 1 },
            InvalidAccessError: { s: "INVALID_ACCESS_ERR", c: 15, m: 1 },
            ValidationError: { s: "VALIDATION_ERR", c: 16, m: 0 },
            TypeMismatchError: { s: "TYPE_MISMATCH_ERR", c: 17, m: 1 },
            SecurityError: { s: "SECURITY_ERR", c: 18, m: 1 },
            NetworkError: { s: "NETWORK_ERR", c: 19, m: 1 },
            AbortError: { s: "ABORT_ERR", c: 20, m: 1 },
            URLMismatchError: { s: "URL_MISMATCH_ERR", c: 21, m: 1 },
            QuotaExceededError: { s: "QUOTA_EXCEEDED_ERR", c: 22, m: 1 },
            TimeoutError: { s: "TIMEOUT_ERR", c: 23, m: 1 },
            InvalidNodeTypeError: { s: "INVALID_NODE_TYPE_ERR", c: 24, m: 1 },
            DataCloneError: { s: "DATA_CLONE_ERR", c: 25, m: 1 },
          };
        },
        function (r, t, e) {
          e = e(13);
          var n = Error,
            o = e("".replace),
            a = ((e = String(new n("zxcasd").stack)), /\n\s*at [^:]*:[^\n]*/),
            c = a.test(e);
          r.exports = function (r, t) {
            if (c && "string" == typeof r && !n.prepareStackTrace)
              for (; t--; ) r = o(r, a, "");
            return r;
          };
        },
        function (t, e, n) {
          function o(r) {
            throw new z("Uncloneable type: " + r, nr);
          }
          function a(r, t) {
            throw new z(
              (t || "Cloning") +
                " of " +
                r +
                " cannot be properly polyfilled in this engine",
              nr
            );
          }
          function c(r, t) {
            return cr || a(t), cr(r);
          }
          function i(t, e, n) {
            if (G(e, t)) return Y(e, t);
            var o, c, i, u, f, s;
            if ("SharedArrayBuffer" === (n || A(t))) o = cr ? cr(t) : t;
            else {
              (n = p.DataView) || g(t.slice) || a("ArrayBuffer");
              try {
                if (g(t.slice) && !t.resizable) o = t.slice(0);
                else {
                  (c = t.byteLength),
                    (i =
                      "maxByteLength" in t
                        ? { maxByteLength: t.maxByteLength }
                        : r),
                    (o = new ArrayBuffer(c, i)),
                    (u = new n(t)),
                    (f = new n(o));
                  for (s = 0; s < c; s++) f.setUint8(s, u.getUint8(s));
                }
              } catch (t) {
                throw new z("ArrayBuffer is detached", nr);
              }
            }
            return H(e, t, o), o;
          }
          var u,
            f = n(34),
            s = n(2),
            p = n(3),
            l = n(22),
            y = n(13),
            h = n(6),
            v = n(39),
            g = n(20),
            d = n(124),
            b = n(16),
            m = n(19),
            w = n(21),
            E = n(84),
            x = n(45),
            A = n(91),
            O = n(37),
            S = n(125),
            R = n(42),
            T = n(62),
            _ = n(126),
            j = n(127),
            I = n(94),
            P = n(128),
            D = n(129),
            M = n(131),
            k = n(137),
            C = n(134),
            U = p.Object,
            L = p.Array,
            N = p.Date,
            F = p.Error,
            B = p.TypeError,
            V = p.PerformanceMark,
            z = l("DOMException"),
            W = I.Map,
            G = I.has,
            Y = I.get,
            H = I.set,
            Q = P.Set,
            X = P.add,
            q = P.has,
            K = l("Object", "keys"),
            Z = y([].push),
            $ = y((!0).valueOf),
            J = y((1).valueOf),
            rr = y("".valueOf),
            tr = y(N.prototype.getTime),
            er = v("structuredClone"),
            nr = "DataCloneError",
            or = "Transferring",
            ar =
              ((y = function (r) {
                return (
                  !h(function () {
                    var t = new p.Set([7]),
                      e = r(t),
                      n = r(U(7));
                    return e === t || !e.has(7) || !m(n) || 7 != +n;
                  }) && r
                );
              }),
              (v = function (r, t) {
                return !h(function () {
                  var e = new t(),
                    n = r({ a: e, b: e });
                  return !(
                    n &&
                    n.a === n.b &&
                    n.a instanceof t &&
                    n.a.stack === e.stack
                  );
                });
              }),
              p.structuredClone),
            cr =
              ((f =
                f ||
                !v(ar, F) ||
                !v(ar, z) ||
                ((u = ar),
                !!h(function () {
                  var r = u(new p.AggregateError([1], er, { cause: 3 }));
                  return (
                    "AggregateError" !== r.name ||
                    1 !== r.errors[0] ||
                    r.message !== er ||
                    3 !== r.cause
                  );
                }))),
              (v =
                !ar &&
                y(function (r) {
                  return new V(er, { detail: r }).detail;
                })),
              y(ar) || v),
            ir = function (t, e) {
              if ((w(t) && o("Symbol"), !m(t))) return t;
              if (e) {
                if (G(e, t)) return Y(e, t);
              } else e = new W();
              var n,
                u,
                f,
                s,
                y,
                h,
                v,
                d,
                b,
                E,
                x,
                _,
                I,
                P,
                D = A(t);
              switch (D) {
                case "Array":
                  f = L(T(t));
                  break;
                case "Object":
                  f = {};
                  break;
                case "Map":
                  f = new W();
                  break;
                case "Set":
                  f = new Q();
                  break;
                case "RegExp":
                  f = new RegExp(t.source, j(t));
                  break;
                case "Error":
                  switch ((u = t.name)) {
                    case "AggregateError":
                      f = new (l(u))([]);
                      break;
                    case "EvalError":
                    case "RangeError":
                    case "ReferenceError":
                    case "SuppressedError":
                    case "SyntaxError":
                    case "TypeError":
                    case "URIError":
                      f = new (l(u))();
                      break;
                    case "CompileError":
                    case "LinkError":
                    case "RuntimeError":
                      f = new (l("WebAssembly", u))();
                      break;
                    default:
                      f = new F();
                  }
                  break;
                case "DOMException":
                  f = new z(t.message, t.name);
                  break;
                case "ArrayBuffer":
                case "SharedArrayBuffer":
                  f = i(t, e, D);
                  break;
                case "DataView":
                case "Int8Array":
                case "Uint8Array":
                case "Uint8ClampedArray":
                case "Int16Array":
                case "Uint16Array":
                case "Int32Array":
                case "Uint32Array":
                case "Float16Array":
                case "Float32Array":
                case "Float64Array":
                case "BigInt64Array":
                case "BigUint64Array":
                  (h = "DataView" === D ? t.byteLength : t.length),
                    (E = D),
                    (x = (b = t).byteOffset),
                    (_ = h),
                    (I = e),
                    (P = p[E]),
                    m(P) || a(E),
                    (f = new P(i(b.buffer, I), x, _));
                  break;
                case "DOMQuad":
                  try {
                    f = new DOMQuad(
                      ir(t.p1, e),
                      ir(t.p2, e),
                      ir(t.p3, e),
                      ir(t.p4, e)
                    );
                  } catch (n) {
                    f = c(t, D);
                  }
                  break;
                case "File":
                  if (cr)
                    try {
                      (f = cr(t)), A(f) !== D && (f = r);
                    } catch (n) {}
                  if (!f)
                    try {
                      f = new File([t], t.name, t);
                    } catch (n) {}
                  f || a(D);
                  break;
                case "FileList":
                  if (
                    (s = (function () {
                      var r;
                      try {
                        r = new p.DataTransfer();
                      } catch (t) {
                        try {
                          r = new p.ClipboardEvent("").clipboardData;
                        } catch (r) {}
                      }
                      return r && r.items && r.files ? r : null;
                    })())
                  ) {
                    for (y = 0, h = T(t); y < h; y++) s.items.add(ir(t[y], e));
                    f = s.files;
                  } else f = c(t, D);
                  break;
                case "ImageData":
                  try {
                    f = new ImageData(ir(t.data, e), t.width, t.height, {
                      colorSpace: t.colorSpace,
                    });
                  } catch (n) {
                    f = c(t, D);
                  }
                  break;
                default:
                  if (cr) f = cr(t);
                  else
                    switch (D) {
                      case "BigInt":
                        f = U(t.valueOf());
                        break;
                      case "Boolean":
                        f = U($(t));
                        break;
                      case "Number":
                        f = U(J(t));
                        break;
                      case "String":
                        f = U(rr(t));
                        break;
                      case "Date":
                        f = new N(tr(t));
                        break;
                      case "Blob":
                        try {
                          f = t.slice(0, t.size, t.type);
                        } catch (n) {
                          a(D);
                        }
                        break;
                      case "DOMPoint":
                      case "DOMPointReadOnly":
                        n = p[D];
                        try {
                          f = n.fromPoint
                            ? n.fromPoint(t)
                            : new n(t.x, t.y, t.z, t.w);
                        } catch (n) {
                          a(D);
                        }
                        break;
                      case "DOMRect":
                      case "DOMRectReadOnly":
                        n = p[D];
                        try {
                          f = n.fromRect
                            ? n.fromRect(t)
                            : new n(t.x, t.y, t.width, t.height);
                        } catch (n) {
                          a(D);
                        }
                        break;
                      case "DOMMatrix":
                      case "DOMMatrixReadOnly":
                        n = p[D];
                        try {
                          f = n.fromMatrix ? n.fromMatrix(t) : new n(t);
                        } catch (n) {
                          a(D);
                        }
                        break;
                      case "AudioData":
                      case "VideoFrame":
                        g(t.clone) || a(D);
                        try {
                          f = t.clone();
                        } catch (n) {
                          o(D);
                        }
                        break;
                      case "CropTarget":
                      case "CryptoKey":
                      case "FileSystemDirectoryHandle":
                      case "FileSystemFileHandle":
                      case "FileSystemHandle":
                      case "GPUCompilationInfo":
                      case "GPUCompilationMessage":
                      case "ImageBitmap":
                      case "RTCCertificate":
                      case "WebAssembly.Module":
                        a(D);
                      default:
                        o(D);
                    }
              }
              switch ((H(e, t, f), D)) {
                case "Array":
                case "Object":
                  for (v = K(t), y = 0, h = T(v); y < h; y++)
                    (d = v[y]), S(f, d, ir(t[d], e));
                  break;
                case "Map":
                  t.forEach(function (r, t) {
                    H(f, ir(t, e), ir(r, e));
                  });
                  break;
                case "Set":
                  t.forEach(function (r) {
                    X(f, ir(r, e));
                  });
                  break;
                case "Error":
                  R(f, "message", ir(t.message, e)),
                    O(t, "cause") && R(f, "cause", ir(t.cause, e)),
                    "AggregateError" === u
                      ? (f.errors = ir(t.errors, e))
                      : "SuppressedError" === u &&
                        ((f.error = ir(t.error, e)),
                        (f.suppressed = ir(t.suppressed, e)));
                case "DOMException":
                  k && R(f, "stack", ir(t.stack, e));
              }
              return f;
            };
          s(
            { global: !0, enumerable: !0, sham: !C, forced: f },
            {
              structuredClone: function (t) {
                var e, n;
                (n = (n =
                  1 < _(arguments.length, 1) && !b(arguments[1])
                    ? x(arguments[1])
                    : r)
                  ? n.transfer
                  : r) !== r &&
                  (e = (function (t, e) {
                    if (!m(t))
                      throw new B(
                        "Transfer option cannot be converted to a sequence"
                      );
                    var n = [];
                    E(t, function (r) {
                      Z(n, x(r));
                    });
                    for (
                      var o, c, i, u, f, s = 0, l = T(n), y = new Q();
                      s < l;

                    ) {
                      if (
                        ((o = n[s++]),
                        "ArrayBuffer" === (c = A(o)) ? q(y, o) : G(e, o))
                      )
                        throw new z("Duplicate transferable", nr);
                      if ("ArrayBuffer" !== c) {
                        if (C) u = ar(o, { transfer: [o] });
                        else
                          switch (c) {
                            case "ImageBitmap":
                              (i = p.OffscreenCanvas), d(i) || a(c, or);
                              try {
                                (f = new i(o.width, o.height))
                                  .getContext("bitmaprenderer")
                                  .transferFromImageBitmap(o),
                                  (u = f.transferToImageBitmap());
                              } catch (t) {}
                              break;
                            case "AudioData":
                            case "VideoFrame":
                              (g(o.clone) && g(o.close)) || a(c, or);
                              try {
                                (u = o.clone()), o.close();
                              } catch (t) {}
                              break;
                            case "MediaSourceHandle":
                            case "MessagePort":
                            case "OffscreenCanvas":
                            case "ReadableStream":
                            case "TransformStream":
                            case "WritableStream":
                              a(c, or);
                          }
                        if (u === r)
                          throw new z(
                            "This object cannot be transferred: " + c,
                            nr
                          );
                        H(e, o, u);
                      } else X(y, o);
                    }
                    return y;
                  })(n, (o = new W())));
                var o = ir(t, o);
                return (
                  e &&
                    D(e, function (r) {
                      C
                        ? cr(r, { transfer: [r] })
                        : g(r.transfer)
                        ? r.transfer()
                        : M
                        ? M(r)
                        : a("ArrayBuffer", or);
                    }),
                  o
                );
              },
            }
          );
        },
        function (r, t, e) {
          function n() {}
          function o(r) {
            if (!i(r)) return !1;
            try {
              return p(n, [], r), !0;
            } catch (r) {
              return !1;
            }
          }
          var a = e(13),
            c = e(6),
            i = e(20),
            u = e(91),
            f = e(22),
            s = e(49),
            p = f("Reflect", "construct"),
            l = /^\s*(?:class|function)\b/,
            y = a(l.exec),
            h = !l.test(n);
          a = function (r) {
            if (!i(r)) return !1;
            switch (u(r)) {
              case "AsyncFunction":
              case "GeneratorFunction":
              case "AsyncGeneratorFunction":
                return !1;
            }
            try {
              return h || !!y(l, s(r));
            } catch (r) {
              return !0;
            }
          };
          (a.sham = !0),
            (r.exports =
              !p ||
              c(function () {
                var r;
                return (
                  o(o.call) ||
                  !o(Object) ||
                  !o(function () {
                    r = !0;
                  }) ||
                  r
                );
              })
                ? a
                : o);
        },
        function (r, t, e) {
          var n = e(17),
            o = e(43),
            a = e(10);
          r.exports = function (r, t, e) {
            (t = n(t)) in r ? o.f(r, t, a(0, e)) : (r[t] = e);
          };
        },
        function (r, t, e) {
          var n = TypeError;
          r.exports = function (r, t) {
            if (r < t) throw new n("Not enough arguments");
            return r;
          };
        },
        function (t, e, n) {
          var o = n(7),
            a = n(37),
            c = n(23),
            i = n(100),
            u = RegExp.prototype;
          t.exports = function (t) {
            var e = t.flags;
            return e !== r || "flags" in u || a(t, "flags") || !c(u, t)
              ? e
              : o(i, t);
          };
        },
        function (r, t, e) {
          var n = e(13);
          e = Set.prototype;
          r.exports = {
            Set,
            add: n(e.add),
            has: n(e.has),
            remove: n(e.delete),
            proto: e,
          };
        },
        function (r, t, e) {
          var n,
            o = e(13),
            a = e(130),
            c = ((e = (n = e(128)).Set), o((n = n.proto).forEach)),
            i = o(n.keys),
            u = i(new e()).next;
          r.exports = function (r, t, e) {
            return e ? a({ iterator: i(r), next: u }, t) : c(r, t);
          };
        },
        function (t, e, n) {
          var o = n(7);
          t.exports = function (t, e, n) {
            for (
              var a, c = n ? t : t.iterator, i = t.next;
              !(a = o(i, c)).done;

            )
              if ((a = e(a.value)) !== r) return a;
          };
        },
        function (r, t, e) {
          var n,
            o,
            a,
            c,
            i = e(3),
            u = e(132),
            f = e(134),
            s = i.structuredClone,
            p = i.ArrayBuffer;
          (e = i.MessageChannel), (i = !1);
          if (f)
            i = function (r) {
              s(r, { transfer: [r] });
            };
          else if (p)
            try {
              e || ((n = u("worker_threads")) && (e = n.MessageChannel)),
                e &&
                  ((o = new e()),
                  (a = new p(2)),
                  (c = function (r) {
                    o.port1.postMessage(null, [r]);
                  }),
                  2 === a.byteLength && (c(a), 0 === a.byteLength && (i = c)));
            } catch (r) {}
          r.exports = i;
        },
        function (r, t, e) {
          var n = e(133);
          r.exports = function (r) {
            try {
              if (n) return Function('return require("' + r + '")')();
            } catch (r) {}
          };
        },
        function (r, t, e) {
          var n = e(3);
          e = e(14);
          r.exports = "process" === e(n.process);
        },
        function (r, t, e) {
          var n = e(3),
            o = e(6),
            a = e(26),
            c = e(135),
            i = e(136),
            u = e(133),
            f = n.structuredClone;
          r.exports =
            !!f &&
            !o(function () {
              if ((i && 92 < a) || (u && 94 < a) || (c && 97 < a)) return !1;
              var r = new ArrayBuffer(8),
                t = f(r, { transfer: [r] });
              return 0 !== r.byteLength || 8 !== t.byteLength;
            });
        },
        function (r, t, e) {
          var n = e(136);
          e = e(133);
          r.exports =
            !n &&
            !e &&
            "object" == typeof window &&
            "object" == typeof document;
        },
        function (r, t, e) {
          r.exports =
            "object" == typeof Deno && Deno && "object" == typeof Deno.version;
        },
        function (r, t, e) {
          var n = e(6),
            o = e(10);
          r.exports = !n(function () {
            var r = new Error("a");
            return (
              !("stack" in r) ||
              (Object.defineProperty(r, "stack", o(1, 7)), 7 !== r.stack)
            );
          });
        },
        function (t, e, n) {
          var o = n(2),
            a = n(22),
            c = n(6),
            i = n(126),
            u = n(102),
            f = ((n = n(139)), a("URL"));
          o(
            {
              target: "URL",
              stat: !0,
              forced: !(
                n &&
                c(function () {
                  f.canParse();
                })
              ),
            },
            {
              canParse: function (t) {
                var e = i(arguments.length, 1);
                (t = u(t)),
                  (e = e < 2 || arguments[1] === r ? r : u(arguments[1]));
                try {
                  return !!new f(t, e);
                } catch (t) {
                  return !1;
                }
              },
            }
          );
        },
        function (t, e, n) {
          var o = n(6),
            a = n(32),
            c = n(5),
            i = n(34),
            u = a("iterator");
          t.exports = !o(function () {
            var t = new URL("b?a=1&b=2&c=3", "http://a"),
              e = t.searchParams,
              n = new URLSearchParams("a=1&a=2&b=3"),
              o = "";
            return (
              (t.pathname = "c%20d"),
              e.forEach(function (r, t) {
                e.delete("b"), (o += t + r);
              }),
              n.delete("a", 2),
              n.delete("b", r),
              (i &&
                (!t.toJSON ||
                  !n.has("a", 1) ||
                  n.has("a", 2) ||
                  !n.has("a", r) ||
                  n.has("b"))) ||
                (!e.size && (i || !c)) ||
                !e.sort ||
                "http://a/c%20d?a=1&c=3" !== t.href ||
                "3" !== e.get("c") ||
                "a=1" !== String(new URLSearchParams("?a=1")) ||
                !e[u] ||
                "a" !== new URL("https://a@b").username ||
                "b" !==
                  new URLSearchParams(new URLSearchParams("a=b")).get("a") ||
                "xn--e1aybc" !== new URL("http://тест").host ||
                "#%D0%B1" !== new URL("http://a#б").hash ||
                "a1c3" !== o ||
                "x" !== new URL("http://x", r).host
            );
          });
        },
        function (t, e, n) {
          var o,
            a = n(46),
            c = n(13),
            i = n(102),
            u = n(126),
            f = c((n = (o = URLSearchParams).prototype).append),
            s = c(n.delete),
            p = c(n.forEach),
            l = c([].push);
          (o = new o("a=1&a=2&b=3")).delete("a", 1),
            o.delete("b", r),
            o + "" != "a=2" &&
              a(
                n,
                "delete",
                function (t) {
                  var e = arguments.length,
                    n = e < 2 ? r : arguments[1];
                  if (e && n === r) return s(this, t);
                  var o = [];
                  p(this, function (r, t) {
                    l(o, { key: t, value: r });
                  }),
                    u(e, 1);
                  for (
                    var a,
                      c = i(t),
                      y = i(n),
                      h = 0,
                      v = 0,
                      g = !1,
                      d = o.length;
                    h < d;

                  )
                    (a = o[h++]),
                      g || a.key === c ? ((g = !0), s(this, a.key)) : v++;
                  for (; v < d; )
                    ((a = o[v++]).key === c && a.value === y) ||
                      f(this, a.key, a.value);
                },
                { enumerable: !0, unsafe: !0 }
              );
        },
        function (t, e, n) {
          var o,
            a = n(46),
            c = n(13),
            i = n(102),
            u = n(126),
            f = c((n = (o = URLSearchParams).prototype).getAll),
            s = c(n.has);
          (!(o = new o("a=1")).has("a", 2) && o.has("a", r)) ||
            a(
              n,
              "has",
              function (t) {
                var e = arguments.length,
                  n = e < 2 ? r : arguments[1];
                if (e && n === r) return s(this, t);
                var o = f(this, t);
                u(e, 1);
                for (var a = i(n), c = 0; c < o.length; )
                  if (o[c++] === a) return !0;
                return !1;
              },
              { enumerable: !0, unsafe: !0 }
            );
        },
        function (r, t, e) {
          var n = e(5),
            o = e(13),
            a = e(99),
            c = o((e = URLSearchParams.prototype).forEach);
          !n ||
            "size" in e ||
            a(e, "size", {
              get: function () {
                var r = 0;
                return (
                  c(this, function () {
                    r++;
                  }),
                  r
                );
              },
              configurable: !0,
              enumerable: !0,
            });
        },
      ]),
    (n.c = e),
    (n.d = function (r, t, e) {
      n.o(r, t) || Object.defineProperty(r, t, { enumerable: !0, get: e });
    }),
    (n.r = function (r) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(r, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(r, "__esModule", { value: !0 });
    }),
    (n.t = function (r, t) {
      if ((1 & t && (r = n(r)), 8 & t)) return r;
      if (4 & t && "object" == typeof r && r && r.__esModule) return r;
      var e = Object.create(null);
      if (
        (n.r(e),
        Object.defineProperty(e, "default", { enumerable: !0, value: r }),
        2 & t && "string" != typeof r)
      )
        for (var o in r)
          n.d(
            e,
            o,
            function (t) {
              return r[t];
            }.bind(null, o)
          );
      return e;
    }),
    (n.n = function (r) {
      var t =
        r && r.__esModule
          ? function () {
              return r.default;
            }
          : function () {
              return r;
            };
      return n.d(t, "a", t), t;
    }),
    (n.o = function (r, t) {
      return Object.prototype.hasOwnProperty.call(r, t);
    }),
    (n.p = ""),
    n((n.s = 0));
})();
