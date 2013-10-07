/**
 * Crea una rejilla.
 *
 * @constructor
 * @this {Grid}
 * @param {number} rows_ El numero de filas.
 * @param {number} cols_ El numero de columnas.
 * @param {number} width El ancho de cada celda.
 * @param {CanvasHTMLElement} canvas El canvas en el que dibujamos.
 */
function Grid (rows_, cols_, width, canvas) {
	var rows = rows_;
	var cols = cols_;
	var width = width;
	var cells = [];
	var withLine = true;
	var canvas = canvas;

	//Creamos las celdas
	for(var i = 0; i < rows; i++) {
		var cellsRow = [];
		for(var j = 0; j < cols; j++) {
			var celda = new Cell(j,i);
			celda.setLife(0);
			celda.setColor(colores[Math.floor(Math.random()*colores.length)]);
			cellsRow.push(celda);
		}
			
		cells.push(cellsRow);
	}


	/**
	 * Getter del ancho.
	 *
	 * @this {Grid}
	 * @return {number} el ancho de las celdas.
	 */
	this.getWidth = function() {return width;}

	/**
	 * Getter del numero de filas.
	 *
	 * @this {Grid}
	 * @return {number} el numero de filas.
	 */
	this.getRows = function() {return rows;}

	/**
	 * Getter del numero de columnas.
	 *
	 * @this {Grid}
	 * @return {number} el numero de columnas.
	 */
	this.getCols = function() {return cols;}

	/**
	 * Getter del booleano que indica si hay linea de separacion.
	 *
	 * @this {Grid}
	 * @return {boolean} si hay linea de separacion, o no.
	 */
	this.getWithLine = function() {return withLine;}

	/**
	 * Getter de las celdas
	 *
	 * @this {Grid}
	 * @return {Array} las celdas.
	 */
	this.getCells = function() {return cells;}

	/**
	 * Dibuja la rejilla en pantalla
	 *
	 * @this {Grid}
	 */
	this.drawGrid = function() {
		canvas.style.display = 'inline';
		withLine = true;

		//Calculamos dimensiones
		var canvasWidth = (cols - 1)*2 + (width * cols);
		canvas.width = canvasWidth;
		var canvasHeight = (rows - 1)*2 + (width * rows);
		canvas.height = canvasHeight;

		//Dibujamos la rejilla
		var ctx = canvas.getContext('2d');
		for(var i = width+1; i < canvasWidth; i += width+2) {
			ctx.moveTo(i,0);
			ctx.lineWidth = 1;
			ctx.lineTo(i,canvasHeight);
		}
		for(var j = width+1; j < canvasHeight; j += width+2) {
			ctx.moveTo(0,j);
			ctx.lineWidth = 1;
			ctx.lineTo(canvasWidth,j);
		}

		ctx.strokeStyle = '#ffffff';
		ctx.stroke();
	}

	/**
	 * Borra el canvas de la rejilla.
	 *
	 * @this {Grid}
	 */
	this.clearGrid = function() {
		var ctx = canvas.getContext('2d');
		ctx.clearRect(0,0, canvas.width, canvas.height);
	}


	/**
	 * Elimina las lineas de separacion.
	 *
	 * @this {Grid}
	 */
	this.removeLines = function() {
		var ctx = canvas.getContext('2d');

		canvas.width = cols * width;
		canvas.height = rows * width;
		this.clearGrid();
		withLine = false;

		//volvemos a dibujar las celdas con vida
		for(var i = 0; i < rows; i++) {
			for(var j = 0; j < cols; j++) {
				if(cells[i][j].getLife() == 1) {
					this.drawLife(j,i);
				}
			}
		}
	}

	/**
	 * Determina la fila y columna seleccionada en el evento.
	 *
	 * @this {Grid}
	 * @param {Object} event El objeto del evento.
	 * @return {Array} ret[0]-numCol, ret[1]-numRow
	 */
	this.coorToCell = function(event) {
		var iniX = canvas.offsetLeft;
		var iniY = canvas.offsetTop;
		var realCoorX = event.clientX - iniX;
		var realCoorY = event.clientY - iniY + document.body.scrollTop;

		//Obtenemos la fila y columna
		var numCol = (withLine) ? Math.floor(realCoorX / (width+2)) : Math.floor(realCoorX / width);
		var numRow = (withLine) ? Math.floor(realCoorY / (width+2)) : Math.floor(realCoorY / width);

		return [numCol, numRow];
	}

	/**
	 * Dibuja la celda (numCol, numRow) de la rejilla.
	 *
	 * @this {Grid}
	 * @param {number} numCol el numero de columna.
	 * @param {number} numRow el numero de fila.
	 */
	this.drawLife = function(numCol, numRow) {
		var ctx = canvas.getContext('2d');

		ctx.fillStyle = cells[numRow][numCol].getColor();
		if(withLine)
			ctx.fillRect(numCol*(width+2), numRow*(width+2), width,width);
		else
			ctx.fillRect(numCol*width, numRow*width, width, width);
	}

	/**
	 * Borra la celda (numCol, numRow) de la rejilla.
	 *
	 * @this {Grid}
	 * @param {number} numCol el numero de columna.
	 * @param {number} numRow el numero de fila.
	 */
	this.killLife = function(numCol, numRow) {
		var ctx = canvas.getContext('2d');

		if(withLine)
			ctx.clearRect(numCol*(width+2), numRow*(width+2), width,width); 
		else
			ctx.clearRect(numCol*width, numRow*width, width,width); 
	}

	/**
	 * Obtiene la celda en la posicion (col, row).
	 *
	 * @this {Grid}
	 * @param {number} col el numero de columna.
	 * @param {number} row el numero de fila.
	 * @return {Cell} la celda solicitada.
	 */
	this.cellAt = function(col,row) {
		var celda = cells[row][col];
		var col_ = celda.getCol();
		var row_ = celda.getRow();
		return cells[row][col];
	}

	/**
	 * Determina el siquiente estado de una celda.
	 *
	 * @this {Grid}
	 * @param {number} col el numero de columna.
	 * @param {number} row el numero de fila.
	 * @param {Array} states los estados anteriores de cada celda.
	 * @return {Cell} la celda solicitada.
	 */
	this.cellNextRound = function(col,row,states) {
		var celda = cells[row][col];
		var aliveNext = 0;

		for(var i = -1; i < 2; i++)
			for(var j = -1; j < 2; j++)
				if((i == 0) && (j == 0))
					aliveNext += 0;
				else
					aliveNext += states[mod(row + i,rows)][mod(col + j,cols)];

		//celda muerta
		var state = states[row][col];
		if(states[row][col] == 0) {
			if(aliveNext == 3) {
				celda.setLife(1);
				this.drawLife(col,row);
			}
		}

		//celda viva
		else if((aliveNext < 2) || (aliveNext > 3)) {
			celda.setLife(0);
			this.killLife(col,row);
		}
	}

	/**
	 * Determina el estado de la rejilla en el siguiente turno.
	 *
	 * @this {Grid}
	 */
	this.nextRound = function() {
		var states = [];
		for(var i = 0; i < rows; i++) {
			var filaStates = [];
			for(var j = 0; j < cols; j++)
				filaStates.push(cells[i][j].getLife());
			states.push(filaStates);
		}

		for(var i = 0; i < rows; i++)
			for(var j = 0; j < cols; j++)
				this.cellNextRound(j,i,states);
	}

	/**
	 * Borra todas las celdas de la rejilla.
	 * @this {Grid}
	 */
	this.clearGrid = function () {
		for(var i = 0; i < rows; i++) {
			for(var j = 0; j < cols; j++) {
				var celda = this.cellAt(j,i);
				celda.setLife(0);
				this.killLife(j,i);
			}
		}
	}

	/**
	 * Borra todas las celdas de la rejilla.
	 * @this {Grid}
	 * @param {Grid} grid La rejilla de la que copiamos.
	 */
	this.copyFromGrid = function (grid) {
		var gridCols = grid.getCols(),
		    gridRows = grid.getRows();

		for(var i = 0; i < gridRows; i++) {
			for(var j = 0; j < gridCols; j++) {
				var celda = this.cellAt(j,i),
				    celdaCopy = grid.cellAt(j,i);
				var vivaCopy = (celdaCopy.getLife() == 1);

				if(vivaCopy) {
					celda.setLife(1);
					this.drawLife(j,i);
				}
				else {
					celda.setLife(0);
					this.killLife(j,i);
				}
				
			}
		}
	}
}