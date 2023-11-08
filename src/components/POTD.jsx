import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const POTD = () => {

    const navigate = useNavigate()

    useEffect(() => {
        axios.get('https://chillcode-api.onrender.com/problemOfTheDay')
        .then((res) => {
            const problemId = res.data._id
            navigate(`/problem/?id=${problemId}`)
        }).catch((error) => {
            navigate('/problems')
        })

    }, [])

    return (
        <></>
    )
}

export default POTD