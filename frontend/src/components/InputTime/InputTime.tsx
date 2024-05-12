import { TimerOutlined } from "@mui/icons-material"
import { FormControl, InputLabel, OutlinedInput } from "@mui/material"

const InputTime = () =>
{
    return (
        <FormControl fullWidth size="small">
            <InputLabel>Seconds</InputLabel>
            <OutlinedInput label="Seconds" endAdornment={
                <>
                    <TimerOutlined color="action" />
                </>
            } />
            
        </FormControl>
    )
}

export default InputTime