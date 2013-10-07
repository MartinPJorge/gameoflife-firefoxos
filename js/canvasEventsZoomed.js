var grid2;
var marco = document.getElementById("marco");
marco.style.height = (document.body.clientHeight - 88) + "px";
var canvasZoomed = document.getElementById("canvasGameZoomed");



/**
 * Carga la rejilla de la app.
 */
function cargaZoomedGrid() {
	var rows = grid.getRows(),
	    cols = grid.getCols();

	canvasZoomed.width = cols * (20 + 2);
	canvasZoomed.height = rows * (20 + 2);

	grid2 = new Grid(rows, cols, 20, canvasZoomed);
	grid2.drawGrid();
}
cargaZoomedGrid();



function coorToCell2 (event) {
	var realCoorY = event.clientY - 50 + marco.scrollTop; 
	var realCoorX = event.clientX + marco.scrollLeft;
	var cellSize = grid2.getWidth();

	//Obtenemos la fila y columna
	var numCol = Math.floor(realCoorX / (cellSize+2));
	var numRow = Math.floor(realCoorY / (cellSize+2));

	return [numCol, numRow];
}



canvasZoomed.addEventListener("touchstart", function (event) {
	abajo(event, grid2);
}, false);
canvasZoomed.addEventListener("touchmove", function (event) {
	mover(event, grid2);
}, false);
canvasZoomed.addEventListener("touchend", function (event) {
	arriba(event);
}, false);






/* ------------------------------
 * -- LISTENERS DE LOS BOTONES --
 * ------------------------------ */
var botonesMove = {
	"izquierda"  : document.getElementById("izquierda"),
	"abajo"      : document.getElementById("abajo"),
	"arriba"     : document.getElementById("arriba"),
	"derecha"    : document.getElementById("derecha")
};



botonesMove["izquierda"].addEventListener("click", function (event) {
	this.classList.add("abajo");
	marco.scrollLeft -= 22;

	setTimeout(function () {
		botonesMove["izquierda"].classList.remove("abajo");
	}, 100);
}, false);
botonesMove["abajo"].addEventListener("click", function (event) {
	this.classList.add("abajo");
	marco.scrollTop += 22;

	setTimeout(function () {
		botonesMove["abajo"].classList.remove("abajo");
	}, 100);
}, false);
botonesMove["arriba"].addEventListener("click", function (event) {
	this.classList.add("abajo");
	marco.scrollTop -= 22;

	setTimeout(function () {
		botonesMove["arriba"].classList.remove("abajo");
	}, 100);
}, false);
botonesMove["derecha"].addEventListener("click", function (event) {
	this.classList.add("abajo");
	marco.scrollLeft += 22;

	setTimeout(function () {
		botonesMove["derecha"].classList.remove("abajo");
	}, 100);
});

