import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';

import UserContext from '../contexts/UserContext';

import { Box, Button, Typography, Checkbox } from "@mui/material"
import styled from '@emotion/styled';
import axios from 'axios';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CloseOutlined from '@mui/icons-material/CloseOutlined';
import { type } from '@testing-library/user-event/dist/type';

const Problems = ({color, bgColor}) => {

    const navigate = useNavigate()
    const userContext = useContext(UserContext)
    const user = userContext.user
    const loginStatus = user.loginStatus

    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    const [problems,setProblems] = useState([])
    const [potd, setPotd] = useState('')
    const [easyChecked, setEasyChecked] = useState(false)
    const [mediumChecked, setMediumChecked] = useState(false)
    const [hardChecked, setHardChecked] = useState(false)

    const [showFilterComponent, setShowFilterComponent] = useState(false)


    const userSolved = user.solvedProblems.easy + user.solvedProblems.medium + user.solvedProblems.hard
    const totalProblems = 5
    const solvedToTotalRatio = (userSolved / totalProblems) * 100
    const hardSolved = user.solvedProblems.hard
    const mediumSolved = user.solvedProblems.medium
    const easySolved = user.solvedProblems.easy

    useEffect(() => {
        const fetchProblems = async () => {
          try {
            const problemsResponse = await axios.get('http://localhost:3500/problem');
            const potdResponse = await axios.get('http://localhost:3500/problemOfTheDay');
            const problemsLoaded = problemsResponse.data;
            const problemOfTheDay = potdResponse.data;
            setProblems(problemsLoaded.problems)
            setPotd(problemOfTheDay);
          } catch (error) {
            console.error(error);
          }
        };
      
        fetchProblems();
        function handleResize() {
            setScreenWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])
 
    const DesktopViewComponent = () => {
        const ProblemMainBox = styled(Box)`
            width: 100%;
            min-height: 91.15vh;
            height: fit-content;
            background-color: ${bgColor};
            display: flex;
            justify-content: space-evenly;
            gap: 10px;
            padding: 15px;
            padding-bottom: 0;
        `

        const FilterBox = styled(Box)`
            border-right: 1px solid ${color};
            min-height: 200px;
            width: 20%;
        `

        const FilterBoxHeader = styled(Box)`
            border-bottom: 1px solid ${color};
            width: 90%;
            height: 8%;
            color: ${color};
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 10px;
            padding-left: 20px;
        `

        const FilterIcon = styled(FilterAltIcon)`
            color: ${color};
        `

        const FilterBoxBody = styled(Box)`
            width: 90%;
            padding: 10% 5%;
            color: ${color};
            display: flex;
            flex-direction: column;
            gap: 10px;
            align-items: flex-start;
        `

        const FilterOption = styled(Box)`
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
        `

        const CustomCheckbox = styled(Checkbox)`
            color: ${color};
            height: 60%;
        `

        const handleChangeCheck = (text) => {
            if (text === 'easy') {
                setEasyChecked(!easyChecked)

            } else if (text === 'medium') {
                setMediumChecked(!mediumChecked)
            } else {
                setHardChecked(!hardChecked)
            }
        }

        const ProblemSetBox = styled(Box)`
            width: 60%;
            padding: 2%;
            color: ${color};
            overflow: auto;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `

        const ProblemOfTheDayBox = styled(Box)`
            width: 100%;
            height: fit-content;
            border: 1px solid ${color};
            border-radius: 5px;
            text-align: left;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 2%;
            padding-bottom: 0;
        `

        const ProblemCard = ({problem}) => {

            const ProblemCardBox = styled(Box)`
                border-bottom: 1px solid ${color};
                width: 100%;
                height: 120px;
                padding: 2%;
                display: flex;
                justify-content: space-between;
            `

            const TitleAndCompanyBox = styled(Box)`
                width: fit-content;
                text-align: left;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: flex-start;
                gap: 10px;
                padding: 10px;
            `

            const CompanyTags = styled(Box)`
                display: flex;
                justify-content: flex-start;
                gap: 10px;
            `

            const SolveAndStatsBox = styled(Box)`
                width: 30%;
                padding: 10px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                gap: 0;
            `

            const SolveButton = styled(Button)`
                background-color: #348c16;
                width: 100%;
                height: 50%;
                color: #fff;
            `

            const handleSolveClick = (problemId) => {
                navigate(`/problem/?id=${problemId}`)
            }

            const StatsBox = styled(Box)`
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 10px;
            `

            return (
                <ProblemCardBox>
                    <TitleAndCompanyBox>
                        <Typography fontFamily={'consolas, sans-serif'} style={{fontWeight: 'bold', fontSize: '1.2rem'}}>
                            {problem.title}
                        </Typography>
                        <CompanyTags>
                            <Typography fontFamily={'consolas, sans-serif'} style={{ fontSize: '0.8rem'}}>Asked by:</Typography>
                            {
                                   <img src={`../images/${problem.company}.png`} alt={`${problem.company}`} height={'100%'} width={'20px'}/>          
                            }
                        </CompanyTags>
                    </TitleAndCompanyBox>
                    <SolveAndStatsBox>
                        <SolveButton onClick={() => handleSolveClick(problem._id)}>
                            <Typography fontFamily={'consolas, sans-serif'} style={{ textTransform: 'capitalize'}}>
                                Solve Problem
                            </Typography>
                        </SolveButton>
                        <StatsBox>
                            <Typography fontFamily={'consolas, sans-serif'} style={{ fontSize: '0.8rem'}}>
                                {problem.difficulty}
                            </Typography>
                            |
                            <Typography fontFamily={'consolas, sans-serif'} style={{ fontSize: '0.8rem'}}>
                                {problem.submissions}
                            </Typography>
                            |
                            <Typography fontFamily={'consolas, sans-serif'} style={{ fontSize: '0.8rem'}}>
                                {problem.accuracy}
                            </Typography>
                        </StatsBox>
                    </SolveAndStatsBox>
                </ProblemCardBox>
            )
        }

        const UserStatsAndAdvertisements = () => {

            const UserStatsAndAdvertisementsBox = styled(Box)`
                width: 20%;
                padding: 10px;
                display: flex;
                flex-direction: column;
                gap: 5%;
            `

            const UserStatsBox = styled(Box)`
                width: 100%;
                height: fit-content;
                border: 1px solid ${color};
                border-radius: 5px;
                color: ${color};
                text-align: left;
                display: flex;
                flex-direction: column;
                gap: 10px;
                padding: 10% 5%;
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

            const AdvertisementBox = styled(Box)`
                width: 100%;
                height: fit-content;
                color: ${color};
                border: 1px solid ${color};
                border-radius: 5px;
                padding: 10%;
                display: flex;
                flex-direction: column;
                gap: 10%;
            `

            return (
                <UserStatsAndAdvertisementsBox>
                    {
                        (loginStatus === true) &&
                            <UserStatsBox>
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
                            </UserStatsBox>
                    }
                    <AdvertisementBox>
                        <Typography fontFamily={'consolas, sans-serif'} fontSize={'1.2rem'}>
                            Exciting courses coming soon! 
                        </Typography>
                        <Typography fontFamily={'consolas, sans-serif'} fontSize={'1.1rem'}>
                            Stay tuned!
                        </Typography>
                    </AdvertisementBox>
                    
                </UserStatsAndAdvertisementsBox>
            )
        }

        
        return (
            <ProblemMainBox>
                <FilterBox>
                    <FilterBoxHeader>
                        <FilterIcon/>
                        <Typography fontFamily={'consolas, sans-serif'}>
                            Filter
                        </Typography>
                    </FilterBoxHeader>
                    <FilterBoxBody>
                        <Typography fontFamily={'consolas, sans-serif'}>
                            Difficulty:
                        </Typography>
                        <FilterOption 
                            className='hover:scale-y-1.2'
                            onClick={() => handleChangeCheck('easy')}
                        >
                            <CustomCheckbox 
                                color='success'
                                checked={easyChecked}
                            />
                            <Typography fontFamily={'consolas, sans-serif'}>
                                Easy
                            </Typography>
                        </FilterOption>
                        <FilterOption 
                            className='hover:scale-y-1.2'
                            onClick={() => handleChangeCheck('medium')}
                        >
                            <CustomCheckbox 
                                color='success'
                                checked={mediumChecked}
                            />
                            <Typography fontFamily={'consolas, sans-serif'}>
                                Medium
                            </Typography>
                        </FilterOption>
                        <FilterOption 
                            className='hover:scale-y-1.2'
                            onClick={() => handleChangeCheck('hard')}
                        >
                            <CustomCheckbox 
                                color='success'
                                checked={hardChecked}
                            />
                            <Typography fontFamily={'consolas, sans-serif'}>
                                Hard
                            </Typography>
                        </FilterOption>
                        
                    </FilterBoxBody>
                </FilterBox>
                <ProblemSetBox>
                        <Typography fontFamily={'consolas, sans-serif'} fontSize={'1.2rem'} style={{textAlign: 'left'}}>
                            Problems: 
                        </Typography>
                        <ProblemOfTheDayBox>
                            <Typography fontFamily={'consolas, sans-serif'} style={{textDecoration: 'underline'}}>
                                Problem of The Day
                            </Typography>
                            <ProblemCard problem = {potd}/>
                        </ProblemOfTheDayBox>
                        {
                            problems.map((problem,id) => (
                                
                            <ProblemCard key = {id} problem = {problem}/>
                                
                            ))
                        }
                </ProblemSetBox>
                <UserStatsAndAdvertisements/>
            </ProblemMainBox>
        )
    }

    const MobileViewComponent = () => {
        const ProblemMainBox = styled(Box)`
            width: 100%;
            min-height: 91.15vh;
            height: fit-content;
            background-color: ${bgColor};
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            gap: 10px;
            padding: 15px;
            padding-bottom: 0;
        `

        const UserStatsBox = styled(Box)`
            width: 100%;
            height: fit-content;
            border: 1px solid ${color};
            border-radius: 5px;
            color: ${color};
            text-align: left;
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding: 10% 5%;
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

        const FilterBox = styled(Box)`
            min-height: 200px;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 8.85vh;
            left: 0;
            backdrop-filter: blur(7px);
            z-index: 1;
        `

        const FilterBoxHeader = styled(Box)`
            border-bottom: 1px solid ${color};
            width: 100%;
            height: 8%;
            color: ${color};
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 10px;
            padding: 0 20px;
        `

        const FilterIcon = styled(FilterAltIcon)`
            color: ${color};
        `

        const CloseIcon = styled(CloseOutlined)`
            color: ${color};
        `

        const FilterBoxBody = styled(Box)`
            width: 100%;
            padding: 10% 5%;
            color: ${color};
            display: flex;
            flex-direction: column;
            gap: 10px;
            align-items: flex-start;
        `

        const FilterOption = styled(Box)`
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
        `

        const CustomCheckbox = styled(Checkbox)`
            color: ${color};
            height: 60%;
        `

        const handleChangeCheck = (text) => {
            if (text === 'easy') {
                setEasyChecked(!easyChecked)

            } else if (text === 'medium') {
                setMediumChecked(!mediumChecked)
            } else {
                setHardChecked(!hardChecked)
            }
        }

        const ProblemSetBox = styled(Box)`
            width: 100%;
            padding: 2%;
            color: ${color};
            overflow: auto;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `

        const ProblemOfTheDayBox = styled(Box)`
            width: 100%;
            height: fit-content;
            border: 1px solid ${color};
            border-radius: 5px;
            text-align: left;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 2%;
            padding-bottom: 0;
        `

        const ProblemCard = ({problem}) => {

            const ProblemCardBox = styled(Box)`
                border-bottom: 1px solid ${color};
                width: 100%;
                height: 100px;
                padding: 2%;
                display: flex;
                justify-content: space-between;
            `

            const TitleAndCompanyBox = styled(Box)`
                width: fit-content;
                text-align: left;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: flex-start;
                gap: 10px;
                padding: 10px;
            `

            const CompanyTags = styled(Box)`
                display: flex;
                justify-content: flex-start;
                gap: 10px;
            `

            const SolveAndStatsBox = styled(Box)`
                width: 30%;
                max-width: fit-content;
                padding: 10px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                gap: 0;
            `

            const SolveButton = styled(Button)`
                background-color: #348c16;
                width: 100%;
                height: 50%;
                color: #fff;
            `

            const handleSolveClick = (problemId) => {
                navigate(`/problem/?id=${problemId}`)
            }

            const StatsBox = styled(Box)`

                display: flex;
                justify-content: center;
                align-items: center;
                gap: 10px;
            `

            return (
                 <ProblemCardBox>
                    <TitleAndCompanyBox>
                        <Typography fontFamily={'consolas, sans-serif'} style={{fontWeight: 'bold', fontSize: '1.2rem'}}>
                            {problem.ttile}
                        </Typography>
                        <CompanyTags>
                            <Typography fontFamily={'consolas, sans-serif'} style={{ fontSize: '0.8rem'}}>Asked by:</Typography>
                                {problem.company}
                        </CompanyTags>
                    </TitleAndCompanyBox>
                    <SolveAndStatsBox>
                        <SolveButton onClick={() => handleSolveClick(problem._id)}>
                            <Typography fontFamily={'consolas, sans-serif'} style={{ textTransform: 'capitalize'}}>
                                Solve
                            </Typography>
                        </SolveButton>
                        <StatsBox>
                            <Typography fontFamily={'consolas, sans-serif'} style={{ fontSize: '0.8rem'}}>
                                {problem.difficulty}
                            </Typography>
                            |
                            <Typography fontFamily={'consolas, sans-serif'} style={{ fontSize: '0.8rem'}}>
                                {problem.accuracy}
                            </Typography>
                        </StatsBox>
                    </SolveAndStatsBox>
                </ProblemCardBox>
              
            )
        }

        const FilterIconBox = styled(Box)`
            position: fixed;
            bottom: 40px;
            right: 40px;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            border: 1px solid #494d48;
            background-color: #494d48;
        `

        const FixedFilterIcon = styled(FilterAltIcon)`
            color: #fff;
            padding: 5px;
            width: 100%;
            height: 100%;
            border-radius: 50%;
        `

        const handleFilterIconClick = () => {
            setShowFilterComponent(true)
        }
        
        return (
            <>
                <ProblemMainBox>
                    {
                        (showFilterComponent === true) &&
                        <FilterBox className='animate-filterbox-popup'>
                            <FilterBoxHeader>
                                <Box style={{display: 'flex', gap: '10px'}}>
                                    <FilterIcon/>
                                    <Typography fontFamily={'consolas, sans-serif'}>
                                        Filter
                                    </Typography>
                                </Box>
                                <CloseIcon
                                    onClick={() => {setShowFilterComponent(false)}}
                                />
                            </FilterBoxHeader>
                            <FilterBoxBody>
                                <Typography fontFamily={'consolas, sans-serif'}>
                                    Difficulty:
                                </Typography>
                                <FilterOption 
                                    className='hover:scale-y-1.2'
                                    onClick={() => handleChangeCheck('easy')}
                                >
                                    <CustomCheckbox 
                                        color='success'
                                        checked={easyChecked}
                                    />
                                    <Typography fontFamily={'consolas, sans-serif'}>
                                        Easy
                                    </Typography>
                                </FilterOption>
                                <FilterOption 
                                    className='hover:scale-y-1.2'
                                    onClick={() => handleChangeCheck('medium')}
                                >
                                    <CustomCheckbox 
                                        color='success'
                                        checked={mediumChecked}
                                    />
                                    <Typography fontFamily={'consolas, sans-serif'}>
                                        Medium
                                    </Typography>
                                </FilterOption>
                                <FilterOption 
                                    className='hover:scale-y-1.2'
                                    onClick={() => handleChangeCheck('hard')}
                                >
                                    <CustomCheckbox 
                                        color='success'
                                        checked={hardChecked}
                                    />
                                    <Typography fontFamily={'consolas, sans-serif'}>
                                        Hard
                                    </Typography>
                                </FilterOption>
                                
                            </FilterBoxBody>
                        </FilterBox>
                    }
                    {
                        (loginStatus === true) &&
                        <UserStatsBox>
                            <Typography fontFamily={'consolas, sans-serif'} fontSize={'0.8rem'}>
                                Problems Solved: {userSolved} / {totalProblems}
                            </Typography>
                            <ProgressBar>
                                <ProgressedFraction/>
                            </ProgressBar>
                        </UserStatsBox>
                    }
                    <ProblemSetBox>
                            <Typography fontFamily={'consolas, sans-serif'} fontSize={'1.2rem'} style={{textAlign: 'left'}}>
                                Problems: 
                            </Typography>
                            <ProblemOfTheDayBox>
                                <Typography fontFamily={'consolas, sans-serif'} style={{textDecoration: 'underline'}}>
                                    Problem of The Day : {potd.title}   
                                </Typography>
                            </ProblemOfTheDayBox>
                            {
                                problems.map((problem, id) => {
                                    return (
                                       <div key = {id} ><p>{problem.title}</p></div>
                                    )
                                })
                            }
                    </ProblemSetBox>
                </ProblemMainBox>
                <FilterIconBox onClick={handleFilterIconClick}>
                    <FixedFilterIcon/>
                </FilterIconBox>
            </>
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

export default Problems



// problem.company.map((company) => {
//     return (
//         <img src={`../images/${company}.png`} alt={`${company}`} height={'100%'} width={'20px'}/>
//     )
// })