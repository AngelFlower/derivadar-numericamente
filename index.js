function obtenerFuncion() {
    var funcion = document.getElementById('funcion').value
    console.log(funcion);

    var x = document.getElementById('x').value
    var h = parseFloat(document.getElementById('h').value)
    var x1, xh1, aproximado
    switch (funcion) {
        case 'exp[x]':
            limpiarTabla()
            for (var i = 0; i <= x; i++) {
                xh1 = Math.exp((i + h))
                x1 = Math.exp(i)
                aproximado = (xh1 - x1) / h
                console.log(xh1)
                //console.log(aproximado)
                insertarFila(aproximado)
                //insertarFila(h)
            }
            break
        case 'tan(x)':
            limpiarTabla()
            for (var i = 0; i <= x; i++) {
                xh = Math.tan((i + h))
                x1 = Math.tan(i)
                aproximado = (xh - x1) / h
                //console.log(aproximado)
                insertarFila(aproximado)
            }
            break
        case 'x^3 + 2x^2 + 6':
            limpiarTabla()
            var xh1, xh2, x2
            for (var i = 0; i <= x; i++) {
                xh1 = (i + h) ** 3
                xh2 = (i + h) ** 2
                x1 = i ** 3
                x2 = i ** 2
                aproximado = ((xh1 + (2 * xh2) + 6) - (x1 + (2 * x2) + 6)) / h
                //console.log(aproximado)
                insertarFila(aproximado)
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
}