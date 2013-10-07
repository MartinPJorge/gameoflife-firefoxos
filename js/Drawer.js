var Drawer = {};
Drawer.draw = function(grid, pattern) {
	grid.clearGrid();
	var iniCol = Math.floor((grid.getCols() - pattern["cols"]) / 2),
	    iniRow = Math.floor((grid.getRows() - pattern["rows"]) / 2),
	    gridCells = grid.getCells(),
	    numColoreadas = pattern["cells"].length;


	for(var i = 0; i < numColoreadas; i++) {
		var copyActual = pattern["cells"][i];
		gridCells[copyActual[0]+iniRow][copyActual[1]+iniCol].setLife(1);
		grid.drawLife(copyActual[1]+iniCol, copyActual[0]+iniRow);
	}
};
