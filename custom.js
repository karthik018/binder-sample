Jupyter.toolbar.add_buttons_group([
    {
         'label'   : 'Submit',
         'icon'    : 'fa-terminal',
         'callback': function(){
         	var name = prompt("Enter user name to submit");
         	$.ajax({
				type: "POST",
				contentType: 'application/json',
            	dataType: 'json',
				url: "~/api/test.py",
				data: { "name": name },
				success: function(response){
					console.log(response);
				}
			});
         }
    }
]);
