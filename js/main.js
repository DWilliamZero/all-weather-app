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
    let norm = i / 8 + 1;     //normalizes the values of day from 1 to 5

    let cardinal = degsToCard(direction);  //returns cardinal heading conversion

    let day = weekDay[today + (i / 8)];    //convert day to words for each ith-day

    let newDiv = document.createElement('div');  //create new divs each forecast

    newDiv.className = `day-${norm}`;  // give each div a unique class name (for styling later)

    if (i === 0) {
      newDiv.innerHTML = `<h3 class='today-cloud'>${cloud}</h3><h1 class='today-temp'>${Math.floor(temp)}&#8457;</h1><h3 class='today-wind'>Wind: ${cardinal} @ ${Math.floor(speed)}-KTS</h3><button id="myBtn-today">Share</button>`
      document.querySelector(".today").append(newDiv)
    } else {
      newDiv.innerHTML = `<h1 class='h1-day-${norm}'>${day}</h1><h3 class='h3-cloud-${norm}'>${cloud}</h3><h1 class='h1-temp-${norm}'>${Math.floor(temp)}&#8457;</h1><h3 class='h3-wind-${norm}'>Wind: ${cardinal} @ ${Math.floor(speed)}-KTS</h3><button id="myBtn-${norm}">Share</button>`
      document.querySelector(".nextFour").append(newDiv);
    }
  }
  modalFunc();
}

let fiveDay = async function () {
  button.addEventListener('click', async () => {
    const zipCode = document.querySelector('#zip').value;
    const weather = await axios.get(`${BASE_URL}${zipCode},us&units=imperial&APPID=${API_KEY}`)
      .then(weather => {
        document.querySelector('.city').innerHTML = '';      //ensure .city is clear
        document.querySelector('.today').innerHTML = '';     //ensure .today is clear
        document.querySelector('.nextFour').innerHTML = '';  //ensure .nextFour is clear
        renderWeather(weather);
        //console.log(weather);
      })
      .catch(error => {
        console.log(error);
      })
  })
}
fiveDay();



///////////////////////////////////////
/////////                  ///////////
////////   Welcome To     ///////////
///////    Modal Town    ///////////
//////                  ///////////
//////////////////////////////////

const modalFunc = function () {

  let modal = document.getElementById("myModal");

  // Get the button that opens the modal
  let btnToday = document.getElementById(`myBtn-today`);
  let btn2 = document.getElementById(`myBtn-2`);
  let btn3 = document.getElementById(`myBtn-3`);
  let btn4 = document.getElementById(`myBtn-4`);
  let btn5 = document.getElementById(`myBtn-5`);


  // Get the <span> element that closes the modal
  let span = document.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the modal
  btnToday.onclick = function () {
    modal.style.display = "block";
  }
  btn2.onclick = function () {
    modal.style.display = "block";
  }
  btn3.onclick = function () {
    modal.style.display = "block";
  }
  btn4.onclick = function () {
    modal.style.display = "block";
  }
  btn5.onclick = function () {
    modal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}
