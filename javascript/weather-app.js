// Get references to HTML elements
const inputBox = document.querySelector('.input-box');
const searchBtn = document.querySelector('.searchBtn');
const weatherImg = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const locationNotFound = document.querySelector('.location-not-found');
const weatherBody = document.querySelector('.weather-body');

// Function to check the weather for a given city
async function checkWeather(city) {
    // OpenWeatherMap API key
    const api_key = "f6389cff5b1c18c31812a3f3d53fc837";

    // API URL for fetching weather data
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    try {
        // Fetch weather data from the API
        const response = await fetch(url);
        const weatherData = await response.json();

        // Log the entire weather data object
        console.log("Weather Data:", weatherData);

        // Check if the location is not found (404 error)
        if (weatherData.cod === '404') {
            locationNotFound.style.display = "flex";
            weatherBody.style.display = "none";
            return;
        }

        // Display weather information
        locationNotFound.style.display = "none";
        weatherBody.style.display = "flex";
        temperature.innerHTML = `${Math.round(weatherData.main.temp - 273.15)}°C`;
        description.innerHTML = `${weatherData.weather[0].description}`;
        humidity.innerHTML = `${weatherData.main.humidity}%`;
        windSpeed.innerHTML = `${weatherData.wind.speed}Km/H`;

    } catch (error) {
        // Handle errors in fetching weather data
        console.error("Error fetching weather data:", error);
    }
}

// Event listener for the search button
searchBtn.addEventListener('click', () => {
    // Get the city from the input box
    const city = inputBox.value.trim();

    // Check if the input is not empty
    if (city) {
        // Call the function to check the weather for the specified city
        checkWeather(city);
    } else {
        // Handle the case where the input is empty
        console.error("Please enter a valid location");
    }
});