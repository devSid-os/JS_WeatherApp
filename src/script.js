// HTML TAGS
var themeBtn = document.querySelector("#themeBtn");
var htmlTag = document.getElementsByTagName("html")[0];
var searchPlaceInput = document.querySelector("#searchPlaceInput");
var searchBtn = document.querySelector("#searchBtn");
var autoCompleteList = document.querySelector("#autoCompleteList");
var placeNameHeading = document.querySelector("#placeNameHeading");
var hourlyWeatherDiv = document.querySelector("#hourlyWeatherDiv");
// CURRENT WEATHER HTML TAGS
var currentStatus = document.querySelector("#currentStatus");
var currentStatusImage = document.querySelector("#currentStatusImage");
var currentFeelsLike = document.querySelector("#currentFeelsLike");
var currentTemperature = document.querySelector("#currentTemperature");
var currentVisibility = document.querySelector("#currentVisibility");
var currentHumidity = document.querySelector("#currentHumidity");
var currentWindSpeed = document.querySelector("#currentWindSpeed");
var currentAirPressure = document.querySelector("#currentAirPressure");
// CUSTOM VARIABLES
var timer;
var headers = {
    'X-RapidAPI-Key': '3f1489736emsh7eec37b2c32c379p1aece3jsn609ca33e195e',
    'X-RapidAPI-Host': 'ai-weather-by-meteosource.p.rapidapi.com'
};
// CUSTOM FUNCTIONS
function fetchHourlyWeatherData(lat, lon) {
    var url = "https://ai-weather-by-meteosource.p.rapidapi.com/hourly?lat=".concat(lat, "&lon=").concat(lon, "&timezone=auto&language=en&units=auto");
    fetch(url, {
        method: "GET",
        headers: headers
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
        data.hourly.data.map(function (item, index) {
            if (index < 6) {
                var div = document.createElement("div");
                var timePara = document.createElement("p");
                var img = document.createElement("img");
                var temperaturePara = document.createElement("p");
                div.classList.add("flex", "flex-col", "justify-between", "items-center", "gap-2");
                var d = new Date(item.date);
                timePara.textContent = "".concat(d.getHours() < 10 ? '0' : '') + d.getHours().toString() + ':00';
                img.src = "https://www.meteosource.com/static/img/ico/weather/".concat(item.icon, ".svg");
                temperaturePara.innerHTML = "".concat(item.temperature, "&deg;");
                div.appendChild(timePara);
                div.appendChild(img);
                div.appendChild(temperaturePara);
                hourlyWeatherDiv.appendChild(div);
            }
        });
    })["catch"](function (error) { return console.log(error); });
}
function fetchCurrentWeatherData(lat, lon) {
    var url = "https://ai-weather-by-meteosource.p.rapidapi.com/current?lat=".concat(lat, "&lon=").concat(lon, "&timezone=auto&language=en&units=auto");
    fetch(url, {
        method: "GET",
        headers: headers
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
        currentStatus.textContent = data.current.summary;
        currentStatusImage.src = "https://www.meteosource.com/static/img/ico/weather/".concat(data.current.icon_num, ".svg");
        currentFeelsLike.innerHTML = "Feels Like: ".concat(data.current.feels_like, "&deg;");
        currentTemperature.innerHTML = "".concat(data.current.temperature, "&deg;");
        currentVisibility.textContent = "".concat(data.current.visibility, "km");
        currentHumidity.textContent = "".concat(data.current.humidity, "%");
        currentWindSpeed.textContent = "".concat(data.current.wind.speed, "km/h");
        currentAirPressure.textContent = "".concat(data.current.pressure, "hPa");
        fetchHourlyWeatherData(lat, lon);
    })["catch"](function (error) { return console.log(error); });
}
function fetchWeatherData(lat, lon) {
    // console.log(lat, lon)
    fetchCurrentWeatherData(lat, lon);
}
function clearAutoCompleteList() {
    while (autoCompleteList.firstChild)
        autoCompleteList.removeChild(autoCompleteList.firstChild);
    autoCompleteList.classList.add("hidden");
}
function rendorAutoCompleteList(places) {
    places.map(function (place) {
        var listItem = document.createElement("li");
        listItem.textContent = place.name + " (".concat(place.country, ")");
        listItem.classList.add("px-2", "text-[12px]", "cursor-pointer", "hover:bg-[blue]", "hover:text-white", "dark:text-white");
        listItem.onclick = function () {
            clearAutoCompleteList();
            placeNameHeading.textContent = place.name + " (".concat(place.country, ")");
            fetchWeatherData(place.lat, place.lon);
        };
        autoCompleteList.appendChild(listItem);
    });
    autoCompleteList.classList.remove("hidden");
}
function fetchPlaceData() {
    clearAutoCompleteList();
    var url = "https://ai-weather-by-meteosource.p.rapidapi.com/find_places?text=".concat(searchPlaceInput.value, "&language=en");
    fetch(url, { method: 'GET', headers: headers })
        .then(function (response) { return response.json(); })
        .then(function (data) {
        // console.log(data)
        if (data.length) {
            rendorAutoCompleteList(data);
        }
        else
            clearAutoCompleteList();
    })["catch"](function (error) { return console.log(error); });
}
// ADD EVENT LISTENERS
themeBtn.addEventListener("click", function () {
    if (htmlTag.classList.contains("dark")) {
        htmlTag.classList.remove("dark");
        themeBtn.classList.remove("fa-moon");
        themeBtn.classList.add("fa-sun");
        themeBtn.setAttribute("title", "switch to light mode");
    }
    else {
        htmlTag.classList.add("dark");
        themeBtn.classList.remove("fa-sun");
        themeBtn.classList.add("fa-moon");
        themeBtn.setAttribute("title", "switch to dark mode");
    }
});
searchPlaceInput.addEventListener("keyup", function (e) {
    clearTimeout(timer);
    timer = setTimeout(function () {
        if (e.key.length === 1 && (e.key >= 'A' && e.key <= 'Z') || (e.key >= 'a' && e.key <= 'z')) {
            fetchPlaceData();
        }
    }, 400);
});
searchPlaceInput.addEventListener("focus", function () {
    if (autoCompleteList.children.length > 0)
        autoCompleteList.classList.remove("hidden");
});
window.addEventListener("keyup", function (e) {
    if (e.key === 'Escape')
        if (!autoCompleteList.classList.contains("hidden"))
            autoCompleteList.classList.add("hidden");
});
