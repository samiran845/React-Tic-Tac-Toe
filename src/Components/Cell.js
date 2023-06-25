import { useState } from 'react';
import './Cell.css'

export default function Cell(props){

    return(
        <div className="Cell" onClick={props.onClick}>{props.value}</div>
    )
}