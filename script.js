let cityName = document.getElementById("city");
let dateTime = document.getElementById("dateTime");
let wType = document.getElementById("weatherType");
let wIcon = document.getElementById("weatherIcon");
let temp = document.getElementById("temp");
let maxTemp = document.getElementById("maxTemp");
let minTemp = document.getElementById("minTemp");
let feelsLike = document.getElementById("tempValue");
let windSpd = document.getElementById("windValue");
let humidity = document.getElementById("humidityValue");
let pressure = document.getElementById("pressureValue");

//====================== To set Background Colours  =========================




const setBgColor = (weatherType) => {
  const body = document.querySelector(".container");
  body.classList.remove('thunderstorm', 'drizzle', 'rain', 'snow', 'atmosphere', 'clear', 'clouds'); // Remove existing weather classes


  // Add the new weather class
   switch(weatherType) {
      case 'Thunderstorm':
        body.classList.add('thunderstorm');
        break;
      case 'Drizzle':
        body.classList.add('drizzle');
        break;
      case 'Rain':
        body.classList.add('rain');
        break;
      case 'Snow':
        body.classList.add('snow');
        break;
      case 'Mist':
      case 'Smoke':
      case 'Haze':
      case 'Dust':
      case 'Fog':
      case 'Sand':
      case 'Ash':
      case 'Squall':
      case 'Tornado':
        body.classList.add('atmosphere');
        break;
      case 'Clear':
        body.classList.add('clear');
        break;
      case 'Clouds':
        body.classList.add('clouds');
        break;
      default:
        console.warn("Unknown weather type:", weatherType);
    
  };
  
};

//============================ Search for a city  ==========================



let citySearch = document.querySelector(".weatherSearch");
citySearch.addEventListener('submit', (e) => {
  e.preventDefault();
  let cityName = document.querySelector('.inputSearch');
  console.log(cityName.value);
  let city = cityName.value; 
  console.log("Searching for city:", city); 
  if (city) { // Ensure the city is not empty
    getData(city); // Pass the city name to getData
    cityName.value = "";
  } else {
    alert("Please enter a city name.");
  }
});

 // ================= Get country Name from their code =====================


const getCountryName = (code) => {
  return new Intl.DisplayNames(['en'], { type: 'region' }).of(code); 
};

//=========================   To get time and date ==================
const getDateTime = (dt) => {
  const curDate = new Date(dt * 1000);
  console.log("Current Date:", curDate); 
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const formatter = new Intl.DateTimeFormat("en-US", options); 
  return formatter.format(curDate);
};

//  ==================  To get weather data  through API =====================
const getData = async (city = 'delhi') => { // Default value 'delhi' for city
  let apiKey = 'ac24e6732e6da099076f8d324ef19863';
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=metric`;
  console.log("Fetching data for URL:", url); 
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log("Fetched data:", data); 
    const { main, name, sys, weather, wind, dt } = data;

    // Giving data to HTML elements
    
    cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
    dateTime.innerHTML = getDateTime(dt);
    wType.innerHTML = weather[0].main;
    wIcon.src = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`; 

    temp.innerHTML = `${main.temp}&#176;`;
    maxTemp.innerHTML = `Max: ${main.temp_max}&#176;`;
    minTemp.innerHTML = `Min: ${main.temp_min}&#176;`;
    feelsLike.innerHTML = `${main.feels_like}&#176;`;
    windSpd.innerHTML = `${wind.speed} m/s`;
    humidity.innerHTML = `${main.humidity}%`;
    pressure.innerHTML = `${main.pressure} hPa`; 

    setBgColor(weather[0].main);
  } catch (error) {
    console.error("Error fetching weather data:", error); 
  }
};


// It is used because the DOMContentLoaded event is fired when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, where load is used after loading all css .
document.addEventListener("DOMContentLoaded", () => getData());
