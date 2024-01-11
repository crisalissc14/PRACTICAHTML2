jQuery('document').ready(function($)){

    var menuBtn = $('.pizzamenu')
        menu = $('navegacion ul')

    menuBtn.click(function(){
        if(menu.hasClass('show'))
        menu.addClass('show');
    }

});
// Espera a que el documento HTML esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
    // ... (Tu código actual para el efecto de scroll)

    // Declarando variables
    var inputSearch = document.getElementById("inputSearch");

    // Agrega un evento de entrada para el campo de búsqueda
    inputSearch.addEventListener("input", function () {
        buscador_interno();
    });
});

// Creando filtro de búsqueda
function buscador_interno() {
    // Obtén el valor del campo de búsqueda y conviértelo a mayúsculas
    var filter = inputSearch.value.toUpperCase();

    // Obtén la lista de elementos a filtrar
    var platos = document.querySelectorAll(".plato");

    // Recorre los elementos y muestra/oculta según la búsqueda
    for (var i = 0; i < platos.length; i++) {
        var h1 = platos[i].getElementsByTagName("h1")[0];
        var textValue = h1.textContent || h1.innerText;

        // Compara el texto del elemento con el filtro de búsqueda
        if (textValue.toUpperCase().indexOf(filter) > -1) {
            platos[i].style.display = "";
        } else {
            platos[i].style.display = "none";
        }
    }
}
// Script para el efecto de scroll en el header
window.onscroll = function () {
    scrollFunction();
};


function scrollFunction() {
    var header = document.getElementById("header");

    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        header.classList.add("scroll");
    } else {
        header.classList.remove("scroll");
    }
}
function scrollFunction() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.getElementById("header").style.top = "0";
    } else {
        document.getElementById("header").style.top = "-100px";
    }
}

