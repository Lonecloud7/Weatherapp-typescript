import React from "react";
import { DropDown } from "./dropdown";

interface Props {
  offline: boolean;
  notFound: boolean;
  error: boolean;
  location: string;
  getWeather?: () => any;
  getValue?: () => any;
  drop: Boolean;
  closeDrop: any;
  // onChange: any;
  // value?: null | string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  setApi: React.Dispatch<React.SetStateAction<never[]>>;
  ref:React.MutableRefObject<null>
}

const Input: React.FC<Props> = (props) => {
  // const displayValue = () => {
  //     if(props.location.length > 0) return props.location
  //     if (props.value) return props.value.name
  //     return "";
  // }
  return (
    <div>
      {/* INPUT HERE */}

      <form onSubmit={props.getWeather}>
        <div className="empty-input">
          {props.error && <h2>FILL IN A PLACE</h2>}
        </div>

        <div className="input">
          <input
            type="text"
            placeholder="ENTER A CITY"
            onChange={props.getValue}
            value={props.location}
            // onFocus={() => {
            //   props.setHistory(true);
            // }}
          />

          <button className="button" type="submit">
            <i className="fa fa-search"></i>
          </button>
        </div>

        <DropDown
          drop={props.drop}
          closeDrop={props.closeDrop}
          // onChange={props.onChange}
          location={props.location}
          setLocation={props.setLocation}
          setApi={props.setApi}
          offline={props.offline}
          ref={props.ref}
        />
      </form>

      {/* OFFLINE ALERT HERE */}
      <div className="offline-prompt">
        <h1 style={{ display: props.offline ? "block" : "none" }}>
          YOU ARE OFFLINE
        </h1>
      </div>

      <div className="offline-prompt">
        <h1 style={{ display: props.notFound ? "block" : "none" }}>
          CITY NOT FOUND
        </h1>
      </div>
    </div>
  );
};

export default Input;
