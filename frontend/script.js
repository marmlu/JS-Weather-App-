const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherDisplayElements = document.querySelectorAll(".display-info p");
const searchBar = document.querySelector(".search-bar");

searchBtn.addEventListener("click", function () {
  if (cityInput.value.trim() === "") {
    alert("Add city name please");
  } else {
    let storedCityName = cityInput.value.trim();
    getWeatherInfo(storedCityName);
    cityInput.value = "";
  }
});
async function getWeatherInfo(cityNameValue) {
  const loadingMessage = document.createElement("p");
  try {
    loadingMessage.textContent = "Loading...";
    searchBar.appendChild(loadingMessage);
    const response = await fetch(
      `http://localhost:3000/api/weather?city=${encodeURIComponent(cityNameValue)}`,
    );
    if (response.ok) {
      const data = await response.json();

      weatherDisplayElements[0].textContent = "CityName: " + data.name;
      let temperature = weatherDisplayElements[1];
      let description = weatherDisplayElements[2];
      let humidity = weatherDisplayElements[3];
      let windSpeed = weatherDisplayElements[4];
      temperature.textContent = "Temperature: " + data.main.temp;
      description.textContent = "Description: " + data.weather[0].description;
      humidity.textContent = "Humidity: " + data.main.humidity;
      windSpeed.textContent = "Wind Speed: " + data.wind.speed;
      console.log(data);
    } else {
      const errorData = await response.json();

      alert(errorData.error);
    }
  } catch (error) {
    alert("Unable to connect to the weather server. Please try again.");
    console.log(error);
  } finally {
    if (searchBar.contains(loadingMessage)) {
      searchBar.removeChild(loadingMessage);
    }
  }
}
