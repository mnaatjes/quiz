//-------------------------------------------------------------------------------------------------------
// Quiz: Function - Quiz
//-------------------------------------------------------------------------------------------------------
/*------------------------------------------------------*/
/**
 * @name createDots
 * @param {number} index quiz item index
 * @extends dots_container
 */
/*------------------------------------------------------*/
function createDots(index){
    let dot         = document.createElement('div');
    dot.id          = `dot-${index}`;
    dot.className   = 'dot';
    dot.innerHTML   = index + 1;
    // set data attribute
    if (index == 0) {dot.setAttribute('data-active', true)}
    else {dot.setAttribute('data-active', false)}
    // append to container
    dots_container.appendChild(dot);
}
/*------------------------------------------------------*/
/**
 * @name createQuestions
 * @param {string}
 */
/*------------------------------------------------------*/
function createQuestions(quiz_item, slide, quiz){
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
    question_icon.innerHTML         = getQuizIcon(quiz_type);
    // question timer
    let question_timer               = document.createElement('div');
    let question_timer_counter       = document.createElement('div');
    question_timer.id                = `timer-${quiz.indexOf(quiz_item)}`;
    question_timer.className         = 'question__timer';
    question_timer_counter.id        = `counter-${quiz.indexOf(quiz_item)}`;
    question_timer_counter.className = 'question__timer__counter';
    question_timer_counter.innerHTML = 15;
    // timer svg elements
    let svg     = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '66');
    svg.setAttribute('height', '66');
    let circle  = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.id   = `circle-${quiz.indexOf(quiz_item)}`;
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
 * @param {string}
 */
