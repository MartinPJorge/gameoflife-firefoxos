//Rejilla principal del juego
var grid;

// Rejilla zoom
var grid2,
    marco = document.getElementById("marco"),
    canvasZoomed = document.getElementById("canvasGameZoomed");
marco.style.height = (document.body.clientHeight - 88) + "px";





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

	grid = new Grid(numCeldasAlto+1, numCeldasAncho+1, 5,canvas);
	grid.drawGrid();
}

/**
 * Carga la rejilla con zoom de la app.
 * @param {Grid} rejilla principal sobre la que creamos el zoom.
 * @param {CanvasHTMLElement} canvas El canvas que le pasamos a la rejilla.
 */
function cargaZoomedGrid(refGrid,canvas) {
	var rows = refGrid.getRows(),
	    cols = refGrid.getCols();

	grid2 = new Grid(rows, cols, 20, canvas);
	grid2.drawGrid();
}





/* ---------------------------------------------
   --- Iniciar el canvas y asignar listeners ---
   --------------------------------------------- */
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






/* --------------------------------------------------
   --- Iniciar el canvas zoom y asignar listeners ---
   -------------------------------------------------- */
cargaZoomedGrid(grid,canvasZoomed);

canvasZoomed.addEventListener("touchstart", function (event) {
	abajo(event, grid2);
}, false);
canvasZoomed.addEventListener("touchmove", function (event) {
	mover(event, grid2);
}, false);
canvasZoomed.addEventListener("touchend", function (event) {
	arriba(event);
}, false);

/* Sobreescribimos el metodo que trae Grid, por otro para el zoom. */
grid2.coorToCell = function (event) {
	var realCoorY = event.clientY - 50 + marco.scrollTop; 
	var realCoorX = event.clientX + marco.scrollLeft;
	var cellSize = this.getWidth();

	//Obtenemos la fila y columna
	var numCol = Math.floor(realCoorX / (cellSize+2));
	var numRow = Math.floor(realCoorY / (cellSize+2));

	return [numCol, numRow];
}



