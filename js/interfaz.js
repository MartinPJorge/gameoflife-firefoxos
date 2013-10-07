var ventanas = {
	"ventanaPpal" : document.getElementById("ventanaPpal"),
	"listado"     : document.getElementById("listado"),
	"zoom"        : document.getElementById("zoom")
};

var botones = {
	"pintar"     : document.getElementById("pintarBoton"),
	"formas"     : document.getElementById("formasBoton"),
	"formasBack" : document.getElementById("formasBack"),
	"zoomBack" : document.getElementById("zoomBack")
};


// Ida y vuelta al listado de formas
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


// Ida y vuelta a la ventana de zoom
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







// LISTENERS PARA DIBUJAR LAS FIGURAS
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
