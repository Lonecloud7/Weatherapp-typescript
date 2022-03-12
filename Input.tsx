import React from "react";
import { ReactNode } from "react";
import { useState, useEffect } from "react";

interface Props{
    offline:boolean;
    notFound:boolean;
    error:boolean;
    location:string;
    getWeather?:() => any;
    getValue?:() => any;
}

const Input:React.FC <Props> = (props) => {


        

    return(
        <div>
                            {/* INPUT HERE */}

                <form onSubmit={props.getWeather}>

                    <div className="empty-input">{props.error && <h2>FILL IN A PLACE</h2>}</div>

                        <div className="input">
                        <input
                            type="text"
                            placeholder="ENTER A CITY"
                            onChange={props.getValue}
                            value={props.location}
                        />

                        <button className="button">
                            <i className="fa fa-search"></i>
                        </button>
                    </div>
                </form>

                {/* OFFLINE ALERT HERE */}
          <div className="offline-prompt">
            <h1 style={{ display: props.offline ? "block" : "none" }}>YOU ARE OFFLINE</h1>
          </div>

          <div className="offline-prompt">
            <h1 style={{ display: props.notFound ? "block" : "none" }}>CITY NOT FOUND</h1>
          </div>
        </div>
    )
}

export default Input;