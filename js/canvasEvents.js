var mouseDown = 0;
var grid;  //Rejilla del juego
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
	if(grid == grid2) {
		ret = coorToCell2(event.touches[0]);
	}
	else {
		ret = grid.coorToCell(event.touches[0]);
	}
	
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
	if(grid == grid2) {
		ret = coorToCell2(event.touches[0]);
	}
	else {
		ret = grid.coorToCell(event.touches[0]);
	}
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



//  ------------- QUITAR -------------
function entraRejilla() {
	var ancho = parseInt(document.getElementById('ancho').value);
	var alto = parseInt(document.getElementById('alto').value);

	var totalWidth = (alto * ancho) + (2*(alto-1));
	if(document.body.clientWidth < totalWidth)
		return false;

	return true;
}

/**
 * Muestra la rejilla de la app.
 *
 * @param {number} rows Numero de filas.
 * @param {number} cols Numero de columnas.
 * @param {number} width Ancho de celda.
 * @param {CanvasHTMLElement} canvas El canvas de la rejilla.
 */
function showGrid(rows, cols, width, canvas) {
	grid = new Grid(rows, cols, width,canvas);
	grid.drawGrid();
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


//  ----------- QUITAR ---------
function changeRejilla() {
	if(grid.getWithLine())
		grid.removeLines();
	else {
		grid.drawGrid();
		for(var i = 0; i < grid.getRows(); i++)
			for(var j = 0; j < grid.getCols(); j++)
				if(grid.getCells()[i][j].getLife() == 1)
					grid.drawLife(j,i);
	}
}

/**
 * Carga la rejilla de la app.
 * @param {CanvasHTMLElement} canvas El canvas que le pasamos a la rejilla.
 */
function cargaGrid(canvas) {
	//anchura
	var ancho = document.body.clientWidth;
	var numCeldasAncho = Math.floor(ancho / (5+2));

	//altura
	var alto = document.body.clientHeight - 88;
	var numCeldasAlto = Math.floor(alto / (5+2));

	showGrid(numCeldasAlto+1, numCeldasAncho+1, 5, canvas)
}





// Codigo a ejecutar.
var elCanvas = document.getElementById("canvasGame");
cargaGrid(elCanvas);

elCanvas.addEventListener("touchstart", function (event) {
	abajo(event, grid);
}, false);
elCanvas.addEventListener("touchmove", function (event) {
	mover(event, grid);
}, false);
elCanvas.addEventListener("touchend", function (event) {
	arriba(event);
}, false);

/*elCanvas.addEventListener("mousedown", function (event) {
	abajo(event);
}, false);
elCanvas.addEventListener("mousemove", function (event) {
	mover(event);
}, false);
elCanvas.addEventListener("mouseup", function (event) {
	arriba(event);
}, false);*/




/* ------------------------------
 * -- LISTENERS DE LOS BOTONES --
 * ------------------------------ */
var botonesCtrl = {
	"stop"  : document.getElementById("stop"),
	"play"  : document.getElementById("play"),
	"next"  : document.getElementById("next"),
	"trash" : document.getElementById("borrar")
};

var botonActivo = null;
function subirBotonesActivos () {
	if(botonActivo != null)
		botonActivo.classList.remove("abajo");
	botonActivo = null;
}

botonesCtrl["stop"].addEventListener("click", function (event) {
	subirBotonesActivos();
	this.classList.add("abajo");
	botonActivo = this;
	botonStop();
}, false);
botonesCtrl["play"].addEventListener("click", function (event) {
	subirBotonesActivos();
	this.classList.add("abajo");
	botonActivo = this;
	botonStart();
}, false);
botonesCtrl["next"].addEventListener("click", function (event) {
	this.classList.add("abajo");
	botonNextRound();

	setTimeout(function () {
		botonesCtrl["next"].classList.remove("abajo");
	}, 100);
}, false);
botonesCtrl["trash"].addEventListener("click", function (event) {
	subirBotonesActivos();
	this.classList.add("abajo");
	botonActivo = this;
	botonStop();
	botonBorrar();

	setTimeout(subirBotonesActivos, 100);
});

