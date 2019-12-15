function graphLine(data) {
    var ctx = document.getElementById('grafico-line').getContext('2d');
    var myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: moment.months(),
            datasets: [{
                label: "Vendite",
                data: data.data,
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
                data: Object.values(data.data),
                backgroundColor: "yellow",
                borderColor: "rgba(183,28,28,1)",
                borderWidth: 3
            }],
            labels: Object.keys(data.data)
        },
        options: Chart.defaults.pie
    });
}

function terzoGraph(data) {

    var graphType = data['type'];
    var myLabels = Object.keys(data['data']);
    
    var team1 = myLabels[0],
        team2 = myLabels[1],
        team3 = myLabels[2];

    var value1 = Object.values(data['data']['Team1']),
        value2 = Object.values(data['data']['Team2']),
        value3 = Object.values(data['data']['Team3']);

        var ctx = document.getElementById('grafico-line2')
    new Chart(ctx, {
        type: graphType,
        data: {
            labels: moment.months(),
            datasets: [
                {
                    label: team1,
                    data: value1,
                    borderColor: 'blue'
                },
                {
                    label: team2,
                    data: value2,
                    borderColor: 'green'
                },
                {
                    label: team3,
                    data: value3,
                    borderColor: 'orange'
                }
            ]
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


function getDataByAccess(livello) {
    $.ajax({   
        url: "server.php",
        method: "GET",
        data: {
            level: livello
           },
    success: function(data) {      
                console.log(data)

                switch (data.length) {
                    case 1:
                        graphLine(data[0]);
                        break;
    
                    case 2:
                        graphLine(data[0]);
                        graphTorta(data[1]);
                        break;
    
                    case 3:
                        graphLine(data[0]);
                        graphTorta(data[1]);
                        terzoGraph(data[2]);
                        break;
                    
                    default:
                        graphLine(data[0]);
                }

            },
    error: function(error) {      
                console.log("error", error);
            }
  });
}




function init () {
    var livello = window.location.search.substring(8);
    getDataByAccess(livello);
    
}

$(document).ready(init);