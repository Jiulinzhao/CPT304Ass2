const apiKey_1 = 'bf8f57d08b908d549c6c6b3ce33b36f4c42228fd';
const baseUrl_1 = 'https://calendarific.com/api/v2/holidays';

function getholiday() {
  const year = document.getElementById('year').value;
  const countryCode = document.getElementById('Countrycode').value;
  const url = `${baseUrl_1}?api_key=${apiKey_1}&country=${countryCode}&year=${year}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const holidayList = document.getElementById('holiday-list');
      holidayList.innerHTML = '';

      data.response.holidays.forEach(holiday => {
        const name = holiday.name;
        const date = holiday.date.iso;

        const holidayItem = document.createElement('li');
        holidayItem.textContent = `${name} (${date})`;
        holidayItem.addEventListener('click', () => {
          document.getElementById('checkin').value = date;
          document.getElementById('checkout').value = new Date(new Date(date).getTime() + (24 * 60 * 60 * 1000)).toISOString().slice(0, 10);
          getHotels();
        });

        holidayList.appendChild(holidayItem);
      });
    })
    .catch(error => console.error(error));
}
