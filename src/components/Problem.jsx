import { useState, useEffect, useContext, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import UserContext from "../contexts/UserContext";

import { Box, Button, Typography, Menu, MenuItem } from "@mui/material"
import styled from "@emotion/styled"

import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import CachedIcon from '@mui/icons-material/Cached';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
// import TimerOffOutlinedIcon from '@mui/icons-material/TimerOffOutlined';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import axios from "axios";

const Problem = ({color, bgColor, setLoginBoxStatus}) => {

    const userContext = useContext(UserContext)
    const loginStatus = userContext.user.loginStatus

    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const [sliderPosition, setSliderPosition] = useState(50)

    const [language, setLanguage] = useState("cpp")
    const [solvedProblems, setSolvedProblems] = useState([])
    const [snippet, setSnippet] = useState('')
    const [code, setCode] = useState('')
    const [output, setOutput] = useState(null)
    const [error, setError] = useState(null)
    const [status, setStatus] = useState(null)

    const navigate = useNavigate()
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const id = searchParams.get('id')

    useEffect(() => {
        if (id === null || id === '')
            navigate('/problems')
    }, [])

    // const [problem, setProblem] = useState({id: 1, title: 'Two Sum', companyTags: ['amazon', 'facebook', 'google'], body: 'This is the Problem Statement of Two Sum', difficulty: 'Easy', accuracy: '100%', submissions: '100K+', points: '2', examples: [{input: 'input 1', output: 'output 1', explanation: 'explanation 1'}, {input: 'input 2', output: 'output 2', explanation: 'explanation 2'}], constraints: ['1 < N < 2', '1 < T <= 5000']})
    const [problem, setProblem] = useState(null)
    const [outputActive, setOutputActive] = useState(false)
    const [outputError, setOutputError] = useState({message: 'An error occurred.'})

    useEffect(() => {
        const showProblem = async() => {
            try {
                const problemsResponse = await axios.post('http://localhost:3500/problem/show', {_id : id});
                
                // console.log("response",problemsResponse.data)
                setProblem(problemsResponse.data)
                
            } catch (error) {
                console.error(error);
            }
        }
        showProblem()
        
        function handleResize() {
            setScreenWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    useEffect(() => {
        const getProblem = async()=>{
            let problemSolution = ' '
            let isExists
            try{ 
                const res = await axios.post('http://localhost:3500/user/solved',{_id : userContext.user.id})
                setSolvedProblems(res.data.solvedProblem)
                const person = res.data.user
                for (const problem of solvedProblems)
                {
                    
                    if (problem._id === id)
                    {
                       
                        for ( const p of person.solvedProblems.problems)
                        {
                            isExists = p.problemId.toString() === problem._id.toString()
                            if (isExists)
                            {
                                if(language === 'cpp') {
                                problemSolution = p.solution[0].cpp
                                }
                                else if(language === 'python') {
                                problemSolution = p.solution[0].python
                                }
                                else {
                                    problemSolution = p.solution[0].java
                                }
                               
                            }
                            
                        }
                    }
                }
            } catch(err) {
                console.log(err)
            }
            console.log(problemSolution)
            if(problemSolution !== ' ') {
                setSnippet(problemSolution)
                console.log(snippet)
            } 
            else { 
            switch (language) {
                case 'cpp':
                    setSnippet('// Enter your code here.')
                    break
                case 'java':
                    setSnippet('// Enter your code here.')
                    break
                case 'python':
                    setSnippet('## Enter your code here.')
                    break
            }}
        }
        getProblem()
                
        function handleResize() {
            setScreenWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }

      
    }, [language])

    const LangSelectMenu = () => {
        const [anchorEl, setAnchorEl] = useState(null);
        const open = Boolean(anchorEl);

        const handleClick = (event) => {
            setAnchorEl(event.currentTarget)
        }
        const handleClose = () => {
            setAnchorEl(null);
        }

        const handleLangClick = (lang) => {
            setLanguage(lang)
            handleClose()
        }

        const StyledMenuItem = styled(MenuItem)`
            width: 150px;
            display: flex;
            justify-content: space-between;
        `

        const DownIcon = styled(KeyboardArrowDownIcon)`
            color: ${color};
        `

        const LangLogo = ({ lang }) => {
            const imgAddress = `../images/${lang}.png`

            const LangBox = styled(Box)`
                width: 100%;
                display: flex; 
                justify-content: space-between;
                align-items: center;
            `

            return (
                <LangBox>
                    <Typography fontFamily={'consolas, sans-serif'}>{lang}</Typography>
                    <img src={imgAddress} alt={lang} height={25} width={25}/>		
                </LangBox>
            )
        }
      
        return (
            <Box style={{border: `1px solid ${color}`, borderRadius: '5px', width: '15%',  minWidth: '100px', color: `${color}`}}>
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    style={{width: '100%', height: '100%'}}
                    endIcon={<DownIcon/>}
                >
                    <Typography fontFamily={'consolas, sans-serif'} style={{textTransform: 'none', color: `${color}`}}>
                        {language}
                    </Typography>
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <StyledMenuItem onClick={() => handleLangClick('cpp')}><LangLogo lang={'cpp'}/></StyledMenuItem>
                    <StyledMenuItem onClick={() => handleLangClick('java')}><LangLogo lang={'java'}/></StyledMenuItem>
                    <StyledMenuItem onClick={() => handleLangClick('python')}><LangLogo lang={'python'}/></StyledMenuItem>
                </Menu>
            </Box>            
        );
    }

    // const Timer = () => {
    //     const [counting, setCounting] = useState('off')
    //     const [elapsedTime, setElapsedTime] = useState({hours: '00', minutes: '00', seconds: '00'})
    //     const [initialTime, setInitialTime] = useState({})

    //     const startTimer = () => {
    //         setCounting('on')
    //         let currentTime = new Date()
    //         setInitialTime({hours: currentTime.getHours(), minutes: currentTime.getMinutes(), seconds: currentTime.getSeconds()})
    //         while(counting === 'on');
                
    //     }

    //     const endTimer = () => {
    //         setElapsedTime({hours: '00', minutes: '00', seconds: '00'})
    //         setInitialTime({})
    //         setCounting('off')
    //     }

    //     const handleTimeClick = () => {
    //         if (counting === 'off') {
    //             startTimer()
    //         } else {
    //             endTimer()
    //         }
    //     }

    //     // const countTime = () => {
    //     //     let currentTime = new Date()

    //     //     let hours = currentTime.getHours()
    //     //     let minutes = currentTime.getMinutes()
    //     //     let seconds = currentTime.getSeconds()

    //     //     let hoursGap = hours - initialTime.hours
    //     //     let minutesGap = minutes - initialTime.minutes
    //     //     let secondsGap = seconds - initialTime.seconds

    //     //     setElapsedTime({hours: hoursGap, minutes: minutesGap, seconds: secondsGap})

    //     //     console.log(elapsedTime)
    //     // }

    //     const TimerBox = styled(Box)`
    //         width: fit-content;
    //         border: 1px solid green;
    //         height: 70%;
    //         padding: 1%;
    //         border-radius: 5px;
    //     `

    //     const TimerButton = styled(Button)`
    //         width: 100%;
    //         height: 100%;
    //         color: ${color};
    //         display: flex;
    //         justify-content: space-between;
    //         align-items: center;
    //     `

    //     const TimerIcon = styled(TimerOutlinedIcon)`
    //         color: ${color};
    //     `

    //     const TimerOffIcon = styled(TimerOffOutlinedIcon)`
    //         color: ${color};
    //     `

    //     return (
    //         <TimerBox>
    //             <TimerButton onClick={handleTimeClick}>
    //                 {
    //                     (counting === 'on') ?
    //                         <> 
    //                             <TimerOffIcon/>
    //                             <Typography fontFamily='consolas, sans-serif' style={{textTransform: 'none'}}>
    //                                 Stop Timer {elapsedTime.hours} : {elapsedTime.minutes} : {elapsedTime.seconds}
    //                             </Typography>
    //                         </>
    //                     :
    //                         <>
    //                             <TimerIcon/>
    //                             <Typography fontFamily='consolas, sans-serif' style={{textTransform: 'none'}}>
    //                                 Start Timer {elapsedTime.hours} : {elapsedTime.minutes} : {elapsedTime.seconds}
    //                             </Typography>
    //                         </>
    //                 }
    //             </TimerButton>
    //         </TimerBox>
    //     )
    // }

    const MainBox = styled(Box)`
        background-color: ${bgColor};
        position: absolute;
        width: 100%;
        display: flex;
    `

    const LeftBox = styled(Box)`
        display: flex;
        flex-direction: column;
        border-radius: 5px;
    `

    const LeftBoxHeader = styled(Box)`
        display: flex;
        align-items: center;
        justify-content: flex-start;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
        height: 8%;
    `

    const LeftBoxHeaderButton = styled(Button)`
        min-width: 20%;
        width: 150px;
        height: 100%;
        color: ${color};
        border-radius: 0;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    `

    const LeftBoxBody = styled(Box)`
        width: 100%;
        height: 92%;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        display: flex;
        flex-direction: column;
        padding: 10px;
    `

    const BugIcon = styled(BugReportOutlinedIcon)`
        color: ${color};
        height: 100%;
    `

    const ProblemStatementTitle = styled(Box)`
        width: 100%;
        display: flex;
        justify-content: space-between;
        text-align: center;
        padding: 0 2%;
        color: ${color};
    `

    const ProblemPropertiesAndStats = styled(Box)`
        width: 100%;
        display: flex;
        justify-content: space-between;
        text-align: center;
        margin-top: 1%;
        padding: 0 2%;
        color: ${color};
    `

    const ProblemCompanyTags = styled(Box)`
        width: 100%;
        display: flex;
        justify-content: flex-start;
        gap: 20px;
        color: ${color};
        padding: 0 2%;
        margin-top: 10px;
    `

    const ProblemStatementBody = styled(Box)`
        height: fit-content;
        width: 100%;
        margin-top: 4px;
        color: ${color};
    `

    const ExampleBox = styled(Box)`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        padding: 10px 2%;
    `

    const ExampleBody = styled(Box)`
        display: flex;
        flex-direction: column;
        text-align: left;
        width: 100%;
        border: 1px solid ${color};
        background-color: darkgray;
        border-radius: 5px;
        padding: 8px 2%;
        margin-top: 8px;
    `

    const ConstraintsBox = styled(Box)`
        width: 100%;
        height: fit-content;
        padding: 10px 2%;
    `

    const RightBox = styled(Box)`
        border: 2px dotted ${color};
        border-radius: 5px;
        display: flex;
        flex-direction: column;
    `

    const RightBoxHeader = styled(Box)`
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 5%;
        width: 100%;
        height: 8%;
    `

    const RightBoxHeaderOptions = styled(Box)`
        width: fit-content;
        height: 100%;
        display: flex;
        align-items: center;
    `

    const RightBoxHeaderButton = styled(Button)`
        height: 100%;
        width: 50%;
    `

    const ReloadIcon = styled(CachedIcon)`
        color: ${color};
    `

    const FullScreenIcon = styled(FullscreenIcon)`
        color: ${color};
    `

    const handleReloadCodeSnippet = () => {

    }

    const handleFullScreenOpen = () => {
        
    }

    const RightBoxBody = styled(Box)`
        width: 100%;
        border-top: 1px solid #b8b8b8;
        border-bottom: 1px solid #b8b8b8;
    `

    const RightBoxFooter = styled(Box)`
        width: 100%;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-right: 5%;
    `

    const CompileButton = styled(Button)`
        color: #fff;
        background-color: orange;
        height: 100%;
    `
    const editorRef = useRef(null)

    const handleEditorMount = (editor, monaco) => {
        editorRef.current = editor
    }

    const getEditorValue = () => {
        if (editorRef.current === null) return ''
        else return editorRef.current.getValue()
    }
    const handleCompile = async(e) => {
        setError(null)
        setOutput(null)
        e.preventDefault()
        await axios.post('http://localhost:3500/problem/run',{
            language : language,
            code : getEditorValue(),
            _id : id,
        }).then((response) => {
            console.log(response)
            setStatus(response.status.toString())
            setOutput(response.data.output)
            if (status === '202') {
                setError(response.data.message)
            }
            setOutputActive(true)
        }).catch((err) => {
            setStatus(err.response.status.toString())
            setError(err.response.data.error)
        })
        if( output !== null || error !== null) setOutputActive(true) 
    }

    const SubmitButton = styled(Button)`
        color: #fff;
        background-color: green;
        height: 100%;
    `

    const handleSubmit = async(e) => {
        setError(null)
        setOutput(null)
        e.preventDefault()
        await axios.post('http://localhost:3500/problem/submit',{
            user_id : userContext.user.id,
            problem_id : problem._id,
            code : getEditorValue(),
            language : language
        }).then((response) => {
            setStatus(response.status.toString())
            setOutput(response.data.output.output)
            if (status === '202') {
                setError(response.data.output.message)
            }
            setOutputActive(true)
        }).catch((err)=>{
            setStatus(err.response.status.toString())
            setError(err.response.data.message)
          
        })
        if( output !== null || error !== null) setOutputActive(true) 
    }

    const ForceLoginBox = styled(Box)`
        position: absolute;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-radius: 5px;
        backdrop-filter: blur(5px);
    `

    const ForceLoginButton = styled(Button)`
        color: #fff;
        padding: 8px;
        border: 1px solid #fff;
    `

    const OutputOverlay = () => {
        const OutputBox = styled(Box)`
            // border: 1px solid red;
            z-index: 1;
            width: 100%;
            height: 100%;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
        `

        const OutputBoxHeader = styled(Box)`
            border: 1px solid ${color};
            height: 15%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 2%;
            background-color: #70cc68;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
        `

        const CloseIcon = styled(CloseOutlinedIcon)`
            color: ${color};
        `

        const OutputBoxBody = styled(Box)`
            height: 85%;
            width: 100%;
            overflow: auto;
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            padding: 20px;
            gap: 15px;
            color: ${color};
        `

        const OutputErrorBox = styled(Box)`
            color: #fff;
            background-color: #ab2b31;
            width: 100%;
            border: 1px solid #ab2b31;
            border-radius: 5px;
            padding: 5px 20px;
            text-align: left;
        `

        const SuccessBox = styled(Box)`
            color: #fff;
            background-color: #348c16;
            width: 100%;
            border: 1px solid #348c16;
            border-radius: 5px;
            padding: 5px 20px;
            text-align: left;
        `

        return (
            <OutputBox className='animate-output-popup'>
                <OutputBoxHeader>
                    <Typography fontFamily={'consolas, sans-serif'} fontWeight={'bold'} fontSize={'1.1rem'} color={`${color}`}>
                        Output Window
                    </Typography>
                    <CloseIcon onClick={() => {setOutputActive(false)}}/>
                </OutputBoxHeader>
                <OutputBoxBody>
                    <Box>
                        <Typography fontFamily={'consolas, sans-serif'} fontWeight={'bold'} textAlign={'left'}>
                            For Input: 
                        </Typography>
                        <Typography fontFamily={'consolas, sans-serif'} textAlign={'left'}>
                            {problem.testcase[0].input}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography fontFamily={'consolas, sans-serif'} fontWeight={'bold'} textAlign={'left'}>
                            Your Output: 
                        </Typography>
                        <Typography fontFamily={'consolas, sans-serif'} textAlign={'left'}>
                            {output}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography fontFamily={'consolas, sans-serif'} fontWeight={'bold'} textAlign={'left'}>
                            Expected Output: 
                        </Typography>
                        <Typography fontFamily={'consolas, sans-serif'} textAlign={'left'}>
                           {problem.testcase[0].output}
                        </Typography>
                    </Box>

                    {/* An iSLoading condition will be placed here. */}
                    {
                        (error !== null) ?
                            <OutputErrorBox>
                                {
                                    (status !== '202' && status !== '201') &&
                                    <Typography fontFamily={'consolas, sans-serif'}>
                                        Compilation failed!
                                    </Typography>
                                }
                                <Typography fontFamily={'consolas, sans-serif'} style={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    height: 'fit-content'
                                }}>
                                    {error}
                                </Typography>
                                {
                                    (status === '202') &&
                                    <Typography fontFamily={'consolas, sans-serif'} >
                                            Your answer is submitted!
                                    </Typography>
                                }

                            </OutputErrorBox>

                        :
                            <SuccessBox>
                            {
                                (status === '200') &&
                                    <Typography fontFamily={'consolas, sans-serif'}>
                                        Test case passed succesfully!
                                    </Typography>
                            } 
                            {
                                (status === '201') &&
                                    <Typography fontFamily={'consolas, sans-serif'}>
                                        Answer accepted!
                                    </Typography>
                            }
                            </SuccessBox>
                    }
                </OutputBoxBody>
            </OutputBox>
        )
    }

    const SlidingComponent = () => {

        const handleSliderDrag = (event) => {
            const {clientX} = event
            const newPosition = (clientX / window.innerWidth) * 100
            if (newPosition >= 30 && newPosition <= 70) {
                setSliderPosition(newPosition)
            }
        }

        const SlidingMainBox = styled(MainBox)`
            height: 91.15vh;
            padding: 2%;
        `

        const SlidingLeftBox = styled(LeftBox)`
            border: 2px dotted ${color};
            width: ${sliderPosition}%;
        `

        const SlidingLeftBoxHeader = styled(LeftBoxHeader)`
            
        `

        const SlidingLeftBoxHeaderButton = styled(LeftBoxHeaderButton)`

        `

        const SlidingLeftBoxBody = styled(LeftBoxBody)`
            overflow: auto;
        `

        const Slider = styled(Box)`
            width: 1%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        `

        const DragIcon = styled(DragIndicatorIcon)`
            color: ${color};
            width: 180%;
            height: 2%;
        `

        const SlidingRightBox = styled(RightBox)`
            width: ${100 - sliderPosition}%;
            position: relative;
        `

        const SlidingRightBoxHeader = styled(RightBoxHeader)`

        `

        const SlidingRightBoxHeaderOptions = styled(RightBoxHeaderOptions)`
        
        `

        const SlidingRightBoxHeaderButton = styled(RightBoxHeaderButton)`
            
        `

        const SlidingRightBoxBody = styled(RightBoxBody)`
            height: 84%;
        `

        const SlidingRightBoxFooter = styled(RightBoxFooter)`
            height: 8%;
        `

        const SlidingForceLogin = () => {
            const SlidingForceLoginBox = styled(ForceLoginBox)`
                width: 100%;
                height: 100%;
            `

            return (
                <SlidingForceLoginBox>
                    <ForceLoginButton onClick={() => {setLoginBoxStatus('open')}}>
                        <Typography fontFamily={'consolas, sans-serif'} style={{textTransform: 'none'}}>
                            Login to solve the problem
                        </Typography> 
                    </ForceLoginButton>
                </SlidingForceLoginBox>
            )
        }

        return (
            <SlidingMainBox>
                <SlidingLeftBox>
                    <SlidingLeftBoxHeader>
                        <SlidingLeftBoxHeaderButton style={{borderBottom: '3px solid green'}}>
                            <Typography fontFamily={'consolas, sans-serif'} style={{textTransform: 'capitalize'}}>
                                Description
                            </Typography>
                        </SlidingLeftBoxHeaderButton>
                    </SlidingLeftBoxHeader>
                    <SlidingLeftBoxBody>
                        <ProblemStatementTitle> {
                            (problem !== null) &&
                                <Typography
                                    fontFamily={'consolas, sans-serif'}
                                    style={{fontSize: '1.5rem'}}
                                >
                                    {problem.id}. {problem.title}
                                </Typography>
                            }
                            <BugIcon/>
                        </ProblemStatementTitle>
                        <ProblemPropertiesAndStats>
                            {
                                (problem !== null) && 
                                <> 
                                    <Typography fontFamily={'consolas, sans-serif'} style={{fontWeight: 'bold', fontSize: '0.8rem'}}>
                                        {problem.difficulty}
                                    </Typography>
                                    <Typography fontFamily={'consolas, sans-serif'} style={{fontSize: '0.8rem'}}>
                                        Accuracy: {problem.accuracy}
                                    </Typography>
                                    <Typography fontFamily={'consolas, sans-serif'} style={{fontSize: '0.8rem'}}>
                                        Submissions: {problem.submissions}
                                    </Typography>
                                </>
                            }
                        </ProblemPropertiesAndStats>
                        {
                            (problem?.company?.length > 0) && 
                            <ProblemCompanyTags>
                                <Typography fontFamily={'consolas, sans-serif'} style={{fontWeight: 'bold', fontSize: '0.8rem'}}>Asked by:</Typography>
                                {
                                   <img src={`../images/${problem.company}.png`} alt={`${problem.company}`} height={'100%'} width={'20px'}/>          
                                }
                            </ProblemCompanyTags>
                        }
                        <ProblemStatementBody>
                            <Typography fontFamily={'consolas, sans-serif'} style={{textAlign: 'left', padding: '2%', display: 'flex', flexDirection: 'column'}}>
                                {/* <Typography fontFamily={'consolas, sans-serif'} style={{fontWeight: 'bold', marginRight: '2%'}}>Problem Statement:</Typography> */}
                                {problem?.desc}
                            </Typography>
                            {
                                problem?.examples.map((example, index) => {
                                    return (
                                        <ExampleBox>
                                            <Typography fontFamily={'consolas, sans-serif'} fontWeight={'bold'}>
                                                Example {index + 1}:
                                            </Typography>
                                            <ExampleBody>
                                                <Typography fontFamily={'consolas, sans-serif'} style={{display: 'flex'}}>
                                                    <Typography fontFamily={'consolas, sans-serif'} style={{fontWeight: 'bold', marginRight: '2%'}}>Input:</Typography>
                                                    {example.input}
                                                </Typography>
                                                <Typography fontFamily={'consolas, sans-serif'} style={{display: 'flex'}}>
                                                    <Typography fontFamily={'consolas, sans-serif'} style={{fontWeight: 'bold', marginRight: '2%'}}>Output:</Typography>
                                                    {example.output}
                                                </Typography>
                                                <Typography fontFamily={'consolas, sans-serif'} style={{display: 'flex'}}>
                                                    <Typography fontFamily={'consolas, sans-serif'} style={{fontWeight: 'bold', marginRight: '2%'}}>Exaplanation:</Typography>
                                                    {example.explanation}
                                                </Typography>
                                            </ExampleBody>
                                        </ExampleBox>
                                    )
                                })
                            }
                            {
                                (problem?.constraints?.length > 0) &&
                                <ConstraintsBox>  
                                    <Typography fontFamily={'consolas, sans-serif'} style={{fontWeight: 'bold', fontSize: '1.1rem', textAlign: 'left'}}>
                                        Constraints:
                                    </Typography>
                                    {
                                        problem.constraints.map((constraint, index) => {
                                            return (
                                                <Typography fontFamily={'consolas, sans-serif'} style={{fontSize: '1rem', textAlign: 'left', padding: '0 4px'}}>
                                                    {index + 1}. {constraint}
                                                </Typography>
                                            )
                                        })
                                    }
                                </ConstraintsBox>
                            }    
                        </ProblemStatementBody>
                    </SlidingLeftBoxBody>
                    {
                        (outputActive === true) && <OutputOverlay/>
                    }
                </SlidingLeftBox>
                <Slider 
                    className="hover-pointer"
                    onMouseDown={(event) => {
                        event.preventDefault()
                        document.addEventListener('mousemove', handleSliderDrag)
                        document.addEventListener('mouseup', () => {
                            document.removeEventListener('mousemove', handleSliderDrag)
                        })
                    }}
                >
                    <DragIcon/>
                    <DragIcon/>
                    <DragIcon/>
                </Slider>
                <SlidingRightBox>
                    <SlidingRightBoxHeader>
                        <LangSelectMenu/>
                        {/* <Timer/> */}
                        <SlidingRightBoxHeaderOptions>
                            <SlidingRightBoxHeaderButton onClick={handleReloadCodeSnippet}>
                                <ReloadIcon/>
                            </SlidingRightBoxHeaderButton>
                            <SlidingRightBoxHeaderButton onClick={handleFullScreenOpen}>
                                <FullScreenIcon/>
                            </SlidingRightBoxHeaderButton>
                        </SlidingRightBoxHeaderOptions>
                    </SlidingRightBoxHeader>
                   
                    <SlidingRightBoxBody>
                        <Editor
                            defaultValue={snippet}
                            id="code"
                            name="code"
                            className="problem_code_editor"
                            type="text"
                            height="100%"
                            width ="100%"
                            theme="vs-dark"
                            value={getEditorValue()}
                            onMount={handleEditorMount}
                            options={{
                                inlineSuggest: true,
                                fontSize: "16px",
                                formatOnType: true,
                                autoClosingBrackets: true,
                                minimap: { scale: 10 }
                            }} 
                        />
                    </SlidingRightBoxBody>
                    <SlidingRightBoxFooter>
                        <Typography 
                            fontFamily={'consolas, sans-serif'} 
                            style={{textDecoration: 'underline', color: `${color}`, paddingRight: '2.5%'}}
                        >
                            Custom input
                        </Typography>
                        <div className="compile-button hover:no-color-change-scale-1.2">
                            <CompileButton onClick={handleCompile}>
                                <Typography fontFamily={'consolas, sans-serif'} style={{textTransform: 'none'}}>Compile & Run</Typography>
                            </CompileButton>
                        </div>
                        <div className="submit-button hover:no-color-change-scale-1.2">
                            <SubmitButton onClick={handleSubmit}>
                                <Typography fontFamily={'consolas, sans-serif'} style={{textTransform: 'none'}}>Submit</Typography>
                            </SubmitButton>
                        </div>
                    </SlidingRightBoxFooter>
                  
                    {
                        (loginStatus === false) && <SlidingForceLogin/>
                    }
                </SlidingRightBox>
                
            </SlidingMainBox>
        )
    }

    const NonSlidingComponent = () => {

        const NonSlidingMainBox = styled(MainBox)`
            border: 1px solid ${color};
            min-height: 91.15vh;
            max-height: fit-content;
            flex-direction: column;
            justify-content: space-evenly;
            padding: 5%;
        `
        
        const NonSlidingLeftBox = styled(LeftBox)`
            min-height: fit-content;
        `

        const NonSlidingLeftBoxHeader = styled(LeftBoxHeader)`

        `

        const NonSlidingLeftBoxHeaderButton = styled(LeftBoxHeaderButton)`
        `

        const NonSlidingLeftBoxBody = styled(LeftBoxBody)`

        `

        const NonSlidingRightBox = styled(RightBox)`
            height: 600px;
        `

        const NonSlidingRightBoxHeader = styled(RightBoxHeader)`
            
        `

        const NonSlidingRightBoxHeaderOptions = styled(RightBoxHeaderOptions)`

        `

        const NonSlidingRightBoxHeaderButton = styled(RightBoxHeaderButton)`
            
        `

        const NonSlidingRightBoxBody = styled(RightBoxBody)`
            height: 82%;
        `

        const NonSlidingRightBoxFooter = styled(RightBoxFooter)`
            height: 10%;
        `

        const NonSlidingForceLogin = () => {
            const NonSlidingForceLoginBox = styled(ForceLoginBox)`
                width: calc(90% - 4px);
                height: 598px;
            `

            return (
                <NonSlidingForceLoginBox>
                    <ForceLoginButton onClick={() => {setLoginBoxStatus('open')}}>
                        <Typography fontFamily={'consolas, sans-serif'} style={{textTransform: 'none'}}>
                            Login to solve the problem
                        </Typography> 
                    </ForceLoginButton>
                </NonSlidingForceLoginBox>
            )
        }

        return (
            <NonSlidingMainBox>
                <NonSlidingLeftBox>
                    <NonSlidingLeftBoxHeader>
                        <NonSlidingLeftBoxHeaderButton style={{borderBottom: '3px solid green'}}>
                            <Typography fontFamily={'consolas, sans-serif'} style={{textTransform: 'capitalize'}}>
                                Description
                            </Typography>
                        </NonSlidingLeftBoxHeaderButton>
                    </NonSlidingLeftBoxHeader>
                    <NonSlidingLeftBoxBody>
                        <ProblemStatementTitle>
                            <Typography
                                fontFamily={'consolas, sans-serif'}
                                style={{fontSize: '1.5rem'}}
                            >
                                {problem.id}. {problem.title}
                            </Typography>
                            <BugIcon/>
                        </ProblemStatementTitle>
                        <ProblemPropertiesAndStats>
                            <Typography fontFamily={'consolas, sans-serif'} style={{fontWeight: 'bold', fontSize: '0.8rem'}}>
                                {problem.difficulty}
                            </Typography>
                            <Typography fontFamily={'consolas, sans-serif'} style={{fontSize: '0.8rem'}}>
                                Accuracy: {problem.accuracy}
                            </Typography>
                            <Typography fontFamily={'consolas, sans-serif'} style={{fontSize: '0.8rem'}}>
                                Submissions: {problem.submissions}
                            </Typography>
                            {/* <Typography fontFamily={'consolas, sans-serif'} style={{fontSize: '0.8rem'}}>
                                Points: {problem.points}
                            </Typography> */}
                        </ProblemPropertiesAndStats>
                        {
                            <ProblemCompanyTags>
                                <Typography fontFamily={'consolas, sans-serif'} style={{fontWeight: 'bold', fontSize: '0.8rem'}}>Asked by:</Typography>
                                {
                                   <img src={`../images/${problem.company}.png`} alt={`${problem.company}`} height={'100%'} width={'20px'}/>          
                                }
                            </ProblemCompanyTags>
                        }
                        <ProblemStatementBody>
                            <Typography fontFamily={'consolas, sans-serif'} style={{textAlign: 'left', padding: '2%', display: 'flex', flexDirection: 'column'}}>
                                {/* <Typography fontFamily={'consolas, sans-serif'} style={{fontWeight: 'bold', marginRight: '2%'}}>Problem Statement:</Typography> */}
                                {problem.desc}
                            </Typography>
                            {
                                problem.examples.map((example, index) => {
                                    return (
                                        <ExampleBox>
                                            <Typography fontFamily={'consolas, sans-serif'} fontWeight={'bold'}>
                                                Example {index + 1}:
                                            </Typography>
                                            <ExampleBody>
                                                <Typography fontFamily={'consolas, sans-serif'} style={{display: 'flex'}}>
                                                    <Typography fontFamily={'consolas, sans-serif'} style={{fontWeight: 'bold', marginRight: '2%'}}>Input:</Typography>
                                                    {example.input}
                                                </Typography>
                                                <Typography fontFamily={'consolas, sans-serif'} style={{display: 'flex'}}>
                                                    <Typography fontFamily={'consolas, sans-serif'} style={{fontWeight: 'bold', marginRight: '2%'}}>Output:</Typography>
                                                    {example.output}
                                                </Typography>
                                                <Typography fontFamily={'consolas, sans-serif'} style={{display: 'flex'}}>
                                                    <Typography fontFamily={'consolas, sans-serif'} style={{fontWeight: 'bold', marginRight: '2%'}}>Exaplanation:</Typography>
                                                    {example.explanation}
                                                </Typography>
                                            </ExampleBody>
                                        </ExampleBox>
                                    )
                                })
                            }
                        </ProblemStatementBody>
                    </NonSlidingLeftBoxBody>
                </NonSlidingLeftBox>
                <NonSlidingRightBox>
                <NonSlidingRightBoxHeader>
                        <LangSelectMenu/>
                        {/* <Timer/> */}
                        <NonSlidingRightBoxHeaderOptions>
                            <NonSlidingRightBoxHeaderButton onClick={handleReloadCodeSnippet}>
                                <ReloadIcon/>
                            </NonSlidingRightBoxHeaderButton>
                            <NonSlidingRightBoxHeaderButton onClick={handleFullScreenOpen}>
                                <FullScreenIcon/>
                            </NonSlidingRightBoxHeaderButton>
                        </NonSlidingRightBoxHeaderOptions>
                    </NonSlidingRightBoxHeader>
                   
                    <NonSlidingRightBoxBody>
                        <Editor 
                            defaultValue={snippet}
                            className='problem_code_editor'
                            onMount={handleEditorMount}
                            height="100%"
                            width ="100%"
                            theme="vs-dark"
                            value={getEditorValue()}
                            options={{
                                inlineSuggest: true,
                                fontSize: "16px",
                                formatOnType: true,
                                autoClosingBrackets: true,
                                minimap: { scale: 10 }
                            }} 
                        />
                        
                    </NonSlidingRightBoxBody>
                    <NonSlidingRightBoxFooter>
                        <Typography 
                            fontFamily={'consolas, sans-serif'} 
                            style={{textDecoration: 'underline', color: `${color}`, paddingRight: '2.5%'}}
                        >
                            Custom input
                        </Typography>
                        <div className="compile-button hover:no-color-change-scale-1.2">
                            <CompileButton onClick={handleCompile}>
                                <Typography fontFamily={'consolas, sans-serif'} style={{textTransform: 'none'}}>Compile & Run</Typography>
                            </CompileButton>
                        </div>
                        <div className="submit-button hover:no-color-change-scale-1.2">
                            <SubmitButton onClick={handleSubmit}>
                                <Typography fontFamily={'consolas, sans-serif'} style={{textTransform: 'none'}}>Submit</Typography>
                            </SubmitButton>
                       </div>
                    </NonSlidingRightBoxFooter>
                    
                    {
                        (loginStatus === false) && <NonSlidingForceLogin/>
                    }
                    {
                        (outputActive === true) && <OutputOverlay/>
                    }
                </NonSlidingRightBox>
            </NonSlidingMainBox>
        )
    }

    return (
        <>
            {
                (screenWidth >= 768) ? 
                    <SlidingComponent/>
                : 
                    <NonSlidingComponent/>
            }
        </>
    )
}

export default Problem

// (problem.company?.length > 0) && 
// <ProblemCompanyTags>
//     <Typography fontFamily={'consolas, sans-serif'} style={{fontWeight: 'bold', fontSize: '0.8rem'}}>Asked by:</Typography>
//     {
//         problem.company.map((company) => {
//             return (
//                 <img src={`../images/${company}.png`} alt={`${company}`} height={'100%'} width={'20px'}/>
//             )
//         })
//     }
// </ProblemCompanyTags>

// switch (language) {
    //         case 'cpp':
    //             setSnippet('// Enter your code here.')
    //             break
    //         case 'java':
    //             setSnippet('// Enter your code here.')
    //             break
    //         case 'python':
    //             setSnippet('## Enter your code here.')
    //             break
    //     }