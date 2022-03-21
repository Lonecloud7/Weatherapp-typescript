import React, { ReactNode } from "react";
import { useState, useEffect} from "react";
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
}) => {
  const [query, setQuery] = useState(undefined);

  const [value, setValue] = useState("");

  const key = "e6a38152efe7fa62f20a103eeb622259";

  const Filter = (search) => {
    return search.filter((option) => {
      const { name } = option;
      return name.toLowerCase().indexOf(location.toLowerCase()) > -1;
    });
  };

  const getOption: any = async (e: { children?: ReactNode } | any) => {

    // FETCH CONDITIONS

    if (offline == false && value !== "") {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${key}`
      );
      const weather = await res.json();

      setApi((prev) => {
        return [...prev, weather];
      });
      setLocation("");
      closeDrop(false);
    }
  };

  useEffect(() => {
    getOption()
  },[value])

  return (
    <div>
      <div className="dropdown" style={{ display: drop ? "block" : "none" }}>
        {Filter(countries)
          .slice(0, 10)
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
              <p key={code || geonameid} 
                onClick={() => {setValue(option.name)}}>
                {name}
              </p>
            );
          })}
      </div>
    </div>
  );
};
