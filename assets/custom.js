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
function syncHulkOptionWithVariant(){
  const ogSelect = document.querySelector('.no-js.ProductForm__Option select');
  if(!ogSelect){console.log('no select found'); return};

  function callback(mutationList, observer) {
    mutationList.forEach((mutation) => {
      switch (mutation.type) {
        case "childList":
          // need to make it dynamically work with the umbrellas 
          // https://www.sunnilandpatio.com/products/6-5-ft-square-frankford-patio-umbrella-crank-lift-wood-grain-frame?variant=40928161366127
          const hulkSelect = document.querySelector('.hulkapps_option.dd_render select.hulkapps_option_child');
          if(hulkSelect){
            hulkSelect.addEventListener('change',e => {
              const selectedValue = e.target.value;

              for (const option of ogSelect.options) {
                if (option.innerHTML.includes(selectedValue)) {
                  ogSelect.value = option.value;
                  break;
                }
              }
            });
            observer.disconnect();
          }
          break;
      }
    });
  }
  const targetNode = document.querySelector("body");
  const observerOptions = {
    childList: true,
  };
  const observer = new MutationObserver(callback);
  observer.observe(targetNode, observerOptions);
}
document.addEventListener('DOMContentLoaded',e => {
  syncHulkOptionWithVariant()
})
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
