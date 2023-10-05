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

const boolText = (val) => val === 'true' || val === '1' || val === 1 || val === true || val === 'on';