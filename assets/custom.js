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

function linkHulkOptionsToImages() {
  const radioContainer = document.querySelectorAll('.hulk_po_radio.hulkapps_option_child');
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const navSelector = isMobile ? ".dot" : ".Product__SlideshowNavImage";
  const mainImages = document.querySelectorAll('.Product__Slideshow img');
  const navImages = document.querySelectorAll(`${navSelector} img`);

  radioContainer.forEach(radio => {
    radio.addEventListener('click',(event) => {
      // find all selected items
      const selectedItems = document.querySelectorAll('.swatch_selected');
      let altText = "";

      if (selectedItems.length == 2) {
        for (const img of mainImages) {
          if (
            img.alt.toLowerCase().includes(selectedItems[0].getAttribute('value').replaceAll(' ','').toLowerCase()) &&
              img.alt.toLowerCase().includes(selectedItems[1].getAttribute('value').replaceAll(' ','').toLowerCase())
          ) {
            altText = img.alt;
            break
          }
        }

        if (altText) {
          const mainImage = document.querySelector(`.Product__SlideItem img[alt="${altText}"]`);
          const navImage = document.querySelector(`${navSelector} img[alt="${altText}"]`);

          if (navImage) {
            navImage.closest(navSelector).click();

            mainImages.forEach(img => {
              if (img == mainImage) {
                img.closest('.Product__SlideItem').classList.remove('hidden');
              } else {
                img.closest('.Product__SlideItem').classList.add('hidden');
              }
            });

            navImages.forEach(img => {
              if (img == navImage) {
                img.closest(navSelector).classList.remove('hidden');
              } else {
                img.closest(navSelector).classList.add('hidden');
              }
            });
          }
        } else {
          mainImages.forEach(img => {
            img.closest('.Product__SlideItem').classList.remove('hidden');
          });

          navImages.forEach(img => {
            img.closest(navSelector).classList.remove('hidden');
          });
        }

        /* 
           * dispatch this event to trigger `this._setupDeviceFeatures()` in 
           * theme.js. That function re-calibrates the height of the right side 
           * of the pdp.
          */
        document.dispatchEvent(new Event('pdpImagesRefreshed'));

        window.scrollTo({
          behavior: "smooth",
          top: 0,
          left: 0
        })
      }
    })
  });
} 

function addChevron(element){
  const chevronAdded = element.querySelector('svg.hulk-chevron');
  if(chevronAdded){
    return
  }

  const select = element.querySelector('select.hulkapps_option_child');
  if(select){
    select.parentElement.innerHTML += `
        <svg class="hulk-chevron" role="presentation" viewBox="0 0 19 12" style="position: absolute;height: 100%;width: 15px;top: 0;right: 10px;pointer-events: none;">
          <polyline fill="none" stroke="currentColor" points="17 2 9.5 10 2 2" fill-rule="evenodd" stroke-width="2" stroke-linecap="square"></polyline>
        </svg>
      `;
  }
}

async function syncHulkOptionWithVariant() {
  const ogSelect = document.querySelector('.no-js.ProductForm__Option select');
  const productForm = document.querySelector('form[data-product-id]');
  const linkImages = document.querySelector('[data-link-hulk-options-to-images]');

  const prodReq = await fetch(`https://productoption.hulkapps.com/v1/products/?product_id=${productForm.dataset.productId}&shop_domain=sunniland-patio-patio-furniture-and-spas-in-boca-raton.myshopify.com`,{
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJpc3N1ZXJfbmFtZSIsImF1ZCI6ImNsaWVudCIsInRva2VuX25hbWUiOiJUb2tlbiIsInNob3BfaWQiOjEzMDIwMCwiY3JlYXRlX3RpbWUiOiIyMDI0LTAzLTA0IDA4OjM0OjEwICswMDAwIn0.GJ8U7aLJJcmhWigVK3uD1Tml_BSl5rr8DZ4cyzcxM8g'
    }
  });
  const prod = await prodReq.json();
  let eventListenersAttached = false;
  let hulkSelectSynced = false;

  const callback = mutationList => {
    mutationList.forEach(mutation => {
      if (mutation.type === "childList") {
        const hulkContainers = [
          ...document.querySelectorAll('.hulkapps_option.dd_render'),
          ...document.querySelectorAll('.hulkapps_option.swatch_render')
        ];

        if (prod && prod.relationship.options.length == hulkContainers.length && !eventListenersAttached) {
          hulkContainers.forEach(attachEventListeners);
          hulkContainers.forEach(addChevron);

          if (linkImages) {
            linkHulkOptionsToImages();
          }

          eventListenersAttached = true;
        }

        const hulkSelect = document.querySelector('.hulkapps_option.dd_render select.hulkapps_option_child');
        if (hulkSelect && ogSelect && !hulkSelectSynced) {
          const priceContainer = document.querySelector('.ProductMeta__Price.Price');
          hulkSelect.addEventListener('change', e => {
            const selectedValue = e.target.value;
            for (const option of ogSelect.options) {
              if (option.innerHTML.includes(selectedValue)) {
                ogSelect.value = option.value;
                if (priceContainer && ogSelect.options[ogSelect.selectedIndex]) {
                  priceContainer.innerHTML = "$" + ogSelect.options[ogSelect.selectedIndex].getAttribute('data-variant-price');
                }
                break;
              }
            }
          });

          hulkSelectSynced = true;
        }

        if (hulkSelectSynced && eventListenersAttached) {
          observer.disconnect();
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
  const mainSearchBarInputClose = document.querySelector('#Search .Search__Close');
  if (!mainSearchBar || searchBars.length < 1) {
    console.error('No search bars'); return;
  }

  // close the search results by clicking outside of the results
  document.querySelector('#main').addEventListener('click',() => {
    mainSearchBarInputClose.click()
  })

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
function ajaxAddToCart(){
  $('.ad_to_cart_coll:not(.hulk-checked)').each(async function(index){
    // added the class so that if this function is called again on the same page
    // for newly rendered elements, the click event doesn't get added twice.
    const $this = $(this);

    // if the prod is not available, dont do anything
    if(!$this.data('prod-available')){
      return
    };
    $this.addClass('hulk-checked');
    const product = {
      variant_id: String($this.data('var_id')),
      id: String($this.data('prod-id')),
      tags: String($this.data('prod-tags')),
      vendor: String($this.data('prod-vendor')),
      type: String($this.data('prod-type')),
      collections: String($this.data('prod-collections')),
      url: String($this.data('prod-url')),
    };
    const hulk = await getHulkOptions(product);
    
    // redirect to the pdp if hulk options exist. Otherwise, add to cart.
    if(hulk){
      $this.html('<span>View Product</span>').on('click', () => {
        window.location = product.url
      });
    } else {
      $this.click( () => {
        addItemToCart(product.variant_id, 1);    // paste your id product number
      })
    };
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
      return false
    });
}
document.addEventListener('DOMContentLoaded',function(){
  ajaxAddToCart();
})
// END Cart Drawer fix
