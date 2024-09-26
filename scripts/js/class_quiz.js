//-------------------------------------------------------------------------------------------------------
// Quiz: Class - Quiz Game
//-------------------------------------------------------------------------------------------------------
/*------------------------------------------------------*/
/**
 * @name Quiz
 * 
 */
/*------------------------------------------------------*/
class Quiz {
    constructor(carousel, index, category, btn_info, btn_help){
        // main properties
        this.storage_quiz   = category;
        this.category       = category;
        this.carousel       = carousel;
        // game properties
        this.index          = index;
        this.score          = 0;
        // nav properties
        this.ele_score  = {
            node: document.getElementById('ele_score'),
            alert: new Alert(document.getElementById('ele_score')),
            scoreboard: document.getElementById('scoreboard')
        };
        // button properties
        this.btn_skip       = new Button('btn_skip');
        this.btn_next       = new Button('btn_next');
        this.btn_submit     = new Button('btn_submit');
        // nav properties
        this.btn_info       = btn_info;
        this.btn_help       = btn_help;
        // init
        this.init();
    }
    /*------------------------------------------------------*/
    /**
     * @name init
     * @type {method}
     */
    /*------------------------------------------------------*/
    init(){
        // define hint events
        
        // hide submit button
        this.btn_submit.hide();
        // load quiz from JSON file
        this.loadQuiz();
        // build quiz from local storage
        this.buildQuiz();
        // gather and define slide objects
        this.getSlides();
        // update current slide
        this.updateSlide();
        // disable next button
        this.btn_next.disable();
        // start quiz
        this.playQuiz(true);
    }
    /*------------------------------------------------------*/
    /**
     * @name playQuiz
     * @type {method}
     */
    /*------------------------------------------------------*/
    playQuiz(flag){
        // if NOT last slide
        if(flag == true){
            // set listener properties
            // listener events
            this.listener_skip = () => {this.skipQuestion();};
            this.listener_next = () => {this.advanceSlide();};
            // enable skip button
            this.btn_skip.enable();
            // set listener: skip
            this.btn_skip.node.addEventListener('click', this.listener_skip);
        // if LAST slide
        } else if (flag == false){
            // listener event property
            this.listener_submit = () => {this.submitQuiz();};
            // enable submit button
            this.btn_submit.enable();
        }
        // trigger hints
        this.triggerHints();
        // answer listener property
        this.listener_answer = (e) => {this.answerSelect(e);};
        // set listener: answers
        this.slide.answers.forEach(btn_answer => {
            btn_answer.node.addEventListener('click', this.listener_answer);
        });
        // start timer
        this.startTimer();
        //console.log(this.slide);
    }
    /*------------------------------------------------------*/
    /**
     * @name stopTimer
     * @type {Function}
     */
    /*------------------------------------------------------*/
    stopTimer(){
        // stop clock
        clearInterval(this.slide.interval);
        // stop animation
        this.slide.timer.classList.add('paused');
        // remove hint listeners: info
        if(this.btn_info.enabled == true){
            this.btn_info.disable();
            this.btn_info.alert.removeAlertAnimation();
            this.btn_info.node.removeEventListener('mouseover', this.listener_info_hover);
            this.btn_info.node.removeEventListener('click', this.listener_info_click);
            this.btn_info.node.removeEventListener('mouseout', this.listener_info_exit);
        }
        // remove hint listeners: help
        if(this.btn_help.enabled == true){
            this.btn_help.disable();
            this.btn_help.alert.removeAlertAnimation();
            this.btn_help.node.removeEventListener('mouseover', this.listener_help_hover);
            this.btn_help.node.removeEventListener('click', this.listener_help_click);
            this.btn_help.node.removeEventListener('mouseout', this.listener_help_exit);
        }
        // if NOT last slide
        if(this.btn_skip.hidden == false){
            // disable skip
            this.btn_skip.disable();
            // end listener
            this.btn_skip.node.removeEventListener('click', this.listener_skip);
        }
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
        // start timer animation
        this.slide.timer.classList.add('ani--countdown');
        // start interval
        this.slide.interval = setInterval(() => {
            // determing state
            if(display_time > -1){
                this.slide.counter.innerHTML = display_time;
                display_time--;
            } else if (display_time == -1){
                // stop timer
                this.stopTimer();
                // clear answer button listener
                this.slide.answers.forEach(btn_answer => {
                    btn_answer.node.removeEventListener('click', this.listener_answer);
                });
                // reveal answers
                this.revealAnswers();
            }
        }, 1000);
    }
    /*------------------------------------------------------*/
    /**
     * @name updateSlide
     * @type {method}
     */
    /*------------------------------------------------------*/
    updateSlide(){
        this.slide = this.slides[this.index];
    }
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
            let slide_obj   = new Slide(slide_index);
            slides_arr.push(slide_obj);
        }
        this.slides = slides_arr;
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
        slide.setAttribute('data-hint', quiz_item.hint);
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
    /*------------------------------------------------------*/
    /**
     * @name answerSelect
     * @type {Function}
     */
    /*------------------------------------------------------*/
    answerSelect(e){
        // stop timer
        this.stopTimer();
        // set flag
        let flag = false;
        // remove listener
        this.slide.answers.forEach(btn_answer => {
            // alter selected
            if(e.target.id == btn_answer.id){
                btn_answer.select();
                // set flag to score points
                if(btn_answer.input_value == 'true'){flag = true;}
            }
            btn_answer.node.removeEventListener('click', this.listener_answer);
        });
        // animation points listener event function
        let listener_points_animation = () => {
            // display score
            this.ele_score.scoreboard.innerHTML = this.score;
            // remove animaition
            this.ele_score.alert.removeAlertAnimation();
            // remove event listener
            this.ele_score.alert.node.removeEventListener('animationend', listener_points_animation);
        };
        // execute endstate for correct answer
        if(flag == true){
            // add score
            this.score += this.slide.points;
            console.log(this.score);
            console.log(this.slide.points);
            // animate button score with delay
            this.ele_score.alert.animateAlert(`+${this.slide.points}!`);
            // wait for animation to end
            this.ele_score.alert.node.addEventListener('animationend', listener_points_animation);
        }
        // reveal answers
        this.revealAnswers();
    }
    /*------------------------------------------------------*/
    /**
     * @name skipQuestion
     * @type {Function}
     */
    /*------------------------------------------------------*/
    skipQuestion(){
        // stop timer
        this.stopTimer();
        // reveal answers
        this.revealAnswers();
    }
    /*------------------------------------------------------*/
    /**
     * @name revealAnswers
     * @type {method}
     * @description btn_next enabled here
     */
    /*------------------------------------------------------*/
    revealAnswers(){
        // loop answer buttons
        for (let i = 0; i < this.slide.answers.length; i++){
            let btn_answer = this.slide.answers[i];
            btn_answer.disable();
        }
        // if NOT last slide
        if(this.btn_next.hidden == false){
            // enable next button
            this.btn_next.enable();
            // set listener: next
            this.btn_next.node.addEventListener('click', this.listener_next);
        }
    }
    /*------------------------------------------------------*/
    /**
     * @name triggerHints
     * @type {Function}
     */
    /*------------------------------------------------------*/
    triggerHints(){
        // trigger info hint
        if(this.index < this.slides.length && this.score < 600){
            this.btn_info.enable();
            this.btn_info.alert.animateAlert();
            this.btn_info.tooltip.msg = this.slide.hint;
            // set listener vars
            this.listener_info_hover = () => {this.btn_info.tooltip.showHint();};
            this.listener_info_click = () => {
                this.btn_info.tooltip.hideHint();
                this.btn_info.disable();
                this.btn_info.alert.removeAlertAnimation();
                this.btn_info.node.removeEventListener('mouseover', this.listener_info_hover);
                this.btn_info.node.removeEventListener('click', this.listener_info_click);
                this.btn_info.node.removeEventListener('mouseout', this.listener_info_exit);
            };
            this.listener_info_exit  = () => {this.btn_info.tooltip.hideHint();};
            // set event listener
            this.btn_info.node.addEventListener('mouseover', this.listener_info_hover);
            this.btn_info.node.addEventListener('click', this.listener_info_click);
            this.btn_info.node.addEventListener('mouseout', this.listener_info_exit);
        }
        // helper controller
        if(this.index > 3 && this.score < 500){
            this.btn_help.enable();
            this.btn_help.alert.animateAlert();
            this.btn_help.tooltip.msg = 'Click to close and remove one false answer.';
            // define lister functions
            this.listener_help_hover = () => {this.btn_help.tooltip.showHint();};
            this.listener_help_click = () => {
                // hide and disable button
                this.btn_help.disable();
                this.btn_help.alert.removeAlertAnimation();
                this.btn_help.tooltip.hideHint();
                // remove event listeners
                this.btn_help.node.removeEventListener('mouseover', listener_help_hover);
                this.btn_help.node.removeEventListener('click', listener_help_click);
                this.btn_help.node.removeEventListener('mouseout', listener_help_exit);
                // execute helper code
                let flag = false;
                this.slide.answers.forEach((btn_answer, index) => {
                    if(btn_answer.input_value == 'false' && flag == false){btn_answer.disable(); flag = true}
                });
            };
            this.listener_help_exit  = () => {this.btn_help.tooltip.hideHint();};
            // set listener events
            this.btn_help.node.addEventListener('mouseover', this.listener_help_hover);
            this.btn_help.node.addEventListener('click', this.listener_help_click);
            this.btn_help.node.addEventListener('mouseout', this.listener_help_exit);
        }
    }
    /*------------------------------------------------------*/
    /**
     * @name advanceSlide
     * @type {Function}
     */
    /*------------------------------------------------------*/
    advanceSlide(){
        // end listener
        this.btn_next.node.removeEventListener('click', this.listener_next);
        // disable next button
        this.btn_next.disable();
        // carousel properties
        let flag                = false;
        let dots                = document.getElementById('dot-container').children;
        const root              = document.querySelector(':root');
        const animation_slide   = 'ani--advance-slide';
        // position properties
        let start_pos   = `${this.index * -100}%`;
        let end_pos;
        // validate next slide
        if (this.index < (this.slides.length - 1)){
            if((this.index + 1) == (this.slides.length - 1)){
                // hide skip and next buttons
                this.btn_skip.hide();
                this.btn_next.hide();
                // set flag
                flag = false;
            } else {flag = true;}
            // set new index
            this.index      = this.index + 1;
            end_pos         = `${this.index * -100}%`;
            // update data attribute
            this.carousel.setAttribute('data-index', this.index);
        }
        // advance slide animation
        this.carousel.classList.add(animation_slide);
        let listener_slide_animation = () => {
            // lock carousel
            this.carousel.style.transform = `translateX(${end_pos})`;
            // remove animation
            this.carousel.classList.remove(animation_slide);
            // update dots
            this.updateDots(dots, this.index);
            // update current slide
            this.updateSlide();
            // enable play quiz
            this.playQuiz(flag);
            // remove this listener
            this.carousel.removeEventListener('animationend', listener_slide_animation);
        }
        // execute event listener
        this.carousel.addEventListener('animationend', listener_slide_animation);
    }
    /*------------------------------------------------------*/
    /**
     * @name submitQuiz
     * @type {Function}
     */
    /*------------------------------------------------------*/
    submitQuiz(){
        console.log('submit');
    }
}