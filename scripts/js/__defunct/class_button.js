//-------------------------------------------------------------------------------------------------------
// Quiz: Class - Button
//-------------------------------------------------------------------------------------------------------
/*------------------------------------------------------*/
/**
 * @name Button
 * @type {Class}
 */
/*------------------------------------------------------*/
class Button {
    constructor(btn_id){
        // button properties
        this.node       = document.getElementById(btn_id);
        this.id         = this.node.id;
        this.children   = this.node.children;
        this.test       = function(){};
        // boolean properties
        this.enabled    = false;
        this.disabled   = false;
        this.hidden     = false;
        this.active     = false;
        // event function properties
        this.hovered    = (event) => {this.onMouseOver(event);};
        this.clicked    = (event) => {this.onClick(event);};
        this.exited     = (event) => {this.onMouseOut(event);};
        // initialize buttons
        this.init();
    }
    /*------------------------------------------------------*/
    /**
     * @name init
     * @type {Method}
     */
    /*------------------------------------------------------*/
    init(){
        this.enable();
    };
    /*------------------------------------------------------*/
    /**
     * @name removeEvents
     * @type {Function}
     */
    /*------------------------------------------------------*/
    removeEvents(){
        this.node.removeEventListener('mouseover', this.hovered);
        this.node.removeEventListener('click', this.clicked);
        this.node.removeEventListener('mouseout', this.exited);
    };
    /*------------------------------------------------------*/
    /**
     * @name disable
     * @type {Function}
     */
    /*------------------------------------------------------*/
    disable(){
        // change attribute state
        this.node.setAttribute('data-state', 'disabled');
        // remove events
        this.removeEvents();
        // reset this.enabled and this.hidden
        this.enabled    = false;
        this.disabled   = true;
        this.hidden     = false;
        this.active     = false;
    };
    /*------------------------------------------------------*/
    /**
     * @name enable
     * @type {Function}
     */
    /*------------------------------------------------------*/
    enable(){
        // change attribute state
        this.node.setAttribute('data-state', 'enabled');
        // add click function
        this.node.addEventListener('mouseover', this.hovered);
        this.node.addEventListener('click', this.clicked);
        this.node.addEventListener('mouseout', this.exited);
        // reset this.enabled and this.hidden
        this.enabled    = true;
        this.disabled   = false;
        this.hidden     = false;
        this.active     = false;
    };
    /*------------------------------------------------------*/
    /**
     * @name hide
     * @type {Function}
     */
    /*------------------------------------------------------*/
    hide(){
        // change attribute state
        this.node.setAttribute('data-state', 'hidden');
        // remove events
        this.removeEvents();
        // reset this.enabled and this.hidden
        this.enabled    = false;
        this.disabled   = false;
        this.hidden     = true;
        this.active     = false;
    };
    /*------------------------------------------------------*/
    /**
     * @name activate
     * @type {Function}
     */
    /*------------------------------------------------------*/
    activate(){
        // change attribute state
        this.node.setAttribute('data-state', 'active');
        // reset this.enabled and this.hidden
        this.enabled    = false;
        this.disabled   = false;
        this.hidden     = false;
        this.active     = true;
    };
    /*------------------------------------------------------*/
    /**
     * @name onMouseOver
     * @type {Function}
     */
    /*------------------------------------------------------*/
    onMouseOver(){}
    /*------------------------------------------------------*/
    /**
     * @name onClick
     * @type {Function}
     */
    /*------------------------------------------------------*/
    onClick(){}
    /*------------------------------------------------------*/
    /**
     * @name onMouseOut
     * @type {Function}
     */
    /*------------------------------------------------------*/
    onMouseOut(){}
}