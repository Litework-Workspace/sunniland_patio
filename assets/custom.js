/**
 * Include your custom JavaScript here.
 *
 * We also offer some hooks so you can plug your own logic. For instance, if you want to be notified when the variant
 * changes on product page, you can attach a listener to the document:
 *
 * document.addEventListener('variant:changed', function(event) {
 *   var variant = event.detail.variant; // Gives you access to the whole variant details
 * });
 *
 * You can also add a listener whenever a product is added to the cart:
 *
 * document.addEventListener('product:added', function(event) {
 *   var variant = event.detail.variant; // Get the variant that was added
 *   var quantity = event.detail.quantity; // Get the quantity that was added
 * });
 *
 * If you just want to force refresh the mini-cart without adding a specific product, you can trigger the event
 * "cart:refresh" in a similar way (in that case, passing the quantity is not necessary):
 *
 * document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
 *   bubbles: true
 * }));
 */

// START Hulk options tweak to work with the variant options
// function to match the selected hulk dropdown to the invisible shopify variant selector
function createOrReplaceOptionName(container, optionString) {
  let optionContainer = container.querySelector('.selected-option-custom');
  if (!optionContainer) {
    const optionHeader = container.querySelector('.hulkapps_option_name');
    optionContainer = document.createElement('span');
    optionContainer.classList.add('selected-option-custom');
    optionHeader.insertAdjacentElement('afterend', optionContainer);
  }
  optionContainer.innerHTML = optionString;
}

function attachEventListeners(container) {
  const hulkSelect = container.querySelector('select.hulkapps_option_child');
  const radioContainer = container.querySelectorAll('.hulk_po_radio.hulkapps_option_child');

  if (hulkSelect) {
    hulkSelect.addEventListener('change', event => {
      createOrReplaceOptionName(container, hulkSelect.value);
    });
  } else if (radioContainer.length > 0) {
    radioContainer.forEach(radio => {
      const radioObserver = new MutationObserver(mutationList => {
        mutationList.forEach(mutation => {
          if (mutation.type === "attributes" && radio.classList.contains('swatch_selected')) {
            createOrReplaceOptionName(container, radio.getAttribute('value'));
          }
        });
      });
      radioObserver.observe(radio, { attributes: true });
    });
  }
}

function syncHulkOptionWithVariant() {
  const ogSelect = document.querySelector('.no-js.ProductForm__Option select');

  const callback = mutationList => {
    mutationList.forEach(mutation => {
      if (mutation.type === "childList") {
        const hulkContainers = [
          ...document.querySelectorAll('.hulkapps_option.dd_render'),
          ...document.querySelectorAll('.hulkapps_option.swatch_render')
        ];
        hulkContainers.forEach(attachEventListeners);

        const hulkSelect = document.querySelector('.hulkapps_option.dd_render select.hulkapps_option_child');
        if (hulkSelect && ogSelect) {
          hulkSelect.addEventListener('change', e => {
            const selectedValue = e.target.value;
            for (const option of ogSelect.options) {
              if (option.innerHTML.includes(selectedValue)) {
                ogSelect.value = option.value;
                break;
              }
            }
          });
        }
      }
    });
  };

  const targetNode = document.querySelector("body");
  const observer = new MutationObserver(callback);
  observer.observe(targetNode, { childList: true });
}

document.addEventListener('DOMContentLoaded', () => {
  if (location.href.includes(`/products/`)) {
    syncHulkOptionWithVariant();
  }
});
// END Hulk options tweak to work with the variant options

// START Predictive Search Fix
function linkAllSearchToMainSearch() {
  const searchBars = document.querySelectorAll('.custom-search');
  const mainSearchBar = document.querySelector('#Search');
  const mainSearchBarInput = document.querySelector('#Search input.Search__Input');
  if (!mainSearchBar || searchBars.length < 1) {
    console.log('No search bars'); return;
  }

  // trigger event listeners to the mainSearchBarInput to preserve all functionality
  function dispatchKeydownEvent(event) {
    mainSearchBarInput.value = event.target.value;
    const changeEvent = new Event('change');
    const keydownEvent = new KeyboardEvent('keydown', {
      key: event.key,
      code: event.code,
      shiftKey: event.shiftKey,
      altKey: event.altKey,
      ctrlKey: event.ctrlKey,
      metaKey: event.metaKey
    });
    const inputEvent = new Event("input", {
      bubbles: true,
      cancelable: true,
    });
    mainSearchBarInput.dispatchEvent(keydownEvent);
    mainSearchBarInput.dispatchEvent(changeEvent);
    mainSearchBarInput.dispatchEvent(inputEvent);
  }

  searchBars.forEach(el => {
    el.querySelector('input.Search__Input').addEventListener('input', e => {
      if (e.target.value) {
        mainSearchBar.setAttribute('aria-hidden', 'false');
      } else {
        mainSearchBar.setAttribute('aria-hidden', 'true');
      };
      dispatchKeydownEvent(e);
    })
  })
}
document.addEventListener('DOMContentLoaded', function() {
  linkAllSearchToMainSearch();
})
// END Predictive Search Fix

// START Cart Drawer fix
document.addEventListener('DOMContentLoaded',function(){
  ajaxAddToCart();
})
function ajaxAddToCart(){
  $('.ad_to_cart_coll').click(async function() {
    console.log('clicked this');
    var variant_id = $(this).attr("data-var_id");
    var product_id = $(this).attr("data-prod-id");
    var tags = $(this).attr("data-prod-tags");
    var vendor = $(this).attr("data-prod-vendor");
    var type = $(this).attr("data-prod-type");
    var collections = $(this).attr("data-prod-collections");
    var url = $(this).attr("data-prod-url");
    var product = {
      variant_id: variant_id,
      id: product_id,
      tags: tags,
      vendor: vendor,
      type: type,
      collections: collections,
      url: url
    };
    const hulk = await getHulkOptions(product);
    //
    // redirect to the pdp if hulk options exist. Otherwise, add to cart.
    if(hulk){
      window.location = url;
    } else {
      addItemToCart(variant_id, 1);    // paste your id product number
      $('.cart_dr').trigger("click");
    }
  });
}
function addItemToCart(variant_id, qty) {
  data = {
    "id": variant_id,
    "quantity": qty
  }
  jQuery.ajax({
    type: 'POST',
    url: '/cart/add.js',
    data: data,
    dataType: 'json',
    success: function() {
      document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
        bubbles: true  //this code is for prestige theme, is to refresh the cart
      }));
      const cartIcon = document.querySelector('.Header__Cart-Icon');
      if(cartIcon){
        cartIcon.click();
      }
    }
  });
}
async function getHulkOptions(product){
  const url = window.hulkapps.po_url + "/api/v2/store/get_all_relationships";

  const postData = {
    pid: product.id,
    store_id: window.hulkapps.store_id,
    tags: product.tags,
    vendor: product.vendor,
    ptype: product.type,
    customer_tags: null != window.hulkapps.customer ? window.hulkapps.customer.tags.split(",") : "",
    product_collections: product.collections
  };

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(postData)
  })
    .then(response => response.json())
    .then(data => {
      return data
    })
    .catch(error => {
      console.error("Error:", error);
      return false
    });
}
// END Cart Drawer fix
