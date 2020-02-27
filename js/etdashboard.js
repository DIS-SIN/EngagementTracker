var etDashboard = (function () {

    // from: etdataadapter.js
    var chart_data = etDataAdapter.get_data()

    var update_data = function (newdata) {
        console.log("INFO: Update data object...");
        chart_data = newdata;
    };

    var k_format = function (val) {
        return (parseInt(val.split(",").join(""), 10) / 1000).toFixed(1) + "K";
    };

    var build_summary_header = function () {
        document.getElementById("stats_last_updated").innerText = chart_data.stats_last_updated;
        document.getElementById("stats_total_outreach").innerText = k_format(chart_data.stats_total_outreach)
        document.getElementById("stats_events").innerText = k_format(chart_data.stats_events);
        document.getElementById("stats_engagements").innerText = k_format(chart_data.stats_engagements);
        document.getElementById("stats_busrides").innerText = k_format(chart_data.stats_busrides);
        document.getElementById("stats_iod").innerText = k_format(chart_data.stats_iod);
    };

    /*[{
    "metric": "In-Person",
    "reach": 1838
    }, {
    "metric": "Virtual",
    "reach": 12565
    }];*/
    var get_chart_events_participation_data = function () {
        return chart_data.get_chart_events_participation_data;
    };
    var g_chart_events_participation = null;
    var g_chart_events_participation_label = null;
    var build_chart_events_participation = function () {
        // Themes begin
        am4core.useTheme(am4themes_frozen);
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        var chart = am4core.create("chart_events_participation", am4charts.PieChart);
        g_chart_events_participation = chart;
        // Add data
        chart.data = get_chart_events_participation_data();

        // Set inner radius
        chart.innerRadius = am4core.percent(60);

        // Add and configure Series
        var pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "reach";
        pieSeries.dataFields.category = "metric";
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
        g_chart_events_participation_label = label;
        label.textAlign = "middle";
        label.horizontalCenter = "middle";
        label.verticalCenter = "middle";
        label.adapter.add("text", function (text, target) {
            return "[bold font-size:30px]" + (pieSeries.dataItem.values.value.sum / 1000).toFixed(1) + "K" + "[/]";
        })

        chart.legend = new am4charts.Legend();
        chart.legend.position = "left";
        chart.legend.maxWidth = 300;
    };

    /*[
    { "metric": "Workshop", "reach": 460 },
    { "metric": "Speaker", "reach": 1125 },
    { "metric": "Kiosk", "reach": 800 },
    { "metric": "Presentation", "reach": 1298 },
    ];*/
    var get_chart_engagements_participation_data = function () {
        return chart_data.get_chart_engagements_participation_data;
    }
    var g_chart_engagements_participation = null;
    var g_chart_engagements_participation_label = null;
    var build_chart_engagements_participation = function () {
        // Themes begin
        am4core.useTheme(am4themes_frozen);
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        var chart = am4core.create("chart_engagements_participation", am4charts.PieChart);
        g_chart_engagements_participation = chart;
        // Add data
        chart.data = get_chart_engagements_participation_data();

        // Set inner radius
        chart.innerRadius = am4core.percent(60);

        // Add and configure Series
        var pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "reach";
        pieSeries.dataFields.category = "metric";
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
        g_chart_engagements_participation_label = label;
        label.textAlign = "middle";
        label.horizontalCenter = "middle";
        label.verticalCenter = "middle";
        label.adapter.add("text", function (text, target) {
            return "[bold font-size:30px]" + (pieSeries.dataItem.values.value.sum / 1000).toFixed(1) + "K" + "[/]";
        })

        chart.legend = new am4charts.Legend();
        chart.legend.position = "left";
        chart.legend.maxWidth = 300;
    };

    /*[{
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
    ];*/
    var get_chart_channels_thermo_data = function () {
        return chart_data.get_chart_channels_thermo_data;
    }
    var g_chart_channels_thermo = null;
    var build_chart_channels_thermo = function () {
        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end
        var chart = am4core.create("chart_channels_thermo", am4charts.XYChart);
        g_chart_channels_thermo = chart;

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
        series.tooltipText = "{valueY.reach}"
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

        categoryAxis.sortBySeries = series;

    };

    /*[{
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
    }];*/
    var get_chart_engagement_thermo_data = function () {
        return chart_data.get_chart_engagement_thermo_data;
    };
    var g_chart_engagement_thermo = null;
    var build_chart_engagement_thermo = function () {
        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        var chart = am4core.create("chart_engagement_thermo", am4charts.RadarChart);
        g_chart_engagement_thermo = chart;
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
        categoryAxis.dataFields.category = "metric";
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
        series1.dataFields.categoryY = "metric";
        series1.clustered = false;
        series1.columns.template.fill = new am4core.InterfaceColorSet().getFor("alternativeBackground");
        series1.columns.template.fillOpacity = 0.08;
        series1.columns.template.cornerRadiusTopLeft = 20;
        series1.columns.template.strokeWidth = 0;
        series1.columns.template.radarColumn.cornerRadius = 20;

        var series2 = chart.series.push(new am4charts.RadarColumnSeries());
        series2.dataFields.valueX = "reach";
        series2.dataFields.categoryY = "metric";
        series2.clustered = false;
        series2.columns.template.strokeWidth = 0;
        series2.columns.template.tooltipText = "{metric}: [bold]{reach}[/]";
        series2.columns.template.radarColumn.cornerRadius = 20;

        series2.columns.template.adapter.add("fill", function (fill, target) {
            return chart.colors.getIndex(target.dataItem.index);
        });

        // Add cursor
        chart.cursor = new am4charts.RadarCursor();

    };

    /*
    [{
        "date": "6/20/1994",
        "reach": 1587
    }, {
        "date": "6/20/1995",
        "reach": 8567
    }];
    */
    var get_chart_timeline_data = function () {
        return chart_data.get_chart_timeline_data;
    };
    var g_chart_timeline = null;
    var build_chart_timeline = function () {

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        var chart = am4core.create("chart_timeline", am4charts.XYChart);
        g_chart_timeline = chart;

        chart.data = get_chart_timeline_data();
        chart.dateFormatter.inputDateFormat = "M/d/yyyy";
        var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.minGridDistance = 60;
        dateAxis.startLocation = 0.5;
        dateAxis.endLocation = 0.5;
        dateAxis.baseInterval = {
            timeUnit: "day",
            count: 1
        }

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;

        var series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = "date";
        series.name = "reach";
        series.dataFields.valueY = "reach";
        series.tooltipHTML = "<span style='font-size:14px; color:#000000;'><b>{valueY.value}</b></span>";
        series.tooltipText = "[#000]{valueY.value}[/]";
        series.tooltip.background.fill = am4core.color("#FFF");
        series.tooltip.getStrokeFromObject = true;
        series.tooltip.background.strokeWidth = 3;
        series.tooltip.getFillFromObject = false;
        series.fillOpacity = 0.6;
        series.strokeWidth = 2;
        series.stacked = true;
        /*
        var series2 = chart.series.push(new am4charts.LineSeries());
        series2.name = "motorcycles";
        series2.dataFields.dateX = "year";
        series2.dataFields.valueY = "motorcycles";
        series2.tooltipHTML = "<img src='https://www.amcharts.com/lib/3/images/motorcycle.png' style='vertical-align:bottom; margin-right: 10px; width:28px; height:21px;'><span style='font-size:14px; color:#000000;'><b>{valueY.value}</b></span>";
        series2.tooltipText = "[#000]{valueY.value}[/]";
        series2.tooltip.background.fill = am4core.color("#FFF");
        series2.tooltip.getFillFromObject = false;
        series2.tooltip.getStrokeFromObject = true;
        series2.tooltip.background.strokeWidth = 3;
        series2.sequencedInterpolation = true;
        series2.fillOpacity = 0.6;
        series2.stacked = true;
        series2.strokeWidth = 2;

        var series3 = chart.series.push(new am4charts.LineSeries());
        series3.name = "bicycles";
        series3.dataFields.dateX = "year";
        series3.dataFields.valueY = "bicycles";
        series3.tooltipHTML = "<img src='https://www.amcharts.com/lib/3/images/bicycle.png' style='vertical-align:bottom; margin-right: 10px; width:28px; height:21px;'><span style='font-size:14px; color:#000000;'><b>{valueY.value}</b></span>";
        series3.tooltipText = "[#000]{valueY.value}[/]";
        series3.tooltip.background.fill = am4core.color("#FFF");
        series3.tooltip.getFillFromObject = false;
        series3.tooltip.getStrokeFromObject = true;
        series3.tooltip.background.strokeWidth = 3;
        series3.sequencedInterpolation = true;
        series3.fillOpacity = 0.6;
        series3.defaultState.transitionDuration = 1000;
        series3.stacked = true;
        series3.strokeWidth = 2;
        */
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.xAxis = dateAxis;
        chart.scrollbarX = new am4core.Scrollbar();

        // Add a legend
        chart.legend = new am4charts.Legend();
        chart.legend.position = "bottom";

        // axis ranges
        /*
        var range = dateAxis.axisRanges.create();
        range.date = new Date(2001, 0, 1);
        range.endDate = new Date(2003, 0, 1);
        range.axisFill.fill = chart.colors.getIndex(7);
        range.axisFill.fillOpacity = 0.2;

        range.label.text = "Fines for speeding increased";
        range.label.inside = true;
        range.label.rotation = 90;
        range.label.horizontalCenter = "right";
        range.label.verticalCenter = "bottom";

        var range2 = dateAxis.axisRanges.create();
        range2.date = new Date(2007, 0, 1);
        range2.grid.stroke = chart.colors.getIndex(7);
        range2.grid.strokeOpacity = 0.6;
        range2.grid.strokeDasharray = "5,2";


        range2.label.text = "Motorcycle fee introduced";
        range2.label.inside = true;
        range2.label.rotation = 90;
        range2.label.horizontalCenter = "right";
        range2.label.verticalCenter = "bottom";
        */
    };

    var init_charts = function () {
        build_summary_header();
        build_chart_events_participation();
        build_chart_engagements_participation();
        build_chart_engagement_thermo();
        build_chart_channels_thermo();
        build_chart_timeline();
    };
    var refresh_charts = function () {
        console.log("INFO: Refresh Data...");
        build_summary_header();

        // invalidate labels to redraw
        g_chart_events_participation_label.deepInvalidate();
        g_chart_engagements_participation_label.deepInvalidate();

        //console.log(g_chart_engagement_thermo.data)
        //console.log(get_chart_engagement_thermo_data())
        g_chart_engagement_thermo.data = get_chart_engagement_thermo_data();
        //console.log(g_chart_engagement_thermo.data)
        g_chart_channels_thermo.data = get_chart_channels_thermo_data();
        g_chart_engagements_participation.data = get_chart_engagements_participation_data();
        g_chart_events_participation.data = get_chart_events_participation_data();

        g_chart_timeline.data = get_chart_timeline_data();

        /*
        //let pieSeries = g_chart_engagements_participation.series;
        let label = g_chart_engagements_participation.seriesContainer.createChild(am4core.Label);
        label.textAlign = "middle";
        label.horizontalCenter = "middle";
        label.verticalCenter = "middle";
        label.adapter.add("text", function (text, target) {
            return "[bold font-size:30px]" + (g_chart_engagements_participation.series.dataItem.values.value.sum / 1000).toFixed(1) + "S" + "[/]";
        })*/
    }

    am4core.ready(function () {
        init_charts();
    }); // end am4core.ready()

    return {
        init: init_charts,
        refresh: refresh_charts,
        update: update_data
    }
})();

//console.log(etDashboard.anomalies());
//console.log(etDashboard.average());

// bind format button
document.addEventListener('click', function (event) {
    // If the clicked element doesn't have the right selector, bail
    if (!event.target.matches('#format_data')) return;
    // Don't follow the link
    event.preventDefault();

    etDashboard.update(etDataAdapter.get_raw_data());
    document.getElementById("outputDataJSON").value = etDataAdapter.format();
    etDashboard.refresh();
}, false);

// autorefresh
setInterval(function () {
    console.log("INFO: Refreshing...");
    window.location.reload()
}, 60000 * 10); // update every 10 mins
