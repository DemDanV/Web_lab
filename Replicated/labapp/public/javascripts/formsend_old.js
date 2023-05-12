// /*
// Реализация AJAX с помощью XMLHttpRequest. Универсальный метод подходящий для всех версий браузеров, в т.ч. и устаревших
// */
// var sendbtn = document.getElementById("sendbtn");    // выбираем DOM-елемент (кнопку)
// console.log(sendbtn)
// // Привязываем к элементу обработчик события "click"
// sendbtn.addEventListener("click", function (e) {
//     /* Инструкция preventDefault позволяет переопределить стандартное поведение браузера,
//     если ее убрать, то браузер по-умолчанию обновит страницу после отправки данных формы */
//     e.preventDefault();
//     // Получаем данные полей формы
//     let fname = document.getElementsByName("name")[0].value;
//     let lname = document.getElementsByName("email")[0].value;
//     let reqtype = document.getElementsByName("object")[0].value
//     // Преобразуем полученные данные в JSON
//     let formdata = JSON.stringify({ firstname: fname, lastname: lname, reqtype: reqtype});
    
//     /* XMLHttpRequest предоставляет простой способ получения данных по ссылке без перезагрузки страницы.
//     Это позволяет обновлять только часть веб-страницы не прерывая пользователя.
//     XMLHttpRequest используется в AJAX запросах и особенно в single-page приложениях.*/ 
//     let request = new XMLHttpRequest();
//     // Инициализируем POST-запрос на адрес "/", аргумент true - асинхронный запрос
//     request.open("POST", "/contact/ajaxrequest", true);
//     // Устанавливаем заголовки запроса (тип отсылаемых данных)
//     request.setRequestHeader("Content-Type", "application/json");

//     // Привязываем к запросу обработчик события "load" - окончание загрузки данных 
//     request.addEventListener("load", function () {
//         // Получаем и парсим ответ сервера
//         let receivedUser = JSON.parse(request.response);
//         // Выводим ответ сервера в элементе c id = "statusfield"
//         let statfield = document.getElementById("statusfield");
//         statfield.textContent = receivedUser.message;
//         statfield.textContent.bold();
//     });

//     // После привязки обработчика событий к запросу отправляем данные
//     request.send(formdata);

    
//     var xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function(){
//         if (xhr.readyState == 4 && xhr.status == 200) {
// 			var response = xhr.responseText;
// 			var answer = document.querySelector('.toAdd');
// 			answer.textContent += document.getElementById('name').value + ", ваш запрос получен!\n";
//         }
//     }
//     xhr.open("POST", "contactrequest/", true);
//     xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
//     var formData = new FormData();
//     formData.append('name', document.getElementById('name').value);
//     formData.append('email', document.getElementById('email').value);
//     xhr.send(formData);
// });

function sendContactInfo(){

	var firstname_	= document.getElementById('name').value;
	var email_		= document.getElementById('email').value;
	var reqObject_	= document.getElementById('object').value;
	var reqMessage_	= document.getElementById('message').value;



	if (!firstname_ || !email_ || !reqMessage_ || !reqObject_) {
		alert("Заполните все поля.");
		return;
	}

	event.preventDefault();

	//var formdata = JSON.stringify({
	//	firstname	: document.getElementById('firstname').value,
	//	email		: document.getElementById('email').value,
	//	regtext		: document.getElementById('regtext').value,
	//	reqObject	: document.getElementById('reqObject').value
	//});
	var formdata = JSON.stringify({
		firstname	: firstname_,
		email		: email_,
		reqObject	: reqObject_,
		reqMessage		: reqMessage_
	});
	//let formData = new FormData();
	//formData.append("firstname", firstname);
	//formData.append("email", email);
	//formData.append("reqObject", reqObject);
	//formData.append("regtext", regtext);

	console.log(firstname_);
	console.log(email_);
	console.log(reqObject_);
	console.log(reqMessage_);

	var xhr = new XMLHttpRequest();
	//xhr.onreadystatechange = function(){
	//	if (xhr.readyState == 4 && xhr.status == 200) {
	//		var response = xhr.responseText;
	//		var answer = document.querySelector('.toAdd');
	//		answer.textContent += firstname + ", ваш запрос получен!\n";
	//	}
	//}
	xhr.open("POST", "/api");
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(formdata);

	xhr.onload = () => alert(xhr.response);
}
