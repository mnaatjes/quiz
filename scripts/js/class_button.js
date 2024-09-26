//-------------------------------------------------------------------------------------------------------
// Quiz: Class - Button
//-------------------------------------------------------------------------------------------------------
/*------------------------------------------------------*/
/**
 * @name Button
 * @type {Class}
 */
/*------------------------------------------------------*/
class Button{
    constructor(btn_id){
        // button properties
        this.node       = document.getElementById(btn_id);
        this.id         = btn_id;
        this.children   = this.node.children;
        // boolean properties
        this.enabled    = false;
        this.disabled   = false;
        this.hidden     = false;
        this.active     = false;
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
    }
    /*------------------------------------------------------*/
    /**
     * @name disable
     * @type {Function}
     */
    /*------------------------------------------------------*/
    disable(){
        // change attribute state
        this.node.setAttribute('data-state', 'disabled');
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
}