import { CheckCircle } from "@mui/icons-material"
import { FormControl, FormHelperText, IconButton, InputLabel, OutlinedInput, OutlinedInputProps, SxProps } from "@mui/material"
import { green } from "@mui/material/colors"

const OptionField = ({ sx, checked, name, onCheck , label, helperText, value, ...props } : IOptionField & SxProps & OutlinedInputProps) =>
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
            <InputLabel error={ props.error }>{ label }</InputLabel>
            <OutlinedInput 
                label={ label }
                name={ name }
                value={ value || '' }
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
            <FormHelperText error={ props.error }>{ helperText }</FormHelperText>
        </FormControl>
    )
}

export default OptionField