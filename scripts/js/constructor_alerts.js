//-------------------------------------------------------------------------------------------------------
// Quiz: Constructors
//-------------------------------------------------------------------------------------------------------
/*------------------------------------------------------*/
/**
 * @name Alert
 * @type {ObjectConstructor}
 */
/*------------------------------------------------------*/
function Alert(btn_node){
    this.hidden     = false;
    this.active     = false;
    /*------------------------------------------------------*/
    /**
     * @name init
     * @type {Function}
     */
    /*------------------------------------------------------*/
    this.init = function(btn_node){
        if(btn_node.querySelector('[class^=alert--]') != null){
            this.node = btn_node.querySelector('[class^=alert--]');
        }
    };
    /*------------------------------------------------------*/
    /**
     * @name disable
     * @type {Function}
     */
    /*------------------------------------------------------*/
    this.hideAlert    = function(){
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
    this.showAlert    = function(){
        this.node.style.display = 'flex';
        // reset this.enabled and this.hidden
        this.hidden     = false;
        this.active     = true;
    };
    /*------------------------------------------------------*/
    /**
     * @name animateAlert
     * @type {Function}
     */
    /*------------------------------------------------------*/
    this.animateAlert = function(msg=""){
        if(this.node != null){
            if(this.node.className == 'alert--hint'){
                this.node.classList.add('ani--alert--hints');
            } else if (this.node.className == 'alert--points'){
                this.showAlert();
                this.node.innerHTML = msg;
                this.node.classList.add('ani--alert--points');
            }
        }
    };
    /*------------------------------------------------------*/
    /**
     * @name pauseAlert
     * @type {Function}
     */
    /*------------------------------------------------------*/
    this.removeAlertAnimation = function(){
        if(this.node != null){
            if(this.node.classList.contains('alert--hint')){
                this.node.classList.remove('ani--alert--hints');
            } else if (this.node.classList.contains('alert--points')){
                this.node.classList.remove('ani--alert--points');
            }
        }
    };
    
    // initialization
    this.init(btn_node);
}