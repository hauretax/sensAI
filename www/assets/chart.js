var xValues = [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150];
var yValues = [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15];

new Chart("edaChart", {
    type: "line",
    data: {
        datasets: [{
            backgroundColor: "rgba(255,255,255,0.50)",
            borderColor: "#33EE88",
            data: yValues
        }]
    },
});