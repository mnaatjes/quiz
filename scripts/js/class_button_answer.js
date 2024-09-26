//-------------------------------------------------------------------------------------------------------
// Quiz: Class - Button
//-------------------------------------------------------------------------------------------------------
/*------------------------------------------------------*/
/**
 * @name AnswerButton
 * @type {Class}
 */
/*------------------------------------------------------*/
class AnswerButton extends Button{
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