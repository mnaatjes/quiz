//-------------------------------------------------------------------------------------------------------
// CIS 170: Functions
//-------------------------------------------------------------------------------------------------------

/*------------------------------------------------------*/
/***
 * @name range
 * @param {number} start beginning of range
 * @param {number} end end of range
 */
/*------------------------------------------------------*/
function range(start, end) {
    var result = [];
    
    for (let i = start; i <= end; i++) {
        result.push(i);
    }

    return result;
}
/*------------------------------------------------------*/
/***
 * @name random
 * @param {number} minimum_value beginning of range
 * @param {number} maximum_value end of range
 * @return {number} result
 */
/*------------------------------------------------------*/
function random(minimum_value, maximum_value){
    let result = Math.random() * (maximum_value - minimum_value) + minimum_value;
    return result;
}
/*------------------------------------------------------*/
/***
 * @name strToUpper produces uppercase letter at string index
 * @param {string} string string to manipulate
 * @param {number} index index of string to alter
 * @return {string} result: altered string
 */
/*------------------------------------------------------*/
function strToUpper(string, index) {
    
    let result = string.charAt(index).toUpperCase() + string.slice(index+1);
    
    return result;
}
/*------------------------------------------------------*/
/***
 * @name includeHTML 
 * @param {string} filetype 
 * @example filetype = html --> 'data-include-html' includes 
 * @example markup: <div data-include-<filetype>="template.filetype"></div>
 */
/*------------------------------------------------------*/
function includeHTML(filetype) {
    var all_elements;
    let attibute = 'data-include-' + filetype;
    all_elements = document.getElementsByTagName('*');
    // loop all elements
    for (let i=0; i < all_elements.length; i++) {
        let element = all_elements[i];
        let file    = element.getAttribute(attibute);
        if (file) {
            // make ajax request
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {console.log(this.responseText)}
                    if (this.status == 400) {console.log('Page Not Found!')}
                    element.removeAttribute(attibute);
                    includeHTML();    
                }
            }
            xhttp.onload = function(){
                element.innerHTML = this.responseText;
            }
            // open file
            xhttp.open('GET', file, true);
            xhttp.send();
        }
    }
}
/*------------------------------------------------------*/
/***
 * @name ajaxJSON
 * @example ajaxJSON('json/fleet.json', (xhttp) => {
 *      sessionStorage.setItem('fleet', xhttp.responseText);
 *  });
 */
/*------------------------------------------------------*/
function ajaxJSON(filepath, callback) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                xhttp.onload = callback(this);
            }
            if (this.status == 400) {console.log('Page Not Found!')}
        }
    }
    xhttp.open('GET', filepath);
    xhttp.send();
}
/*------------------------------------------------------*/
/***
 * @name getHTMLElementIndex
 * @param {HTMLElement} parent
 * @param {HTMLElement} child
 * @example 
 */
/*------------------------------------------------------*/
function getHTMLElementIndex(child){
    return Array.from(child.parentNode.children).indexOf(child);
}
/*------------------------------------------------------*/
/**
 * @name getKeysFromArray
 * @param {Array} objects_arr array of objects
 * @return {Array} of keys
 */
/*------------------------------------------------------*/
function getKeysFromArray(objects_arr){
    let result = [];
    for (let i = 0; i < objects_arr.length; i++){
        let key = Object.keys(objects_arr[i])[0];
        result.push(key);
    }
    return result;
}
/*------------------------------------------------------*/
/**
 * @name getValuesFromArray
 * @param {Array} objects_arr array of objects
 * @return {Array} of values
 */
/*------------------------------------------------------*/
function getValuesFromArray(objects_arr){
    let result = [];
    for (let i = 0; i < objects_arr.length; i++){
        let value = Object.values(objects_arr[i])[0];
        result.push(value);
    }
    return result;
}
/*------------------------------------------------------*/
/**
 * @name fetchJSON
 * @type {Async Function}
 * @memberof MyApp
 * @param {String} filepath relative path to file
 * @param {callback} callback
 * @example fetchJSON('path/to/file.json, function(json){console.log(json)})
 * @returns {Object} JSON data
 */
/*------------------------------------------------------*/
async function fetchJSON(filepath, callback){
    try{
        let response = await fetch(filepath);
        // if failure
        if(!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }
        // return JSON
        let json = await response.json();
        // run callback function
        callback(json);
    } catch (error){
        console.error('Ooopsie!');
    }
}
/*------------------------------------------------------*/
/**
 * @name sortArray
 * @type {Function}
 * @description
 * @param {String | Number} property
 */
/*------------------------------------------------------*/
function sortArray(property){
    let sort_order = 1;
    // sort order negative
    if(property[0] === '-'){
        sort_order  = -1;
        property    = property.substring(1);
    }
    // return array
    return function(a, b) {
        let result = (a[property] < b[property] ? -1 : (a[property] > b[property])) ? 1 : 0;
        return result * sort_order;
    }
}