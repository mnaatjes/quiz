//-------------------------------------------------------------------------------------------------------
// Quiz: Function - test
//-------------------------------------------------------------------------------------------------------
const input_user    = document.getElementById('username');
const btn_submit    = new Button('splash_submit');
const error_msg     = document.getElementById('error-username');
const form_splash   = document.getElementById('form_splash');

// listen to input field
input_user.addEventListener('input', function(e){
    let input_values = e.target.value;
    // show / hide error message
    if (input_values.length > 0 && input_values.length <= 3){
        error_msg.style.display = 'block';
    } else {error_msg.style.display = 'none';}
    // enable / disable submit
    if (input_values.length > 3){
        // change input field state
        input_user.setAttribute('data-state', 'active');
        // enable submit
        btn_submit.enable();
    } else if (input_values < 3){
        // disable submit
        btn_submit.disable();
        // change input field state
        input_user.setAttribute('data-state', '');
    }
});

/*------------------------------------------------------*/
/**
 * @name validateSplash
 */
/*------------------------------------------------------*/
function validateSplash(){
    
}