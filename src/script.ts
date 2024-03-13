// HTML TAGS
const themeBtn: HTMLElement = document.querySelector("#themeBtn")!;
const htmlTag: HTMLElement = document.getElementsByTagName("html")[0];
const searchPlaceInput: HTMLInputElement = document.querySelector("#searchPlaceInput")!;
const searchBtn: HTMLElement = document.querySelector("#searchBtn")!;
const autoCompleteList: HTMLElement = document.querySelector("#autoCompleteList")!;
const placeNameHeading: HTMLElement = document.querySelector("#placeNameHeading")!;
const hourlyWeatherDiv: HTMLElement = document.querySelector("#hourlyWeatherDiv")!;
const dailyWeatherDiv: HTMLElement = document.querySelector("#dailyWeatherDiv")!;
const weatherDataDiv: HTMLElement = document.querySelector("#weatherDataDiv")!;
const loadingDiv: HTMLElement = document.querySelector("#loadingDiv")!;
// CURRENT WEATHER HTML TAGS
const currentStatus: HTMLElement = document.querySelector("#currentStatus")!;
const currentStatusImage: HTMLImageElement = document.querySelector("#currentStatusImage")!;
const currentFeelsLike: HTMLElement = document.querySelector("#currentFeelsLike")!;
const currentTemperature: HTMLElement = document.querySelector("#currentTemperature")!;
const currentVisibility: HTMLElement = document.querySelector("#currentVisibility")!;
const currentHumidity: HTMLElement = document.querySelector("#currentHumidity")!;
const currentWindSpeed: HTMLElement = document.querySelector("#currentWindSpeed")!;
const currentAirPressure: HTMLElement = document.querySelector("#currentAirPressure")!;

// INTERFACES
interface Place {
    name: string,
    country: string,
    lat: string,
    lon: string
}

interface CurrentWeatherData {
    current: {
        temperature: number,
        feels_like: number,
        visibility: number,
        humidity: number,
        summary: string,
        wind: {
            speed: number
        },
        pressure: number,
        icon_num: number
    }
}

// CUSTOM VARIABLES
var loading: boolean = false;
var timer: number;
const headers = {
    'X-RapidAPI-Key': '3f1489736emsh7eec37b2c32c379p1aece3jsn609ca33e195e',
    'X-RapidAPI-Host': 'ai-weather-by-meteosource.p.rapidapi.com'
}

// CUSTOM FUNCTIONS
function clearAutoCompleteList(): void {
    while (autoCompleteList.firstChild) autoCompleteList.removeChild(autoCompleteList.firstChild);
    autoCompleteList.classList.add("hidden");
}

function clearHourlyWeatherData(): void {
    while (hourlyWeatherDiv.firstChild) hourlyWeatherDiv.removeChild(hourlyWeatherDiv.firstChild);
}

function clear7DayWeatherData(): void {
    while (dailyWeatherDiv.firstChild) dailyWeatherDiv.removeChild(dailyWeatherDiv.firstChild);
}

