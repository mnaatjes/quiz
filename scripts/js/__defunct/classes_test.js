//-------------------------------------------------------------------------------------------------------
// Quiz: Function - test
//-------------------------------------------------------------------------------------------------------
/*------------------------------------------------------*/
/**
 * @name QuizApp
 * @type {class QuizApp {
    constructor(null) {
        @property {string} this.page
    }
 }}
 */
/*------------------------------------------------------*/
class QuizApp {
    constructor(){
        this.page       = window.location.pathname.split('/').pop();
        this.nav        = new Nav(this.page);
        this.params     = this.getURLString(this.page);
        this.username   = this.params.username;
        this.category   = this.params.category;
        this.quiz       = this.createQuiz();
    }
    /*------------------------------------------------------*/
    /**
     * @name createQuiz
     * @type {Function}
     */
    /*------------------------------------------------------*/
    createQuiz(){
        if(this.page == 'quiz.html'){return new Quiz(this.category);}
    }
    /*------------------------------------------------------*/
    /**
     * @name URLString
     * @type {Function}
     */
    /*------------------------------------------------------*/
    getURLString(page){
        //return {username: 'gemini', category: 'science'};
        const query_string  = window.location.search;
        const url_params    = new URLSearchParams(query_string);

        if (page != 'quiz.html'){return {username: url_params.get('username')};}
        else {return {username: url_params.get('username'), category: url_params.get('category')};}
    }
}

// TODO: Define all buttons on page

// TODO: Create quiz
// TODO: Control quiz
/*------------------------------------------------------*/
/**
 * @name Dot
 * @type {ObjectConstructor}
 */
/*------------------------------------------------------*/
function Dot(){
    /*------------------------------------------------------*/
    /**
     * @name createDot
     * @type {Function}
     */
    /*------------------------------------------------------*/
    this.createDot = function(index){
        let dot_container   = document.getElementById('dot-container');
        let dot             = document.createElement('div');
        dot.id              = `dot-${index}`;
        dot.className       = 'dot';
        dot.innerHTML       = index + 1;
        // set data attribute
        if (index == 0) {dot.setAttribute('data-active', true)}
        else {dot.setAttribute('data-active', false)}
        // append to container
        dot_container.appendChild(dot);
    };
}
/*------------------------------------------------------*/
/**
 * @name Slide
 * @type {ObjectConstructor}
 */
