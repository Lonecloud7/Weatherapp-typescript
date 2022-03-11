import React from "react";
import { useState, useEffect } from "react";

const CityCard = (props) => {

    //CONVERT KEL TO FAR

  const convert = (kel) => {
    return Math.round(((kel - 273.15) * 9) / 5 + 32);
  };
  return (
    <div className="city-card">
      {/* TOP DISPLAY HERE */}
      {props.main && (
        <div className="top-display">
          <div className="temp">
            {props.main && <h2>{convert(props.temp)}°F</h2>}
          </div>
          <div className="location">
            <ul>
              <h2>{props.name}</h2>
              <li>

              {/* {DYNAMIC IMAGES FROM OPEN WEATHER} */}
                <img
                  src={`http://openweathermap.org/img/wn/${props.img}@2x.png`}
                  alt=""
                />
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* BOTTOM-DISPLAY HERE */}
      {props.main && (
        <div className="bottom-display">
          <ul>
            <li>HUMIDITY:{props.humididty}</li>
            <li>FEELS LIKE:{convert(props.feelsLike)}°F</li>
            <li>WIND SPEED:{props.windSpeed}mph</li>
          </ul>
        </div>
      )}

        {/* DELETE CARD BOTTON */}
      <div onClick={() => props.deleteCity(props.id)} className="deletebtn">
        <a href="#">&#215;</a>
      </div>
    </div>
  );
};

export default CityCard;
