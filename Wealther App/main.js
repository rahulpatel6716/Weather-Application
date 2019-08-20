
// Api Key 

let appId = '1ef182d683d377e213f617ca29680c9a';
let units = 'metric';
let searchMethod;


// Function For get search method

function getSearchMethod(searchTerm) {
	if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
		searchMethod = 'zip';
	else
		searchMethod = 'q';
}

// function search weather 

function searchWeather(searchTerm) {
	getSearchMethod(searchTerm)

	fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result => {
		return result.json();
	}).then(result => {
		init(result);
	})
}


function init(resultFromServer) {
	
   switch(resultFromServer.weather[0].main){
   	case 'Clear':
   		document.body.style.backgroundImage = 'url("css/clear.jpg")';
   		break;

   	case 'Clouds':
   		document.body.style.backgroundImage = 'url("css/cloudy.jpg")';
   		break;

   	case 'Rain':
   	case 'Drizzle':
   	case 'Mist':
   		document.body.style.backgroundImage = 'url("css/rain.jpg")';
   		break;

   	case 'Thunderstorm':
   		document.body.style.backgroundImage = 'url("css/strom.jpg")';
   		break;

   	case 'Snow':
   		document.body.style.backgroundImage = 'url("css/snow.jpg")';
   		break;
   	default:
   	break;
}


let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
let temperture =document.getElementById('temperture');
let humidity = document.getElementById('humidity');
let windSpeed = document.getElementById('windSpeed');
let cityHeader = document.getElementById('cityHeader');
let weatherIcon = document.getElementById('iconImg');

weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';

let resultDescription = resultFromServer.weather[0].description;
weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

temperture.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176';
windSpeed.innerHTML = 'Wind Speed : ' + Math.floor(resultFromServer.wind.speed) + 'm/s';
cityHeader.innerHTML = resultFromServer.name;
humidity.innerHTML = 'Humidity Levels :  ' + resultFromServer.main.humidity + '%';

setPositionForWetherInfo();

}



function setPositionForWetherInfo() {
	let weatherContainer = document.getElementById('weatherContainer');
	let weatherContainerHeight =  weatherContainer.clientHeight;
	let weatherContainerWidth = weatherContainer.clientWidth;


	weatherContainer.style.left = `calc(50% ~ ${weatherContainerWidth/2}px)`;
	weatherContainer.style.top = `calc(50% ~ ${weatherContainerHeight/1.3}px)`;
	weatherContainer.style.visibility = 'visible';
}








document.getElementById('searchBtn').addEventListener('click', () => {
	let searchTerm = document.getElementById('searchInput').value;
	if(searchTerm)
		searchWeather(searchTerm);
})