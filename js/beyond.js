/*Sets Themed Colors Based on Themes*/

var themeprimary = getThemeColorFromCss('themeprimary');
var themesecondary = getThemeColorFromCss('themesecondary');
var themethirdcolor = getThemeColorFromCss('themethirdcolor');
var themefourthcolor = getThemeColorFromCss('themefourthcolor');
var themefifthcolor = getThemeColorFromCss('themefifthcolor');

//Gets Theme Colors From Selected Skin To Use For Drawing Charts
function getThemeColorFromCss(style) {
    var $span = $("<span></span>").hide().appendTo("body");
    $span.addClass(style);
    var color = $span.css("color");
    $span.remove();
    return color;
}

/*Loading*/
$(window)
    .load(function () {
        setTimeout(function () {
            $('.loading-container')
                .addClass('loading-inactive');
        }, 1000);
    });
	
InitiateSideMenu();

function InitiateSideMenu() {
    //Sidebar Toggler
    $(".sidebar-toggler").on('click', function () {
        $("#sidebar").toggleClass("hide");
        $(".sidebar-toggler").toggleClass("active");
        return false;
    });
    //End Sidebar Toggler

    //Sidebar Collapse
    var b = $("#sidebar").hasClass("menu-compact");
    $("#sidebar-collapse").on('click', function () {
        if (!$('#sidebar').is(':visible'))
            $("#sidebar").toggleClass("hide");
        $("#sidebar").toggleClass("menu-compact");
        $(".sidebar-collapse").toggleClass("active");
        b = $("#sidebar").hasClass("menu-compact");

        if ($(".sidebar-menu").closest("div").hasClass("slimScrollDiv")) {
            $(".sidebar-menu").slimScroll({ destroy: true });
            $(".sidebar-menu").attr('style', '');
        }
        if (b) {
            $(".open > .submenu")
                .removeClass("open");
        } else {
            if ($('.page-sidebar').hasClass('sidebar-fixed')) {
                var position = (readCookie("rtl-support") || location.pathname == "/index-rtl-fa.html" || location.pathname == "/index-rtl-ar.html") ? 'right' : 'left';
                $('.sidebar-menu').slimscroll({
                    height: 'auto',
                    position: position,
                    size: '3px',
                    color: themeprimary
                });
            }
        }
        //Slim Scroll Handle



    });
    //End Sidebar Collapse


    //Sidebar Menu Handle
    $(".sidebar-menu").on('click', function (e) {
        var menuLink = $(e.target).closest("a");
        if (!menuLink || menuLink.length == 0)
            return;
        if (!menuLink.hasClass("menu-dropdown")) {
            if (b && menuLink.get(0).parentNode.parentNode == this) {
                var menuText = menuLink.find(".menu-text").get(0);
                if (e.target != menuText && !$.contains(menuText, e.target)) {
                    return false;
                }
            }
            return;
        }
        var submenu = menuLink.next().get(0);
        if (!$(submenu).is(":visible")) {
            var c = $(submenu.parentNode).closest("ul");
            if (b && c.hasClass("sidebar-menu"))
                return;
            c.find("> .open > .submenu")
                .each(function () {
                    if (this != submenu && !$(this.parentNode).hasClass("active"))
                        $(this).slideUp(200).parent().removeClass("open");
                });
        }
        if (b && $(submenu.parentNode.parentNode).hasClass("sidebar-menu"))
            return false;
        $(submenu).slideToggle(200).parent().toggleClass("open");
        return false;
    });
    //End Sidebar Menu Handle
}

// Fullscreen Widget
function maximize(widgetbox) {
    if (widgetbox) {
        var windowHeight = $(window).height();
        var headerHeight = widgetbox.find(".widget-header").height();
        widgetbox.find(".widget-body").height(windowHeight - headerHeight);
    }
}

/* Scroll To */
function scrollTo(el, offeset) {
    var pos = (el && el.size() > 0) ? el.offset().top : 0;
    jQuery('html,body').animate({ scrollTop: pos + (offeset ? offeset : 0) }, 'slow');
}



//Add Classes Function
function addClass(elem, cls) {
    var oldCls = elem.className;
    if (oldCls) {
        oldCls += " ";
    }
    elem.className = oldCls + cls;
}

//Remove Classes Function
function removeClass(elem, cls) {
    var str = " " + elem.className + " ";
    elem.className = str.replace(" " + cls, "").replace(/^\s+/g, "").replace(/\s+$/g, "");
}

//Has Classes Function
function hasClass(elem, cls) {
    var str = " " + elem.className + " ";
    var testCls = " " + cls + " ";
    return (str.indexOf(testCls) != -1);
}

