import { useState, useEffect, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import UserContext from '../contexts/UserContext'

import { Box, Button, Typography } from '@mui/material'
import styled from '@emotion/styled'

import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const Profile = ({color, bgColor}) => {
    const usernameRef = useRef()
    const navigate = useNavigate()
    const userContext = useContext(UserContext)
    const user = userContext.user
    const loginStatus = user.loginStatus

    useEffect(() => {
        if (loginStatus === false) 
            navigate('/problems')
    }, [])

    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const [solvedProblems, setSolvedProblems] = useState([])
    const username = user.username
    const [u_name, setUserName] = useState(username)
    const [editingUsername, setEditingUsername] = useState(false)
    const userSolved = user.solvedProblems.easy + user.solvedProblems.medium + user.solvedProblems.hard
    const totalProblems = 5
    const solvedToTotalRatio = (userSolved / totalProblems) * 100
    const hardSolved = user.solvedProblems.hard
    const mediumSolved = user.solvedProblems.medium
    const easySolved = user.solvedProblems.easy
    const streak = user.streak
    const userRating = user.rating
    const [error, setError] = useState(null)

   

    useEffect(() => {
        const fetchProblems = async () =>{
            try{
                const problemResponse = await axios.post('http://localhost:3500/user/solved',{_id : user.id})
                setSolvedProblems(problemResponse.data.solvedProblem)
            } catch(err)
            {   
                setError(err.response.data)
                console.log(error)
            }
        };

        fetchProblems()
        
        function handleResize() {
            setScreenWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const MainBox = styled(Box)`
        // border: 1px solid red;
        background-color: ${bgColor};
        height: 91.15vh;
        max-height: fit-content;
        width: 100%;
        display: flex;
        justify-content: space-around;
        padding: 10px 0;
    `

    const ProfileBox = styled(Box)`
        border-left: 1px solid ${color};
        border-right: 1px solid ${color};
        width: 80%;
        display: flex;
        flex-direction: column;
        padding: 1% 1%;
        overflow: auto;
    `

    const UserStatsBox = styled(Box)`
        width: 100%;
        height: fit-content;
        border-radius: 5px;
        color: ${color};
        text-align: left;
        display: flex;
        flex-direction: column;
        gap: 10px;
    `

    const ProgressBar = styled(Box)`
        width: 100%;
        height: 7px;
        display: flex;
        justify-content: flex-start;
        border: 1px solid #000;
        border-radius: 4px;
        background-color: #fff;
    `

    const ProgressedFraction = styled(Box)`
        height: 100%;
        width: ${solvedToTotalRatio}%;
        border-radius: 4px;
        background-color: #348c16;
    `

    const ImageAndNameBox = styled(Box)`
        width: 100%;
        display: flex;
        justify-content: flex-start;
        padding: 0 5%;
        gap: 2%;
    `

    const ImageBox = styled(Box)`
        box-shadow: 0 0 0 1px ${color};
        border-radius: 50%;
    `

    const NameBox = styled(Box)`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        padding: 2%;
        color: ${color};
    `

    const handleSave = async() => {
        const usernameVal = usernameRef.current.value
        console.log("username",usernameVal)
        await axios.patch('http://localhost:3500/user',{_id : user.id, e_mail : user.e_mail, username : usernameVal}).then((response)=>{
            console.log(response.data.username)
            setUserName(response.data.username)
        })
        setEditingUsername(false)
    }

    const cancelUpdate = () => {
        setEditingUsername(false)
    }

    const ErrorBox = styled(Box)`
        width: 100%;
    `

    const EditableNameComponent = styled(Box)`
        display: flex;
        justify-content: space-between;
        width: 100%;
    `

    const RatingBox = styled(Box)`
        border-radius: 5px;
        display: flex;
        align-items: center;
        color: ${color};
    `

    const SolvedBox = styled(Box)`
        height: fit-content;
        padding: 0 5%;
        padding-bottom: 1%;
        display: flex;
        flex-direction: column;
        gap: 10px;
        color: ${color};
    `

    const SolvedProblemCard = styled(Box)`
        border-bottom: 1px solid ${color};
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1% 5%;
    `

    const SolveButton = styled(Button)`
        background-color: #348c16;
        width: 100%;
        height: 100%;
        color: #fff;
    `

    const handleSolveClicked = (problemId) => {
        navigate(`/problem/?id=${problemId}`)
    }

    const DesktopViewComponent = () => {

        const DesktopUserStatsBox = styled(UserStatsBox)`
            width: 80%;
            padding: 5% 5%;
        `

        const DesktopProgressBar = styled(ProgressBar)`
            width: 80%;
            height: 10px;
            border-radius: 5px;
        `

        const StreakBox = styled(Box)`
            border-radius: 5px;
            width: 20%;
            padding: 5% 0;
            padding-right: 5%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: ${color};
        `

        const DesktopImageAndNameBox = styled(ImageAndNameBox)`
            height: 200px;
        `

        const DesktopImageBox = styled(Box)`
            width: 20%;
            height: 100%;
        `

        const DesktopNameBox = styled(NameBox)`
            border: 1px solid ${color};
            border-radius: 5px;
            max-width: fit-content;
            min-width: 50%;
            height: 100%;
        `

        const DesktopRatingBox = styled(RatingBox)`
            border: 1px solid ${color};
            width: 26%;
            flex-direction: column;
            justify-content: center;
        `

        return (
            <MainBox>
                <ProfileBox>
                    <DesktopImageAndNameBox>
                        <DesktopImageBox>
                            <img 
                                src={`../images/blank-profile.png`} 
                                alt={"User photo"} 
                                height={'100%'} 
                                width={'100%'}
                                style={{
                                    borderRadius: '50%'
                                }}
                            />
                        </DesktopImageBox>
                        <DesktopNameBox>
                            <Typography fontFamily={'consolas, sans-serif'} fontSize={'1.1rem'} style={{paddingLeft: '10px'}}>
                                Username:
                            </Typography>
                            <EditableNameComponent>
                                {
                                    (editingUsername === true) ? 
                                        <Box style={{
                                            width: '100%',
                                            display: 'flex', 
                                            justifyContent: 'space-between', 
                                            alignItems: 'center',
                                            padding: '0 5px'
                                        }}>
                                            <input 
                                                type='text'
                                                name = 'username'
                                                id = 'username'
                                                ref = {usernameRef}
                                                style={{
                                                    width: '100%'
                                                }}
                                            />
                                            <Box style={{
                                                width: 'fit-content', 
                                                display: 'flex', 
                                                gap: '10px',
                                                padding: '0 2%'
                                            }}>
                                                <div className="hover:pointer">
                                                    <SaveIcon 
                                                        color = {color}
                                                        onClick = {handleSave}
                                                    />
                                                </div>
                                                <div className="hover:pointer">
                                                    <CloseRoundedIcon
                                                        color = {color}
                                                        onClick = {cancelUpdate}
                                                    />
                                                </div>
                                            </Box>
                                        </Box>
                                    :
                                        <Box style={{
                                            width: '100%',
                                            display: 'flex', 
                                            justifyContent: 'space-between', 
                                            alignItems: 'center',
                                            padding: '0 5px'
                                        }}>
                                            <Typography fontFamily={'consolas, sans-serif'} fontSize={'2rem'}>
                                                {u_name}
                                            </Typography>
                                            <div className="hover:pointer">
                                                <EditIcon
                                                    color={color}
                                                    style={{
                                                        height: '100%'
                                                    }}
                                                    onClick={() => setEditingUsername(true)}
                                                />
                                            </div>
                                        </Box>
                                }
                            </EditableNameComponent>
                            {
                                (error !== null) &&
                                <ErrorBox>
                                    <Typography fontFamily={'consolas, sans-serif'} style={{color: 'red'}}>
                                        {error.message}
                                    </Typography>
                                </ErrorBox>
                            }
                        </DesktopNameBox>
                        <DesktopRatingBox>
                            <Typography fontFamily={'consolas, sans-serif'} fontSize={'1.1rem'}>
                                Your current rating:
                            </Typography>
                            <Typography fontFamily={'consolas, sans-serif'} fontSize={'2rem'}>
                                {userRating}
                            </Typography>
                        </DesktopRatingBox>
                    </DesktopImageAndNameBox>
                    <Box style={{display: 'flex'}}>
                        <DesktopUserStatsBox>
                            <Typography fontFamily={'consolas, sans-serif'} fontSize={'1.2rem'}>
                                Problems Solved: {userSolved} / {totalProblems}
                            </Typography>
                            <DesktopProgressBar>
                                <ProgressedFraction/>
                            </DesktopProgressBar>
                            <Box style={{
                                    width: '100%', 
                                    display: 'flex', 
                                    justifyContent: 'flex-start',
                                    gap: '8%'
                                }}
                            >
                                <Typography fontFamily={'consolas, sans-serif'} fontSize={'1.1rem'}>
                                    Easy: {easySolved}
                                </Typography>
                                <Typography fontFamily={'consolas, sans-serif'} fontSize={'1.1rem'}>
                                    Medium: {mediumSolved}
                                </Typography>
                                <Typography fontFamily={'consolas, sans-serif'} fontSize={'1.1rem'}>
                                    Hard: {hardSolved}
                                </Typography>
                            </Box>
                        </DesktopUserStatsBox>
                        <StreakBox>
                            <Typography fontFamily={'consolas, sans-serif'} fontSize={'1.1rem'}>
                                POTD Streak:
                            </Typography>
                            <Typography fontFamily={'consolas, sans-serif'} fontSize={'2rem'}>
                                {streak}
                            </Typography>
                        </StreakBox>
                    </Box>
                    <SolvedBox>
                        <Typography fontFamily={'consolas, sans-serif'} fontSize={'1.2rem'} textAlign={'left'}>
                            Problems solved so far: 
                        </Typography>
                        {
                            (solvedProblems?.length > 0) ?
                                <>
                                    {
                                        solvedProblems.map((problem) => {
                                            return (
                                                <SolvedProblemCard>
                                                    <Typography fontFamily={'consolas, sans-serif'} fontSize={'1.2rem'}>
                                                        {problem.title}
                                                    </Typography>
                                                    <Box style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        textAlign: 'center',
                                                        gap: '20px'
                                                    }}>
                                                        <Typography fontFamily={'consolas, sans-serif'} paddingTop={'5px'}>
                                                            {problem.difficulty}
                                                        </Typography>
                                                        <SolveButton onClick={() => {handleSolveClicked(problem._id)}}>
                                                            <Typography fontFamily={'consolas, sans-serif'} textTransform={'capitalize'}>
                                                                Try Again
                                                            </Typography>
                                                        </SolveButton>
                                                    </Box>
                                                </SolvedProblemCard>
                                            )
                                        })
                                    }
                                </>
                            :
                                <Typography fontFamily={'consolas, sans-serif'} fontSize={'1.2rem'}>
                                    You have solved no problem till now.
                                </Typography>
                        }
                    </SolvedBox>
                </ProfileBox>
            </MainBox>
        )
    }

    const MobileViewComponent = () => {

        const MobileUserStatsBox = styled(UserStatsBox)`
            padding: 10% 5%;
        `

        const MobileImageAndNameBox = styled(ImageAndNameBox)`
            height: fit-content;
            flex-direction: column;
            align-items: center;
        `

        const MobileImageBox = styled(ImageBox)`
            width: 70%;
            height: 70%;
        `

        const MobileNameBox = styled(NameBox)`
            border-bottom: 1px solid ${color};
            width: 100%;
            height: fit-content;
        `

        const MobileRatingBox = styled(RatingBox)`
            width: 100%;
            justify-content: space-evenly;
        `

        const MobileSolvedProblemCard = styled(SolvedProblemCard)`
            padding-bottom: 5%;
        `

        return (
            <MainBox>
                <ProfileBox>
                    <MobileImageAndNameBox>
                        <MobileImageBox>
                            <img 
                                src={`../images/blank-profile.png`} 
                                alt={"User photo"} 
                                height={'100%'} 
                                width={'100%'}
                                style={{
                                    borderRadius: '50%'
                                }}
                            />
                        </MobileImageBox>
                        <MobileNameBox>
                            <Typography fontFamily={'consolas, sans-serif'} fontSize={'1.1rem'} style={{paddingLeft: '5px'}}>
                                Username:
                            </Typography>
                            <EditableNameComponent>
                                {
                                    (editingUsername === true) ? 
                                        <Box style={{
                                            width: '100%',
                                            display: 'flex', 
                                            justifyContent: 'space-between', 
                                            alignItems: 'center',
                                            padding: '0 5px'
                                        }}>
                                            <input 
                                                type='text'
                                                id = 'username'
                                                name ='username'
                                                ref = {usernameRef}
                                                style={{
                                                    width: '100%'
                                                }}
                                            />
                                            <Box style={{
                                                width: 'fit-content', 
                                                display: 'flex', 
                                                gap: '10px',
                                                padding: '0 2%'
                                            }}>
                                                <div className="hover:pointer">
                                                    <SaveIcon 
                                                        color={color}
                                                        onClick={handleSave}
                                                    />
                                                </div>
                                                <div className="hover:pointer">
                                                    <CloseRoundedIcon
                                                        color={color}
                                                        onClick={cancelUpdate}
                                                    />
                                                </div>
                                            </Box>
                                        </Box>
                                    :
                                        <Box style={{
                                            width: '100%',
                                            display: 'flex', 
                                            justifyContent: 'space-between', 
                                            alignItems: 'center',
                                            padding: '0 5px'
                                        }}>
                                            <Typography fontFamily={'consolas, sans-serif'} fontSize={'1.2rem'} 
                                                style={{
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis'}}
                                            >
                                                {username}
                                            </Typography>
                                            <div className="hover:pointer">
                                                <EditIcon
                                                    color={color}
                                                    style={{
                                                        height: '100%'
                                                    }}
                                                    onClick={() => setEditingUsername(true)}
                                                />
                                            </div>
                                        </Box>
                                }
                            </EditableNameComponent>
                            {
                                (error !== null) &&
                                <ErrorBox>
                                    <Typography fontFamily={'consolas, sans-serif'} style={{color: 'red'}}>
                                        {error.message}
                                    </Typography>
                                </ErrorBox>
                            }
                        </MobileNameBox>
                        <MobileRatingBox>
                            <Typography fontFamily={'consolas, sans-serif'} fontSize={'1.1rem'}>
                                Your current rating:
                            </Typography>
                            <Typography fontFamily={'consolas, sans-serif'} fontSize={'1.2rem'}>
                                {userRating}
                            </Typography>
                        </MobileRatingBox>
                    </MobileImageAndNameBox>
                    <MobileUserStatsBox>
                        <Typography fontFamily={'consolas, sans-serif'} fontSize={'0.8rem'}>
                            Problems Solved: {userSolved} / {totalProblems}
                        </Typography>
                        <ProgressBar>
                            <ProgressedFraction/>
                        </ProgressBar>
                        <Typography fontFamily={'consolas, sans-serif'} fontSize={'0.8rem'}>
                            Easy: {easySolved}
                        </Typography>
                        <Typography fontFamily={'consolas, sans-serif'} fontSize={'0.8rem'}>
                            Medium: {mediumSolved}
                        </Typography>
                        <Typography fontFamily={'consolas, sans-serif'} fontSize={'0.8rem'}>
                            Hard: {hardSolved}
                        </Typography>
                    </MobileUserStatsBox>
                    <SolvedBox>
                        <Typography fontFamily={'consolas, sans-serif'} textAlign={'left'}>
                            Problems solved so far: 
                        </Typography>
                        {
                            (solvedProblems?.length > 0) ?
                                <>
                                    {
                                        solvedProblems.map((problem) => {
                                            return (
                                                <MobileSolvedProblemCard>
                                                    <Typography 
                                                        fontFamily={'consolas, sans-serif'} 
                                                        fontSize={'1rem'}
                                                        style={{
                                                            width: '60%',
                                                            whiteSpace: 'nowrap',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            textAlign: 'left'
                                                        }}
                                                    >
                                                        {problem.title}
                                                    </Typography>
                                                    <Box style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        textAlign: 'center',
                                                        gap: '10px'
                                                    }}>
                                                        <SolveButton onClick={() => {handleSolveClicked(problem._id)}}>
                                                            <Typography fontFamily={'consolas, sans-serif'} textTransform={'capitalize'}>
                                                                Retry
                                                            </Typography>
                                                        </SolveButton>
                                                    </Box>
                                                </MobileSolvedProblemCard>
                                            )
                                        })
                                    }
                                </>
                            :
                                <Typography fontFamily={'consolas, sans-serif'} fontSize={'1.2rem'}>
                                    You have solved no problem till now.
                                </Typography>
                        }
                    </SolvedBox>
                </ProfileBox>
            </MainBox>
        )
    }

    return (
        <>
            {
                (screenWidth >= 768) ? 
                    <DesktopViewComponent/>
                :
                    <MobileViewComponent/>
            }
        </>
    )
}

export default Profile