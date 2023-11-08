import { useState, useEffect } from "react"
import { Box, Button, Typography } from "@mui/material"
import styled from "@emotion/styled"

import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import DesktopWindowsOutlinedIcon from '@mui/icons-material/DesktopWindowsOutlined';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';
import { useNavigate } from "react-router-dom";

const NotFound = ({color, bgColor}) => {

    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    const navigate = useNavigate()

    useEffect(() => {
        function handleResize() {
            setScreenWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const MainBox = styled(Box)`
        width: 100vw;
        height: 91.15vh;
        color: ${color};
        background-color: ${bgColor};
        padding: 3rem;
        display: flex;
        justify-content: space-evenly;
        position: absolute;
    `

    const LeftBox = styled(Box)`
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        padding: 5%;
    `

    const RightBox = styled(Box)`
        width: 40%;
        display: flex;
        justify-content: space-around;
        align-items: center;
    `

    const Box1 = styled(Box)`
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        font-size: 1rem;
    `

    const Box2 = styled(Box)`
        padding-top: 2em;
        padding-bottom: 1em;
    `

    const Box3 = styled(Box)`
        border: 1px solid ${color};
        border-radius: 10px;
    `

    const Text404 = ({fontSize}) => {
        return (
            <Typography fontFamily={'consolas, sans-serif'} fontSize={fontSize}>
                Whoops!
            </Typography>
        )
    }

    const Text2 = styled(Typography)`
        font-family: consolas, sans-serif;
    `

    const Text4 = styled(Text2)`
        text-transform: none;
        color: ${color};
    `

    const CustomButton = styled(Button)`
        width: 100%;
        height: 100%;
    `

    const ConstructionIcon = styled(ConstructionOutlinedIcon)`
        color: ${color};
    `

    const PCIcon = styled(DesktopWindowsOutlinedIcon)`
        color: ${color};
        width: 100%;
        height: 80%;
    `

    const SadIcon = styled(SentimentDissatisfiedOutlinedIcon)`
        color: ${color};
        width: 40%;
        height: 40%;
    `

    const PCIconSpace = () => {
        return (
            // <Box className='error_pc--crash'>
            <>
                <div className="error_pc--icon">
                    <PCIcon/>
                </div>
                <div className="error_pc-sad--icon">
                    <SadIcon/>
                </div>
            </>
            // </Box>
        )
    }

    const MobileIcon = styled(PhoneIphoneOutlinedIcon)`
        color: ${color};
        width: 100%;
        height: 80%;
        // border: 1px solid green;
    `

    const MobileIconSpace = () => {
        return (
            // <Box className='error_mobile--crash'>
            <>
                <div className="error_mobile--icon">
                    <MobileIcon/>
                </div>
                <div className="error_mobile-sad--icon">
                    <SadIcon/>
                </div>
            </>
            // </Box>
        )
    }

    const CrashIcon = () => {
        return( 
            <>
                {
                    (screenWidth >= 768) ? 
                        <PCIconSpace/>
                    : 
                        <MobileIconSpace/>
                }
            </>
        )
    }

    const handleGoBack = () => {
        navigate('/problems')
    }

    return (
        // <div className="error_container md:flex">
            <MainBox className="error_container sm:flex-col-rev sm:side-padding-2">
                <LeftBox className='md:width-60 sm:height-60'>
                    <Box1 >
                        {
                            (screenWidth >= 768) ?
                                <Text404 fontSize={'5em'}/>
                            :
                                <Text404 fontSize={'2em'}/>
                        }
                    </Box1>
                    <Box2>
                        <Text2>This page is not available right now. Perhaps it is under development! <ConstructionIcon/></Text2>
                    </Box2>
                    {/* <Box3>
                        <Text3>Perhaps it is under development! <ConstructionIcon/></Text3>
                    </Box3> */}
                    <Box3 className='error_goback--button'>
                        <CustomButton onClick={handleGoBack}>
                            <Text4>Let's go back and explore.</Text4>
                        </CustomButton>
                    </Box3>
                </LeftBox>
                <RightBox className="sm:mobile-icon-container">
                    <CrashIcon/>
                </RightBox>
                
            </MainBox>
        // </div>
    )
}

export default NotFound