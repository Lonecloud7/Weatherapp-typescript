import React from "react";
import { useState, useEffect } from "react";
import Time from "./Time";
import "./weatherapp.css";
import CityCard from "./Citydisplay";

interface Main {
  temp:number;
  feels_like:number;
  humidity:number;
}

interface Weather {
  description:string;
  icon:string;
}

const WeatherApp: React.FC = () => {
      // HOOKS!!!!!

      const [location, setLocation] = useState("");

      const key = "e6a38152efe7fa62f20a103eeb622259";

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}`;

      const [api, setApi] = useState([]);

      const [error, setError] = useState(false);

      const [notFound, setNotFound] = useState(false);

      //OFFLINE CHECKER

      const [offline, setOffline] = useState(false);

      //   ASYNC FETCH REQUEST

        
      const getWeather = async (e: any) => {
        e.preventDefault();
        // FETCH CONDITIONS
        let weatherApi:any;

        if (offline == false && location !== "") {
            const res = await fetch(url);
            const weather = await res.json();
            weatherApi = weather;
            
            const {cod}: {cod:string | number} = weatherApi;

            cod !== "404" ? setApi((prev) => {
              return [...prev, weatherApi];
            }) 
            : setNotFound(true);

            setOffline(false);
        }

        // INPUT CONDITION

        if (location === "") {
          setError(true);
        }

        //REMOVE INPUT PROMPT
        setTimeout(() => {
          setNotFound(false);
        }, 3000);

        setTimeout(() => {
          setError(false);
        }, 3000);

        setLocation("");
      };

      //DELETE CITY CARD!!!

      const deleteCity = (id: number) => {
        setApi((preValues) => {
          return preValues.filter((value, index) => {
            return index !== id;
          });
        });
      };

      

      //OFFLINE CHECKER EFFECT!!

      useEffect(() => {
        window.addEventListener("offline", () => {
          setOffline(true);
        });
        window.addEventListener("online", () => {
          setOffline(false);
        });

        return () => {
          window.addEventListener("offline", () => {
            setOffline(false);
          });
          window.addEventListener("online", () => {
            setOffline(true);
          });
        };
      }, []);

      //CONVERT KEL TO FAR

      const convert = (kel: number) => {
        return Math.round(((kel - 273.15) * 9) / 5 + 32);
      };

      // HTML BEGINS HERE!!
      return (
        <div className="container">
          {/* TIME COMPONENT HERE */}
          <div className="time">
            <Time />
          </div>

          {/* INPUT HERE */}

          <form onSubmit={getWeather}>

            <div className="empty-input">{error && <h2>FILL IN PLACE</h2>}</div>
          
            <div className="input">
              <input
                type="text"
                placeholder="ENTER A CITY"
                onChange={(e) => setLocation(e.target.value)}
                value={location}
              />

              <button className="button">
                <i className="fa fa-search"></i>
              </button>
            </div>
          </form>

          {/* OFFLINE ALERT HERE */}
          <div className="offline-prompt">
            <h1 style={{ display: offline ? "block" : "none" }}>YOU ARE OFFLINE</h1>
          </div>

          <div className="offline-prompt">
            <h1 style={{ display: notFound ? "block" : "none" }}>CITY NOT FOUND</h1>
          </div>

          {/* ARRAY LOOP HERE */}
          <div className="city-display">
            {api.map((value, index) => {
              const { main,wind,name,weather }:{name:string;
                                                weather:[Weather];
                                                main:Main;
                                                wind:{speed:number};} = value;
              return (
                <CityCard
                  id={index}
                  key={index}
                  main={main}
                  humididty={main && main.humidity}
                  feelsLike={main && main.feels_like}
                  windSpeed={wind && wind.speed}
                  wind={wind}
                  convert={convert}
                  temp={main && main.temp}
                  name={name}
                  cloud={weather && weather[0].description}
                  img={weather && weather[0].icon}
                  deleteCity={deleteCity}
                />
              );
            })}
          </div>
        </div>
      );
};

export default WeatherApp;
