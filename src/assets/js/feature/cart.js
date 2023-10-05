const _SESSION_INDEX_CART = 'cart';
const _CART_BUTTON_CLASS  = ".cart-add";
const _CART_TYPE_INDEX_PRODUCTS = 'product';

const cartInit = () => {
    cartEventListeners();
    cartButtonUpdateFromCart();
    cartModalUpdate();
};

const cartEventListeners = () => {
    __eventListener(_CART_BUTTON_CLASS,'click',cartAdd);
}; 
 
const cartAdd = (event) => {
    const item =  eventToData(event),
        cart   =  cartDeepCheck();
    cart[item.type].push(item);
    cartSet(cart);
    __notify("Item added to cart", _NOTIFICATIONS_TYPE_SUCCESS);
    cartButtonUpdate(eventToElement(event));
    cartModalUpdate();
    return cartDeepCheck();
};
const cartButtonUpdateFromCart = () => {
    for(let [index, element] of Object.entries(document.querySelectorAll(_CART_BUTTON_CLASS))){
        let item = element.dataset;
        if(cartItemExists(item.type, item.cod)){
            cartButtonUpdate(element);
        }
    }
}
const cartItemExists = (type,cod) => {
    let checker = {};
    for(let [cartType, cartTypeItems] of Object.entries(cartDeepCheck())){
        for(let [index, item] of Object.entries(cartTypeItems)){
            if(empty(checker[item.type])){
                checker[item.type] = {};
            }
            if(empty(checker[item.type][item.cod])){
                checker[item.type][item.cod] = true;
            }
        }
    }
    return isSet(checker[type]) && isSet(checker[type][cod]);
}
const cartButtonUpdate = (element) => {
    element.innerHTML = `Ir al carrito`;
    __eventListener(element, 'click', () => {
        window.location.href = '/pages/carrito.html';
    });
}
const cartSet = (cart) => __sessionStorage(_SESSION_INDEX_CART,cart);
const cartDeepCheck = () => {
    let cart = isNull(__sessionStorage(_SESSION_INDEX_CART)) || !isObject(__sessionStorage(_SESSION_INDEX_CART))
        ? cartSet({})
        : __sessionStorage(_SESSION_INDEX_CART) ;
    if(empty(cart[_CART_TYPE_INDEX_PRODUCTS])){
        cart[_CART_TYPE_INDEX_PRODUCTS] = [];
    }
    let cods = {},  
        cartTemp = {};
    for(let [cartType,cartTypeItems] of Object.entries(cart)){
        if(empty(cartTemp[cartType])){
            cartTemp[cartType] = [];
        }
        for(let [index, item] of Object.entries(cartTypeItems)){
            if(empty(cods[item.type])){
                cods[item.type] = {};
            }
            if(empty(cods[item.type][item.cod])){
                cods[item.type][item.cod] = true;
                cartTemp[cartType].push(item);
            }
        }
    }
    return cartSet(cartTemp);
};
const cartModalUpdate = () => {
    let html = '',
        total = 0;
    const cart = cartDeepCheck();
    for(let [type,items] of Object.entries(cartDeepCheck())){
        for(const [index,item] of Object.entries(items)){
            html += `<div class="row border-1 border-primary border rounded">
                    <div class="col-3">
                        <div class="imagen-producto" style="background-image:url(${item.image})"></div>
                    </div>
                    <div class="col-6 fs-4">
                        ${item.title}
                    </div>
                    <div class="col-3 fs-5 currency-convert" data-price="${item.price}">
                        ${item.price} USD
                    </div>
                </div>`;
            total += parseFloat( item.price);
        }
    }
    html += `<select class="currency-select w-100">`
    for(const [currency,text] of Object.entries(_CURRENCY_LIST)){
        html += `<option value="${currency}">${text}</option>`;
    }
    html += `</select>`;
    document.getElementById('cart-modal-items').innerHTML = html;
    document.getElementById('cart-modal-total').innerHTML = `${total} USD`;
    __currenciesEventListeners();
};