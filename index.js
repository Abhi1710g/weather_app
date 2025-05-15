async function getWeather() {
    const location = document.getElementById("locationInput").value;
    const resultDiv = document.getElementById("weatherResult");
  
    if (!location) {
      resultDiv.innerHTML = "Please enter a location.";
      return;
    }
  
    const apiKey = "f1f4eda7975249da945154723251405";
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Location not found");
  
      const data = await response.json();
      const { name, country } = data.location;
      const { temp_c, condition, humidity, wind_kph } = data.current;
  
      resultDiv.innerHTML = `
        <h3>${name}, ${country}</h3>
        <p><strong>${condition.text}</strong></p>
        <img src="${condition.icon}" alt="${condition.text}">
        <p>Temperature: ${temp_c}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind: ${wind_kph} kph</p>
      `;
    } catch (error) {
      resultDiv.innerHTML = "Could not retrieve weather data. Try a valid location.";
    }
  }
  