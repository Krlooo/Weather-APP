const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const screenMain = document.getElementById('screenMain');
const weatherScreen = document.getElementById('weatherScreen');
const p_temp = document.getElementById('p_temp');
const img_temp = document.getElementById('img_temp');
const p_location = document.getElementById('p_location');
const p_wind = document.getElementById('p_wind');
const p_feels = document.getElementById('p_feels');


searchBtn.addEventListener('click', () => {
    getWeather(searchInput.value);
});
searchInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        getWeather(searchInput.value);
    }
});


async function getWeather(location = "Madrid") {
    const url = "https://weatherapi-com.p.rapidapi.com/current.json?q=" + location;
    const options = {
        method: 'GET',
        headers: {
            'content-type': 'application/octet-stream',
            'X-RapidAPI-Key': 'd2a33ca9bemshf523f8d871eba66p134d8fjsn1ce7d8127c9f',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        const resultData = JSON.parse(result);
        const locationName = resultData.location.name;
        const condition = resultData.current.condition.text;
        const wind_mph = resultData.current.wind_kph;
        const feelslike_c = resultData.current.feelslike_c;
        const icon = resultData.current.condition.icon
        const temp = resultData.current.temp_c
        console.log(result);
        img_temp.src = icon;
        p_location.innerText = locationName;
        p_temp.innerText = temp + " °C";
        p_feels.innerText = feelslike_c + " °C";
        p_wind.innerText = wind_mph + " KM/H";

        printOnscreen()
    } catch (error) {
        getWeather(location = "Madrid");
    }
};



function printOnscreen() {
    let inputValue = searchInput.value;
    if (inputValue.length > 1) {
        console.log(searchInput.value);
        console.log(weatherScreen.classList.contains('hidden') && screenMain.classList.contains('h-96'))

        if (weatherScreen.classList.contains('hidden') && !(screenMain.classList.contains('h-96'))) {

            weatherScreen.classList.toggle('hidden');
            screenMain.className += " h-[400px]";


        };
    }
}