/*jshint multistr: true*/
var table_template = " \
    <table class='table table-hover table-bordered' id='slicesTable' border='1'> \
        <thead> \
        <tr> \
            <td><b>Slice Name</b></td> \
            <td><b>Slice Value</b></td> \
        </tr> \
        </thead> \
        <% _.each (slices, function (obj) { %> \
            <tr data-id=<%= obj.id %>> \
                <td id='name'><%= obj.name %></td> \
                <td id='value'><%= obj.value %></td> \
            </tr> \
        <% }); %> \
    </table> \
    <p>Click on an item to remove it from the list.</p>";

var warning_template = " \
    <div class='alert alert-error'>\
        <button type='button' class='close' data-dismiss='alert'>&times;</button>\
        <strong>Error: </strong>\
        <p>You must have at least one slice in your pie chart, author and title cannot be empty.</p>\
    </div>";


var bad_slice = " \
    <div class='alert alert-error'>\
        <button type='button' class='close' data-dismiss='alert'>&times;</button>\
        <strong>Error: </strong>\
        <p>Slice name must not be empty and slice value must be a number.</p>\
    </div>";
