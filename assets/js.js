// Variables globales
let valorPantalla = '0';
let operacionPendiente = null;
let valorAnterior = 0;
let reiniciarPantalla = false;
alert("Bienvenido a la calculadora! Usa los botones para realizar operaciones.");

// Elemento de la pantalla
const pantalla = document.getElementById('pantalla');

// Actualiza el contenido de la pantalla
function actualizarPantalla() {
    pantalla.textContent = valorPantalla;
}

// Agrega un número a la pantalla
function agregarNumero(numero) {
    if (valorPantalla === '0' || reiniciarPantalla) {
        valorPantalla = numero;
        reiniciarPantalla = false;
    } else {
        valorPantalla += numero;
    }
    actualizarPantalla();
}

// Agrega un punto decimal
function agregarPunto() {
    if (reiniciarPantalla) {
        valorPantalla = '0.';
        reiniciarPantalla = false;
    } else if (!valorPantalla.includes('.')) {
        valorPantalla += '.';
    }
    actualizarPantalla();
}

// Limpia la calculadora
function limpiar() {
    valorPantalla = '0';
    operacionPendiente = null;
    valorAnterior = 0;
    actualizarPantalla();
}

// Cambia el signo del número en pantalla
function cambiarSigno() {
    valorPantalla = (parseFloat(valorPantalla) * -1).toString();
    actualizarPantalla();
}

// Calcula el porcentaje
function porcentaje() {
    valorPantalla = (parseFloat(valorPantalla) / 100).toString();
    actualizarPantalla();
}

// Prepara para una operación
function operacion(op) {
    const valorActual = parseFloat(valorPantalla);
    
    if (operacionPendiente !== null) {
        calcular();
    } else {
        valorAnterior = valorActual;
    }
    
    operacionPendiente = op;
    reiniciarPantalla = true;
}

// Realiza el cálculo
function calcular() {
    if (operacionPendiente === null) return;
    
    const valorActual = parseFloat(valorPantalla);
    let resultado;
    
    switch (operacionPendiente) {
        case '+':
            resultado = valorAnterior + valorActual;
            break;
        case '-':
            resultado = valorAnterior - valorActual;
            break;
        case '*':
            resultado = valorAnterior * valorActual;
            break;
        case '/':
            if (valorActual === 0) {
                resultado = 'Error';
            } else {
                resultado = valorAnterior / valorActual;
            }
            break;
        default:
            return;
    }
    
    valorPantalla = resultado.toString();
    operacionPendiente = null;
    reiniciarPantalla = true;
    actualizarPantalla();
    valorAnterior = resultado === 'Error' ? 0 : resultado;
}