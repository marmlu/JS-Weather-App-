const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherDisplayElements = document.querySelectorAll(".display-info p");
const clearHistoryBtn = document.getElementById("clear-history-btn");
let searchedCities = [];
let storedCityName = "";
searchBtn.addEventListener("click", function () {
  let currentCityName = cityInput.value.trim();
  if (searchBtn.disabled) {
    return;
  } else {
    if (cityInput.value.trim() === "") {
      alert("Add city name please");
    } else {
      if (searchedCities.includes(currentCityName.toLowerCase())) {
        alert(
          "The city is the same as one of searched city from previously searched cities",
        );
      } else {
        getWeatherInfo(currentCityName);
      }
    }
    cityInput.value = "";
  }
});
let weathInfoNames = [
  "City Name: ",
  "Temperature: ",
  "Weather Description: ",
  "Humidity: ",
  "Wind Speed: ",
];
function clearWeatherInfo() {
  for (let i = 0; i < weatherDisplayElements.length; i++) {
    weatherDisplayElements[i].textContent = weathInfoNames[i];
  }
}
async function getWeatherInfo(cityNameValue) {
  searchBtn.disabled = true;
  searchBtn.textContent = "Loading...";
  try {
    const response = await fetch(
      `http://localhost:3000/api/weather?city=${encodeURIComponent(cityNameValue)}`,
    );
    if (response.ok) {
      const data = await response.json();
      let cityName = weatherDisplayElements[0];
      let temperature = weatherDisplayElements[1];
      let description = weatherDisplayElements[2];
      let humidity = weatherDisplayElements[3];
      let windSpeed = weatherDisplayElements[4];
      cityName.textContent = `City Name: ${data.name}`;
      temperature.textContent = `Temperature: ${data.main.temp.toFixed(1)} °C`;
      description.textContent = `Weather Description: ${data.weather[0].description}`;
      humidity.textContent = `Humidity: ${data.main.humidity} %`;
      windSpeed.textContent = `Wind Speed: ${data.wind.speed.toFixed(1)} m/s`;
      searchedCities.push(cityNameValue.toLowerCase());
      console.log(searchedCities);
    } else {
      clearWeatherInfo();
      const errorData = await response.json();
      alert(errorData.error);
    }
  } catch (error) {
    clearWeatherInfo();
    alert("Unable to connect to the weather server. Please try again.");
    console.log(error);
  } finally {
    searchBtn.textContent = "Search";
    searchBtn.disabled = false;
  }
}

clearHistoryBtn.addEventListener("click", function () {
  if (searchedCities.length === 0) {
    alert("Searched cities are already empty");
  } else {
    searchedCities.splice(0, searchedCities.length);
  }
  console.log(searchedCities);
});
