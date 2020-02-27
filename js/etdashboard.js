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

    var init_charts = function () {
        build_summary_header();
        build_chart_events_participation();
        build_chart_engagements_participation();
        build_chart_engagement_thermo();
        build_chart_channels_thermo();
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
}, 600000); // update every 10 mins
