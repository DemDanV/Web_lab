    $(window).on("load", function() {
        // инициализация flexslider
        $(".main-title").flexslider({
        animation: "fade",
        directionNav: false,
        controlNav: false,
        keyboardNav: true,
        slideToStart: 0,
        animationLoop: true,
        pauseOnHover: false,
        slideshowSpeed: 3000
        });
    });
    
    $(document).ready(function() {
        // получение элемента <nav> по классу "first-level" и сохранение в переменную navmenu
        var navmenu = document.getElementsByClassName("first-level")[0];
    
        // получение всех элементов <li> внутри navmenu и сохранение в переменную navlist
        var navlist = navmenu.getElementsByTagName("li");
    
        // получение идентификатора страницы из URL и сохранение в переменную main_id
        var main_id = location.pathname.split("/")[7].split(".")[0];
    
        // определение соответствующего элемента меню на основе main_id
        var menuelem;
        switch (main_id) {
        case "index":
            menuelem = navlist[0];
            break;
        case "about":
            menuelem = navlist[1];
            break;
        case "unity":
            menuelem = navlist[2];
            break;
        case "android":
            menuelem = navlist[3];
            break;
        case "blog":
            menuelem = navlist[4];
            break;
        case "contact":
            menuelem = navlist[5];
            break;
        }
    
        // добавление класса "active" к выбранному элементу меню
        menuelem.classList.add("active");
    });
    
    $(document).ready(function() {
        $(".hidebox .hidable").hide();
        $(".hidebox").css("background-color", "#7beec7");
    });
    
    $(".hidebox").click(function() {
        $(".hidebox .hidable").hide("slow");
        $(this).css("background-color", "#7beec7");
    });
    
    $(".hidebox").dblclick(function() {
        $(".hidebox .hidable").show("slow");
        $(this).css("background-color", "#ffffff");
    });
    
    $(".increase-on-hover").hover(
        function() {
        $(this).animate(
            {
            width: "75%",
            height: "75%",
            borderRadius: "2%"
            },
            "slow"
        );
        },
        function() {
        $(this).animate(
            {
            width: "100%",
            height: "100%",
            borderRadius: "10%"
            },
            "slow"
        );
        }
    );
    