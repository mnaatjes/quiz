//-------------------------------------------------------------------------------------------------------
// Quiz: Function - Dashboard
//-------------------------------------------------------------------------------------------------------
// button properties
const dash_buttons  = document.getElementById('dashboard_nav').children;

// loop buttons
for(let i = 0; i < dash_buttons.length; i++){
    let btn = dash_buttons[i];
    // listen to dashboard buttons
    btn.addEventListener('click', function(){
        // build href
        let href = btn.getAttribute('href') + `&username=${username}`;
        // execute link
        window.location.href = href;
    });
}