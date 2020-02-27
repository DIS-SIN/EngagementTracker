var etDashboard = (function () {

    // Keep this variable private inside this closure scope
    var inputItems = [93, 95, 88, 0, 55, 91];

    var average = function () {
        var total = inputItems.reduce(function (accumulator, item) {
            return accumulator + item;
        }, 0);

        return 'Average is ' + total / inputItems.length + '.';
    };

    var anomalies = function () {
        var anomalyItems = inputItems.filter(function (item) {
            return item < 70;
        });

        return 'There are ' + anomalyItems.length + ' anomalies.';
    };

    // Explicitly reveal public pointers to the private functions 
    // that we want to reveal publicly

    var build_chart_events_participation = function () {
        // Themes begin
        am4core.useTheme(am4themes_frozen);
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        var chart = am4core.create("chart_events_participation", am4charts.PieChart);

        // Add data
        chart.data = [{
            "delivery": "In-Person",
            "reach": 1838
        }, {
            "delivery": "Virtual",
            "reach": 12565
        }];

        // Set inner radius
        chart.innerRadius = am4core.percent(60);

        // Add and configure Series
        var pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "reach";
        pieSeries.dataFields.category = "delivery";
        pieSeries.slices.template.stroke = am4core.color("#4a2abb");
        pieSeries.slices.template.strokeWidth = 2;
        pieSeries.slices.template.strokeOpacity = 1;

        pieSeries.labels.template.disabled = true;
        pieSeries.ticks.template.disabled = true;

        // This creates initial animation
        pieSeries.hiddenState.properties.opacity = 1;
        pieSeries.hiddenState.properties.endAngle = -90;
        pieSeries.hiddenState.properties.startAngle = -90;

        var label = chart.seriesContainer.createChild(am4core.Label);
        label.textAlign = "middle";
        label.horizontalCenter = "middle";
        label.verticalCenter = "middle";
        label.adapter.add("text", function (text, target) {
            return "[bold font-size:30px]" + pieSeries.dataItem.values.value.sum + "[/]";
        })

        chart.legend = new am4charts.Legend();
        chart.legend.position = "left";
        chart.legend.maxWidth = 300;
    };

    var build_chart_engagements_participation = function () {
        // Themes begin
        am4core.useTheme(am4themes_frozen);
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        var chart = am4core.create("chart_engagements_participation", am4charts.PieChart);

        // Add data
        chart.data = [
            { "delivery": "Workshop", "reach": 460 },
            { "delivery": "Speaker", "reach": 1125 },
            { "delivery": "Kiosk", "reach": 800 },
            { "delivery": "Presentation", "reach": 1298 },
        ];

        // Set inner radius
        chart.innerRadius = am4core.percent(60);

        // Add and configure Series
        var pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "reach";
        pieSeries.dataFields.category = "delivery";
        pieSeries.slices.template.stroke = am4core.color("#4a2abb");
        pieSeries.slices.template.strokeWidth = 2;
        pieSeries.slices.template.strokeOpacity = 1;

        pieSeries.labels.template.disabled = true;
        pieSeries.ticks.template.disabled = true;

        // This creates initial animation
        pieSeries.hiddenState.properties.opacity = 1;
        pieSeries.hiddenState.properties.endAngle = -90;
        pieSeries.hiddenState.properties.startAngle = -90;

        var label = chart.seriesContainer.createChild(am4core.Label);
        label.textAlign = "middle";
        label.horizontalCenter = "middle";
        label.verticalCenter = "middle";
        label.adapter.add("text", function (text, target) {
            return "[bold font-size:30px]" + pieSeries.dataItem.values.value.sum + "[/]";
        })

        chart.legend = new am4charts.Legend();
        chart.legend.position = "left";
        chart.legend.maxWidth = 300;
    };

    am4core.ready(function () {
        build_chart_events_participation();
        build_chart_engagements_participation();

    }); // end am4core.ready()

    return {
        average: average,
        anomalies: anomalies
    }
})();

console.log(etDashboard.anomalies());
console.log(etDashboard.average()); 
