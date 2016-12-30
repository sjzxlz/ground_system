/*
 Leaflet.contextmenu, a context menu for Leaflet.
 (c) 2014, Adam Ratcliffe, GeoSmart Maps Limited

 @preserve
 */
(function (t) {
    var e;
    if (typeof define === "function" && define.amd) {
        define(["leaflet"], t)
    } else if (typeof module !== "undefined") {
        e = require("leaflet");
        module.exports = t(e)
    } else {
        if (typeof window.L === "undefined") {
            throw new Error("Leaflet must be loaded first")
        }
        t(window.L)
    }
})(function (t) {
    t.Map.mergeOptions({contextmenuItems: []});
    t.Map.ContextMenu = t.Handler.extend({
        _touchstart: t.Browser.msPointer ? "MSPointerDown" : t.Browser.pointer ? "pointerdown" : "touchstart",
        statics: {BASE_CLS: "leaflet-contextmenu"},
        initialize: function (e) {
            t.Handler.prototype.initialize.call(this, e);
            this._items = [];
            this._visible = false;
            var n = this._container = t.DomUtil.create("div", t.Map.ContextMenu.BASE_CLS, e._container);
            n.style.zIndex = 1e4;
            n.style.position = "absolute";
            if (e.options.contextmenuWidth) {
                n.style.width = e.options.contextmenuWidth + "px"
            }
            this._createItems();
            t.DomEvent.on(n, "click", t.DomEvent.stop).on(n, "mousedown", t.DomEvent.stop).on(n, "dblclick", t.DomEvent.stop).on(n, "contextmenu", t.DomEvent.stop)
        },
        addHooks: function () {
            t.DomEvent.on(document, t.Browser.touch ? this._touchstart : "mousedown", this._onMouseDown, this).on(document, "keydown", this._onKeyDown, this);
            this._map.on({
                contextmenu: this._show,
                mouseout: this._hide,
                mousedown: this._hide,
                movestart: this._hide,
                zoomstart: this._hide
            }, this)
        },
        removeHooks: function () {
            t.DomEvent.off(document, t.Browser.touch ? this._touchstart : "mousedown", this._onMouseDown, this).off(document, "keydown", this._onKeyDown, this);
            this._map.off({
                contextmenu: this._show,
                mouseout: this._hide,
                mousedown: this._hide,
                movestart: this._hide,
                zoomstart: this._hide
            }, this)
        },
        showAt: function (e, n) {
            if (e instanceof t.LatLng) {
                e = this._map.latLngToContainerPoint(e)
            }
            this._showAtPoint(e, n)
        },
        hide: function () {
            this._hide()
        },
        addItem: function (t) {
            return this.insertItem(t)
        },
        insertItem: function (t, e) {
            e = e !== undefined ? e : this._items.length;
            var n = this._createItem(this._container, t, e);
            this._items.push(n);
            this._sizeChanged = true;
            this._map.fire("contextmenu.additem", {contextmenu: this, el: n.el, index: e});
            return n.el
        },
        removeItem: function (e) {
            var n = this._container;
            if (!isNaN(e)) {
                e = n.children[e]
            }
            if (e) {
                this._removeItem(t.Util.stamp(e));
                this._sizeChanged = true;
                this._map.fire("contextmenu.removeitem", {contextmenu: this, el: e})
            }
        },
        removeAllItems: function () {
            var e;
            while (this._container.children.length) {
                e = this._container.children[0];
                this._removeItem(t.Util.stamp(e))
            }
        },
        hideAllItems: function () {
            var t, e, n;
            for (e = 0, n = this._items.length; e < n; e++) {
                t = this._items[e];
                t.el.style.display = "none"
            }
        },
        showAllItems: function () {
            var t, e, n;
            for (e = 0, n = this._items.length; e < n; e++) {
                t = this._items[e];
                t.el.style.display = ""
            }
        },
        setDisabled: function (e, n) {
            var i = this._container, o = t.Map.ContextMenu.BASE_CLS + "-item";
            if (!isNaN(e)) {
                e = i.children[e]
            }
            if (e && t.DomUtil.hasClass(e, o)) {
                if (n) {
                    t.DomUtil.addClass(e, o + "-disabled");
                    this._map.fire("contextmenu.disableitem", {contextmenu: this, el: e})
                } else {
                    t.DomUtil.removeClass(e, o + "-disabled");
                    this._map.fire("contextmenu.enableitem", {contextmenu: this, el: e})
                }
            }
        },
        isVisible: function () {
            return this._visible
        },
        _createItems: function () {
            var t = this._map.options.contextmenuItems, e, n, i;
            for (n = 0, i = t.length; n < i; n++) {
                this._items.push(this._createItem(this._container, t[n]))
            }
        },
        _createItem: function (e, n, i) {
            if (n.separator || n === "-") {
                return this._createSeparator(e, i)
            }
            var o = t.Map.ContextMenu.BASE_CLS + "-item", s = n.disabled ? o + " " + o + "-disabled" : o, h = this._insertElementAt("a", s, e, i), a = this._createEventHandler(h, n.callback, n.context, n.hideOnSelect), m = "";
            if (n.icon) {
                m = '<img class="' + t.Map.ContextMenu.BASE_CLS + '-icon" src="' + n.icon + '"/>'
            } else if (n.iconCls) {
                m = '<span class="' + t.Map.ContextMenu.BASE_CLS + "-icon " + n.iconCls + '"></span>'
            }
            h.innerHTML = m + n.text;
            h.href = "#";
            t.DomEvent.on(h, "mouseover", this._onItemMouseOver, this).on(h, "mouseout", this._onItemMouseOut, this).on(h, "mousedown", t.DomEvent.stopPropagation).on(h, "click", a);
            return {id: t.Util.stamp(h), el: h, callback: a}
        },
        _removeItem: function (e) {
            var n, i, o, s;
            for (o = 0, s = this._items.length; o < s; o++) {
                n = this._items[o];
                if (n.id === e) {
                    i = n.el;
                    callback = n.callback;
                    if (callback) {
                        t.DomEvent.off(i, "mouseover", this._onItemMouseOver, this).off(i, "mouseover", this._onItemMouseOut, this).off(i, "mousedown", t.DomEvent.stopPropagation).off(i, "click", n.callback)
                    }
                    this._container.removeChild(i);
                    this._items.splice(o, 1);
                    return n
                }
            }
            return null
        },
        _createSeparator: function (e, n) {
            var i = this._insertElementAt("div", t.Map.ContextMenu.BASE_CLS + "-separator", e, n);
            return {id: t.Util.stamp(i), el: i}
        },
        _createEventHandler: function (e, n, i, o) {
            var s = this, h = this._map, a = t.Map.ContextMenu.BASE_CLS + "-item-disabled", o = o !== undefined ? o : true;
            return function (m) {
                if (t.DomUtil.hasClass(e, a)) {
                    return
                }
                if (o) {
                    s._hide()
                }
                if (n) {
                    n.call(i || h, s._showLocation)
                }
                s._map.fire("contextmenu:select", {contextmenu: s, el: e})
            }
        },
        _insertElementAt: function (t, e, n, i) {
            var o, s = document.createElement(t);
            s.className = e;
            if (i !== undefined) {
                o = n.children[i]
            }
            if (o) {
                n.insertBefore(s, o)
            } else {
                n.appendChild(s)
            }
            return s
        },
        _show: function (t) {
            this._showAtPoint(t.containerPoint)
        },
        _showAtPoint: function (e, n) {
            if (this._items.length) {
                var i = this._map, o = i.containerPointToLayerPoint(e), s = i.layerPointToLatLng(o), h = {contextmenu: this};
                if (n) {
                    h = t.extend(n, h)
                }
                this._showLocation = {latlng: s, layerPoint: o, containerPoint: e};
                this._setPosition(e);
                if (!this._visible) {
                    this._container.style.display = "block";
                    this._visible = true
                } else {
                    this._setPosition(e)
                }
                this._map.fire("http://g214.westgis.ac.cn/lib/leaflet/contextmenu.show", h)
            }
        },
        _hide: function () {
            if (this._visible) {
                this._visible = false;
                this._container.style.display = "none";
                this._map.fire("http://g214.westgis.ac.cn/lib/leaflet/contextmenu.hide", {contextmenu: this})
            }
        },
        _setPosition: function (e) {
            var n = this._map.getSize(), i = this._container, o = this._getElementSize(i), s;
            if (this._map.options.contextmenuAnchor) {
                s = t.point(this._map.options.contextmenuAnchor);
                e = e.add(s)
            }
            i._leaflet_pos = e;
            if (e.x + o.x > n.x) {
                i.style.left = "auto";
                i.style.right = Math.max(n.x - e.x, 0) + "px"
            } else {
                i.style.left = Math.max(e.x, 0) + "px";
                i.style.right = "auto"
            }
            if (e.y + o.y > n.y) {
                i.style.top = "auto";
                i.style.bottom = Math.max(n.y - e.y, 0) + "px"
            } else {
                i.style.top = Math.max(e.y, 0) + "px";
                i.style.bottom = "auto"
            }
        },
        _getElementSize: function (t) {
            var e = this._size, n = t.style.display;
            if (!e || this._sizeChanged) {
                e = {};
                t.style.left = "-999999px";
                t.style.right = "auto";
                t.style.display = "block";
                e.x = t.offsetWidth;
                e.y = t.offsetHeight;
                t.style.left = "auto";
                t.style.display = n;
                this._sizeChanged = false
            }
            return e
        },
        _onMouseDown: function (t) {
            this._hide()
        },
        _onKeyDown: function (t) {
            var e = t.keyCode;
            if (e === 27) {
                this._hide()
            }
        },
        _onItemMouseOver: function (e) {
            t.DomUtil.addClass(e.target || e.srcElement, "over")
        },
        _onItemMouseOut: function (e) {
            t.DomUtil.removeClass(e.target || e.srcElement, "over")
        }
    });
    t.Map.addInitHook("addHandler", "contextmenu", t.Map.ContextMenu);
    t.Mixin.ContextMenu = {
        bindContextMenu: function (e) {
            t.setOptions(this, e);
            this._initContextMenu();
            return this
        }, unbindContextMenu: function () {
            this.off("contextmenu", this._showContextMenu, this);
            return this
        }, _initContextMenu: function () {
            this._items = [];
            this.on("contextmenu", this._showContextMenu, this)
        }, _showContextMenu: function (t) {
            var e, n, i, o;
            if (this._map.contextmenu) {
                n = this._map.mouseEventToContainerPoint(t.originalEvent);
                if (!this.options.contextmenuInheritItems) {
                    this._map.contextmenu.hideAllItems()
                }
                for (i = 0, o = this.options.contextmenuItems.length; i < o; i++) {
                    e = this.options.contextmenuItems[i];
                    this._items.push(this._map.contextmenu.insertItem(e, e.index))
                }
                this._map.once("http://g214.westgis.ac.cn/lib/leaflet/contextmenu.hide", this._hideContextMenu, this);
                this._map.contextmenu.showAt(n, {relatedTarget: this})
            }
        }, _hideContextMenu: function () {
            var t, e;
            for (t = 0, e = this._items.length; t < e; t++) {
                this._map.contextmenu.removeItem(this._items[t])
            }
            this._items.length = 0;
            if (!this.options.contextmenuInheritItems) {
                this._map.contextmenu.showAllItems()
            }
        }
    };
    var e = [t.Marker, t.Path, t.GeoJSON], n = {
        contextmenu: false,
        contextmenuItems: [],
        contextmenuInheritItems: true
    }, i, o, s;
    for (o = 0, s = e.length; o < s; o++) {
        i = e[o];
        if (!i.prototype.options) {
            i.prototype.options = n
        } else {
            i.mergeOptions(n)
        }
        i.addInitHook(function () {
            if (this.options.contextmenu) {
                this._initContextMenu()
            }
        });
        i.include(t.Mixin.ContextMenu)
    }
    return t.Map.ContextMenu
});