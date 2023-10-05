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
