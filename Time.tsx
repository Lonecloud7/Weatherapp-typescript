import React from "react";
import { useState } from "react";



const Time: React.FC = () => {
  const timeNow = new Date().toLocaleTimeString();

  
  const [time, setTime] = useState<number | string>(timeNow);

  const getTime = () => {
    var newTime = new Date().toLocaleTimeString();
    setTime(newTime);
  };

  const date = new Date();

  setInterval(getTime, 1000);

  return (
    <div>
      <h1>{time}</h1>
      <h3>{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</h3>
    </div>
  );
};

export default Time;
