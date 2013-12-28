var ventanas = {
	"ventanaPpal" : document.getElementById("ventanaPpal"),
	"listado"     : document.getElementById("listado"),
	"zoom"        : document.getElementById("zoom")
};

var botones = {
	"pintar"     : document.getElementById("pintarBoton"),
	"formas"     : document.getElementById("formasBoton"),
	"formasBack" : document.getElementById("formasBack"),
	"zoomBack"   : document.getElementById("zoomBack")
};

var botonesCtrl = {
	"stop"  : document.getElementById("stop"),
	"play"  : document.getElementById("play"),
	"next"  : document.getElementById("next"),
	"trash" : document.getElementById("borrar")
};

var botonesMove = {
	"izquierda"  : document.getElementById("izquierda"),
	"abajo"      : document.getElementById("abajo"),
	"arriba"     : document.getElementById("arriba"),
	"derecha"    : document.getElementById("derecha")
};


/* --------------------------------------
   --- Ida y vuelta listado de formas ---
   -------------------------------------- */
botones["formas"].addEventListener("click", function (ev) {
	botonStop();  // Paramos la ejecucion
	ventanas["listado"].className = "current";
	ventanas["ventanaPpal"].className = "left";

	if(botonActivo == botonesCtrl["play"]) {
		subirBotonesActivos();
		botonesCtrl["stop"].classList.add("abajo");
		botonActivo = botonesCtrl["stop"];
	}
}, false);
botones["formasBack"].addEventListener("click", function (ev) {
	ventanas["ventanaPpal"].className = "current";
	ventanas["listado"].className = "right";
}, false);



/* ------------------------------------
   --- Ida y vuelta ventana de zoom ---
   ------------------------------------ */
botones["pintar"].addEventListener("click", function (ev) {
	botonStop();  // Paramos la ejecucion
	ventanas["zoom"].className = "current";
	ventanas["ventanaPpal"].className = "left";

	grid2.copyFromGrid(grid);

	if(botonActivo == botonesCtrl["play"]) {
		subirBotonesActivos();
		botonesCtrl["stop"].classList.add("abajo");
		botonActivo = botonesCtrl["stop"];
	}
}, false);
botones["zoomBack"].addEventListener("click", function (ev) {
	ventanas["ventanaPpal"].className = "current";
	ventanas["zoom"].className = "right";

	grid.copyFromGrid(grid2);
}, false);



/* -------------------------------------
   --- Logica del listado de figuras ---
   ------------------------------------- */
document.getElementById("turtleLink").addEventListener("click", function (ev) {
	Drawer.draw(grid, turtle);
	ventanas["ventanaPpal"].className = "current";
	ventanas["listado"].className = "right";
}, false);

document.getElementById("gliderLink").addEventListener("click", function (ev) {
	Drawer.draw(grid, glider);
	ventanas["ventanaPpal"].className = "current";
	ventanas["listado"].className = "right";
}, false);

document.getElementById("hammerHeadLink").addEventListener("click", function (ev) {
	Drawer.draw(grid, hammerHead);
	ventanas["ventanaPpal"].className = "current";
	ventanas["listado"].className = "right";
}, false);

document.getElementById("enterpriseLink").addEventListener("click", function (ev) {
	Drawer.draw(grid, enterprise);
	ventanas["ventanaPpal"].className = "current";
	ventanas["listado"].className = "right";
}, false);

document.getElementById("hwssLink").addEventListener("click", function (ev) {
	Drawer.draw(grid, hwss);
	ventanas["ventanaPpal"].className = "current";
	ventanas["listado"].className = "right";
}, false);

document.getElementById("hivenudgerLink").addEventListener("click", function (ev) {
	Drawer.draw(grid, hivenudger);
	ventanas["ventanaPpal"].className = "current";
	ventanas["listado"].className = "right";
}, false);

document.getElementById("lobsterLink").addEventListener("click", function (ev) {
	Drawer.draw(grid, lobster);
	ventanas["ventanaPpal"].className = "current";
	ventanas["listado"].className = "right";
}, false);

document.getElementById("spiderLink").addEventListener("click", function (ev) {
	Drawer.draw(grid, spider);
	ventanas["ventanaPpal"].className = "current";
	ventanas["listado"].className = "right";
}, false);

document.getElementById("bigGliderLink").addEventListener("click", function (ev) {
	Drawer.draw(grid, bigGlider);
	ventanas["ventanaPpal"].className = "current";
	ventanas["listado"].className = "right";
}, false);



/* ---------------------------------------
   --- Logica de los botones de accion ---
   --------------------------------------- */
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



/* ----------------------------------
 * -- Logica de la ventana de zoom --
 * ---------------------------------- */
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


