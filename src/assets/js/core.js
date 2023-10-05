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
};