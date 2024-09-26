//-------------------------------------------------------------------------------------------------------
// Quiz: Implementation
//-------------------------------------------------------------------------------------------------------
/**
 * @namespace QuizApp
 * @description Implementation js page for entire application
 */
// url properties
let query_string    = window.location.search;
let url_params      = new URLSearchParams(query_string);
let username        = url_params.get('username');
let category        = url_params.get('category');
// nav properties
let page      = window.location.pathname.split('/').pop();
let btn_home  = new NavButton('btn_home', page);
let btn_info  = new NavButton('btn_info', page);
let btn_help  = new NavButton('btn_help', page);
let btn_user  = new NavButton('btn_user', page);
// set url properties for nav
btn_home.getURLLocations(username);
btn_user.getURLLocations(username);
btn_user.setUser(username);
// storage user property
const storage_user = username;
// page definitions
console.log(page);
// capture category on dashboard
if (page == ''){
    // clear local storage
    localStorage.clear();
    let input_user    = document.getElementById('username');
    let btn_submit    = new Button('splash_submit');
    let error_msg     = document.getElementById('error-username');
    btn_submit.disable();
    /**
     * @type {EventListener}
     * @listens 
     * @memberof QuizApp
     * @description
     * @param {WindowEventHandlers}
     * @param {FunctionStringCallback}
     */
    input_user.addEventListener('input', function(e){
        let input_values = e.target.value;
        // show / hide error message
        if (input_values.length > 0 && input_values.length <= 3){
            error_msg.style.display = 'block';
        } else {error_msg.style.display = 'none';}
        // enable / disable submit
        if (input_values.length > 3){
            // change input field state
            input_user.setAttribute('data-state', 'active');
            // enable submit
            btn_submit.enable();
        } else if (input_values < 3){
            // disable submit
            btn_submit.disable();
            // change input field state
            input_user.setAttribute('data-state', '');
        }
    });
}
// build dashboard
else if(page == 'dashboard.html'){
    // Print username
    let user_msg = document.getElementById('user_msg');
    user_msg.innerHTML = username;
    /**
     * @name categorySelect
     * @type {EventListener}
     * @memberof QuizApp
     * @description Collects href attribute and appends username
     * @param {HTMLElement} btn button
     */
    function categorySelect(btn){
        // build href
        let href = btn.getAttribute('href') + `&username=${username}`;
        // execute link
        window.location.href = href;
    }
}
// build quiz if on page
else if(page == 'quiz.html'){
    // quiz properties
    let carousel    = document.getElementById('question-carousel');
    let index       = parseInt(carousel.getAttribute('data-index'));
    let quiz        = new Quiz(carousel, index, category, btn_info, btn_help);
    console.log(quiz.storage_quiz == category);
    /**
     * @name validateQuiz
     * @type {FormDataEvent}
     * @memberof QuizApp
     * @description Collects and validates form data; composes it into object and saves it
     *  to localStorage; clears local storage of quiz data
     * TODO: Ensure all data in quizdata.json is valid and filled in
     */
    function validateQuiz(){
        // get and set form variables
        let form = document.getElementById('form_quiz');
        // set hidden inputs
        form.elements['username'].value     = username;
        form.elements['score'].value        = quiz.score;
        form.elements['max_score'].value    = quiz.max_score;
        form.elements['category'].value     = category;
        // create user object to store data
        let date = new Date();
        let user_obj = {
            username: username,
            quizzes: [
                {
                    category: category,
                    score: quiz.score,
                    timestamp: date.toLocaleString()
                }
            ]
        }
        // if user exists in local storage:
        let storage_obj = localStorage.getItem(storage_user);
        if(storage_obj){
            // store user info into object
            storage_obj = JSON.parse(storage_obj);
            // check if username matches
            if(storage_obj.username == username){
                // clear existing local storage entry
                localStorage.removeItem(storage_user);
                // push most recent quiz to storage array
                storage_obj.quizzes.push(user_obj.quizzes[0]);
                // store object in local storage
                localStorage.setItem(storage_user, JSON.stringify(storage_obj));
                //console.log(localStorage.getItem(storage_user));
            }
        } else {
            // user doesnt exist in storage: upload
            localStorage.setItem(storage_user, JSON.stringify(user_obj));
        }
    }
} 
// landing page
else if(page == 'landing.html'){
    // TODO: Quiz data still in local storage!!!
    console.log(localStorage);
    // TODO: Landing.html bottom buttons need to be connected
    /**
     * @name initLandingPage
     * @type {Function}
     * @memberof QuizApp
     * @description
     */
    function initLandingPage(){
        // url params
        let score       = url_params.get('score');
        let max_score   = url_params.get('max_score');
        // scoring
        let percent     = parseInt((score / max_score) * 100);
        let circle      = document.querySelector('circle');
        /**
         * @name getReply
         * @type {Function}
         * @memberof QuizApp
         * @description
         * @param {Number} score_percentage
         * @return {String} replay
         */
        function getReply(percent){
            if(percent > 90){ return 'Near Perfect Score'}
            else if (percent > 80){ return 'Excellent!'}
            else if(percent > 70){ return 'Great Job!'}
            else if(percent < 70){ return 'Better Luck Next Time';}
        }
        // print reply
        document.getElementById('feedback').innerHTML = getReply(percent);
        // print username

        // print score
        document.getElementById('score_percent').innerHTML = `${percent}%`;
        // animate chart
        let offset_number = (percent / 100) * 408.41;
        circle.style.setProperty('--offset-target', offset_number.toFixed(2));
    }
    // execute init
    initLandingPage();
    // buttons
    let replay  = new Button('btn_replay');
    let back    = new Button('btn_back');
}

// debugging
// TODO: Local storage chain of custody
//localStorage.clear();
console.log(localStorage);