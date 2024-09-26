//-------------------------------------------------------------------------------------------------------
// Quiz: Constructors - tooltip
//-------------------------------------------------------------------------------------------------------
/*------------------------------------------------------*/
/**
 * @name Tooltip
 * @type {ObjectConstructor}
 */
/*------------------------------------------------------*/
function Tooltip(btn_node){
    this.msg        = '';
    this.hidden     = false;
    this.active     = false;
    /*------------------------------------------------------*/
    /**
     * @name disable
     * @type {Function}
     */
    /*------------------------------------------------------*/
    this.hideHint    = function(){
        this.node.style.display = 'none';
        // reset this.enabled and this.hidden
        this.hidden     = true;
        this.active     = false;
    };
    /*------------------------------------------------------*/
    /**
     * @name enable
     * @type {Function}
     */
    /*------------------------------------------------------*/
    this.showHint    = function(){
        // set element and deploy msg
        this.node.style.display = 'flex';
        this.node.innerHTML     = this.msg;
        // reset this.enabled and this.hidden
        this.hidden     = false;
        this.active     = true;
    };
    /*------------------------------------------------------*/
    /**
     * @name init
     * @type {Function}
     */
    /*------------------------------------------------------*/
    this.init = function(btn_node){
        // check if tooltip exists
        if(btn_node.querySelector('.tooltip') != null){
            this.node = btn_node.querySelector('.tooltip');
        }
    };

    this.init(btn_node);
}