const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherDisplayElements = document.querySelectorAll(".display-info p");

searchBtn.addEventListener("click", function () {
  let cityName = weatherDisplayElements[0];
  if (cityInput.value.trim() === "") {
    alert("Add city name please");
  } else {
    cityName.textContent = "City Name: " + cityInput.value;
    let storedCityName = cityInput.value.trim();
    getWeatherInfo(storedCityName);
    cityInput.value = "";
  }
});
async function getWeatherInfo(cityNameValue) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/weather?city=${encodeURIComponent(cityNameValue)}`,
    );
    if (response.ok) {
      const data = await response.json();
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
    alert("Unexpected error or a network failure");
    console.log(error);
  }
}
