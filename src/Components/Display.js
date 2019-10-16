import React from 'react';
import "./Display.css";

const Display = (props) => {
    return (
        <div className="display">
            <h1>{props.children}</h1>
        </div>
    );
}

export default Display;