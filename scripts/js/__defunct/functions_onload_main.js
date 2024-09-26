//-------------------------------------------------------------------------------------------------------
// Quiz: Function - onLoad - Main
//-------------------------------------------------------------------------------------------------------
// URL properties
const query_string  = window.location.search;
const url_params    = new URLSearchParams(query_string);
const username      = url_params.get('username');
//const nav           = new Nav();

/*------------------------------------------------------*/
/**
 * @name Nav
 * @type {ObjectConstructor}
 */
/*------------------------------------------------------*/
function Nav(page){
    // page properties
    this.page       =  page
    // nav button properties
    this.btn_home   = new Button('btn_home');
    this.btn_user   = new Button('btn_user');
    this.btn_info   = new Button('btn_info');
    this.btn_help   = new Button('btn_help');
    // array properties
    this.buttons    = [
        this.btn_home,
        this.btn_info,
        this.btn_help,
        this.btn_user
    ];
    // nav element properties
    this.ele_score  = document.getElementById('ele_score');
    /*------------------------------------------------------*/
    /**
     * @name listener
     * @type {Function}
     */
    /*------------------------------------------------------*/
    this.onMouseOver   = function(){
        // loop array for event
        this.buttons.forEach(btn => {
            // add event listener: hover
            btn.node.addEventListener('mouseover', (e) => {
                if(btn.enabled == true) {
                    // buttons with tooltips
                    if (btn.id == this.btn_home.id || btn.id == this.btn_info.id || btn.id == this.btn_help.id){
                        // write tooltip message
                        if(btn.id == this.btn_home.id && this.page == 'landing.html'){
                            // show tooltip
                            btn.tooltip.msg = 'Return to Dashboard';
                            btn.tooltip.showHint();
                        } else if (this.page == 'quiz.html'){
                            // home button
                            if(btn.id == this.btn_home.id){
                                btn.tooltip.msg = 'Warning: You will lose progress if you click home button.';
                            } else if (btn.id == this.btn_help.id){
                                btn.tooltip.msg = 'Click the lighting button to remove one wrong answer.';
                            }
                            btn.tooltip.showHint();
                        }
                    }
                }
            });
        });
    };
    /*------------------------------------------------------*/
    /**
     * @name onClick
     * @type {Function}
     */
    /*------------------------------------------------------*/
    this.onClick = function(){
        // loop buttons array
        this.buttons.forEach(btn => {
            // add event listener: click
            btn.node.addEventListener('click', (e) => {
                // if button enabled --> allow interaction
                if(btn.enabled == true) {
                    // capture href and redirect
                    if(btn.node.hasAttribute('href')){
                        // link properties; append username
                        let href = btn.node.getAttribute('href') + `?username=${username}`;
                        // execute link
                        window.location.href = href;
                    // hint buttons, alerts, and tooltips
                    } else if (btn.id == btn_info.id || btn.id == btn_help.id){
                        // close tooltip
                        btn.tooltip.hideHint();
                        btn.alert.pauseAlert();
                        btn.disable();
                    }
                }
            });
        });
    };
    /*------------------------------------------------------*/
    /**
     * @name onMouseOut
     * @type {Function}
     */
    /*------------------------------------------------------*/
    this.onMouseOut = function(){
        // loop buttons array
        this.buttons.forEach(btn => {
            // add event listener: click
            btn.node.addEventListener('mouseout', (e) => {
                // if button enabled --> allow interaction
                if(btn.enabled == true) {
                    //btn.tooltip.hideHint();
                    // buttons with tooltips
                    if (btn.id == this.btn_home.id || btn.id == this.btn_info.id || btn.id == this.btn_help.id){
                        // show tooltip
                        btn.tooltip.hideHint();
                    }
                }
            });
        });
    };
    /*------------------------------------------------------*/
    /**
     * @name init
     * @type {Function}
     */
    /*------------------------------------------------------*/
    this.init       = function(){
        console.log(this.page);
        // fill user icon with username
        this.btn_user.node.querySelector('span').innerHTML = username;
        // start event listener for buttons
        /*
        this.onMouseOver();
        this.onClick();
        this.onMouseOut();
        */
        // parse page to determine states
        if (this.page == '') {
            // determine button states
            this.btn_home.disable();
            this.btn_info.disable();
            this.btn_help.disable();
            this.btn_user.disable();
            this.ele_score.setAttribute('data-state', 'hidden');
        } else if (this.page == 'dashboard.html'){
            // determine button states
            this.btn_home.activate();
            this.btn_info.disable();
            this.btn_help.disable();
            this.btn_user.enable();
            // enable score area
            this.ele_score.setAttribute('data-state', 'hidden');
            // add user date to user button
            btn_user.querySelector('span').innerHTML = username;
        } else if (this.page == 'quiz.html'){
            // determine button states
            this.btn_home.enable();
            this.btn_info.disable();
            this.btn_help.disable();
            this.btn_user.disable();
            // enable score area
            this.ele_score.setAttribute('data-state', 'enable');
            // update score
        } else if (this.page == 'landing.html'){
            // determine button states
            this.btn_home.enable();
            this.btn_info.disable();
            this.btn_help.disable();
            this.btn_user.enable();
            // enable score area
            this.ele_score.setAttribute('data-state', 'hidden');
        }
    };
    
    // call init function
    this.init();
}