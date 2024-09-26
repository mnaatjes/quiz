//-------------------------------------------------------------------------------------------------------
// Quiz: Class - Slide
//-------------------------------------------------------------------------------------------------------
/*------------------------------------------------------*/
/**
 * @type {class Slide {
    constructor(carousel) {
        
    }
 }}
 */
/*------------------------------------------------------*/
class Slide {
    constructor(carousel, slide_index){
        this.parent             = carousel;
        this.index              = slide_index;
        this.id                 = `question-${slide_index}`;
        this.node               = this.parent.querySelector(`[id="${this.id}"]`);
        this.points             = parseInt(this.node.getAttribute('data-points'));
        this.answer_container   = this.node.querySelector(`[id="answers-${slide_index}"]`);
        this.answers            = this.getAnswers();
        this.counter            = document.getElementById(`counter-${slide_index}`);
        this.timer              = document.getElementById(`circle-${slide_index}`);
        this.play_state         = false;
        this.interval;
    }
    /*------------------------------------------------------*/
    /**
     * @name getAnswers
     * @type {method}
     */
    /*------------------------------------------------------*/
    getAnswers(){
        let answers_arr     = [];
        for(let i = 0; i < this.answer_container.children.length; i++){
            let answer = new AnswerButton(`q-${this.index}__a-${i}`);
            answers_arr.push(answer);
        }
        return answers_arr;
    }
    /*------------------------------------------------------*/
    /**
     * @name template
     * @type {method}
     */
    /*------------------------------------------------------*/
}

//-------------------------------------------------------------------------------------------------------
// Quiz: Class - Quiz
//-------------------------------------------------------------------------------------------------------
/*------------------------------------------------------*/
/**
 * @type {class Quiz {
    constructor(carousel) {
        
    }
 }}
 */
