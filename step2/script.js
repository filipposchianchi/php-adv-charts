function graphLine(data) {
    var ctx = document.getElementById('grafico-line').getContext('2d');
    var myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: moment.months(),
            datasets: [{
                label: "Vendite",
                data: data.fatturato.data,
                backgroundColor: "green",
                borderColor: "rgba(183,28,28,1)",
                borderWidth: 3
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

function graphTorta(data) {
    var ctx = document.getElementById('grafico-torta').getContext('2d');
    var myChart = new Chart(ctx, {
        type: "pie",
        data: {
            datasets: [{
                data: Object.values(data.fatturato_by_agent.data),

                backgroundColor: "yellow",
                borderColor: "rgba(183,28,28,1)",
                borderWidth: 3
            }],
            labels: Object.keys(data.fatturato_by_agent.data)
        },
        options: Chart.defaults.pie
    });
}

function getData() {
    $.ajax({   
        url: "server.php",
        method: "GET",
    success: function(data) {      
                graphLine(data);
                graphTorta(data);
                
               
            },
    error: function(error) {      
                console.log("error", error);
            }
  });
}

function init () {
    getData();

}

$(document).ready(init);