function fetch7DayWeatherData(lat: string, lon: string): void {
    const url = `https://ai-weather-by-meteosource.p.rapidapi.com/daily?lat=${lat}&lon=${lon}&language=en&units=auto`;
    fetch(url, {
        method: 'GET',
        headers
    })
        .then(response => response.json())
        .then(data => {
            data.daily.data.map((day, index: number) => {
                if (index < 7) {
                    const parentDiv: HTMLElement = document.createElement("div");
                    const statusDiv: HTMLElement = document.createElement("div");
                    const statusImg: HTMLImageElement = document.createElement("img");
                    const statusFeelsLikePara: HTMLElement = document.createElement("p");
                    const statusDatePara: HTMLElement = document.createElement("p");
                    parentDiv.classList.add("tracking-widest", "p-4", "text-center", "flex", "justify-between", "items-stretch", "py-8", "overflow-x-auto", "gap-12", "md:gap-4", "bg-white", "dark:bg-[#1f1f1f]", "dark:text-white", "md:justify-around");
                    statusDiv.classList.add("flex-1", "flex", "flex-col", "justify-around", "items-center", "gap-2", "md:justify-center");
                    statusImg.src = `https://www.meteosource.com/static/img/ico/weather/${day.icon}.svg`;
                    statusFeelsLikePara.innerHTML = `Feels Like ${day.feels_like}&deg;`;
                    const d = new Date(day.day);
                    statusDatePara.textContent = `${d.getDate() < 10 ? '0' : ''}${d.getDate().toString()}-${d.getMonth() < 10 ? '0' : ''}${d.getMonth()}-${d.getFullYear()}`;
                    statusFeelsLikePara.classList.add("text-[10px]", "md:text-sm");
                    statusDatePara.classList.add("text-[10px]", "md:text-sm");
                    statusDiv.appendChild(statusImg);
                    statusDiv.appendChild(statusFeelsLikePara);
                    statusDiv.appendChild(statusDatePara);
                    parentDiv.appendChild(statusDiv);

                    // TEMPERATURE DIV DOM CODE
                    const temperatureDiv: HTMLElement = document.createElement("div");
                    const temperatureHeading: HTMLElement = document.createElement("p");
                    const temperatureIcon: HTMLElement = document.createElement("i");
                    const temperaturePara: HTMLElement = document.createElement("p");
                    temperatureDiv.classList.add("flex-1", "flex", "flex-col", "justify-between", "items-center", "gap-4");
                    temperatureHeading.classList.add("text-sm");
                    temperaturePara.classList.add("text-sm");
                    temperatureHeading.textContent = "Temperature";
                    temperatureIcon.classList.add("fa-solid", "fa-temperature-three-quarters", "text-2xl", "md:text-4xl");
                    temperaturePara.innerHTML = `${day.temperature}&deg;`;
                    temperatureDiv.appendChild(temperatureHeading);
                    temperatureDiv.appendChild(temperatureIcon);
                    temperatureDiv.appendChild(temperaturePara);
                    parentDiv.appendChild(temperatureDiv);

                    // VISIBILITY DIV DOM CODE
                    const visibilityDiv: HTMLElement = document.createElement("div");
                    const visibilityHeading: HTMLElement = document.createElement("p");
                    const visibilityIcon: HTMLElement = document.createElement("i");
                    const visibilityPara: HTMLElement = document.createElement("p");
                    visibilityDiv.classList.add("flex-1", "flex", "flex-col", "justify-between", "items-center", "gap-4");
                    visibilityHeading.classList.add("text-sm");
                    visibilityPara.classList.add("text-sm");
                    visibilityHeading.textContent = "Visibility";
                    visibilityIcon.classList.add("fa-solid", "fa-eye", "text-2xl", "md:text-4xl");
                    visibilityPara.textContent = `${day.visibility}km`;
                    visibilityDiv.appendChild(visibilityHeading);
                    visibilityDiv.appendChild(visibilityIcon);
                    visibilityDiv.appendChild(visibilityPara);
                    parentDiv.appendChild(visibilityDiv);
                    dailyWeatherDiv.appendChild(parentDiv);

                    // HUMIDITY DIV DOM CODE
                    const humidityDiv: HTMLElement = document.createElement("div");
                    const humidityHeading: HTMLElement = document.createElement("p");
                    const humidityIcon: HTMLElement = document.createElement("i");
                    const humidityPara: HTMLElement = document.createElement("p");
                    humidityDiv.classList.add("flex-1", "flex", "flex-col", "justify-between", "items-center", "gap-4");
                    humidityHeading.classList.add("text-sm");
                    humidityPara.classList.add("text-sm");
                    humidityHeading.textContent = "Humidity";
                    humidityIcon.classList.add("fa-solid", "fa-droplet", "text-2xl", "md:text-4xl");
                    humidityPara.textContent = `${day.humidity}%`;
                    humidityDiv.appendChild(humidityHeading);
                    humidityDiv.appendChild(humidityIcon);
                    humidityDiv.appendChild(humidityPara);
                    parentDiv.appendChild(humidityDiv);
                    dailyWeatherDiv.appendChild(parentDiv);

                    // WIND SPEED DIV DOM CODE
                    const windSpeedDiv: HTMLElement = document.createElement("div");
                    const windSpeedHeading: HTMLElement = document.createElement("p");
                    const windSpeedIcon: HTMLElement = document.createElement("i");
                    const windSpeedPara: HTMLElement = document.createElement("p");
                    windSpeedDiv.classList.add("flex-1", "flex", "flex-col", "justify-between", "items-center", "gap-4");
                    windSpeedHeading.classList.add("text-sm");
                    windSpeedPara.classList.add("text-sm");
                    windSpeedHeading.textContent = "Wind Speed";
                    windSpeedIcon.classList.add("fa-solid", "fa-wind", "text-2xl", "md:text-4xl");
                    windSpeedPara.textContent = `${day.wind.speed}km/h`;
                    windSpeedDiv.appendChild(windSpeedHeading);
                    windSpeedDiv.appendChild(windSpeedIcon);
                    windSpeedDiv.appendChild(windSpeedPara);
                    parentDiv.appendChild(windSpeedDiv);
                    dailyWeatherDiv.appendChild(parentDiv);

                    // AIR PRESSURE DIV DOM CODE
                    const airPressureDiv: HTMLElement = document.createElement("div");
                    const airPressureHeading: HTMLElement = document.createElement("p");
                    const airPressureIcon: HTMLElement = document.createElement("i");
                    const airPressurePara: HTMLElement = document.createElement("p");
                    airPressureDiv.classList.add("flex-1", "flex", "flex-col", "justify-between", "items-center", "gap-4");
                    airPressureHeading.classList.add("text-sm");
                    airPressurePara.classList.add("text-sm");
                    airPressureHeading.textContent = "Air Pressure";
                    airPressureIcon.classList.add("fa-solid", "fa-gauge", "text-2xl", "md:text-4xl");
                    airPressurePara.textContent = `${day.pressure}hPa`;
                    airPressureDiv.appendChild(airPressureHeading);
                    airPressureDiv.appendChild(airPressureIcon);
                    airPressureDiv.appendChild(airPressurePara);
                    parentDiv.appendChild(airPressureDiv);
                    dailyWeatherDiv.appendChild(parentDiv);
                    loading = false;
                }
            })
        })
        .catch(error => console.log(error));
}

