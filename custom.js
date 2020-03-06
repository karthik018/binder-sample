Jupyter.toolbar.add_buttons_group([
    {
         'label'   : 'Submit',
         'icon'    : 'fa-terminal',
         'callback': function(){
         	$.ajax({
				type: "POST",
				url: "~/api/test.py",
				data: { param: input },
				success: console.log(response)
			});
         }
    }
]);
