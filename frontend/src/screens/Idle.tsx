import {  Button, Typography } from "@mui/material"

interface IIdle {
    is_loading?: boolean
    title?: string
    handleStart?: () => void
}

const Idle = ({ handleStart, title, is_loading = false }: IIdle) =>
{
    return (
        is_loading
        ? <Typography sx={{ m: "auto" }}>Loading....</Typography>
        : (
            <>
                <Typography variant="h3" sx={{ m: "auto" }}>{ title }</Typography>
                <Button variant="contained" size="large" onClick={ handleStart } sx={{ mt: "auto", mx: "auto" }}>Start</Button>
            </>
        )
    )
}

export default Idle