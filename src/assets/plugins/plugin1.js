!(function(n, e) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = e(
        require('ng.common'),
        require('shared'),
        require('ng.core')
      ))
    : 'function' == typeof define && define.amd
    ? define(['ng.common', 'shared', 'ng.core'], e)
    : 'object' == typeof exports
    ? (exports.plugin1 = e(
        require('ng.common'),
        require('shared'),
        require('ng.core')
      ))
    : (n.plugin1 = e(n['ng.common'], n.shared, n['ng.core']));
})('undefined' != typeof self ? self : this, function(n, e, l) {
  return (function(n) {
    var e = {};
    function l(t) {
      if (e[t]) return e[t].exports;
      var u = (e[t] = { i: t, l: !1, exports: {} });
      return n[t].call(u.exports, u, u.exports, l), (u.l = !0), u.exports;
    }
    return (
      (l.m = n),
      (l.c = e),
      (l.d = function(n, e, t) {
        l.o(n, e) || Object.defineProperty(n, e, { enumerable: !0, get: t });
      }),
      (l.r = function(n) {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(n, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(n, '__esModule', { value: !0 });
      }),
      (l.t = function(n, e) {
        if ((1 & e && (n = l(n)), 8 & e)) return n;
        if (4 & e && 'object' == typeof n && n && n.__esModule) return n;
        var t = Object.create(null);
        if (
          (l.r(t),
          Object.defineProperty(t, 'default', { enumerable: !0, value: n }),
          2 & e && 'string' != typeof n)
        )
          for (var u in n)
            l.d(
              t,
              u,
              function(e) {
                return n[e];
              }.bind(null, u)
            );
        return t;
      }),
      (l.n = function(n) {
        var e =
          n && n.__esModule
            ? function() {
                return n.default;
              }
            : function() {
                return n;
              };
        return l.d(e, 'a', e), e;
      }),
      (l.o = function(n, e) {
        return Object.prototype.hasOwnProperty.call(n, e);
      }),
      (l.p = ''),
      l((l.s = 0))
    );
  })({
    0: function(n, e, l) {
      n.exports = l('zUnb');
    },
    '0S4P': function(e, l) {
      e.exports = n;
    },
    cfyg: function(n, l) {
      n.exports = e;
    },
    vOrQ: function(n, e) {
      n.exports = l;
    },
    zUnb: function(n, e, l) {
      'use strict';
      l.r(e);
      var t = (function() {
          return function() {
            this.x = !1;
          };
        })(),
        u = (function() {
          function n() {}
          return (n.entry = t), n;
        })(),
        o = l('vOrQ'),
        r = l('0S4P'),
        i = l('cfyg'),
        d = o['\u0275crt']({ encapsulation: 2, styles: [], data: {} });
      function c(n) {
        return o['\u0275vid'](
          0,
          [
            (n()(),
            o['\u0275eld'](
              0,
              0,
              null,
              null,
              1,
              'p',
              [],
              null,
              null,
              null,
              null,
              null
            )),
            (n()(), o['\u0275ted'](-1, null, ['Hidden text']))
          ],
          null,
          null
        );
      }
      function a(n) {
        return o['\u0275vid'](
          0,
          [
            (n()(),
            o['\u0275eld'](
              0,
              0,
              null,
              null,
              1,
              'h3',
              [],
              null,
              null,
              null,
              null,
              null
            )),
            (n()(), o['\u0275ted'](-1, null, ['Plugin 1'])),
            (n()(), o['\u0275and'](16777216, null, null, 1, null, c)),
            o['\u0275did'](
              3,
              16384,
              null,
              0,
              r.NgIf,
              [o.ViewContainerRef, o.TemplateRef],
              { ngIf: [0, 'ngIf'] },
              null
            ),
            (n()(),
            o['\u0275eld'](
              4,
              0,
              null,
              null,
              2,
              'button',
              [['sharedBtn', '']],
              null,
              [[null, 'click']],
              function(n, e, l) {
                var t = !0,
                  u = n.component;
                return 'click' === e && (t = 0 != (u.x = !u.x) && t), t;
              },
              i['View_\u0275a_0'],
              i['RenderType_\u0275a']
            )),
            o['\u0275did'](5, 49152, null, 0, i['\u0275a'], [], null, null),
            (n()(), o['\u0275ted'](-1, 0, ['Shared Button Example'])),
            (n()(),
            o['\u0275eld'](
              7,
              0,
              null,
              null,
              10,
              'shared-tabs',
              [],
              null,
              null,
              null,
              i['View_\u0275c_0'],
              i['RenderType_\u0275c']
            )),
            o['\u0275did'](8, 49152, null, 0, i['\u0275c'], [], null, null),
            (n()(),
            o['\u0275eld'](
              9,
              0,
              null,
              0,
              2,
              'shared-tab',
              [['title', 'Tab 1']],
              [[8, 'hidden', 0]],
              null,
              null,
              i['View_\u0275b_0'],
              i['RenderType_\u0275b']
            )),
            o['\u0275did'](
              10,
              49152,
              null,
              0,
              i['\u0275b'],
              [i['\u0275c']],
              { title: [0, 'title'] },
              null
            ),
            (n()(), o['\u0275ted'](-1, 0, [' Tab 1 contents '])),
            (n()(),
            o['\u0275eld'](
              12,
              0,
              null,
              0,
              2,
              'shared-tab',
              [['title', 'Tab 2']],
              [[8, 'hidden', 0]],
              null,
              null,
              i['View_\u0275b_0'],
              i['RenderType_\u0275b']
            )),
            o['\u0275did'](
              13,
              49152,
              null,
              0,
              i['\u0275b'],
              [i['\u0275c']],
              { title: [0, 'title'] },
              null
            ),
            (n()(), o['\u0275ted'](-1, 0, [' Tab 2 contents '])),
            (n()(),
            o['\u0275eld'](
              15,
              0,
              null,
              0,
              2,
              'shared-tab',
              [['title', 'Tab 3']],
              [[8, 'hidden', 0]],
              null,
              null,
              i['View_\u0275b_0'],
              i['RenderType_\u0275b']
            )),
            o['\u0275did'](
              16,
              49152,
              null,
              0,
              i['\u0275b'],
              [i['\u0275c']],
              { title: [0, 'title'] },
              null
            ),
            (n()(), o['\u0275ted'](-1, 0, [' Tab 3 contents ']))
          ],
          function(n, e) {
            n(e, 3, 0, e.component.x),
              n(e, 10, 0, 'Tab 1'),
              n(e, 13, 0, 'Tab 2'),
              n(e, 16, 0, 'Tab 3');
          },
          function(n, e) {
            n(e, 9, 0, o['\u0275nov'](e, 10).hidden),
              n(e, 12, 0, o['\u0275nov'](e, 13).hidden),
              n(e, 15, 0, o['\u0275nov'](e, 16).hidden);
          }
        );
      }
      function f(n) {
        return o['\u0275vid'](
          0,
          [
            (n()(),
            o['\u0275eld'](
              0,
              0,
              null,
              null,
              1,
              'app-plugin-1',
              [],
              null,
              null,
              null,
              a,
              d
            )),
            o['\u0275did'](1, 49152, null, 0, t, [], null, null)
          ],
          null,
          null
        );
      }
      var p = o['\u0275ccf']('app-plugin-1', t, f, {}, {}, []),
        s = o['\u0275cmf'](u, [], function(n) {
          return o['\u0275mod']([
            o['\u0275mpd'](
              512,
              o.ComponentFactoryResolver,
              o['\u0275CodegenComponentFactoryResolver'],
              [[8, [p]], [3, o.ComponentFactoryResolver], o.NgModuleRef]
            ),
            o['\u0275mpd'](4608, r.NgLocalization, r.NgLocaleLocalization, [
              o.LOCALE_ID,
              [2, r['\u0275angular_packages_common_common_a']]
            ]),
            o['\u0275mpd'](1073742336, r.CommonModule, r.CommonModule, []),
            o['\u0275mpd'](1073742336, i.SharedModule, i.SharedModule, []),
            o['\u0275mpd'](1073742336, u, u, [])
          ]);
        });
      l.d(e, 'Plugin1Module', function() {
        return u;
      }),
        l.d(e, 'Plugin1ModuleNgFactory', function() {
          return s;
        }),
        (e.default = s);
    }
  });
});
