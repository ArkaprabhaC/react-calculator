import React from 'react';
import "./Button.css";

const Button= (props) => {
    return (
       <button className="btn" style={props.style} onClick={props.click}>
           {props.children}
       </button>
    );
}

export default Button;