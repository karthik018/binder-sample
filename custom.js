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
				type: "POST",
				contentType: 'application/json',
            	dataType: 'json',
				url: "/api/test.py",
				data: JSON.stringify(user_data),
				success: function(response){
					console.log(response);
				}
			});
         }
    }
]);
