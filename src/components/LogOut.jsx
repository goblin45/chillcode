import { useNavigate } from "react-router-dom"
import { useContext, useEffect } from "react"
import UserContext from "../contexts/UserContext"

const LogOut = () => {
    const userContext = useContext(UserContext)
    const navigate = useNavigate()
    
    useEffect(() => {
        userContext.logout()
        navigate('/')
    })
}

export default LogOut