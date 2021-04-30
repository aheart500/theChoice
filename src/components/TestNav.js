import React from 'react';
import ACT from '../images/ACT.png'

export default function TestNav() {
    return(
        <div className="header">
            <button>Pause</button>
                        <div className="timer">
                <p>Time Left</p>
                <h1>19:36</h1>
            </div>
            <button>End</button>
        </div>
    )
}