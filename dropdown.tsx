import React from "react";
import { useState, useCallback } from "react";
import {countries} from "./countries"

interface Props {
    drop:Boolean
    closeDrop:any;
    onChange:() => any;
}

interface country{
    code?:string;
    name?:string;
    geonameid?:number;
    subcountry?:string;
    country?:string;
}

export const DropDown:React.FC <Props> = ({drop,closeDrop, onChange}) => {
    
   
    return(
        <div>
                <div className="dropdown" style={{display:drop ? "block" : "none"}}>
                {countries.map((value:country, index) => {
                    return <p key={index}
                            onClick={() => {
                                console.log(value)
                                onChange(value)
                                closeDrop(false)
                                }}
                                
                            >
                                {value.name}</p>
                })}
            </div>
        </div>
    )
}