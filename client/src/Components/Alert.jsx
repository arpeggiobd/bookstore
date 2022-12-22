import React from 'react';
import { useState, useEffect } from 'react';

function Alert({ msg, type }) {
    const [show, setShow] = useState(false);
    
    useEffect(() => {
        if (msg) {
            setShow(true);
            setInterval(() => {
                setShow(false);
            }, 2000);
        }
    }, [msg]);

    return (
    <>
    {show && <div className={`alert alert-${type}`}>{msg}</div>}
    </>);
}

export default Alert