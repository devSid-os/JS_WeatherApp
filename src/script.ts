// HTML TAGS
const themeBtn: HTMLElement = document.querySelector("#themeBtn")!;
const htmlTag: HTMLElement = document.getElementsByTagName("html")[0];
const searchPlaceInput: HTMLInputElement = document.querySelector("#searchPlaceInput")!;
const searchBtn: HTMLElement = document.querySelector("#searchBtn")!;
const smSearchBtn: HTMLElement = document.querySelector("#smSearchBtn")!;
const autoCompleteList: HTMLElement = document.querySelector("#autoCompleteList")!;
const placeNameHeading: HTMLElement = document.querySelector("#placeNameHeading")!;
const hourlyWeatherDiv: HTMLElement = document.querySelector("#hourlyWeatherDiv")!;
const dailyWeatherDiv: HTMLElement = document.querySelector("#dailyWeatherDiv")!;
const weatherDataDiv: HTMLElement = document.querySelector("#weatherDataDiv")!;
const loadingDiv: HTMLElement = document.querySelector("#loadingDiv")!;
const imgPlaceholderDiv: HTMLElement = document.querySelector("#imgPlaceholderDiv")!;
const smSearchPlaceInput: HTMLInputElement = document.querySelector("#smSearchPlaceInput")!;
const smAutoCompleteList: HTMLElement = document.querySelector("#smAutoCompleteList")!;
const errorDiv: HTMLElement = document.querySelector("#errorDiv")!;
const searchResultDiv: HTMLElement = document.querySelector("#searchResultDiv")!;
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
    lon: string,
    adm_area1: string | null
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
    },
    message: string
}

// CUSTOM VARIABLES
// c9739e568amshff3d1b6bdced7f8p1457b4jsncda082b8b2f1
var timer: number;
const headers = {
    'X-RapidAPI-Key': '07e28121b2msh07e871d66d91487p1014b5jsn971b210805c6',
    'X-RapidAPI-Host': 'ai-weather-by-meteosource.p.rapidapi.com'
}

// CUSTOM FUNCTIONS
function clearSearchResultDiv(): void {
    while (searchResultDiv.firstChild) searchResultDiv.removeChild(searchResultDiv.firstChild);
    searchResultDiv.classList.add("hidden");
}

function clearAutoCompleteList(): void {
    while (autoCompleteList.firstChild) autoCompleteList.removeChild(autoCompleteList.firstChild);
    autoCompleteList.classList.add("hidden");
}

function smClearAutoCompleteList(): void {
    while (smAutoCompleteList.firstChild) smAutoCompleteList.removeChild(smAutoCompleteList.firstChild);
    smAutoCompleteList.classList.add("hidden");
}

function clearHourlyWeatherData(): void {
    while (hourlyWeatherDiv.firstChild) hourlyWeatherDiv.removeChild(hourlyWeatherDiv.firstChild);
}

function clear7DayWeatherData(): void {
    while (dailyWeatherDiv.firstChild) dailyWeatherDiv.removeChild(dailyWeatherDiv.firstChild);
}

function fetch7DayWeatherData(lat: string, lon: string): void {
    const url: string = `https://ai-weather-by-meteosource.p.rapidapi.com/daily?lat=${lat}&lon=${lon}&language=en&units=auto`;
    fetch(url, {
        method: 'GET',
        headers
    })
        .then(response => {
            if (response.status !== 200) throw new Error("An Error Occured while fetching data");
            return response.json()
        })
        .then(data => {
            data.daily.data.map((day, index: number) => {
                if (index > 0 && index < 8) {
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
                    loadingDiv.classList.add("hidden");
                    weatherDataDiv.classList.remove("hidden");
                }
            })
        })
        .catch(error => {
            weatherDataDiv.classList.add("hidden");
            loadingDiv.classList.add("hidden");
            errorDiv.classList.remove("hidden");
            errorDiv.children[1].textContent = error.message;
        });
}

