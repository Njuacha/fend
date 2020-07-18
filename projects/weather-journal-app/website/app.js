/* Global Variables */
const apiKey = '&appid='+'5663eeffe68b29c9ec1cbb2127466ba5';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS
const d = new Date();
const date = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Add eventlistener for handling click event on Gererate button
document.querySelector('#generate').addEventListener('click', () => {
   const zipCode = document.querySelector('#zip').value;
   const feelings = document.querySelector('#feelings').value;

   if(zipCode == "") {
     alert('please provide a zip code');
     return;
   } else if (feelings == "") {
     alert('please enter your feelings');
     return;
   }

   // get current weather from openWeathermap api
   getCurrentTemperature(zipCode)
   // then post the temperature of city of zip code together with feelings of user typed in and the current date
   .then(function(temperature) {
     postData('http://localhost:3000/add', {temp: temperature, date: date, user_response: feelings});
   })
   .then(() =>
     updateUI()
   )

});

// asynchronous function to fetch the current temperature of a city based on its zip code from the openWeahterMap api
const getCurrentTemperature = async (zipCode) => {

    const res = await fetch(baseUrl+zipCode+apiKey);

    try {
      const data = await res.json();
      const temperature = data.main.temp;
      return temperature;
    } catch(error) {
        console.log("error", error);
    }

}

// asynchronous function to post the data to the server
const postData = async ( url = '', data = {}) => {

    const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
      console.log("error", error);
    }
}

// asynchronous function to get recent data from server and update the ui
const updateUI = async () => {
  const res = await fetch('http://localhost:3000/all');

  try {

    const allData = await res.json();
    const lastIndex = allData.length - 1;
    // console.log(allData);
    // console.log('length' + lastIndex);
    const recentEntry = allData[lastIndex];

    document.querySelector('#date').innerText = recentEntry.date;
    document.querySelector('#temp').innerText = recentEntry.temp;
    document.querySelector('#content').innerText = recentEntry.user_response;

  } catch (error) {

    console.log("error", error);

  }
}
