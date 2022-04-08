import React, { ReactNode } from "react";
import { useState, useEffect, useRef } from "react";
import Time from "./Time";
import "./styles/weatherapp.css";
import CityCard from "./Citydisplay";
import Input from "./Input";
// import {countries} from "./countries"

interface Main {
  temp: number;
  feels_like: number;
  humidity: number;
}

interface Weather {
  description: string;
  icon: string;
}

interface country {
  code: string;
  name: string;
  geonameid: number;
  subcountry: string;
  country: string;
}

const WeatherApp: React.FC = () => {
  // HOOKS!!!!!

  const [location, setLocation] = useState("");

  const key = "e6a38152efe7fa62f20a103eeb622259";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}`;

  const [api, setApi] = useState([
    {
      "coord": { "lon": 7.4898, "lat": 9.0574 },
      "weather": [
        {
          "id": 802,
          "main": "Clouds",
          "description": "scattered clouds",
          "icon": "03d"
        }
      ],
      "base": "stations",
      "main": {
        "temp": 309.4,
        "feels_like": 306.56,
        "temp_min": 309.4,
        "temp_max": 309.4,
        "pressure": 1010,
        "humidity": 9,
        "sea_level": 1010,
        "grnd_level": 958
      },
      "visibility": 10000,
      "wind": { "speed": 1.27, "deg": 190, "gust": 1.55 },
      "clouds": { "all": 30 },
      "dt": 1645619420,
      "sys": { "country": "NG", "sunrise": 1645595192, "sunset": 1645638040 },
      "timezone": 3600,
      "id": 2352778,
      "name": "Abuja",
      "cod": 200
    }
    
  ]);

  const [error, setError] = useState(false);

  const [notFound, setNotFound] = useState(false);

  // const [city, setCity] = useState("");

  //OFFLINE CHECKER

  const [offline, setOffline] = useState(false);

  //Dropdown

  const [drop, setDrop] = useState(false);

  //Dropdown REF
  const ref = useRef(null);


  // const [value, setValue] = useState(null);

  const getValue: any = (e: { children?: ReactNode } | any) => {
    setLocation(e.target.value);
    setDrop(true);
    // onChange(null)
  };
  // const onChange = (option: country | any) => {
  //   setValue(option.name);
  // };

  // VALUES FROM INPUT CHANGE EVENT (ACTIVE TYPING)

  // const getJson = async() => {
  //   const res = await fetch("./countries.json", {headers : {
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json'
  //    }});
  //   const json = await res.json();
  //   console.log(json);

  // }

  //   ASYNC FETCH REQUEST

  const getWeather: any = async (e: { children?: ReactNode } | any) => {
    e.preventDefault();
    // FETCH CONDITIONS
    // let weatherApi: any;

    if (offline == false && location !== "") {
      const res = await fetch(url);
      const weather = await res.json();
      // weatherApi = weather;

      // const { cod, name }: { cod: string | number; name: string } = weatherApi;

      (!weather || weather.cod !== "404")
        ? setApi((prev) => {
            return [...prev, weather];
          })
        : setNotFound(true);

      setOffline(false);

      setLocation("");
    }

    // INPUT CONDITION

    location === "" && setError(true);
    

    //REMOVE INPUT PROMPT
    setTimeout(() => {
      setNotFound(false);
    }, 3000);

    setTimeout(() => {
      setError(false);
    }, 3000);
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
      window.removeEventListener("offline", () => {
        setOffline(false);
      });
      window.removeEventListener("online", () => {
        setOffline(true);
      });
    };
  }, []);

  useEffect(() => {
    location == "" && setDrop(false);
  }, [location]);

  useEffect(() => {
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const close = (e: any) => {
    setDrop(e && e.target === ref.current);
  };

  //CONVERT KEL TO FAR

  const convert = (kel: number) => {
    return Math.round(((kel - 273.15) * 9) / 5 + 32);
  };

  // HTML BEGINS HERE!!
  return (
    <div className="container" >

    

        <p style={{textAlign:"center", fontWeight:"800", fontSize:"40px"}}>WEATHER FORECAST</p>
      {/* TIME COMPONENT HERE */}
      <div className="time">
        <Time />
      </div>
      

      {/* INPUT HERE */}

      <Input
        getWeather={getWeather}
        getValue={getValue}
        offline={offline}
        notFound={notFound}
        location={location}
        error={error}
        drop={drop}
        setLocation={setLocation}
        // value={value}
        //TAKE IN SELECTED DROPDOWN OPTION TO LOCATION!!!
        setApi={setApi}
        // onChange={onChange}
        closeDrop={setDrop}
        ref={ref}
        setNotFound={setNotFound}
      />

      {/* ARRAY LOOP HERE */}
      <div className="city-display">
        {api.map((value, index) => {
          const {
            main,
            wind,
            name,
            weather,
          }: {
            name: string;
            weather: [Weather];
            main: Main;
            wind: { speed: number };
          } = value;
          return (
            <CityCard
              id={index}
              key={index}
              main={main}
              humidity={main && main.humidity}
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
