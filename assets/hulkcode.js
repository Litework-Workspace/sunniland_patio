console.log('hulkcode2 loaded');
if (!window.is_hulk_load_js) {
  window.is_hulk_load_js = !0;
  var checkout_selectors = "input[name='checkout']:not(.hulkapps-ignore), input[value='Checkout']:not(.hulkapps-ignore), button[name='checkout']:not(.hulkapps-ignore), [href$='checkout']:not(.hulkapps-ignore), button[value='Checkout']:not(.hulkapps-ignore), input[name='goto_pp'], button[name='goto_pp'], input[name='goto_gc'], button[name='goto_gc'],.hulkapps_checkout";
  if ("product" == window.hulkapps.page_type) {
    var hulk_variants = window.hulkapps.product.variants;
    window.hulkapps.product.selected_variant = null;
    var product_price = "",
      currency_symbol = "",
      display_price_setting = "";
    window.product_page_btn_condition = function() {
      var t = [];
      if (document.querySelectorAll(".single-option-selector,.swatch-element input[type='radio'],.single-option-selector__radio:checked, select[data-option='option1'], select[data-option='option1']:checked, select[data-option='option2'], select[data-option='option1']:checked, select[data-option='option3'], select[data-option='option3']:checked, select[data-index='option1'], select[data-index='option1']:checked, select[data-index='option2'], select[data-index='option1']:checked, select[data-index='option3'], select[data-index='option3']:checked, ul li div[swatch-option='option1'], input[type='radio']:checked").forEach(function(i) {
          t.push(i.value)
        }), 1 == (t = function(t, i) {
          for (var e = [], o = t.length, a = 0; a < o; a++) {
            var n = t[a];
            i(n) && e.push(n)
          }
          return e
        }(t, function(t) {
          return t
        })).length) var i = t;
      else var i = t.join(" / ");
      null != document.querySelector(".selected_variant span") ? document.querySelector(".selected_variant span").textContent : Object.keys(hulk_variants).forEach(function(t) {
        var e = hulk_variants[t];
        i = i.toString().toLowerCase(), e.title.toString().toLowerCase().trim() == i.trim() && (e.id, window.hulkapps.product.selected_variant = e.id, product_price = e.price)
      }), null == window.hulkapps.product.selected_variant && (window.hulkapps.product.selected_variant = hulk_variants[0].id, product_price = window.hulkapps.product.variants[0].price)
    }
  }
  window.hulkLoadScript = function(t, i) {
    var e = document.createElement("script");
    e.type = "text/javascript", e.readyState ? e.onreadystatechange = function() {
      ("loaded" == e.readyState || "complete" == e.readyState) && (e.onreadystatechange = null, i())
    } : e.onload = function() {
      i()
    }, e.src = t, document.getElementsByTagName("head")[0].appendChild(e)
  }, window.checkAppInstalled = function(t) {
    window.hulkapps.is_product_option = !0, hulkLoadScript("https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.13/js/intlTelInput.min.js", function() {
      commonJS(t), cartPageJS(t), productPageJS(t)
    })
  }, window.commonJS = function(t) {
    var i, e;

    function o(t) {
      var i, e;
      XMLHttpRequest.callbacks ? XMLHttpRequest.callbacks.push(t) : (XMLHttpRequest.callbacks = [t], i = XMLHttpRequest.prototype.send, XMLHttpRequest.prototype.send = function() {
        if (XMLHttpRequest.callbacks)
          for (e = 0; e < XMLHttpRequest.callbacks.length; e++) XMLHttpRequest.callbacks[e](this);
        i.apply(this, arguments)
      })
    }
    window.getCartInfo(), window.fetch = new Proxy(window.fetch, {
      apply(t, i, e) {
        let o = t.apply(i, e);
        return o.then(t => {
          var i = window.hulkappsParseURL(e[0]),
            o = !1;
          if (["/cart/change", "/cart/clear", "/cart/update", "/cart/add"].forEach(async function(i) {
              if (e[0] && e[0].includes(i)) {
                o = !0;
                var a = await t.clone().json();
                e[0].includes("/cart/add") && (a = void 0), window.getCartInfo(0, a)
              }
            }), !o && i && i.query) {
            if (i.query.get("section_id") && i.query.get("section_id").includes("cart")) o = !0, window.getCartInfo();
            else {
              if (i.query.get("view") && i.query.get("view").includes("hulkapps_cart_collections")) return;
              i.query.get("view") && i.path.includes("/cart") && !i.path.includes("/cart.js") && (o = !0, window.getCartInfo())
            }
          }!o && i && "/cart" === i.path && window.getCartInfo()
        }).catch(t => {}), o
      }
    }), o(function(t) {
      var i = !1,
        e = window.hulkappsParseURL(t._url);
      let o = ["/cart/change", "/cart/clear", "/cart/update", "/cart/add"];
      var a = !1;
      let n = function() {
          if (t.readyState === XMLHttpRequest.DONE) {
            if (a = !0, o.forEach(function(e) {
                if (t._url && t._url.includes(e)) {
                  i = !0;
                  var o = t.status;
                  if (0 === o || o >= 200 && o < 400) {
                    var a = JSON.parse(t.response);
                    t._url.includes("/cart/add") && (a = void 0), window.getCartInfo(0, a)
                  }
                }
              }), !i && e && e.query) {
              if (e.query.get("section_id") && e.query.get("section_id").includes("cart")) i = !0, window.getCartInfo();
              else {
                if (e.query.get("view") && e.query.get("view").includes("hulkapps_cart_collections")) return;
                e.query.get("view") && e.path.includes("/cart") && !e.path.includes("/cart.js") && (i = !0, window.getCartInfo())
              }
            }!i && e && "/cart" === e.path && window.getCartInfo()
          }
        },
        p = setInterval(function() {
          a || (n(), a = !0), a && clearInterval(p)
        }, 1e3)
    }), i = hulkapps_jQuery, Document.prototype._hulkappsAddEventListener = Document.prototype.addEventListener, Document.prototype._hulkappsRemoveEventListener = Document.prototype.removeEventListener, Document.prototype._hulkappsAddEventListener = function(t, i, e = !1) {
      this._hulkappsAddEventListener(t, i, e), this.hulkappsEventListenerList || (this.hulkappsEventListenerList = {}), this.hulkappsEventListenerList[t] || (this.hulkappsEventListenerList[t] = []), this.hulkappsEventListenerList[t].push({
        type: t,
        listener: i,
        useCapture: e
      })
    }, Document.prototype._hulkappsRemoveEventListener = function(t, i, e = !1) {
      this._hulkappsRemoveEventListener(t, i, e), this.hulkappsEventListenerList || (this.hulkappsEventListenerList = {}), this.hulkappsEventListenerList[t] || (this.hulkappsEventListenerList[t] = []);
      for (let o = 0; o < this.hulkappsEventListenerList[t].length; o++)
        if (this.hulkappsEventListenerList[t][o].listener === i && this.hulkappsEventListenerList[t][o].useCapture === e) {
          this.hulkappsEventListenerList[t].splice(o, 1);
          break
        } 0 == this.hulkappsEventListenerList[t].length && delete this.hulkappsEventListenerList[t]
    }, Document.prototype.hulkappsGetEventListeners = function(t) {
      return (this.hulkappsEventListenerList || (this.hulkappsEventListenerList = {}), void 0 === t) ? this.hulkappsEventListenerList : this.hulkappsEventListenerList[t]
    }, i("body").on("click", ".edit_cart_option", function(t) {
      t.preventDefault();
      var e = i(this).data("key"),
        o = window.hulkapps.cart,
        a = window.hulkapps.store_id,
        n = i(this).data("product_id"),
        p = i(this).data("variant_id");
      i("[name^='properties']").each(function() {
        "" == i(this).val() && i(this).attr("disabled", !0)
      });
      var l = i(this);
      i.ajax({
        type: "POST",
        url: window.hulkapps.po_url + "/api/v2/store/edit_cart_extension",
        data: {
          cart_data: o,
          item_key: e,
          store_id: a,
          variant_id: p,
          customer_tags: null != window.hulkapps.customer ? window.hulkapps.customer.tags.split(",") : "",
          cart_collections: JSON.stringify(window.hulkapps.cart_collections)
        },
        cache: !1,
        crossDomain: !0,
        success: function(t) {
          if ("ok" == t) location.reload();
          else {
            window.currentEditOptionSelector = l, i("body").addClass("body_fixed"), i("#edit_cart_popup").last().html(t), i(".edit_popup").appendTo("body"), i(".edit_popup").show(), "undefined" != typeof jQuery && jQuery(document).off("focusin");
            let e = document.hulkappsGetEventListeners("focusin");
            if (e)
              for (let o in e) document.removeEventListener("focusin", e[o].listener);
            requireInventory(n, "hulkapps_edit_product_options"), calc_options_total(n, "hulkapps_edit_product_options"), conditional_rules(n, "hulkapps_edit_product_options")
          }
        }
      })
    }), (e = hulkapps_jQuery).fn.fontselect = function(t, i) {
      var o = function(t, i) {
          return function() {
            return t.apply(i, arguments)
          }
        },
        t = t.googleFonts.split(","),
        a = {
          style: "font-select",
          placeholder: "Select a font",
          lookahead: 2,
          api: "https://fonts.googleapis.com/css?family="
        },
        n = function() {
          function i(t, i) {
            this.$original = e(t), this.options = i, this.active = !1, this.setupHtml(), this.getVisibleFonts(), this.bindEvents();
            var o = this.$original.val();
            o && (this.updateSelected(), this.addFontLink(o))
          }
          return i.prototype.bindEvents = function() {
            var t = this;
            e(document).click(function(i) {
              t.active && !e(i.target).parents("#fontSelect-" + t.$original.id).length && t.toggleDrop()
            }), e("li", this.$results).click(o(this.selectFont, this)).mouseenter(o(this.activateFont, this)).mouseleave(o(this.deactivateFont, this)), e("span", this.$select).click(o(this.toggleDrop, this)), this.$arrow.click(o(this.toggleDrop, this))
          }, i.prototype.toggleDrop = function(t) {
            this.active ? (this.$element.removeClass("font-select-active"), this.$drop.hide(), clearInterval(this.visibleInterval)) : (this.$element.addClass("font-select-active"), this.$drop.show(), this.moveToSelected(), this.visibleInterval = setInterval(o(this.getVisibleFonts, this), 500)), this.active = !this.active
          }, i.prototype.selectFont = function() {
            var t = e("li.active", this.$results).data("value");
            this.$original.val(t).change(), this.updateSelected(), this.toggleDrop()
          }, i.prototype.moveToSelected = function() {
            var t, i = this.$original.val();
            t = i ? e("li[data-value='" + i + "']", this.$results) : e("li", this.$results).first(), this.$results.scrollTop(t.addClass("active")[0].offsetTop)
          }, i.prototype.activateFont = function(t) {
            e("li.active", this.$results).removeClass("active"), e(t.currentTarget).addClass("active")
          }, i.prototype.deactivateFont = function(t) {
            e(t.currentTarget).removeClass("active")
          }, i.prototype.updateSelected = function() {
            var t = this.$original.val();
            e("span", this.$element).text(this.toReadable(t)).css(this.toStyle(t))
          }, i.prototype.setupHtml = function() {
            this.$original.empty().hide(), this.$element = e("<div>", {
              id: "fontSelect-" + this.$original.id,
              class: this.options.style
            }), this.$arrow = e("<div><b></b></div>"), this.$select = e("<a><span>" + this.options.placeholder + "</span></a>"), this.$drop = e("<div>", {
              class: "fs-drop"
            }), this.$results = e("<ul>", {
              class: "fs-results"
            }), this.$original.after(this.$element.append(this.$select.append(this.$arrow)).append(this.$drop)), this.$drop.append(this.$results.append(this.fontsAsHtml())).hide()
          }, i.prototype.fontsAsHtml = function() {
            for (var i, e, o = t.length, a = "", n = 0; n < o; n++) i = this.toReadable(t[n]), e = this.toStyle(t[n]), a += '<li data-value="' + t[n] + '" style="font-family: ' + e["font-family"] + "; font-weight: " + e["font-weight"] + '">' + i + "</li>";
            return a
          }, i.prototype.toReadable = function(t) {
            return t.replace(/[\+|:]/g, " ")
          }, i.prototype.toStyle = function(t) {
            var i = t.split(":");
            return {
              "font-family": this.toReadable(i[0]),
              "font-weight": i[1] || 400
            }
          }, i.prototype.getVisibleFonts = function() {
            if (!this.$results.is(":hidden")) {
              var t = this,
                i = this.$results.scrollTop(),
                o = i + this.$results.height();
              if (this.options.lookahead) {
                var a = e("li", this.$results).first().height();
                o += a * this.options.lookahead
              }
              e("li", this.$results).each(function() {
                var a = e(this).position().top + i;
                if (a + e(this).height() >= i && a <= o) {
                  var n = e(this).data("value");
                  t.addFontLink(n)
                }
              })
            }
          }, i.prototype.addFontLink = function(t) {
            var i = this.options.api + t;
            0 === e("link[href*='" + t + "']").length && e("link:last").after('<link href="' + i + '" rel="stylesheet" type="text/css">')
          }, i
        }();
      return this.each(function() {
        return i && e.extend(a, i), new n(this, a)
      })
    }, window.hulkDraftOrder = function() {
      return window.is_draft_order
    }, window.hulkappsDoActions = function(i) {
      i.discounts.discount_show && t(".discount_code_box").css("display", "block"), i.discounts.plan && t(".edit_cart_option").css("display", "block"), "object" == typeof i.discounts && "object" == typeof i.discounts.cart && "object" == typeof i.discounts.cart.items && hulkappsShowCartDiscounts(i.discounts)
    }, t(document).on("click", checkout_selectors, function(i) {
      if (i.preventDefault(), window.hulk_inventory_arr && window.hulk_inventory_arr.length > 0) {
        var e = '<div class="hulkapps_summary inventory_validation_hulkapps">';
        return window.hulk_inventory_arr.forEach(function(t) {
          e += t
        }), e += "</div>", t(".inventory_validation_hulkapps").remove(), t(this).parent().after(e), !1
      }
      if (t(".inventory_validation_hulkapps").remove(), window.is_draft_order && window.hulk_inventory_arr && window.hulk_inventory_arr.length <= 0) {
        if ("function" != typeof hulkappsCheckout && (window.location = "/checkout"), "undefined" == typeof IntegrationCheckoutClick) hulkappsCheckout(null);
        else {
          var o = IntegrationCheckoutClick();
          !0 == o.required ? hulkappsCheckout(o) : !1 != o.required && hulkappsCheckout(o)
        }
      } else window.location = "/checkout?locale=" + Shopify.locale
    }), window.hulkappsShowCartDiscounts = function(i) {
      window.hulkapps.discounts = i;
      var e = i.cart_item_price_selectors.split(","),
        o = i.cart_item_line_price_selectors.split(","),
        a = i.cart_total_price_selectors;
      i.cart.items.forEach(function(i) {
        t.each(e, function(e, o) {
          t("" + o + "[data-key='" + i.key + "']").html(i.original_price_format)
        }), t.each(o, function(e, o) {
          t("" + o + "[data-key='" + i.key + "']").html(i.original_line_price_format)
        })
      });
      var n = parseFloat(i.discount_cut_price);
      a = a.split(","), t.each(a, function(e, o) {
        i.discount_code && 1 == i.discount_error ? (t(o).html(i.original_price_total), hulkapps_jQuery(".hulkapps_summary").remove(), t(".hulkapps_discount_hide").after("<span class='hulkapps_summary'>Discount code does not match</span>"), localStorage.removeItem("discount_code"), t(o).html(i.original_price_total), t(o).css("text-decoration", "none"), t(".hulkapps-summary-line-discount-code").html(""), t(".after_discount_price").html("")) : i.is_free_shipping ? (t(".hulkapps_summary").remove(), t(o).html(i.original_price_total), t(o).css("text-decoration", "none"), t(".hulkapps-summary-line-discount-code").html(""), t(".after_discount_price").html(""), t(".hulkapps_discount_hide").after("<span class='hulkapps-summary-line-discount-code'><span class='discount-tag'>" + i.discount_code + "<span class='close-tag'></span></span>Free Shipping")) : i.discount_code && n <= 0 && t(".discount_code_box").is(":visible") ? (t(o).html(i.original_price_total), t(".hulkapps_discount_hide").after("<span class='hulkapps_summary'>" + i.discount_code + " discount code isn’t valid for the items in your cart</span>"), t(".hulkapps_discount_code").val(""), t(o).html(i.original_price_total), t(o).css("text-decoration", "none"), t(".hulkapps-summary-line-discount-code").html(""), t(".after_discount_price").html(""), localStorage.removeItem("discount_code")) : i.discount_code && t(".discount_code_box").is(":visible") ? (t(".discount_code_box").find(".hulkapps_summary").html(""), t(".hulkapps-summary-line-discount-code,.after_discount_price").remove(), t(".hulkapps_discount_hide").after("<span class='hulkapps-summary-line-discount-code'><span class='discount-tag'>" + i.discount_code + "<span class='close-tag'></span></span><span class='hulkapps_with_discount'> -" + i.with_discount + "</span></span><span class='after_discount_price'><span class='final-total'>Total</span>" + i.final_with_discounted_price + "</span>"), t(o).html(i.original_price_total), i.original_price_total != i.final_with_discounted_price && t(o).css("text-decoration", "line-through"), t(".hulkapps-cart-total").remove()) : (t(o).html(i.original_price_total), t(o).css("text-decoration", "none"), t(".hulkapps-summary-line-discount-code").html(""), t(".after_discount_price").html(""), t(".discount_code_box").find(".hulkapps_summary").html(""))
      })
    }, window.hulkappsCheckout = function(i) {
      if (window.hulk_inventory_arr && window.hulk_inventory_arr.length > 0) return !1;
      var e = {};
      null != i && 1 == i.shipping_status && (e = {
        price: i.shipping_price,
        title: i.shipping_method
      });
      var o = localStorage.getItem("discount_code");
      t.getJSON("/cart.js", {
        _: new Date().getTime()
      }, function(i) {
        i && i.item_count > 0 && (window.hulkapps.cart = i, new Promise((i, e) => {
          t.ajax({
            url: "/cart?view=hulkapps_cart_collections.json",
            success: function(e) {
              try {
                if (e) {
                  var o = JSON.parse(e);
                  if (o) {
                    var a = o.items;
                    t.each(a, function(t, i) {
                      window.hulkapps.cart_collections[i.variant_id] = i.product_collections
                    })
                  }
                }
                i(window.hulkapps.cart_collections)
              } catch (n) {
                i(window.hulkapps.cart_collections)
              }
            },
            error: function(t) {
              i(window.hulkapps.cart_collections)
            }
          })
        }).then(function(i) {
          window.hulkapps.cart_collections = i;
          var a = Shopify.locale;
          t.ajax({
            type: "POST",
            url: window.hulkapps.po_url + "/store/create_draft_order",
            data: {
              cart_json: window.hulkapps,
              store_id: window.hulkapps.store_id,
              discount_code: o,
              cart_collections: JSON.stringify(window.hulkapps.cart_collections),
              order_app: e,
              customer_tags: null != window.hulkapps.customer ? window.hulkapps.customer.tags.split(",") : "",
              draft_order_language: void 0 != a ? a : ""
            },
            crossDomain: !0,
            success: function(t) {
              "string" == typeof t ? window.location.href = t : window.location.href = "/checkout", localStorage.removeItem("discount_code")
            }
          })
        }).catch(function(t) {
          console.error(t)
        }))
      })
    }, window.productPageAjax = function(t) {
      t.ajax({
        type: "POST",
        url: window.hulkapps.po_url + "/api/v2/store/get_all_relationships",
        data: {
          pid: window.hulkapps.product_id,
          store_id: window.hulkapps.store_id,
          tags: window.hulkapps.product.tags,
          vendor: window.hulkapps.product.vendor,
          ptype: window.hulkapps.product.type,
          customer_tags: null != window.hulkapps.customer ? window.hulkapps.customer.tags.split(",") : "",
          product_collections: window.hulkapps.product_collections
        },
        sync: !1,
        crossDomain: !0,
        success: function(i) {
          if (window.$first_add_to_cart_el && window.$first_add_to_cart_el.removeAttr("disabled"), "string" != t.type(i)) {
            var e = "";
            let o = {};
            if (void 0 != i.condition) {
              e += "<div id='conditional_rules' style='display:none'>";
              var a = "";
              t.each(i.condition, function(n, p) {
                var l = p.id,
                  s = hulkapps_jQuery.parseJSON(p.conditions);
                if ("OR" == s.apply_rule) var r = "0";
                else var r = "1";
                e = e + "<div id='conditional_logic_" + l + "' name='conditional_logic_" + l + "' data-verify-all='" + r + "' style='display:none'>", t.each(s.rules, function(t, o) {
                  var a = parseInt(o.option);
                  if (i.option_id_array.indexOf(a) >= 0) {
                    if (1 == parseInt(o.rule_type)) var n = "==";
                    else var n = "!=";
                    e = e + "<div name='conditional_logic_" + l + "' data-field-num='" + a + "' data-verify-all='" + r + "' class='step_1'>**value11**" + n + o.option_val + "</div>"
                  }
                }), e += "</div>";
                let d = [];
                t.each(s.actions, function(t, e) {
                  var o = parseInt(e.option);
                  if (d.push(o), i.option_id_array.indexOf(o) >= 0) {
                    if (1 == parseInt(e.action_type)) var n = "show";
                    else var n = "hide";
                    a += " conditional_logic_" + l + "_" + n;
                    var p = "condition_" + n + " conditional";
                    i.hide_show_array[o] = p
                  }
                }), o[l] = d
              }), e += "</div>"
            }
            var n = i.cart_selectors,
              p = 0 != i.options_title.title_text.length ? i.options_title.title_text : "Choose Your Product Options:",
              l = ".hulkapps_option_title{";
            l += 0 != i.options_title.title_padding.length ? "padding: " + i.options_title.title_padding + "px;" : "padding: 15px;", l += 0 != i.options_title.title_font_size.length ? "font-size: " + i.options_title.title_font_size + "px;" : "font-size: 16px;", l += 0 != i.options_title.title_text_align.length ? "text-align: " + i.options_title.title_text_align + ";" : "text-align: left;", l += 0 != i.options_title.title_background.length ? "background-color: " + i.options_title.title_background + ";" : "background-color: #ffffff;", l += 0 != i.options_title.title_border.length ? "border: 1px solid " + i.options_title.title_border + ";" : "border: 1px solid #000000;", l += 0 != i.options_title.title_font_color.length ? "color: " + i.options_title.title_font_color + ";" : "color:#000000;", l += 1 == parseInt(i.options_title.title_bold) ? "font-weight:bold;" : "font-weight:normal;", l += 1 == parseInt(i.options_title.title_display) ? "" : "display:none;", l += "border-bottom: none;", l += "}", i.options_container_style.enable_tooltip;
            var s = i.options_container_style.enable_helptext,
              r = "#hulkapps_option_list_" + i.pid + "{";
            r += 0 != i.options_container_style.background_color.length ? "background-color: " + i.options_container_style.background_color + ";" : "background-color: #fff;", r += 0 != i.options_container_style.border_color.length ? "border: 1px solid " + i.options_container_style.border_color + ";" : "border: 0 none;", r += 0 != i.options_container_style.padding.length ? "padding: " + i.options_container_style.padding + "px;" : "padding: 10px;", r += "}.hulkapps_option {width: 100%;display: block;transition: 0.3s all;", r += 0 != i.options_container_style.spacing_between_options.length ? "padding-bottom: 0px; margin-bottom: " + i.options_container_style.spacing_between_options + "px;" : "padding-bottom: 0; margin-bottom: 6px;", r += 0 != i.options_container_style.line_between_options.length ? "border-bottom: 1px solid " + i.options_container_style.line_between_options + ";" : "", r += "}";
            var d = i.options_name_style.option_name_inline,
              u = ".hulkapps_option_name {";
            u += 0 != i.options_name_style.option_name_width.length ? "width: " + i.options_name_style.option_name_width + "px;" : "width: 180px;", u += 0 != i.options_name_style.option_name_font_size.length ? "font-size: " + i.options_name_style.option_name_font_size + "px;" : "font-size: 14px;", u += 0 != i.options_name_style.option_name_text_align.length ? "text-align: " + i.options_name_style.option_name_text_align + ";" : "text-align: left;", u += 0 != i.options_name_style.font_color.length ? "color: " + i.options_name_style.font_color + ";" : "color: #424242;", u += 1 == parseInt(i.options_name_style.on_title_bold) ? "font-weight: bold;" : "font-weight: normal;", u = u + "min-width: " + i.options_name_style.option_name_width + "px;padding-right: 15px;box-sizing: border-box;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;-ms-box-sizing: border-box;vertical-align: top;}", i.option_values_style.ov_padding, i.option_values_style.ov_width, i.option_values_style.spacing_left_of_values;
            var c = i.option_values_style.single_line,
              h = ".hulkapps_option_value {";
            h += "width:100%;min-width: 100%;text-align: left;vertical-align: top;}", h += ".hulkapps_option .hulkapps_option_value, .pn_render .hulkapps_option_child, .et_render .hulkapps_option_child, .tb_render .hulkapps_option_child, .ta_render .hulkapps_option_child, .fu_render .hulkapps_option_child, .dd_render .hulkapps_option_child, .dd_multi_render .hulkapps_option_child, .nf_render .hulkapps_option_child, .dp_render .hulkapps_option_child{", h += 0 != i.option_values_style.ov_font_size.length ? "font-size: " + i.option_values_style.ov_font_size + "px !important;" : "", h += 0 != i.option_values_style.ov_font_color.length ? "color: " + i.option_values_style.ov_font_color + " !important;" : "", h += void 0 != i.option_values_style.ov_font_weight && 1 == parseInt(i.option_values_style.ov_font_weight) ? "font-weight:bold;" : "font-weight:normal;", h += void 0 != i.option_values_style.ov_text_align ? "text-align: " + i.option_values_style.ov_text_align + " !important;" : "", h += "}";
            var v = ".hulkapps_helptext,.hulkapps_helptext a{";
            v += void 0 != i.option_help_text_style && void 0 != i.option_help_text_style.option_help_text_font_size ? "font-size: " + i.option_help_text_style.option_help_text_font_size + "px !important;" : "", v += void 0 != i.option_help_text_style && void 0 != i.option_help_text_style.option_help_text_font_color ? "color: " + i.option_help_text_style.option_help_text_font_color + "!important;" : "", v += void 0 != i.option_help_text_style && 1 == parseInt(i.option_help_text_style.on_help_text_bold) ? "font-weight: bold;" : "font-weight: normal;", v += "}";
            var f = ".hulkapps-tooltip .hulkapps-tooltip-inner,.hulkapps-tooltip .hulkapps-tooltip-inner a{";
            f += void 0 != i.option_tooltip_style && void 0 != i.option_tooltip_style.option_tooltip_font_size ? "font-size: " + i.option_tooltip_style.option_tooltip_font_size + "px !important;" : "", f += void 0 != i.option_tooltip_style && void 0 != i.option_tooltip_style.option_tooltip_font_color ? "color: " + i.option_tooltip_style.option_tooltip_font_color + "!important;" : "", f += void 0 != i.option_tooltip_style && void 0 != i.option_tooltip_style.option_tooltip_background_color ? "background-color: " + i.option_tooltip_style.option_tooltip_background_color + "!important;" : "", f += "}", f += ".hulkapps-tooltip .hulkapps-tooltip-inner:after{", f += void 0 != i.option_tooltip_style && void 0 != i.option_tooltip_style.option_tooltip_background_color ? "border-color: " + i.option_tooltip_style.option_tooltip_background_color + " transparent transparent transparent !important;" : "", f += "}", f += ".hulkapps-tooltip .hulkapps-tooltip-inner.swatch-tooltip p,.hulkapps-tooltip .hulkapps-tooltip-inner.multiswatch-tooltip p{", f += void 0 != i.option_tooltip_style && void 0 != i.option_tooltip_style.option_tooltip_font_color ? "color: " + i.option_tooltip_style.option_tooltip_font_color + "!important;" : "", f += "}";
            var k = 0 != i.option_values_style.ov_font_size.length ? parseInt(i.option_values_style.ov_font_size) - 2 : 14,
              m = ".has-float-label .floating_label{";
            m += 0 != i.option_values_style.ov_font_size.length ? "font-size: " + i.option_values_style.ov_font_size + "px;" : "font-size: 14px;", m += 0 != i.option_values_style.ov_font_color.length ? "color: " + i.option_values_style.ov_font_color + ";" : "color: #424242;", m += void 0 != parseInt(i.option_values_style.ov_font_weight) && 1 == parseInt(i.option_values_style.ov_font_weight) ? "font-weight: bold;" : "font-weight: normal;", m += "}", m += ".has-float-label .hulkapps_option_value input:focus-visible ~ .floating_label, .has-float-label .hulkapps_option_value textarea:focus ~ .floating_label, .has-float-label .hulkapps_option_value textarea:focus-visible ~ .floating_label, .has-float-label .hulkapps_option_value input:focus ~ .floating_label, .has-float-label .hulkapps_option_value textarea:focus-within ~ .floating_label, .has-float-label .hulkapps_option_value input:focus-within ~ .floating_label,  .has-float-label .hulkapps_option_value textarea:active ~ .floating_label, .has-float-label .hulkapps_option_value input:active ~ .floating_label,.has-float-label .hulkapps_option_value input.textbox_selected ~ .floating_label, .has-float-label .hulkapps_option_value input.numberfield_selected ~ .floating_label,.has-float-label .hulkapps_option_value input.emailbox_selected ~ .floating_label,.has-float-label .hulkapps_option_value textarea.textbox_selected ~ .floating_label, .has-float-label .hulkapps_option_value textarea.textarea_selected ~ .floating_label, .has-float-label,.hulkapps_option_value select ~ label.floating_label{", m += 0 != i.option_values_style.ov_font_size.length ? "font-size: " + k + "px !important;" : "font-size: 14px;", m += "}";
            var g = i.advanced_users.custom_js,
              $ = i.advanced_users.custom_css,
              y = parseInt(i.swatch_settings.swatch_width),
              b = parseInt(i.swatch_settings.swatch_height),
              _ = i.swatch_settings.tooltip_position,
              x = i.swatch_settings.tooltip_contains,
              w = parseInt(i.swatch_settings.tooltip_display),
              C = parseInt(i.swatch_settings.round_corners),
              q = parseInt(i.swatch_settings.enable_swatch_images),
              S = parseInt(i.swatch_settings.enable_swatch_with_text),
              y = "" == y || y < 0 ? "width:35px;" : "width:" + y + "px;",
              b = "" == b || b < 0 ? "height:35px;" : "height:" + b + "px;",
              _ = "top" == _ ? "top" : "bottom",
              C = 1 == C ? "-webkit-border-radius: 50%;-moz-border-radius: 50%;border-radius: 50%;" : "",
              j = 0 != i.button_option_settings.button_option_background.length ? "background-color: " + i.button_option_settings.button_option_background + ";" : "#ffffff",
              L = 0 != i.button_option_settings.button_option_font_color.length ? "color: " + i.button_option_settings.button_option_font_color + ";" : "#777777",
              E = 0 != i.button_option_settings.button_option_border_color.length ? "border-color: " + i.button_option_settings.button_option_border_color + ";" : "#777777",
              F = void 0 != i.label_setting && "blocklable" == i.label_setting.lable_display ? "" : void 0 == i.label_setting ? "" : i.label_setting.lable_display;
            if ("floatingLabels" == F) var A = "has-float-label";
            if ("inlineLabels" == F) var A = "has-inline-label";
            var I = i.premium_option_settings.update_total_text,
              z = void 0 == i.premium_option_settings.amount_note_display ? 1 : i.premium_option_settings.amount_note_display;
            if (void 0 != i.premium_option_settings.price_setting) var z = "price_addtional_charge" == i.premium_option_settings.price_setting || "price_total_charge" == i.premium_option_settings.price_setting ? "1" : "0";
            var P = void 0 == i.premium_option_settings.disabled_option_price ? 0 : i.premium_option_settings.disabled_option_price;
            currency_symbol = i.currency_symbol, display_price_setting = i.premium_option_settings;
            var O = i.premium_option_settings.post_total_text,
              T = i.premium_option_settings.total_container_background_color,
              D = i.premium_option_settings.total_container_border_color,
              M = i.premium_option_settings.total_container_font_color,
              N = i.premium_option_settings.total_container_price_color,
              Q = "#option_total {";
            Q += "" !== T ? "background: none repeat scroll 0 0 " + T + ";" : "background: none repeat scroll 0 0 #fff;", Q += "" !== D ? "border:1px solid " + D + ";" : "border:1px solid #000000;", Q += "" !== M ? "color: " + M + ";" : "color: #000;", Q += "}#formatted_option_total {", Q += "" !== N ? "color: " + N + ";" : "color: #000;", Q += "}";
            var U = 0 == parseInt(c) ? "0px" : "10px",
              B = void 0 != i.image_thumbnail_parents_selector ? i.image_thumbnail_parents_selector : "",
              R = "";
            void 0 != B && "" != B && (image_parent_selector = B.split(",")).forEach(function(t, i, e) {
              i === e.length - 1 ? R += t + "  img" : R += t + "  img,"
            });
            var K = i.button_option_settings.button_option_selected_background,
              J = i.button_option_settings.button_option_selected_border_color,
              V = i.button_option_settings.button_option_selected_font_color,
              H = l + r + u + h + Q + ("#hulkapps_custom_options_" + i.pid + "{clear: both}#hulkapps_options_" + i.pid + "{margin:15px 0;}#hulkapps_option_list_" + i.pid + " select{width:100%;padding-top: 12px;padding-bottom: 12px}.popup_detail{position: fixed;background-color: #F7F7F7;padding: 15px;top: 50%;left: 50%;transform: translate(-50%, -50%);justify-content: space-between;z-index: 3;min-width: 300px;max-width: fit-content;overflow-y: auto;max-height: 300px;}.popup_detail a{cursor: pointer;}.popup_detail img{width: 15px;height: 15px;margin: 5px;}.popup_detail p{margin:0;}.overlay-popup{position: fixed;display: none;width: 100%;height: 100%;top: 0;left: 0;bottom: 0;background-color: rgba(0,0,0,0.5);z-index: 2;}.popup_render{margin-bottom:0!important;display:flex;align-items:center!important}.popup_render .hulkapps_option_value{min-width:auto!important}.popup_render a{margin-left: 4px;text-decoration:underline!important;transition:all .3s!important;font-weight: normal !important;}.popup_render a:hover{color:#6e6e6e}.cut-popup-icon{display:inline-flex;align-items:center}.cut-popup-icon-span{display:inline-flex}.des-detail{font-weight: normal;}#hulkapps_option_list_" + i.pid + " input[type='text']{width:100%;border-radius:0}#hulkapps_option_list_" + i.pid + " input,#hulkapps_option_list_" + i.pid + " textarea,#hulkapps_option_list_" + i.pid + " select{border:1px solid #DADADA;box-shadow: none;-webkit-appearance: none;padding:15px;min-height: 36px;}#hulkapps_option_list_" + i.pid + " .validation_error{color:#FF0808;background-color:#FFF8F7;border-style:solid;border-width:1px;border-color:#FFCBC9;border-bottom: 1px solid #ffcbc9;padding: 8px 8px ;display: inline-block;margin-top: 2px;}#hulkapps_option_list_" + i.pid + " .validation_error .hulkapps_option_value{color:#FF0808}#hulkapps_option_list_" + i.pid + " .validation_error .hulkapps_option_name{color:#FF0808}.hulkapps_option_value:first-child{display:flex;align-items: center;} .hulkapps_option_value:first-child span{display: flex;padding-right: 10px;}.hulkapps_option_value:first-child a{cursor: pointer;} .hulkapps_helptext{color: #000 !important;}.hulkapps_full_width{width:100%;display:block;}.hulkapps_check_option,.hulkapps_radio_option{display:block;margin-right:0;font-weight:normal !important;}.single_line .hulkapps_option_value .hulkapps_check_option,.single_line .hulkapps_option_value .hulkapps_radio_option{display:inline-flex;margin-right:20px;font-weight:normal; align-items: center; }#hulkapps_option_list_" + i.pid + " input[type='checkbox']{margin-right: 5px;vertical-align: baseline;min-height:auto; height: auto;display: none;-webkit-appearance: checkbox;-moz-appearance: checkbox;appearance: checkbox;}.hulkapps_check_option input[type='checkbox']{margin-right:5px;}#hulkapps_option_list_" + i.pid + " input[type='radio']{margin-right:5px;vertical-align:baseline;display: none;}i.hulkapps_tooltip_identifier{color:rgb(255, 255, 255);border-radius:12px;font-size:10px;margin-right:6px;margin-left:4px;padding:0px 4px;background:#000000}span.hulkapps_option_name_additional_info{position:relative}span.hulkapps_option_name_additional_info .hulkapps_tool_tip{display:none}span.hulkapps_option_name_additional_info:hover .hulkapps_tool_tip{content:attr(data-additional-info);padding:4px 8px;color:#fff;position:absolute;left:0;bottom:160%;z-index:20px;-moz-border-radius:5px;-webkit-border-radius:5px;border-radius:5px;display:block;background:#000000;width:150px}span.hulkapps_option_name_additional_info:hover:after{display:block}i.hulkapps_tooltip_identifier:before{content:'?';font-style:normal}#formatted_option_total{font-weight:bold;margin:0 7px}.td_render .hulkapps_option_name.full_name{float:none;width:auto}.hulkapps_option.full_width .hulkapps_option_name{width:100%;}.hulkapps_option.full_width .hulkapps_option_value{width:100%;display:block;}.hulkapps_option.full_width .hulkapps_option_name{padding-bottom:5px}.hulkapps_option:after{content:'';clear:both;display:block}.hulkapps_option_name a:link {color: grey;text-decoration: none;font-weight: normal;}.hulkapps_option_name a:hover {color: rgb(93, 156, 236);background: transparent;}.hulkapps_swatch_option .hulkapps_option_child:after{cursor: pointer;content:'';position:absolute;top:-4px;right:-4px;bottom:-4px;left:-4px;" + C + "}.hulkapps_mswatch_option .hulkapps_option_child:after{border: 1px solid #DADADA;cursor: pointer;content:'';position:absolute;top:-4px;right:-4px;bottom:-4px;left:-4px; " + C + "}.hulkapps_radio_option .radio_selected{border: 2px solid #0090FA;background:#0090FA;color:#fff;}.radio_div{border: 2px solid #eee;padding: 8px 20px;padding: 6px 12px;}.radio_div:hover{border: 2px solid #0090FA;cursor:pointer;}.tooltip.in{opacity:1 !important;}#option_display_total_format{padding-left:5px;}.hulkapps_swatch_option .tooltip-inner{padding: 0px 5px !important;}.hulkapps_check_option,.hulkapps_radio_option{margin-right:" + U + "}.hulkapps_swatch_option,.hulkapps_mswatch_option{ margin-right:10px !important; display: inline-block;vertical-align: middle;}.hulkapps-tooltip.tooltip-left-pos .hulkapps-tooltip-inner.swatch-tooltip{left: 0 !important;right: auto !important;}.hulkapps-tooltip.tooltip-left-pos .hulkapps-tooltip-inner.swatch-tooltip:after{right: auto !important;left: 10px !important;}.hulkapps-tooltip.tooltip-right-pos .hulkapps-tooltip-inner.swatch-tooltip{right: 0 !important;left: auto !important;}.hulkapps-tooltip.tooltip-right-pos .hulkapps-tooltip-inner.swatch-tooltip:after{left: auto !important;right: 10px !important;}.hulkapps-tooltip.tooltip-center-pos .hulkapps-tooltip-inner.swatch-tooltip{left: 50% !important;transform: translateX(-50%);}.hulkapps-tooltip.tooltip-center-pos .hulkapps-tooltip-inner.swatch-tooltip:after{left: 50% !important;transform: translateX(-50%);}.phone_number{padding-left: 50px !important;}#option_total{padding:3px 6px;}.hulkapps-tooltip.tooltip-left-pos .hulkapps-tooltip-inner.multiswatch-tooltip{left: 0 !important;right: auto !important;}.hulkapps-tooltip.tooltip-left-pos .hulkapps-tooltip-inner.multiswatch-tooltip:after{right: auto !important;left: 10px !important;}.hulkapps-tooltip.tooltip-right-pos .hulkapps-tooltip-inner.multiswatch-tooltip{right: 0 !important;left: auto !important;}.hulkapps-tooltip.tooltip-right-pos .hulkapps-tooltip-inner.multiswatch-tooltip:after{left: auto !important;right: 10px !important;}.hulkapps-tooltip.tooltip-center-pos .hulkapps-tooltip-inner.multiswatch-tooltip{left: 50% !important;transform: translateX(-50%);}.hulkapps-tooltip.tooltip-center-pos .hulkapps-tooltip-inner.multiswatch-tooltip:after{left: 50% !important;transform: translateX(-50%);}.hulkapps_swatch_option, .hulkapps_mswatch_option{margin-bottom: 10px !important;}.hulkapps_buton_option .hulkapps_option_child{ width: auto;min-height: 36px;padding: 15px;border: 1px solid;border-radius: 0;line-height: 1.13;font-weight: 400;display: flex;justify-content: center;align-items: center;margin-right: 0;margin-bottom: 8px;}.button_selected {color: " + V + " !important;background-color: " + K + " !important;border-color: " + J) + " !important;font-weight: 400 !important;}.hulkapps_option_set input::placeholder,.hulkapps_option_set textarea::placeholder  {color: #a9a9a9;font-size: 16px !important;font-weight: 700;font-family: sans-serif;}.conditional, .is_hulk_hide{display:none !important}.has-float-label .hulkapps_option_name{display: none !important}.has-float-label .hulkapps_option_value{display: block;width: 100%}.has-inline-label .hulkapps_option_name{display: none !important}.has-inline-label .hulkapps_option_value{display: block;width: 100%}.has-float-label .hulkapps_option_value{ position: relative;}.has-float-label .hulkapps_option_value .floating_label{position: absolute;top: 24%;left: 10px;}input:focus .floating_label { position: absolute;top: 30%;left: 10px;}.has-float-label .hulkapps_option_value textarea,.has-float-label .hulkapps_option_value input,.has-float-label .hulkapps_option_value select{ position: relative;z-index: 1;background-color: transparent;}.has-float-label .hulkapps_option_value .floating_label {position: absolute;top: 24%;left: 10px;transition: all .2s;}.has-float-label .hulkapps_option_value select ~ label.floating_label {cursor: text;opacity: 1;transition: all .2s;top: -0.5em !important;z-index: 3;line-height: 1;padding: 0 1px;left: 10px;position: absolute; z-index: 2;}.has-float-label .hulkapps_option_value input:not(:focus) ~ .floating_label,.has-float-label .hulkapps_option_value textarea:not(:focus) ~ .floating_label {opacity: 1;top: 0.3em;}.has-float-label .hulkapps_option_value input:focus ~ .floating_label,.has-float-label .hulkapps_option_value textarea:focus ~ .floating_label{top: -0.9em !important;z-index: 2;}.has-float-label .hulkapps_option_value .floating_label:after,.has-float-label .hulkapps_option_value input:focus ~ .floating_label:after,.has-float-label .hulkapps_option_value textarea:focus ~ .floating_label:after {content: '';display: block; position: absolute; background: #F7F7F7;height: 2px;top: 50%;left: -0.2em;right: -0.2em;z-index: -1;} " + $ + v + f + m,
              g = "<script>(function($) {$('.hulkapps_swatch_option, .hulkapps_mswatch_option').mouseover(function() {var x = $(this).find('.hulkapps-tooltip ').position();var right = $(window).width() - x.left - $(this).find('.hulkapps-tooltip ').width();if(x.left < 205){$(this).find('.hulkapps-tooltip ').addClass('tooltip-left-pos');}if(right < 160){$(this).find('.hulkapps-tooltip ').addClass('tooltip-right-pos');}});$(window).width()<=768&&$('.hulkapps-tooltip').each(function(){var t=$(this).position(),i=$(window).width()-t.left-$(this).width(),o=t.left-i;o<50&&o>-50?$(this).addClass('tooltip-center-pos'):t.left<i?$(this).addClass('tooltip-left-pos'):i<t.left&&$(this).addClass('tooltip-right-pos')});" + i.advanced_users.custom_js + "}(hulkapps_jQuery))</script>",
              Z = "<div id='hulkapps_options_" + i.pid + "' class='hulkapps_product_options'>";
            Z = (Z = (Z = Z + "" + e + "<style>" + H + "</style>" + g) + "<div class='hulkapps_option_title'>" + p + "</div>") + "<div id='hulkapps_option_list_" + i.pid + "' >", "" !== z || 1 == parseInt(z) ? Z += "<input type='hidden' id='hulk_amount_dis' value='1'>" : Z += "<input type='hidden' id='hulk_amount_dis' value='0'>", i.relationship;
            var X = "";
            if (window.opt_with_otc = {}, window.is_hulk_required_options = !1, 0 != i.relationship_option.length) {
              var W = "<span class='hulkapps-required'> * </span>";
              Z += "<div class='hulkapps_option_set option-selectors'>", t.each(i.relationship_option, function(e, a) {
                var n = parseInt(a[0]);
                let p = [];
                for (let [l, r] of Object.entries(o)) r.includes(n) && p.push(l);
                var u = a[1];
                if (i.option_id_array.indexOf(n) >= 0) {
                  var h = t.trim(i.option_associative_array[n].option_name),
                    v = t.trim(i.option_associative_array[n].is_one_time_charge),
                    f = t.trim(i.option_associative_array[n].option_unique_name),
                    k = t.trim(i.image_color_position_class),
                    m = t.trim(i.image_color_shape_class),
                    g = t.trim(i.option_associative_array[n].tooltip),
                    $ = t.trim(i.option_associative_array[n].helptext),
                    I = t.trim(i.option_associative_array[n].id_name),
                    z = "" != I ? 'id="' + I + '"' : "",
                    O = t.trim(i.option_associative_array[n].class_name),
                    T = t.trim(i.option_associative_array[n].placeholder),
                    D = t.trim(i.option_associative_array[n].tooltip_hyperlink),
                    M = t.trim(i.option_associative_array[n].helptext_hyperlink);
                  if (g.length > 0) {
                    var N = "<div class='hulkapps-tooltip'><span aria-describedby='tooltip_" + n + "'><img src='" + window.hulkapps.po_url + "/tooltip.svg' style='width:15px;'></span><div class='hulkapps-tooltip-inner' id='tooltip_" + n + "' role='tooltip'>";
                    if (D.length > 0) var N = N + '<a href="' + D + '" target="_blank"> ' + g + "</a></div></div>";
                    else var N = N + g + "</div></div>"
                  } else var N = "";
                  if ($.length > 0) {
                    if (M.length > 0) var Q = '<span class="hulkapps_helptext"><a href="' + M + '" target="_blank"> ' + $ + "</a></span>";
                    else var Q = "<span class='hulkapps_helptext'>" + $ + "</span>"
                  } else var Q = "";
                  var U = i.option_associative_array[n].extra_field,
                    B = i.option_associative_array[n].option_type,
                    K = i.option_associative_array[n].is_quantity_selector,
                    J = i.option_associative_array[n].is_thumbnail_change,
                    V = i.option_associative_array[n].google_fonts,
                    H = i.option_associative_array[n].google_font_with_price,
                    Z = i.option_associative_array[n].default_selection_google_font,
                    G = i.option_associative_array[n].default_selection_google_price,
                    Y = n,
                    tt = t.parseJSON(i.option_associative_array[n].values_json),
                    ti = i.hide_show_array[Y] ? i.hide_show_array[Y] : "";
                  let te = "",
                    to = "";
                  var ta = [];
                  let tn = "",
                    tp = "";
                  p.forEach(e => {
                    t.each(i.condition, function(o, a) {
                      let p = a.id;
                      var l = hulkapps_jQuery.parseJSON(a.conditions);
                      p == e && (t.each(l.actions, function(t, e) {
                        checkPlan("enhanced_conditional_logic", "boolean", i.plan_id, i.plans_features, i.is_on_trial_period) && e.option == n && e.action_option_value && ta.push(e.action_option_value.toString().trim())
                      }), t.each(l.actions, function(t, i) {
                        return 1 == parseInt(i.action_type) && ti.includes("condition_show") ? (te += " conditional_logic_" + e + "_" + (to = "show"), !1) : ti.includes("condition_hide") ? (te += " conditional_logic_" + e + "_" + (to = "hide"), !1) : void 0
                      }))
                    })
                  }), ta.length > 0 && (tn = te, tp = ti, te = "", ti = "");
                  var tl = "",
                    ts = "",
                    tr = "required" == u ? "required" : "";
                  "required" == u && (window.is_hulk_required_options = !0);
                  var t8 = 0 == parseInt(d) ? "full_width" : "",
                    td = "required" == u ? W : "",
                    tu = "1" == i.options_container_style.enable_tooltip ? N : "",
                    tc = "1" == s && Q.length > 0 ? "<div class='hulkapps_helptext_div'>" + Q + "</div>" : "";
                  let th = "_hin_" + f + "_hin_" + h;
                  if (window.opt_with_otc[th] = v, "dropdown" == B) {
                    tx = "<div class='hulkapps_option dd_render " + A + " " + te + " " + tr + " " + t8 + " option_type_id_" + Y + " " + ti + " " + O + "' " + z + " data-parent-id= " + Y + ">", tx += "<div class='hulkapps_option_name'>" + h + " " + td + " " + tu + " " + tc + "</div>", tx += "<div id='hulkapps_selector' class='hulkapps_option_value'>", tx += "<select class='hulkapps_option_child hulkapps_option_" + Y + "_visible hulkapps_full_width hulkapps_dd' data-option-key='dd_" + Y + "' id='" + Y + "' >", "inlineLabels" == F && (T = h), "" == T ? tx += "<option value='' class=" + te + ">Choose " + h + "</option>" : tx += "<option value='' class=" + te + ">" + T + "</option>";
                    var tv = !1,
                      tf = "none",
                      tk = "",
                      tm = "",
                      tg = "";
                    t.each(tt, function(t, e) {
                      var o = e[1];
                      "percentage_charge" == e[9] && null != o && "" != o && (o = parseFloat(product_price) / 100 * o / 100, o = parseFloat(o.toFixed(2)));
                      var a = null != o && "" != o ? " [ " + i.currency_symbol + o + " ]" : "",
                        n = null != o && "" != o && 0 == P ? " (+" + i.currency_symbol + o + ")" : "",
                        p = null != o && "" != o ? o : "0.00",
                        l = e[4];
                      !0 == l && (tm = e[0].toString().trim() + a, tf = "block");
                      var s = !0 == l ? "selected" : "",
                        r = "" != p ? "price-change" : "",
                        d = "",
                        u = "";
                      let c = "" != e[5] && null != e[5] ? e[5] : "",
                        v = parseInt(e[6]);
                      var f = "";
                      let k = "" != e[7] && null != e[7] ? e[7] : "",
                        m = "" != e[8] && null != e[8] ? e[8] : "";
                      var g = "" != e[10] && null != e[10] ? e[10] : "",
                        $ = "disabled";
                      checkPlan("inventory_and_sku_management", "boolean", i.plan_id, i.plans_features, i.is_on_trial_period) && ("true" == c.toString() && "true" != k.toString() && v <= 0 && ("true" == m.toString() ? (d = "disabled", s = "") : (u = "is_hulk_hide", d = "disabled", s = "")), "true" == c.toString() && (tv = !0), "true" == c.toString() && "true" != k.toString() && (f = v, !0 == l && "" == d && (tk = e[0].toString().trim() + a + "_hin_" + f)), (!0 == l && v > 0 && "true" != k.toString() || !0 == l && v <= 0 && "true" == k.toString()) && ($ = ""), "" != g && (tg = tg + "<input type='hidden' name='properties[_SKU_" + h + "(" + e[0].toString().trim() + ")]' value='" + g + "' class='hulk_unique_sku' data-sku-identifier='" + e[0].toString().trim() + "' " + $ + ">")), ta.length > 0 && ta.includes(e[0].toString().trim()) ? (tl = tn, ts = tp) : (tl = "", ts = ""), tx = tx + "<option class='" + r + " " + tl + " " + ts + " " + u + "' " + s + " data-hinventory='" + f + "' " + d + " data-price='" + p + "' data-conditional-value='" + e[0].toString().trim() + "' value='" + e[0].toString().trim() + a + "'>" + e[0].toString().trim() + n + "</option>"
                    });
                    var t$ = "";
                    tv && (t$ = "<input type='hidden' name='properties[_hin_" + f + "_hin_" + h + "]' value='" + tk + "' class='hulk_unique_prop' data-unique_prop_name='_hin_" + f + "_hin_" + h + "'/>"), tx += "</select>" + tg + t$, checkPlan("quantity_selector", "boolean", i.plan_id, i.plans_features, i.is_on_trial_period) && K && (tx += "<input style='display: " + tf + "' type='number' min='1' value='1' class='hulk_options_quantity' id='quantity_" + Y + "'/>"), tx += "<input type='hidden' name='properties[" + h + "]' value='" + tm + "' class='hulk_dropdown_hidden_prop'/>", "floatingLabels" == F && (tx += "<label class='floating_label'>" + h + "</label>"), tx += "<script>(function($) {$(document).on('change','.hulkapps_product_options #hulkapps_option_list_" + i.pid + " #" + Y + "', function() {if($(this).val()){$(this).parent('.hulkapps_option_value').find('.hulk_options_quantity').show(); }else{$(this).parent('.hulkapps_option_value').find('.hulk_options_quantity').hide();}$(this).parents('.dd_render').find('.hulk_unique_sku').prop('disabled', true);$(this).parents('.dd_render').find('.inventory_error').html(''); var opt_qty = ''; if($(this).parent('.hulkapps_option_value').find('.hulk_options_quantity').val()){opt_qty = ` | ${$(this).parent('.hulkapps_option_value').find('.hulk_options_quantity').val()}`} if($(this).parent('.hulkapps_option_value').find('.hulk_unique_prop') && $(this).parent('.hulkapps_option_value').find('.hulk_unique_prop').length > 0  ){if($(this).val() && $(this).children('option:selected').data('hinventory')){$(this).parent('.hulkapps_option_value').find('.hulk_unique_prop') .val($(this).val() + '_hin_' + $(this).children('option:selected').data('hinventory') + opt_qty )}else{$(this).parent('.hulkapps_option_value').find('.hulk_unique_prop') .val('')}};if($(this).val()) {$(this).parent('.hulkapps_option_value').find('.hulk_dropdown_hidden_prop').val($(this).val() + opt_qty );}else{$(this).parent('.hulkapps_option_value').find('.hulk_dropdown_hidden_prop').val(''); }var cond_value = $(this).find('option:selected').data('conditional-value');if(cond_value){$(this).parents('.dd_render').find(`[data-sku-identifier='${cond_value}']`).removeAttr('disabled')};conditional_rules(" + i.pid + ",'hulkapps_product_options');if($('#hulk_amount_dis').val() == '1'){calc_options_total(" + i.pid + ",'hulkapps_product_options');}validate_single_option('option_type_id_" + Y + "','dd_render','hulkapps_product_options');});$(document).on('change','.hulkapps_product_options #hulkapps_option_list_" + i.pid + " #quantity_" + Y + "', function() { $(this).parent('.hulkapps_option_value').find('.hulk_dropdown_hidden_prop') .val($(this).parent('.hulkapps_option_value').find('.hulkapps_option_child').val() + ' | ' + $(this).val() ); if($(this).parent('.hulkapps_option_value').find('.hulk_unique_prop') && $(this).parent('.hulkapps_option_value').find('.hulk_unique_prop') .length > 0){if($(this).parent('.hulkapps_option_value').find('.hulkapps_option_child').children('option:selected').data('hinventory')){$(this).parent('.hulkapps_option_value').find('.hulk_unique_prop').val($(this).parent('.hulkapps_option_value').find('.hulkapps_option_child').val() + '_hin_' + $(this).parent('.hulkapps_option_value').find('.hulkapps_option_child').children('option:selected').data('hinventory') + ' | ' + $(this).val() )}else{$(this).parent('.hulkapps_option_value').find('.hulk_unique_prop') .val('')}};if($('#hulk_amount_dis').val() == '1'){calc_options_total(" + i.pid + ",'hulkapps_product_options');}});}(hulkapps_jQuery))</script></div></div>", checkPlan("image_change_based_on_option_value", "boolean", i.plan_id, i.plans_features, i.is_on_trial_period) && !0 == J && "" != R && (tx += "<script>(function($) {$(document).on('change','.hulkapps_product_options #hulkapps_option_list_" + i.pid + " #" + Y + "', function()  { var option_val  = $(this).find(':selected').data('conditional-value');$('" + R + "').each(function(){data_title = $(this).attr('alt');if(option_val === data_title){$(this).click();}});});;}(hulkapps_jQuery))</script>"), X += tx
                  } else if ("dropdown_multiple" == B) {
                    var ty = void 0 != U && "" != U && "" != U.minimum_selection && void 0 != U.minimum_selection ? U.minimum_selection.toString() : "0",
                      tb = void 0 != U && "" != U && "" != U.maximum_selection && void 0 != U.maximum_selection ? U.maximum_selection.toString() : "0",
                      t_ = "0" != ty && "0" != tb && checkPlan("validation_for_min_max_option_selection", "boolean", i.plan_id, i.plans_features, i.is_on_trial_period) ? '<span class="selection-text">[Choose from ' + ty + " to " + tb + " values]</span>" : "0" != ty && checkPlan("validation_for_min_max_option_selection", "boolean", i.plan_id, i.plans_features, i.is_on_trial_period) ? '<span class="selection-text">[Choose at least ' + ty + " values]</span>" : "0" != tb && checkPlan("validation_for_min_max_option_selection", "boolean", i.plan_id, i.plans_features, i.is_on_trial_period) ? '<span class="selection-text">[Choose upto ' + tb + " values]</span>" : "",
                      tx = "<div class='hulkapps_option dd_multi_render " + A + " " + te + " " + tr + " " + t8 + "  option_type_id_" + Y + " " + ti + " " + O + "' " + z + " data-parent-id='" + Y + "'>";
                    tx += "<div class='hulkapps_option_name'>" + h + " " + td + " " + tu + " " + t_ + tc + "</div>", tx += "<div class='hulkapps_option_value'>", tx += "<select multiple class='hulkapps_option_child hulkapps_option_" + Y + "_visible hulkapps_full_width hulkapps_dd' data-option-key='dd_" + Y + "' id='" + Y + "' name='hulkapps_multiple_dropdown' style='background:none;' data-min='" + ty + "' data-max='" + tb + "'>";
                    var tm = [],
                      tk = [],
                      t9 = 0;
                    "inlineLabels" == F && (T = h), "" != T && (tx += "<option value='' class=" + te + ">" + T + "</option>");
                    var tg = "";
                    t.each(tt, function(t, e) {
                      ta.length > 0 && ta.includes(e[0].toString().trim()) ? (tl = tn, ts = tp) : (tl = "", ts = "");
                      var o = e[1];
                      "percentage_charge" == e[9] && null != o && "" != o && (o = parseFloat(product_price) / 100 * o / 100, o = parseFloat(o.toFixed(2)));
                      var a = null != o && "" != o ? " [ " + i.currency_symbol + o + " ]" : "",
                        n = null != o && "" != o && 0 == P ? " (+" + i.currency_symbol + o + ")" : "",
                        p = null != o && "" != o ? o : "0.00",
                        l = e[4];
                      !0 == l && (t9 += 1, tm.push(e[0].toString().trim() + a));
                      var s = !0 == l ? "selected" : "",
                        r = "" != p ? "price-change" : "",
                        d = "",
                        u = "";
                      let c = "" != e[5] && null != e[5] ? e[5] : "",
                        v = parseInt(e[6]);
                      var f = "";
                      let k = "" != e[7] && null != e[7] ? e[7] : "",
                        m = "" != e[8] && null != e[8] ? e[8] : "";
                      var g = "" != e[10] && null != e[10] ? e[10] : "",
                        $ = "disabled";
                      checkPlan("inventory_and_sku_management", "boolean", i.plan_id, i.plans_features, i.is_on_trial_period) && ("true" == c.toString() && "true" != k.toString() && v <= 0 && ("true" == m.toString() ? (d = "disabled", s = "", r = "", !0 == l && tm.pop(e[0].toString().trim() + a)) : (u = "is_hulk_hide", d = "disabled", s = "", r = "", !0 == l && tm.pop(e[0].toString().trim() + a))), "true" == c.toString() && (tv = !0), "true" == c.toString() && "true" != k.toString() && (f = v, !0 == l && "" == u && "" == d && tk.push(e[0].toString().trim() + a + "_hin_" + f)), (!0 == l && v > 0 && "true" != k.toString() || !0 == l && v <= 0 && "true" == k.toString()) && ($ = ""), "" != g && (tg = tg + "<input type='hidden' name='properties[_SKU_" + h + "(" + e[0].toString().trim() + ")]' value='" + g + "' class='hulk_unique_sku' data-sku-identifier='" + e[0].toString().trim() + "' " + $ + ">")), tx = tx + "<option class='" + tl + " " + ts + " " + r + " " + u + "' " + s + " data-hinventory='" + f + "' " + d + " data-price='" + p + "' data-conditional-value='" + e[0].toString().trim() + "' value='" + e[0].toString().trim() + a + "'>" + e[0].toString().trim() + n + "</option>"
                    }), t9 > 0 && ("0" != ty && "0" != tb && checkPlan("validation_for_min_max_option_selection", "boolean", i.plan_id, i.plans_features, i.is_on_trial_period) ? (parseInt(t9) < parseInt(ty) || parseInt(t9) > parseInt(tb)) && (tx += '</select><span class="validation_error error_span">Choose from ' + ty + " to " + tb + " values</span>") : "0" != ty && "0" == tb && checkPlan("validation_for_min_max_option_selection", "boolean", i.plan_id, i.plans_features, i.is_on_trial_period) ? parseInt(t9) < parseInt(ty) && (tx += '</select><span class="validation_error error_span">Choose at least ' + ty + " values</span>") : "0" == ty && "0" != tb && checkPlan("validation_for_min_max_option_selection", "boolean", i.plan_id, i.plans_features, i.is_on_trial_period) && parseInt(t9) > parseInt(tb) && (tx += '</select><span class="validation_error error_span">Choose upto ' + tb + " values</span>"));
                    var tw = '<span class="validation_error error_span" >';
                    "floatingLabels" == F && (tx += "</select><label class='floating_label'>" + h + "</label>");
                    var t$ = "";
                    tv && (t$ = "<input type='hidden' name='properties[_hin_" + f + "_hin_" + h + "]' value='" + tk + "' class='hulk_unique_prop' data-unique_prop_name='_hin_" + f + "_hin_" + h + "' data-selection-multi='true'/>"), tx += tg + t$, tx += "<input class='hulkapps_option_child' type='hidden' value='" + tm.join(", ") + "' id='hulkapps_option_" + Y + "_hidden' name='properties[" + h + "]'><script>(function($) {$(document).on('change','.hulkapps_product_options #hulkapps_option_list_" + i.pid + " #" + Y + "', function() {$(this).parents('.dd_multi_render').find('.hulk_unique_sku').prop('disabled', true);$(this).parents('.dd_multi_render').find('.inventory_error').html('');if ((" + ty + " != 0) && (" + tb + " != 0) && (checkPlan('validation_for_min_max_option_selection','boolean'," + i.plan_id + "," + i.plans_features + "," + i.is_on_trial_period + "))) {if ($(this).find('option:selected').length < '" + ty + "') {$(this).parents('.hulkapps_option').removeClass('validation_error').find('.error_span').remove();$(this).parents('.hulkapps_option').find('.hulkapps_option_value #" + Y + "').after('" + tw + "Choose from " + ty + " to " + tb + " values</span>');if ($(this).find('option:selected').length == 0) {$(this).parents('.hulkapps_option').removeClass('validation_error').find('.error_span').remove();}} else if ($(this).find('option:selected').length > " + tb + ") {$('#" + Y + " option:selected:last').prop('selected',false);$(this).parents('.hulkapps_option').removeClass('validation_error').find('.error_span').remove();$(this).parents('.hulkapps_option').find('.hulkapps_option_value #" + Y + "').after('" + tw + "Choose from " + ty + " to " + tb + " values</span>');if ($(this).find('option:selected').length == '" + tb + "') {$(this).parents('.hulkapps_option').removeClass('validation_error').find('.error_span').remove();}} else {$(this).parents('.hulkapps_option').removeClass('validation_error').find('.error_span').remove();}} else if (checkPlan('validation_for_min_max_option_selection','boolean'," + i.plan_id + "," + i.plans_features + "," + i.is_on_trial_period + ") && " + ty + " != 0) {if ($(this).find('option:selected').length < '" + ty + "') {$(this).parents('.hulkapps_option').removeClass('validation_error').find('.error_span').remove();$(this).parents('.hulkapps_option').find('.hulkapps_option_value #" + Y + "').after('" + tw + "Choose at least " + ty + " values</span>');} else {$(this).parents('.hulkapps_option').removeClass('validation_error').find('.error_span').remove();}} else if (checkPlan('validation_for_min_max_option_selection','boolean'," + i.plan_id + "," + i.plans_features + "," + i.is_on_trial_period + ") && " + tb + " != 0) {if ('" + tb + "' >= $(this).find('option:selected').length) {if ('" + tb + "' == $(this).find('option:selected').length) {$(this).parents('.hulkapps_option').removeClass('validation_error').find('.error_span').remove();} else {$(this).parents('.hulkapps_option').removeClass('validation_error').find('.error_span').remove();$(this).parents('.hulkapps_option').find('.hulkapps_option_value #" + Y + "').after('" + tw + "Choose upto " + tb + " values</span>');}} else {$(this).parents('.hulkapps_option').removeClass('validation_error').find('.error_span').remove();$('.hulkapps_product_options').find('#" + Y + " option:selected:last').prop('selected',false);}} else {$(this).parents('.hulkapps_option').removeClass('validation_error');}var chkMulti = $.map($('.hulkapps_product_options').find('.hulkapps_option_" + Y + "_visible:not([disabled])  :selected'), function(el, i) {return $(el).val();});console.log('pp',$('.hulkapps_product_options').find('.hulkapps_option_" + Y + "_visible:not([disabled]):selected'));$('.hulkapps_product_options').find('#hulkapps_option_" + Y + "_hidden').val(chkMulti.join(', '));var chkMultiinventory = $.map($('.hulkapps_product_options').find('.hulkapps_option_" + Y + "_visible:not([disabled]) :selected'), function(el, i) {if($(el).data('hinventory') != ''){return $(el).val() + '_hin_' + $(el).data('hinventory')};});if($(this).parent('.hulkapps_option_value').find('.hulk_unique_prop') .length > 0){$(this).parent('.hulkapps_option_value').find('.hulk_unique_prop') .val(chkMultiinventory.join(', '))};$('.hulkapps_product_options').find('.hulkapps_option_" + Y + "_visible:not([disabled]) :selected').each(function( index ) { var cond_value = $(this).data('conditional-value');if(cond_value){$(this).parents('.dd_multi_render').find(`[data-sku-identifier='${cond_value}']`).removeAttr('disabled')}});conditional_rules(" + i.pid + ",'hulkapps_product_options');if($('#hulk_amount_dis').val() == '1'){calc_options_total(" + i.pid + ",'hulkapps_product_options');}validate_single_option('option_type_id_" + Y + "', 'dd_multi_render','hulkapps_product_options');});}(hulkapps_jQuery))</script></div></div>", X += tx
                  } else if ("swatch" == B) {
                    var tC = 0,
                      tx = "<div class='hulkapps_option swatch_render " + te + " " + tr + " " + t8 + " option_type_id_" + Y + " " + ti + " " + O + "' " + z + " data-parent-id='" + Y + "' >";
                    tx += "<div class='hulkapps_option_name'>" + h + " " + td + " " + tu + " " + tc + "</div>", tx += "<div class='hulkapps_option_value'>";
                    var tv = !1,
                      tk = "",
                      tm = "",
                      tf = "none";
                    t.each(tt, function(t, e) {
                      ta.length > 0 && ta.includes(e[0].toString().trim()) ? (tl = tn, ts = tp) : (tl = "", ts = "");
                      var o = e[1];
                      "percentage_charge" == e[9] && null != o && "" != o && (o = parseFloat(product_price) / 100 * o / 100, o = parseFloat(o.toFixed(2)));
                      var a = "" != e[0] ? e[0] : "",
                        n = "" != e[2] ? e[2] : "",
                        p = "" != e[3] ? e[3] : "",
                        l = null != o && "" != o ? " [ " + i.currency_symbol + o + " ]" : "",
                        s = null != o && "" != o && 0 == P ? " (+" + i.currency_symbol + o + ")" : "",
                        r = null != o && "" != o ? o : "0.00",
                        d = "" != r ? "price-change" : "",
                        u = e[4];
                      !0 == u && (tm = e[0].toString().trim() + l, tf = "block");
                      var c = !0 == u ? "swatch_selected" : "",
                        v = !0 == u ? "checked" : "",
                        f = "<p>" + e[0] + " <br> " + s + "</p>",
                        k = "",
                        m = "",
                        g = "";
                      let $ = "" != e[5] && null != e[5] ? e[5] : "",
                        q = parseInt(e[6]);
                      var j = "";
                      let L = "" != e[7] && null != e[7] ? e[7] : "",
                        E = "" != e[8] && null != e[8] ? e[8] : "";
                      var F = "" != e[10] && null != e[10] ? e[10] : "",
                        A = "",
                        I = "disabled";
                      checkPlan("inventory_and_sku_management", "boolean", i.plan_id, i.plans_features, i.is_on_trial_period) && ("true" == $.toString() && "true" != L.toString() && q <= 0 && ("true" == E.toString() ? (m = "is_hulk_disabled", k = "disabled", c = " ", d = " ") : (g = "is_hulk_hide", k = "disabled", c = "", d = "")), "true" == $.toString() && (tv = !0), "true" == $.toString() && "true" != L.toString() && (j = q, !0 == u && "" == g && "" == k && (tk = e[0].toString().trim() + l + "_hin_" + j)), (!0 == u && q > 0 && "true" != L.toString() || !0 == u && q <= 0 && "true" == L.toString()) && (I = ""), "" != F && (A = "<input type='hidden' name='properties[_SKU_" + h + "(" + e[0].toString().trim() + ")]' value='" + F + "' class='hulk_unique_sku' " + I + ">"));
                      var z = "";
                      if ("image" == n) D = "background-image:url(" + p + "); background-size:cover;background-position: center center;" + C, M = "data-image='" + p + "'", z = p;
                      else {
                        try {
                          var O = p.split(",")
                        } catch (T) {
                          O = null
                        }
                        if (null != O) {
                          if (void 0 != O[1]) var D = swatch_color_dual_ton = "background: linear-gradient(to bottom, " + O[0] + " 0%, " + O[0] + " 50%, " + O[1] + " 50%, " + O[1] + " 100%); " + C,
                            M = "data-image=''";
                          else var D = "background-color:" + O[0] + ";" + C,
                            M = "data-image=''"
                        }
                      }
                      if (void 0 != f) {
                        if (void 0 != p) {
                          if ("both" == x) var N = "<div style='text-align:center;'><div class='swatch_tooltip_title'> " + f + "</div><div class='swatch_tooltip_data' style='width:100%;padding-top:100%;" + D + "'></div></div>";
                          else N = "image_only" == x ? "<div style='text-align:center;'><div class='swatch_tooltip_data' style='width:100%;padding-top:100%;" + D + "'></div></div>" : "<div style='text-align:center;'><div class='swatch_tooltip_title'> " + f + "</div></div>"
                        } else N = "<div style='text-align:center;'><div class='swatch_tooltip_title'> " + f + "</div></div>"
                      } else N = "<div style='text-align:center;'><div class='swatch_tooltip_title'></div></div>";
                      tooltip_val = "<div class='hulkapps-tooltip-inner swatch-tooltip' style='width:200px;'><div>" + N + "</div></div>", tooltip_display_html = 1 == parseInt(w) ? tooltip_val : "", swatch_with_text = 1 == parseInt(S) ? a : "", tx += "<label class='hulkapps_swatch_option " + g + " " + tl + " " + ts + " " + m + "' ><div class='hulkapps-tooltip " + _ + "'>" + tooltip_display_html + "<div class='  '><div id='" + Y + "_" + tC + "' data-option-key='rb_" + Y + "_" + tC + "' class='hulkapps_option_child " + c + " hulkapps_option_" + Y + " " + d + " '  data-price='" + r + "' data-conditional-value='" + e[0].toString().trim() + "' value='" + e[0].toString().trim() + "' style='" + y + b + D + "' " + _ + "><input name='hulk_swatch_" + Y + "' type='radio'  data-hinventory='" + j + "' " + k + " value='" + e[0].toString().trim() + l + "' class=' swatch_radio' " + v + " style='display:none;' " + M + " ></div></div></div><div style='display: inline-block;vertical-align: middle;margin-left: 10px;'>" + swatch_with_text + "</div>" + A + "</label>", tC += 1
                    });
                    var t$ = "";
                    tv && (t$ = "<input type='hidden' name='properties[_hin_" + f + "_hin_" + h + "]' value='" + tk + "' class='hulk_unique_prop' data-unique_prop_name='_hin_" + f + "_hin_" + h + "' />"), tx += t$, checkPlan("quantity_selector", "boolean", i.plan_id, i.plans_features, i.is_on_trial_period) && K && (tx += "<input style='display: " + tf + "'type='number' min='1' value='1' class='hulk_options_quantity' id='quantity_" + Y + "'/>"), tx += "<input type='hidden' name='properties[" + h + "]' value='" + tm + "' class='hulk_swatch_hidden_prop'/><script>(function($) {$('.hulkapps_product_options .hulkapps_option_" + Y + "').on('change', function(event) {$(this).click();});$('.hulkapps_product_options .hulkapps_option_" + Y + "').click(function (){", 1 == q && (tx += "var swatch_image_url = " + t(this).find(".swatch_radio").attr("data-image") + "if (" + swatch_image_url + " != ''){$('.hulkapps_swatch_image_change img').attr('src'," + swatch_image_url + ");$('.hulkapps_swatch_image_change img').attr('srcset'," + swatch_image_url + ");$('.hulkapps_swatch_image_change img').attr('data-srcset'," + swatch_image_url + ");}"), tx += "$(this).parents('.swatch_render').find('.hulk_unique_sku').prop('disabled', true);$(this).parents('.hulkapps_option_value').find('.hulk_options_quantity').show(); var opt_qty = ''; if($(this).parents('.hulkapps_option_value').find('.hulk_options_quantity').val()){opt_qty = ` | ${$(this).parents('.hulkapps_option_value').find('.hulk_options_quantity').val()}`}if($(this).parents('.hulkapps_option_value').find('.hulk_unique_prop') && $(this).parents('.hulkapps_option_value').find('.hulk_unique_prop').length > 0){if($(this).find('.swatch_radio').data('hinventory')){$(this).parents('.hulkapps_option_value').find('.hulk_unique_prop').val($(this).find('.swatch_radio').val() + '_hin_' + $(this).find('.swatch_radio').data('hinventory')+ opt_qty )}else{$(this).parents('.hulkapps_option_value').find('.hulk_unique_prop').val('')}};$(this).find('swatch_radio').prop('checked', true);$(this).parents('.swatch_render').find('.swatch_selected').removeClass('swatch_selected');$(this).parents('.swatch_render').find('.inventory_error').html('');$(this).addClass('swatch_selected');$(this).parents('.hulkapps_option_value').find('.hulk_swatch_hidden_prop').val($(this).find('.swatch_radio').val() + opt_qty );$(this).parents('.swatch_render').find('.inventory_error').html('');$(this).addClass('swatch_selected');$(this).parents('label').find('.hulk_unique_sku').prop('disabled', false);conditional_rules(" + i.pid + ",'hulkapps_product_options');if($('#hulk_amount_dis').val() == '1'){calc_options_total(" + i.pid + ",'hulkapps_product_options');}validate_single_option('option_type_id_" + Y + "','swatch_render','hulkapps_product_options');});$(document).on('change','.hulkapps_product_options #hulkapps_option_list_" + i.pid + " #quantity_" + Y + "', function() { $(this).parent('.hulkapps_option_value').find('.hulk_swatch_hidden_prop').val($(this).parents('.hulkapps_option_value').find('.swatch_radio:checked').val() + ' | ' + $(this).val() ); if($(this).parents('.hulkapps_option_value').find('.hulk_unique_prop') && $(this).parents('.hulkapps_option_value').find('.hulk_unique_prop').length > 0 && $(this).parent('.hulkapps_option_value').find('.swatch_radio:checked').data('hinventory')){$(this).parents('.hulkapps_option_value').find('.hulk_unique_prop').val($(this).parent('.hulkapps_option_value').find('.swatch_radio:checked').val() + '_hin_' + $(this).parent('.hulkapps_option_value').find('.swatch_radio:checked').data('hinventory') + ' | ' + $(this).val() )}else{$(this).parents('.hulkapps_option_value').find('.hulk_unique_prop').val('');}if($('#hulk_amount_dis').val() == '1'){calc_options_total(" + i.pid + ",'hulkapps_product_options');}});}(hulkapps_jQuery))</script></div></div>", checkPlan("image_change_based_on_option_value", "boolean", i.plan_id, i.plans_features, i.is_on_trial_period) && !0 == J && "" != R && (tx += "<script>(function($) {$('.hulkapps_product_options .hulkapps_option_" + Y + "').change(function() { var option_val  = $(this).data('conditional-value');$('" + R + "').each(function(){data_title = $(this).attr('alt');if(option_val === data_title){$(this).click();}});});;}(hulkapps_jQuery))</script>"), X += tx
                  } else if ("color_image_dropdown" == B) {
                    if (checkPlan("color_image_dropdown", "boolean", i.plan_id, i.plans_features, i.is_on_trial_period)) {
                      tx = "<div class='hulkapps_option ci_render dd_render" + te + " " + tr + " " + t8 + " option_type_id_" + Y + " " + ti + " " + O + "' " + z + " data-parent-id= " + Y + ">", tx += "<div class='hulkapps_option_name' data-option-name='" + h + "'>" + h + " " + td + " " + tu + " " + tc + "</div>", tx += "<div class='hulkapps_option_value hulkapps_product_options_ul_parent'>", tx += "<ul class='hulkapps_option_child hulkapps_product_options_ul hulkapps_option_" + Y + "_visible hulkapps_full_width hulkapps_dd ' data-option-key='dd_" + Y + "' id='" + Y + "' >";
                      var tq = "";
                      tq = "" == T ? "<li value='' class='init'>Choose " + h + "</li>" : "<li value='' class='init'>" + T + "</li>";
                      var tS = "",
                        tv = !1,
                        tk = "",
                        tm = "",
                        tf = "none";
                      t.each(tt, function(t, e) {
                        var o = "image";
                        "color" == e[2] && (o = "color");
                        var a = e[3],
                          n = e[1];
                        "percentage_charge" == e[9] && null != n && "" != n && (n = parseFloat(product_price) / 100 * n / 100, n = parseFloat(n.toFixed(2)));
                        var p = null != n && "" != n ? " [ " + i.currency_symbol + n + " ]" : "",
                          l = null != n && "" != n && 0 == P ? " (+" + i.currency_symbol + n + ")" : "",
                          s = null != n && "" != n ? n : "0.00",
                          r = e[4],
                          d = !0 == r ? "selected" : "",
                          u = "" != s ? "price-change" : "",
                          c = "",
                          v = "",
                          f = "";
                        let g = "" != e[5] && null != e[5] ? e[5] : "",
                          $ = parseInt(e[6]);
                        var y = "";
                        let b = "" != e[7] && null != e[7] ? e[7] : "",
                          _ = "" != e[8] && null != e[8] ? e[8] : "";
                        var x = "" != e[10] && null != e[10] ? e[10] : "",
                          w = "",
                          C = "disabled";
                        checkPlan("inventory_and_sku_management", "boolean", i.plan_id, i.plans_features, i.is_on_trial_period) && ("true" == g.toString() && "true" != b.toString() && $ <= 0 && ("true" == _.toString() ? (v = "disabled", c = "is_hulk_disabled", d = "") : (f = "is_hulk_hide", v = "disabled", d = "")), "true" == g.toString() && (tv = !0), "true" == g.toString() && "true" != b.toString() && (y = $, !0 == r && "" == v && (tk = e[0].toString().trim() + p + "_hin_" + y)), (!0 == r && $ > 0 && "true" != b.toString() || !0 == r && $ <= 0 && "true" == b.toString()) && (C = ""), "" != x && (w = "<input type='hidden' name='properties[_SKU_" + h + "(" + e[0].toString().trim() + ")]' value='" + x + "' class='hulk_unique_sku' " + C + ">")), ta.length > 0 && ta.includes(e[0].toString().trim()) ? (tl = tn, ts = tp) : (tl = "", ts = ""), !0 == r && (tm = e[0].toString().trim() + p, tf = "block", tq = "<li value='' class='init'><span class='dropdown-text'>" + e[0].toString().trim() + l + "</span>", tq = "image" == o ? tq + "<span class='dropdown_img " + m + "'><img class='' src=" + a + "></span></li>" : tq + "<span class='dropdown_color " + m + "' style='background-color: " + a + "'></span></li>"), tS = tS + "<li  class='dropdown_swatch " + k + " " + c + " " + u + " " + tl + " " + ts + " " + f + "' " + d + " data-hinventory='" + y + "' " + v + " data-price='" + s + "' data-conditional-value='" + e[0].toString().trim() + "' data-value='" + e[0].toString().trim() + p + "' value='" + e[0].toString().trim() + p + "'><span class='dropdown-text'>" + e[0].toString().trim() + l + "</span>", tS = "image" == o ? tS + "<span class='dropdown_img " + m + "'><img class='' src=" + a + "></span>" + w + "</li>" : tS + "<span class='dropdown_color " + m + "' style='background-color: " + a + "'></span>" + w + "</li>"
                      }), tx = tx + tq + tS;
                      var t$ = "";
                      tv && (t$ = "<input type='hidden' name='properties[_hin_" + f + "_hin_" + h + "]' value='" + tk + "' class='hulk_unique_prop' data-unique_prop_name='_hin_" + f + "_hin_" + h + "'/>"), tx += "<input class='hulk_opt_prop' type='hidden' name='properties[" + h + "]'  value='" + tm + "'/></ul>", checkPlan("quantity_selector", "boolean", i.plan_id, i.plans_features, i.is_on_trial_period) && K && (tx += "<input style='display: " + tf + "' type='number' min='1' value='1' class='hulk_options_quantity' id='quantity_" + Y + "'/>"), tx += t$ + "</div></div>", X += tx
                    }
                  } else if ("button" == B) {
                    if (checkPlan("button_option", "boolean", i.plan_id, i.plans_features, i.is_on_trial_period)) {
                      var t0 = 0,
                        tx = "<div class='hulkapps_option button_render " + te + " " + tr + " " + t8 + " option_type_id_" + Y + " " + ti + " " + O + "' " + z + " data-parent-id='" + Y + "' >";
                      tx += "<div class='hulkapps_option_name'>" + h + " " + td + " " + tu + " " + tc + "</div>", tx += "<div class='hulkapps_option_value'>";
                      var tv = !1,
                        tk = "",
                        tm = "",
                        tf = "none";
                      t.each(tt, function(t, e) {
                        ta.length > 0 && ta.includes(e[0].toString().trim()) ? (tl = tn, ts = tp) : (tl = "", ts = "");
                        var o = e[1];
                        "percentage_charge" == e[9] && null != o && "" != o && (o = parseFloat(product_price) / 100 * o / 100, o = parseFloat(o.toFixed(2))), "" != e[0] && e[0];
                        var a = "" != e[2] ? e[2] : "",
                          n = null != o && "" != o ? " [ " + i.currency_symbol + o + " ]" : "",
                          p = null != o && "" != o && 0 == P ? " (+" + i.currency_symbol + o + ")" : "",
                          l = null != o && "" != o ? o : "0.00",
                          s = "" != l ? "price-change" : "",
                          r = e[4];
                        !0 == r && (tm = e[0].toString().trim() + n, tf = "block");
                        var d = !0 == r ? "button_selected" : "",
                          u = !0 == r ? "checked" : "",
                          c = "",
                          v = "",
                          f = "";
                        let k = "" != e[5] && null != e[5] ? e[5] : "",
                          m = parseInt(e[6]);
                        var g = "";
                        let $ = "" != e[7] && null != e[7] ? e[7] : "",
                          y = "" != e[8] && null != e[8] ? e[8] : "";
                        var b = "" != e[10] && null != e[10] ? e[10] : "",
                          _ = "",
                          x = "disabled";
                        checkPlan("inventory_and_sku_management", "boolean", i.plan_id, i.plans_features, i.is_on_trial_period) && ("true" == k.toString() && "true" != $.toString() && m <= 0 && ("true" == y.toString() ? (c = "is_hulk_disabled", v = "disabled", s = "", d = "") : (f = "is_hulk_hide", v = "disabled", s = "", d = "")), "true" == k.toString() && (tv = !0), "true" == k.toString() && "true" != $.toString() && (g = m, !0 == r && "" == f && "" == v && (tk = e[0].toString().trim() + n + "_hin_" + g)), (!0 == r && m > 0 && "true" != $.toString() || !0 == r && m <= 0 && "true" == $.toString()) && (x = ""), "" != b && (_ = "<input type='hidden' name='properties[_SKU_" + h + "(" + e[0].toString().trim() + ")]' value='" + b + "' class='hulk_unique_sku'" + x + " />"));
                        var C = e[0] + " <br> " + p;
                        titlee = void 0 != C ? "<div style='text-align:center;'><div class='button_tooltip_title'> " + C + "</div></div>" : "<div style='text-align:center;'><div class='button_tooltip_title'></div></div>", tooltip_val = "<div class='hulkapps-tooltip-inner button-tooltip'>" + C + "</div>", tooltip_display_html = 1 == parseInt(w) ? tooltip_val : "", tx += "<label class='hulkapps_buton_option " + f + " " + c + "'><div class='hulkapps-tooltip'>" + tooltip_display_html + "<div class='" + tl + " " + ts + " '><div id='" + Y + "_" + t0 + "' data-option-key='rb_" + Y + "_" + t0 + "' class='hulkapps_option_child " + d + " hulkapps_option_" + Y + " " + s + " '  data-price='" + l + "' data-conditional-value='" + e[0].toString().trim() + "' value='" + e[0].toString().trim() + "' style='" + j + L + E + "'><input name='hulk_button_" + Y + "' type='radio' " + v + " data-hinventory='" + g + "' value='" + e[0].toString().trim() + n + "' class=' button_radio' " + u + " style='display:none;'><span>" + a + "</span></div></div></div>" + _ + "</label>", t0 += 1
                      });
                      var t$ = "";
                      tv && (t$ = "<input type='hidden' name='properties[_hin_" + f + "_hin_" + h + "]' value='" + tk + "' class='hulk_unique_prop' data-unique_prop_name='_hin_" + f + "_hin_" + h + "'/>"), tx += t$, checkPlan("quantity_selector", "boolean", i.plan_id, i.plans_features, i.is_on_trial_period) && K && (tx += "<input style='display: " + tf + "' type='number' min='1' value='1' class='hulk_options_quantity' id='quantity_" + Y + "'/>"), tx += "<input type='hidden' name='properties[" + h + "]' value='" + tm + "' class='hulk_button_hidden_prop'/><script>(function($) {$('.hulkapps_product_options .hulkapps_buton_option').on('change', function(event) {$(this).find('.hulkapps_option_" + Y + "').click();});$('.hulkapps_product_options .hulkapps_option_" + Y + "').click(function (){", tx += "$(this).parents('.button_render').find('.hulk_unique_sku').prop('disabled', true);$(this).parents('.hulkapps_option_value').find('.hulk_options_quantity').show();$(this).parents('.button_render').find('.inventory_error').html(''); var opt_qty = ''; if($(this).parents('.hulkapps_option_value').find('.hulk_options_quantity').val()){opt_qty = ` | ${$(this).parents('.hulkapps_option_value').find('.hulk_options_quantity').val()}`} if($(this).parents('.hulkapps_option_value').find('.hulk_unique_prop') && $(this).parents('.hulkapps_option_value').find('.hulk_unique_prop').length > 0){ if ($(this).find('.button_radio').data('hinventory') != '') {$(this).parents('.hulkapps_option_value').find('.hulk_unique_prop').val($(this).find('.button_radio').val() + '_hin_' + $(this).find('.button_radio').data('hinventory') + opt_qty )}else{ $(this).parents('.hulkapps_option_value').find('.hulk_unique_prop').val('')}};$(this).parents('.hulkapps_option_value').find('.hulk_button_hidden_prop').val($(this).find('.button_radio').val() + opt_qty );$(this).find('button_radio').prop('checked', true);$(this).parents('.button_render').find('.button_selected').removeClass('button_selected');$(this).addClass('button_selected');$(this).parents('label').find('.hulk_unique_sku').prop('disabled', false);conditional_rules(" + i.pid + ",'hulkapps_product_options');if($('#hulk_amount_dis').val() == '1'){calc_options_total(" + i.pid + ",'hulkapps_product_options');}validate_single_option('option_type_id_" + Y + "','button_render','hulkapps_product_options');});$(document).on('change','.hulkapps_product_options #hulkapps_option_list_" + i.pid + " #quantity_" + Y + "', function() { $(this).parents('.hulkapps_option_value').find('.hulk_button_hidden_prop').val($(this).parents('.hulkapps_option_value').find('.button_selected').find('.button_radio').val() + ' | ' + $(this).val() ); if($(this).parents('.hulkapps_option_value').find('.hulk_unique_prop') && $(this).parents('.hulkapps_option_value').find('.hulk_unique_prop').length > 0 && $(this).parent('.hulkapps_option_value').find('.button_selected').find('.button_radio').data('hinventory')){$(this).parents('.hulkapps_option_value').find('.hulk_unique_prop').val($(this).parents('.hulkapps_option_value').find('.button_selected').find('.button_radio').val() + '_hin_' + $(this).parent('.hulkapps_option_value').find('.button_selected').find('.button_radio').data('hinventory') + ' | ' + $(this).val() )}if($('#hulk_amount_dis').val() == '1'){calc_options_total(" + i.pid + ",'hulkapps_product_options');}});}(hulkapps_jQuery))</script></div></div>", checkPlan("image_change_based_on_option_value", "boolean", i.plan_id, i.plans_features, i.is_on_trial_period) && !0 == J && "" != R && (tx += "<script>(function($) {$('.hulkapps_product_options .hulkapps_option_" + Y + "').change(function() { var option_val  = $(this).data('conditional-value');$('" + R + "').each(function(){data_title = $(this).attr('alt');if(option_val === data_title){$(this).click();}});});;}(hulkapps_jQuery))</script>"), X += tx
                    }
                  } else if ("swatch_multiple" == B) {
                    var ty = void 0 != U && void 0 != U.minimum_selection && "" != U && "" != U.minimum_selection ? U.minimum_selection.toString() : "0",
                      tb = void 0 != U && void 0 != U.maximum_selection && "" != U && "" != U.maximum_selection ? U.maximum_selection.toString() : "0",
                      tC = 0,
                      t_ = "0" != ty && "0" != tb && checkPlan("validation_for_min_max_option_selection", "boolean", i.plan_id, i.plans_features, i.is_on_trial_period) ? '<span class="selection-text">[Choose from ' + ty + " to " + tb + " values]</span>" : "0" != ty && checkPlan("validation_for_min_max_option_selection", "boolean", i.plan_id, i.plans_features, i.is_on_trial_period) ? '<span class="selection-text">[Choose at least ' + ty + " values]</span>" : "0" != tb && checkPlan("validation_for_min_max_option_selection", "boolean", i.plan_id, i.plans_features, i.is_on_trial_period) ? '<span class="selection-text">[Choose upto ' + tb + " values]</span>" : "",
                      tx = "<div class='hulkapps_option multiswatch_render " + te + " " + tr + " " + t8 + " option_type_id_" + Y + " " + ti + " " + O + "' " + z + " data-parent-id='" + Y + "' >";
                    tx += "<div class='hulkapps_option_name'><div>" + h + " " + td + " " + tu + " </div> " + t_ + " " + tc + "</div>", tx += "<div class='hulkapps_option_value'>";
                    var tm = [],
                      t9 = 0,
                      tk = [];
                    t.each(tt, function(t, e) {
                      ta.length > 0 && ta.includes(e[0].toString().trim()) ? (tl = tn, ts = tp) : (tl = "", ts = "");
                      var o = e[1];
                      "percentage_charge" == e[9] && null != o && "" != o && (o = parseFloat(product_price) / 100 * o / 100, o = parseFloat(o.toFixed(2)));
                      var a = "" != e[0] ? e[0] : "",
                        n = "" != e[2] ? e[2] : "",
                        p = "" != e[3] ? e[3] : "",
                        l = null != o && "" != o ? " [ " + i.currency_symbol + o + " ]" : "",
                        s = null != o && "" != o && 0 == P ? " (+" + i.currency_symbol + o + ")" : "",
                        r = null != o && "" != o ? o : "0.00",
                        d = "" != r ? "price-change" : "",
                        u = e[4];
                      !0 == u && (t9 += 1, tm.push(e[0].toString().trim() + l));
                      var c = !0 == u ? "swatch_selected" : "",
                        v = !0 == u ? "checked" : "",
                        f = "<p>" + e[0] + " <br> " + s + "</p>",
                        k = "",
                        m = "",
                        g = "";
                      let $ = "" != e[5] && null != e[5] ? e[5] : "",
                        q = parseInt(e[6]);
                      var j = "";
                      let L = "" != e[7] && null != e[7] ? e[7] : "",
                        E = "" != e[8] && null != e[8] ? e[8] : "";
                      var F = "" != e[10] && null != e[10] ? e[10] : "",
                        A = "",
                        I = "disabled";
                      checkPlan("inventory_and_sku_management", "boolean", i.plan_id, i.plans_features, i.is_on_trial_period) && ("true" == $.toString() && "true" != L.toString() && q <= 0 && ("true" == E.toString() ? (m = "disabled", k = "is_hulk_disabled", d = "", c = "", tm.pop(e[0].toString().trim() + l)) : (g = "is_hulk_hide", m = "disabled", d = "", c = "", tm.pop(e[0].toString().trim() + l))), "true" == $.toString() && (tv = !0), "true" == $.toString() && "true" != L.toString() && (j = q, !0 == u && "" == g && "" == m && tk.push(e[0].toString().trim() + l + "_hin_" + j)), (!0 == u && q > 0 && "true" != L.toString() || !0 == u && q <= 0 && "true" == L.toString()) && (I = ""), "" != F && (A = "<input type='hidden' name='properties[_SKU_" + h + "(" + e[0].toString().trim() + ")]' value='" + F + "' class='hulk_unique_sku' " + I + "/>"));
                      var z = "";
                      if ("image" == n) D = "background-image:url(" + p + ");background-size:cover;background-position: center center;" + C, M = "data-image='" + p + "'", z = p;
                      else {
                        try {
                          var O = p.split(",")
                        } catch (T) {
                          O = null
                        }
                        if (null != O) {
                          if (null != O[1]) var D = swatch_color_dual_ton = "background: linear-gradient(to bottom, " + O[0] + " 0%, " + O[0] + " 50%, " + O[1] + " 50%, " + O[1] + " 100%); " + C,
                            M = "data-image=''";
                          else var D = "background-color:" + O[0] + ";" + C,
                            M = "data-image=''"
                        }
                      }
                      if (void 0 != f) {
                        if ("" != p) {
                          if ("both" == x) var N = "<div style='text-align:center;'><div class='multiswatch_tooltip_title'> " + f + "</div><div class='multiswatch_tooltip_data' style='width:100%;padding-top:100%;" + D + "'></div></div>";
                          else N = "image_only" == x ? "<div style='text-align:center;'><div class='multiswatch_tooltip_data' style='width:100%;padding-top:100%;" + D + "'></div></div>" : "<div style='text-align:center;'><div class='multiswatch_tooltip_title'> " + f + "</div></div>"
                        } else N = "<div style='text-align:center;'><div class='multiswatch_tooltip_title'> " + f + "</div></div>"
                      } else N = "<div style='text-align:center;'><div class='swatch_tooltip_title'></div></div>";
                      tooltip_val = "<div class='hulkapps-tooltip-inner multiswatch-tooltip' style='width:200px;'><div>" + N + "</div></div>", tooltip_display_html = 1 == parseInt(w) ? tooltip_val : "", swatch_with_text = 1 == parseInt(S) ? a : "", tx += "<label class='hulkapps_mswatch_option " + tl + " " + ts + " " + g + " " + k + "'><div class='hulkapps-tooltip " + _ + "'>" + tooltip_display_html + "<div class=''><div id='" + Y + "_" + tC + "' data-option-key='rb_" + Y + "_" + tC + "' class='hulkapps_option_child  " + c + " hulkapps_option_" + Y + " " + d + "'  data-price=" + r + " data-conditional-value='" + e[0].toString().trim() + "' value='" + e[0].toString().trim() + "' style='" + y + b + D + "' " + _ + "><input type='checkbox'  data-conditional-value='" + e[0].toString().trim() + "' data-price=" + r + " data-hinventory='" + j + "' " + m + " id='" + Y + "' value='" + e[0].toString().trim() + l + "' class='swatch_checkbox hulkapps_option_child hulkapps_option_" + Y + "_visible " + d + " ' " + v + " style='display:none !important;' " + M + " ></div></div></div><div style='display: inline-block;vertical-align: middle;margin-left: 10px;'>" + swatch_with_text + "</div>" + A + "</label>", tC += 1
                    }), 1 == q && (tx += "var swatch_image_url = " + t(this).find(".swatch_radio").attr("data-image") + "if (" + swatch_image_url + " != ''){$('.hulkapps_swatch_image_change img').attr('src'," + swatch_image_url + ");$('.hulkapps_swatch_image_change img').attr('srcset'," + swatch_image_url + ");$('.hulkapps_swatch_image_change img').attr('data-srcset'," + swatch_image_url + ");}"), t9 > 0 && ("0" != ty && "0" != tb && checkPlan("validation_for_min_max_option_selection", "boolean", i.plan_id, i.plans_features, i.is_on_trial_period) ? (parseInt(t9) < parseInt(ty) || parseInt(t9) > parseInt(tb)) && (tx += '<span class="validation_error error_span">Choose from ' + ty + " to " + tb + " values</span>") : "0" != ty && "0" == tb && checkPlan("validation_for_min_max_option_selection", "boolean", i.plan_id, i.plans_features, i.is_on_trial_period) ? parseInt(t9) < parseInt(ty) && (tx += '<span class="validation_error error_span">Choose at least ' + ty + " values</span>") : "0" == ty && "0" != tb && checkPlan("validation_for_min_max_option_selection", "boolean", i.plan_id, i.plans_features, i.is_on_trial_period) && parseInt(t9) > parseInt(tb) && (tx += '<span class="validation_error error_span">Choose upto ' + tb + " values</span>"));
                    var tw = '<span class="validation_error error_span" >',
                      t$ = "";
                    tv && (t$ = "<input type='hidden' name='properties[_hin_" + f + "_hin_" + h + "]'  value='" + tk + "' class='hulk_unique_prop' data-unique_prop_name='_hin_" + f + "_hin_" + h + "' data-selection-multi='true'/>"), tx += t$, tx += "<input class='hulkapps_option_child' value='" + tm.join(", ") + "' type='hidden' id='hulkapps_option_" + Y + "_hidden' name='properties[" + h + "]'><script>(function($) {$(document).on('click','.hulkapps_product_options .hulkapps_option_" + Y + "', function() {$(this).parents('.multiswatch_render').find('.hulk_unique_sku').prop('disabled', true);$(this).addClass('swatch_selected');if ((" + ty + " != 0) && (" + tb + " != 0) && (checkPlan('validation_for_min_max_option_selection','boolean'," + i.plan_id + "," + i.plans_features + "," + i.is_on_trial_period + "))) {if (($('.hulkapps_option_" + Y + "_visible:checkbox:checked').length) < parseInt('" + ty + "')) {$(this).parents('.hulkapps_option').removeClass('validation_error').find('.error_span').remove();$(this).parents('.hulkapps_option').append('" + tw + "Choose from " + ty + " to " + tb + " values</span>');if (($('.hulkapps_option_" + Y + "_visible:checkbox:checked').length) == 0) {$(this).parents('.hulkapps_option').removeClass('validation_error').find('.error_span').remove();}} else if (($('.hulkapps_product_options').find('.hulkapps_option_" + Y + "_visible:checkbox:checked').length) > parseInt('" + tb + "')) {$(this).parents('.hulkapps_option').removeClass('validation_error').find('.error_span').remove();$(this).parents('.hulkapps_option').append('" + tw + "Choose from " + ty + " to " + tb + " values</span>');if (($('.hulkapps_product_options').find('.hulkapps_option_" + Y + "_visible:checkbox:checked').length) != parseInt('" + tb + "')) {$(this).parents('.hulkapps_option').removeClass('validation_error').find('.error_span').remove();}$(this).find(':checkbox').prop('checked', false);} else {$(this).parents('.hulkapps_option').removeClass('validation_error').find('.error_span').remove();}} else if (" + ty + " != 0 && (checkPlan('validation_for_min_max_option_selection','boolean'," + i.plan_id + "," + i.plans_features + "," + i.is_on_trial_period + "))) {if (($('.hulkapps_product_options').find('.hulkapps_option_" + Y + "_visible:checkbox:checked').length) < parseInt('" + ty + "')) {$(this).parents('.hulkapps_option').removeClass('validation_error').find('.error_span').remove();$(this).parents('.hulkapps_option').append('" + tw + "Choose at least " + ty + " values</span>');} else {$(this).parents('.hulkapps_option').removeClass('validation_error').find('.error_span').remove();}} else if (" + tb + " != 0 && (checkPlan('validation_for_min_max_option_selection','boolean'," + i.plan_id + "," + i.plans_features + "," + i.is_on_trial_period + "))) {if (parseInt('" + tb + "') >= ($('.hulkapps_product_options').find('.hulkapps_option_" + Y + "_visible:checkbox:checked').length)) {if (parseInt('" + tb + "') == ($('.hulkapps_product_options').find('.hulkapps_option_" + Y + "_visible:checkbox:checked').length)) {$(this).parents('.hulkapps_option').removeClass('validation_error').find('.error_span').remove();} else {$(this).parents('.hulkapps_option').removeClass('validation_error').find('.error_span').remove();$(this).parents('.hulkapps_option').append('" + tw + "Choose upto " + tb + " values</span>');}} else {$(this).parents('.hulkapps_option').removeClass('validation_error').find('.error_span').remove();$(this).find(':checkbox').prop('checked', false);}}conditional_rules(" + i.pid + ",'hulkapps_product_options');var chkMulti = $.map($('.hulkapps_product_options').find('.hulkapps_option_" + Y + "_visible:not([disabled]):checked'), function(el, i) {return $(el).val();});$('.hulkapps_product_options').find('.hulkapps_option_" + Y + "_visible:not([disabled]):checked').each(function( index ) {$(this).parents('label').find('.hulk_unique_sku').removeAttr('disabled');});$('.hulkapps_product_options').find('#hulkapps_option_" + Y + "_hidden').val(chkMulti.join(',  '));var chkMultiinventory = $.map($('.hulkapps_product_options').find('.hulkapps_option_" + Y + "_visible:not([disabled]):checked'), function(el, i) {if($(el).data('hinventory') != ''){return $(el).val() + '_hin_' + $(el).data('hinventory')};});if($(this).parents('.hulkapps_option_value').find('.hulk_unique_prop').length > 0){$(this).parents('.hulkapps_option_value').find('.hulk_unique_prop').val(chkMultiinventory.join(', '));$(this).parents('.hulkapps_option_value').find('.swatch_checkbox:disabled').parent('.hulkapps_option_child').removeClass('swatch_selected');};if($('#hulk_amount_dis').val() == '1'){calc_options_total(" + i.pid + ",'hulkapps_product_options');}validate_single_option('option_type_id_" + Y + "', 'multiswatch_render','hulkapps_product_options');});$(document).on('change','.hulkapps_option_" + Y + "_visible',function(e){$(this).is(':checked')?$(this).parent().addClass('swatch_selected'):$(this).parent().removeClass('swatch_selected');$(this).parents('.multiswatch_render').find('.inventory_error').html('')});}(hulkapps_jQuery))</script></div></div>", X += tx
                  } else if ("checkbox" == B) {
                    var ty = void 0 != U && "" != U && void 0 != U.minimum_selection && "" != U.minimum_selection ? U.minimum_selection.toString() : "0",
                      tb = void 0 != U && "" != U && void 0 != U.maximum_selection && "" != U.maximum_selection ? U.maximum_selection.toString() : "0",
                      t1 = 1 == parseInt(c) ? "single_line" : "",
                      t_ = "0" != ty && "0" != tb && checkPlan("validation_for_min_max_option_selection", "boolean", i.plan_id, i.plans_features, i.is_on_trial_period) ? '<span class="selection-text">[Choose from ' + ty + " to " + tb + " values]</span>" : "0" != ty && checkPlan("validation_for_min_max_option_selection", "boolean", i.plan_id, i.plans_features) ? '<span class="selection-text">[Choose at least ' + ty + " values]</span>" : "0" != tb && checkPlan("validation_for_min_max_option_selection", "boolean", i.plan_id, i.plans_features, i.is_on_trial_period) ? '<span class="selection-text">[Choose upto ' + tb + " values]</span>" : "",
                      tx = "<div class='hulkapps_option cb_render " + te + " " + tr + " " + t8 + " " + t1 + " option_type_id_" + Y + " " + ti + " " + O + "' " + z + " data-parent-id='" + Y + "' data-min='" + ty + "' data-max='" + tb + "'>";
                    tx += "<div class='hulkapps_option_name'><div>" + h + " " + td + " " + tu + "  </div>" + t_ + " " + tc + "</div>", tx += "<div class='hulkapps_option_value hulkapps_product_page_options'>";
                    var tm = [],
                      t9 = 0,
                      tk = [];
                    t.each(tt, function(t, e) {
                      ta.length > 0 && ta.includes(e[0].toString().trim()) ? (tl = tn, ts = tp) : (tl = "", ts = "");
                      var o = e[1];
                      "percentage_charge" == e[9] && null != o && "" != o && (o = parseFloat(product_price) / 100 * o / 100, o = parseFloat(o.toFixed(2)));
                      var a = null != o && "" != o ? " [ " + i.currency_symbol + o + " ]" : "",
                        n = null != o && "" != o && 0 == P ? " (+" + i.currency_symbol + o + ")" : "",
                        p = null != o && "" != o ? o : "0.00",
                        l = e[4];
                      !0 == l && (t9 += 1, tm.push(e[0].toString().trim() + a));
                      var s = !0 == l ? "checked" : "",
                        r = "" != p ? "price-change" : "",
                        d = "",
                        u = "",
                        c = "";
                      let v = "" != e[5] && null != e[5] ? e[5] : "",
                        f = parseInt(e[6]);
                      var k = "";
                      let m = "" != e[7] && null != e[7] ? e[7] : "",
                        g = "" != e[8] && null != e[8] ? e[8] : "";
                      var $ = "" != e[10] && null != e[10] ? e[10] : "",
                        y = "",
                        b = "disabled";
                      checkPlan("inventory_and_sku_management", "boolean", i.plan_id, i.plans_features, i.is_on_trial_period) && ("true" == v.toString() && "true" != m.toString() && f <= 0 && ("true" == g.toString() ? (d = "disabled", c = "is_hulk_disabled", s = "", r = "", !0 == l && tm.pop(e[0].toString().trim() + a)) : (u = "is_hulk_hide", s = "", r = "", !0 == l && tm.pop(e[0].toString().trim() + a))), "true" == v.toString() && (tv = !0), "true" == v.toString() && "true" != m.toString() && (k = f, !0 == l && "" == u && "" == d && tk.push(e[0].toString().trim() + a + "_hin_" + k)), (!0 == l && f > 0 && "true" != m.toString() || !0 == l && f <= 0 && "true" == m.toString()) && (b = ""), "" != $ && (y = "<input type='hidden' name='properties[_SKU_" + h + "(" + e[0].toString().trim() + ")]' value='" + $ + "' class='hulk_unique_sku' " + b + "/>")), tx += "<label class='hulkapps_check_option " + c + " " + tl + " " + ts + " " + u + "'><input type='checkbox' " + s + " data-option-key='cbm_" + Y + "' data-hinventory='" + k + "' " + d + " id='" + Y + "' class='  hulkapps_option_child hulkapps_option_" + Y + "_visible hulkapps_product_option_" + Y + "_visible " + r + "' data-price='" + p + " '  data-conditional-value='" + e[0].toString().trim() + "' value='" + e[0].toString().trim() + a + '\'><div class=\'hulkapps-custom-check\'><svg xmlns="http://www.w3.org/2000/svg" width="9" height="7" viewBox="0 0 9 7" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.46989 6.79557L0.219933 4.69527C-0.073311 4.42153 -0.073311 3.97907 0.219933 3.70533C0.513177 3.43159 0.987167 3.43159 1.28041 3.70533L2.95738 5.27075L7.68078 0.244745C7.95078 -0.049296 8.42402 -0.0829008 8.73751 0.168435C9.0525 0.42047 9.08925 0.861532 8.81926 1.15487L3.56936 6.75566C3.43362 6.90408 3.23712 6.99229 3.02863 6.99999C2.80138 7.00069 2.61013 6.92718 2.46989 6.79557Z" fill="white" style="&#10;"/></svg></div>' + e[0].toString().trim() + n + y + " </label>"
                    }), t9 > 0 && ("0" != ty && "0" != tb && checkPlan("validation_for_min_max_option_selection", "boolean", i.plan_id, i.plans_features, i.is_on_trial_period) ? (parseInt(t9) < parseInt(ty) || parseInt(t9) > parseInt(tb)) && (tx += '</select><span class="validation_error error_span">Choose from ' + ty + " to " + tb + " values</span>") : "0" != ty && "0" == tb && checkPlan("validation_for_min_max_option_selection", "boolean", i.plan_id, i.plans_features, i.is_on_trial_period) ? parseInt(t9) < parseInt(ty) && (tx += '</select><span class="validation_error error_span">Choose at least ' + ty + " values</span>") : "0" == ty && "0" != tb && checkPlan("validation_for_min_max_option_selection", "boolean", i.plan_id, i.plans_features, i.is_on_trial_period) && parseInt(t9) > parseInt(tb) && (tx += '</select><span class="validation_error error_span">Choose upto ' + tb + " values</span>"));
                    var tw = '<span class="validation_error error_span" >',
                      t$ = "";
                    tv && (t$ = "<input type='hidden' name='properties[_hin_" + f + "_hin_" + h + "]' value='" + tk + "' class='hulk_unique_prop' data-unique_prop_name='_hin_" + f + "_hin_" + h + "' data-selection-multi='true'/>"), tx += t$, tx += "<input class='hulkapps_option_child' value='" + tm.join(", ") + "' type='hidden' id='hulkapps_option_" + Y + "_hidden' name='properties[" + h + "]'><script>(function($) {$(document).on('change','.hulkapps_product_option_" + Y + "_visible', function() {$(this).parents('.cb_render').find('.hulk_unique_sku').attr('disabled','true');$(this).parents('.cb_render').find('.inventory_error').html('');if ((" + ty + " != 0) && (" + tb + " != 0) && (checkPlan('validation_for_min_max_option_selection','boolean'," + i.plan_id + "," + i.plans_features + "," + i.is_on_trial_period + "))) {if (($('.hulkapps_product_options').find('.hulkapps_option_" + Y + "_visible:checkbox:checked').length) < parseInt('" + ty + "')) {$(this).parents('.hulkapps_option').removeClass('validation_error').find('.error_span').remove();$(this).parents('.hulkapps_option').append('" + tw + "Choose from " + ty + " to " + tb + " values</span>');if (($('.hulkapps_option_" + Y + "_visible:checkbox:checked').length) == 0) {$(this).parents('.hulkapps_option').removeClass('validation_error').find('.error_span').remove();}} else if (($('.hulkapps_product_options').find('.hulkapps_option_" + Y + "_visible:checkbox:checked').length) > parseInt('" + tb + "')) {$(this).parents('.hulkapps_option').removeClass('validation_error').find('.error_span').remove();$(this).parents('.hulkapps_option').append('" + tw + "Choose from " + ty + " to " + tb + " values</span>');if (($('.hulkapps_product_options').find('.hulkapps_option_" + Y + "_visible:checkbox:checked').length) != parseInt('" + tb + "')) {$(this).parents('.hulkapps_option').removeClass('validation_error').find('.error_span').remove();}this.checked = false;} else {$(this).parents('.hulkapps_option').removeClass('validation_error').find('.error_span').remove();}} else if (" + ty + " != 0 && (checkPlan('validation_for_min_max_option_selection','boolean'," + i.plan_id + "," + i.plans_features + "," + i.is_on_trial_period + "))) {if (($('.hulkapps_product_options').find('.hulkapps_option_" + Y + "_visible:checkbox:checked').length) < parseInt('" + ty + "')) {$(this).parents('.hulkapps_option').removeClass('validation_error').find('.error_span').remove();$(this).parents('.hulkapps_option').append('" + tw + "Choose at least " + ty + " values</span>');} else {$(this).parents('.hulkapps_option').removeClass('validation_error').find('.error_span').remove();}} else if (" + tb + " != 0 && (checkPlan('validation_for_min_max_option_selection','boolean'," + i.plan_id + "," + i.plans_features + "," + i.is_on_trial_period + "))) {if (parseInt('" + tb + "') >= ($('.hulkapps_product_options').find('.hulkapps_option_" + Y + "_visible:checkbox:checked').length)) {if (parseInt('" + tb + "') == ($('.hulkapps_product_options').find('.hulkapps_option_" + Y + "_visible:checkbox:checked').length)) {$(this).parents('.hulkapps_option').removeClass('validation_error').find('.error_span').remove();} else {$(this).parents('.hulkapps_option').removeClass('validation_error').find('.error_span').remove();$(this).parents('.hulkapps_option').append('" + tw + "Choose upto " + tb + " values</span>');}} else {$(this).parents('.hulkapps_option').removeClass('validation_error').find('.error_span').remove();this.checked = false;}}conditional_rules(" + i.pid + ",'hulkapps_product_options');var chkMulti = $.map($('.hulkapps_product_options').find('.hulkapps_option_" + Y + "_visible:checked'), function(el, i) {return $(el).val();});$('.hulkapps_product_options').find('#hulkapps_option_" + Y + "_hidden').val(chkMulti.join(', '));var chkMultiinventory = $.map($('.hulkapps_product_options').find('.hulkapps_option_" + Y + "_visible:checked'), function(el, i) { if($(el).data('hinventory') != ''){return $(el).val() + '_hin_' + $(el).data('hinventory')};});$('.hulkapps_product_options').find('.hulkapps_option_" + Y + "_visible:not([disabled]):checked').each(function( index ) {$(this).parents('label').find('.hulk_unique_sku').removeAttr('disabled');});if($(this).parents('.hulkapps_option_value').find('.hulk_unique_prop').length > 0){$(this).parents('.hulkapps_option_value').find('.hulk_unique_prop').val(chkMultiinventory.join(', '))};if($('#hulk_amount_dis').val() == '1'){calc_options_total(" + i.pid + ",'hulkapps_product_options');}validate_single_option('option_type_id_" + Y + "', 'cb_render','hulkapps_product_options');});}(hulkapps_jQuery))</script></div></div>", X += tx
                  } else if ("textbox" == B) {
                    var t3 = "",
                      t5 = void 0 != U && checkPlan("character_limit", "boolean", i.plan_id, i.plans_features, i.is_on_trial_period) && "" != U.character_limit && void 0 != U.character_limit ? "[Maximum " + U.character_limit + " character]" : "",
                      tx = "<div class='hulkapps_option tb_render " + A + " " + te + " " + tr + " " + t8 + " option_type_id_" + Y + " " + ti + " " + O + "' " + z + " data-parent-id='" + Y + "'>";
                    tx += "<div class='hulkapps_option_name'><div>" + h + " " + td + " " + tu + " </div> " + t5 + " " + tc + "</div>", "inlineLabels" == F && (T = h), "floatingLabels" == F && (T = ""), tx += "<div class='hulkapps_option_value'>", t.each(tt, function(t, e) {
                      var o = e[1];
                      "percentage_charge" == e[9] && null != o && "" != o && (o = parseFloat(product_price) / 100 * o / 100, o = parseFloat(o.toFixed(2))), null != o && "" != o && i.currency_symbol;
                      var a = null != o && "" != o ? o : "0.00",
                        n = "",
                        p = "" != a ? "price-change" : "";
                      void 0 != U && checkPlan("character_limit", "boolean", i.plan_id, i.plans_features, i.is_on_trial_period) && "" != U.character_limit && void 0 != U.character_limit && (n = "maxlength=" + U.character_limit), tx += "<input type='text' data-option-key='tb_" + Y + "' id='" + Y + "' placeholder='" + T + "' class='hulkapps_option_child hulkapps_full_width hulkapps_option_" + Y + " " + p + "' data-price='" + a + "' " + n + "><input type='hidden' name='properties[" + h + "]' class='tb_property_val'>", "floatingLabels" == F && (tx += "<label class='floating_label'>" + h + "</label>"), void 0 != U && checkPlan("character_limit", "boolean", i.plan_id, i.plans_features, i.is_on_trial_period) && "" != U.character_limit && void 0 != U.character_limit && (tx += "<input type='hidden' value='" + U.character_limit + "' class='character_count'><div id='char_count_" + Y + "'>" + U.character_limit + " " + i.display_settings.charcter_count_message + "</div>"), t3 += "<script>(function($) {$(document).on('change input','.hulkapps_product_options .hulkapps_option_" + Y + "',function() { var price = $(this).data('price'); var tb_val = $(this).val(); if (tb_val != '') {if(price != '0.00'){var res = tb_val + ' [ " + i.currency_symbol + "' + price + ' ]';}else{var res = tb_val}$(this).parent().find('.tb_property_val').val(res);$(this).addClass('textbox_selected');}else{$(this).parent().find('.tb_property_val').val('');$(this).removeClass('textbox_selected');}conditional_rules(" + i.pid + ",'hulkapps_product_options');if($('#hulk_amount_dis').val() == '1'){calc_options_total(" + i.pid + ",'hulkapps_product_options');}validate_single_option('option_type_id_" + Y + "', 'tb_render','hulkapps_product_options');});", void 0 != U && checkPlan("character_limit", "boolean", i.plan_id, i.plans_features, i.is_on_trial_period) && "" != U.character_limit && void 0 != U.character_limit && (t3 += "$(document).on('input', '.hulkapps_product_options .hulkapps_option_" + Y + "', function() { check_character_limit(" + U.character_limit + ",'" + Y + "','" + i.display_settings.charcter_count_message + "','hulkapps_product_options');});"), t3 += "}(hulkapps_jQuery))</script>"
                    }), X += tx = tx + t3 + "</div></div>"
                  } else if ("textarea" == B) {
                    var t3 = "",
                      t5 = void 0 != U && checkPlan("character_limit", "boolean", i.plan_id, i.plans_features, i.is_on_trial_period) && "" != U.character_limit && void 0 != U.character_limit ? "[Maximum " + U.character_limit + " character]" : "",
                      tx = "<div class='hulkapps_option ta_render " + A + " " + te + " " + tr + " " + t8 + " option_type_id_" + Y + " " + ti + " " + O + "' " + z + " data-parent-id='" + Y + "'>";
                    tx += "<div class='hulkapps_option_name'><div>" + h + " " + td + " " + tu + " </div> " + t5 + " " + tc + "</div>", "inlineLabels" == F && (T = h), "floatingLabels" == F && (T = ""), tx += "<div class='hulkapps_option_value'>", t.each(tt, function(t, e) {
                      var o = e[1];
                      "percentage_charge" == e[9] && null != o && "" != o && (o = parseFloat(product_price) / 100 * o / 100, o = parseFloat(o.toFixed(2))), null != o && "" != o && i.currency_symbol;
                      var a = null != o && "" != o ? o : "0.00",
                        n = "",
                        p = "" != a ? "price-change" : "";
                      void 0 != U && checkPlan("character_limit", "boolean", i.plan_id, i.plans_features, i.is_on_trial_period) && "" != U.character_limit && void 0 != U.character_limit && (n = "maxlength=" + U.character_limit), tx += "<textarea placeholder='" + T + "' data-option-key='ta_" + Y + "' id='" + Y + "' class='hulkapps_option_child hulkapps_full_width hulkapps_option_" + Y + " " + p + "' data-price='" + a + "' " + n + "></textarea>", "floatingLabels" == F && (tx += "<label class='floating_label'>" + h + "</label>"), tx += "<input type='hidden' name='properties[" + h + "]' class='ta_property_val'>", void 0 != U && checkPlan("character_limit", "boolean", i.plan_id, i.plans_features, i.is_on_trial_period) && "" != U.character_limit && void 0 != U.character_limit && (tx += "<input type='hidden' value='" + U.character_limit + "' class='character_count'><div id='char_count_" + Y + "'>" + U.character_limit + " " + i.display_settings.charcter_count_message + "</div>"), t3 += "<script>(function($) {$(document).on('change input','.hulkapps_product_options .hulkapps_option_" + Y + "',function() { var price = $(this).data('price'); var ta_val = $(this).val(); if (ta_val != '') {if(price != '0.00'){var res = ta_val + ' [ " + i.currency_symbol + "' + price + ' ]';}else{var res = ta_val}$(this).parent().find('.ta_property_val').val(res);$(this).addClass('textbox_selected');}else{$(this).parent().find('.ta_property_val').val('');$(this).removeClass('textbox_selected');}conditional_rules(" + i.pid + ",'hulkapps_product_options');if($('#hulk_amount_dis').val() == '1'){calc_options_total(" + i.pid + ",'hulkapps_product_options');}validate_single_option('option_type_id_" + Y + "', 'ta_render','hulkapps_product_options');});", void 0 != U && checkPlan("character_limit", "boolean", i.plan_id, i.plans_features, i.is_on_trial_period) && "" != U.character_limit && void 0 != U.character_limit && (t3 += "$(document).on('input', '.hulkapps_product_options .hulkapps_option_" + Y + "', function() { check_character_limit(" + U.character_limit + ",'" + Y + "','" + i.display_settings.charcter_count_message + "','hulkapps_product_options');});"), t3 += "}(hulkapps_jQuery))</script>"
                    }), X += tx = tx + t3 + "</div></div>"
                  } else if ("radiobutton" == B) {
                    var t2 = 0,
                      t1 = 1 == parseInt(c) ? "single_line" : "";
                    tx = "<div class='hulkapps_option rb_render " + te + " " + tr + " " + t8 + " " + t1 + "  option_type_id_" + Y + " " + ti + " " + O + "' " + z + " data-parent-id='" + Y + "' >", tx += "<div class='hulkapps_option_name'>" + h + " " + td + " " + tu + " " + tc + "</div>", tx += "<div class='hulkapps_option_value'>";
                    var tk = "",
                      tm = "",
                      tf = "none";
                    t.each(tt, function(t, e) {
                      ta.length > 0 && ta.includes(e[0].toString().trim()) ? (tl = tn, ts = tp) : (tl = "", ts = "");
                      var o = e[1];
                      "percentage_charge" == e[9] && null != o && "" != o && (o = parseFloat(product_price) / 100 * o / 100, o = parseFloat(o.toFixed(2)));
                      var a = null != o && "" != o ? " [ " + i.currency_symbol + o + " ]" : "",
                        n = null != o && "" != o && 0 == P ? " (+" + i.currency_symbol + o + ")" : "",
                        p = null != o && "" != o ? o : "0.00",
                        l = e[4];
                      !0 == l && (tm = e[0].toString().trim() + a);
                      var s = !0 == l ? "radio_selected" : "",
                        r = !0 == l ? "checked" : "",
                        d = "" != p ? "price-change" : "",
                        u = "",
                        c = "",
                        v = "";
                      let f = "" != e[5] && null != e[5] ? e[5] : "",
                        k = parseInt(e[6]);
                      var m = "";
                      let g = "" != e[7] && null != e[7] ? e[7] : "",
                        $ = "" != e[8] && null != e[8] ? e[8] : "";
                      var y = "" != e[10] && null != e[10] ? e[10] : "",
                        b = "",
                        _ = "disabled";
                      checkPlan("inventory_and_sku_management", "boolean", i.plan_id, i.plans_features, i.is_on_trial_period) && ("true" == f.toString() && "true" != g.toString() && k <= 0 && ("true" == $.toString() ? (u = "disabled", c = "is_hulk_disabled", s = "", r = "", d = "") : (v = "is_hulk_hide", u = "disabled", s = "", r = "", d = "")), "true" == f.toString() && (tv = !0), "true" == f.toString() && "true" != g.toString() && (m = k, !0 == l && "" == u && (tf = "block", tk = e[0].toString().trim() + a + "_hin_" + m)), (!0 == l && k > 0 && "true" != g.toString() || !0 == l && k <= 0 && "true" == g.toString()) && (_ = ""), "" != y && (b = "<input type='hidden' name='properties[_SKU_" + h + "(" + e[0].toString().trim() + ")]' value='" + y + "' class='hulk_unique_sku' " + _ + ">")), tx += "<label class='hulkapps_radio_option " + tl + "  " + v + " " + c + " " + ts + "'><input name='hulk_radio_" + Y + "' id='" + Y + "_" + t2 + "' data-option-key='rb_" + Y + "_" + t2 + "'  data-hinventory='" + m + "' type='radio' " + r + " " + u + " class='hulkapps_option_child hulkapps_option_" + Y + " " + d + " ' data-price='" + p + "' data-conditional-value='" + e[0].toString().trim() + "' value='" + e[0].toString().trim() + a + "'><div class='radio_div " + s + "' for='" + Y + "_" + t2 + "'>" + e[0].toString().trim() + n + "</div>" + b + "</label>", t2 += 1
                    });
                    var t$ = "";
                    tv && (t$ = "<input type='hidden' name='properties[_hin_" + f + "_hin_" + h + "]' value='" + tk + "' class='hulk_unique_prop' data-unique_prop_name='_hin_" + f + "_hin_" + h + "'/>"), tx += t$, checkPlan("quantity_selector", "boolean", i.plan_id, i.plans_features, i.is_on_trial_period) && K && (tx += "<input style='display: " + tf + "' type='number' min='1' value='1' class='hulk_options_quantity' id='quantity_" + Y + "'/>"), tx += "<input type='hidden' name='properties[" + h + "]' value='" + tm + "' class='hulk_radiobutton_hidden_prop'/><script>(function($) {$('.hulkapps_product_options .hulkapps_radio_option').on('change', function(event) {$(this).parents('.rb_render').find('.inventory_error').html('');$(this).find('.hulkapps_option_" + Y + "').click();});$('.hulkapps_product_options .hulkapps_option_" + Y + "').click(function (){ $(this).parents('.hulkapps_option_value').find('.hulk_options_quantity').show();$(this).parents('.rb_render').find('.hulk_unique_sku').prop('disabled', true); var opt_qty = ''; if($(this).parents('.hulkapps_option_value').find('.hulk_options_quantity').val()){opt_qty = ` | ${$(this).parents('.hulkapps_option_value').find('.hulk_options_quantity').val()}`};if($(this).parents('.hulkapps_option_value').find('.hulk_unique_prop') && $(this).parents('.hulkapps_option_value').find('.hulk_unique_prop').length > 0){if ($(this).data('hinventory')) { $(this).parents('.hulkapps_option_value').find('.hulk_unique_prop').val($(this).val() + '_hin_' + $(this).data('hinventory') + opt_qty );}else{$(this).parents('.hulkapps_option_value').find('.hulk_unique_prop').val('')}};$(this).parents('.hulkapps_option_value').find('.hulk_radiobutton_hidden_prop').val($(this).val() + opt_qty );$(this).parent().siblings().find('.radio_div').removeClass('radio_selected');$(this).parent().find('.radio_div').addClass('radio_selected');$(this).parent().find('.radio_div').addClass('radio_selected');$(this).parents('label').find('.hulk_unique_sku').prop('disabled', false);conditional_rules(" + i.pid + ",'hulkapps_product_options');if($('#hulk_amount_dis').val() == '1'){calc_options_total(" + i.pid + ",'hulkapps_product_options');}validate_single_option('option_type_id_" + Y + "','rb_render','hulkapps_product_options');});$(document).on('change','.hulkapps_product_options #hulkapps_option_list_" + i.pid + " #quantity_" + Y + "', function() { $(this).parent('.hulkapps_option_value').find('.hulk_radiobutton_hidden_prop') .val($(this).parent('.hulkapps_option_value').find('.radio_selected').parent('.hulkapps_radio_option').find('.hulkapps_option_child').val() + ' | ' + $(this).val() ); if($(this).parent('.hulkapps_option_value').find('.hulk_unique_prop') && $(this).parent('.hulkapps_option_value').find('.hulk_unique_prop').length > 0 && $(this).parent('.hulkapps_option_value').find('.radio_selected').parent('.hulkapps_radio_option').find('.hulkapps_option_child').data('hinventory')){$(this).parent('.hulkapps_option_value').find('.hulk_unique_prop').val($(this).parent('.hulkapps_option_value').find('.radio_selected').parent('.hulkapps_radio_option').find('.hulkapps_option_child').val() + '_hin_' + $(this).parent('.hulkapps_option_value').find('.radio_selected').parent('.hulkapps_radio_option').find('.hulkapps_option_child').data('hinventory') + ' | ' + $(this).val() )}if($('#hulk_amount_dis').val() == '1'){calc_options_total(" + i.pid + ",'hulkapps_product_options');}});}(hulkapps_jQuery))</script></div></div>", checkPlan("image_change_based_on_option_value", "boolean", i.plan_id, i.plans_features, i.is_on_trial_period) && !0 == J && "" != R && (tx += "<script>(function($) {$('.hulkapps_product_options .hulkapps_option_" + Y + "').change(function() { var option_val  = $(this).data('conditional-value');$('" + R + "').each(function(){data_title = $(this).attr('alt');if(option_val === data_title){$(this).click();}});});;}(hulkapps_jQuery))</script>"), X += tx
                  } else if ("file_upload" == B) tx = "<div class='hulkapps_option fu_render " + te + " " + tr + " " + t8 + " option_type_id_" + Y + " " + ti + " " + O + "' " + z + "  data-parent-id='" + Y + "'>", tx += "<div class='hulkapps_option_name'>" + h + " " + td + " " + tu + " " + tc + "</div>", tx += "<div class='hulkapps_option_value'><div class='file-upload'> <div class='file-select'> <div class='file-select-name noFile' >No file chosen...</div><div class='file-select-button' id='fileName'>Choose File</div><input type='file'data-option-key='fu_" + Y + "' id='" + Y + "' class='hulkapps_option_child hulkapps_full_width hulk_file_upload hulkapps_option_" + Y + "' name='properties[" + h + "]'> </div></div><script>(function($) {$('.hulkapps_product_options #" + Y + "').change(function (){ conditional_rules(" + i.pid + ",'hulkapps_product_options');validate_single_option('option_type_id_" + Y + "','fu_render','hulkapps_product_options');})}(hulkapps_jQuery))</script></div></div>", X += tx;
                  else if ("email" == B) {
                    var t3 = "";
                    tx = "<div class='hulkapps_option et_render " + A + " " + te + " " + tr + " " + t8 + " option_type_id_" + Y + " " + ti + " " + O + "' " + z + " data-parent-id='" + Y + "'>", tx += "<div class='hulkapps_option_name'>" + h + " " + td + " " + tu + " " + tc + " </div>", "inlineLabels" == F && (T = h), "floatingLabels" == F && (T = ""), tx += "<div class='hulkapps_option_value'>", t.each(tt, function(t, e) {
                      var o = e[1];
                      "percentage_charge" == e[9] && null != o && "" != o && (o = parseFloat(product_price) / 100 * o / 100, o = parseFloat(o.toFixed(2))), null != o && "" != o && i.currency_symbol, null != o && "" != o && i.currency_symbol;
                      var a = null != o && "" != o ? o : "0.00";
                      e[4], tx += "<input type='email' placeholder='" + T + "' data-option-key='et_" + Y + "' id='" + Y + "' class='hulkapps_option_child hulkapps_full_width hulkapps_option_" + Y + " " + ("" != a ? "price-change" : "") + "' data-price='" + a + "'><input type='hidden' name='properties[" + h + "]' class='et_property_val'>", "floatingLabels" == F && (tx += "<label class='floating_label'>" + h + "</label>"), t3 += "<script>(function($) {$(document).on('change','.hulkapps_product_options .hulkapps_option_" + Y + "',function() {var price = $(this).data('price');var et_val = $(this).val();if (et_val != '') {if(price != '0.00'){var res = et_val + ' [ " + i.currency_symbol + "' + price + ' ]';}else{var res = et_val}$(this).parent().find('.et_property_val').val(res);$(this).addClass('emailbox_selected');}else{ $(this).parent().find('.et_property_val').val('');$(this).removeClass('emailbox_selected');}conditional_rules(" + i.pid + ",'hulkapps_product_options');if($('#hulk_amount_dis').val() == '1'){calc_options_total(" + i.pid + ",'hulkapps_product_options');}validate_single_option('option_type_id_" + Y + "', 'et_render','hulkapps_product_options');});}(hulkapps_jQuery))</script>"
                    }), X += tx = tx + t3 + "</div></div>"
                  } else if ("date_picker" == B) {
                    var t3 = "";
                    tx = "<div class='hulkapps_option dp_render " + te + " " + tr + " " + t8 + " option_type_id_" + Y + " " + ti + " " + O + "' " + z + " data-parent-id='" + Y + "'>", tx += "<div class='hulkapps_option_name'>" + h + " " + td + " " + tu + " " + tc + "</div>", tx += "<div class='hulkapps_option_value'>", t.each(tt, function(t, e) {
                      var o = e[1];
                      "percentage_charge" == e[9] && null != o && "" != o && (o = parseFloat(product_price) / 100 * o / 100, o = parseFloat(o.toFixed(2))), null != o && "" != o && i.currency_symbol, null != o && "" != o && i.currency_symbol;
                      var a = null != o && "" != o ? o : "0.00";
                      e[4], tx += "<input type='date' data-option-key='dp_" + Y + "' id='" + Y + "' name='input' placeholder='mm/dd/yyyy' class='hulkapps_option_child hulkapps_full_width hulkapps_option_" + Y + " " + ("" != a ? "price-change" : "") + "' data-price='" + a + "'><input type='hidden' name='properties[" + h + "]' class='dp_property_val'>", t3 = t3 + "<script>(function($) {$(document).on('change','.hulkapps_product_options .hulkapps_option_" + Y + "',function() {var price = $(this).data('price');var dp_val = $(this).val();if (dp_val != '') {if(price != '0.00'){var res = dp_val + ' [ " + i.currency_symbol + "' + price + ' ]';}else{var res = dp_val}$(this).parent().find('.dp_property_val').val(res);$(this).addClass('datepicker_selected');}else{ $(this).parent().find('.dp_property_val').val('');$(this).removeClass('datepicker_selected');}conditional_rules(" + i.pid + ",'hulkapps_product_options');if($('#hulk_amount_dis').val() == '1'){calc_options_total(" + i.pid + ",'hulkapps_product_options');}validate_single_option('option_type_id_" + Y + "', 'dp_render','hulkapps_product_options');});}(hulkapps_jQuery))</script>"
                    }), X += tx = tx + t3 + "</div></div>"
                  } else if ("color_picker" == B) {
                    if (checkPlan("color_picker_option", "boolean", i.plan_id, i.plans_features, i.is_on_trial_period)) {
                      var t3 = "";
                      tx = "<div class='hulkapps_option cp_render " + te + " " + tr + " " + t8 + " option_type_id_" + Y + " " + ti + " " + O + "' " + z + " data-parent-id='" + Y + "'>", tx += "<div class='hulkapps_option_name'>" + h + " " + td + " " + tu + " " + tc + "</div>", tx += "<div class='hulkapps_option_value'>", t.each(tt, function(t, e) {
                        var o = e[1];
                        "percentage_charge" == e[9] && null != o && "" != o && (o = parseFloat(product_price) / 100 * o / 100, o = parseFloat(o.toFixed(2))), null != o && "" != o && i.currency_symbol, null != o && "" != o && i.currency_symbol;
                        var a = null != o && "" != o ? o : "0.00";
                        tx += "<input type='color' data-option-key='cp_" + Y + "' id='" + Y + "' name='input'style='padding: 0;width: 100px;' class='hulkapps_option_child  hulkapps_option_" + Y + " " + ("" != a ? "price-change" : "") + "' data-price='" + a + "'><input type='hidden' name='properties[" + h + "]' class='cp_property_val'>", t3 = t3 + "<script>(function($) {$(document).on('change','.hulkapps_product_options .hulkapps_option_" + Y + "',function() {var price = $(this).data('price');var cp_val = $(this).val();if (cp_val != '') {if(price != '0.00'){var res = cp_val + ' [ " + i.currency_symbol + "' + price + ' ]';}else{var res = cp_val}$(this).parent().find('.cp_property_val').val(res);$(this).addClass('colorpicker_selected');}else{ $(this).parent().find('.cp_property_val').val('');$(this).removeClass('colorpicker_selected');}conditional_rules(" + i.pid + ",'hulkapps_product_options');if($('#hulk_amount_dis').val() == '1'){calc_options_total(" + i.pid + ",'hulkapps_product_options');}validate_single_option('option_type_id_" + Y + "', 'cp_render','hulkapps_product_options');});}(hulkapps_jQuery))</script>"
                      }), X += tx = tx + t3 + "</div></div>"
                    }
                  } else if ("number_field" == B) {
                    t3 = "", void 0 != U && checkPlan("character_limit", "boolean", i.plan_id, i.plans_features) && "" != U.character_limit && U.character_limit;
                    var t5 = void 0 != U && checkPlan("character_limit", "boolean", i.plan_id, i.plans_features, i.is_on_trial_period) && "" != U.character_limit && void 0 != U.character_limit ? "[Maximum " + U.character_limit + " character]" : "",
                      tx = "<div class='hulkapps_option nf_render " + A + " " + te + " " + tr + " " + t8 + " option_type_id_" + Y + " " + ti + " " + O + "' " + z + " data-parent-id='" + Y + "'>";
                    tx += "<div class='hulkapps_option_name'><div>" + h + " " + td + " " + tu + " </div> " + t5 + " " + tc + "</div>", "inlineLabels" == F && (T = h), "floatingLabels" == F && (T = ""), tx += "<div class='hulkapps_option_value'>", t.each(tt, function(t, e) {
                      var o = e[1];
                      "percentage_charge" == e[9] && null != o && "" != o && (o = parseFloat(product_price) / 100 * o / 100, o = parseFloat(o.toFixed(2))), null != o && "" != o && i.currency_symbol;
                      var a = null != o && "" != o ? o : "0.00",
                        n = "",
                        p = "",
                        l = "" != a ? "price-change" : "";
                      void 0 != U && checkPlan("character_limit", "boolean", i.plan_id, i.plans_features, i.is_on_trial_period) && "" != U.character_limit && void 0 != U.character_limit && (n = "maxlength=" + U.character_limit, p = "onKeyPress='if(this.value.length==" + U.character_limit + ") return false;'"), tx += "<input type='number' " + p + " pattern='d*' min=0 step='any' data-option-key='nf_" + Y + "' id='" + Y + "' placeholder='" + T + "'  class='hulkapps_option_child hulkapps_full_width hulkapps_option_" + Y + " " + l + "' data-price='" + a + "' " + n + "><input type='hidden' name='properties[" + h + "]' class='nf_property_val'>", "floatingLabels" == F && (tx += "<label class='floating_label'>" + h + "</label>"), void 0 != U && checkPlan("character_limit", "boolean", i.plan_id, i.plans_features, i.is_on_trial_period) && "" != U.character_limit && void 0 != U.character_limit && (tx += "<input type='hidden' value='" + U.character_limit + "' class='character_count'><div id='char_count_" + Y + "'>" + U.character_limit + " " + i.display_settings.charcter_count_message + "</div>"), t3 += "<script>(function($) {$(document).on('change input','.hulkapps_product_options .hulkapps_option_" + Y + "',function() { var price = $(this).data('price'); var nf_val = $(this).val(); if (nf_val != '') {if(price != '0.00'){var res = nf_val + ' [ " + i.currency_symbol + "' + price + ' ]';}else{var res = nf_val}$(this).parent().find('.nf_property_val').val(res);$(this).addClass('numberfield_selected');}else{$(this).parent().find('.nf_property_val').val('');$(this).removeClass('numberfield_selected');}conditional_rules(" + i.pid + ",'hulkapps_product_options');if($('#hulk_amount_dis').val() == '1'){calc_options_total(" + i.pid + ",'hulkapps_product_options');}validate_single_option('option_type_id_" + Y + "', 'nf_render','hulkapps_product_options');});", void 0 != U && checkPlan("character_limit", "boolean", i.plan_id, i.plans_features, i.is_on_trial_period) && "" != U.character_limit && void 0 != U.character_limit && (t3 += "$(document).on('input', '.hulkapps_product_options .hulkapps_option_" + Y + "', function() { if(this.value.length > Number($(this).attr('maxlength'))){val=this.value.slice(0, $(this).attr('maxlength'));$(this).val(val);}check_character_limit(" + U.character_limit + ",'" + Y + "','" + i.display_settings.charcter_count_message + "','hulkapps_product_options');});"), t3 += "}(hulkapps_jQuery))</script>"
                    }), X += tx = tx + t3 + "</div></div>"
                  } else if ("phone_number" == B) {
                    var t3 = "",
                      tx = "<div class='hulkapps_option pn_render " + te + " " + tr + " " + t8 + " option_type_id_" + Y + " " + ti + " " + O + "' " + z + " data-parent-id='" + Y + "'>";
                    tx += "<div class='hulkapps_option_name'>" + h + " " + td + " " + tu + " " + tc + "</div>", tx += "<div class='hulkapps_option_value'>", t.each(tt, function(t, e) {
                      var o = e[1];
                      "percentage_charge" == e[9] && null != o && "" != o && (o = parseFloat(product_price) / 100 * o / 100, o = parseFloat(o.toFixed(2))), null != o && "" != o && i.currency_symbol;
                      var a = null != o && "" != o ? o : "0.00";
                      tx += "<input type='textbox' data-option-key='tb_" + Y + "' id='" + Y + "' class='phone_number phone_number" + Y + " hulkapps_option_child hulkapps_full_width hulkapps_option_" + Y + " " + ("" != a ? "price-change" : "") + "' data-price='" + a + "'><input type='hidden' name='properties[" + h + "]' class='tb_property_val'><span id='valid-msg' class='hide'>✓ Valid</span><span id='error-msg' class='hide'>Invalid number</span>", t3 += "<script>(function($) {$(document).ready(function(){$('.hulkapps_product_options .phone_number" + Y + "').keypress(function (e) {if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {return false;}});var telInput = $('.hulkapps_product_options').find('.phone_number" + Y + "');var errorMsg = $('.hulkapps_product_options').find('.phone_number" + Y + "').closest('.hulkapps_option_value').find('#error-msg');var validMsg = $('.hulkapps_product_options').find('.phone_number" + Y + "').closest('.hulkapps_option_value').find('#valid-msg');var iti = window.intlTelInput(telInput.get(0), {initialCountry: 'auto',geoIpLookup: function(callback) {var countryCode = '" + i.country + "';callback(countryCode);},customPlaceholder: function(selectedCountryPlaceholder, selectedCountryData) {return 'e.g. ' + selectedCountryPlaceholder;}, utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.13/js/utils.min.js'});var reset = function() {telInput.removeClass('error');errorMsg.innerHTML = '';errorMsg.addClass('hide');validMsg.addClass('hide');};telInput.blur(function() {reset();if ($.trim($('.phone_number" + Y + "').val())) {if(iti.isValidNumber()){validMsg.removeClass('hide');$('.hulkapps_product_options').find('.phone_number" + Y + "').parents('.hulkapps_option_value').find('#error-msg').css('cssText', 'display: none !important');telInput.val(iti.getNumber(intlTelInputUtils.numberFormat.E164));var tb_val = $('.hulkapps_product_options').find('.phone_number" + Y + "').val();var price = $(this).data('price');if(price != '0.00'){var res = tb_val + ' [ " + i.currency_symbol + "' + price + ' ]';}else{var res = tb_val}$(this).parents('.hulkapps_option_value').find('.tb_property_val').val(res);$(this).addClass('textbox_selected');} else {telInput.addClass('error');$('.hulkapps_product_options').find('.phone_number" + Y + "').parents('.hulkapps_option_value').find('#error-msg').css('cssText', 'display: block !important');$(this).parents('.hulkapps_option_value').find('.tb_property_val').val(res);$(this).removeClass('textbox_selected');}}else{$('.hulkapps_product_options').find('.phone_number').parents('.hulkapps_option_value').find('#error-msg').css('cssText', 'display: none !important');$(this).parents('.hulkapps_option_value').find('.tb_property_val').val(res);$(this).removeClass('textbox_selected');}conditional_rules(" + i.pid + ",'hulkapps_product_options');if($('#hulk_amount_dis').val() == '1'){calc_options_total(" + i.pid + ",'hulkapps_product_options');}validate_single_option('option_type_id_" + Y + "', 'pn_render','hulkapps_product_options');});});}(hulkapps_jQuery))</script>"
                    }), X += tx = tx + t3 + "</div></div>"
                  } else if ("hidden" == B) checkPlan("hidden_field_option", "boolean", i.plan_id, i.plans_features, i.is_on_trial_period) && (t.each(tt, function(t, i) {
                    tx = "<input type='hidden' name='properties[" + h + "]' class='hf_property_val   hulkapps_option_" + Y + " " + te + " " + ti + "' value='" + i[0] + "'>"
                  }), X += tx);
                  else if ("popup" == B) checkPlan("popup_option", "boolean", i.plan_id, i.plans_features, i.is_on_trial_period) && (tx = "<div class='hulkapps_option popup_render " + te + " " + tr + " " + t8 + " option_type_id_" + Y + " " + ti + " " + O + "' " + z + " data-parent-id='" + Y + "'>", tx += "<div class='hulkapps_option_name' style='display: none !important;'>" + h + " " + td + " " + tu + " " + tc + "</div>", tx += "<div class='hulkapps_option_value'>", t.each(tt, function(t, i) {
                    var e = i[0],
                      o = null != i[3] ? i[3] : "";
                    "" != o ? tx += "<div  class='cut-popup-icon'><span class='cut-popup-icon-span'><img src='" + o + "' style='width: 24px;'></span><a   style='cursor: pointer;' data-id='" + Y + "' data-option-key='popup_" + Y + "' id='" + Y + "' class='hulkapps_option_child hulkapps_full_width popup_open_link hulkapps_option_" + Y + "'>" + e + "</a></div>" : tx += "<div style='display: flex; align-items: center;'><a   style='cursor: pointer;' data-id='" + Y + "' data-option-key='popup_" + Y + "' id='" + Y + "' class='hulkapps_option_child hulkapps_full_width popup_open_link hulkapps_option_" + Y + "'>" + e + "</a></div>", tx += "<div class='popup_detail' id='popupdetailsdesing_" + Y + "' style='display: none'><div><div class='des-title'></div><div class='des-detail' style='padding: 10px;'>" + i[2] + "</div></div><a class='popup_close_link' data-id='" + Y + "'><img src='" + window.hulkapps.po_url + "/images/close.png' alt='close-icon'></a></div><div class='overlay-popup'></div>"
                  }), tx += "</div></div>", X += tx);
                  else if ("information" == B) tx = "<div class='hulkapps_option information_render " + te + " " + tr + " " + t8 + " option_type_id_" + Y + " " + ti + " " + O + "' " + z + " data-parent-id='" + Y + "'>", tx += "<div class='hulkapps_option_value'>", t.each(tt, function(t, i) {
                    i[0], tx += "<div>" + i[2] + "</div>"
                  }), tx += "</div></div>", X += tx;
                  else if ("google_font" == B && checkPlan("google_font_option", "boolean", i.plan_id, i.plans_features, i.is_on_trial_period)) {
                    var t3 = "";
                    if (tx = "<div class='hulkapps_option gf_render " + te + " " + tr + " " + t8 + " option_type_id_" + Y + " " + ti + " " + O + "' " + z + " data-parent-id='" + Y + "'>", tx += "<div class='hulkapps_option_name'>" + h + " " + td + " " + tu + " " + tc + " </div>", tx += "<div class='hulkapps_option_value'>", t6 = "", option_charge_type = G.option_charge_type, G = G.price, "percentage_charge" == option_charge_type && null != G && "" != G && (G = parseFloat(product_price) / 100 * G / 100, G = parseFloat(G.toFixed(2))), null != G && "" != G) var t7 = "price-change",
                      tj = "googlefont_selected",
                      t6 = " [ " + i.currency_symbol + G + " ]";
                    else {
                      G = "0.00";
                      var t7 = "price-change"
                    }
                    tx += "<input type='text'  data-option-key='gf_" + Y + "' id='" + Y + "' value='" + Z + "' class='hulkapps_option_child hulkapps_full_width hulkapps_option_" + Y + " " + t7 + " " + tj + " ' data-price='" + G + "'>", "" == t6 ? tx += "<input type='hidden' name='properties[" + h + "]' class='gf_property_val'>" : tx += "<input type='hidden' name='properties[" + h + "]' class='gf_property_val' value='" + Z + " " + t6 + "'>", t3 += "<script>(function($) {var google_font_with_price_format = " + JSON.stringify(H) + ";$('.hulkapps_option_" + Y + "').fontselect({googleFonts: '" + V + "'}).change(function(){var font = $(this).val().replace('/+/g', ' ');font = font.split(':')[0];var option_charge_type = google_font_with_price_format[font]['option_charge_type'];var price=google_font_with_price_format[font]['price'];if(option_charge_type == 'percentage_charge' && price != null && price != ''){price = ((parseFloat(product_price)/100)*price)/100;price = parseFloat(price.toFixed(2));}if(price == null){price = '0.00'};$('.hulkapps_option_" + Y + "').attr('data-price',price)});$(document).on('change','.hulkapps_product_options .hulkapps_option_" + Y + "',function() {var price = $(this).attr('data-price');var gf_val = $(this).val();if (gf_val != '') {if(price != '0.00'){var res = gf_val + ' [ " + i.currency_symbol + "' + price + ' ]';}else{var res = gf_val}$(this).parent().find('.gf_property_val').val(res);$(this).addClass('googlefont_selected');}else{ $(this).parent().find('.gf_property_val').val('');$(this).removeClass('googlefont_selected');}conditional_rules(" + i.pid + ",'hulkapps_product_options');if($('#hulk_amount_dis').val() == '1'){calc_options_total(" + i.pid + ",'hulkapps_product_options');}validate_single_option('option_type_id_" + Y + "', 'gf_render','hulkapps_product_options');});}(hulkapps_jQuery))</script>", X += tx = tx + t3 + "</div></div>"
                  }
                }
              });
              var G = "<input type='hidden' name='currency_symbol' value='" + i.currency_symbol + "'>";
              "" !== X && (Z = Z + X + G), Z += "</div>", (1 == parseInt(z) || "" == z) && (Z += "<div id='option_total' style='display: none;'><input type='hidden' id='raw_option_total' value='0'><div id='option_display_total_format'>" + I + "<span id='formatted_option_total'>" + i.currency_symbol + "<span id='calculated_option_total'>0.00</span></span>" + O + "</div></div>"), Z += "<div id='error_text'></div>", Z += "</div></div>"
            }
            if (0 == t("#hulkapps_custom_options_" + window.hulkapps.product_id).length) {
              let Y = 0;
              n.split(",").forEach(function(i) {
                Y += t(i).length, null == window.hulk_add_to_cart_ele && Y && (window.hulk_add_to_cart_ele = t(i).first())
              });
              var tt = window.hulk_add_to_cart_ele;
              tt.parent().is("div") && (tt = tt.parent()), tt.before('<div class="hulkapps-container" id="hulkapps_custom_options_' + window.hulkapps.product_id + '"></div><div class="product-hulkapps-discount-code-html"></div>')
            }
            t("#hulkapps_custom_options_" + window.hulkapps.product_id).html(Z), requireInventory(window.hulkapps.product_id, "hulkapps_product_options"), window.dynamic_checkout_button_integration = i.display_settings.dynamic_checkout_button_integration, window.is_product_page_doscount_code = i.display_settings.dynamic_checkout_discount_code, conditional_rules(window.hulkapps.product_id, "hulkapps_product_options"), t("#hulkapps_options_" + window.hulkapps.product_id).closest("form").find(":submit").addClass("hulkapps_submit_cart"), "" == t("#hulkapps_option_list_" + window.hulkapps.product_id + " .hulkapps_option_set").html() && t("#hulkapps_options_" + window.hulkapps.product_id).css("display", "none")
          }
        },
        error: function(t, i) {
          window.$first_add_to_cart_el && window.$first_add_to_cart_el.removeAttr("disabled")
        }
      })
    }, window.hulkappsStart = function(t) {
      window.$first_add_to_cart_el = null;
      var i = 0;
      if (["input[name='add']", "button[name='add']", "#add-to-cart", "#AddToCartText", "#AddToCart", 'form[action="/cart/add"] :input[type="submit"]'].forEach(function(e) {
          i += t(e).length, null == window.$first_add_to_cart_el && i && (window.$first_add_to_cart_el = t(e).first())
        }), window.$first_add_to_cart_el && (window.$first_add_to_cart_el.attr("disabled", !0), setTimeout(function() {
          window.$first_add_to_cart_el.removeAttr("disabled")
        }, 2500)), "product" == window.hulkapps.page_type && window.hulkapps.product_id && window.hulkapps.store_id) {
        product_page_btn_condition();
        var e = [],
          o = document.querySelectorAll(".single-option-selector,.swatch-element input[type='radio'],.single-option-selector__radio, select[data-option='option1'], select[data-option='option1']:checked, select[data-option='option2'], select[data-option='option1']:checked, select[data-option='option3'], select[data-option='option3']:checked, select[data-index='option1'], select[data-index='option1']:checked, select[data-index='option2'], select[data-index='option1']:checked, select[data-index='option3'], select[data-index='option3']:checked, ul li div[swatch-option='option1'], input[type='radio']");
        o.forEach(function(t) {
          t.addEventListener("change", t => {
            e = [], o.forEach(function(t) {
              var i = !!t.options && t.options[t.options.selectedIndex].selected;
              (t.checked || i) && e.push(t.value)
            }), e = e.join(" / "), Object.keys(hulk_variants).forEach(function(i) {
              var o = hulk_variants[i];
              if (o.options.length < 2) {
                selected_variant_title = t.target.value.toString().toLowerCase();
                var a = o.title.toString().toLowerCase();
                a.trim() == selected_variant_title.trim() && (o.id, window.hulkapps.product.selected_variant = o.id, product_price = o.price)
              } else {
                selected_variant_title = e.toString().toLowerCase();
                var a = o.title.toString().toLowerCase();
                selected_variant_title.includes(a) && (o.id, window.hulkapps.product.selected_variant = o.id, product_price = o.price)
              }
            }), setTimeout(function() {
              calc_options_total(window.hulkapps.product_id, "hulkapps_product_options")
            }, 500)
          })
        }), productPageAjax(t)
      }
      t("body").on("change", 'input[name="updates[]"]', function(i) {
        t('[name="update"]').click()
      })
    }, window.hulkappsParseURL = function(t) {
      if (t) {
        var i = RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?"),
          e = t.match(i),
          o = e[7];
        return o && (o = new URLSearchParams(o)), {
          scheme: e[2],
          authority: e[4],
          path: e[5],
          query: o,
          fragment: e[9]
        }
      }
    }, hulkappsStart(t)
  }, window.getCartInfo = function(t = 0, i = "", e = hulkapps_jQuery) {
    var i = i;
    if (0 != t) {
      var o = t.key;
      let a = t.properties;
      if (a) {
        var n = "";
        Object.keys(a).forEach(function(t) {
          if (a[t].includes("uploads")) {
            var i = a[t].split("/"),
              e = i[i.length - 1];
            n += '<div class="product-option"><dt>' + t + ': </dt><dd>  <a href="' + a[t] + '" class="link" target="_blank">' + e + "</a></dd></div>"
          } else t.startsWith("_hin") || t.startsWith("_SKU") || (n += '<div class="product-option"><dt>' + t + ": </dt><dd>" + a[t] + "</dd></div>")
        }), window.currentEditOptionSelector.parents(window.cart_lineitem_parents_selectors).find(window.cart_item_properties_selectors).html(n)
      } else window.currentEditOptionSelector.parents(window.cart_lineitem_parents_selectors).find(window.cart_item_properties_selectors).html("")
    }
    new Promise(function(t, o) {
      i ? t(i) : e.getJSON("/cart.js", {
        _: new Date().getTime()
      }, function(i) {
        t(i)
      })
    }).then(function(t) {
      if (t && t.item_count > 0) {
        var i = localStorage.getItem("discount_code");
        window.hulkapps.cart = t, new Promise((t, i) => {
          e.ajax({
            url: "/cart?view=hulkapps_cart_collections.json",
            success: function(i) {
              try {
                if (i) {
                  var o = JSON.parse(i);
                  if (o) {
                    var a = o.items;
                    e.each(a, function(t, i) {
                      window.hulkapps.cart_collections[i.variant_id] = i.product_collections
                    })
                  }
                }
                t(window.hulkapps.cart_collections)
              } catch (n) {
                t(window.hulkapps.cart_collections)
              }
            },
            error: function(i) {
              t(window.hulkapps.cart_collections)
            }
          })
        }).then(function(a) {
          if (window.hulkapps.cart_collections = a, "" != i) {
            e(".hulkapps_discount_code").val(i);
            var n = {
              cart_data: window.hulkapps,
              store_id: window.hulkapps.store_id,
              discount_code: i,
              cart_collections: JSON.stringify(window.hulkapps.cart_collections),
              customer_tags: null != window.hulkapps.customer ? window.hulkapps.customer.tags.split(",") : ""
            }
          } else var n = {
            cart_data: window.hulkapps,
            store_id: window.hulkapps.store_id,
            cart_collections: JSON.stringify(window.hulkapps.cart_collections),
            customer_tags: null != window.hulkapps.customer ? window.hulkapps.customer.tags.split(",") : ""
          };
          var p = 0;
          t.items.forEach(function(t) {
            null != t.properties && t.properties != {} && p++
          }), p > 1 ? e(checkout_selectors).attr("disabled", !0) : e(checkout_selectors).attr("disabled", !1), e(checkout_selectors).attr("disabled", !0), e.ajax({
            type: "POST",
            url: window.hulkapps.po_url + "/store/get_cart_details",
            data: n,
            crossDomain: !0,
            success: function(t) {
              if (e(checkout_selectors).attr("disabled", !1), !e.isEmptyObject(t)) {
                var i = t.discounts.cart_item_price_selectors,
                  a = t.discounts.cart_item_line_price_selectors;
                window.cart_lineitem_parents_selectors = t.discounts.cart_lineitem_parents_selectors.split(",")[0], window.cart_item_properties_selectors = t.discounts.cart_item_properties_selectors.split(",")[0], t.discounts.cart.items.forEach(function(t, n) {
                  setTimeout(function() {
                    o && t.key == o && (i = i.split(","), e.each(i, function(i, e) {
                      window.currentEditOptionSelector.parents(window.cart_lineitem_parents_selectors).find(e).html(t.original_price_format)
                    }), a = a.split(","), e.each(a, function(i, e) {
                      window.currentEditOptionSelector.parents(window.cart_lineitem_parents_selectors).find(e).html(t.original_line_price_format)
                    }))
                  }, 500)
                }), hulkappsDoActions(t), window.hulk_inventory_arr = t.discounts.inventory_arr, t.discounts.is_draft_order ? window.is_draft_order = !0 : window.is_draft_order = !1, t.discounts.inventory_arr && t.discounts.inventory_arr.length <= 0 && e(".inventory_validation_hulkapps").remove()
              }
            },
            error: function(t, i) {
              e(checkout_selectors).attr("disabled", !1)
            }
          })
        }).catch(function(t) {
          console.error(t)
        })
      }
    }).catch(function(t) {})
  }, window.hulkappsRadioOption = function(t, i, e) {
    hulkapps_jQuery(".hulkapps_edit_product_options .hulkapps_radio_option").on("touchend", function(i) {
      hulkapps_jQuery(this).find(".hulkapps_option_" + t).click()
    }), hulkapps_jQuery(".hulkapps_edit_product_options .hulkapps_option_" + t).click(function() {
      hulkapps_jQuery(this).parent().siblings().find(".radio_div").removeClass("radio_selected"), hulkapps_jQuery(this).parent().find(".radio_div").addClass("radio_selected"), conditional_rules(i, "hulkapps_edit_product_options"), e && calc_options_total(i, "hulkapps_edit_product_options"), validate_single_option("option_type_id_" + t, "rb_render", "hulkapps_edit_product_options")
    })
  }, window.cartPageJS = function(t) {
    t(document).on("keypress", ".hulkapps_discount_code", function(i) {
      13 == i.which && t(".hulkapps_discount_button").click()
    }), t(document).on("click", ".hulkapps_discount_button", function(i) {
      i.preventDefault();
      var e = t(this).parents(".discount_code_box").find(".hulkapps_discount_code").val();
      "" == (e = t.trim(e)) ? t(".hulkapps_discount_code").addClass("discount_error"): (localStorage.setItem("discount_code", e), t(".hulkapps_discount_code").removeClass("discount_error")), window.getCartInfo()
    }), t(document).on("click", ".close-tag", function(t) {
      localStorage.removeItem("discount_code"), window.getCartInfo()
    }), t(document).on("click", ".hulkapp_save", function(i) {
      i.preventDefault();
      var e = parseInt(t(this).parents(".hulkapp_popupBox").find(".hulkapp_mainContent").find(".h_index").val()) + 1,
        o = t(this).attr("data-quantity"),
        a = t(this).parents(".hulkapp_popupBox").find(".hulkapp_mainContent").find(".h_variant_id").val(),
        n = {};
      new Promise((i, e) => {
        var o = validate_options(t(this).data("product_id"), "hulkapps_edit_product_options", t(this).attr("data-quantity"));
        i(o)
      }).then(function(i) {
        if (i) {
          if (t(checkout_selectors).attr("disabled", !0), t("#edit_cart_popup [name^='properties']").each(function(i, e) {
              var o;
              "" == t(this).val() && t(this).remove(), "radio" == this.type ? this.checked && (o = this.name.replace("properties[", "").replace("]", ""), t.trim(this.value).length > 0 && (n[o] = this.value)) : (this.type, o = this.name.replace("properties[", "").replace("]", ""), t.trim(this.value).length > 0 && (n[o] = this.value))
            }), t.isEmptyObject(n)) "" != t(".upload_cls").val() ? t(".upload_h_cls").remove() : t(".upload_cls").remove(), t("#edit_cart_popup .conditional").each(function(i, e) {
            t(this).find('.hulkapps_option_value input[type="hidden"]').val("")
          }), t("[name^='properties']").each(function(i, e) {
            "" == t(this).val() && t(this).remove()
          }), t.ajax({
            type: "POST",
            url: "/cart/change.js",
            data: {
              quantity: 0,
              line: e
            },
            dataType: "json",
            success: function(i) {
              "" != t(".upload_cls").val() ? t(".upload_h_cls").remove() : t(".upload_cls").remove(), t("#edit_cart_popup .conditional").each(function(i, e) {
                t(this).find('.hulkapps_option_value input[type="hidden"]').val("")
              }), t("[name^='properties']").each(function(i, e) {
                "" == t(this).val() && t(this).remove()
              }), t.ajax({
                type: "POST",
                url: "/cart/add.js",
                data: {
                  quantity: o,
                  id: a
                },
                dataType: "json",
                success: function(i) {
                  window.currentEditOptionSelector.data("key", i.key), window.getCartInfo(i), t(".hulkapp_close").click()
                }
              })
            }
          });
          else {
            var p = new FormData(t("#edit_cart_popup")[0]);
            p.append("quantity", o), p.append("line", e), "" != t(".upload_cls").val() ? t(".upload_h_cls").remove() : t(".upload_cls").remove(), t("#edit_cart_popup .conditional").each(function(i, e) {
              t(this).find('.hulkapps_option_value input[type="hidden"]').val("")
            }), t("[name^='properties']").each(function(i, e) {
              "" == t(this).val() && t(this).remove()
            }), t.ajax({
              type: "POST",
              url: "/cart/change.js",
              data: {
                quantity: 0,
                line: e
              },
              dataType: "json",
              success: function(i) {
                "" != t(".upload_cls").val() ? t(".upload_h_cls").remove() : t(".upload_cls").remove(), t("#edit_cart_popup .conditional").each(function(i, e) {
                  t(this).find('.hulkapps_option_value input[type="hidden"]').val("")
                }), t("[name^='properties']").each(function(i, e) {
                  "" == t(this).val() && t(this).remove()
                }), t.ajax({
                  type: "POST",
                  url: "/cart/add.js",
                  data: p,
                  dataType: "json",
                  contentType: !1,
                  processData: !1,
                  success: function(i) {
                    window.currentEditOptionSelector.data("key", i.key), window.getCartInfo(i), t(".hulkapp_close").click()
                  }
                })
              }
            })
          }
        }
      }).catch(function(t) {
        console.log(t)
      })
    }), t(document).on("click touchstart", ".hulkapp_close", function(i) {
      t(".edit_popup").hide(), t("body").removeClass("body_fixed")
    })
  }, window.productPageJS = function($) {
    function resolveInventory(t, i, e = "") {
      var e = e,
        o = {},
        a = !1;
      return !1 == i && (a = !0), new Promise((t, i) => {
        $.getJSON("/cart.js", {
          _: new Date().getTime()
        }, function(i) {
          i && i.item_count > 0 && i.items.forEach(function(t) {
            var i = t.quantity;
            null != t.properties && t.properties != {} && $.each(t.properties, function(t, e) {
              if (t.startsWith("_hin")) {
                if ((!0 == window.opt_with_otc[t] || "true" == window.opt_with_otc[t]) && (i = 1), e.includes(",")) e.split(",").forEach(function(e) {
                  let a = e.split("_hin_")[0];
                  o[a = t + $.trim(a.split("[")[0])] ? o[a] = o[a] + i : o[a] = i
                });
                else {
                  var a = $.trim(e.split("_hin_")[1].split("|")[1]);
                  (a = a.includes(")") ? parseInt(a.split(")")) : 1) <= 0 && (a = 1);
                  let n = t + $.trim(e.split("_hin_")[0].split("[")[0]);
                  o[n] ? o[n] = o[n] + i * a : o[n] = i * a
                }
              }
            })
          }), t(o)
        })
      }).then(function(o) {
        return $("." + t).find(".inventory_error").remove(), $("." + t).find(".hulk_unique_prop").each(function() {
          var t = $(this).data("selection-multi");
          if (void 0 != t && !0 == t) {
            var n = $(this),
              p = $(this).val().split(", ");
            $.each(p, function(t, p) {
              if ("" != p) {
                var l = p.split("_hin_")[1];
                if (l = parseInt(l), !0 == window.opt_with_otc[n.data("unique_prop_name")] || "true" == window.opt_with_otc[n.data("unique_prop_name")]) var s = 1;
                else if ("" != e) var s = parseInt(e);
                else var s = parseInt($("input[name=quantity]").val());
                let r = p.split("_hin_")[0];
                if (o[r = n.attr("data-unique_prop_name") + $.trim(r.split("[")[0])]) {
                  var d = o[r];
                  s += parseInt(d)
                }
                if (d) var u = parseInt(l) - parseInt(d);
                else var u = parseInt(l);
                l < s ? ($(n).parents(".hulkapps_option").addClass("validation_error"), u > 0 ? $(n).parents(".hulkapps_option").append(`<p class="inventory_error">Only ${u} inventory available for this ${p.split("_hin_")[0]} option. </p>`) : $(n).parents(".hulkapps_option").append(`<p class="inventory_error">Not enough items in the inventory for ${p.split("_hin_")[0]}. </p>`), a = !0, i = !1) : ($(n).parents(".hulkapps_option").removeClass("validation_error"), $(n).parents(".hulkapps_option").find(".inventory_error").remove(), a = !1, i = !0)
              }
            })
          } else if ("" != $(this).val()) {
            var l = $(this).val().split("_hin_")[1];
            if (l = parseInt(l), !0 == window.opt_with_otc[$(this).data("unique_prop_name")] || "true" == window.opt_with_otc[$(this).data("unique_prop_name")]) var s = 1;
            else if ("" != e) var s = parseInt(e);
            else var s = parseInt($("input[name=quantity]").val());
            var r = 1;
            $(this).parents(".hulkapps_option_value").find(".hulk_options_quantity").length > 0 && (r = parseInt($(this).parents(".hulkapps_option_value").find(".hulk_options_quantity").val())) <= 0 && (r = 1), s *= r;
            let d = $(this).val().split("_hin_")[0];
            if (o[d = $(this).attr("data-unique_prop_name") + $.trim(d.split("[")[0])]) {
              var u = o[d];
              s += parseInt(u)
            }
            if (u) var c = parseInt(l) - parseInt(u);
            else var c = parseInt(l);
            l < s ? ($(this).parents(".hulkapps_option").addClass("validation_error"), $(this).parents(".hulkapps_option").find(".inventory_error").remove(), c > 0 ? $(this).parents(".hulkapps_option").append(`<p class="inventory_error">Only ${c} inventory available for this ${$(this).val().split("_hin_")[0]} option. </p>`) : $(this).parents(".hulkapps_option").append(`<p class="inventory_error">Not enough items in the inventory for ${$(this).val().split("_hin_")[0]}. </p>`), a = !0, i = !1) : ($(this).parents(".hulkapps_option").find(".inventory_error").remove(), $(this).parents(".hulkapps_option").removeClass("validation_error"), i = !0, a = !1)
          }
        }), !0 != a && i
      }).catch(function(t) {
        return !0
      })
    }
    $(document).on("click", ".popup_open_link", function(t) {
      var i = $(this).attr("data-id");
      $("#popupdetailsdesing_" + i).css("display", "flex"), $(".overlay-popup").css("display", "block")
    }), $(document).on("click", ".popup_close_link", function(t) {
      var i = $(this).attr("data-id");
      $("#popupdetailsdesing_" + i).css("display", "none"), $(".overlay-popup").css("display", "none")
    }), window.conditional_rules = function(prod_id, hulkapps_parents = "") {
      var hulkapps_parents = hulkapps_parents;
      if ("" == hulkapps_parents && (hulkapps_parents = "hulkapps_product_options"), window.dynamic_checkout_button_integration && "hulkapps_product_options" == hulkapps_parents) {
        var i, total = 0;
        for (window.hulkapps.money_format, checked_variant = $("." + hulkapps_parents + " #hulkapps_option_list_" + window.hulkapps.product_id + ":visible .price-change:checked, ." + hulkapps_parents + " #hulkapps_option_list_" + window.hulkapps.product_id + ":visible .price-change:selected, ." + hulkapps_parents + " .hulkapps_swatch_option .swatch_selected,." + hulkapps_parents + " .textarea_selected,." + hulkapps_parents + " .textbox_selected,." + hulkapps_parents + " .emailbox_selected,." + hulkapps_parents + " .datepicker_selected,." + hulkapps_parents + " .numberfield_selected,." + hulkapps_parents + " .colorpicker_selected,." + hulkapps_parents + " .button_selected,." + hulkapps_parents + " .googlefont_selected, ." + hulkapps_parents + " .ci_render .hulkapps_option_value .hulkapps_option_child .dropdown_selected"), i = 0; i < checked_variant.length; i++) $(checked_variant[i]).parents(".hulkapps_option").hasClass("conditional") || (total = Number($(checked_variant[i]).attr("data-price")) + Number(total));
        if (total > 0 || window.is_hulk_required_options) {
          var is_hulk_payment_set = !1;
          let hulk_shopify_button = setInterval(function() {
            $(".shopify-payment-button").length > 0 && ($(".shopify-payment-button").html().includes("ShopifyPay-button") || $(".shopify-payment-button").html().includes("Checkout-button")) && ($(".hulk_buy_now_handle").length <= 0 ? ($(".shopify-payment-button").html().includes("ShopifyPay-button") ? $(".shopify-payment-button").wrap("<a class='hulk-buy_now hulk_buy_now_handle' data-testid='ShopifyPay-button'></div>") : $(".shopify-payment-button").wrap("<a class='hulk-buy_now hulk_buy_now_handle' data-testid='Checkout-button'></div>"), $(".shopify-payment-button").css({
              "pointer-events": "none"
            })) : ($(".hulk_buy_now_handle").addClass("hulk-buy_now"), $(".shopify-payment-button").css({
              "pointer-events": "none"
            }))), is_hulk_payment_set = !0, clearInterval(hulk_shopify_button)
          }, 1e3);
          $(".shopify-payment-button").length > 0 && ($(".shopify-payment-button").html().includes("ShopifyPay-button") || $(".shopify-payment-button").html().includes("Checkout-button")) && ($(".hulk_buy_now_handle").length <= 0 ? ($(".shopify-payment-button").html().includes("ShopifyPay-button") ? $(".shopify-payment-button").wrap("<a class='hulk-buy_now hulk_buy_now_handle' data-testid='ShopifyPay-button'></div>") : $(".shopify-payment-button").wrap("<a class='hulk-buy_now hulk_buy_now_handle' data-testid='Checkout-button'></div>"), $(".shopify-payment-button").css({
            "pointer-events": "none"
          })) : ($(".hulk_buy_now_handle").addClass("hulk-buy_now"), $(".shopify-payment-button").css({
            "pointer-events": "none"
          })))
        } else $(".shopify-payment-button").css({
          "pointer-events": "inherit"
        }), $(".hulk_buy_now_handle").removeClass("hulk-buy_now")
      }
      pass = !1, verify_all = [], verify_any = [], verified_condition = [], pass_array = [], $("." + hulkapps_parents).find(".condition_hide").removeClass("conditional"), $("." + hulkapps_parents).find(".condition_show").addClass("conditional"), $("." + hulkapps_parents + "  #conditional_rules").children().each(function() {
        pass_array = [], pass = !1, $(this).children().each(function() {
          pass = !1;
          var field_value, condition_rule = $(this).text();
          if (!0 == $("." + hulkapps_parents).find(".option_type_id_" + $(this).attr("data-field-num")).hasClass("dd_multi_render")) {
            var aa = condition_rule;
            aa.indexOf("!=") >= 0 && (pass = !0);
            var count = $("." + hulkapps_parents).find(".hulkapps_option_" + $(this).attr("data-field-num") + "_visible:visible :selected").length,
              ct = 1,
              selected_array = [];
            $("." + hulkapps_parents).find(".hulkapps_option_" + $(this).attr("data-field-num") + "_visible:visible :selected").length > 0 ? $("." + hulkapps_parents).find(".hulkapps_option_" + $(this).attr("data-field-num") + "_visible:visible :selected").each(function() {
              var condition_rule = aa;
              if (field_value = $(this).data("conditional-value"), (condition_rule = condition_rule.replace("**value11**", field_value)).indexOf("==") >= 0) {
                var condition_rule = condition_rule.split("==");
                pass = condition_rule[0] == condition_rule[1]
              } else {
                var condition_rule = condition_rule.split("!=");
                pass = condition_rule[0] != condition_rule[1]
              }
              if (selected_array.push(pass), ct == count && count > 1) {
                var result = selected_array.join(" || ");
                result = eval(result), pass_array.push(result)
              } else 1 == count && pass_array.push(pass);
              ct += 1
            }) : pass_array.push(!1)
          } else if (!0 == $(".option_type_id_" + $(this).attr("data-field-num")).hasClass("cb_render")) {
            var aa = condition_rule;
            aa.indexOf("!=") >= 0 && (pass = !0);
            var ctt = 1,
              checked_array = [],
              countt = $("." + hulkapps_parents).find(".hulkapps_option_" + $(this).attr("data-field-num") + "_visible:checked").length;
            $("." + hulkapps_parents).find(".hulkapps_option_" + $(this).attr("data-field-num") + "_visible:checked").each(function() {
              var condition_rule = aa;
              if (field_value = $(this).data("conditional-value"), (condition_rule = condition_rule.replace("**value11**", field_value)).indexOf("==") >= 0) {
                var condition_rule = condition_rule.split("==");
                pass = condition_rule[0] == condition_rule[1]
              } else {
                var condition_rule = condition_rule.split("!=");
                pass = condition_rule[0] != condition_rule[1]
              }
              if (checked_array.push(pass), ctt == countt && countt > 1) {
                var result = checked_array.join(" || ");
                result = eval(result), pass_array.push(result)
              } else 1 == countt && pass_array.push(pass);
              ctt += 1
            })
          } else if (!0 == $("." + hulkapps_parents).find("#hulkapps_option_list_" + prod_id + " .option_type_id_" + $(this).attr("data-field-num")).hasClass("multiswatch_render")) {
            var aa = condition_rule;
            aa.indexOf("!=") >= 0 && (pass = !0);
            var ctt = 1,
              checked_array = [],
              countt = $("." + hulkapps_parents).find("#hulkapps_option_list_" + prod_id + " .hulkapps_option_" + $(this).attr("data-field-num") + "_visible:checked").length;
            $("." + hulkapps_parents).find("#hulkapps_option_list_" + prod_id + " .hulkapps_option_" + $(this).attr("data-field-num") + "_visible:checked").each(function() {
              var condition_rule = aa;
              if (field_value = $(this).data("conditional-value"), (condition_rule = condition_rule.replace("**value11**", field_value)).indexOf("==") >= 0) {
                var condition_rule = condition_rule.split("==");
                pass = condition_rule[0] == condition_rule[1]
              } else {
                var condition_rule = condition_rule.split("!=");
                pass = condition_rule[0] != condition_rule[1]
              }
              if (checked_array.push(pass), ctt == countt && countt > 1) {
                var result = checked_array.join(" || ");
                result = eval(result), pass_array.push(result)
              } else 1 == countt && pass_array.push(pass);
              ctt += 1
            })
          } else {
            if (pass = !1, !0 == $("." + hulkapps_parents).find(".option_type_id_" + $(this).attr("data-field-num")).hasClass("ci_render")) field_value = $("." + hulkapps_parents).find("#" + $(this).attr("data-field-num")).find(".dropdown_selected").attr("data-conditional-value");
            else if (!0 == $("." + hulkapps_parents).find(".option_type_id_" + $(this).attr("data-field-num")).hasClass("dd_render")) field_value = $("." + hulkapps_parents).find("#" + $(this).attr("data-field-num") + " option:selected").attr("data-conditional-value");
            else if (!0 == $("." + hulkapps_parents).find(".option_type_id_" + $(this).attr("data-field-num")).hasClass("rb_render")) field_value = $("." + hulkapps_parents).find(".hulkapps_option_" + $(this).attr("data-field-num") + ":checked").data("conditional-value");
            else if (!0 == $("." + hulkapps_parents).find(".option_type_id_" + $(this).attr("data-field-num")).hasClass("swatch_render")) field_value = $("." + hulkapps_parents).find(".hulkapps_option_" + $(this).attr("data-field-num") + ".swatch_selected").data("conditional-value");
            else if (!0 == $("." + hulkapps_parents).find(".option_type_id_" + $(this).attr("data-field-num")).hasClass("button_render")) field_value = $("." + hulkapps_parents).find(".hulkapps_option_" + $(this).attr("data-field-num") + ".button_selected").data("conditional-value");
            else if (!0 == $("." + hulkapps_parents).find(".option_type_id_" + $(this).attr("data-field-num")).hasClass("dp_render")) {
              if (void 0 != (field_value = $("." + hulkapps_parents).find(".hulkapps_option_" + $(this).attr("data-field-num") + ".datepicker_selected").val())) {
                var splitedValues = field_value.split("-");
                field_value = splitedValues[1] + "/" + splitedValues[2] + "/" + splitedValues[0]
              }
            } else field_value = $("." + hulkapps_parents).find("#" + $(this).attr("data-field-num")).val();
            if ((condition_rule = condition_rule.replace("**value11**", field_value)).indexOf("==") >= 0) {
              var condition_rule = condition_rule.split("==");
              pass = condition_rule[0] == condition_rule[1]
            } else {
              var condition_rule = condition_rule.split("!=");
              pass = condition_rule[0] != condition_rule[1]
            }
            pass_array.push(pass)
          }
        });
        var type_rule = $(this).attr("data-verify-all"),
          condition_id = $(this).attr("name");
        if ("0" == type_rule) var res = pass_array.join(" || ");
        else var res = pass_array.join(" && ");
        (res = eval(res)) && ($("." + hulkapps_parents).find("." + condition_id + "_show").removeClass("conditional"), $("." + hulkapps_parents).find("." + condition_id + "_hide").addClass("conditional"), $("." + hulkapps_parents).find(".conditional").removeClass("validation_error"))
      }), $("." + hulkapps_parents + " #conditional_rules").children().each(function() {
        var t = $(this).attr("name"),
          i = $("." + hulkapps_parents).find("." + t + "_hide.conditional"),
          e = $("." + hulkapps_parents).find("." + t + "_show.conditional");
        i.each(function() {
          var t = $(this).hasClass("price-change"),
            i = $(this);
          t ? $(this).parent(".hulkapps_option_child").each(function() {
            "UL" == $(this).prop("tagName") ? $(this).children(".dropdown_selected").data("value") == i.data("value") && conditional_change($(this)) : $(this).val().includes(i.val()) && conditional_change($(this))
          }) : $(this).find(".hulkapps_option_child").each(function() {
            conditional_change($(this))
          })
        }), e.each(function() {
          var t = $(this).hasClass("price-change"),
            i = $(this);
          t ? $(this).parent(".hulkapps_option_child").each(function() {
            $(this).val().includes(i.val()) && conditional_change($(this))
          }) : $(this).find(".hulkapps_option_child").each(function() {
            conditional_change($(this))
          })
        })
      }), calc_options_total(prod_id, hulkapps_parents)
    }, window.conditional_change = function(t) {
      if ("select-one" == t.prop("type")) t.val() && (t.val("").change(), t.parent().find(".hulk_unique_sku").prop("disabled", "true"), t.parent().removeClass("selected"));
      else if ("select-multiple" == t.prop("type")) t.val() && (t.parent().find(".hulk_unique_sku").prop("disabled", "true"), t.val(""), t.parent().removeClass("selected"));
      else if ("radio" == t.prop("type")) t.prop("checked") && (t.parents(".hulkapps_option_value").find(".hulk_radiobutton_hidden_prop").val(""), t.parents(".hulkapps_option_value").find(".hulk_unique_prop").val(""), t.prop("checked", !1), t.parent().find(".radio_selected").removeClass("radio_selected"), t.parent("label").find(".hulk_unique_sku").prop("disabled", "true"));
      else if ("file" == t.prop("type")) t.val(""), t.parent(".hulkapps_option_value").find(".upload_h_cls").val("");
      else if ("text" == t.prop("type") && t.parents(".hulkapps_option").hasClass("gf_render")) t.val() && (t.parents(".hulkapps_option_value").find(".gf_property_val").val(""), t.parents(".hulkapps_option_value").find("#valid-msg").remove());
      else if ("textarea" == t.prop("type") || "number" == t.prop("type") || "text" == t.prop("type") || "hidden" == t.prop("type") || "file" == t.prop("type") || "email" == t.prop("type")) t.val() && (t.val("").change(), t.parents(".hulkapps_option_value").find(".tb_property_val").val(""), t.parents(".hulkapps_option_value").find("#valid-msg").remove());
      else if ("color" == t.prop("type") || "color_picker" == t.prop("type")) t.val() && (t.parents(".hulkapps_option_value").find(".cp_property_val").val(""), t.parents(".hulkapps_option_value").find("#valid-msg").remove());
      else if ("date" == t.prop("type") || "date_picker" == t.prop("type")) t.val() && (t.val("").change(), t.parents(".hulkapps_option_value").find(".dp_property_val").val(""), t.parents(".hulkapps_option_value").find("#valid-msg").remove());
      else if ("checkbox" == t.prop("type")) t.prop("checked") && (t.prop("checked", !1).change(), t.parent().removeClass("swatch_selected"));
      else if ("DIV" == t.prop("tagName")) {
        if (t.find(".swatch_radio").prop("checked") && (t.find(".swatch_radio").prop("checked", !1), t.find(".swatch_radio").removeAttr("checked"), t.parents(".hulkapps_option_value").find(".hulk_swatch_hidden_prop").val(""), t.parents(".hulkapps_option_value").find(".hulk_unique_prop").val(""), t.removeClass("swatch_selected"), t.parents("label").find(".hulk_unique_sku").prop("disabled", "true")), t.find(".button_radio").prop("checked") && (t.parents(".hulkapps_option_value").find(".hulk_button_hidden_prop").val(""), t.parents(".hulkapps_option_value").find(".hulk_unique_prop").val(""), t.find(".button_radio").removeAttr("checked"), t.removeClass("button_selected"), t.parents("label").find(".hulk_unique_sku").prop("disabled", "true")), t.find(".swatch_checkbox").prop("checked")) {
          t.find(".swatch_checkbox").prop("checked", !1);
          var i = t.parent().parent().parent().parent(".hulkapps_option_value"),
            e = [];
          i.find("input[type=checkbox]:checked").each(function() {
            e.push($(this).val())
          }), i.find("input[type=hidden]").not(".hulk_unique_sku").val(e.join(",")), t.removeClass("swatch_selected"), t.parents("label").find(".hulk_unique_sku").prop("disabled", "true")
        }
      } else if ("UL" == t.prop("tagName")) {
        if (t.find(".hulk_unique_sku").prop("disabled", "true"), t.find(".dropdown_selected").length > 0) {
          var o = t.parents(".ci_render").find(".hulkapps_option_name").attr("data-option-name");
          t.find(".init").html("").html("Choose " + o), t.find(".dropdown_selected").removeClass("dropdown_selected"), t.parent(".hulkapps_option_value").find(".hulk_opt_prop").val(""), t.parent(".hulkapps_option_value").find(".hulk_unique_prop").val(""), t.find(".hulk_unique_sku").prop("disabled", "false")
        }
      } else if ("LABEL" == t.prop("tagName") && (t.find(".swatch_radio").prop("checked") && (t.find(".swatch_radio").prop("checked", !1).change(), t.find(".swatch_radio").removeAttr("checked"), t.removeClass("swatch_selected"), t.parents("label").find(".hulk_unique_sku").prop("disabled", "true")), t.find(".button_radio").prop("checked") && (t.find(".button_radio").prop("checked", !1).change(), t.find(".button_radio").removeAttr("checked"), t.removeClass("button_selected"), t.parents("label").find(".hulk_unique_sku").prop("disabled", "true")), t.find(".swatch_checkbox").prop("checked"))) {
        t.find(".swatch_checkbox").prop("checked", !1);
        var i = t.parent(".hulkapps_option_value"),
          e = [];
        i.find("input[type=checkbox]:checked").each(function() {
          e.push($(this).val())
        }), i.find("input[type=hidden]").val(e.join(",")), t.removeClass("swatch_selected")
      }
    }, window.calc_options_total = function(t, i = "") {
      if ("price_addtional_charge" == (price_setting = display_price_setting.price_setting) || "price_total_charge" == price_setting || "price_append" == price_setting || "price_addtional_charge_beside_price" == price_setting || 1 == display_price_setting.amount_note_display && void 0 == price_setting) {
        var e, i = i;
        "" == i && (i = "hulkapps_product_options");
        var o = 0;
        for (window.hulkapps.money_format, checked_variant = $("." + i + " #hulkapps_option_list_" + t + ":visible .price-change:checked, ." + i + " #hulkapps_option_list_" + t + ":visible .price-change:selected, ." + i + " .hulkapps_swatch_option .swatch_selected,." + i + " .textarea_selected,." + i + " .textbox_selected,." + i + " .emailbox_selected,." + i + " .datepicker_selected,." + i + " .numberfield_selected,." + i + " .colorpicker_selected,." + i + " .button_selected,." + i + " .googlefont_selected, ." + i + " .ci_render .hulkapps_option_value .hulkapps_option_child .dropdown_selected"), e = 0; e < checked_variant.length; e++)
          if (!$(checked_variant[e]).parents(".hulkapps_option").hasClass("conditional")) {
            var a = 1;
            if ($(checked_variant[e]).parents(".hulkapps_option_value").find(".hulk_options_quantity").length > 0) var a = parseInt($(checked_variant[e]).parents(".hulkapps_option").find(".hulk_options_quantity").val());
            o = Number($(checked_variant[e]).attr("data-price") * a) + Number(o)
          } if ("price_total_charge" == price_setting && (o = Number(product_price / 100) + Number(o)), "price_append" == price_setting && (n = display_price_setting.price_class, o = currency_conversion(Number(product_price / 100) + Number(o)), $("#" + n).length > 0 ? $("#" + n).html("<span class='money'>" + o + "</span>") : $("." + n).length > 0 && $("." + n).html("<span class='money'>" + o + "</span>"), o = 0), "price_addtional_charge_beside_price" == price_setting) {
          if (o > 0) {
            o = currency_conversion(Number(o));
            var n = display_price_setting.price_class,
              p = "1" == display_price_setting.price_display_brackets ? "" : "(",
              l = "1" == display_price_setting.price_plus_sign ? "" : "+",
              s = "1" == display_price_setting.price_display_brackets ? "" : ")",
              r = ".hulk_price_addtional_charge_beside_price{";
            r += void 0 != display_price_setting.addition_price_font_color ? "color: " + display_price_setting.addition_price_font_color + ";" : "", r += void 0 != display_price_setting.addition_price_font_size ? "font-size: " + display_price_setting.addition_price_font_size + "px;" : "";
            var d = "<style>" + (r += "}") + "</style>";
            $("." + i).append(d), $("#" + n).length > 0 ? $("#" + n).html("<span class='money hulk_price_addtional_charge_beside_price'>" + p + l + o + s + "</span>") : $("." + n).length > 0 && $("." + n).html("<span class='money hulk_price_addtional_charge_beside_price'>" + p + l + o + s + "</span>")
          } else {
            var n = display_price_setting.price_class;
            $("#" + n).html(""), $("." + n).html("")
          }
          o = 0
        }
        $("." + i + " #raw_option_total").val(o), $("." + i + " #calculated_option_total").html(o.toFixed(2)), o > 0 ? $("." + i + " #option_total").slideDown() : $("." + i + " #option_total").slideUp()
      }
    }, window.currency_conversion = function(t) {
      let i = window.hulkapps.money_format;
      if (i.includes("{{ amount }}") || i.includes("{{amount}}")) return (t = t.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), i.includes("{{ amount }}")) ? i.replace("{{ amount }}", t) : i.replace("{{amount}}", t);
      if (i.includes("{{ amount_no_decimals }}") || i.includes("{{amount_no_decimals}}")) return (t = Math.round(Number(t)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), i.includes("{{ amount_no_decimals }}")) ? i.replace("{{ amount_no_decimals }}", t) : i.replace("{{amount_no_decimals}}", t);
      if (i.includes("{{ amount_with_comma_separator }}") || i.includes("{{amount_with_comma_separator}}")) {
        if ((t = t.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")).includes(".")) {
          let e = (t = t.replace(/\B(?=(\d{3})+(?!\d))/g, ".")).lastIndexOf(".");
          t = t.slice(0, e) + t.slice(e).replace(".", ",")
        } else t = t.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return i.includes("{{ amount_with_comma_separator }}") ? i.replace("{{ amount_with_comma_separator }}", t) : i.replace("{{amount_with_comma_separator}}", t)
      }
      if (i.includes("{{ amount_no_decimals_with_comma_separator }}") || i.includes("{{amount_no_decimals_with_comma_separator}}")) return (t = Math.round(Number(t)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."), i.includes("{{ amount_no_decimals_with_comma_separator }}")) ? i.replace("{{ amount_no_decimals_with_comma_separator }}", t) : i.replace("{{amount_no_decimals_with_comma_separator}}", t);
      if (!(i.includes("{{ amount_with_apostrophe_separator }}") || i.includes("{{amount_with_apostrophe_separator}}"))) return t;
      else return (t = t.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'"), i.includes("{{ amount_with_apostrophe_separator }}")) ? i.replace("{{ amount_with_apostrophe_separator }}", t) : i.replace("{{amount_with_apostrophe_separator}}", t)
    }, window.checkPlan = function(t, i, e, o, a) {
      return is_allowed = !0, t && i && o && e && o[e] ? ("string" == $.type(o) && (o = JSON.parse(o)), !1 == o[e][t] && "boolean" == i && (is_allowed = !1), !0 == a && !0 == o[e][t] && (is_allowed = !0)) : is_allowed = !1, is_allowed
    }, window.check_character_limit = function(t, i, e, o = "") {
      var o = o;
      "" == o && (o = "hulkapps_product_options");
      var a = $("." + o + " .hulkapps_option_value .hulkapps_option_" + i).val().length,
        n = t - a;
      $("." + o + " #char_count_" + i).html(n + " " + e)
    }, window.requireInventory = async function(t, i) {
      $("." + i).find("#hulkapps_option_list_" + t + ":visible .dd_render.required:visible,.dd_multi_render.required:visible,.swatch_render.required:visible,.cb_render.required:visible,.multiswatch_render.required:visible,.ci_render.required:visible,.rb_render.required:visible,.button_render.required:visible").each(function() {
        if ($(this).hasClass("ci_render")) {
          var t = $(this).find("li[value !='']").length,
            i = $(this).find("li[value !=''].is_hulk_disabled").length;
          t == i && ($(this).removeClass("required"), $(this).find(".hulkapps-required").remove())
        } else if (($(this).hasClass("dd_render") || $(this).hasClass("dd_multi_render")) && !$(this).hasClass("ci_render")) {
          var t = $(this).find("option[value !='']").length,
            i = $(this).find("option[value !='']:disabled").length;
          t == i && ($(this).removeClass("required"), $(this).find(".hulkapps-required").remove())
        } else if ($(this).hasClass("multiswatch_render")) {
          var t = $(this).find(".hulkapps_mswatch_option").length,
            i = $(this).find(".hulkapps_mswatch_option input[type='checkbox']:disabled").length;
          t == i && ($(this).removeClass("required"), $(this).find(".hulkapps-required").remove())
        } else if ($(this).hasClass("swatch_render")) {
          var t = $(this).find(".hulkapps_swatch_option").length,
            i = $(this).find(".hulkapps_swatch_option input[type='radio']:disabled").length;
          t == i && ($(this).removeClass("required"), $(this).find(".hulkapps-required").remove())
        } else if ($(this).hasClass("rb_render")) {
          var t = $(this).find(".hulkapps_radio_option").length,
            i = $(this).find(".hulkapps_radio_option input[type='radio']:disabled").length;
          t == i && ($(this).removeClass("required"), $(this).find(".hulkapps-required").remove())
        } else if ($(this).hasClass("cb_render")) {
          var t = $(this).find(".hulkapps_check_option").length,
            i = $(this).find(".hulkapps_check_option input[type='checkbox']:disabled").length;
          t == i && ($(this).removeClass("required"), $(this).find(".hulkapps-required").remove())
        } else if ($(this).hasClass("button_render")) {
          var t = $(this).find(".hulkapps_buton_option").length,
            i = $(this).find(".hulkapps_buton_option input[type='radio']:disabled").length;
          t == i && ($(this).removeClass("required"), $(this).find(".hulkapps-required").remove())
        }
      })
    }, window.validate_options = async function(t, i, e = "") {
      var o, e = e,
        i = i;
      ("" == i || void 0 == i) && (i = "hulkapps_product_options");
      var a = !0;
      $("." + i + " #error_text").html("");
      var n = $("." + i).find("#hulkapps_option_list_" + t + ":visible .required:visible");
      for (o = 0; o < n.length; o++) $(n[o]).hasClass("ci_render") && $(n[o]).find(".hulk_opt_prop").length && !$(n[o]).find(".hulk_opt_prop").val() ? ($(n[o]).addClass("validation_error"), a = !1) : $(n[o]).hasClass("dd_render") && $(n[o]).find(".hulk_dropdown_hidden_prop").length && !$(n[o]).find(".hulk_dropdown_hidden_prop").val() ? ($(n[o]).addClass("validation_error"), a = !1) : 1 != hulkapps_jQuery(n[o]).find("select[name^='properties']").length || hulkapps_jQuery(n[o]).find("select[name^='properties']").val() ? hulkapps_jQuery(n[o]).find(".hulkapps_option_value").find("input[name^='properties']").length >= 1 && !hulkapps_jQuery(n[o]).find(".hulkapps_option_value").find("input[name^='properties']:not(.hulk_unique_prop)").val() ? (hulkapps_jQuery(n[o]).addClass("validation_error"), a = !1) : $(n[o]).find(".hulkapps_radio_option").length && !$(n[o]).find(".hulk_radiobutton_hidden_prop").val() ? ($(n[o]).addClass("validation_error"), a = !1) : $(n[o]).find(".hulkapps_buton_option").length && !$(n[o]).find(".hulk_button_hidden_prop").val() ? ($(n[o]).addClass("validation_error"), a = !1) : $(n[o]).find(".hulkapps_swatch_option").length && !$(n[o]).find(".hulk_swatch_hidden_prop").val() ? ($(n[o]).addClass("validation_error"), a = !1) : $(n[o]).find("input[type='text']").length > 1 ? $(n[o]).find("input[type='text']").each(function() {
        "" == $(this).val() && ($(n[o]).addClass("validation_error"), a = !1)
      }) : $(n[o]).find("input[type='text']").length && !$(n[o]).find("input[name^='properties']").val() ? ($(n[o]).addClass("validation_error"), a = !1) : $(n[o]).find("input[type='email']").length && !$(n[o]).find("input[name^='properties']").val() ? ($(n[o]).addClass("validation_error"), a = !1) : $(n[o]).find("input[type='color']").length && !$(n[o]).find("input[name^='properties']").val() ? ($(n[o]).addClass("validation_error"), a = !1) : $(n[o]).find(".hulkapps_check_option").length && !$(n[o]).find("input[name^='properties']").val() ? ($(n[o]).addClass("validation_error"), a = !1) : $(n[o]).find("input[type='file']").length && !$(n[o]).find("input[name^='properties']").val() ? ($(n[o]).addClass("validation_error"), a = !1) : $(n[o]).hasClass("cb_render") && $(n[o]).find("input[type='checkbox']:checked").length && !$(n[o]).find("input[name^='properties']").length ? ($(n[o]).addClass("validation_error"), a = !1) : $(n[o]).hasClass("multiswatch_render") && $(n[o]).find("input[type='checkbox']:checked").length && !$(n[o]).find("input[name^='properties']").length ? ($(n[o]).addClass("validation_error"), a = !1) : $(n[o]).find("textarea").length && !$(n[o]).find("input[name^='properties']").val() ? ($(n[o]).addClass("validation_error"), a = !1) : $(n[o]).find("select[multiple]").length && !$(n[o]).find("input[name^='properties']").val() ? ($(n[o]).addClass("validation_error"), a = !1) : $(n[o]).find("input[type='number']:not(.hulk_options_quantity)").length && !$(n[o]).find("input[name^='properties']").val() ? ($(n[o]).addClass("validation_error"), a = !1) : $(n[o]).hasClass("dp_render") && $(n[o]).find("input[type='date']").length && !$(n[o]).find("input[name^='properties']").val() ? ($(n[o]).addClass("validation_error"), a = !1) : $(n[o]).removeClass("validation_error") : (hulkapps_jQuery(n[o]).addClass("validation_error"), a = !1);
      return $("." + i).find("#hulkapps_option_list_" + t + " .cb_render:visible").each(function() {
        $(this).hasClass("required") && $(this).find("input[type='checkbox']").length ? $(this).find("input[name^='properties']").val() ? $(this).find(".error_span").length > 0 ? ($(this).addClass("validation_error"), a = !1) : $(this).removeClass("validation_error") : ($(this).addClass("validation_error"), a = !1) : $(this).find(".error_span").length > 0 ? ($(this).addClass("validation_error"), a = !1) : $(this).removeClass("validation_error")
      }), $("." + i).find("#hulkapps_option_list_" + t + " .multiswatch_render:visible").each(function() {
        $(this).hasClass("required") && $(this).find("input[type='checkbox']").length ? $(this).find("input[name^='properties']").val() ? $(this).find(".error_span").length > 0 ? ($(this).addClass("validation_error"), a = !1) : $(this).removeClass("validation_error") : ($(this).addClass("validation_error"), a = !1) : $(this).find(".error_span").length > 0 ? ($(this).addClass("validation_error"), a = !1) : $(this).removeClass("validation_error")
      }), $("#hulkapps_option_list_" + t + " .dd_multi_render:visible").each(function() {
        $(this).hasClass("required") && $(this).find("select[multiple]").length ? $(this).find("input[name^='properties']").val() ? $(this).find(".error_span").length > 0 ? ($(this).addClass("validation_error"), a = !1) : $(this).removeClass("validation_error") : ($(this).addClass("validation_error"), a = !1) : $(this).find(".error_span").length > 0 ? ($(this).addClass("validation_error"), a = !1) : $(this).removeClass("validation_error")
      }), $("." + i).find("#hulkapps_option_list_" + t + " .et_render.required:visible").each(function() {
        if ($(this).find("input[type='email']").length && (!$(this).find("input[name^='properties']").val() && $(this).hasClass("required") || "" != $(this).find("input[type='email']").val())) {
          var t = $(this).find("input[type='email']").val();
          /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,5}|[0-9]{1,3})(\]?)$/.test(t) ? $(this).removeClass("validation_error") : ($(this).addClass("validation_error"), a = !1)
        }
      }), $("." + i).find("#hulkapps_option_list_" + t + " .pn_render.required:visible").each(function() {
        $(this).find("input[type='textbox']").length && !$(this).find("input[name^='properties']").val() && $(this).hasClass("required") ? ($(this).addClass("validation_error"), a = !1) : $(this).find(".phone_number").hasClass("error") ? ($(this).addClass("validation_error"), a = !1) : $(this).removeClass("validation_error")
      }), $("." + i).find("#hulkapps_option_list_" + t + " .dp_render:visible").each(function() {
        $(this).find(".error_span").length > 0 ? ($(this).addClass("validation_error"), a = !1) : $(this).removeClass("validation_error")
      }), $("." + i).find("#hulkapps_option_list_" + t + " .dp_render.required:visible").each(function() {
        $(this).find("input[type='date']").length && !$(this).find("input[name^='properties']").val() && $(this).hasClass("required") ? ($(this).addClass("validation_error"), a = !1) : $(this).find(".error_span").length > 0 ? ($(this).addClass("validation_error"), a = !1) : $(this).removeClass("validation_error")
      }), a = await resolveInventory(i, a, e), $("." + i).find(".hulkapps_option:visible").each(function() {
        $(this).hasClass("validation_error") && (a = !1)
      }), a
    }, window.validate_single_option = function(t, i, e = "") {
      var e = e;
      if ("" == e && (e = "hulkapps_product_options"), "dd_render" == i) 1 == $("." + e).find("." + t).find("select[name^='properties']").length && !$("." + e).find("." + t).find("select[name^='properties']").val() && $("." + e).find("." + t).hasClass("required") ? $("." + e).find("." + t).addClass("validation_error") : $("." + e).find("." + t).removeClass("validation_error");
      else if ("ci_render" == i) 1 == $("." + e).find("." + t).find("input[name^='properties']").length && !$("." + e).find("." + t).find("input[name^='properties']").val() && $("." + e).find("." + t).hasClass("required") ? $("." + e).find("." + t).addClass("validation_error") : $("." + e).find("." + t).removeClass("validation_error");
      else if ("dd_multi_render" == i) $("." + e).find("." + t).find("select[multiple]").length && !$("." + e).find("." + t).find("input[name^='properties']").val() && $("." + e).find("." + t).hasClass("required") ? $("." + e).find("." + t).addClass("validation_error") : $("." + e).find("." + t).removeClass("validation_error");
      else if ("swatch_render" == i) $("." + e).find("." + t).removeClass("validation_error");
      else if ("multiswatch_render" == i) $("." + e).find("." + t).find(".hulkapps_swatch_option").length && !$("." + e).find("." + t).find("input[name^='properties']").val() && $("." + e).find("." + t).hasClass("required") ? $("." + e).find("." + t).addClass("validation_error") : $("." + e).find("." + t).removeClass("validation_error");
      else if ("button_render" == i) $("." + e).find("." + t).find(".hulkapps_buton_option").length && !$("." + e).find("." + t).find("input[name^='properties']").val() && $("." + e).find("." + t).hasClass("required") ? $("." + e).find("." + t).addClass("validation_error") : $("." + e).find("." + t).removeClass("validation_error");
      else if ("cp_render" == i) $("." + e).find("." + t).find("input[type='text']").length && !$("." + e).find("." + t).find("input[name^='properties']").val() && $("." + e).find("." + t).hasClass("required") ? $("." + e).find("." + t).addClass("validation_error") : $("." + e).find("." + t).removeClass("validation_error");
      else if ("cb_render" == i) $("." + e).find("." + t).find(".hulkapps_check_option").length && !$("." + e).find("." + t).find("input[name^='properties']").val() && $("." + e).find("." + t).hasClass("required") ? $("." + e).find("." + t).addClass("validation_error") : $("." + e).find("." + t).removeClass("validation_error");
      else if ("tb_render" == i) $("." + e).find("." + t).find("input[type='text']").length && !$("." + e).find("." + t).find("input[name^='properties']").val() && $("." + e).find("." + t).hasClass("required") ? $("." + e).find("." + t).addClass("validation_error") : $("." + e).find("." + t).removeClass("validation_error");
      else if ("gf_render" == i) $("." + e).find("." + t).find("input[type='text']").length && !$("." + e).find("." + t).find("input[type='text']").val() && $("." + e).find("." + t).hasClass("required") ? $("." + e).find("." + t).addClass("validation_error") : $("." + e).find("." + t).removeClass("validation_error");
      else if ("nf_render" == i) $("." + e).find("." + t).find("input[type='number']").length && !$("." + e).find("." + t).find("input[name^='properties']").val() && $("." + e).find("." + t).hasClass("required") ? $("." + e).find("." + t).addClass("validation_error") : $("." + e).find("." + t).removeClass("validation_error");
      else if ("dp_render" == i) {
        if ($("." + e).find("." + t).find("input[type='date']").length && $("." + e).find("." + t).find("input[name^='properties']").val()) {
          var o = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/,
            a = $("." + e).find("." + t).find("input[type='date']").val();
          if (a.includes("-")) {
            var n = a.split("-");
            a = n[1] + "/" + n[2] + "/" + n[0]
          }
          var p = a.match(o);
          if (null == p) $("." + e).find("." + t).addClass("validation_error"), $("." + e).find("." + t).find(".validation_error").remove(), $("." + e).find("." + t).find("input[type='date']").after('<span class="validation_error error_span">Enter valid date format mm/dd/yyyy</span>');
          else if (dtMonth = p[1], dtDay = p[3], dtYear = p[5], dtMonth < 1 || dtMonth > 12) $("." + e).find("." + t).addClass("validation_error"), $("." + e).find("." + t).find(".validation_error").remove(), $("." + e).find("." + t).find("input[type='date']").after('<span class="validation_error error_span">Enter valid date format mm/dd/yyyy</span>');
          else if (dtDay < 1 || dtDay > 31) $("." + e).find("." + t).addClass("validation_error"), $("." + e).find("." + t).find(".validation_error").remove(), $("." + e).find("." + t).find("input[type='date']").after('<span class="validation_error error_span">Enter valid date format mm/dd/yyyy</span>');
          else if ((4 == dtMonth || 6 == dtMonth || 9 == dtMonth || 11 == dtMonth) && 31 == dtDay) $("." + e).find("." + t).addClass("validation_error"), $("." + e).find("." + t).find(".validation_error").remove(), $("." + e).find("." + t).find("input[type='date']").after('<span class="validation_error error_span">Enter valid date format mm/dd/yyyy</span>');
          else if (2 == dtMonth) {
            var l = dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0);
            dtDay > 29 || 29 == dtDay && !l ? ($("." + e).find("." + t).addClass("validation_error"), $("." + e).find("." + t).find(".validation_error").remove(), $("." + e).find("." + t).find("input[type='date']").after('<span class="validation_error error_span">Enter valid date format mm/dd/yyyy</span>')) : ($("." + e).find("." + t).removeClass("validation_error"), $("." + e).find("." + t).find(".validation_error").remove())
          } else "/" !== p[2] || "/" !== p[4] ? ($("." + e).find("." + t).addClass("validation_error"), $("." + e).find("." + t).find(".validation_error").remove(), $("." + e).find("." + t).find("input[type='date']").after('<span class="validation_error error_span">Enter valid date format mm/dd/yyyy</span>')) : ($("." + e).find("." + t).removeClass("validation_error"), $("." + e).find("." + t).find(".validation_error").remove())
        } else $("." + e).find("." + t).find("input[type='date']").length && !$("." + e).find("." + t).find("input[name^='properties']").val() && $("." + e).find("." + t).hasClass("required") ? ($("." + e).find("." + t).addClass("validation_error"), $("." + e).find("." + t).find(".validation_error").remove()) : ($("." + e).find("." + t).find(".validation_error").remove(), $("." + e).find("." + t).removeClass("validation_error"))
      } else if ("ta_render" == i) $("." + e).find("." + t).find("textarea").length && !$("." + e).find("." + t).find("input[name^='properties']").val() && $("." + e).find("." + t).hasClass("required") ? $("." + e).find("." + t).addClass("validation_error") : $("." + e).find("." + t).removeClass("validation_error");
      else if ("rb_render" == i) $("." + e).find("." + t).removeClass("validation_error");
      else if ("fu_render" == i) $("." + e).find("." + t).find("input[type='file']").length && !$("." + e).find("." + t).find("input[name^='properties']").val() && $("." + e).find("." + t).hasClass("required") ? $("." + e).find("." + t).addClass("validation_error") : $("." + e).find("." + t).removeClass("validation_error");
      else if ("pn_render" == i) $("." + e).find("." + t).find("input[type='textbox']").length && !$("." + e).find("." + t).find("input[name^='properties']").val() && $("." + e).find("." + t).hasClass("required") ? ($("." + e).find("." + t).addClass("validation_error"), good = !1) : $("." + e).find("." + t).find(".phone_number").hasClass("error") ? ($("." + e).find("." + t).addClass("validation_error"), good = !1) : $("." + e).find("." + t).removeClass("validation_error");
      else if ("et_render" == i) {
        if ($("." + e).find("." + t).find("input[type='email']").length && ($("." + e).find("." + t).find("input[name^='properties']").val() && $("." + e).find("." + t).hasClass("required") || "" != $("." + e).find("." + t).find("input[type='email']").val().length)) {
          var s = $("." + e).find("." + t).find("input[type='email']").val();
          /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,5}|[0-9]{1,3})(\]?)$/.test(s) ? $("." + e).find("." + t).removeClass("validation_error") : $("." + e).find("." + t).addClass("validation_error")
        } else $("." + e).find("." + t).removeClass("validation_error")
      }
    };
    var allOptions = "";
    $(document).on("click", "ul.hulkapps_product_options_ul .init", function() {
      $(this).parent(".hulkapps_option_child").children("li:not(.init)").toggleClass("hulk-flex")
    }), $(document).on("click", "ul.hulkapps_product_options_ul li:not(.init)", function() {
      $(this).parents(".hulkapps_option_value").find(".hulk_options_quantity").show(), $(this).parents(".ci_render").find(".inventory_error").html(""), $(this).parents(".ci_render").find(".hulk_unique_sku").prop("disabled", !0);
      var t = $(this).closest("ul").attr("id");
      (allOptions = $("#" + t).children("li:not(.init)")).removeClass("dropdown_selected"), $(this).addClass("dropdown_selected"), $(this).closest("ul").children(".init").html($(this).html()), $(this).closest("ul").children("li:not(.init)").toggleClass("hulk-flex");
      var i = "";
      $(this).parents(".hulkapps_option_value").find(".hulk_options_quantity").val() && (i = ` | ${$(this).parents(".hulkapps_option_value").find(".hulk_options_quantity").val()}`), $(this).parents(".hulkapps_option_value").find(".hulk_unique_prop").length > 0 && ("" != $(this).data("hinventory") ? $(this).parents(".hulkapps_option_value").find(".hulk_unique_prop").val($(this).attr("data-value") + "_hin_" + $(this).data("hinventory") + i) : $(this).parents(".hulkapps_option_value").find(".hulk_unique_prop").val("")), $(this).parents(".hulkapps_option_value").find(".hulk_opt_prop").val($(this).attr("data-value") + i), $(this).find(".hulk_unique_sku").prop("disabled", !1), conditional_rules(parseInt(window.hulkapps.product_id), "hulkapps_product_options"), "1" == $("#hulk_amount_dis").val() && calc_options_total(parseInt(window.hulkapps.product_id), "hulkapps_product_options"), validate_single_option("option_type_id_" + t, "ci_render", "hulkapps_product_options")
    }), $(document).on("click", ".hulkapps_product_options_ul_parent .hulk_options_quantity", function() {
      $(this).parents(".hulkapps_option_value").find(".hulk_opt_prop").val($(this).parents(".hulkapps_option_value").find("li.dropdown_selected").attr("data-value") + " | " + $(this).val()), $(this).parents(".hulkapps_option_value").find(".hulk_unique_prop") && $(this).parents(".hulkapps_option_value").find(".hulk_unique_prop").length > 0 && $(this).parents(".hulkapps_option_value").find("li.dropdown_selected").data("hinventory") && $(this).parents(".hulkapps_option_value").find(".hulk_unique_prop").val($(this).parents(".hulkapps_option_value").find("li.dropdown_selected").attr("data-value") + "_hin_" + $(this).parents(".hulkapps_option_value").find("li.dropdown_selected").data("hinventory") + " | " + $(this).val()), "1" == $("#hulk_amount_dis").val() && calc_options_total(parseInt(window.hulkapps.product_id), "hulkapps_product_options")
    });
    var allOptions = "";
    $(document).on("click", "ul.hulkapps_edit_options_ul .init", function() {
      $(this).parent(".hulkapps_option_child").children("li:not(.init)").toggleClass("hulk-flex")
    }), $(document).on("click", "ul.hulkapps_edit_options_ul li:not(.init)", function() {
      $(this).parents(".hulkapps_option_value").find(".hulk_options_quantity").show(), $(this).parents(".ci_render").find(".inventory_error").html(""), $(this).parents(".ci_render").find(".hulk_unique_sku").prop("disabled", !0);
      var t = $(this).closest("ul").attr("id");
      (allOptions = $("#" + t).children("li:not(.init)")).removeClass("dropdown_selected"), $(this).addClass("dropdown_selected"), $(this).closest("ul").children(".init").html($(this).html()), $(this).closest("ul").children("li:not(.init)").toggleClass("hulk-flex");
      var i = "";
      $(this).parents(".hulkapps_option_value").find(".hulk_options_quantity").val() && (i = ` | ${$(this).parents(".hulkapps_option_value").find(".hulk_options_quantity").val()}`), $(this).parents(".hulkapps_option_value").find(".hulk_unique_prop").length > 0 && ("" != $(this).data("hinventory") ? $(this).parents(".hulkapps_option_value").find(".hulk_unique_prop").val($(this).attr("data-value") + "_hin_" + $(this).data("hinventory") + i) : $(this).parents(".hulkapps_option_value").find(".hulk_unique_prop").val("")), $(this).find(".hulk_unique_sku").prop("disabled", !1), $(this).parents(".hulkapps_option_value").find(".hulk_opt_prop").val($(this).attr("data-value") + i), conditional_rules(parseInt(window.hulkapps.product_id), "hulkapps_edit_product_options"), "1" == $("#hulk_amount_dis").val() && calc_options_total(parseInt(window.hulkapps.product_id), "hulkapps_edit_product_options"), validate_single_option("option_type_id_" + t, "ci_render", "hulkapps_edit_product_options")
    }), $(document).on("change", ".hulk_file_upload", function() {
      var t = $(this).val();
      /^\s*$/.test(t) ? ($(this).parents(".file-upload").removeClass("hulk-active"), $(this).parents(".file-upload").find(".noFile").text("No file chosen...")) : ($(this).parents(".file-upload").addClass("hulk-active"), $(this).parents(".file-upload").find(".noFile").text(t.replace("C:\\fakepath\\", "")))
    }), $(document).on("keyup", ".hulkapps_discount_code", function(t) {
      "" != $.trim($(this).val()) ? ($(".hulkapps_product_discount_button").removeAttr("disabled"), $(".hulkapps_product_discount_button").removeClass("hulkapps_product_discount_disabled_button")) : ($(".hulkapps_product_discount_button").attr("disabled", "disabled"), $(".hulkapps_product_discount_button").addClass("hulkapps_product_discount_disabled_button"))
    }), $(document).on("click", ".hulkapps_product_discount_button", function(t) {
      $(".hulkapps_product_discount_button").attr("disabled", "disabled"), $(".hulkapps_product_discount_button").addClass("hulkapps_product_discount_disabled_button"), new Promise((t, i) => {
        var e = validate_options(window.hulkapps.product_id, "hulkapps_product_options");
        t(e)
      }).then(function(t) {
        if (t) {
          var i = Shopify.locale,
            e = {};
          e[window.hulkapps.product.selected_variant] = window.hulkapps.product_collection, $.ajax({
            type: "POST",
            url: window.hulkapps.po_url + "/store/get_cart_details",
            data: {
              cart_data: window.hulk_cjson,
              store_id: window.hulkapps.store_id,
              cart_collections: JSON.stringify(e),
              customer_tags: null != window.hulkapps.customer ? window.hulkapps.customer.tags.split(",") : "",
              draft_order_language: void 0 != i ? i : "",
              discount_code: $("input[name=checkout_discount]").val()
            },
            crossDomain: !0,
            success: function(t) {
              var i = t.discounts,
                e = parseFloat(i.discount_cut_price);
              i.discount_code && 1 == i.discount_error ? (hulkapps_jQuery(".hulkapps_summary_product").remove(), $(".discount_code_box_product .hulkapps_discount_hide").after("<span class='hulkapps_summary_product'>Discount code does not match</span>"), $(".hulkapps-summary-product-line-discount-code").html(""), $(".product_after_discount_price").html("")) : i.is_free_shipping ? ($(".hulkapps_summary_product").remove(), $(".hulkapps-summary-product-line-discount-code").html(""), $(".product_after_discount_price").html(""), $(".discount_code_box_product .hulkapps_discount_hide").after("<span class='hulkapps-summary-product-line-discount-code'><span class='discount-tag'>" + i.discount_code + "<span class='product-close-tag close-tag'></span></span>Free Shipping")) : i.discount_code && e <= 0 ? ($(".discount_code_box_product .hulkapps_discount_hide").after("<span class='hulkapps_summary_product'>" + i.discount_code + " discount code isn’t valid for the items in your cart</span>"), $(".hulkapps_discount_code").val(""), $(".hulkapps-summary-product-line-discount-code").html(""), $(".product_after_discount_price").html("")) : i.discount_code ? ($(".discount_code_box_product").find(".hulkapps_summary_product").html(""), $(".hulkapps-summary-product-line-discount-code,.product_after_discount_price").remove(), $(".discount_code_box_product .hulkapps_discount_hide").after("<span class='hulkapps-summary-product-line-discount-code'><span class='discount-tag'>" + i.discount_code + "<span class='product-close-tag close-tag'></span></span><span class='hulkapps_with_discount'> -" + i.with_discount + "</span></span><span class='product_after_discount_price'><span class='final-total'>Total</span>" + i.final_with_discounted_price + "</span>"), $(".hulkapps-cart-total").remove()) : ($(".hulkapps-summary-product-line-discount-code").html(""), $(".product_after_discount_price").html(""), $(".discount_code_box_product").find(".hulkapps_summary_product").html("")), $(".hulkapps_product_discount_button").removeAttr("disabled"), $(".hulkapps_product_discount_button").removeClass("hulkapps_product_discount_disabled_button")
            }
          })
        }
      }).catch(function(t) {})
    }), $(document).on("click", ".hulkapps_product_discount_modal .modal_close_btn", function(t) {
      $(".hulkapps_product_discount_modal").hide()
    });
    var hulk_flag = 0;
    $(document).on("click", ".hulk-buy_now,#hulkapps_buy_now_continue", function(t) {
      var i = $(this),
        e = $(this).attr("data-hulk-btn-type");
      t.cancelBubble = !0, t.stopPropagation(), t.preventDefault(), t.stopImmediatePropagation(), new Promise((t, i) => {
        var e = validate_options(window.hulkapps.product_id, "hulkapps_product_options");
        t(e)
      }).then(function(t) {
        if (t) {
          if (window.is_product_page_doscount_code && "hulkapps_buy_now_continue" != e && $(".product-hulkapps-discount-code-html").length > 0) {
            var o, a = "";
            a = $(".shopify-payment-button").html().includes("ShopifyPay-button") ? "ShopifyPay-button" : "Checkout-button", $(".product-hulkapps-discount-code-html").html('<div class="hulkapps_product_discount_modal"><div class="product_discount_modal_wrapper"><span class="modal_close_btn"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_2361_7248)"><path d="M1.23998 24.0001C0.923838 24.0001 0.607699 23.8798 0.367506 23.6378C-0.114689 23.1556 -0.114689 22.3739 0.367506 21.8917L21.8975 0.361646C22.3797 -0.120549 23.1615 -0.120549 23.6437 0.361646C24.1259 0.843841 24.1259 1.6256 23.6437 2.1081L2.11396 23.6378C1.87195 23.8783 1.55582 24.0001 1.23998 24.0001Z" fill="#AAAAAA"/><path d="M22.7715 24.0001C22.4554 24.0001 22.1395 23.8798 21.899 23.6378L0.367506 2.1081C-0.114689 1.6256 -0.114689 0.843841 0.367506 0.361646C0.849701 -0.120549 1.63146 -0.120549 2.11396 0.361646L23.6437 21.8917C24.1259 22.3739 24.1259 23.1556 23.6437 23.6378C23.4017 23.8783 23.0858 24.0001 22.7715 24.0001Z" fill="#AAAAAA"/></g><defs><clipPath id="clip0_2361_7248"><rect width="24" height="24" fill="white"/></clipPath></defs></svg></span><div class="product_discount_modal_body"><div id="hulkapps_discount_code"><div class="discount_code_box_product"><div class="hulkapps_discount_hide"><input placeholder="Discount code" class="hulkapps_discount_code" autocomplete="off" aria-required="true" size="30" type="text" name="checkout_discount"><button type="button" class="btn btn--primary btn-primary button hulkapps_product_discount_button hulkapps_product_discount_disabled_button" disabled >Apply</button></div></div></div><p class="hulkapps_discount_notetxt"><b>Note:</b> Proceed with Checkout button if no discount code available.</p></div><div class="product_discount_modal_footer"><button id="" class="btn btn-secondary button button--secondary modal_close_btn" type="button"  >Cancel</button><button id="hulkapps_buy_now_continue" class="btn btn--secondary btn-primary button button--primary" type="button" data-testid="' + a + '" data-hulk-btn-type="hulkapps_buy_now_continue">Checkout</button></div></div></div>')
          }
          var n = "hulkapps_product_options",
            p = 0;
          window.hulkapps.money_format;
          var l = $("." + n + " #hulkapps_option_list_" + window.hulkapps.product_id + ":visible .price-change:checked, ." + n + " #hulkapps_option_list_" + window.hulkapps.product_id + ":visible .price-change:selected, ." + n + " .hulkapps_swatch_option .swatch_selected,." + n + " .textarea_selected,." + n + " .textbox_selected,." + n + " .emailbox_selected,." + n + " .datepicker_selected,." + n + " .numberfield_selected,." + n + " .colorpicker_selected,." + n + " .button_selected,." + n + " .googlefont_selected, ." + n + " .ci_render .hulkapps_option_value .hulkapps_option_child .dropdown_selected");
          for (o = 0; o < l.length; o++) $(l[o]).parents(".hulkapps_option").hasClass("conditional") || (p = Number($(l[o]).attr("data-price")) + Number(p));
          if (0 == hulk_flag && ("Checkout-button" == i.attr("data-testid") || "ShopifyPay-button" == i.attr("data-testid"))) {
            $(".shopify-payment-button").css({
              "pointer-events": "none"
            });
            var s = {},
              r = i.attr("data-testid");
            $("[name^='properties']").each(function() {
              var t;
              "" == $(this).val() && $(this).remove(), "radio" == this.type ? this.checked && (t = this.name.replace("properties[", "").replace("]", ""), $.trim(this.value).length > 0 && (s[t] = this.value)) : (this.type, t = this.name.replace("properties[", "").replace("]", ""), $.trim(this.value).length > 0 && (s[t] = this.value))
            });
            var d = Shopify.locale,
              u = {};
            u[window.hulkapps.product.selected_variant] = window.hulkapps.product_collection, window.hulk_cjson = {};
            let c = [];
            c.push({
              product_id: window.hulkapps.product.id,
              price: window.hulkapps.product.price,
              line_price: window.hulkapps.product.price * parseInt($("input[name=quantity]").val()),
              tags: window.hulkapps.product.tags,
              variant_id: window.hulkapps.product.selected_variant,
              quantity: parseInt($("input[name=quantity]").val()),
              vendor: window.hulkapps.product.vendor,
              product_type: window.hulkapps.product.product_type,
              properties: s,
              title: window.hulkapps.product.title
            }), hulk_cjson.cart = {
              items: c,
              original_total_price: window.hulkapps.product.price * parseInt($("input[name=quantity]").val()),
              item_count: parseInt($("input[name=quantity]").val())
            }, hulk_cjson.money_format = window.hulkapps.money_format, (!window.is_product_page_doscount_code || window.is_product_page_doscount_code && "hulkapps_buy_now_continue" == e) && $.ajax({
              type: "POST",
              url: window.hulkapps.po_url + "/store/create_draft_order",
              data: {
                cart_json: hulk_cjson,
                store_id: window.hulkapps.store_id,
                cart_collections: JSON.stringify(u),
                customer_tags: null != window.hulkapps.customer ? window.hulkapps.customer.tags.split(",") : "",
                draft_order_language: void 0 != d ? d : "",
                discount_code: $(".discount_code_box_product .hulkapps_discount_code").val(),
                hulk_btn_type: r
              },
              crossDomain: !0,
              success: function(t) {
                "string" == typeof t ? window.location.href = t : "ShopifyPay-button" == r ? window.location.href = "/checkout?payment=shop_pay" : window.location.href = "/checkout", localStorage.removeItem("discount_code")
              }
            })
          }
        }
      }).catch(function(t) {})
    }), $(document).on("click", ".hulkapps_submit_cart", function(t) {
      0 == hulk_flag && (t.preventDefault(), new Promise((t, i) => {
        var e = validate_options(window.hulkapps.product_id, "hulkapps_product_options");
        t(e)
      }).then(function(t) {
        t && ($("[name^='properties']").each(function() {
          ("" == $(this).val() || $(this).hasClass("hf_property_val") && $(this).hasClass("conditional")) && $(this).attr("disabled", !0)
        }), hulk_flag = 1, $(".hulkapps_submit_cart").click(), 1 == hulk_flag && ($("[name^='properties']").each(function() {
          ("" == $(this).val() || $(this).hasClass("hf_property_val") && $(this).hasClass("conditional")) && $(this).attr("disabled", !1)
        }), hulk_flag = 0))
      }).catch(function(t) {
        hulk_flag = 1, $(".hulkapps_submit_cart").click(), 1 == hulk_flag && ($("[name^='properties']").each(function() {
          ("" == $(this).val() || $(this).hasClass("hf_property_val") && $(this).hasClass("conditional")) && $(this).attr("disabled", !1)
        }), hulk_flag = 0)
      }))
    })
  }, void 0 !== window.hulkapps && ("undefined" == typeof jQuery || 3 == parseInt(jQuery.fn.jquery) && 2.1 > parseFloat(jQuery.fn.jquery.replace(/^1\./, "")) ? hulkLoadScript("//ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js", function() {
    checkAppInstalled(hulkapps_jQuery = jQuery.noConflict(!0))
  }) : checkAppInstalled(hulkapps_jQuery = jQuery))
}
