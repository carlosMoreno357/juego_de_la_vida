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

    function limpiarCelula(pos) {
        tableroContexto.clearRect(pos.x, pos.y, tam_celula, tam_celula);
        estado.celulas_vivas.actuales.splice(
            estado.celulas_vivas.actuales.indexOf(posToStr(pos)),
            1
        );
    }

    ///////////// Terminan funciones de tablero y dibujo //////////////


    //Generar células de manera aleatoria////
    // Puede ser necesario generar más de una vez, con el fin de que no se encuentren todas
    // separadas y mueranm
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
    


    // Manejo de posiciones de las céulas
    function obtenerPosicion(e, elem) {
        var pos = elem.getBoundingClientRect();
        return {
            x: Math.floor((e.clientX - pos.left) / tam_celula) * tam_celula,
            y: Math.floor((e.clientY - pos.top) / tam_celula) * tam_celula
        };
    }


    //Estado de las células
    function setEstadoCelula(pos) {
        var neighborsAlive = getNeighborsAlive(
            obtenerPosVecinos(pos)
        );
        var stateOfCell = obtenerEstadoPrevioCelula(pos);
        if (stateOfCell > 0) {
            if (neighborsAlive < 2 || neighborsAlive > 3) {
                return 0;
            }
        }
        if (stateOfCell === 0) {
            if (neighborsAlive === 3) {
                return 1;
            }
        }
    }
    function obtenerEstadoCelula(pos) {
        if (estado.celulas_vivas.actuales.indexOf(posToStr(pos)) > -1) {
            return 1;
        }
        return 0;
    }
    function obtenerEstadoPrevioCelula(pos, str) {
        if (str === true) {
            if (estado.celulas_vivas.anteriores.indexOf(pos) > -1) {
                return 1;
            }
            return 0;
        }
        if (estado.celulas_vivas.anteriores.indexOf(posToStr(pos)) > -1) {
            return 1;
        }
        return 0;
    }

}();