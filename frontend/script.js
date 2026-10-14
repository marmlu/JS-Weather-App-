const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherDisplayElements = document.querySelectorAll(".display-info p");

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
  searchBtn.disabled = true;
  searchBtn.textContent = "Loading...";

  let weathInfoNames = [
    "CityName: ",
    "Temperature: ",
    "Weather Description: ",
    "Humidity: ",
    "Wind Speed: ",
  ];
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
      cityName.textContent = "CityName: " + data.name;
      temperature.textContent = "Temperature: " + data.main.temp + "°C";
      description.textContent =
        "Weather Description: " + data.weather[0].description;
      humidity.textContent = "Humidity: " + data.main.humidity + "%";
      windSpeed.textContent = "Wind Speed: " + data.wind.speed + "m/s";

      console.log(data);
    } else {
      for (let i = 0; i < weatherDisplayElements.length; i++) {
        weatherDisplayElements[i].textContent = weathInfoNames[i];
      }
      const errorData = await response.json();
      alert(errorData.error);
    }
  } catch (error) {
    for (let i = 0; i < weatherDisplayElements.length; i++) {
      weatherDisplayElements[i].textContent = weathInfoNames[i];
    }
    alert("Unable to connect to the weather server. Please try again.");
    console.log(error);
  } finally {
    searchBtn.textContent = "Search";
    searchBtn.disabled = false;
  }
}
