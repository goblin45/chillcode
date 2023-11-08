import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import UserContext from '../contexts/UserContext';

import { Button, ButtonGroup, Typography } from '@mui/material';
import styled from '@emotion/styled';
import {Box} from '@mui/material';

// import icons
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import CodeIcon from '@mui/icons-material/Code';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginOutlined from '@mui/icons-material/LoginOutlined';

const NavBar = ({mode, setMode, color, bgColor, setLoginBoxStatus}) => {

    const userContext = useContext(UserContext)
    const loginStatus = userContext.user.loginStatus

    const [hamStatus, setHamStatus] = useState('closed')
    const [profStatus, setProfStatus] = useState('closed')

    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const navigate = useNavigate()

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    useEffect(() => {
        function handlePressEscape(event) {
            if (event.key === 'Escape') {
                setHamStatus('closed')
                setProfStatus('closed')
            }
        }
        document.addEventListener('keydown', handlePressEscape)
        return () => {
            document.removeEventListener('keydown', handlePressEscape)
        }
    }, [])

    const Nav = styled(Box)`
        background-color: ${bgColor}
    `

    const ButtonText = styled(Typography)`
        font-family: consolas, sans-serif;
        text-transform: capitalize;
        color: ${color};
    `

    const ChillCodeIcon = () => {
        const iconSource = `../images/cc-icon-${mode}.png`
        return (
            <div className='nav_gfg_icon'>
                <Button href='/'>
                    <img src={iconSource} alt="CC Icon" height='50' width='80'/>
                </Button>
            </div>
        )
    }

    const SunIcon = styled(LightModeOutlinedIcon)`
        background-color: rgb(244, 252, 254);
        color: #000;
        height: 1.2em;
        width: 1.2em;
        border-radius: 50%;
    `

    const MoonIcon = styled(DarkModeOutlinedIcon)`
        background-color: rgb(244, 252, 254);
        color: #000;
        height: 1.2em;
        width: 1.2em;
        border-radius: 50%;
    `

    const ProfileIcon = styled(PermIdentityOutlinedIcon)`
        background-color: #333;
        color: #fff;
        width: 1.5em;
        height: 1.5em;
        border-radius: 50%;
    `

    const MoonOrSun = () => {
        if (mode === 'light') {
            return (
                <MoonIcon/>
            )
        } else {
            return (
                <SunIcon/>
            )
        }
    }

    const BellIcon = styled(NotificationsNoneIcon)`
        color: ${color};
    `

    const changeMode = () => {
        if (mode === 'light'){
            setMode('dark')
            // setBgColor('#000')
        }
        else {
            setMode('light')
            // setBgColor('#fff')
        }
    }

    const HamBurger = styled(MenuIcon)`
        color: ${color};
    `

    const Close = styled(CloseIcon)`
        color: ${color};
    `

    const handleHamPress = () => {
        if (hamStatus === 'open') {
            setHamStatus('closed')
        } else {
            setHamStatus('open')
        }
    }

    const HamOrClose = () => {
        if (hamStatus === 'open') {
            return (
                <Close/>
            )
        } else {
            return (
                <HamBurger/>
            )
        }
    }

    const MenuOptionBlock = styled(Button)`
        border: 1px solid ${color};
        width: 100%;
        display: flex;
        justify-content: center;
        padding-top: 2rem;
        padding-bottom: 1.5rem;
        font-size: 1.5em;
        font-family: consolas, sans-serif;
        color: ${color};
        text-transform: capitalize;
    `

    const handleMenuOptionClick = (link) => {
        setHamStatus('closed')
        setProfStatus('closed')
        navigate(`/${link}`)

    }

    const CustomMenuItem = ({content, link}) => {
        return (
            <div className="nav_ham--menu-option-block">
                <MenuOptionBlock style={{alignItems: 'center'}} onClick={() => handleMenuOptionClick(link)}>
                    <p>{content}</p>
                </MenuOptionBlock>
            </div>
        )
    }

    const MenuBox = styled(Box)`
        width: 100vw;
        border: 1px solid ${color};
        height: 91.15vh;
        position: absolute;
        top: 0;
        padding: 0 1em; 
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        background-color: ${bgColor};
    `

    const MenuOptionBlock2 = styled(MenuOptionBlock)`
        align-items: center;
        height: calc((40vh - 4em) / 3);
        font-size: 1rem;
    `

    const MenuBox2 = styled(MenuBox)`
        width: 20vw;
        right: 20px;
        top: 5px;
        height: 40vh;
        border-radius: 5px;
        border-color: rgb(131, 130, 130);
    `

    const CustomMenuItem2 = ({content, link}) => {
        return (
            <div className="nav_ham--menu-option-block">
                <MenuOptionBlock2 style={{alignItems: 'center'}} onClick={() => handleMenuOptionClick(link)}>
                    <p>{content}</p>
                </MenuOptionBlock2>
            </div>
        )
    }

    const CustomMenu = ({options}) => {
        return (
            <>
                {
                (screenWidth >= 768) ?
                    <MenuBox2>
                        {
                            options.map((option) => {
                                return (
                                    <CustomMenuItem2 content={option[0]} link={option[1]}/>
                                )
                            })
                        }
                    </MenuBox2>
                :
                    <MenuBox>
                        {
                            options.map((option) => {
                                return (
                                    <CustomMenuItem content={option[0]} link={option[1]}/>
                                )
                            })
                        }
                    </MenuBox>
                }
            </>
        )
    }

    const LoginIcon = styled(LoginOutlined)`
        color: ${color};
        height: 100%;
    `

    const LoginButton = styled(Button)`
        width: fit-content;
        display: flex;
        align-items: center;
    `

    const ProfileOrLoginBox = () => {

        return (
            <>
                {
                    (loginStatus === true) ? 
                        <Button onClick={handleProfPress}><ProfileIcon/></Button>
                    : 
                        <LoginButton onClick={handleLoginPress}>
                            <LoginIcon/>
                            {
                                (screenWidth >= 768) ?
                                    <Typography fontFamily={'consolas, sans-serif'} style={{textTransform: 'capitalize', color: `${color}`}}>
                                        Login
                                    </Typography>
                                : 
                                    <></>
                            }
                        </LoginButton>
                }
            </>
        )
    }

    const handleLoginPress = () => {
        setLoginBoxStatus('open')
    }

    const handleProfPress = () => {
        if (profStatus === 'closed') {          
            setProfStatus('open')
        } else {
            setProfStatus('closed')
        }
    }

    const ManIcon = styled(PersonIcon)`
        color: ${color};
    `

    const CourseIcon = styled(LibraryBooksIcon)`
        color: ${color};
    `

    const ExitIcon = styled(LogoutIcon)`
        color: ${color};
    `

    return (
        <>
            <Nav className='nav_container'>
                <div className="nav__hamburger md:hidden">
                    <Button onClick={handleHamPress} style={{marginLeft: '-15px'}}>
                        <HamOrClose/>
                    </Button> 
                </div>

                <div className="hidden md:flex nav_options--block1 ">
                    <div className="nav_options--block1-button">
                        <Button onClick={() => handleMenuOptionClick('problems')}>
                            <ButtonText>Problems</ButtonText>
                        </Button>
                    </div>
                    <div className="nav_options--block1-button">
                        <Button onClick={() => handleMenuOptionClick('courses')}>
                            <ButtonText>Courses</ButtonText>
                        </Button>
                    </div>
                    <div className="nav_options--block1-button">
                        <Button onClick={() => handleMenuOptionClick('contests')}>
                            <ButtonText>Contests</ButtonText>
                        </Button>
                    </div>
                    <div className="nav_options--block1-button">
                        <Button onClick={() => handleMenuOptionClick('problem-of-the-day')}>
                            <ButtonText>
                                <CodeIcon/> POTD
                            </ButtonText>
                        </Button>
                    </div>
                </div>
                
                <div className="nav_options--block2">
                    <Button onClick={() => changeMode()}><MoonOrSun mode='light'/></Button>
                    <div className="hidden md:flex">
                        <Button><BellIcon/></Button>
                    </div>
                    <ProfileOrLoginBox/>
                </div>
            </Nav>

            <ChillCodeIcon mode='light'/>
            
            {
                (hamStatus === 'open') ? 
                    <div className="nav_ham--menubox">
                        <CustomMenu options={
                            [   
                                ['Problems', 'problems'], 
                                ['Courses', 'courses'],
                                ['Contests', 'contests'],
                                [[<CodeIcon/>, '   POTD'], 'problem-of-the-day']
                            ]
                        }
                        /> 
                    </div>
                : <></>
            }

            {
                (profStatus === 'open') ? 
                    <div className="nav_ham--menubox">
                        <CustomMenu options={
                            [
                                [[<ManIcon/>, '   My Profile'], 'profile'],
                                [[<CourseIcon/>, '   My Courses'], 'courses?=active'],
                                [[<ExitIcon/>, '  Logout'], 'logout']
                            ]
                        }
                        />
                    </div>
                    : <></>
            }
        </>
    )
}

export default NavBar