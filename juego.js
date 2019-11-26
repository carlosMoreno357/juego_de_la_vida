console.log("----- Juego de la vida Inicializado -----");

!function(){

    var btnGenerar = document.querySelector('#generar');
    var btnComenzar = document.querySelector('#comenzar');
    var btnParar = document.querySelector('#parar');
    var btnLimpiar = document.querySelector('#limpiar');

    var estado = {
        activo: false,
        celulas_vivas: {
            anteriores: [],
            actuales: []
        }
    };

    var tam_celula = 5;
    
    var tablero = document.querySelector('#tablero');
    var tableroContexto = tablero.getContext('2d');

    tablero.style.backgroundColor = '#000';
    tableroContexto.fillStyle = '#fff';
    
}();