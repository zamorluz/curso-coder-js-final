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
};