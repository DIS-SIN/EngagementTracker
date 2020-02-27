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
            { "id": "e_ip", "delivery": "In-Person", "reach": 0 },
            { "id": "e_vr", "delivery": "Virtual", "reach": 0 }
        ],
        get_chart_engagements_participation_data: [
            { "id": "n_dw", "delivery": "Workshop", "reach": 0 },
            { "id": "n_ds", "delivery": "Speaker", "reach": 0 },
            { "id": "n_dl", "delivery": "Kiosk", "reach": 0 },
            { "id": "n_dp", "delivery": "Presentation", "reach": 0 }
        ],
        get_chart_channels_thermo_data: [
            { "id": "c_ip", "metric": "In-Person", "reach": 0 },
            { "id": "c_vr", "metric": "Virtual", "reach": 0 },
            { "id": "c_br", "metric": "Busrides", "reach": 0 },
            { "id": "c_go", "metric": "GOAL\nOutreach", "reach": 0 },
            { "id": "c_id", "metric": "IoD", "reach": 0 },
            { "id": "c_tc", "metric": "[bold]Total\nChannel[\]", "reach": 0 },
            { "id": "c_te", "metric": "[bold]Total\nEngagement[\]", "reach": 0 },
            { "id": "c_to", "metric": "[bold]Total\nOutreach[\]", "reach": 0 }
        ],
        get_chart_engagement_thermo_data: [
            { "id": "e_ip", "category": "In-Person: 0k", "value": 0 / 25000 * 100, "full": 100 },
            { "id": "e_vr", "category": "Virtual: 0k", "value": 0 / 25000 * 100, "full": 100 },
            { "id": "e_go", "category": "Goal: 25k", "value": 0 / 25000 * 100, "full": 100 }
        ]
    };
    /*
    var adapter_data = {
        last_updated: "July, 26, 1983",
        key_stats: {
            total_outreach: "64.3K",
            events: "13,132",
            engagements: "3,422",
            busrides: "21,756",
            iod: "25,112"
        },
        get_chart_events_participation_data: [
            {
                "delivery": "In-Person",
                "reach": 1838
            }, {
                "delivery": "Virtual",
                "reach": 12565
            }
        ],
        get_chart_engagements_participation_data: [
            { "delivery": "Workshop", "reach": 460 },
            { "delivery": "Speaker", "reach": 1125 },
            { "delivery": "Kiosk", "reach": 800 },
            { "delivery": "Presentation", "reach": 1298 }
        ],
        get_chart_channels_thermo_data: [
            {
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
        ],
        get_chart_engagement_thermo_data: [
            {
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
            }
        ]
    };*/

    var split_raw_cell_data = function (tab_name) {
        var tab = document.getElementById(tab_name).value;
        tab = tab.split("\n");
        for (row in tab) {
            tab[row] = tab[row].split("\t");
        }
        return tab;
    };
    var convert_format_apijson_to_chartjson = function (merge) {
        // stub for api return
        return merge;
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
        merge.stats_last_updated = "March, 1, 2020";

        // map tab 1 data
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
        console.log("INFO: tab1 " + t1e + " Errors");
        console.log("INFO: tab2 " + t2e + " Errors");
        console.log("INFO: tab3 " + t3e + " Errors");
        console.log("INFO: Total " + totes + " Errors");

        if (totes == 0) {
            merge = process_aligned_rows(merge);
        }

        return merge;
    };
    var get_raw_data = function () {
        var merge = {
            tab1: split_raw_cell_data("summaryTabData"),
            tab2: split_raw_cell_data("engagementsTabData"),
            tab3: split_raw_cell_data("eventsTabData")
        }

        merge = convert_format_sheetpaste_to_chartjson(merge);

        return merge;
    };


    var format = function () {
        return JSON.stringify(get_raw_data());
    };

    var get_data = function () {
        return get_raw_data();
    };

    return {
        get_data: get_data,
        format: format
    }
})();

//console.log(etDataAdapter.get_data());