/*------------------------------------------------------*/
class Quiz {
    constructor(carousel, index, category, username){
        this.carousel   = carousel;
        this.category   = category;
        this.index      = index;
        this.slides     = [];
        this.dots_container = document.getElementById('dot-container');
        // storage properties
        this.storage_quiz = this.category;
        this.storage_user = username;
        // nav properties
        this.ele_score  = {
            node: document.getElementById('ele_score'),
            alert: new Alert(document.getElementById('ele_score')),
            scoreboard: document.getElementById('scoreboard')
        };
        // game properties
        this.user       = username;
        this.score      = 0;
        // initialize
        this.init();
    }
    /*------------------------------------------------------*/
    /**
     * @name init
     * @type {method}
     */
    /*------------------------------------------------------*/
    init(){
        // load quiz from JSON file
        this.loadQuiz();
        // build quiz from local storage
        this.buildQuiz();
        // gather and define slide objects
        this.slides = this.getSlides();
        // start quiz
        this.startQuiz();
    }
    /*------------------------------------------------------*/
    /**
     * @name createSlide
     * @type {method}
     */
    /*------------------------------------------------------*/
    createSlide(quiz_item, slide_index){
        // slide creation properties
        let slide           = document.createElement('div');
        slide.id            = `question-${slide_index}`;
        slide.className     = 'slide';
        // create dots
        this.createDot(slide_index);
        // create question
        this.createQuestions(quiz_item, slide_index, slide);
        // create answers
        this.createAnswers(quiz_item, slide_index, slide);
        // implement slide
        slide.setAttribute('data-points', quiz_item.points);
        this.carousel.appendChild(slide);
    }
    /*------------------------------------------------------*/
    /**
     * @name createDot
     * @type {method}
     */
    /*------------------------------------------------------*/
    createDot(slide_index){
        let dot_container   = document.getElementById('dot-container');
        let dot             = document.createElement('div');
        dot.id              = `dot-${slide_index}`;
        dot.className       = 'dot';
        dot.innerHTML       = slide_index + 1;
        // set data attribute
        if (slide_index == 0) {dot.setAttribute('data-active', true)}
        else {dot.setAttribute('data-active', false)}
        // append to container
        dot_container.appendChild(dot);
    };
    /*------------------------------------------------------*/
    /**
     * @name createQuestions
     * @type {method}
     */
    /*------------------------------------------------------*/
    createQuestions(quiz_item, slide_index, slide){
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
        question_icon.innerHTML         = this.getQuizIcon(this.category);
        // question timer
        let question_timer               = document.createElement('div');
        let question_timer_counter       = document.createElement('div');
        question_timer.id                = `timer-${slide_index}`;
        question_timer.className         = 'question__timer';
        question_timer_counter.id        = `counter-${slide_index}`;
        question_timer_counter.className = 'question__timer__counter';
        question_timer_counter.innerHTML = 15;
        // timer svg elements
        let svg     = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '66');
        svg.setAttribute('height', '66');
        let circle  = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.id   = `circle-${slide_index}`;
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
    }
    /*------------------------------------------------------*/
    /**
     * @name createAnswers
     * @type {method}
     */
    /*------------------------------------------------------*/
    createAnswers(quiz_item, slide_index, slide){
        // answer container property
        let answer_container            = document.createElement('div');
        answer_container.id             = `answers-${slide_index}`;
        answer_container.className      = 'slide__answer__container';
        // loop answers
        for(let i = 0; i < quiz_item.answers.length; i++){
            let answer      = quiz_item.answers[i];
            let radio_name  = `q-${slide_index}__a-${i}`;
            // answer radio container
            let radio_container             = document.createElement('div');
            radio_container.id              = radio_name;
            radio_container.className       = 'radio__container';
            radio_container.setAttribute('data-state', "enabled");
            radio_container.setAttribute('data-value', answer.result);
            radio_container.setAttribute('data-selected', false);
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
    }
    /*------------------------------------------------------*/
    /**
     * @name getQuizIcon
     * @type {method}
     */
    /*------------------------------------------------------*/
    getQuizIcon(){
        if (this.category == 'geography'){return '<i class="fa-solid fa-globe"></i>';}
        else if (this.category == 'science'){return '<i class="fa-solid fa-atom"></i>';}
        else if (this.category == 'technology'){return '<i class="fa-solid fa-microchip"></i>';}
        else if (this.category == 'history'){return '<i class="fa-solid fa-scroll"></i>';}
    }
    /*------------------------------------------------------*/
    /**
     * @name loadQuiz
     * @type {Function}
     */
    /*------------------------------------------------------*/
    loadQuiz(){
        fetchJSON('scripts/JSON/quiz.json', (xhttp) => {
            let temp_arr        = JSON.parse(xhttp.responseText).quizzes;
            let temp_quiz       = {};
            // capture quiz information
            temp_arr.forEach(quiz_obj => {
                if(quiz_obj.quiz == this.category){
                    temp_quiz = quiz_obj.questions;
                }
            });
            // upload to local storage
            localStorage.setItem(this.storage_quiz, JSON.stringify(temp_quiz));
        });
    };
    /*------------------------------------------------------*/
    /**
     * @name buildQuiz
     * @type {Function}
     */
    /*------------------------------------------------------*/
    buildQuiz(){
        let temp_quiz = JSON.parse(localStorage.getItem(this.storage_quiz));
        // build quiz
        for(let i = 0; i < temp_quiz.length; i++){
            let slide_index = i;
            let quiz_item   = temp_quiz[slide_index];
            this.createSlide(quiz_item, slide_index);
        }
        // remove quiz from local storage
        localStorage.removeItem(this.storage_quiz);
    };
    /*------------------------------------------------------*/
    /**
     * @name getSlides
     * @type {Function}
     */
    /*------------------------------------------------------*/
    getSlides(){
        let slide_nodes = document.getElementsByClassName('slide');
        let slides_arr = [];
        for(let i = 0; i < slide_nodes.length; i++){
            let slide_index = i;
            let slide       = new Slide(this.carousel, slide_index);
            slides_arr.push(slide);
        }
        return slides_arr;
    }
    /*------------------------------------------------------*/
    /**
     * @name startQuiz
     * @type {Function}
     */
    /*------------------------------------------------------*/
    startQuiz(){
        // define current slide
        this.slide = this.slides[this.index];
        console.log(this.slide);
        // disable next button
        this.btn_next.enable();
        // start event listener
        this.slide.answer_container.addEventListener('click', this.pauseQuiz);
        // start slide timer
        this.startTimer();
    }
    /*------------------------------------------------------*/
    /**
     * @name stopTimer
     * @type {Function}
     */
    /*------------------------------------------------------*/
    stopTimer(){
        // stop clock
        this.play_state = false;
        clearInterval(this.slide.interval);
        // stop animation
        this.slide.timer.classList.add('paused');
        // disable skip button
        //this.btn_skip.disable();
        // reveal answers
        //this.revealAnswers();
        // score answers
        //this.validateAnswers();
    }
    /*------------------------------------------------------*/
    /**
     * @name startTimer
     * @type {Function}
     */
    /*------------------------------------------------------*/
    startTimer(){
        // timer properties
        let display_time    = 14;
        this.play_state     = true;
        this.slide.timer.classList.add('ani--countdown');
        // start interval
        this.slide.interval = setInterval(() => {
            // determing state
            if(display_time > -1 && this.play_state == true){
                this.slide.counter.innerHTML = display_time;
                display_time--;
            } else if (display_time == -1 || this.play_state == false){
                this.stopTimer();
            }
        }, 1000);
    }
    /*------------------------------------------------------*/
    /**
     * @name revealAnswers
     * @type {method}
     */
    /*------------------------------------------------------*/
    revealAnswers(){
        // loop answer buttons
        for (let i = 0; i < this.slide.answers.length; i++){
            let btn_answer = this.slide.answers[i];
            if(btn_answer.enabled){
                btn_answer.disable();
            }
        }
    }
    /*------------------------------------------------------*/
    /**
     * @name answerSelect
     * @type {Function}
     */
    /*------------------------------------------------------*/
    answerSelect(){
        // listen to answer container
        this.stopTimer();
        this.slide.answer_container.removeEventListener('click', this.pauseQuiz);
    }
    /*------------------------------------------------------*/
    /**
     * @name validateAnswers
     * @type {Function}
     */
    /*------------------------------------------------------*/
    validateAnswers(){
        let flag = false;
        // loop answer buttons
        this.slide.answers.forEach((btn_answer, btn_index) => {
            // if selected == true
            if(btn_answer.selected == 'true' && btn_answer.input_value == 'true'){
                this.score += this.slide.points;
                flag = true;
            } else if(btn_index == (this.slide.answers.length - 1)){
                flag = false;
            }
        });
        // execute endstate for selected or not
        if(flag == true){
            // animate button score with delay
            this.ele_score.alert.animateAlert(`+${this.score}!`);
            // wait for animation to end
            this.ele_score.alert.node.addEventListener('animationend', () => {
                // display score
                this.ele_score.scoreboard.innerHTML = this.score;
                // enable next button
                this.btn_next.enable();
            });
            // if selected == false
        } else {
            // enable next button
            this.btn_next.enable();
        }
    }
    /*------------------------------------------------------*/
    /**
     * @name advanceSlide
     * @type {Function}
     */
    /*------------------------------------------------------*/
    advanceSlide(){
        // carousel properties
        let dots                = this.dots_container.children;
        let flag                = false;
        const root              = document.querySelector(':root');
        const animation_slide   = 'ani--advance-slide';
        // position properties
        let start_pos   = `${this.index * -100}%`;
        let end_pos;
        // validate next slide
        if ((this.index + 1) < this.slides.length){
            // set new index
            this.index      = this.index + 1;
            end_pos         = `${this.index * -100}%`;
            flag            = true;
            // update data attribute
            this.carousel.setAttribute('data-index', this.index);
        }

        // if validated, animate
        if (flag == true){
            // set animation properties
            root.style.setProperty('--start_pos', start_pos);
            root.style.setProperty('--end_pos', end_pos);

            // advance slide
            this.carousel.classList.add(animation_slide);
            // listen to end of animation
            this.carousel.addEventListener('animationend', () => {
                // lock carousel
                this.carousel.style.transform = `translateX(${end_pos})`;
                // remove animation
                this.carousel.classList.remove(animation_slide);
                // update dots
                this.updateDots(dots, this.index);
                console.log(this.index);
                // trigger hint
                //triggerHint(this.index);
                this.startQuiz();
            });
        }
    }
    /*------------------------------------------------------*/
    /**
     * @name updateDot
     * @param {Node} dots
     * @param {number} index
     */
    /*------------------------------------------------------*/
    updateDots(dots, index){

        // loop dot nodes and apply changes
        for(let i = 0; i < dots.length; i++){
            // dot properties
            let dot         = dots[i];
            let dot_index   = getHTMLElementIndex(dot);
            // update dots
            if (dot_index == index){
                dot.setAttribute('data-active', 'true');
            } else {
                dot.setAttribute('data-active', 'false');
            }
        }
    }
}
// Instantiation
const page = window.location.pathname.split('/').pop();
console.log(page);
const btn_home  = new NavButton('btn_home', page);
const btn_info  = new NavButton('btn_info', page);
const btn_help  = new NavButton('btn_help', page);
const btn_user  = new NavButton('btn_user', page);
const carousel  = document.getElementById('question-carousel');
const category  = 'geography';
const index     = parseInt(carousel.getAttribute('data-index'));
const username  = 'Apollo_test';
const quiz      = new Quiz(carousel, index, category, username, btn_info, btn_help);