
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
