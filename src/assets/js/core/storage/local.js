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
