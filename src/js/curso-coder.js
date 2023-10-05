/*jshint esversion: 6 */
const getQuerySelector = (el) => {
    if (el.tagName.toLowerCase() == "html"){
        return "HTML";
    }
    let str = el.tagName;
    str += (el.id != "") ? "#" + el.id : "";
    if (el.className) {
        const classes = el.className.split(/\s/);
        for (let i = 0; i < classes.length; i++) {
            str += "." + classes[i];
        }
    }
    return getQuerySelector(el.parentNode) + " > " + str;
};

const getId = (element, id, override = false) => {
    if(!isNull(id)){
        if(override || empty(element.getAttribute('id'))){
            element.id = id;
        }
    }
    return element.getAttribute('id');
};
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const functionExists = (_function) => typeof window[_function] === "function";

const isSet = (variable) => typeof variable !== typeof undefined;
const empty = (variable) => !isSet(variable);
const isNull = (variable) => variable === null;


const getBrowser = () => {
    let browser      = null,
        device       = window.innerWidth <= 768 ? '(Mobile)' : '(Desktop)',
        opera        = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0,
        firefox      = typeof InstallTrigger !== 'undefined',
        safari       = isSet(window.safari) && isSet(window.safari.pushNotification),
        ie           = /*@cc_on!@*/false || !!document.documentMode,
        edge         = !ie && !!window.StyleMedia,
        chrome       = isSet(window.chrome),
        edgeChromium = chrome && (navigator.userAgent.indexOf("Edg") != -1);
    browser = opera        ? 'Opera'        : browser;
    browser = firefox      ? 'Firefox'      : browser;
    browser = safari       ? 'Safari'       : browser;
    browser = ie           ? 'IE'           : browser;
    browser = edge         ? 'Edge'         : browser;
    browser = chrome       ? 'Chrome'       : browser;
    browser = edgeChromium ? 'EdgeChromium' : browser;
    browser = browser == null ? 'WebView' : browser;
    browser = browser + ' ' + device;
    return browser;
};;
const isArray = (variable) => Array.isArray(variable);
const isObject = (variable) => typeof variable === 'object';
const inArray = (needle, haystack) => isArray(haystack) ? haystack.includes(needle) : false;
;
const getTimeString = ($time) => {
    let $html       = '',
        days_div    = 1000 * 60 * 60 * 24,
        hours_div   = 1000 * 60 * 60,
        minutes_div = 1000 * 60,
        seconds_div = 1000,
        days_raw    = $time / days_div,
        hours_raw   = ($time % days_div) / hours_div,
        minutes_raw = ($time % hours_div) / minutes_div,
        seconds_raw = ($time % minutes_div) / seconds_div,
        days        = days_raw > 0 ? Math.floor(days_raw) : 0,
        hours       = hours_raw > 0 ? Math.floor(hours_raw) : 0,
        minutes     = minutes_raw > 0 ? Math.floor(minutes_raw) : 0,
        seconds     = seconds_raw > 0 ? Math.floor(seconds_raw) : 0;
    if (days != 0) {
        $html += days + 'd ';
    }
    if (days > 0 || hours > 0) {
        $html += (hours < 10 ? `0${hours}` : hours) + 'h ';
    }
    if (days > 0 || hours > 0 || minutes > 0) {
        $html += (minutes < 10 ? `0${minutes}` : minutes) + 'm ';
    }
    $html += (seconds < 10 ? `0${seconds}` : seconds) + 's';
    return $html;
};
const getFullDate = (separator = '-') => {
    const d = new Date(), 
        year = d.getFullYear(), 
        month = d.getMonth() + 1, 
        day = d.getDate(), 
        hours = d.getHours(), 
        minutes = d.getMinutes(), 
        seconds = d.getSeconds();
    return `${year}${separator}${month < 10 ? '0' : ''}${month}${separator}${day < 10 ? '0' : ''}${day} ${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};;

const number_format = (number, decimals, dec_point = '.', thousands_sep = ',') => {
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    let n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            let k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
};;
const urlB64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
};
const sprintf = (format) => {
    const args = Array.prototype.slice.call(arguments, 1);
    let i = 0;
    return format.replace(/%s/g, function() {
        return args[i++];
    });
};
const isString = (variable) => typeof variable === "string" || variable instanceof String;
const isJsonString = (variable) => {
    try{
        JSON.parse(variable);
    }catch($e){
        return false;
    }
    return true;
};

const boolText = (val) => val === 'true' || val === '1' || val === 1 || val === true || val === 'on';;

/**
 * Adds given html before the element
 * @param string selector 
 * @param string html 
 * @returns void
 */
const prependElement = (selector, html) => document.querySelector(selector).insertAdjacentHTML('beforebegin',html);
/**
 * Adds given html at the beginning of the element
 * @param string selector 
 * @param string html 
 * @returns void
 */
const prepend = (selector, html) => document.querySelector(selector).insertAdjacentHTML('afterbegin',html);
/**
 * Adds given html at the end of the element
 * @param string selector 
 * @param string html 
 * @returns void
 */
const append = (selector, html) => document.querySelector(selector).insertAdjacentHTML('beforeend',html);

/**
 * Adds given html after the element
 * @param string selector 
 * @param string html 
 * @returns void
 */
const appendElement = (selector, html) => document.querySelector(selector).insertAdjacentHTML('afterend',html);
;
const __eventListenerAdd = (element, type, handle) => {
    element.addEventListener(type,handle);
};
const __eventListenerRemove = (element, type, handle) => {
    element.removeEventListener(type,handle);
};
const __eventListener = (querySelector, type, handle) => {
    let elements = isObject(querySelector) ? querySelector : document.querySelectorAll(querySelector);
    if(elements.length == 0){
        return;
    }
    for( let [key, element] of Object.entries(elements)){
        __report(`event listener added: ${getQuerySelector(element)}`,'set','event-listener')
        __eventListenerRemove(element,type,handle);
        __eventListenerAdd(element,type,handle);
    }
    
};
const eventToElement = (event) => {
    return event.srcElement; 
};
const eventToData = (event) => {
    const element = eventToElement(event);
    return element.dataset; 
};;
const _NOTIFICATIONS_HTML_ID      = 'notifications';
const _NOTIFICATION_TIMEOUT       = 5000;
const _NOTIFICATIONS_TYPE_SUCCESS = 'success';
const _NOTIFICATIONS_TYPE_FAILURE = 'danger';
let notificationCount = 0;
const __notify = (message, type = _NOTIFICATIONS_TYPE_SUCCESS) => {
    let holder = document.getElementById(_NOTIFICATIONS_HTML_ID);
    if(isNull(holder)){
        append('body',`<div id='${_NOTIFICATIONS_HTML_ID}' class="fixed-bottom w-100"></div>`);
        holder = document.getElementById(_NOTIFICATIONS_HTML_ID);
    }
    notificationCount++;
    const notificationId = `notification-${notificationCount}`;
    append(`#${_NOTIFICATIONS_HTML_ID}`,`<div id='${notificationId}' class="notification text-center rounded m-3 text-light p-2 fs-5 bg-${type}">${message}</div>`);
    const notification = document.getElementById(notificationId);
    if(empty(window.timeouts)){
        window.timeouts = {};
    }
    window.timeouts[`notification-${notificationId}`] = setTimeout(function() {
        notification.remove(); 
        clearTimeout(window.timeouts[`notification-${notificationId}`]);
    },_NOTIFICATION_TIMEOUT);
    
    __eventListener(`#${notificationId}`,'click',() => {
        notification.remove();
        clearTimeout(window.timeouts[`notification-${notificationId}`]);
    })
};;
const __report = (message, label, category = 'general' ) => {
    /**
     * @todo add events for google analytics/facebook/etc
     */
    // console.table({
    //     category,
    //     label,
    //     message,
    //     browser: getBrowser(),
    //     timestamp: getFullDate() 
    // });
};;
/**
 * Code from W3
 * @see https://www.w3schools.com/js/js_cookies.asp
 */
