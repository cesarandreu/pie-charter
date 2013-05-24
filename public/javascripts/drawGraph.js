$(document).ready(function() {

    var chartInfo = JSON.parse($('#chartInfo').val());
    var chartTitle = $('#chartTitle').val();

    var dataArray = [];

    var total = 0;
    var i;
    for (i = 0; i < chartInfo.length; i++) {
        total += chartInfo[i].value;
    }

    for (i = 0; i < chartInfo.length; i++) {
        dataArray.push([chartInfo[i].name, (chartInfo[i].value / total)]);
    }



    $('#container').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: chartTitle
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    color: '#000000',
                    connectedColor: '#000000',
                    formatter: function() {
                      return '<b>'+this.point.name+'</b>: '+this.percentage+' %';
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            name: chartTitle,
            data: dataArray
        }]
    });

});