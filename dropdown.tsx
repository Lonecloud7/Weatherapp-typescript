import React, { ReactNode } from "react";
import { useState, useEffect } from "react";
import { countries } from "./countries";

interface Props {
  drop: Boolean;
  closeDrop: any;
  onChange: () => any;
}

interface country {
  code: string;
  name: string;
  geonameid: number;
  subcountry: string;
  country: string;
}

export const DropDown: React.FC<Props | any> = ({
  drop,
  closeDrop,
  // onChange,
  location,
  setLocation,
  // getWeather,
  setApi,
  offline,
  ref,
  setNotFound
}) => {
  // const [query, setQuery] = useState(undefined);

  const [value, setValue] = useState("");

  const key = "e6a38152efe7fa62f20a103eeb622259";

  const Filter = (search: any[]) => {
    return search.filter((option) => {
      const { name } = option;
      return name.toLowerCase().indexOf(location.toLowerCase()) > -1;
    });
  };

  const getOption: any = async (e: { children?: ReactNode }) => {
    // FETCH CONDITIONS

    if (offline == false && value !== "") {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${key}`
      );
      const weather = await res.json();

      (!weather || weather.cod !== "404")?
      setApi((prev: any) => {
        return [...prev, weather];
      }):setNotFound(true);
      
      setLocation("");
      closeDrop(false);

      setTimeout(() => {
        setNotFound(false);
      }, 3000);
    }
  };

  useEffect(() => {
    getOption();
  }, [value]);

  return (
    <div>
      <div className="dropdown" style={{ display: drop ? "block" : "none" }} ref={ref}>
        {Filter(countries)
          .slice(0, 5)
          .map((option: any | country) => {
            const {
              name,
              code,
              country,
              geonameid,
              subcountry,
            }: {
              code: string;
              name: string;
              geonameid: number;
              subcountry: string;
              country: string;
            } = option;

            return (
              <a href="#"
              key={code || geonameid}>
                <p
                  
                  onClick={() => {
                    setValue(name);
                  }}
                >
                  {name}
                </p>
              </a>
            );
          })}
      </div>
    </div>
  );
};