function fetchHourlyWeatherData(lat: string, lon: string): void {
    const url: string = `https://ai-weather-by-meteosource.p.rapidapi.com/hourly?lat=${lat}&lon=${lon}&timezone=auto&language=en&units=auto`;
    fetch(url, {
        method: "GET",
        headers
    })
        .then(response => {
            if (response.status !== 200) throw new Error("An Error Occured while fetching data");
            else return response.json();
        })
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
        .catch(error => {
            weatherDataDiv.classList.add("hidden");
            loadingDiv.classList.add("hidden");
            errorDiv.classList.remove("hidden");
            errorDiv.children[1].textContent = error.message;
        });
    fetch7DayWeatherData(lat, lon);
}

function fetchCurrentWeatherData(lat: string, lon: string): void {
    const url: string = `https://ai-weather-by-meteosource.p.rapidapi.com/current?lat=${lat}&lon=${lon}&timezone=auto&language=en&units=auto`;
    fetch(url, {
        method: "GET",
        headers
    })
        .then(response => {
            if (response.status !== 200) throw new Error("An Error Occured while fetching data");
            else return response.json()
        })
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
        .catch(error => {
            weatherDataDiv.classList.add("hidden");
            loadingDiv.classList.add("hidden");
            errorDiv.classList.remove("hidden");
            errorDiv.children[1].textContent = error.message;
        })
}

function fetchWeatherData(lat: string, lon: string): void {
    clearHourlyWeatherData();
    clear7DayWeatherData();
    clearSearchResultDiv();
    imgPlaceholderDiv.classList.add("hidden");
    weatherDataDiv.classList.add("hidden");
    errorDiv.classList.add("hidden");
    loadingDiv.classList.remove("hidden");
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

function rendorSmAutoCompleteList(places: Array<Place>): void {
    places.map((place: Place) => {
        const listItem: HTMLElement = document.createElement("li");
        listItem.classList.add("p-2", "text-[12px]", "dark:text-white", "hover:bg-[blue]", "hover:text-white")
        listItem.textContent = place.name + ` (${place.country})`;
        listItem.onclick = () => {
            smClearAutoCompleteList();
            placeNameHeading.textContent = place.name + ` (${place.country})`;
            fetchWeatherData(place.lat, place.lon);
        }
        smAutoCompleteList.appendChild(listItem);
    });
    smAutoCompleteList.classList.remove("hidden");
}

function fetchPlaceData(): void {
    if (!errorDiv.classList.contains("hidden")) errorDiv.classList.add("hidden");
    if (window.innerWidth >= 768) clearAutoCompleteList();
    else smClearAutoCompleteList();
    const searchValue: string = searchPlaceInput.value.split(" ").join("%20");
    const url: string = `https://ai-weather-by-meteosource.p.rapidapi.com/find_places?text=${searchValue}&language=en`;
    fetch(url, { method: 'GET', headers })
        .then(response => response.json())
        .then((data: Array<Place>) => {
            if (data.length) {
                if (window.innerWidth >= 768) rendorAutoCompleteList(data)
                else rendorSmAutoCompleteList(data);
            }
            else {
                if (window.innerWidth >= 768) clearAutoCompleteList();
                else smClearAutoCompleteList();
            }
        })
        .catch(error => console.log(error))
}

function searchPlaceManually() {
    weatherDataDiv.classList.add("add");
    clearSearchResultDiv();
    imgPlaceholderDiv.classList.add("hidden");
    const searchValue: string = searchPlaceInput.value.split(" ").join("%20");
    const url: string = `https://ai-weather-by-meteosource.p.rapidapi.com/find_places?text=${searchValue}&language=en`;
    fetch(url, {
        method: 'GET',
        headers
    })
        .then(response => {
            if (response.status !== 200) throw new Error("An Error Occured While Fetching Data");
            return response.json()
        })
        .then(data => {
            if (data.length > 0) {
                const para: HTMLParagraphElement = document.createElement("p");
                para.textContent = `Search Results for "`;
                const span: HTMLSpanElement = document.createElement("span");
                span.textContent = searchPlaceInput.value;
                span.classList.add("font-bold");
                para.appendChild(span);
                para.textContent += '"';
                searchResultDiv.appendChild(para);
                searchResultDiv.classList.remove("hidden");
                data.map((place: Place) => {
                    const div: HTMLDivElement = document.createElement("div");
                    div.classList.add("flex", "flex-col", "text-sm", "gap-2", "p-4", "cursor-pointer", "bg-white", "rounded-sm", "dark:bg-[#1f1f1f]");
                    const divPara1: HTMLParagraphElement = document.createElement("p");
                    const para1Span: HTMLSpanElement = document.createElement("span");
                    para1Span.classList.add("font-bold");
                    para1Span.textContent = `Location: `;
                    divPara1.appendChild(para1Span);
                    divPara1.textContent += (place.name + `(${place.country})`);
                    div.appendChild(divPara1);
                    if (place.adm_area1) {
                        const divPara2: HTMLElement = document.createElement("p");
                        const para2Span: HTMLSpanElement = document.createElement("span");
                        para2Span.textContent = "Area: ";
                        para2Span.classList.add("font-bold");
                        divPara2.appendChild(para2Span);
                        divPara2.textContent += place.adm_area1;
                        div.appendChild(divPara2);
                    }
                    div.onclick = function (): void {
                        placeNameHeading.textContent = place.name + ` (${place.country})`;
                        fetchWeatherData(place.lat, place.lon);
                    }
                    searchResultDiv.appendChild(div);
                })

            }
            else {
                const para: HTMLParagraphElement = document.createElement("p");
                para.textContent = "No Results found for \"";
                const span: HTMLSpanElement = document.createElement("span");
                span.textContent = searchPlaceInput.value;
                span.classList.add("font-bold");
                para.appendChild(span);
                para.textContent += "\"";
                searchResultDiv.appendChild(para);
                searchResultDiv.classList.remove("hidden");
            }
        })
        .catch(error => {
            searchResultDiv.classList.add("hidden");
            weatherDataDiv.classList.add("hidden");
            loadingDiv.classList.add("hidden");
            errorDiv.classList.remove("hidden");
            errorDiv.children[1].textContent = error.message;
        });
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
    smSearchPlaceInput.value = this.value;
    clearTimeout(timer);
    timer = setTimeout(() => {
        if (e.key.length === 1 && (e.key >= 'A' && e.key <= 'Z') || (e.key >= 'a' && e.key <= 'z')) {
            fetchPlaceData();
        }
    }, 400);
});

