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


    //Funciones de tablero y dibujo
    function getTamTablero() {
        return {
            w: tablero.width,
            h: tablero.height
        };
    }

    function posToStr(pos) {
        return pos.x + ',' + pos.y;
    }

    function strToPos(pos) {
        var arrPos = pos.split(',');
        return {
            x: parseInt(arrPos[0]),
            y: parseInt(arrPos[1])
        };
    }

    function dibujarCelula(pos) {
        var strPos = posToStr(pos);
        tableroContexto.fillRect(pos.x, pos.y, tam_celula, tam_celula);
        if (estado.celulas_vivas.actuales.indexOf(strPos) < 0) {
            estado.celulas_vivas.actuales.push(strPos);
        }
    }

    ///////////// Terminan funciones de tablero y dibujo //////////////

    btnGenerar.addEventListener('click', (e) => {
        var tamTablero = getTamTablero();
        if (estado.activo) return;
        
        var totalCelulasGeneradas = Math.floor((Math.random() * tamTablero.w) + 1) + 1;
        var celulaTemp = {x: 0, y:0};

        var randomB = {
            x: Math.ceil(tamTablero.w / tam_celula),
            y: Math.ceil(tamTablero.h / tam_celula)
        };

        while (totalCelulasGeneradas--) {
            celulaTemp.x = Math.floor(Math.random() * randomB.x) * tam_celula;
            celulaTemp.y = Math.floor(Math.random() * randomB.y) * tam_celula;
            dibujarCelula(celulaTemp);
        }
    });
    
}();