/*------------------------------------------------------*/
function Slide(carousel){

    // Constructor Properties
    this.parent     = carousel;
    /*------------------------------------------------------*/
    /**
     * @name init
     * @type {Function}
     */
    /*------------------------------------------------------*/
    this.init   = function(slide_index){
        this.index      = slide_index;
        this.id         = `question-${slide_index}`;
        this.node       = this.parent.querySelector(`[id="${this.id}"]`);
        this.points     = this.node.getAttribute('data-points');
        this.answers    = this.getAnswers(slide_index);
        this.counter    = document.getElementById(`counter-${slide_index}`);
        this.timer      = document.getElementById(`circle-${slide_index}`);
        this.play_state = false;
        this.interval;
        // listen to answers
        this.startTimer(0);
    };
    /*------------------------------------------------------*/
    /**
     * @name createSlide
     * @type {Function}
     */
    /*------------------------------------------------------*/
    this.createSlide = function(quiz_item, index, category){
        // slide creation properties
        let slide           = document.createElement('div');
        slide.id            = `question-${index}`;
        slide.className     = 'slide';
        // create dots
        let dot = new Dot();
        dot.createDot(index);
        // create question
        this.createQuestions(quiz_item, index, slide, category);
        // create answers
        this.createAnswers(quiz_item, index, slide);
        // implement slide
        slide.setAttribute('data-points', quiz_item.points);
        this.parent.appendChild(slide);
    }
    /*------------------------------------------------------*/
    /**
     * @name createQuestions
     * @type {Function}
     */
    /*------------------------------------------------------*/
    this.createQuestions = function(quiz_item, index, slide, category){
        // question container properties
        let question_container          = document.createElement('div');
        question_container.className    = 'slide__question__container';
        // question body
        let question_body               = document.createElement('div');
        question_body.className         = 'question__body';
        question_body.innerHTML         = quiz_item.question;
        // question icon
        let question_icon               = document.createElement('div');
        question_icon.className         = 'question__icon';
        question_icon.innerHTML         = this.getQuizIcon(category);
        // question timer
        let question_timer               = document.createElement('div');
        let question_timer_counter       = document.createElement('div');
        question_timer.id                = `timer-${index}`;
        question_timer.className         = 'question__timer';
        question_timer_counter.id        = `counter-${index}`;
        question_timer_counter.className = 'question__timer__counter';
        question_timer_counter.innerHTML = 15;
        // timer svg elements
        let svg     = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '66');
        svg.setAttribute('height', '66');
        let circle  = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.id   = `circle-${index}`;
        circle.setAttribute('r', '33');
        circle.setAttribute('cx', '38');
        circle.setAttribute('cy', '38');
        svg.appendChild(circle);
        question_timer.appendChild(svg);

        // append question timer elements to timer
        question_timer.appendChild(question_timer_counter);

        // append question elements to question container
        question_container.appendChild(question_body);
        question_container.appendChild(question_icon);
        question_container.appendChild(question_timer);

        // append question container to slide
        slide.appendChild(question_container);
    };
    /*------------------------------------------------------*/
    /**
     * @name getQuizIcon
     * @type {Function}
     */
    /*------------------------------------------------------*/
    this.getQuizIcon = function(category){
        if(category == 'geography'){return '<i class="fa-solid fa-globe"></i>';}
        else if (category == 'science'){return '<i class="fa-solid fa-atom"></i>';}
    };
    /*------------------------------------------------------*/
    /**
     * @name createAnswers
     * @type {Function}
     */
    /*------------------------------------------------------*/
    this.createAnswers = function(quiz_item, index, slide){
        // answer container property
        let answer_container            = document.createElement('div');
        answer_container.id             = `answers-${index}`;
        answer_container.className      = 'slide__answer__container';
        answer_container.setAttribute('data-selected', 'false');
        // loop answers
        for(let i = 0; i < quiz_item.answers.length; i++){
            let answer      = quiz_item.answers[i];
            let radio_name  = `q-${index}__a-${i}`;
            // answer radio container
            let radio_container             = document.createElement('div');
            radio_container.id              = radio_name;
            radio_container.className       = 'radio__container';
            radio_container.setAttribute('data-result', "none");
            // radio button
            let input_radio                 = document.createElement('input');
            input_radio.setAttribute('type', 'radio');
            input_radio.setAttribute('value', answer.result);
            input_radio.setAttribute('name', radio_name);
            let radio_span                  = document.createElement('span');
            let radio_label                 = document.createElement('label');
            radio_label.setAttribute('for', radio_name);
            radio_label.innerHTML           = answer.content;
            // append radio elements to container
            radio_container.appendChild(input_radio);
            radio_container.appendChild(radio_span);
            radio_container.appendChild(radio_label);
            // append answer to answer container
            answer_container.appendChild(radio_container);
        }
        // append answers to carousel slide
        slide.appendChild(answer_container);
    };
    /*------------------------------------------------------*/
    /**
     * @name getAnswers
     * @type {Function}
     */
    /*------------------------------------------------------*/
    this.getAnswers = function(slide_index){
        let answer_nodes    = this.node.querySelector(`[id=answers-${slide_index}]`);
        let answers_arr     = [];
        for(let i = 0; i < answer_nodes.children.length; i++){
            let answer = new Button(`q-${this.index}__a-${i}`);
            answers_arr.push(answer);
        }
        return answers_arr;
    };
    /*------------------------------------------------------*/
    /**
     * @name stopTimer
     * @type {Function}
     */
    /*------------------------------------------------------*/
    this.stopTimer = function(){
        // stop clock
        clearInterval(this.interval);
        // stop animation
        this.timer.classList.add('paused');

    };
    /*------------------------------------------------------*/
    /**
     * @name startTimer
     * @type {Function}
     */
    /*------------------------------------------------------*/
    this.startTimer = function(current_index){
        // timer properties
        let display_time    = 14;
        this.play_state     = true;
        this.timer.classList.add('ani--countdown');
        // start interval
        this.interval = setInterval(() => {
            // determing state
            if(display_time > -1 && this.play_state == true){
                this.counter.innerHTML = display_time;
                display_time--;
            } else if (display_time == -1 || this.play_state == false){
                this.stopTimer();
            }
        }, 1000);
    };
}
/*------------------------------------------------------*/
/**
 * @name Quiz
 * @type {ObjectConstructor}
 */
