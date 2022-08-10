/**
* @param {string} selector
* @param {HTMLElement} node=document.body
* @returns {HTMLElement}
*/

export function $(selector, node=document.body){
    return node.querySelector(selector)
}

//los 3 puntos son para reutilizar los objetos de otro array
export function $$(selector, node=document.body){
    return [...node.querySelectorAll(selector)]
}