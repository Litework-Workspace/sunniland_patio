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
function linkAllSearchToMainSearch(){
  const searchBars = document.querySelectorAll('.custom-search');
  const mainSearchBar = document.querySelector('#Search');
  const mainSearchBarInput = document.querySelector('#Search input.Search__Input');
  if(!mainSearchBar || searchBars.length < 1){
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
    el.querySelector('input.Search__Input').addEventListener('input',e => {
      if(e.target.value){
        mainSearchBar.setAttribute('aria-hidden','false');
      } else {
        mainSearchBar.setAttribute('aria-hidden','true');
      };
      dispatchKeydownEvent(e);
    })
  })
}
document.addEventListener('DOMContentLoaded',function(){
  linkAllSearchToMainSearch();
})
// END Predictive Search Fix
