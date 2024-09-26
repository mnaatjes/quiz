/*------------------------------------------------------*/
/**
 * @name AnswerButton
 * @type {Class}
 * @memberof QuizApp
 * @description this class build upon the Button class with specialized methods for answer question buttons
 * @extends Button
 */
/*------------------------------------------------------*/
class AnswerButton extends Button{
    /**
     * @description initializes button object
     * @memberof QuizApp
     * @param {String} btn_id html id of target element
     * @property {HTMLElement} input radio button
     * @property {String} value
     * @property {HTMLAttribute} selected state
     */
    constructor(btn_id){
        super(btn_id);
        this.input          = this.node.querySelector('input[type="radio"]');
        this.input_value    = this.input.getAttribute('value');
        this.selected       = this.node.getAttribute('data-selected');
    }
    /*------------------------------------------------------*/
    /**
     * @name select
     * @type {method}
     */
    /*------------------------------------------------------*/
    select(){
        this.node.setAttribute('data-selected', 'true');
        this.selected = 'true';
    }
}