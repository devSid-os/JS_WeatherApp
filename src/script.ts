// HTML TAGS
const themeBtn: HTMLElement = document.querySelector("#themeBtn")!;
const htmlTag: HTMLElement = document.getElementsByTagName("html")[0];
const searchPlaceInput: HTMLInputElement = document.querySelector("#searchPlaceInput")!;
const searchBtn: HTMLElement = document.querySelector("#searchBtn")!;
const autoCompleteList: HTMLElement = document.querySelector("#autoCompleteList")!;
const placeNameHeading: HTMLElement = document.querySelector("#placeNameHeading")!;
const hourlyWeatherDiv: HTMLElement = document.querySelector("#hourlyWeatherDiv");
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
var timer: any;
const headers = {
    'X-RapidAPI-Key': '3f1489736emsh7eec37b2c32c379p1aece3jsn609ca33e195e',
    'X-RapidAPI-Host': 'ai-weather-by-meteosource.p.rapidapi.com'
}

// CUSTOM FUNCTIONS
function fetchHourlyWeatherData(lat: string, lon: string) {
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
}

function fetchCurrentWeatherData(lat: string, lon: string) {
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

function fetchWeatherData(lat: string, lon: string) {
    // console.log(lat, lon)
    fetchCurrentWeatherData(lat, lon);
}

function clearAutoCompleteList() {
    while (autoCompleteList.firstChild) autoCompleteList.removeChild(autoCompleteList.firstChild);
    autoCompleteList.classList.add("hidden");
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
        themeBtn.setAttribute("title", "switch to light mode");
    }
    else {
        htmlTag.classList.add("dark");
        themeBtn.classList.remove("fa-sun");
        themeBtn.classList.add("fa-moon");
        themeBtn.setAttribute("title", "switch to dark mode");
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