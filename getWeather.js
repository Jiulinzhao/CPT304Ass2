
const apiKey_0 = 'cc955627182341c8a0479993c68c3d4a';
const baseUrl_0 = 'https://api.weatherbit.io/v2.0/forecast/daily';

function getweather() {
    const city = document.getElementById('city').value;
    const checkIn = document.getElementById('checkin').value;
    const checkOut = document.getElementById('checkout').value;

    const checkInDate = new Date(checkIn);

    const checkOutDate = new Date(checkOut);
    const diffInDays = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

    const today = new Date();
    const sevenDaysFromNow = new Date(today.getTime() + (7 * 24 * 60 * 60 * 1000));


    if (checkInDate > sevenDaysFromNow) {
        alert('Check-in date must be within the next 7 days.');
        return;
    }
    if (checkOutDate > sevenDaysFromNow) {
        alert('Check-out date must be within the next 7 days.');
        return;
    }

    if (diffInDays > 7) {
        alert('Weather forecast is only available for 7 days. Please choose a shorter period.');
        return;
    }

    const url = `${baseUrl_0}?city=${city}&key=${apiKey_0}&days=${diffInDays}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherList = document.getElementById('weatherlist');
            weatherList.innerHTML = '';

            data.data.forEach(day => {
                const date = day.datetime;
                const condition = day.weather.description;
                const icon = `https://www.weatherbit.io/static/img/icons/${day.weather.icon}.png`;
                const minTemp = day.min_temp;
                const maxTemp = day.max_temp;

                const weatherItem = document.createElement('p');
                weatherItem.innerHTML = `Weather in ${city} on ${date}: ${condition} , Temperature: ${minTemp.toFixed(1)}°C - ${maxTemp.toFixed(1)}°C`;

                weatherList.appendChild(weatherItem);
            });
        })
        .catch(error => console.error(error));
}

