var intervaloMin
var intervaloMax
let intervaloArray = []

function obtenerFuncion() {
    let aproximadoArray = []
    intervaloArray = []

    var funcion = document.getElementById('funcion').value
    var x = document.getElementById('x').value
    var h = parseFloat(document.getElementById('h').value)
    intervaloMin = document.getElementById('intervaloMin').value
    intervaloMax = document.getElementById('intervaloMax').value
    var sumatoria = (intervaloMax - intervaloMin) / x
    var x1, xh1, aproximado

    let funcionGraficar, derivadaGraficar, derivada
    switch (funcion) {
        case 'exp[x]':
            derivada = "f'(x) = exp[x]"
            funcionGraficar = function (x) { return Math.exp(x)}
            derivadaGraficar = function (x) { return Math.exp(x)}
            limpiarTabla()
            for (var i = parseFloat(intervaloMin); i < intervaloMax; (i = parseFloat(i) + parseFloat(sumatoria))) {
                xh1 = Math.exp((i + h))
                x1 = Math.exp(i)
                aproximado = (xh1 - x1) / h
                console.log(xh1)
                aproximadoArray.push(aproximado)
                intervaloArray.push(i)
                insertarFila(`${i}  ${aproximado}`)
            }
            break
        case 'tan(x)':
            derivada = "f'(x) = sec^2[x]"
            funcionGraficar = function (x) { return Math.tan(x)}
            derivadaGraficar = function (x) { return math.sec(x)**2}
            limpiarTabla()
            for (var i = parseFloat(intervaloMin); i < intervaloMax; (i = parseFloat(i) + parseFloat(sumatoria))) {
                xh = Math.tan((i + h))
                x1 = Math.tan(i)
                aproximado = (xh - x1) / h
                aproximadoArray.push(aproximado)
                intervaloArray.push(i)
                insertarFila(`${i}  ${aproximado}`)
            }
            break
        case 'x^3 + 2x^2 + 6':
            derivada = "f'(x) = 3x^2 + 4x"
            funcionGraficar = function (x) { return x**3 + 2*x**2 + 6}
            derivadaGraficar = function (x) { return 3*x**2 + 4*x}
            limpiarTabla()
            var xh1, xh2, x2
            for (var i = parseFloat(intervaloMin); i <= intervaloMax; (i = parseFloat(i) + parseFloat(sumatoria))) {
                xh1 = (i + h) ** 3
                xh2 = (i + h) ** 2
                x1 = i ** 3
                x2 = i ** 2
                aproximado = ((xh1 + (2 * xh2) + 6) - (x1 + (2 * x2) + 6)) / h
                aproximadoArray.push(aproximado)
                intervaloArray.push(i)
                insertarFila(`${i}  ${aproximado}`)
            }
            break
    }

    function insertarFila(valor) {
        var tablaBody = document.getElementById('resultados').getElementsByTagName('tbody')[0]
        var nuevaFila = tablaBody.insertRow()
        var nuevaCelda = nuevaFila.insertCell()
        nuevaCelda.appendChild(document.createTextNode(valor))
    }

    function limpiarTabla() {
        var tablaBody = document.getElementById('resultados').getElementsByTagName('tbody')[0]
        var tablaFilas = tablaBody.getElementsByTagName('tr');
        var filasContador = tablaFilas.length;

        for (var x = filasContador - 1; x > 0; x--) {
            tablaBody.removeChild(tablaFilas[x]);
        }
    }

    graficar(funcion, funcionGraficar, derivada, derivadaGraficar, aproximadoArray)
}

function obtenerFila() {
    var tablaBody = document.getElementById('resultados').getElementsByTagName('tbody')[0]
    var tablaFilas = tablaBody.getElementsByTagName('tr');
    var filasContador = tablaFilas.length;
    var texto = ''
    for (var x = 0; x < filasContador; x++) {
        texto = texto + '\n' + (tablaFilas[x].textContent);
    }
    return texto
}

function darcargarArchivo() {
    var textToSave = obtenerFila()
    var textToSaveAsBlob = new Blob([textToSave], { type: "text/plain" });
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    var fileNameToSaveAs = "derivada";

    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    //downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);

    downloadLink.click();
}

function graficar( funcion, funcionGraficar, derivada, derivadaGraficar, aproximado) {
    
    var ctx = document.getElementById("myChart");
    var data = {
        labels: intervaloArray,
        datasets: [{
            label: `f(x) = ${funcion}`,
            function: funcionGraficar,
            borderColor: "rgba(75, 192, 192, 1)",
            data: [],
            fill: false
        },
        {
            label: derivada,
            function: derivadaGraficar,
            borderColor: "rgba(75, 192, 12, 1)",
            data: [],
            fill: false
        },
        {
            label: "Aproximado",
            borderColor: "rgba(255, 206, 86, 1)",
            data: aproximado,
            fill: true
        }]
    };


    Chart.pluginService.register({
        beforeInit: function (chart) {
            var data = chart.config.data;
            for (let i = 0; i < 2; i++) {                
                for (var j = 0; j < data.labels.length; j++) {
                    var fct = data.datasets[i].function,
                        x = data.labels[j],
                        y = fct(x);
                    data.datasets[i].data.push(y);
                }
            }
        }
    });


    var myBarChart = new Chart(ctx, {
        type: 'line',
        data: data,
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