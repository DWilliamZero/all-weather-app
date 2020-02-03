const BASE_URL = "http://api.openweathermap.org/data/2.5/forecast?zip=";
const API_KEY = 'e0abcd1b2b4a5053e916c3789faba5f3'; //api key

const weekDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
let date = new Date();   //grab local date
let today = date.getDay();  //calculate day of the week as integer
let card = '';

const button = document.querySelector('button');

const degsToCard = function (degs) {                                  //converts compass degress to cardinal headings
  if ((degs >= 0 && degs <= 22) || (degs >= 338 && degs <= 360)) {
    card = 'N';
  } else if (degs >= 23 && degs <= 67) {
    card = 'NE';
  } else if (degs >= 68 && degs <= 112) {
    card = 'E';
  } else if (degs >= 113 && degs <= 157) {
    card = 'SE';
  } else if (degs >= 158 && degs <= 202) {
    card = 'S';
  } else if (degs >= 203 && degs <= 247) {
    card = 'SW';
  } else if (degs >= 248 && degs <= 292) {
    card = 'W';
  } else if (degs >= 293 && degs <= 337) {
    card = 'NW';
  }
  return card;
}

const renderWeather = function (weather) {

  let city = weather.data.city.name;            //identify city and post it
  let cityDiv = document.createElement('div');
  cityDiv.className = `city-name`;
  cityDiv.innerHTML = `<h2>Today's Weather:</h2><br><h1>${city}</h1>`;
  document.querySelector('.city').append(cityDiv)

  for (let i = 0; i < 40; i += 8) {     //weather data is in 3-hour blocks, adding 8 jumos 24-hrs ahead
    //newDivToday = newDivToday.createElement('div');

    let temp = weather.data.list[i].main.temp;          //gather all variables
    let cloud = weather.data.list[i].weather[0].description;
    let speed = weather.data.list[i].wind.speed;
    let direction = weather.data.list[i].wind.deg;

    let cardinal = degsToCard(direction);  //returns cardinal heading conversion

    let day = weekDay[today + (i / 8 + 1)];    //convert day to words for each ith-day

    let newDiv = document.createElement('div');  //create new divs each forecast

    newDiv.className = `day-${i / 8 + 1}`;  // give each day a unique class name (for styling later)

    if (i === 0) {
      newDiv.innerHTML = `<h3>${cloud}</h3><h1>${Math.floor(temp)}&#8457;</h1><h3>Wind: ${cardinal} @ ${Math.floor(speed)}-KTS</h3>`
      document.querySelector(".today").append(newDiv)
    } else {
      newDiv.innerHTML = `<h1>${day}</h1><h3>${cloud}</h3><h1>${Math.floor(temp)}&#8457;</h1><h3>Wind: ${cardinal} @ ${Math.floor(speed)}-KTS</h3>`
      document.querySelector(".nextFour").append(newDiv)
    }
  }
}

let fiveDay = async function () {
  button.addEventListener('click', async () => {
    const zipCode = document.querySelector('#zip').value;
    const weather = await axios.get(`${BASE_URL}${zipCode},us&units=imperial&APPID=${API_KEY}`)
      .then(weather => {
        renderWeather(weather);
        //console.log(weather);
      })
      .catch(error => {
        console.log(error);
      })
  })
}
fiveDay();