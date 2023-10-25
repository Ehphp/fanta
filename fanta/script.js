

const teamNames = ['juventus', 'milan', 'inter', 'napoli', 'roma'];
const credits = [120, 115, 110, 105, 100];
const slotP = [3, 2, 3, 2, 4];
const slotD = [7, 8, 6, 7, 8];
const slotC = [6, 7, 5, 6, 7];
const slotA = [4, 5, 4, 5, 3];

const attaccantiSerieA = {
    "Cristiano Ronaldo": 30,
    "Romelu Lukaku": 28,
    "Ciro Immobile": 27,
    "Dusan Vlahovic": 26,
    "Lautaro Martinez": 25,
    "Andrea Belotti": 24,
    "Josip Ilicic": 23,
    "Luis Muriel": 23,
    "Simy": 22,
    "Gianluca Scamacca": 22,
    "Giovanni Simeone": 21,
    "Arkadiusz Milik": 21,
    "Kevin Lasagna": 20,
    "Eduardo Salvio": 20,
    "Ante Rebic": 19,
    "Samuel Di Carmine": 19,
    "Fernando Llorente": 18,
    "Goran Pandev": 18,
    "Duvan Zapata": 17,
    "Riccardo Orsolini": 17
};

// Variabile globale per l'istanza del grafico
let myChart;
let myDoughnutChart



// creazione grafico  
function createDoughnutChart() {

    const ctx = document.getElementById('myDoughnutChart').getContext('2d');

    myDoughnutChart = new Chart(ctx, {

        type: 'doughnut',
        data: {
            labels: Object.keys(attaccantiSerieA), // Chiavi dell'array associativo come etichette
            datasets: [{
                label: 'Attaccanti rimanenti',
                data: Object.values(attaccantiSerieA), // Valori dell'array associativo come dati
                backgroundColor: [
                    'rgb(209,73,91)',
                    'rgb(75,40,64)',
                    'rgb(0 ,121,140)',
                    'rgb(48,99,142)',
                    'rgb(212,205,77)',
                    'rgb(37,109,27)',
                ],
            }],
        },

        options: {
            plugins: {
                legend: {
                    display: true,
                    
                    fullSize: false,
                    align: 'start',
                    fullSize: true,
                    labels: {
                        boxWidth: 50,
                        boxHeight: 10,
                        font: {
                            size:30,
                        }
                    }
                },
            },
        }
    });
};

// Funzione per creare il grafico
function createChart() {
    // if (myChart) {
    //     myChart.destroy();
    // }
    const ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: teamNames,
            datasets: [
                {
                    label: 'Portieri (P)',
                    data: slotP,
                    backgroundColor: 'rgba(0, 123, 255, 0.5)',
                },
                {
                    label: 'Difensori (D)',
                    data: slotD,
                    backgroundColor: 'rgba(255, 193, 7, 0.5)',
                },
                {
                    label: 'Centrocampisti (C)',
                    data: slotC,
                    backgroundColor: 'rgba(40, 167, 69, 0.5)',
                },
                {
                    label: 'Attaccanti (A)',
                    data: slotA,
                    backgroundColor: 'rgba(220, 53, 69, 0.5)',
                },
                {
                    label: 'Crediti Residui',
                    data: credits,
                    type: 'line',
                    borderColor: 'rgba(0, 0, 0, 0.7)',
                    fill: false,
                    yAxisID: 'y-axis-2'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        display: true,


                        font: {
                            weight: 'bold',
                            fontSize: 1,


                        }

                    }
                },
                y: {
                    display: false,
                },
                'y-axis-1': {
                    type: 'linear',
                    position: 'left',

                    ticks: {
                        display: true,
                        min: 0,
                        max: 10,
                        stepSize: 8,
                    },
                    grid: {
                        drawOnChartArea: true, // Nasconde le linee della griglia orizzontali
                    },
                },
                'y-axis-2': {
                    display: false,

                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',

                    fullSize: false,
                    labels: {
                        boxWidth: 20,
                        textAlign: 'right',

                    }
                }
            }
        }

    });
}
//Funzione per pulire il form dopo ogni aggiornamento o inserminto
function clearFormFields() {
    document.getElementById('teamName').value = '';
    document.getElementById('creditsTotal').value = "inserisci crediti residui";
    document.getElementById('slotP').value = "inserisci numero portieri svincolati";
    document.getElementById('slotD').value = "inserisci numero difensori svincolati";
    document.getElementById('slotC').value = "Inserisci numero centrocampisti svincolati";
    document.getElementById('slotA').value = "Inserisci numero attaccanti svincolati";
}
// Funzione per cancellare i dati dal grafico
function clearData() {
    myChart.data.labels = [];
    myChart.data.datasets.forEach((dataset) => {
        dataset.data = [];
    });
    myChart.update();

    const symbolContainer = document.getElementById('symbol-container');
    while (symbolContainer.firstChild) {
        symbolContainer.removeChild(symbolContainer.firstChild);
    }

    document.querySelector('input').value = ""
}

