import { CheckCircle } from "@mui/icons-material"
import { FormControl, IconButton, InputLabel, OutlinedInput, OutlinedInputProps, SxProps } from "@mui/material"
import { green } from "@mui/material/colors"

const OptionField = ({ sx, checked, name, onCheck , label, ...props } : IOptionField & SxProps & OutlinedInputProps) =>
{
    const handleChange = () =>
    {
        onCheck?.(name)
    }
    return (
        <FormControl 
            fullWidth
            size="small" 
            sx={ sx }
        >
            <InputLabel>{ label }</InputLabel>
            <OutlinedInput 
                label={ label }
                name={ name }
                { ...props }
                endAdornment={
                    <IconButton 
                        edge="end"
                        name={ name }
                        onClick={ handleChange }
                    >
                        { checked 
                            ? <CheckCircle sx={{ color: green[500] }}/> 
                            : <CheckCircle sx={{ opacity: .3 }} /> 
                        }
                    </IconButton>
                }
            />
        </FormControl>
    )
}

export default OptionField