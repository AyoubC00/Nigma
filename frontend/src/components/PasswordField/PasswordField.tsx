import { Visibility, VisibilityOff } from "@mui/icons-material"
import { FormControl, FormHelperText, IconButton, InputLabel, OutlinedInput, OutlinedInputProps } from "@mui/material"
import { useState } from "react"

interface IPasswordField {
    helperText?: string | string[] | undefined
}

const PasswordField = ( { size, label, fullWidth, helperText, sx, ...props }: OutlinedInputProps & IPasswordField ) =>
{
    const [visibility, setVisibility] = useState<boolean>(false)
    const handleVisibility = () =>
    {
        setVisibility(prev => !prev)
    }
    return (
        <FormControl fullWidth={ fullWidth } size={ size } sx={ sx }>
            <InputLabel error={ props.error ? true : false }>{ label }</InputLabel>
            <OutlinedInput 
                label={ label }
                { ...props }
                type={ visibility ? "text" : "password" } 
                endAdornment={
                    <IconButton edge="end" onClick={ handleVisibility }>
                        { visibility ? <VisibilityOff /> : <Visibility /> }
                    </IconButton>
                }
            />
            <FormHelperText error={ props.error }>{ helperText }</FormHelperText>
        </FormControl>
    )
}

export default PasswordField