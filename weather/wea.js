const API_KEY="f9037a28d041224796cfa529534af030"
const BASE_URL="https://api.openweathermap.org/data/2.5/weather"
//

function getWeatherUrl(city,key=API_KEY){
  return`${BASE_URL}?q=${city}&appid=${key}&units=metric&lang=kr`;
}

window.onload=function(){
  getWeather(getWeatherUrl("seoul"));
}

async function getWeather(url){
  await fetch(url)
    .then((response) => response.json)
    .then((data)=>{
      
    })
}
