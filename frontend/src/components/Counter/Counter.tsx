import { Box, SxProps, Typography } from "@mui/material"
import { useEffect, useState } from "react"


interface ICounter {
    sx?: SxProps
    start?: boolean
    time: Time | null
    onTimeout?: () => void
}

const Counter = ({ sx, start, time, onTimeout }: ICounter) =>
{
    const [_time, setTime] = useState<Time|null>(time)

    useEffect( () => {
        setTime(time)
    }, [time])
    useEffect(() => {
        if (!start || !_time) return
        const timer = setTimeout( () => {
            if (_time?.seconds === 0 && _time?.minutes === 0) return onTimeout?.()
            update()
        }, 1000)
        return () => clearTimeout(timer)
    }, [_time, start])

    const update = () =>
    {
        if (!_time) return
        const { seconds, minutes } = _time 
        if (seconds <= 0) setTime({ seconds: 59, minutes: minutes - 1 })
        else setTime({ seconds: seconds - 1, minutes})
    }
    return (
        <Box sx={ sx }>
            <Typography variant="h6">{`${_time?.minutes || 0}`.padStart(2, '0')} : {`${_time?.seconds || 0}`.padStart(2, '0')}</Typography>
        </Box>
    )
}

export default Counter