const BASE_URL = "http://api.openweathermap.org/data/2.5/weather?q=";
const API_KEY = 'e0abcd1b2b4a5053e916c3789faba5f3'; //api key

//const city = document.getElementById('city').value;
//input = document.querySelector('#getTemp');


button.addEventListener('click', async () => {
  const newPic = document.querySelector('#catpic');
  //newPic.createElement('div');

  const categoryId = dropdown[dropdown.selectedIndex].id;
  const imgResponse = await axios.get(`${BASE_URL}images/search?category_ids=${categoryId}`,
    {
      "x-api-key": API_KEY    //attaching to header 
    })
    .then(imgResponse => {
      console.log(imgResponse.data[0].url);
      newPic.innerHTML = `<img src="${imgResponse.data[0].url}">`
      //renderPics(imgResponse);  // render drop down data
    })
    .catch(error => {
      console.log(error);
    })
})