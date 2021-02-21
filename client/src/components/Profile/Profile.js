import React from 'react'
import axios from 'axios'


const Profile = () => {

    const profile = async () => { 

        await axios.get("http://localhost:5000/users/profile")
        .then((response) => console.log(response)
        )
        .catch((err) => console.log(err))
    }
    return (
        <div>
            Profile
        </div>
    )
}

export default Profile
