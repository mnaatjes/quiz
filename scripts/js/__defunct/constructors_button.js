//-------------------------------------------------------------------------------------------------------
// Quiz: Constructors
//-------------------------------------------------------------------------------------------------------
/*------------------------------------------------------*/
/**
 * @name Button
 * @type {ObjectConstructor}
 */
/*------------------------------------------------------*/
function Button(btn_id){
    this.node       = document.getElementById(btn_id);
    this.id         = this.node.id;
    this.tooltip    = new Tooltip(this.node);
    this.alert      = new Alert(this.node);
    this.enabled    = false;
    this.disabled   = false;
    this.hidden     = false;
    this.active     = false;
    /*------------------------------------------------------*/
    /**
     * @name init
     * @type {Function}
     */
    /*------------------------------------------------------*/
    this.init = function(){
        this.onMouseOver();
        this.onClick();
        this.enable();
    };
    /*------------------------------------------------------*/
    /**
     * @name disable
     * @type {Function}
     */
    /*------------------------------------------------------*/
    this.disable    = function(){
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
    this.enable    = function(){
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
    this.hide       = function(){
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
    this.activate   = function(){
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
    this.onMouseOver = function(){
        this.node.addEventListener('mouseover', (e) => {
            if(this.enabled == true){
                //console.log(this.node);
            }
        });
    }
    /*------------------------------------------------------*/
    /**
     * @name onClick
     * @type {Function}
     */
    /*------------------------------------------------------*/
    this.onClick = function(){
        this.node.addEventListener('click', (e) => {
            // answer button
            if(this.node.className == 'radio__container'){
                // set radio button
                let radio = this.node.querySelector('input[type=radio]');
                radio.setAttribute('checked', 'checked');
                // set parent attribute
                this.node.parentElement.setAttribute('data-selected', 'true');
                // if answer == true
                if(radio.value == 'true'){
                    this.node.setAttribute('data-result', true);
                } else {this.node.setAttribute('data-result', false)}
                // clear other answers
                let answers = this.node.parentElement.children;
                for(let i = 0; i < answers.length; i ++){
                    if(answers[i].getAttribute('data-result') == 'none'){
                        answers[i].setAttribute('data-state', 'disabled');
                    }
                }
            }
        });
    }
    /*------------------------------------------------------*/
    /**
     * @name onMouseOut
     * @type {Function}
     */
    /*------------------------------------------------------*/
    this.onMouseOut = function(){}

    // initialize
    this.init();
}