const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherDisplayElements = document.querySelectorAll(".display-info p");
const clearHistoryBtn = document.getElementById("clear-history-btn");
const historyMessage = document.getElementById("history-message");
let searchedCities = [];
searchBtn.addEventListener("click", function () {
  if (searchBtn.disabled) {
    return;
  }

  historyMessage.textContent = "";

  let currentCityName = cityInput.value.trim();

  if (currentCityName === "") {
    alert("Add city name please");
  } else {
    if (searchedCities.includes(currentCityName.toLowerCase())) {
      alert("You have already searched for this city.");
    } else {
      getWeatherInfo(currentCityName);
    }
  }

  cityInput.value = "";
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
    } else {
      clearWeatherInfo();
      const errorData = await response.json();
      alert(errorData.error);
    }
  } catch (error) {
    clearWeatherInfo();
    alert("Unable to connect to the weather server. Please try again.");
  } finally {
    searchBtn.textContent = "Search";
    searchBtn.disabled = false;
  }
}

clearHistoryBtn.addEventListener("click", function () {
  if (searchedCities.length === 0) {
    historyMessage.textContent = "Search history is already empty";
  } else {
    searchedCities.splice(0, searchedCities.length);
    historyMessage.textContent = "Search history cleared successfully!";
    clearWeatherInfo();
  }
});
