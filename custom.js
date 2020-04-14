const submit = (name) =>
    new Promise(resolve => {
        const jvnLog = data => {
          console.log(data)
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
    }
]);
