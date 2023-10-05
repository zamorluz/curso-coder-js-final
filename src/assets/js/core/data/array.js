const isArray = (variable) => Array.isArray(variable);
const isObject = (variable) => typeof variable === 'object';
const inArray = (needle, haystack) => isArray(haystack) ? haystack.includes(needle) : false;
