var etDataAdapter = (function () {

    // Keep this variable private inside this closure scope
    var adapter_data_shell = {
        last_updated: "...",
        key_stats: {
            total_outreach: "...",
            events: "...",
            engagements: "...",
            busrides: "...",
            iod: "..."
        },
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
    var convert_format_sheetpaste_to_chartjson = function (merge) {
        //merge = adapter_data_shell;
        Object.assign(merge, adapter_data_shell);

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

console.log(etDataAdapter.get_data());
