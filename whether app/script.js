const apikey = "4badcf6e9558d7903405b71c7c4ac474";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function whether(city) {
	const response = await fetch(apiurl + city + `&appid=${apikey}`);
	var data = await response.json();
	document.getElementById("city").innerHTML = data.name;
	document.getElementById("_temp").innerHTML = Math.round(data.main.temp) + "°C";
	document.getElementById("weather").innerHTML = data.weather[0].main;
	document.getElementById("humidity").innerHTML = data.main.humidity + "%";
	document.getElementById("wind").innerHTML = data.wind.speed + "km/h";
	if (data.weather[0].main.toLowerCase() === "rain") {
		document.getElementById("wicon").src = "rain.webp";
	}
	else if(data.weather[0].main.toLowerCase() === "clouds"){
		document.getElementById("wicon").src = "cloud.png";
	}
	else if(data.weather[0].main.toLowerCase() === "haze"){
		document.getElementById("wicon").src = "fogg.webp";
	}
	else if(data.weather[0].main.toLowerCase() === "clear"){
		document.getElementById("wicon").src = "clear.png";

	}

}

function fun() {
	var searchcity = document.getElementById("search").value;

	whether(searchcity);
}

let day = document.getElementById("day");
let date = document.getElementById("date");
let month = document.getElementById("month");
let ctime = new Date();
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];



day.innerHTML = days[ctime.getDay()];
date.innerHTML = ctime.getDate();
month.innerHTML = months[ctime.getMonth()];

var swiper = new Swiper(".mySwiper", {
	slidesPerView: "1",
	spaceBetween: 10,
	autoplay: true,
	loop: true,
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},
});
