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
