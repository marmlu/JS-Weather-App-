const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherDisplayElements = document.querySelectorAll(".display-info p");

searchBtn.addEventListener("click", function () {
  let cityName = weatherDisplayElements[0];
  cityName.textContent = "City Name: " + cityInput.value;
  cityInput.value = "";
});