smSearchPlaceInput.addEventListener("input", function (e: InputEventInit): void {
    searchPlaceInput.value = this.value;
    clearTimeout(timer);
    timer = setTimeout(() => {
        if (e.data && (e.data.length === 1 && (e.data >= 'A' && e.data <= 'Z') || (e.data >= 'a' && e.data <= 'z'))) {
            fetchPlaceData();
        }
    }, 400);
});


searchPlaceInput.addEventListener("focus", function (): void {
    if (autoCompleteList.children.length > 0) autoCompleteList.classList.remove("hidden");
});

searchBtn.addEventListener("click", () => {
    weatherDataDiv.classList.add("hidden");
    if (window.innerWidth >= 768) {
        if (!autoCompleteList.classList.contains("hidden")) autoCompleteList.classList.add("hidden");
    }
    else {
        if (!smAutoCompleteList.classList.contains("hidden")) smAutoCompleteList.classList.add("hidden");
    }
    searchPlaceManually();
});

smSearchBtn.addEventListener("click", () => {
    weatherDataDiv.classList.add("hidden");
    if (window.innerWidth >= 768) {
        if (!autoCompleteList.classList.contains("hidden")) autoCompleteList.classList.add("hidden");
    }
    else {
        if (!smAutoCompleteList.classList.contains("hidden")) smAutoCompleteList.classList.add("hidden");
    }
    searchPlaceManually();
})

window.addEventListener("keyup", function (e: KeyboardEvent): void {
    if (e.key === 'Escape') {
        if (!autoCompleteList.classList.contains("hidden")) autoCompleteList.classList.add("hidden");
        if (!smAutoCompleteList.classList.contains("hidden")) smAutoCompleteList.classList.add("hidden");
    }
});