const BASE_URL = "http://api.openweathermap.org/data/2.5/forecast?zip=";
const API_KEY = 'e0abcd1b2b4a5053e916c3789faba5f3'; //api key

let emailSent = false;
let city = '';

const weekDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed'];
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

  city = weather.data.city.name;            //identify city and post it
  let cityDiv = document.createElement('div');
  cityDiv.className = `city-name`;
  cityDiv.innerHTML = `<h2>Today's Weather:</h2><br><h1>${city}</h1>`;
  document.querySelector('.city').append(cityDiv)

  for (let i = 0; i < 40; i += 8) {                          //weather data is in 3-hour blocks, adding 8 jumos 24-hrs ahead

    let temp = weather.data.list[i].main.temp;               //gather all variables
    let cloud = weather.data.list[i].weather[0].description;
    let speed = weather.data.list[i].wind.speed;
    let direction = weather.data.list[i].wind.deg;
    let norm = i / 8 + 1;                                    //normalizes the values of day from 1 to 5

    let cardinal = degsToCard(direction);  //returns cardinal heading conversion

    let day = weekDay[today + (i / 8)];    //convert day to words for each ith-day

    let newDiv = document.createElement('div');  //create new divs each forecast

    newDiv.className = `day-${norm}`;  // give each div a unique class name (for styling later)

    if (i === 0) {
      newDiv.innerHTML = `<h3 class='today-cloud'>${cloud}</h3><h1 class='today-temp'>${Math.floor(temp)}&#8457;</h1><h3 class='today-wind'>Wind: ${cardinal} @ ${Math.floor(speed)}-KTS</h3><button class='btn-forecast' id="myBtn-${norm}">Share</button>`
      document.querySelector(".today").append(newDiv)
    } else {
      newDiv.innerHTML = `<h1 class='h1-day-${norm}'>${day}</h1><h3 class='h3-cloud-${norm}'>${cloud}</h3><h1 class='h1-temp-${norm}'>${Math.floor(temp)}&#8457;</h1><h3 class='h3-wind-${norm}'>Wind: ${cardinal} @ ${Math.floor(speed)}-KTS</h3><button class='btn-forecast' id="myBtn-${norm}">Share</button>`
      document.querySelector(".nextFour").append(newDiv);
    }
  }
  modalFunc();
  return city;
}

const fiveDay = async function () {
  button.addEventListener('click', async () => {
    const zipCode = document.querySelector('#zip').value;
    const weather = await axios.get(`${BASE_URL}${zipCode},us&units=imperial&APPID=${API_KEY}`)
      .then(weather => {
        document.querySelector('.city').innerHTML = '';      //ensure .city is clear
        document.querySelector('.today').innerHTML = '';     //ensure .today is clear
        document.querySelector('.nextFour').innerHTML = '';  //ensure .nextFour is clear
        renderWeather(weather);
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

let emailWeather = '';

const modalFunc = function () {

  let modal = document.getElementById("myModal");               //target modal

  let btnToday = document.getElementById(`myBtn-1`);            // Get the buttons that open the modal
  let btn2 = document.getElementById(`myBtn-2`);
  let btn3 = document.getElementById(`myBtn-3`);
  let btn4 = document.getElementById(`myBtn-4`);
  let btn5 = document.getElementById(`myBtn-5`);



  let span = document.getElementsByClassName("close")[0];       // Get the <span> element that closes the modal


  btnToday.onclick = function () {                              // When the user clicks on the button, open the modal
    modal.style.display = "block";
    emailWeather = document.querySelector('.day-1').innerHTML;
  }
  btn2.onclick = function () {
    modal.style.display = "block";
    emailWeather = document.querySelector('.day-2').innerHTML;
  }
  btn3.onclick = function () {
    modal.style.display = "block";
    emailWeather = document.querySelector('.day-3').innerHTML;
  }
  btn4.onclick = function () {
    modal.style.display = "block";
    emailWeather = document.querySelector('.day-4').innerHTML;
  }
  btn5.onclick = function () {
    modal.style.display = "block";
    emailWeather = document.querySelector('.day-5').innerHTML;
  }

  span.onclick = function () {                                    // When the user clicks on <span> (x), close the modal
    if (emailSent === true) {
      modal.style.display = "none";
      location.reload();
    } else { modal.style.display = "none"; }
  }

  window.onclick = function (event) {                            // When the user clicks anywhere outside of the modal, close it
    if (event.target == modal && emailSent === true) {
      modal.style.display = "none";
      location.reload();
    } else if (event.target == modal) { modal.style.display = "none"; }
  }
}

///////////////////////////////////////
/////////                  ///////////
////////   Welcome To     ///////////
///////     Email JS     ///////////
//////                  ///////////
//////////////////////////////////

const emailBtn = document.querySelector('#email-btn');

const emailFunc = function () {
  emailBtn.addEventListener('click', async () => {
    const sender = document.querySelector('#sender').value;
    const email = document.querySelector('#email').value;
    const senderMessage = document.querySelector('#sender-message').value;

    let template_params = {
      "email": `${email}`,
      "reply_to": "the.all.weather.app@gmail.com",
      "senders_name": `${sender}`,
      "cityname": `${city}`,
      "message_html": `<p>${senderMessage}:</p><h1>The Weather in ${city} is:</h1>${emailWeather}`
    }

    let service_id = "default_service";
    let template_id = "template_hEYhSXl3";
    emailjs.send(service_id, template_id, template_params);
    document.querySelector('.modal-content').innerHTML = `<h2>Your Email Has Been Sent! Thanks!</h2>`;
    emailSent = true;
    return emailSent;
  })
}
emailFunc();