//-------------------------------------------------------------------------------------------------------
// Quiz: Class - Answer
//-------------------------------------------------------------------------------------------------------
/*------------------------------------------------------*/
/**
 * @name AnswerButton
 * @type {ObjectConstructor}
 */
/*------------------------------------------------------*/
class AnswerButton extends Button {
    constructor(btn_id){
        super(btn_id);
        this.input          = this.node.querySelector('input[type="radio"]');
        this.input_value    = this.input.getAttribute('value');
        this.selected       = this.node.getAttribute('data-selected');
    }
    /*------------------------------------------------------*/
    /**
     * @name onClick
     * @type {Function}
     */
    /*------------------------------------------------------*/
    onClick(){
        // remove listener
        this.disable();
        // set button selected
        this.node.setAttribute('data-selected', 'true');
        this.selected = 'true';
    }
}