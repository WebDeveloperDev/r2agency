(function () {
  if (window.WPCOM_Proxy_Request) {
    return;
  }
  var e = function () {
    this._done = [];
    this._fail = [];
  };
  e.prototype = {
    execute: function (e, t) {
      var r = e.length;
      t = Array.prototype.slice.call(t);
      while (r--) e[r].apply(null, t);
    },
    resolve: function () {
      this.execute(this._done, arguments);
    },
    reject: function () {
      this.execute(this._fail, arguments);
    },
    done: function (e) {
      this._done.push(e);
      return this;
    },
    fail: function (e) {
      this._fail.push(e);
      return this;
    },
    promise: function () {
      var e = {};
      e.done = this.done.bind(this);
      e.fail = this.fail.bind(this);
      return e;
    },
  };
  var t = function (e) {
    e = e || {};
    for (var t = 1; t < arguments.length; t++) {
      if (!arguments[t]) continue;
      for (var r in arguments[t]) {
        if (arguments[t].hasOwnProperty(r)) e[r] = arguments[t][r];
      }
    }
    return e;
  };
  var r,
    n = window.location.protocol + "//" + window.location.hostname,
    o = "https://public-api.wordpress.com",
    s = false,
    a = true,
    f = false,
    l = true,
    u = [],
    d = {},
    p = {},
    c = false,
    h = function (e) {
      l = "object" === typeof e.data;
      window.removeEventListener("message", h);
      w();
    },
    w = function () {
      if (!f) {
        window.addEventListener("message", m);
      } else {
        pm.bind("proxy", function (e) {
          m(e);
        });
      }
      r = document.createElement("iframe");
      r.src = "https://public-api.wordpress.com/wp-admin/rest-proxy/#" + n;
      r.style.display = "none";
      r.addEventListener("load", function () {
        var e;
        s = true;
        while ((e = u.shift())) {
          _(e);
        }
      });
      var e = function () {
        document.body.appendChild(r);
      };
      if (
        document.readyState === "complete" ||
        document.readyState !== "loading"
      ) {
        e();
      } else {
        document.addEventListener("DOMContentLoaded", e);
      }
    },
    m = function (e) {
      var t, r, n, s;
      if (!f) {
        if (e.origin !== o) {
          return;
        }
        t = l ? e.data : JSON.parse(e.data);
      } else {
        t = e;
      }
      if (!t || !t.length) {
        return;
      }
      r = t[t.length - 1];
      if ("undefined" === typeof d[r]) {
        return;
      }
      n = d[r];
      delete d[r];
      s = p[r];
      if (s) {
        n.resolveWith.call(n, s, t.slice(0, -1));
        delete p[r];
      } else {
        n.resolve.apply(n, t.slice(0, -1));
      }
    },
    y = function () {
      var e = x.apply(null, arguments);
      _(e);
      return d[e.callback].promise();
    },
    v = function () {
      var e = x.apply(null, arguments);
      u.push(e);
      return d[e.callback].promise();
    },
    _ = function (e) {
      var t = b(e),
        r = l ? e : JSON.stringify(e);
      if (c && t.has_files) {
        q(e, t);
      } else {
        try {
          g(r);
        } catch (r) {
          if (t.has_files) {
            c = true;
            q(e, t);
          } else {
            throw r;
          }
        }
      }
    },
    g = function (e) {
      if (!f) {
        r.contentWindow.postMessage(e, o);
      } else if (window.pm) {
        pm({
          data: e,
          type: "proxy",
          target: r.contentWindow,
          url: "https://public-api.wordpress.com/wp-admin/rest-proxy/#" + n,
          origin: o,
        });
      }
    },
    q = function (e, t) {
      if (!t.has_files) return;
      for (i = 0; i < t.file_keys.length; ++i) {
        var n = new FileReader(),
          s = e.formData[i][0],
          a = e.formData[i][1];
        n.onload = function (t) {
          e.formData[i] = [
            s,
            {
              fileContents: t.target.result,
              fileName: a.name,
              mimeType: a.type,
            },
          ];
          var n = b(e);
          if (!n.has_files) {
            r.contentWindow.postMessage(e, o);
          }
        };
        n.readAsArrayBuffer(a);
      }
    },
    b = function (e) {
      var t = { has_files: false, file_keys: [] };
      if (!l || !e.formData || e.formData.length <= 0) return t;
      for (i = 0; i < e.formData.length; i++) {
        var r = e.formData[i];
        var n = r[1];
        if (
          "object" == typeof n &&
          "[object File]" == Object.prototype.toString.call(n)
        ) {
          t.has_files = true;
          t.file_keys.push(i);
        }
      }
      return t;
    },
    x = function () {
      var r = [].slice.call(arguments);
      (request = r.pop()),
        (path = r.pop()),
        (deferred = new e()),
        (deferred_id = Math.random());
      if ("function" === typeof request) {
        deferred.done(request);
        request = path;
        path = r.pop();
      }
      if ("string" === typeof request) {
        request = { path: request };
      }
      if (path) {
        request.path = path;
      }
      d[deferred_id] = deferred;
      if (request.context) {
        p[deferred_id] = request.context;
        request = t({}, request);
        delete request.context;
      }
      request.callback = deferred_id;
      request.supports_args = true;
      return request;
    };
  if (["function", "object"].indexOf(typeof window.postMessage) >= 0) {
    window.addEventListener("message", h);
    window.postMessage({}, n);
  } else if (window.pm) {
    f = true;
    w();
  } else {
    a = false;
  }
  window.WPCOM_Proxy_Request = function () {
    if (!a) {
      throw "Browser does not support window.postMessage";
    }
    if (s) {
      return y.apply(null, arguments);
    } else {
      return v.apply(null, arguments);
    }
  };
  window.WPCOM_Proxy_Rebuild = function () {
    if (!s) return;
    s = false;
    r.parentNode.removeChild(r);
    w();
  };
})();
