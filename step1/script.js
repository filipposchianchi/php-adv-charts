
function graph(data) {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: moment.months(),
            datasets: [{
                label: 'Vendite',
                data: data,
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

function getData() {
    $.ajax({   
        url: "getAllData.php",
        method: "GET",
    success: function(data) {      
                graph(data);
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