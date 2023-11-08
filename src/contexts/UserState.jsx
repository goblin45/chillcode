import { useState } from "react";
import UserContext from "./UserContext";

const UserState = (props) => {
    const emptyUser = {
        id: '',
        username: '',
        e_mail: '',
        solvedProblems: [],
        profilePhoto: '',
        rating: '',
        streak: '',
        loginStatus: false
    }
    const [user, setUser] = useState(emptyUser)

    const updateUser = (user) => {
        setUser({
            id: user._id,
            username: user.username,
            e_mail: user.e_mail,
            solvedProblems: user.solvedProblems,
            profilePhoto: '',
            rating: user.rating,
            streak: user.streak,
            loginStatus: true
        })
    }

    const logout = () => {
        setUser(emptyUser)
    }

    return (
        <UserContext.Provider value={{user, updateUser, logout}}>
            {props.children}
        </UserContext.Provider>
    )
}   

export default UserState