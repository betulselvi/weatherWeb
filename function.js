
async function getWeather(place) {
    // OpenWeatherMap API url with key for connect the API
    const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=d1a52b725a291e3bb76f19382f10bda3&units=metric`

    const response = await fetch(api_url);
    const data = await response.json();

    //display weather and description
    const temperature = data.main.temp;
    const weatherDescription = data.weather[0].description;

    // for showing the weather information, the DOM elements are updated 
    document.getElementById("weather").innerText = `${place}'s weather: ${temperature}°C, ${weatherDescription}`;
}

//whole mouseover movement is perceived with country paths
document.querySelectorAll(".clicks").forEach(e => {
  e.setAttribute('class', `clicks ${e.id}`);
  e.addEventListener("mouseover", function () {
      window.onmousemove = function (j) {
          x = j.clientX;
          y = j.clientY;
          document.getElementById('country').style.top = y - 60 + 'px';
          document.getElementById('country').style.left = x + 10 + 'px';
      };
      //change the color when mouse came in the country
      const classes = e.className.baseVal.replace(/ /g, '.');
      document.querySelectorAll(`.${classes}`).forEach(country => {
          country.style.fill = "#006284";
      });
      //gives countryname for each mouse movement
      document.getElementById("country").style.opacity = 1;
      document.getElementById("countryName").innerText = e.id;
  });
  //if mouse leave the country border, restore the map
  e.addEventListener("mouseleave", function () {
      const classes = e.className.baseVal.replace(/ /g, '.');
      document.querySelectorAll(`.${classes}`).forEach(country => {
          country.style.fill = "#00394f";
      });
      document.getElementById("country").style.opacity = 0;
  });
  //click function for display the weather API
  e.addEventListener("click", function () {
      getWeather(e.id);
  });
});

