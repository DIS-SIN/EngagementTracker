var etDataAdapter = (function () {

    // Keep this variable private inside this closure scope
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
    };

    var get_raw_data = function () {
        var tab1 = document.getElementById("summaryTabData").value;
        var tab2 = document.getElementById("engagementsTabData").value;
        var tab3 = document.getElementById("eventsTabData").value;

        return tab1 + "\n" + tab2 + "\n" + tab3;
    };


    var format = function () {
        return get_raw_data();
    };

    var get_data = function () {
        return adapter_data;
    };

    return {
        get_data: get_data,
        format: format
    }
})();

console.log(etDataAdapter.get_data());
