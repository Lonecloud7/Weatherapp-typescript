import React from "react";
import { useState } from "react";

const Time: React.FC = () => {
  const timeNow = new Date().toLocaleTimeString();

  const [time, setTime] = useState<number | string>(timeNow);

  const dateBuilder = (d: any) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    let date = d.getDate();

    return `${day} ${date} ${month} ${year}`;
  };

  const getTime = () => {
    var newTime = new Date().toLocaleTimeString();
    setTime(newTime);
  };

  setInterval(getTime, 1000);

  return (
    <div>
      <p>{time}</p>
      <p>{dateBuilder(new Date())}</p>
    </div>
  );
};

export default Time;
