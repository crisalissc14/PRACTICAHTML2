jQuery(document).ready(function($) {
    var menuBtn = $('.pizzamenu'),
        menu = $('.navegacion ul');

    menuBtn.click(function() {
        if (menu.hasClass('show')) {
            menu.removeClass('show');
        } else {
            menu.addClass('show');
        }
    });
});

// Script para el efecto de scroll en el header
window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.getElementById("header").style.top = "0";
    } else {
        document.getElementById("header").style.top = "-100px";
    }
}