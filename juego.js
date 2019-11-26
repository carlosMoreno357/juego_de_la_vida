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


    //////////////////////////////////////////////////////
    //ACCIONES
    //Comenzar el juego con las células generadas

    btnComenzar.addEventListener('click', (e) => {
        if (estado.activo) return;

        estado.process = setTimeout(function run() {
            correr();

            if (estado.celulas_vivas.anteriores.length < 1) {
                estado.activo = false;
                return;
            }

            estado.activo = true;
            estado.process = setTimeout(run, 50);
        }, 50);
    });
    
    
    btnParar.addEventListener('click', (e) => {
        if (estado.activo) {
            clearTimeout(estado.process);
            estado.activo = false;
        }
    });


    btnLimpiar.addEventListener('click', (e) => {
        var tamTablero = getTamTablero();
        if (estado.activo) {
            return;
        }
        tableroContexto.clearRect(0, 0, tamTablero.w, tamTablero.h);
        estado.celulas_vivas.anteriores = [];
        estado.celulas_vivas.actuales = [];
    });


    //TERMINAN ACCIONES

    // Manejo de posiciones de las céulas
    function obtenerPosicion(e, elem) {
        var pos = elem.getBoundingClientRect();
        return {
            x: Math.floor((e.clientX - pos.left) / tam_celula) * tam_celula,
            y: Math.floor((e.clientY - pos.top) / tam_celula) * tam_celula
        };
    }


    function obtenerPosVecinos(pos) {
        var tamTablero = getTamTablero();
        var obtPosVecino = function(x, y, vecino) {
            return ((vecino[0] * tam_celula) + x) + ',' + ((vecino[1] * tam_celula) + y);
        };

        var vecinos =[
            [-1, -1],
            [0, -1],
            [1, -1],
            [-1, 0],
            [1, 0],
            [-1, 1],
            [0, 1],
            [1, 1]
        ];

        var i = vecinos.length;
        while (i--) {
            vecinos[i] = obtPosVecino(pos.x, pos.y, vecinos[i]);
        }
        return vecinos;
    }


    function correr() {
        estado.celulas_vivas.anteriores = estado.celulas_vivas.actuales.slice();
        var i, posicion_a_revisar, s;
        var celulas_a_revisar = estado.celulas_vivas.anteriores.slice();

        for (i = 0, s = estado.celulas_vivas.anteriores.length; i < s; i++) {
            celulas_a_revisar = celulas_a_revisar.concat(
                obtenerPosVecinos(
                    strToPos(estado.celulas_vivas.anteriores[i])
                ).filter((v) => {
                    return celulas_a_revisar.indexOf(v) < 0;
                })
            );
        }

        for (i = 0, s = celulas_a_revisar.length; i < s; i++) {
            posicion_a_revisar = strToPos(celulas_a_revisar[i]);
            var newStateOfCell = setEstadoCelula(posicion_a_revisar);
           
            if (typeof newStateOfCell === 'undefined') continue;
           
            if (newStateOfCell > 0) dibujarCelula(posicion_a_revisar);
            else limpiarCelula(posicion_a_revisar);
        }

    }

    //// termina manejo de posiciones



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


    ////////////////////// Termina revisión de estado////////////


    /////Revisión de células adyacentes////
      function getNeighborsAlive(coords) {
        return coords.filter(function(v) {
            return obtenerEstadoPrevioCelula(v, true) > 0;
        }).length;
    }


}();