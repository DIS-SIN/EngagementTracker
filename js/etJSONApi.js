var etJSONApi = (function () {
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
    return {
        average: average,
        anomalies: anomalies
    }
})();
console.log(etJSONApi.anomalies());
console.log(etJSONApi.average()); 