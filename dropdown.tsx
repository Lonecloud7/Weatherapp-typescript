import React from "react";
import { useState, useCallback } from "react";
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
  getWeather,
}) => {
  const [query, setQuery] = useState("miami");

  const Filter = (search) => {
    return search.filter((option) => {
      const {name} = option
      return name.toLowerCase().indexOf(location.toLowerCase()) > -1;
    });
  };

  return (
    <div>
      <div className="dropdown" style={{ display: drop ? "block" : "none" }}>
        {Filter(countries).slice(0, 10).map((option: any | country) => {
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
            <p
              key={code || geonameid}
              onClick={() => {
                // onChange(option.name);
                closeDrop(false);
                setLocation(option.name)
              }}
            >
              {name}
            </p>
          );
        })}
      </div>
    </div>
  );
};
