var etDataAdapter = (function () {

    // Keep this variable private inside this closure scope
    var adapter_data_shell = {
        stats_last_updated: "...",
        stats_total_outreach: "...",
        stats_events: "...",
        stats_engagements: "...",
        stats_busrides: "...",
        stats_iod: "...",
        get_chart_events_participation_data: [
            { "id": "e_ip", "metric": "In-person", "reach": 0 }, //
            { "id": "e_vr", "metric": "Virtual", "reach": 0 }  //
        ],
        get_chart_engagements_participation_data: [
            { "id": "n_dw", "metric": "Workshop", "reach": 0 }, // 
            { "id": "n_ds", "metric": "Speaker", "reach": 0 }, //
            { "id": "n_dk", "metric": "Kiosk", "reach": 0 }, //
            { "id": "n_dp", "metric": "Presentation", "reach": 0 }, //
            { "id": "n_dm", "metric": "Meetup", "reach": 0 } //
        ],
        get_chart_channels_thermo_data: [
            { "id": "c_ip", "metric": "In-person", "reach": 0 }, //
            { "id": "c_vr", "metric": "Virtual", "reach": 0 }, //
            { "id": "c_br", "metric": "Busrides", "reach": 0 },
            { "id": "c_go", "metric": "GOAL\nOutreach", "reach": 0 },
            { "id": "c_id", "metric": "IoD", "reach": 0 },
            { "id": "c_tc", "metric": "[bold]Total\nChannel[\]", "reach": 0 },
            { "id": "c_te", "metric": "[bold]Total\nEngagement[\]", "reach": 0 },
            { "id": "c_to", "metric": "[bold]Total\nOutreach[\]", "reach": 0 }
        ],
        get_chart_engagement_thermo_data: [
            { "id": "e_ip", "metric": "In-person: 0k", "reach": 0 / 25000 * 100, "full": 100 }, //
            { "id": "e_vr", "metric": "Virtual: 0k", "reach": 0 / 25000 * 100, "full": 100 }, //
            { "id": "e_go", "metric": "Goal: 25k", "reach": 0 / 25000 * 100, "full": 100 }
        ]
    };

    var convert_format_apijson_to_chartjson = function (merge) {
        // stub for api return
        return merge;
    };

    var split_raw_cell_data = function (tab_name) {
        var tab = document.getElementById(tab_name).value;
        tab = tab.split("\n");
        for (row in tab) {
            tab[row] = tab[row].split("\t");
        }
        return tab;
    };

    var check_col_row_alignment = function (tab) {
        //console.log("tab1");
        var col_count = 0;
        var errors = 0;
        for (row in tab) {
            if (col_count == 0) {
                col_count = tab[row].length;
            }
            if (col_count != tab[row].length) {
                console.log("WARN: row " + row + " col check fail");
                console.log(tab[row]);
                errors++;
            }
        }
        return errors;
    };

    var process_aligned_rows = function (merge) {
        var tab1 = merge.tab1;
        var tab2 = merge.tab2;
        var tab3 = merge.tab3;

        // map excel cell data to our key object
        var cell_fxn_map = {
            "Engagement Activities": "stats_engagements",
            "Events": "stats_events",
            "Total1": "stats_total_engagements",
            //"Channels": "",
            "Busrides": "stats_busrides",
            "Innovate on Demand": "stats_iod",
            "Total2": "stats_total_channels",
            //"Digital Audiences": "",
            //"Slack": "",
            "Newsletters": "stats_newsletters",
            //"GCCollab": "",
            "Twitter(EN + FR)": "stats_twitter",
            "Total": "stats_total_digitalaudience",
            "Total Outreach": "stats_total_outreach"
        };

        // set update time
        let now = new Date();
        merge.stats_last_updated = (now.toISOString().split("T"))[0];

        // map tab 1 data
        //[0 Metric 1 Value]
        var total_counter = 0;
        for (let row = 0; row < tab1.length; row++) {
            var cell_id = tab1[row][0];
            if (cell_id == "Total Outreach") {
                merge[cell_fxn_map[cell_id]] = tab1[row + 1][1];
                break;
            }

            if (cell_id == "Total") {
                total_counter++;
                cell_id += total_counter;
            }

            if (typeof cell_fxn_map[cell_id] !== "undefined") {
                merge[cell_fxn_map[cell_id]] = tab1[row][1];
            }
        }

        // map tab 2 data
        //[ *0 "Date", 1 "Department and Event Name", *2 "Engagement Activity (Select only one: Speaker, Workshop, Presentation, Kiosk, Meetup)", 
        //  3 "Departmental Contact", 4 "Event link if applicable", 5 "Location", 6 "Language", *7 "# of attendees", 
        //  8 "DA Lead(s)", 9 "Estimated # of attendees"],
        // cols [0]temporal [2]filter [7]value
        var accumulator = {
            "Workshop": 0,
            "Speaker": 0,
            "Kiosk": 0,
            "Presentation": 0,
            "Meetup": 0
        };
        for (let row = 0; row < tab2.length; row++) {
            //get_chart_engagements_participation_data
            let val = parseInt(tab2[row][7], 10) || 0; // we're converting NaNs to 0 here (and more)
            //console.log(val);
            accumulator[tab2[row][2]] += val;
        }
        //console.log(accumulator);

        var replace_data_shell = function (merge, shell, id_in, label, usePct) {
            usePct = usePct ? usePct : false;
            let obj = merge[shell].find((o, i) => {
                if (o.id === id_in) {
                    if (usePct == true) {
                        merge[shell][i] = { id: id_in, metric: label + " " + (accumulator[label] / 1000).toFixed(1) + "K", reach: accumulator[label] / 25000 * 100, full: 100 };
                    } else {
                        merge[shell][i] = { id: id_in, metric: label, reach: accumulator[label] };
                    }
                    return true; // stop searching
                }
            });
        };
        replace_data_shell(merge, "get_chart_engagements_participation_data", "n_dw", "Workshop");
        replace_data_shell(merge, "get_chart_engagements_participation_data", "n_ds", "Speaker");
        replace_data_shell(merge, "get_chart_engagements_participation_data", "n_dk", "Kiosk");
        replace_data_shell(merge, "get_chart_engagements_participation_data", "n_dp", "Presentation");
        replace_data_shell(merge, "get_chart_engagements_participation_data", "n_dm", "Meetup");
        /*get_chart_engagements_participation_data: [
            { "id": "n_dw", "metric": "Workshop", "reach": 0 },
            { "id": "n_ds", "metric": "Speaker", "reach": 0 },
            { "id": "n_dl", "metric": "Kiosk", "reach": 0 },
            { "id": "n_dp", "metric": "Presentation", "reach": 0 },
            { "id": "n_dm", "metric": "Presentation", "reach": 0 }
        ],*/

        // map tab 3 data
        //[ *0 "Date", 1 "Event ", 2 "Description", *3 "In-person/ Virtual", 4 "Language", *5 "Virtual", *6 "In-person", 
        //  *7 "Total registrations"],
        // cols [0]temporal [3]broadfilter [5]value_class1 [6]value_class2 [7]sum(5,6)
        var accumulator = {
            "In-person": 0,
            "Virtual": 0,
            "Total": 0
        };
        var n_format = function (val) {
            return parseInt(val.split(",").join(""), 10);
        }
        accumulator["Busrides"] = n_format(merge.stats_busrides);
        accumulator["IoD"] = n_format(merge.stats_iod);
        accumulator["GOAL\nOutreach"] = 25000;
        accumulator["[bold]Total\nChannel[\]"] = n_format(merge.stats_busrides) + n_format(merge.stats_iod);
        accumulator["[bold]Total\nEngagement[\]"] = n_format(merge.stats_engagements);
        accumulator["[bold]Total\nOutreach[\]"] = n_format(merge.stats_total_outreach);
        //console.log(merge.stats_total_outreach);

        for (let row = 0; row < tab3.length; row++) {
            //get_chart_engagements_participation_data
            let val1 = parseInt(tab3[row][5], 10) || 0; // we're converting NaNs to 0 here (and more)
            let val2 = parseInt(tab3[row][6], 10) || 0; // we're converting NaNs to 0 here (and more)
            let val3 = parseInt(tab3[row][7], 10) || 0; // we're converting NaNs to 0 here (and more)
            let filter = tab3[row][3];
            //console.log(`${filter} ${val1} ${val2} ${val3}`);
            //console.log(val);
            if (["In-person", "Virtual", "In-person/Virtual"].includes(filter)) {
                accumulator["In-person"] += val2;
                accumulator["Virtual"] += val1;
                accumulator["Total"] += val3;
            }
        }
        //console.log(accumulator);
        //{ "id": "e_ip", "metric": "In-person", "reach": 0 },
        replace_data_shell(merge, "get_chart_events_participation_data", "e_ip", "In-person");
        replace_data_shell(merge, "get_chart_channels_thermo_data", "c_ip", "In-person");
        replace_data_shell(merge, "get_chart_engagement_thermo_data", "e_ip", "In-person", true);

        replace_data_shell(merge, "get_chart_events_participation_data", "e_vr", "Virtual");
        replace_data_shell(merge, "get_chart_channels_thermo_data", "c_vr", "Virtual");
        replace_data_shell(merge, "get_chart_engagement_thermo_data", "e_vr", "Virtual", true);

        replace_data_shell(merge, "get_chart_engagement_thermo_data", "e_go", "Total", true);

        replace_data_shell(merge, "get_chart_channels_thermo_data", "c_br", "Busrides");
        replace_data_shell(merge, "get_chart_channels_thermo_data", "c_go", "GOAL\nOutreach");
        replace_data_shell(merge, "get_chart_channels_thermo_data", "c_id", "IoD");

        replace_data_shell(merge, "get_chart_channels_thermo_data", "c_tc", "[bold]Total\nChannel[\]");
        replace_data_shell(merge, "get_chart_channels_thermo_data", "c_te", "[bold]Total\nEngagement[\]");
        replace_data_shell(merge, "get_chart_channels_thermo_data", "c_to", "[bold]Total\nOutreach[\]");


        return merge;
    };

    var convert_format_sheetpaste_to_chartjson = function (merge) {
        //merge = adapter_data_shell;
        Object.assign(merge, adapter_data_shell);

        //tab1
        var t1e = check_col_row_alignment(merge.tab1);
        var t2e = check_col_row_alignment(merge.tab2);
        var t3e = check_col_row_alignment(merge.tab3);
        var totes = t1e + t2e + t3e;


        if (totes == 0) {
            console.log("INFO: No errors detected");
            merge = process_aligned_rows(merge);
        } else {
            console.log("INFO: tab1 " + t1e + " Errors");
            console.log("INFO: tab2 " + t2e + " Errors");
            console.log("INFO: tab3 " + t3e + " Errors");
            console.log("INFO: Total " + totes + " Errors");
        }

        return merge;
    };

    // public functions    

    var format = function () {
        console.log("INFO: Format data object...");
        return "var global_tracker_data = " + JSON.stringify(get_raw_data(), null, 4) + ";\n";
    };

    var get_raw_data = function () {
        console.log("INFO: Get raw data object...");
        var merge = {
            tab1: split_raw_cell_data("summaryTabData"),
            tab2: split_raw_cell_data("engagementsTabData"),
            tab3: split_raw_cell_data("eventsTabData")
        }

        merge = convert_format_sheetpaste_to_chartjson(merge);

        // overwrite sheet data to shrink chart object
        merge.tab1 = "";
        merge.tab2 = "";
        merge.tab3 = "";

        return merge;
    };

    var get_data = function () {
        // from data/data.js
        console.log("INFO: Get data object...");
        return global_tracker_data;
    };

    return {
        get_data: get_data,
        get_raw_data: get_raw_data,
        format: format
    }
})();

//console.log(etDataAdapter.get_data());
