/*------------------------------------------------------*/
/**
 * @name advanceSlide
 * @param {HTMLElement} btn button
 * @property {HTMLElement} 
 */
/*------------------------------------------------------*/
function advanceSlide(btn){
    // carousel properties
    let index       = parseInt(carousel.getAttribute('data-index'));
    let dots        = dots_container.children;
    let flag        = false;
    // button properties
    let btn_name    = btn.id;
    // position properties
    let start_pos   = `${index * -100}%`;
    let end_pos;
    // validate button selection
    validateButtons(btn_name);
    // validate next slide
    if ((index + 1) < slides.length){
        // set new index
        index   = index + 1;
        end_pos = `${index * -100}%`;
        flag    = true;
        // update data attribute
        carousel.setAttribute('data-index', index);
    }

    // if validated, animate
    if (flag == true){
        // set animation properties
        root.style.setProperty('--start_pos', start_pos);
        root.style.setProperty('--end_pos', end_pos);

        // advance slide
        carousel.classList.add(animation_slide);
        // listen to end of animation
        carousel.addEventListener('animationend', function(){
            // lock carousel
            carousel.style.transform = `translateX(${end_pos})`;
            // remove animation
            carousel.classList.remove(animation_slide);
            // reset skip and play state
            if (skip == true){skip = false;}
            else if (play_state == false){play_state = true;}
            // update dots
            updateDots(dots, index);
            // start timer
            startTimer(index);
            // check if last slide
            if ((index + 1) == slides.length){
                // turn off skip and next buttons
                btn_skip.hide();
                btn_next.hide();
                // turn on submit button
                btn_submit.enable();
            } else {
                btn_next.disable();
                btn_skip.enable();
            }
        });
        // trigger hint
        triggerHint(index);
    }
}
/*------------------------------------------------------*/
/**
 * @name validateButtons
 * @param {HTMLElement} btn_name
 * @property {HTMLElement} btn_skip
 * @property {HTMLElement} btn_next
 * @returns {Boolean} result
 */
/*------------------------------------------------------*/
function validateButtons(btn_name){
    // properties
    let result = false;
    play_state = false;
    // reset play state
    if (btn_name == btn_next.id) {
        // set result
        result = true;
    }

    return result;
}
/*------------------------------------------------------*/
/**
 * @name validateAnswers
 * @param {HTMLElement} slide
 * @param {number} index
 * @property {Nodes} answers
 */
/*------------------------------------------------------*/
function validateAnswers(slide, index){

}
/*------------------------------------------------------*/
/**
 * @name updateDot
 * @param {Node} dots
 * @param {number} index
 */
/*------------------------------------------------------*/
function updateDots(dots, index){

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