// Funzione per aggiungere una nuova squadra
function addTeam() {

    if (!validateFormFields()) {
        return;
    }

    const teamName = document.getElementById('teamName').value.toLowerCase()
    if (myChart.data.labels.includes(teamName)) {
        alert('Il nome della squadra esiste già.');
        return;
    }

    // // Aggiungi il simbolo colorato
    // const symbolContainer = document.getElementById('symbol-container');
    // const newSymbol = document.createElement('div');
    // newSymbol.style.width = '20px';
    // newSymbol.style.height = '20px';
    // let coloreSquadra = getRandomColor();
    // newSymbol.style.backgroundColor = coloreSquadra
    // newSymbol.title = teamName

    // lastIndexArray = (teamNames.length() - 1)
    // myChart[lastIndexArray].options.scales.ticks.color = coloreSquadra

    // // Aggiungi un listener dell'evento click al simbolo
    // newSymbol.addEventListener('click', function () {
    //     fillFormWithTeamData(teamName);
    // });

    // symbolContainer.appendChild(newSymbol);

    const creditsTotal = Number(document.getElementById('creditsTotal').value);
    const slotP = Number(document.getElementById('slotP').value);
    const slotD = Number(document.getElementById('slotD').value);
    const slotC = Number(document.getElementById('slotC').value);
    const slotA = Number(document.getElementById('slotA').value);




    myChart.data.labels.push(teamName);
    myChart.data.datasets[0].data.push(slotP);
    myChart.data.datasets[1].data.push(slotD);
    myChart.data.datasets[2].data.push(slotC);
    myChart.data.datasets[3].data.push(slotA);
    myChart.data.datasets[4].data.push(creditsTotal);


    clearFormFields();
    myChart.update();

}

// Funzione per generare un colore casuale
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Funzione per aggiornare una squadra esistente
function updateTeam() {

    if (!validateFormFields()) {
        return;
    }

    const teamName = document.getElementById('teamName').value.toLowerCase();
    const index = myChart.data.labels.indexOf(teamName);



    if (index !== -1) {
        const creditsTotal = Number(document.getElementById('creditsTotal').value);
        const slotP = Number(document.getElementById('slotP').value);
        const slotD = Number(document.getElementById('slotD').value);
        const slotC = Number(document.getElementById('slotC').value);
        const slotA = Number(document.getElementById('slotA').value);


        myChart.data.datasets[0].data[index] = slotP;
        myChart.data.datasets[1].data[index] = slotD;
        myChart.data.datasets[2].data[index] = slotC;
        myChart.data.datasets[3].data[index] = slotA;
        myChart.data.datasets[4].data[index] = creditsTotal;

        clearFormFields();


        myChart.update();


    } else {
        alert('Squadra non trovata.')
    }
}

// Funzione per rimuovere una squadra
function removeTeam() {
    const teamName = document.getElementById('teamName').value;
    if (!myChart.data.labels.includes(teamName)) {
        alert('Squadra non trovata.');
        return;
    }
    const index = myChart.data.labels.indexOf(teamName);

    if (index !== -1) {
        myChart.data.labels.splice(index, 1);
        myChart.data.datasets.forEach(dataset => {
            dataset.data.splice(index, 1);
        });

        myChart.update();
    } else {
        alert('Squadra non trovata.');
    }
    const symbolContainer = document.getElementById('symbol-container');
    while (symbolContainer.firstChild) {
        symbolContainer.removeChild(symbolContainer.firstChild);
    }
}
//funzione per validare form
function validateFormFields() {
    const teamName = document.getElementById('teamName').value;
    const creditsTotal = Number(document.getElementById('creditsTotal').value);
    const slotP = Number(document.getElementById('slotP').value);
    const slotD = Number(document.getElementById('slotD').value);
    const slotC = Number(document.getElementById('slotC').value);
    const slotA = Number(document.getElementById('slotA').value);

    if (!teamName || creditsTotal < 0 || slotP < 0 || slotD < 0 || slotC < 0 || slotA < 0) {
        alert('Per favore, inserisci tutti i campi correttamente.');
        return false;
    }
    return true;
}

function fillFormWithTeamData(teamName) {
    const index = myChart.data.labels.indexOf(teamName);
    if (index !== -1) {
        document.getElementById('teamName').value = teamName;
        document.getElementById('creditsTotal').value = myChart.data.datasets[4].data[index];
        document.getElementById('slotP').value = myChart.data.datasets[0].data[index];
        document.getElementById('slotD').value = myChart.data.datasets[1].data[index];
        document.getElementById('slotC').value = myChart.data.datasets[2].data[index];
        document.getElementById('slotA').value = myChart.data.datasets[3].data[index];
    }
}
// Aggiungi i listener per i pulsanti e crea il grafico iniziale
window.onload = function () {
    createChart();

    createDoughnutChart(attaccantiSerieA);

    document.getElementById('addTeamBtn').addEventListener('click', addTeam)
    document.getElementById('updateTeamBtn').addEventListener('click', updateTeam)
    document.getElementById('removeTeamBtn').addEventListener('click', removeTeam)
    document.getElementById('clearBtn').addEventListener('click', clearData)
}

