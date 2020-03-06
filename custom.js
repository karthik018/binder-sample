Jupyter.toolbar.add_buttons_group([
    {
         'label'   : 'Submit',
         'icon'    : 'fa-terminal',
         'callback': function(){
         	var name = prompt("Enter user name to submit");
         	var user_data = {
         		"name": name
         	}
			$.ajax({
				url: "/api/test.py",
				success: function(response){
					console.log(response);
				}
			});
         }
    }
]);
