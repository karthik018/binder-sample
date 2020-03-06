Jupyter.toolbar.add_buttons_group([
    {
         'label'   : 'Submit',
         'icon'    : 'fa-terminal',
         'callback': function(){
         	user_name = prompt("Enter your user name to submit");
         	console.log(user_name);
         }
    }
    // add more button here if needed.
]);