const __cookieSet = (name, value, expire = 365) => {
    let d = new Date();
    d.setTime(d.getTime() + expire * 24 * 3600 * 1000);
    document.cookie = name + "=" + value + ";expires=" + d.toUTCString() + ";path=/";
    return __cookieGet(name);
};
const __cookieGet = (name) => {
    name = name + "="
     let decodedCookie = decodeURIComponent(document.cookie),
        ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
};
const __cookie = (name, value = null, expire = 365) => {
    if(value !== null){
        return __cookieSet(name,value, expire);
    }
    return __cookieGet(name);
};
;
const __localStorageSet = (key, value) => {
    if(value === null){
        return true;
    }
    localStorage.setItem(key, value);
    return __localStorageGet(key);
};

const __localStorageGet = (key) => {
    return localStorage.getItem(key);
};

const __localStorageRemove = (key) => {
    localStorage.removeItem(key);
    return __localStorageGet(key) === null;
};

const __localStorageClear = () => {
    localStorage.clear();
}

const __localStorage = (key, value = null, remove = false) => {
    if(remove){
        return __localStorageRemove(key);
    }
    if(value !== null){
        return __localStorageSet(key, value);
    }
    return __localStorageGet(key);
}
;
const __sessionStorageSet = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
    return __sessionStorageGet(key);
};

