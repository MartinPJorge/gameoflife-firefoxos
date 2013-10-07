/**
 * Crea una celda.
 *
 * @constructor
 * @this {Cell}
 * @param {number} column la columna que ocupa.
 * @param {number} row_ la fila que ocupa.
 */
function Cell(column, row_) {

	var life = 0;  // 0, 1
	var col = column;
	var row = row_;
	var color = colores[0];

	/**
	 * Setter de la vida de la celda.
	 *
	 * @this {Cell}
	 * @param {number} life_ el nuevo valor de la vida.
	 */
	this.setLife = function(life_) {
		life = life_;
		if(life == 0)
			color = colores[0];
		else {
			var colaco = colores[Math.floor(Math.random()*colores.length)];
			color = colaco;
		}
	}

	/**
	 * Getter de la vida de la celda.
	 *
	 * @this {Cell}
	 * @return {number} el valor de la vida.
	 */
	this.getLife = function() {return life;}

	/**
	 * Getter de la fila.
	 *
	 * @this {Cell}
	 * @return {number} la fila que ocupa.
	 */
	this.getRow = function() {return row;}

	/**
	 * Getter de la columna.
	 *
	 * @this {Cell}
	 * @return {number} la columna que ocupa.
	 */
	this.getCol = function() {return col;}

	/**
	 * Getter del color.
	 *
	 * @this {Cell}
	 * @return {String} el color de relleno de la celda.
	 */
	this.getColor = function() {return color;}

	/**
	 * Setter del color.
	 *
	 * @this {Cell}
	 * @param {String} el nuevo color de relleno de la celda.
	 */
	this.setColor = function(color) {color = color;}
}