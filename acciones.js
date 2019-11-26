   //Generar células de manera aleatoria////
    // Puede ser necesario generar más de una vez, con el fin de que no se encuentren todas
    // separadas y mueranm
    var btnGenerar = document.querySelector('#generar');
    var btnComenzar = document.querySelector('#comenzar');
    var btnParar = document.querySelector('#parar');
    var btnLimpiar = document.querySelector('#limpiar');
    
    
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