function fetchHourlyWeatherData(lat: string, lon: string): void {
    clearHourlyWeatherData();
    clear7DayWeatherData();
    const url = `https://ai-weather-by-meteosource.p.rapidapi.com/hourly?lat=${lat}&lon=${lon}&timezone=auto&language=en&units=auto`;
    fetch(url, {
        method: "GET",
        headers
    })
        .then(response => response.json())
        .then(data => {
            data.hourly.data.map((item, index: number) => {
                if (index < 6) {
                    const div: HTMLElement = document.createElement("div");
                    const timePara: HTMLElement = document.createElement("p");
                    const img: HTMLImageElement = document.createElement("img");
                    const temperaturePara: HTMLElement = document.createElement("p");
                    div.classList.add("flex", "flex-col", "justify-between", "items-center", "gap-2");
                    timePara.classList.add("text-[11px]", "text-center", "font-bold", "md:text-sm");
                    temperaturePara.classList.add("text-[11px]", "md:text-sm");
                    const d = new Date(item.date);

                    timePara.textContent = `${d.getHours() < 10 ? '0' : ''}` + d.getHours().toString() + ':00';
                    img.src = `https://www.meteosource.com/static/img/ico/weather/${item.icon}.svg`
                    temperaturePara.innerHTML = `${item.temperature}&deg;`;
                    div.appendChild(timePara);
                    div.appendChild(img);
                    div.appendChild(temperaturePara);
                    hourlyWeatherDiv.appendChild(div);
                }
            });
        })
        .catch(error => console.log(error))
    fetch7DayWeatherData(lat, lon);
}

