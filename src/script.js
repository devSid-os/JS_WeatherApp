// HTML TAGS
var themeBtn = document.querySelector("#themeBtn");
var htmlTag = document.getElementsByTagName("html")[0];
var searchPlaceInput = document.querySelector("#searchPlaceInput");
var searchBtn = document.querySelector("#searchBtn");
var autoCompleteList = document.querySelector("#autoCompleteList");
var placeNameHeading = document.querySelector("#placeNameHeading");
var hourlyWeatherDiv = document.querySelector("#hourlyWeatherDiv");
var dailyWeatherDiv = document.querySelector("#dailyWeatherDiv");
var weatherDataDiv = document.querySelector("#weatherDataDiv");
var loadingDiv = document.querySelector("#loadingDiv");
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
var loading = false;
var timer;
var headers = {
    'X-RapidAPI-Key': 'cae74949d8msh02766bd9c7bbf1dp196f23jsn64d2d289b116',
    'X-RapidAPI-Host': 'ai-weather-by-meteosource.p.rapidapi.com'
};
// CUSTOM FUNCTIONS
function clearAutoCompleteList() {
    while (autoCompleteList.firstChild)
        autoCompleteList.removeChild(autoCompleteList.firstChild);
    autoCompleteList.classList.add("hidden");
}
function clearHourlyWeatherData() {
    while (hourlyWeatherDiv.firstChild)
        hourlyWeatherDiv.removeChild(hourlyWeatherDiv.firstChild);
}
function clear7DayWeatherData() {
    while (dailyWeatherDiv.firstChild)
        dailyWeatherDiv.removeChild(dailyWeatherDiv.firstChild);
}
function fetch7DayWeatherData(lat, lon) {
    var url = "https://ai-weather-by-meteosource.p.rapidapi.com/daily?lat=".concat(lat, "&lon=").concat(lon, "&language=en&units=auto");
    fetch(url, {
        method: 'GET',
        headers: headers
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
        data.daily.data.map(function (day, index) {
            if (index < 7) {
                var parentDiv = document.createElement("div");
                var statusDiv = document.createElement("div");
                var statusImg = document.createElement("img");
                var statusFeelsLikePara = document.createElement("p");
                var statusDatePara = document.createElement("p");
                parentDiv.classList.add("tracking-widest", "p-4", "text-center", "flex", "justify-between", "items-stretch", "py-8", "overflow-x-auto", "gap-12", "md:gap-4", "bg-white", "dark:bg-[#1f1f1f]", "dark:text-white", "md:justify-around");
                statusDiv.classList.add("flex-1", "flex", "flex-col", "justify-around", "items-center", "gap-2", "md:justify-center");
                statusImg.src = "https://www.meteosource.com/static/img/ico/weather/".concat(day.icon, ".svg");
                statusFeelsLikePara.innerHTML = "Feels Like ".concat(day.feels_like, "&deg;");
                var d = new Date(day.day);
                statusDatePara.textContent = "".concat(d.getDate() < 10 ? '0' : '').concat(d.getDate().toString(), "-").concat(d.getMonth() < 10 ? '0' : '').concat(d.getMonth(), "-").concat(d.getFullYear());
                statusFeelsLikePara.classList.add("text-[10px]", "md:text-sm");
                statusDatePara.classList.add("text-[10px]", "md:text-sm");
                statusDiv.appendChild(statusImg);
                statusDiv.appendChild(statusFeelsLikePara);
                statusDiv.appendChild(statusDatePara);
                parentDiv.appendChild(statusDiv);
                // TEMPERATURE DIV DOM CODE
                var temperatureDiv = document.createElement("div");
                var temperatureHeading = document.createElement("p");
                var temperatureIcon = document.createElement("i");
                var temperaturePara = document.createElement("p");
                temperatureDiv.classList.add("flex-1", "flex", "flex-col", "justify-between", "items-center", "gap-4");
                temperatureHeading.classList.add("text-sm");
                temperaturePara.classList.add("text-sm");
                temperatureHeading.textContent = "Temperature";
                temperatureIcon.classList.add("fa-solid", "fa-temperature-three-quarters", "text-2xl", "md:text-4xl");
                temperaturePara.innerHTML = "".concat(day.temperature, "&deg;");
                temperatureDiv.appendChild(temperatureHeading);
                temperatureDiv.appendChild(temperatureIcon);
                temperatureDiv.appendChild(temperaturePara);
                parentDiv.appendChild(temperatureDiv);
                // VISIBILITY DIV DOM CODE
                var visibilityDiv = document.createElement("div");
                var visibilityHeading = document.createElement("p");
                var visibilityIcon = document.createElement("i");
                var visibilityPara = document.createElement("p");
                visibilityDiv.classList.add("flex-1", "flex", "flex-col", "justify-between", "items-center", "gap-4");
                visibilityHeading.classList.add("text-sm");
                visibilityPara.classList.add("text-sm");
                visibilityHeading.textContent = "Visibility";
                visibilityIcon.classList.add("fa-solid", "fa-eye", "text-2xl", "md:text-4xl");
                visibilityPara.textContent = "".concat(day.visibility, "km");
                visibilityDiv.appendChild(visibilityHeading);
                visibilityDiv.appendChild(visibilityIcon);
                visibilityDiv.appendChild(visibilityPara);
                parentDiv.appendChild(visibilityDiv);
                dailyWeatherDiv.appendChild(parentDiv);
                // HUMIDITY DIV DOM CODE
                var humidityDiv = document.createElement("div");
                var humidityHeading = document.createElement("p");
                var humidityIcon = document.createElement("i");
                var humidityPara = document.createElement("p");
                humidityDiv.classList.add("flex-1", "flex", "flex-col", "justify-between", "items-center", "gap-4");
                humidityHeading.classList.add("text-sm");
                humidityPara.classList.add("text-sm");
                humidityHeading.textContent = "Humidity";
                humidityIcon.classList.add("fa-solid", "fa-droplet", "text-2xl", "md:text-4xl");
                humidityPara.textContent = "".concat(day.humidity, "%");
                humidityDiv.appendChild(humidityHeading);
                humidityDiv.appendChild(humidityIcon);
                humidityDiv.appendChild(humidityPara);
                parentDiv.appendChild(humidityDiv);
                dailyWeatherDiv.appendChild(parentDiv);
                // WIND SPEED DIV DOM CODE
                var windSpeedDiv = document.createElement("div");
                var windSpeedHeading = document.createElement("p");
                var windSpeedIcon = document.createElement("i");
                var windSpeedPara = document.createElement("p");
                windSpeedDiv.classList.add("flex-1", "flex", "flex-col", "justify-between", "items-center", "gap-4");
                windSpeedHeading.classList.add("text-sm");
                windSpeedPara.classList.add("text-sm");
                windSpeedHeading.textContent = "Wind Speed";
                windSpeedIcon.classList.add("fa-solid", "fa-wind", "text-2xl", "md:text-4xl");
                windSpeedPara.textContent = "".concat(day.wind.speed, "km/h");
                windSpeedDiv.appendChild(windSpeedHeading);
                windSpeedDiv.appendChild(windSpeedIcon);
                windSpeedDiv.appendChild(windSpeedPara);
                parentDiv.appendChild(windSpeedDiv);
                dailyWeatherDiv.appendChild(parentDiv);
                // AIR PRESSURE DIV DOM CODE
                var airPressureDiv = document.createElement("div");
                var airPressureHeading = document.createElement("p");
                var airPressureIcon = document.createElement("i");
                var airPressurePara = document.createElement("p");
                airPressureDiv.classList.add("flex-1", "flex", "flex-col", "justify-between", "items-center", "gap-4");
                airPressureHeading.classList.add("text-sm");
                airPressurePara.classList.add("text-sm");
                airPressureHeading.textContent = "Air Pressure";
                airPressureIcon.classList.add("fa-solid", "fa-gauge", "text-2xl", "md:text-4xl");
                airPressurePara.textContent = "".concat(day.pressure, "hPa");
                airPressureDiv.appendChild(airPressureHeading);
                airPressureDiv.appendChild(airPressureIcon);
                airPressureDiv.appendChild(airPressurePara);
                parentDiv.appendChild(airPressureDiv);
                dailyWeatherDiv.appendChild(parentDiv);
                loading = false;
            }
        });
    })["catch"](function (error) { return console.log(error); });
}
function fetchHourlyWeatherData(lat, lon) {
    clearHourlyWeatherData();
    clear7DayWeatherData();
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
                timePara.classList.add("text-[11px]", "text-center", "font-bold", "md:text-sm");
                temperaturePara.classList.add("text-[11px]", "md:text-sm");
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
    fetch7DayWeatherData(lat, lon);
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
    loading = true;
    fetchCurrentWeatherData(lat, lon);
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
    var searchValue = searchPlaceInput.value.split(" ").join("%20");
    console.log(searchValue);
    var url = "https://ai-weather-by-meteosource.p.rapidapi.com/find_places?text=".concat(searchValue, "&language=en");
    fetch(url, { method: 'GET', headers: headers })
        .then(function (response) { return response.json(); })
        .then(function (data) {
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
        themeBtn.setAttribute("title", "switch to dark mode");
    }
    else {
        htmlTag.classList.add("dark");
        themeBtn.classList.remove("fa-sun");
        themeBtn.classList.add("fa-moon");
        themeBtn.setAttribute("title", "switch to light mode");
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
setInterval(function () {
    if (loading === true) {
        weatherDataDiv.classList.add("hidden");
        loadingDiv.classList.remove("hidden");
    }
    else {
        weatherDataDiv.classList.remove("hidden");
        loadingDiv.classList.add("hidden");
    }
}, 50);
