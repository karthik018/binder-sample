Jupyter.toolbar.add_buttons_group([
    {
         'label'   : 'Submit',
         'icon'    : 'fa-terminal',
         'callback': function(){
         	var name = prompt("Enter user name to submit");
         	$.ajax({
				type: "POST",
				url: "~/api/test.py",
				data: { param: name },
				success: console.log(response)
			});
         }
    }
]);
