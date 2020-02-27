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

    var get_chart_events_participation_data = function () {
        return [{
            "delivery": "In-Person",
            "reach": 1838
        }, {
            "delivery": "Virtual",
            "reach": 12565
        }];
    }
    var build_chart_events_participation = function () {
        // Themes begin
        am4core.useTheme(am4themes_frozen);
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        var chart = am4core.create("chart_events_participation", am4charts.PieChart);

        // Add data
        chart.data = get_chart_events_participation_data();

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

    var get_chart_engagements_participation_data = function () {
        return [
            { "delivery": "Workshop", "reach": 460 },
            { "delivery": "Speaker", "reach": 1125 },
            { "delivery": "Kiosk", "reach": 800 },
            { "delivery": "Presentation", "reach": 1298 },
        ];
    }
    var build_chart_engagements_participation = function () {
        // Themes begin
        am4core.useTheme(am4themes_frozen);
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        var chart = am4core.create("chart_engagements_participation", am4charts.PieChart);

        // Add data
        chart.data = get_chart_engagements_participation_data();

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

    var get_chart_channels_thermo_data = function () {
        return [{
            "metric": "In-Person",
            "reach": 1800
        }, {
            "metric": "Virtual",
            "reach": 14000
        }, {
            "metric": "Busrides",
            "reach": 23000
        }, {
            "metric": "GOAL\nOutreach",
            "reach": 25000
        }, {
            "metric": "IoD",
            "reach": 35000
        }, {
            "metric": "[bold]Total\nChannel[\]",
            "reach": 55000
        }, {
            "metric": "[bold]Total\nEngagement[\]",
            "reach": 24000
        }, {
            "metric": "[bold]Total\nOutreach[\]",
            "reach": 65000
        }
        ];
    }
    var build_chart_channels_thermo = function () {


        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end


        var chart = am4core.create("chart_channels_thermo", am4charts.XYChart);

        chart.data = get_chart_channels_thermo_data();

        chart.padding(40, 40, 40, 40);

        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.dataFields.category = "metric";
        categoryAxis.renderer.minGridDistance = 60;
        categoryAxis.renderer.inversed = true;
        categoryAxis.renderer.grid.template.disabled = true;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;
        valueAxis.extraMax = 0.1;
        //valueAxis.rangeChangeEasing = am4core.ease.linear;
        //valueAxis.rangeChangeDuration = 1500;

        var series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.categoryX = "metric";
        series.dataFields.valueY = "reach";
        series.tooltipText = "{valueY.value}"
        series.columns.template.strokeOpacity = 0;
        series.columns.template.column.cornerRadiusTopRight = 10;
        series.columns.template.column.cornerRadiusTopLeft = 10;
        //series.interpolationDuration = 1500;
        //series.interpolationEasing = am4core.ease.linear;
        var labelBullet = series.bullets.push(new am4charts.LabelBullet());
        labelBullet.label.verticalCenter = "bottom";
        labelBullet.label.dy = -10;
        labelBullet.label.text = "{values.valueY.workingValue.formatNumber('#.')}";

        chart.zoomOutButton.disabled = true;

        // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
        series.columns.template.adapter.add("fill", function (fill, target) {
            return chart.colors.getIndex(target.dataItem.index);
        });

        /*setInterval(function () {
            am4core.array.each(chart.data, function (item) {
                item.reach += Math.round(Math.random() * 200 - 100);
                item.reach = Math.abs(item.reach);
            })
            chart.invalidateRawData();
        }, 2000)*/

        categoryAxis.sortBySeries = series;

    };

    var get_chart_engagement_thermo_data = function () {
        return [{
            "category": "In-Person: 1.5k",
            "value": 1500 / 25000 * 100,
            "full": 100
        }, {
            "category": "Virtual: 14k",
            "value": 14000 / 25000 * 100,
            "full": 100
        }, {
            "category": "Goal: 25k",
            "value": 15500 / 25000 * 100,
            "full": 100
        }];
    };
    var build_chart_engagement_thermo = function () {
        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        var chart = am4core.create("chart_engagement_thermo", am4charts.RadarChart);

        // Add data
        chart.data = get_chart_engagement_thermo_data();

        // Make chart not full circle
        chart.startAngle = -90;
        chart.endAngle = 180;
        chart.innerRadius = am4core.percent(20);

        // Set number format
        chart.numberFormatter.numberFormat = "#.#'%'";

        // Create axes
        var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "category";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.grid.template.strokeOpacity = 0;
        categoryAxis.renderer.labels.template.horizontalCenter = "right";
        categoryAxis.renderer.labels.template.fontWeight = 500;
        categoryAxis.renderer.labels.template.adapter.add("fill", function (fill, target) {
            return (target.dataItem.index >= 0) ? chart.colors.getIndex(target.dataItem.index) : fill;
        });
        categoryAxis.renderer.minGridDistance = 10;

        var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.grid.template.strokeOpacity = 0;
        valueAxis.min = 0;
        valueAxis.max = 100;
        valueAxis.strictMinMax = true;

        // Create series
        var series1 = chart.series.push(new am4charts.RadarColumnSeries());
        series1.dataFields.valueX = "full";
        series1.dataFields.categoryY = "category";
        series1.clustered = false;
        series1.columns.template.fill = new am4core.InterfaceColorSet().getFor("alternativeBackground");
        series1.columns.template.fillOpacity = 0.08;
        series1.columns.template.cornerRadiusTopLeft = 20;
        series1.columns.template.strokeWidth = 0;
        series1.columns.template.radarColumn.cornerRadius = 20;

        var series2 = chart.series.push(new am4charts.RadarColumnSeries());
        series2.dataFields.valueX = "value";
        series2.dataFields.categoryY = "category";
        series2.clustered = false;
        series2.columns.template.strokeWidth = 0;
        series2.columns.template.tooltipText = "{category}: [bold]{value}[/]";
        series2.columns.template.radarColumn.cornerRadius = 20;

        series2.columns.template.adapter.add("fill", function (fill, target) {
            return chart.colors.getIndex(target.dataItem.index);
        });

        // Add cursor
        chart.cursor = new am4charts.RadarCursor();

    };

    am4core.ready(function () {
        build_chart_events_participation();
        build_chart_engagements_participation();
        build_chart_engagement_thermo();
        build_chart_channels_thermo();
    }); // end am4core.ready()

    return {
        average: average,
        anomalies: anomalies
    }
})();

console.log(etDashboard.anomalies());
console.log(etDashboard.average()); 
