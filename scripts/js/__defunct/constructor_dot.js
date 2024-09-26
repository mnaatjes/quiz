//-------------------------------------------------------------------------------------------------------
// CIS 174: Constructor - Dot
//-------------------------------------------------------------------------------------------------------
/*------------------------------------------------------*/
/**
 * @name Dot
 * @type {ObjectConstructor}
 */
/*------------------------------------------------------*/
function Dot(){
    
    /*------------------------------------------------------*/
    /**
     * @name createDot
     * @type {Function}
     */
    /*------------------------------------------------------*/
    this.createDot = function(index){
        let dot_container   = document.getElementById('dot-container');
        let dot             = document.createElement('div');
        dot.id              = `dot-${index}`;
        dot.className       = 'dot';
        dot.innerHTML       = index + 1;
        // set data attribute
        if (index == 0) {dot.setAttribute('data-active', true)}
        else {dot.setAttribute('data-active', false)}
        // append to container
        dot_container.appendChild(dot);
    };
}