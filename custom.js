const submit = (name) =>
    new Promise(resolve => {
        const jvnLog = data => {
          console.log(data);
          resolve(data.content.text.trim());
        };
        const run_submit = "from api.test import Utils\n" + "import io\n" +
          "from contextlib import redirect_stdout\n" +
          "f = io.StringIO()\n" +
          "with redirect_stdout(f):\n" +
          "\t" + "Utils().test_method("+ '"' + name + '"' + ")\n" +
          "out = f.getvalue().splitlines()[-1]\n" + "print(out)";
        Jupyter.notebook.save_checkpoint();
        Jupyter.notebook.events.one("notebook_saved.Notebook", function() {
          Jupyter.notebook.kernel.execute(run_submit, {
            iopub: { output: jvnLog }
          });
        });
    });
    
const get_user_nb = (name) =>
	new Promise(resolve => {
		const jvnLog = data => {
			console.log(data);
			resolve(data.content.text.trim());
		};
		const run_get_user_nb = "from api.test import Utils\n" + "import io\n" +
			"from contextlib import redirect_stdout\n" +
			"f = io.StringIO()\n" + 
			"with redirect_stdout(f):\n" +
			"\t" + "Utils().get_user_nb(" + '"' + name + '"' + ")\n" +
			"out = f.getvalue().splitlines()[-1]\n" + "print(out)";
		Jupyter.notebook.save_checkpoint();
		Jupyter.notebook.events.one("notebook_saved.Notebook", function() {
			Jupyter.notebook.kernel.execute(run_get_user_nb, {
				iopub: { output: jvnLog }
			});
		});
	});
	
const test_nb = () =>
	new Promise(resolve => {
		const jvnLog = data => {
			console.log(data);
			resolve(data.content.text.trim());
		}
		const test_user_nb = "with open('./api/assertion.py', 'r') as file:\n" + 					"\t" + "code = file.read()\n" + 
				"\t" + "try:\n" +
				"\t" + "\t" + "exec(code)\n" +
				"\t" + "except AssertionError as e:\n" +
				"\t" + "\t" + "print(e)\n"
		Jupyter.notebook.save_checkpoint();
		Jupyter.notebook.events.one("notebook_saved.Notebook", function() {
			Jupyter.notebook.kernel.execute(test_user_nb, {
				iopub: { output: jvnLog }
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
    			alert(log_data);
    			window.location.reload();
    		});
    	}
    },
    {
    	'label'    : 'Test',
    	'icon'     : '',
    	'callback' : function(){
    		var name = prompt("Enter user name to get user notebook");
    		test_nb().then(log_data => {
    			alert(log_data);
    			window.location.reload();
    		});
    	}
    }
]);
