$(document).ready(function () {
    // Получаем элемент <nav> и сохраняем его в переменную navmenu
    var navmenu = document.getElementsByClassName("first-level")[0];
    // Получаем все элементы <li> внутри элемента <nav> и сохраняем их в переменную navlist
    var navlist = navmenu.getElementsByTagName("li");
    // Получаем значение id элемента <main> и сохраняем его в переменную main_id
    var main_id = location.pathname.split('/')[7].split('.')[0];
    //alert(location.pathname.split('/')[7].split('.')[0]);
    // Создаем переменную menuelem, в которую будет сохранен элемент <li>, который будет активным на текущей странице
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
    // Добавляем класс "active" к элементу, сохраненному в переменной menuelem, чтобы он был подсвечен на странице
    menuelem.classList.add("active");
});

function alerttt() {
    alert("Hello");
}

function formSubmit(formelem) {
    let fname = document.getElementById("name").value;
    var alerttext = `${fname}, вы отправили запрос!`;
    alert(alerttext);
}

function validateForm() {
    var validation = true;
    validation &= validateAllForm();
    if (validation == false) {
        // Действия при невалидной форме
    } else {
        validation &= formSubmit();
    }
    return validation;
}

function validateAllForm() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("name").value;
    var object = document.getElementById("name").value;
    var message = document.getElementById("name").value;
    if ((name == null || name == "") && (email == null || email == "") && (object == null || object == "") && (message == null || message == "")) {
        alert("Please Fill In All Required Fields");
        return false;
    }
}
