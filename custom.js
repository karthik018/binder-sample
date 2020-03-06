Jupyter.toolbar.add_buttons_group([
    {
         'label'   : 'run qtconsole',
         'icon'    : 'fa-terminal', // select your icon from
                                      // http://fontawesome.io/icons/
         'callback': function(){Jupyter.notebook.kernel.execute('%qtconsole')}
    }
    // add more button here if needed.
]);
