Jupyter.toolbar.add_buttons_group([
    {
         'label'   : 'Submit',
         'icon'    : 'fa-terminal',
         'callback': function(){
         	var name = prompt("Enter user name to submit");
         	var user_data = {
         		"name": name
         	}
			require(['child_process'], function(cp) {
				var spawn = cp.spawn;
				const sensor = spawn('python', ['/api/test.py']);
				sensor.stdout.on('data', function(data) {
					console.log(data);
				});
			});
         }
    }
]);
