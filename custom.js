const submit = (name) =>
    new Promise(resolve => {
        const run_submit = "from api import test\n" + "import io\n" +
          "from contextlib import redirect_stdout\n" +
          "f = io.StringIO()\n" +
          "with redirect_stdout(f):\n" +
          "\t" + "test.test_method("+ '"' + name + '"' + ")\n" +
          "out = f.getvalue().splitlines()[-1]\n" + "print(out)";
        Jupyter.notebook.save_checkpoint();
        Jupyter.notebook.events.one("notebook_saved.Notebook", function() {
          Jupyter.notebook.kernel.execute(run_submit, {
            iopub: { output: "" }
          });
        });
    });
    
const get_user_nb = (name) =>
	new Promise(resolve => {
		const run_get_user_nb = "from api import test\n" + "import io\n" +
			"from contextlib import redirect_stdout\n" +
			"f = io.StringIO()\n" + 
			"with redirect_stdout(f):\n" +
			"\t" + "test.get_user_nb(" + '"' + name + '"' + ")\n" +
			"out = f.getvalue().splitlines()[-1]\n" + "print(out)";
		Jupyter.notebook.save_checkpoint();
		Jupyter.notebook.events.one("notebook_saved.Notebook", function() {
			Jupyter.notebook.kernel.execute(run_get_user_nb, {
				iopub: { output: "" }
			});
		});
	});


Jupyter.toolbar.add_buttons_group([
    {
         'label'   : 'Submit',
         'icon'    : 'fa-cloud-upload fa',
         'callback': function(){
         	var name = prompt("Enter user name to submit");
         	submit(name).then(log_data => {
         	    alert(log_data)
         	});
         }
    },
    {
    	'label'    : 'User-NB',
    	'icon'     : 'fa-cloud-download fa',
    	'callback' : function(){
    		var name = prompt("Enter user name to get user notebook");
    		get_user_nb(name).then(log_data => {
    			alert(log_data)
    		});
    	}
    }
]);
