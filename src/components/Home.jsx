import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"

import Login from "./Login"

import UserContext from "../contexts/UserContext"

import { Box, Typography, Button } from "@mui/material"
import styled from "@emotion/styled"

const Home = ({color, bgColor, loginBoxStatus, setLoginBoxStatus}) => {

    const userContext = useContext(UserContext)
    const loginStatus = userContext.user.loginStatus

    const navigate = useNavigate()

    // const [loginBoxStatus, setLoginBoxStatus] = useState('closed')
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    useEffect(() => {
        function handleResize() {
            setScreenWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    useEffect(() => {
        if (loginStatus === true) 
            navigate('/problems')
    }, [loginStatus])

    const MainBox = styled(Box)`
        width: 100vw;
        height: 91.15vh;
        color: ${color};
        background-color: ${bgColor};
        padding: 3rem;
        display: flex;
        justify-content: space-evenly;
        position: absolute;
        // border: 1px solid ${color};
    `

    const LeftBox = styled(Box)`
        // border: 1px solid blue;
        min-width: 60%;
        // height: 40%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        padding: 5%;
    `

    const Box1 = styled(Box)`
        color: ${color};
        // border: 1px solid green;
    `

    const Text = ({fontSize, text}) => {
        return (
            <Typography fontFamily={'consolas, sans-serif'} fontSize={fontSize}>{text}</Typography>
        )
    }

    const RightBox = styled(Box)`
        // border: 1px solid red;
        width: 40%;
        display: flex;
        justify-content: space-around;
        align-items: center;
    `

    const LoginOrSignupButtonComponent = () => {

        const LoginOrSignupButtonBox = styled(Box)`
            border: 1px solid ${color};
            background-color: ${bgColor};
            color: ${color};
            position: absolute;
            top: 15%;
            right: 8%;
            z-index: 1;
            display: flex;
            align-items: center;
            width: 15%;
            max-height: 8%;
            border-radius: 15px;
        `

        const LoginOrSignupOptionButtonBox = styled(LoginOrSignupButtonBox)`
            position: fixed;
            width: 100%;
            right: 0;
            border-radius: 0;
            padding: 5%;
            top: calc(91.15vh + 5px);
        `

        const LoginOrSignupButton = styled(Button)`
            width: 100%;
            height: 100%;
            text-transform: none;
            color: ${color};
            display: flex;
            border-radius: 15px;
        `

        return (
            <>
                {
                    (screenWidth >= 768) ? 
                        <LoginOrSignupButtonBox className="login-button">
                            <LoginOrSignupButton onClick={() => setLoginBoxStatus('open')}>
                                <Typography fontFamily={'consolas, sans-serif'}>
                                    {   
                                        (screenWidth >= 768) ?
                                            'Login/Signup'
                                        :
                                            'Login'
                                    }
                                </Typography>
                            </LoginOrSignupButton>
                        </LoginOrSignupButtonBox>
                    : 
                        (loginBoxStatus === 'closed') &&
                        <LoginOrSignupOptionButtonBox>
                            <LoginOrSignupButton onClick={() => setLoginBoxStatus('open')}>
                                <Typography fontFamily={'consolas, sans-serif'}>
                                    Login/Signup
                                </Typography>
                            </LoginOrSignupButton>
                        </LoginOrSignupOptionButtonBox>
                }
            </>
        )
    }

    const HeroImage = () => {
        return (
            <Box>
                {
                    (color === '#fff') ?
                        <img src='../images/sample-for-home.png' alt="Image couldn't be loaded." height='85%' width='85%'/>
                    :
                        <img src='../images/sample-for-home.png' alt="Image couldn't be loaded." height='85%' width='85%'/>
                }   
            </Box>
        )
    }

    return (
        <>
            <LoginOrSignupButtonComponent setLoginBoxStatus={setLoginBoxStatus}/>
            <MainBox className="sm:flex-col-rev">
                <LeftBox className='sm:width-80 sm:height-60'>
                    <Box1>
                        {
                            (screenWidth >= 768) ?
                                <Text fontSize={'4rem'} text={'Chill & Code'}/>
                            :
                                <Text fontSize={'1.8rem'} text={'Chill & Code'}/>
                        }
                    </Box1>
                    <Box1>
                        {
                            (screenWidth >= 768) ?
                                <Text fontSize={'2rem'} text={'Coding is fun. Give it a try!'}/>
                            : 
                                <Text fontSize={'1rem'} text={'Coding is fun. Give it a try!'}/>
                        }
                    </Box1>
                    <Box1>
                        {
                            (screenWidth >= 768) ?
                                <Text fontSize={'1.5rem'} text={'Continue your coding journey with ChillCode!'}/>
                            : 
                                <Text fontSize={'0.8rem'} text={'Continue your coding journey with ChillCode!'}/>
                        }
                    </Box1>
                </LeftBox>
                <RightBox>
                    <HeroImage/>
                </RightBox>
            </MainBox>
            {/* {
                (loginBoxStatus === 'open') && <Login color={color} bgColor={bgColor} setLoginBoxStatus={setLoginBoxStatus}/>
            } */}
        </>
    )
}

export default Home