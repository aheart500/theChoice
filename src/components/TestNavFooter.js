import React from 'react';

export default function TestNavFooter() {
    return(
        <div className="footer">
            <button>Prev</button>
                        <div className="counter">
            <p>Answered</p>
            <h1>0/4</h1>
             </div>
            <button onClick>Next</button>
        </div>
    )
}