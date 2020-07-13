/* Global Variables */
const form = document.querySelector('.form');

// Base URL and API Key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=2cbe64a572077d432118e7298c1032d4';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// GET Web API Data
const getWeather = async (baseURL, newZip, apiKey) => {
  const res = await fetch(baseURL + newZip + apiKey);
  try {
    const userData = await res.json();
    return userData;
  } catch (err) {
    console.log(err);
  }
}

// POST data 
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      content: data.content
    })
  })

  try {
    const newData = await response.json();
    return newData;
  }
  catch (error) {
    console.log(error);
  }
};


const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const data = await request.json()
    document.getElementById('date').innerHTML = data.date;
    document.getElementById('temp').innerHTML = data.temp;
    document.getElementById('content').innerHTML = data.content;
  }
  catch (err) {
    console.log(err);
  }
};

// Event listener function 
const generateData = (event) => {
  event.preventDefault();

  const newZip = document.getElementById('zip').value;
  const content = document.getElementById('feelings').value;

  getWeather(baseURL, newZip, apiKey)
    .then(function (userData) {
      postData('/add', { date: newDate, temp: userData.main.temp, content })
    }).then(() => {
      updateUI();
    })
  form.reset();
}

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', generateData);