const BASE_URL = "http://api.openweathermap.org/data/2.5/forecast?zip=";
const API_KEY = 'e0abcd1b2b4a5053e916c3789faba5f3'; //api key

//const city = document.getElementById('city').value;
//input = document.querySelector('#getTemp');


const button = document.querySelector('button');

let fiveDay = async function () {
  button.addEventListener('click', async () => {
    const zipCode = document.querySelector('#zip').value;
    console.log(zipCode);

    const weather = await axios.get(`${BASE_URL}${zipCode},us&units=imperial&APPID=${API_KEY}`)
      .then(weather => {
        console.log(weather);
        //newPic.innerHTML = `<img src="${imgResponse.data[0].url}">`
        //renderPics(imgResponse);  // render drop down data
      })
      .catch(error => {
        console.log(error);
      })
  })
}
fiveDay();