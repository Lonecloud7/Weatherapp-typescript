import React from "react";
import { useState, useCallback } from "react";
import {countries} from "./countries"

interface Props {
    drop:Boolean
    closeDrop:any;
    onChange:() => any;
}

interface country {
    code:string;
    name:string;
    geonameid:number;
    subcountry:string;
    country:string;
}


export const DropDown:React.FC <Props | any> = ({drop,closeDrop, onChange}) => {
    
   
    return(
        <div>
                <div className="dropdown" style={{display:drop ? "block" : "none"}}>
                {countries.map((value:any, index) => {
                    const {name, code, country, geonameid, subcountry}:{code:string;
                                                                        name:string;
                                                                        geonameid:number;
                                                                        subcountry:string;
                                                                        country:string;} = value
                    return <p key={index}
                            onClick={() => {
                            onChange(value)
                            closeDrop(false)
                                }}
                            >
                                {name}</p>
                })}
            </div>
        </div>
    )
}