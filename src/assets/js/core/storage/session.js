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
