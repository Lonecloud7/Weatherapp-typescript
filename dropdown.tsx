import React from "react";
import { useState } from "react";
import {countries} from "./countries"

interface Props {
    drop:Boolean
    closeDrop:() =>Boolean;
    onChange:() => any;
}

export const DropDown:React.FC <Props> = ({drop,closeDrop, onChange}) => {

    return(
        <div>
                <div className="dropdown" style={{display:drop ? "block" : "none"}}>
                {countries.map((value, index) => {
                    return <p key={index}
                            onClick={() => {
                                onChange(value)
                                closeDrop
                            }}
                            >
                                {value.name}</p>
                })}
            </div>
        </div>
    )
}