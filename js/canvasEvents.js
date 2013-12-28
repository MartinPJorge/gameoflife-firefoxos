var mouseDown = 0;
/* var grid;  //Rejilla del juego */
var currCol;
var currRow;
var moving = 0;
var creando = 0;
var timing = "null";
var isMovile = false;
var colores = ["rgb(100,200,0)", "rgb(255,28,70)", "rgb(242,65,210)", "rgb(65,230,242)", "rgb(41,196,35)", "rgb(214,255,133)", "rgb(222,157,138)"];

/**
 * Returns a mod b.
 *
 * @param {number} a
 * @param {number} b
 * @return {number} (a mod b)
 */
function mod(a,n) {
	var ret = ((a%n)+n)%n;
	return ((a%n)+n)%n;
}

/**
 * Handler para el evento touchstart.
 *
 * @param {Object} event Objeto del evento.
 * @param {Grid} grid Rejilla a utilizar.
 */
function abajo (event, grid) {
	var ret;
	ret = grid.coorToCell(event.touches[0]);
	
	var numCol = ret[0],
		numRow = ret[1],
	    celda = grid.cellAt(numCol, numRow),
	    lifeThere = celda.getLife();

	mouseDown++;

	creando = (lifeThere == 1) ? 0:1;
	currCol = numCol;
	currRow = numRow;

	celda.setLife(creando);
	if(creando == 1)
		grid.drawLife(numCol,numRow);
	else
		grid.killLife(numCol,numRow);
}



/**
 * Handler para el evento touchend.
 *
 * @param {Object} event Objeto del evento.
 */
function arriba(event) {
	if(mouseDown == 1)
		mouseDown--;

	currCol = currRow = -1;
}


/**
 * Handler para el evento touchmove.
 *
 * @param {Object} event Objeto del evento.
 * @param {Grid} grid Rejilla a utilizar.
 */
function mover (event, grid) {
	if(mouseDown == 0) return;
	event.preventDefault();

	var ret;
	ret = grid.coorToCell(event.touches[0]);


	var numCol = ret[0], numRow = ret[1],
	    cellThere = grid.cellAt(numCol, numRow);


	if((numCol == currCol) && (numRow == currRow))
		return;
	else {
		currCol = numCol;
		currRow = numRow;

		if(creando == 1) {
			if(cellThere.getLife() == 0) {
				cellThere.setLife(1);
				grid.drawLife(numCol,numRow);
			}
		}
		else {
			cellThere.setLife(0);
			grid.killLife(numCol,numRow);
		}
	}

	moving = 0;
}

/**
 * Ejecuta el siguiente turno de la rejilla.
 */
function botonNextRound() {grid.nextRound();}

/**
 * Establece un intervalo en el que se va actualizando la rejilla.
 */
function botonStart() {
	if(timing == "null")
		timing = setInterval(function() {grid.nextRound();}, 100);
}

/**
 * Borra el intervalo de actualizacion.
 */
function botonStop() {
	clearInterval(timing);
	timing = "null";
}

/**
 * Borra las celdas de la rejilla.
 */
function botonBorrar () {
	grid.clearGrid();
}