/*------------------------------------------------------*/
function createAnswers(quiz_item, slide, quiz){
    let q_index = quiz.indexOf(quiz_item);
    // answer container property
    let answer_container            = document.createElement('div');
    answer_container.id             = `answers-${quiz.indexOf(quiz_item)}`;
    answer_container.className      = 'slide__answer__container';
    // loop answers
    for(let i = 0; i < quiz_item.answers.length; i++){
        let answer      = quiz_item.answers[i];
        let radio_name  = `q-${q_index}a-${i}`;
        // answer radio container
        let radio_container             = document.createElement('div');
        radio_container.className       = 'radio__container';
        radio_container.setAttribute('data-result', "none");
        radio_container.setAttribute('onClick', "answerSelect(this)");
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
 * @param {string} quiz_type
 */
/*------------------------------------------------------*/
function getQuizIcon(quiz_type){
    return '<i class="fa-solid fa-globe"></i>';
}
/*------------------------------------------------------*/
/**
 * @name triggerHint
 * @type {Function}
 */
/*------------------------------------------------------*/
function triggerHint(index){
    // conditions
    if (score < 200 && index > 0){
        // enable info button
        nav.btn_info.enable();
        // animate alert
        nav.btn_info.alert.animateAlert();
        // populate into with hint text
        nav.btn_info.tooltip.msg = quiz[index].hint;
    }
    if (score < 300 && index > 2){
        // enable help button
        nav.btn_help.enable();
        // animate alert
        nav.btn_help.alert.animateAlert();
    }
}
/*------------------------------------------------------*/
/**
 * @name answerHelp
 * @type {Function}
 * TODO: Figure out how to integrate with Nav Constructor
 */
/*------------------------------------------------------*/
function answerHelp(index){
    let answers = document.getElementById(`answers-${index}`).children;
    // loop answers and find a wrong one to change
    for(let i = 0; i < answers.length; i++){
        let answer  = answers[i];
        let radio   = answer.querySelector('input[type="radio"]');
        let label   = answer.querySelector('label');
        let span    = answer.querySelector('span');
        if (radio.value != 'true'){
            // remove click function
            answer.setAttribute('onClick', '');
            // reset styles
            answer.setAttribute('data-result', '');
            answer.style.borderColor    = 'var(--color-strokeDim)';
            answer.style.cursor         = 'default';
            label.style.color           = 'var(--color-strokeDim)';
            span.style.borderColor      = 'var(--color-strokeDim)';
            break;
        }
    }
}
/*------------------------------------------------------*/
/***
 * @name validateQuiz
 * @type {Function}
 */
/*------------------------------------------------------*/
function validateQuiz(){
    // apply obj value to input value
    form.elements['username'].value = username;
    form.elements['score'].value    = score;
    form.elements['category'].value = quiz_type;
}
/*------------------------------------------------------*/
/**
 * @name startTimer
 * @param {number} index question index
 */
/*------------------------------------------------------*/
function startTimer(index){
    // properties
    let timer_circle = document.getElementById(`circle-${index}`);
    // animate timer
    timer_circle.classList.add(animation_timer);
    // start timer
    countDown(index, timer_circle);
}
/*------------------------------------------------------*/
/**
 * @name countDown
 * @param {number} index question index
 */
/*------------------------------------------------------*/
function countDown(index, timer_circle){
    // disable next button
    btn_next.disable();
    // properties
    let timer_num       = document.getElementById(`counter-${index}`);
    let display_time    = 14;
    let timer = setInterval(() => {
        // timer end
        if (display_time == -1 || play_state == false) {
            // ensure play_state is ended if time has run out
            if (play_state == true){play_state = false;}
            // clear timer
            clearInterval(timer);
            // check if last slide
            if ((index + 1) == slides.length){
                // turn off skip and next buttons
                btn_skip.hide();
                btn_next.hide();
                // turn on submit button
                btn_submit.enable();
            } else if ((index + 1) < slides.length) {
                btn_next.enable();
                btn_skip.disable();
            }
            // pause animation
            timer_circle.classList.add('paused');
            // disable answers and reveal answer
            showAnswer(index);
        }
        else if (play_state == true) {
            // while timer
            timer_num.innerHTML = display_time;
            // change color
            if (display_time == 5){timer_num.style.color = 'var(--color-error)';}
            display_time--;
        }
    }, 1000);
}
/*------------------------------------------------------*/
/**
 * @name answerSelect
 * @param {HTMLElement} btn answer button
 */
/*------------------------------------------------------*/
function answerSelect(btn){
    // properties
    let radio   = btn.querySelector('input[type="radio"]');
    let slide   = document.getElementById(`question-${index}`);
    let points  = parseInt(slide.getAttribute('data-points'));
    // set radio button to checked
    radio.setAttribute('checked', 'checked');
    // stop timer
    play_state = false;
    // validate selection
    if (radio.value == 'true') {
        // change attribute
        btn.setAttribute('data-result', true);
        // update score local storage
        score += points
        // animate alert
        alert_points.innerHTML = `+${points}!`;
        alert_points.classList.add(animation_alert);
        alert_points.addEventListener('animationend', function(){
            // update score
            scoreboard.innerHTML = score;
            // strip animation
            alert_points.classList.remove(animation_alert);
        });
    }
    else {btn.setAttribute('data-result', false);}
}
/*------------------------------------------------------*/
/**
 * @name showAnswer
 * @param {number} index question index
 */
/*------------------------------------------------------*/
function showAnswer(index){
    let answers     = document.getElementById(`answers-${index}`).children;
    // loop answers and set
    for (let i = 0; i < answers.length; i++){
        let answer  = answers[i];
        let radio   = answer.querySelector('input[type="radio"]');
        let label   = answer.querySelector('label');
        let span    = answer.querySelector('span');
        let data    = answer.getAttribute('data-result');
        // remove click function
        answer.setAttribute('onClick', '');
        // reset styles
        answer.style.borderColor = 'var(--color-strokeDim)';
        answer.style.cursor      = 'default';
        // validate answers
        if (data != 'true' && radio.value == 'true'){answer.setAttribute('data-result', 'true');}
        else if (data == 'none') {
            // unset answer style
            answer.setAttribute('data-result', '');
            label.style.color       = 'var(--color-strokeDim)';
            span.style.borderColor  = 'var(--color-strokeDim)';
        }
    }
}
