import { useEffect, useState } from "react"

import { Box, Typography } from "@mui/material"
import styled from "@emotion/styled"

const ComingSoon = ({color, bgColor}) => {

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

    const MainBox = styled(Box)`
        height: 91.15vh;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: ${bgColor};
        color: ${color};
    `

    return (
        <MainBox>
            {
                (screenWidth >= 768) ?
                    <Typography fontFamily={'consolas, sans-serif'} fontSize={'5rem'}>
                        This feature is coming soon!
                    </Typography>
                :
                    <Typography fontFamily={'consolas, sans-serif'} fontSize={'1.5rem'}>
                        This feature is coming soon!
                    </Typography>
            }
        </MainBox>
    )
}

export default ComingSoon