/*------------------------------------------------------*/
function Quiz(category){
    this.storage_quiz   = category;
    this.carousel       = document.getElementById('question-carousel');
    this.index          = this.carousel.getAttribute('data-index');
    this.quiz_type      = category;
    this.score          = 0;
    this.play_state     = false;
    /*------------------------------------------------------*/
    /**
     * @name init
     * @type {Function}
     */
    /*------------------------------------------------------*/
    this.init = function(){
        // load
        this.loadQuiz(this.quiz_type);
        // build
        this.buildQuiz();
        // quiz properties
        //this.slides     = this.carousel.children;
        //this.index      = this.carousel.getAttribute('data-index');
        this.btn_skip   = new Button('btn_skip');
        this.btn_next   = new Button('btn_next');
        // slide attributes
        this.slides = this.getSlides();
        
    }
    /*------------------------------------------------------*/
    /**
     * @name loadQuiz
     * @type {Function}
     */
    /*------------------------------------------------------*/
    this.loadQuiz = function(category){
        fetchJSON('scripts/JSON/quiz.json', function(xhttp){
            let temp_arr        = JSON.parse(xhttp.responseText).quizzes;
            let temp_quiz       = {};
            // capture quiz information
            temp_arr.forEach(quiz_obj => {
                if(quiz_obj.quiz == category){
                    temp_quiz = quiz_obj.questions;
                }
            });
            // store
            localStorage.setItem(category, JSON.stringify(temp_quiz));
        });
    };
    /*------------------------------------------------------*/
    /**
     * @name buildQuiz
     * @type {Function}
     */
    /*------------------------------------------------------*/
    this.buildQuiz = function(){
        let temp_quiz = JSON.parse(localStorage.getItem(this.storage_quiz));
        // build quiz
        for(let i = 0; i < temp_quiz.length; i++){
            let index       = i;
            let quiz_item   = temp_quiz[index];
            let slide       = new Slide(this.carousel);
            //console.log(quiz_item);
            slide.createSlide(quiz_item, index, this.quiz_type);
        }
    };
    /*------------------------------------------------------*/
    /**
     * @name getSlides
     * @type {Function}
     */
    /*------------------------------------------------------*/
    this.getSlides = function(){
        let slide_nodes = document.getElementsByClassName('slide');
        let slides_arr = [];
        for(let i = 0; i < slide_nodes.length; i++){
            let slide_index = i;
            let slide       = new Slide(this.carousel);
            slide.init(slide_index);
            slides_arr.push(slide);
        }
        return slides_arr;
    };
    /*------------------------------------------------------*/
    /**
     * @name advanceSlide
     * @type {Function}
     */
    /*------------------------------------------------------*/
    this.advanceSlide = function(index){
        console.log(index);
    };
    // initialize quiz
    this.init();
    //console.log(this.slides[1].answers);
}
const app = new QuizApp();




//console.log(test.children);