function fetchCurrentWeatherData(lat: string, lon: string): void {
    const url = `https://ai-weather-by-meteosource.p.rapidapi.com/current?lat=${lat}&lon=${lon}&timezone=auto&language=en&units=auto`;
    fetch(url, {
        method: "GET",
        headers
    })
        .then(response => response.json())
        .then((data: CurrentWeatherData) => {
            currentStatus.textContent = data.current.summary;
            currentStatusImage.src = `https://www.meteosource.com/static/img/ico/weather/${data.current.icon_num}.svg`;
            currentFeelsLike.innerHTML = `Feels Like: ${data.current.feels_like}&deg;`;
            currentTemperature.innerHTML = `${data.current.temperature}&deg;`;
            currentVisibility.textContent = `${data.current.visibility}km`;
            currentHumidity.textContent = `${data.current.humidity}%`;
            currentWindSpeed.textContent = `${data.current.wind.speed}km/h`;
            currentAirPressure.textContent = `${data.current.pressure}hPa`;
            fetchHourlyWeatherData(lat, lon);
        })
        .catch(error => console.log(error))
}

function fetchWeatherData(lat: string, lon: string): void {
    loading = true;
    fetchCurrentWeatherData(lat, lon);
}

function rendorAutoCompleteList(places: Array<Place>): void {
    places.map((place: Place) => {
        const listItem: HTMLElement = document.createElement("li");
        listItem.textContent = place.name + ` (${place.country})`;
        listItem.classList.add("px-2", "text-[12px]", "cursor-pointer", "hover:bg-[blue]", "hover:text-white", "dark:text-white");
        listItem.onclick = () => {
            clearAutoCompleteList();
            placeNameHeading.textContent = place.name + ` (${place.country})`;
            fetchWeatherData(place.lat, place.lon);
        }
        autoCompleteList.appendChild(listItem);
    })
    autoCompleteList.classList.remove("hidden");
}

function fetchPlaceData(): void {
    clearAutoCompleteList();
    const url = `https://ai-weather-by-meteosource.p.rapidapi.com/find_places?text=${searchPlaceInput.value}&language=en`;
    fetch(url, { method: 'GET', headers })
        .then(response => response.json())
        .then((data: Array<Place>) => {
            // console.log(data)
            if (data.length) {
                rendorAutoCompleteList(data)
            }
            else clearAutoCompleteList();
        })
        .catch(error => console.log(error))
}

// ADD EVENT LISTENERS
themeBtn.addEventListener("click", function (): void {
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

searchPlaceInput.addEventListener("keyup", function (e: KeyboardEvent): void {
    clearTimeout(timer);
    timer = setTimeout(() => {
        if (e.key.length === 1 && (e.key >= 'A' && e.key <= 'Z') || (e.key >= 'a' && e.key <= 'z')) {
            fetchPlaceData();
        }
    }, 400);
})

searchPlaceInput.addEventListener("focus", function (): void {
    if (autoCompleteList.children.length > 0) autoCompleteList.classList.remove("hidden");
})

window.addEventListener("keyup", function (e: KeyboardEvent): void {
    if (e.key === 'Escape')
        if (!autoCompleteList.classList.contains("hidden")) autoCompleteList.classList.add("hidden");
})

setInterval((): void => {
    if (loading === true) {
        weatherDataDiv.classList.add("hidden");
        loadingDiv.classList.remove("hidden");
    }
    else {
        weatherDataDiv.classList.remove("hidden");
        loadingDiv.classList.add("hidden");
    }
}, 50)