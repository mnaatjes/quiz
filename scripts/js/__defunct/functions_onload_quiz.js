//-------------------------------------------------------------------------------------------------------
// Quiz: Function - Quiz - onLoad
//-------------------------------------------------------------------------------------------------------
// URL properties
//const query_string  = window.location.search;
//const url_params    = new URLSearchParams(query_string);
const quiz_type     = url_params.get('category');
// form properties
const form = document.getElementById('form_quiz');
// slide properties
const carousel          = document.getElementById('question-carousel');
const dots_container    = document.getElementById('dot-container');
//const username      = url_params.get('username');
// local storage properties
//const storage_user  = username;
//const storage_game  = quiz_type;
// load questions from json file and load into localstorage
//TODO: skip local storage and load game onto page
fetchJSON('scripts/JSON/quiz.json', function(xhttp){
    // access json file for all quizzes
    let temp_obj        = JSON.parse(xhttp.responseText);
    let temp_arr        = temp_obj.quizzes;
    let temp_obj_quiz   = {};
    // loop temp array
    temp_arr.forEach(quiz_obj => {
        // get quiz from type
        if (quiz_obj.quiz == quiz_type){
            temp_obj_quiz = quiz_obj.questions;
        }
    });
    // loop quiz
    for (let i = 0; i < temp_obj_quiz.length; i++){
        let quiz_item       = temp_obj_quiz[i];
        let quiz_item_index = i;
        // create slide
        // slide element properties
        let slide       = document.createElement('div');
        slide.id        = `question-${quiz_item_index}`;
        slide.className = 'slide';
        slide.setAttribute('data-points', quiz_item.points);
        // create dots
        createDots(quiz_item_index);
        // create question
        createQuestions(quiz_item, slide, temp_obj_quiz);
        // create answers
        createAnswers(quiz_item, slide, temp_obj_quiz);
        // append slide to container
        carousel.appendChild(slide);
    }
    // store in local storage --> user
    let temp_obj_user = {username: url_params.get('u'), score: 0};
    localStorage.setItem(storage_user, JSON.stringify(temp_obj_user));
    // store in local storage --> quiz
    //localStorage.setItem(storage_game, JSON.stringify(temp_obj_quiz));
})
// load local storage
//const quiz = JSON.parse(localStorage.getItem(storage_game));
const user = JSON.parse(localStorage.getItem(storage_user));

// game properties
let score           =  0;
const alert_points  = document.getElementById('alert-points');
const scoreboard    = document.getElementById('scoreboard');
// style and animation properties
const root              = document.querySelector(':root');
const animation_slide   = 'ani--advance-slide';
const animation_timer   = 'ani--countdown';
//const animation_alert   = 'ani--alert--points';
//const animation_hint    = 'ani--alert--hints';
// playback properties
let play_state          = true;
let skip                = false;
// button properties
const btn_next          = new Button('next');
const btn_skip          = new Button('skip');
const btn_submit        = new Button('submit');
//const btn_info          = new Button('info');
//const btn_help          = new Button('help');
// element properties
//const alert_info        = nav.btn_info.node.querySelector('.alert--hint');
//const alert_help        = nav.btn_help.node.querySelector('.alert--hint');
//const tip_info          = nav.btn_info.node.querySelector('.tooltip');
//const tip_help          = nav.btn_help.node.querySelector('.tooltip');

// slide properties
const slides = carousel.querySelectorAll('[class="slide"]');
// start timer animation and countdown
let index = parseInt(carousel.getAttribute('data-index'));
startTimer(index);