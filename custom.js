define([
    'jquery',
    'base/js/namespace',
    'base/js/dialog',
    'base/js/events',
    'base/js/utils',
    'require',
], function(
    $,
    Jupyter,
    dialog,
    events,
    utils,
    require
) {
    "use strict";

    var load_ipython_extension = function() {

        // add button to toolbar in case appmode is not enabled
        Jupyter.toolbar.add_buttons_group([{
            id : 'toggle_codecells',
            label : 'Appmode',
            icon : 'fa-arrows-alt',
            callback : goto_app_mode
        }]);
    };

    return {
        load_ipython_extension : load_ipython_extension
    };
});
