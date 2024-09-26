import React, { useEffect, useRef, useState } from 'react'
import './Myapp.css'
import Search_image from '../assets/search.png'
import clear from '../assets/clear.png'
import cloud from '../assets/cloud.png'
import drizzle from '../assets/drizzle.png'
import humidity from '../assets/humidity.png'
import rain from '../assets/rain.png'
import snow from '../assets/snow.png'
import wind from '../assets/wind.png'



const Myapp = () => {
    const inpref=useRef()
    const [WeatherData , setWeatherData]=useState(false)
    const allIcons={
        "01d":clear,
        "01n":clear,
        "02d":cloud,
        "02n":cloud,
        "03d":cloud,
        "03n":cloud,
        "04d":drizzle,
        "04n":drizzle,
        "09d":rain,
        "09n":rain,
        "10d":rain,
        "10n":rain,
        "13d":snow,
        "13n":snow,
    }
    const search =async (city)=>
    {
        if(city===""){
            alert("Enter City Name");
            return;
        }
        try{
            const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
            const response =await fetch(url);
            const data =await response.json();

            if(!response.ok){
                alert(data.message);
                return;
            }
            console.log(data);
            const icon = allIcons[data.weather[0].icon] || clear;
            setWeatherData({
                
                humidity: data.main.humidity,
                windspeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon,

            })
        }
        
        catch (error){
            setWeatherData(false);
            console.error("Error in Fetching Weather Data");

        }
    }

    useEffect( () => {
        search("Palani")
    },[])
  return (
    <div className='weather'>
        <h1 className='heading'>Weather App</h1>
        <div className="search_bar">
            <input ref={inpref} type="text" placeholder='Search' required/>
            <img src={Search_image} alt=""  onClick={()=>search(inpref.current.value)}/>

        </div>
        {WeatherData?<>
            <img src={WeatherData.icon} alt="" className='weather_icon' />
        <p className='temperature'>{WeatherData.temperature}&deg;C</p>
        <p className='location'>{WeatherData.location}</p>
        <div className='weather_data'>
            <div className='col'>
                <img src={humidity} alt="" />
                <div>
                    <p>{WeatherData.humidity}%</p>
                    <span>Humidity</span>
                </div>
            </div>
            <div className='col'>
                <img src={wind} alt="" />
                <div>
                    <p>{WeatherData.windspeed} Km/h</p>
                    <span>Wind Speed</span>
                </div>
            </div>
        </div>
        </>:<></>}

    </div>
    
  )
}

export default Myapp