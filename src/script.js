// HTML TAGS
var themeBtn = document.querySelector("#themeBtn");
var htmlTag = document.getElementsByTagName("html")[0];
var searchPlaceInput = document.querySelector("#searchPlaceInput");
var searchBtn = document.querySelector("#searchBtn");
var smSearchBtn = document.querySelector("#smSearchBtn");
var autoCompleteList = document.querySelector("#autoCompleteList");
var placeNameHeading = document.querySelector("#placeNameHeading");
var hourlyWeatherDiv = document.querySelector("#hourlyWeatherDiv");
var dailyWeatherDiv = document.querySelector("#dailyWeatherDiv");
var weatherDataDiv = document.querySelector("#weatherDataDiv");
var loadingDiv = document.querySelector("#loadingDiv");
var imgPlaceholderDiv = document.querySelector("#imgPlaceholderDiv");
var smSearchPlaceInput = document.querySelector("#smSearchPlaceInput");
var smAutoCompleteList = document.querySelector("#smAutoCompleteList");
var errorDiv = document.querySelector("#errorDiv");
var searchResultDiv = document.querySelector("#searchResultDiv");
// CURRENT WEATHER HTML TAGS
var currentDate = document.querySelector("#currentDate");
var currentStatus = document.querySelector("#currentStatus");
var currentStatusImage = document.querySelector("#currentStatusImage");
var currentFeelsLike = document.querySelector("#currentFeelsLike");
var currentTemperature = document.querySelector("#currentTemperature");
var currentVisibility = document.querySelector("#currentVisibility");
var currentHumidity = document.querySelector("#currentHumidity");
var currentWindSpeed = document.querySelector("#currentWindSpeed");
var currentAirPressure = document.querySelector("#currentAirPressure");
// CUSTOM VARIABLES
// c9739e568amshff3d1b6bdced7f8p1457b4jsncda082b8b2f1
var timer;
var headers = {
    'X-RapidAPI-Key': '07e28121b2msh07e871d66d91487p1014b5jsn971b210805c6',
    'X-RapidAPI-Host': 'ai-weather-by-meteosource.p.rapidapi.com'
};
// CUSTOM FUNCTIONS
function clearSearchResultDiv() {
    while (searchResultDiv.firstChild)
        searchResultDiv.removeChild(searchResultDiv.firstChild);
    searchResultDiv.classList.add("hidden");
}
function clearAutoCompleteList() {
    while (autoCompleteList.firstChild)
        autoCompleteList.removeChild(autoCompleteList.firstChild);
    autoCompleteList.classList.add("hidden");
}
function smClearAutoCompleteList() {
    while (smAutoCompleteList.firstChild)
        smAutoCompleteList.removeChild(smAutoCompleteList.firstChild);
    smAutoCompleteList.classList.add("hidden");
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
        .then(function (response) {
        if (response.status !== 200)
            throw new Error("An Error Occured while fetching data");
        return response.json();
    })
        .then(function (data) {
        data.daily.data.map(function (day, index) {
            if (index > 0 && index < 8) {
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
                statusDatePara.textContent = "".concat(d.getDate() < 10 ? '0' : '').concat(d.getDate().toString(), "-").concat(d.getMonth() < 10 ? '0' : '').concat(d.getMonth() + 1, "-").concat(d.getFullYear());
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
                loadingDiv.classList.add("hidden");
                weatherDataDiv.classList.remove("hidden");
            }
        });
    })["catch"](function (error) {
        weatherDataDiv.classList.add("hidden");
        loadingDiv.classList.add("hidden");
        errorDiv.classList.remove("hidden");
        errorDiv.children[1].textContent = error.message;
    });
}
function fetchHourlyWeatherData(lat, lon) {
    var url = "https://ai-weather-by-meteosource.p.rapidapi.com/hourly?lat=".concat(lat, "&lon=").concat(lon, "&timezone=auto&language=en&units=auto");
    fetch(url, {
        method: "GET",
        headers: headers
    })
        .then(function (response) {
        if (response.status !== 200)
            throw new Error("An Error Occured while fetching data");
        else
            return response.json();
    })
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
    })["catch"](function (error) {
        weatherDataDiv.classList.add("hidden");
        loadingDiv.classList.add("hidden");
        errorDiv.classList.remove("hidden");
        errorDiv.children[1].textContent = error.message;
    });
    fetch7DayWeatherData(lat, lon);
}
function fetchCurrentWeatherData(lat, lon) {
    var url = "https://ai-weather-by-meteosource.p.rapidapi.com/current?lat=".concat(lat, "&lon=").concat(lon, "&timezone=auto&language=en&units=auto");
    fetch(url, {
        method: "GET",
        headers: headers
    })
        .then(function (response) {
        if (response.status !== 200)
            throw new Error("An Error Occured while fetching data");
        else
            return response.json();
    })
        .then(function (data) {
        var d = new Date();
        currentDate.textContent = "".concat(d.getDate(), "/").concat(d.getMonth() + 1, "/").concat(d.getFullYear());
        currentStatus.textContent = data.current.summary;
        currentStatusImage.src = "https://www.meteosource.com/static/img/ico/weather/".concat(data.current.icon_num, ".svg");
        currentFeelsLike.innerHTML = "Feels Like: ".concat(data.current.feels_like, "&deg;");
        currentTemperature.innerHTML = "".concat(data.current.temperature, "&deg;");
        currentVisibility.textContent = "".concat(data.current.visibility, "km");
        currentHumidity.textContent = "".concat(data.current.humidity, "%");
        currentWindSpeed.textContent = "".concat(data.current.wind.speed, "km/h");
        currentAirPressure.textContent = "".concat(data.current.pressure, "hPa");
        fetchHourlyWeatherData(lat, lon);
    })["catch"](function (error) {
        weatherDataDiv.classList.add("hidden");
        loadingDiv.classList.add("hidden");
        errorDiv.classList.remove("hidden");
        errorDiv.children[1].textContent = error.message;
    });
}
function fetchWeatherData(lat, lon) {
    clearHourlyWeatherData();
    clear7DayWeatherData();
    clearSearchResultDiv();
    imgPlaceholderDiv.classList.add("hidden");
    weatherDataDiv.classList.add("hidden");
    errorDiv.classList.add("hidden");
    loadingDiv.classList.remove("hidden");
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
function rendorSmAutoCompleteList(places) {
    places.map(function (place) {
        var listItem = document.createElement("li");
        listItem.classList.add("p-2", "text-[12px]", "dark:text-white", "hover:bg-[blue]", "hover:text-white");
        listItem.textContent = place.name + " (".concat(place.country, ")");
        listItem.onclick = function () {
            smClearAutoCompleteList();
            placeNameHeading.textContent = place.name + " (".concat(place.country, ")");
            fetchWeatherData(place.lat, place.lon);
        };
        smAutoCompleteList.appendChild(listItem);
    });
    smAutoCompleteList.classList.remove("hidden");
}
function fetchPlaceData() {
    if (!errorDiv.classList.contains("hidden"))
        errorDiv.classList.add("hidden");
    if (window.innerWidth >= 768)
        clearAutoCompleteList();
    else
        smClearAutoCompleteList();
    var searchValue = searchPlaceInput.value.split(" ").join("%20");
    var url = "https://ai-weather-by-meteosource.p.rapidapi.com/find_places?text=".concat(searchValue, "&language=en");
    fetch(url, { method: 'GET', headers: headers })
        .then(function (response) { return response.json(); })
        .then(function (data) {
        if (data.length) {
            if (window.innerWidth >= 768)
                rendorAutoCompleteList(data);
            else
                rendorSmAutoCompleteList(data);
        }
        else {
            if (window.innerWidth >= 768)
                clearAutoCompleteList();
            else
                smClearAutoCompleteList();
        }
    })["catch"](function (error) { return console.log(error); });
}
function searchPlaceManually() {
    weatherDataDiv.classList.add("add");
    clearSearchResultDiv();
    imgPlaceholderDiv.classList.add("hidden");
    var searchValue = searchPlaceInput.value.split(" ").join("%20");
    var url = "https://ai-weather-by-meteosource.p.rapidapi.com/find_places?text=".concat(searchValue, "&language=en");
    fetch(url, {
        method: 'GET',
        headers: headers
    })
        .then(function (response) {
        if (response.status !== 200)
            throw new Error("An Error Occured While Fetching Data");
        return response.json();
    })
        .then(function (data) {
        if (data.length > 0) {
            var para = document.createElement("p");
            para.textContent = "Search Results for \"";
            var span = document.createElement("span");
            span.textContent = searchPlaceInput.value;
            span.classList.add("font-bold");
            para.appendChild(span);
            para.textContent += '"';
            searchResultDiv.appendChild(para);
            searchResultDiv.classList.remove("hidden");
            data.map(function (place) {
                var div = document.createElement("div");
                div.classList.add("flex", "flex-col", "text-sm", "gap-2", "p-4", "cursor-pointer", "bg-white", "rounded-sm", "dark:bg-[#1f1f1f]");
                var divPara1 = document.createElement("p");
                var para1Span = document.createElement("span");
                para1Span.classList.add("font-bold");
                para1Span.textContent = "Location: ";
                divPara1.appendChild(para1Span);
                divPara1.textContent += (place.name + "(".concat(place.country, ")"));
                div.appendChild(divPara1);
                if (place.adm_area1) {
                    var divPara2 = document.createElement("p");
                    var para2Span = document.createElement("span");
                    para2Span.textContent = "Area: ";
                    para2Span.classList.add("font-bold");
                    divPara2.appendChild(para2Span);
                    divPara2.textContent += place.adm_area1;
                    div.appendChild(divPara2);
                }
                div.onclick = function () {
                    placeNameHeading.textContent = place.name + " (".concat(place.country, ")");
                    fetchWeatherData(place.lat, place.lon);
                };
                searchResultDiv.appendChild(div);
            });
        }
        else {
            var para = document.createElement("p");
            para.textContent = "No Results found for \"";
            var span = document.createElement("span");
            span.textContent = searchPlaceInput.value;
            span.classList.add("font-bold");
            para.appendChild(span);
            para.textContent += "\"";
            searchResultDiv.appendChild(para);
            searchResultDiv.classList.remove("hidden");
        }
    })["catch"](function (error) {
        searchResultDiv.classList.add("hidden");
        weatherDataDiv.classList.add("hidden");
        loadingDiv.classList.add("hidden");
        errorDiv.classList.remove("hidden");
        errorDiv.children[1].textContent = error.message;
    });
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
    smSearchPlaceInput.value = this.value;
    clearTimeout(timer);
    timer = setTimeout(function () {
        if (e.key.length === 1 && (e.key >= 'A' && e.key <= 'Z') || (e.key >= 'a' && e.key <= 'z')) {
            fetchPlaceData();
        }
    }, 400);
});
smSearchPlaceInput.addEventListener("input", function (e) {
    searchPlaceInput.value = this.value;
    clearTimeout(timer);
    timer = setTimeout(function () {
        if (e.data && (e.data.length === 1 && (e.data >= 'A' && e.data <= 'Z') || (e.data >= 'a' && e.data <= 'z'))) {
            fetchPlaceData();
        }
    }, 400);
});
searchPlaceInput.addEventListener("focus", function () {
    if (autoCompleteList.children.length > 0)
        autoCompleteList.classList.remove("hidden");
});
searchBtn.addEventListener("click", function () {
    weatherDataDiv.classList.add("hidden");
    if (window.innerWidth >= 768) {
        if (!autoCompleteList.classList.contains("hidden"))
            autoCompleteList.classList.add("hidden");
    }
    else {
        if (!smAutoCompleteList.classList.contains("hidden"))
            smAutoCompleteList.classList.add("hidden");
    }
    searchPlaceManually();
});
smSearchBtn.addEventListener("click", function () {
    weatherDataDiv.classList.add("hidden");
    if (window.innerWidth >= 768) {
        if (!autoCompleteList.classList.contains("hidden"))
            autoCompleteList.classList.add("hidden");
    }
    else {
        if (!smAutoCompleteList.classList.contains("hidden"))
            smAutoCompleteList.classList.add("hidden");
    }
    searchPlaceManually();
});
window.addEventListener("keyup", function (e) {
    if (e.key === 'Escape') {
        if (!autoCompleteList.classList.contains("hidden"))
            autoCompleteList.classList.add("hidden");
        if (!smAutoCompleteList.classList.contains("hidden"))
            smAutoCompleteList.classList.add("hidden");
    }
});
