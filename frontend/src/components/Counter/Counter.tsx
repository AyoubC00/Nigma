import { Box, SxProps, Typography } from "@mui/material"
import { useEffect, useState } from "react"

interface ICounter {
    sx?: SxProps
    start?: boolean
    onGameover?: () => void
}

const Counter = ({ sx, start, onGameover }: ICounter) =>
{
    const [time, setTime] = useState({ seconds: 0, minutes: 1 })
    useEffect(() => {
        if (!start) return
        const timer = setTimeout( () => {
            if (time.seconds === 0 && time.minutes === 0) return onGameover?.()
            update()
        }, 1000)
        return () => clearTimeout(timer)
    }, [time, start])
    const update = () =>
    {
        const { seconds, minutes } = time 
        if (seconds <= 0) setTime({ seconds: 59, minutes: minutes - 1 })
        else setTime({ seconds: seconds - 1, minutes})
    }
    return (
        <Box sx={ sx }>
            <Typography variant="h6">{`${time.minutes}`.padStart(2, '0')} : {`${time.seconds}`.padStart(2, '0')}</Typography>
        </Box>
    )
}

export default Counter