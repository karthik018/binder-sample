var label = jQuery('<label/>').text('AutoScroll Limit:');
var select = jQuery('<select/>')
     //.append(jQuery('<option/>').attr('value', '2').text('2min (default)'))
     .append(jQuery('<option/>').attr('value', undefined).text('disabled'))

     // TODO:
     //the_toolbar_element.append(label)
     //the_toolbar_element.append(select);

select.change(function() {
     var val = jQuery(this).val() // val will be the value in [2]
     // TODO
     // this will be called when dropdown changes

});

var time_m = [1,5,10,15,30];
for (var i=0; i < time_m.length; i++) {
     var ts = time_m[i];
                                          //[2]   ____ this will be `val` on [1]
                                          //     |
                                          //     v
     select.append($('<option/>').attr('value', ts).text(thr+'min'));
     // this will fill up the dropdown `select` with
     // 1 min
     // 5 min
     // 10 min
     // 10 min
     // ...
}
