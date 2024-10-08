//-------------------------------------------------------------------------------------------------------
// Quiz: Constructor - NavButton
//-------------------------------------------------------------------------------------------------------
/*------------------------------------------------------*/
/**
 * @name NavButton
 * @type {Class}
 * @memberof QuizApp
 * @description this class build upon the Button class with specialized methods for answer question buttons
 * @extends Button
 */
/*------------------------------------------------------*/
class NavButton extends Button {
    /**
     * 
     * @param {String} btn_id html element id
     * @param {String} page get query
     * @property {Constructor} tooltip
     * @property {Constructor} alert
     * @implements {init} initializing function: collect button states
     */
    constructor(btn_id, page){
        super(btn_id);
        this.page       = page;
        this.tooltip    = new Tooltip(this.node);
        this.alert      = new Alert(this.node);

        this.init();
    }
    /*------------------------------------------------------*/
    /**
     * @name init
     * @type {Method}
     */
    /*------------------------------------------------------*/
    init(){
        this.getButtonStates();
    }
    /*------------------------------------------------------*/
    /**
     * @name getButtonStates
     * @type {Method}
     */
    /*------------------------------------------------------*/
    getButtonStates(){
        // quiz page initial states
        if(this.page == 'quiz.html'){
            switch (this.id){
                // info button
                case 'btn_info':
                    this.disable();
                    break;
                // help button
                case 'btn_help':
                    this.disable();
                    break;
                // user button
                case 'btn_user':
                    this.hide();
                    break;
                // default state
                default:
                    this.enable();
            }
        // dashboard page & landing page
        } else if(this.page == 'dashboard.html' || this.page == 'landing.html' || this.page == 'user.html'){
            switch (this.id){
                // info button
                case 'btn_info':
                    this.disable();
                    break;
                // help button
                case 'btn_help':
                    this.disable();
                    break;
                // default state
                default:
                    this.enable();
            }
        // splash page
        } else if (this.page == ''){this.disable();}
    }
    /*------------------------------------------------------*/
    /**
     * @name getURLLocations
     * @type {Method}
     */
    /*------------------------------------------------------*/
    getURLLocations(username){
        // button types
        switch (this.id){
            // home button
            case 'btn_home':
                if(this.enabled == true){
                    this.node.addEventListener('click', () => {
                        // build href
                        let href = `dashboard.html?username=${username}`;
                        // execute link
                        window.location.href = href;
                    });
                }
                break;
            // user button
            case 'btn_user':
                if(this.enabled == true){
                    this.node.addEventListener('click', () => {
                        // build href
                        let href = `user.html?username=${username}`;
                        // execute link
                        window.location.href = href;
                    });
                }
                break;
            // default state
            default:
                console.log('Error!');
        }
    }
    /*------------------------------------------------------*/
    /**
     * @name setUser
     * @type {Method}
     */
    /*------------------------------------------------------*/
    setUser(username){
        if(this.id == 'btn_user'){
            let span        = this.node.querySelector('span');
            span.innerHTML  = username;
        }
    }
}