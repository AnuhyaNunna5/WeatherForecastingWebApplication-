const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloudy');
const humidityOutput = document.querySelector('.humidity');
const windOutput= document.querySelector('.wind');
const form = document.querySelector('.locationInput');
const search= document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');

//Default city when page loads
let cityInput = "Hyderabad";




//Add click event to each city in the panel
cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        //Change from default to clicked One
        cityInput = e.target.innerHTML;
        //Function that fetches and displays all the data from weather API
        fetchWeatherData();
        //Fade out the app 
        app.style.opacity = "0";
    });
})

//Add submit event to form
form.addEventListener('submit', (e) =>{
    //If input field is empty throw an alert
    if(search.value.length === 0){
        alert('Please type a city name.');
    } else{
        cityInput = search.value;
        fetchWeatherData();
        search.value = "";
        app.style.opacity = "0";
    }

    //Prevent default behaviour of the form
    e.preventDefault();
      
});

//Function that returns a day of the week
function dayOfTheWeek(day, month, year){
    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    return weekday[new Date(`${day}/${month}/${year}`).getDay()];
};

function fetchWeatherData(){
    fetch(`https://api.weatherapi.com/v1/current.json?q=${cityInput}&key=f28452f197d445e8ac7115857241705`)
    //Convert JSON FORMAT data to regular JS object
    .then(response => response.json())
    .then(data => {
        console.log(data);

        //Add temp and weather to page
        temp.innerHTML = data.current.temp_c + "&#176;";
        conditionOutput.innerHTML = data.current.condition.text;

        //get date and time
        const date = data.location.localtime;
        const y = parseInt(date.substr(0, 4));
        const m = parseInt(date.substr(5, 2));
        const d = parseInt(date.substr(8, 2));
        const time = date.substr(11);

        dayOfTheWeek(d, m, y)

        dateOutput.innerHTML = ` ${d}/ ${m}/ ${y}`;
        timeOutput.innerHTML = time;
        //Add name of city into the page
        nameOutput.innerHTML = data.location.name;
        //Get corresponding  icon url
        const iconId = data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64*64".length);
        icon.src = "./icons/" + iconId;
        
        //Add weather Details
        cloudOutput.innerHTML = data.current.cloud + "%";
        humidityOutput.innerHTML = data.current.humidity + "%";
        windOutput.innerHTML = data.current.wind_kph + "km/hr";
        
        //set default time of day
        let timeofDay = "day";
        const code = data.current.condition.code;
        console.log(code);

        if(!data.current.is_day){
            timeofDay = "night";
        }
        
        if(code == 1000){
            app.style.backgroundImage = `url(./images/${timeofDay}/clear.jpg)`;
            btn.style.background = "#e5ba92";
            if(timeofDay == "night"){
                btn.style.background = "#181e27";
            }
        }
        else if(
            code == 1006 || code == 1009 ||
            code == 1069 || code == 1087 || code == 1135 
        ) {
            app.style.backgroundImage = `url(./images/${timeofDay}/cloudy.jpg)`;
            btn.style.background = "#fa6d1b";
            if(timeofDay == "night"){
                btn.style.background = "#181e27";
            }
        }
        else if(
            code == 1063 || code == 1069 || code == 1072 || code == 1150 ||
            code == 1153 || code == 1180 || code == 1183 || code == 1186 ||
            code == 1189 || code == 1192 || code == 1195 || code == 1204 ||
            code == 1207 || code == 1240 || code == 1243 || code == 1246 ||
            code == 1249 || code == 1252 
        ) {
            app.style.backgroundImage = `url(./images/${timeofDay}/rainy.jpg)`;
            btn.style.background = "#647d75";
            if(timeofDay == "night"){
                btn.style.background = "#325c80";
            }
        } 
        else if(
            code == 1273 || code == 1276 
        ){
            app.style.backgroundImage = `url(./images/${timeofDay}/thunder.jpg)`;
            btn.style.background = "#647d75";
            if(timeofDay == "night"){
                btn.style.background = "#325c80";
            }
        }
        else if(code == 1030){
            app.style.backgroundImage = `url(./images/${timeofDay}/mist.jpg)`;
            btn.style.background = "#647d75";
            if(timeofDay == "night"){
                btn.style.background = "#325c80";
            }
        }    
        else if(code == 1003){
            app.style.backgroundImage = `url(./images/${timeofDay}/partlycloudy.jpg)`;
            btn.style.background = "#fa6d1b";
            if(timeofDay == "night"){
                btn.style.background = "#181e27";
            }
        } 
        else if(code == 1282 || code == 1279) {
            app.style.backgroundImage = `url(./images/${timeofDay}/thsnow.jpg)`;
            btn.style.background = "#647d75";
            if(timeofDay == "night"){
                btn.style.background = "#325c80";
            } 
        } 
        else {
            app.style.backgroundImage = `url(./images/${timeofDay}/snowy.jpg)`;
            btn.style.background = "#4d72aa";
            if(timeofDay == "night"){
                btn.style.background = "#1b1b1b";
            }
        }
        
        app.style.opacity = "1";
    })
    //If user types a city that doesn't exist
    .catch(() => {
        alert("City not found , please try again");
        app.style.opacity = "1";
     
    });
}

//call the function on page load
fetchWeatherData();
app.style.opacity = "1";
