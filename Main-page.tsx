import React, { ReactNode } from "react";
import { useState, useEffect, useRef } from "react";
import Time from "./Time";
import "./weatherapp.css";
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

  const [api, setApi] = useState([]);

  const [error, setError] = useState(false);

  const [notFound, setNotFound] = useState(false);

  const [city, setCity] = useState("");

  //OFFLINE CHECKER

  const [offline, setOffline] = useState(false);

  //Dropdown

  const [drop, setDrop] = useState(false);

  //Dropdown REF
  const ref = useRef(null);

  const [value, setValue] = useState(null);

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
    let weatherApi: any;

    if (offline == false && location !== "") {
      const res = await fetch(url);
      const weather = await res.json();
      weatherApi = weather;

      const { cod }: { cod: string | number } = weatherApi;

      cod !== "404"
        ? setApi((prev) => {
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
    setDrop(e && e.terget === ref.current);
  };

  //CONVERT KEL TO FAR

  const convert = (kel: number) => {
    return Math.round(((kel - 273.15) * 9) / 5 + 32);
  };

  // HTML BEGINS HERE!!
  return (
    <div className="container" ref={ref}>
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
        value={value}
        //TAKE IN SELECTED DROPDOWN OPTION TO LOCATION!!!
        // onChange={onChange}
        closeDrop={setDrop}
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
