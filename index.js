function obtenerFuncion() {
    var funcion = document.getElementById('funcion').value
    console.log(funcion);

    var x = document.getElementById('x').value
    var h = parseFloat(document.getElementById('h').value)
    var intervaloMin = document.getElementById('intervaloMin').value
    console.log('intervalo min' + intervaloMin)
    var intervaloMax = document.getElementById('intervaloMax').value
    var sumatoria = (intervaloMax - intervaloMin) / x
    console.log(sumatoria)
    var x1, xh1, aproximado
    switch (funcion) {
        case 'exp[x]':
            limpiarTabla()
            for (var i = parseFloat(intervaloMin); i < intervaloMax; (i = parseFloat(i) + parseFloat(sumatoria))) {
                xh1 = Math.exp((i + h))
                x1 = Math.exp(i)
                aproximado = (xh1 - x1) / h
                console.log(xh1)
                //console.log(aproximado)
                insertarFila(`${i}  ${aproximado}`)
            }
            break
        case 'tan(x)':
            limpiarTabla()
            for (var i = parseFloat(intervaloMin); i < intervaloMax; (i = parseFloat(i) + parseFloat(sumatoria))) {
                xh = Math.tan((i + h))
                x1 = Math.tan(i)
                aproximado = (xh - x1) / h
                //console.log(aproximado)
                insertarFila(`${i}  ${aproximado}`)
            }
            break
        case 'x^3 + 2x^2 + 6':
            limpiarTabla()
            var xh1, xh2, x2
            for (var i = parseFloat(intervaloMin); i < intervaloMax; (i = parseFloat(i) + parseFloat(sumatoria))) {
                xh1 = (i + h) ** 3
                xh2 = (i + h) ** 2
                x1 = i ** 3
                x2 = i ** 2
                aproximado = ((xh1 + (2 * xh2) + 6) - (x1 + (2 * x2) + 6)) / h
                //console.log(aproximado)
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
    obtenerFila()
    saveTextAsFile()
}

function obtenerFila() {
    var tablaBody = document.getElementById('resultados').getElementsByTagName('tbody')[0]
    var tablaFilas = tablaBody.getElementsByTagName('tr');
    var filasContador = tablaFilas.length;
    var texto = ''
    for (var x = 0; x < filasContador; x++) {
        texto = texto +  '\n'  + (tablaFilas[x].textContent);
    }
    return texto
}
function saveTextAsFile(){
    var textToSave = obtenerFila()
    var textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});
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