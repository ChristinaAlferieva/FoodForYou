import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Kitchen from './Kitchen.js';

const UserKitchens = () => {
    const [user, setUser] = useState();
    const id = localStorage.getItem("userId");
    const sendRequest = async () => {
        const res = await axios.get(`http://localhost:4000/api/kitchen/user/${id}`)
            .catch(err => console.log(err))
        const data = await res.data;
        return data;
    }
    useEffect(() => {
        sendRequest()
            .then((data) => setUser(data.user))
    }, []);
    console.log(user);

    return (
        <div>
            {" "}
            {user && user.kitchens && user.kitchens.map((kitchen, index) => (
                <Kitchen
                    id={kitchen._id}
                    key={index}
                    isUser = {true}
                    title={kitchen.title}
                    description={kitchen.description}
                    // imageURL={kitchen.image}
                    userName={user.name}
                />
            ))};
        </div>
    )
};

export default UserKitchens;