const __sessionStorageGet = (key) => {
    return JSON.parse(sessionStorage.getItem(key));
};

const __sessionStorageRemove = (key) => {
    sessionStorage.removeItem(key);
    return __sessionStorageGet(key) === null;
};

const __sessionStorageClear = () => {
    sessionStorage.clear();
}

const __sessionStorage = (key, value = null, remove = false) => {
    if(remove){
        return __sessionStorageRemove(key);
    }
    if(value !== null){
        return __sessionStorageSet(key, value);
    }
    return __sessionStorageGet(key);
}
;
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
};;
const _CURRENCY_ARS            = 'ARS';
const _CURRENCY_USD            = 'USD';
const _CURRENCY_COOKIE_INDEX   = 'cookie';
const _CURRENCY_SELECT_CLASS   = '.currency-select';
const _CURRENCY_CONVERT_CLASS  = '.currency-convert';
const _CURRENCY_LIST           = {
    'USD' : 'USD',
    'ARS' : 'ARS',
};

const __currenciesGetARSUSD = async () => {
    const session_ttl = 60 * 60 * 1000, // one hour to update
        currentDate   = new Date(),
        currentTime   = currentDate.getTime(),
        minTimeUpdate = currentTime - session_ttl;
    let session         = __sessionStorage(__currenciesGetARSUSD.name),
        lastUpdateDate = new Date(),
        refresh = isNull(session);
    if(!refresh){
        lastUpdateDate.setTime(session.updated_at); // as if it were in a DB that's why snake case
        refresh = minTimeUpdate > lastUpdateDate.getTime();
    }
    if(refresh){
        const request  = await fetch("https://api.bluelytics.com.ar/v2/latest");
        const response = request.json().then(result => {
            __sessionStorage(__currenciesGetARSUSD.name,{
                value: result['blue']['value_sell'],
                updated_at: currentTime
            });
        });
    }
    while(isNull(__sessionStorage(__currenciesGetARSUSD.name))){
        await sleep(1);
    }
    return __sessionStorage(__currenciesGetARSUSD.name);
}
const __currenciesGet = () => {
    __currenciesGetARSUSD();
    return {
        'ARS' : __sessionStorage(__currenciesGetARSUSD.name).value,
        'USD' : 1
    };
};
const __currenciesGetValue = (currency) => {
    const options = {
        to    : currency,
        from  : _CURRENCY_USD,
    };
    console.log(options);
    fx.rates = __currenciesGet();
    return fx.convert(1, options);
};
const __currenciesSelect = (event) => {
    const element  =  eventToElement(event),
        currencies = __currenciesGet(),
        currency   =  element.value.toString().toUpperCase();
    if(empty(currencies[currency])){
        __notify("Moneda inválida",_NOTIFICATIONS_TYPE_FAILURE);
        return;
    }
    __cookie(_CURRENCY_COOKIE_INDEX,currency);
    __currenciesConvert();
};
const __currenciesEventListeners = () => {
    __eventListener(_CURRENCY_SELECT_CLASS,'change',__currenciesSelect);
};
const __currenciesConvert = () => {
    let currency     = __cookie(_CURRENCY_COOKIE_INDEX);
    if(typeof currency == typeof undefined){
        __cookie(_CURRENCY_COOKIE_INDEX, _CURRENCY_USD);
        currency     = __cookie(_CURRENCY_COOKIE_INDEX);
    }
    for(let [index, element] of Object.entries(document.querySelectorAll(_CURRENCY_CONVERT_CLASS))){
        element.innerHTML = `${ element.dataset.price * __currenciesGetValue(currency)} ${currency}`;
    }
};
const currenciesInit = () => {
    __currenciesConvert();
};
;
/*jshint esversion: 6 */
window.onload = (event) => {
    cartInit(); 
    currenciesInit(); 
}; 