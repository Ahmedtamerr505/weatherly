async function search(city) {
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=64c4b142feb74961845154647250206&q=${city}&days=3`);
    if (response.ok && 400 != response.status) {
        let weatherData = await response.json();
        displayCurrent(weatherData.location, weatherData.current),
        displayAnother(weatherData.forecast.forecastday)
    }
}
document.getElementById("search").addEventListener("keyup", event => {
    search(event.target.value)
}
);
var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function displayCurrent(location, current) {
    if (null != current) {
        var lastUpdatedDate = new Date(current.last_updated.replace(" ", "T"));
        let html = `<div class="today forecast">
    <div class="forecast-header"  id="today">
    <div class="day">${daysOfWeek[lastUpdatedDate.getDay()]}</div>
    <div class="date">${lastUpdatedDate.getDate()} ${monthNames[lastUpdatedDate.getMonth()]}</div>
    </div> 
    <div class="forecast-content" id="current">
    <div class="location">${location.name}</div>
    <div class="degree">
        <div class="num">${current.temp_c}<sup>o</sup>C</div>
        <div class="forecast-icon">
            <img src="https:${current.condition.icon}" alt="" width=90>
        </div>	
    </div>
    <div class="custom">${current.condition.text}</div>
    <span><img src="images/icon-umberella@2x.png" alt="">20%</span>
    <span><img src="images/icon-wind@2x.png" alt="">18km/h</span>
    <span><img src="images/icon-compass@2x.png" alt="">East</span>
    </div>
</div>`;
        document.getElementById("forecast").innerHTML = html
    }
}
function displayAnother(forecastDays) {
    let html = "";
    for (let index = 1; index < forecastDays.length; index++)
        html += `\t<div class="forecast">\n        <div class="forecast-header">\n            <div class="day">${daysOfWeek[new Date(forecastDays[index].date.replace(" ", "T")).getDay()]}</div>\n        </div> \x3c!-- .forecast-header --\x3e\n        <div class="forecast-content">\n            <div class="forecast-icon">\n                <img src="https:${forecastDays[index].day.condition.icon}" alt="" width=48>\n            </div>\n            <div class="degree">${forecastDays[index].day.maxtemp_c}<sup>o</sup>C</div>\n            <small>${forecastDays[index].day.mintemp_c}<sup>o</sup></small>\n            <div class="custom">${forecastDays[index].day.condition.text}</div>\n        </div>\n        </div>`;
    document.getElementById("forecast").innerHTML += html
}
search("cairo");