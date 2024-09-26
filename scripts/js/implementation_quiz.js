//-------------------------------------------------------------------------------------------------------
// Quiz: Implementation
//-------------------------------------------------------------------------------------------------------
// url properties
const query_string  = window.location.search;
const url_params    = new URLSearchParams(query_string);
const username      = url_params.get('username');
const category      = url_params.get('category');
// nav properties
const page      = window.location.pathname.split('/').pop();
const btn_home  = new NavButton('btn_home', page);
const btn_info  = new NavButton('btn_info', page);
const btn_help  = new NavButton('btn_help', page);
const btn_user  = new NavButton('btn_user', page);
// set url properties for nav
btn_home.getURLLocations(username);
btn_user.getURLLocations(username);
btn_user.setUser(username);
// storage user property
const storage_user = username;

// page definitions
// capture category on dashboard
if(page == 'dashboard.html'){
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
    const carousel  = document.getElementById('question-carousel');
    const index     = parseInt(carousel.getAttribute('data-index'));
    const quiz      = new Quiz(carousel, index, category, btn_info, btn_help);

    // validate quiz
    function validateQuiz(){
        // get and set form variables
        const form = document.getElementById('form_quiz');
        form.elements['username'].value = username;
        form.elements['score'].value    = quiz.score;
        form.elements['category'].value = category;
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
                console.log(localStorage.getItem(storage_user));
            }
        } else {
            // user doesnt exist in storage: upload
            localStorage.setItem(storage_user, JSON.stringify(user_obj));
        }
    }
}