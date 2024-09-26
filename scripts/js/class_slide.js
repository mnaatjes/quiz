//-------------------------------------------------------------------------------------------------------
// Quiz: Class - Slide
//-------------------------------------------------------------------------------------------------------
/*------------------------------------------------------*/
/**
 * @name Slide
 * @type {Class}
 */
/*------------------------------------------------------*/
class Slide{
    constructor(index){
        this.index      = index,
        this.node       = document.getElementById(`question-${index}`);
        this.timer      = document.getElementById(`circle-${index}`);
        this.counter    = document.getElementById(`counter-${index}`);
        this.answers    = this.getAnswers(index);
        this.points     = parseInt(this.node.getAttribute('data-points'));
        this.hint       = this.node.getAttribute('data-hint');
        this.interval;
    }
    /*------------------------------------------------------*/
    /**
     * @name getAnswers
     * @type {Function}
     */
    /*------------------------------------------------------*/
    getAnswers(index){
        const answer_container  = document.getElementById(`answers-${index}`)
        let temp_arr            = [];
        for(let i = 0; i < answer_container.children.length; i++){
            let answer      = answer_container.children[i];
            let answer_obj  = new AnswerButton(answer.id);
            temp_arr.push(answer_obj);
        }
        return temp_arr;
    };
}