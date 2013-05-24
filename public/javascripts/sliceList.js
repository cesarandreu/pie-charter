
$(document).ready(function() {

var data = {
    slices: []
};

var idCount = 0;

var templateString = $('#table-template').text();

$('#addSlice').on('click', function() {
    //Gets their values
    var sliceName = $('#sliceName').val();
    var sliceValue = $('#sliceValue').val();

    //Resets their values
    $('#sliceName').val('');
    $('#sliceValue').val('');

    //Puts the combination in the array
    data.slices.push({name: sliceName, value: sliceValue, id: idCount});
    idCount++;

    var output = _.template(templateString, data);
    $('#sliceList').html(output);

});


$(document).on('click', '#slicesTable tr', function() {
    var itemId = $(this).data('id');

    for (var i = 0; i < data.slices.length; i++) {
        if (data.slices[i].id === itemId) {
            data.slices.splice(i, 1);
            break;
        }
    }

    if (data.slices.length > 0) {
        var output = _.template(templateString, data);
        $('#sliceList').html(output);
    } else {
        $('#sliceList').html('<div></div>');
    }


});


$('#createChart').on('click', function() {
    $('#chartInfo').val(JSON.stringify(data.slices));
    $('#chartForm').submit();
});

});

