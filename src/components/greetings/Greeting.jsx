import React, { useState, useEffect,useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export const Greeting = () => {
    const [today, setToday] = useState(new Date());
    const {state:{user}} = useContext(AuthContext)

    useEffect(() => {
        console.log(user)
        const timer = setInterval(() => {
            setToday(new Date());
        }, 1000);
        return () => clearInterval(timer);

       
    }, []);

    const hour = today.getHours();
    let greeting;

    if (hour < 12) {
        greeting = 'Good morning';
    } else if (hour < 18) {
        greeting = 'Good afternoon';
    } else {
        greeting = 'Good evening';
    }


    const options = { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', options);

    return (
        <>
            <div className="date">{formattedDate}</div>
            <div className="greetings">
                <h4>{greeting}, {user.user.firstName} {user.lastName}</h4>
            </div>
        </>


    );
}
