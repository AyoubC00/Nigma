import { CloudUpload } from "@mui/icons-material"
import { Box, Button, FormHelperText, Skeleton, SxProps } from "@mui/material"
import { ChangeEvent, CSSProperties, useState } from "react"

interface IImageUpload {
    sx?: SxProps
    placeholder?: string
    helperText?: string
    error?: boolean
    setImage: (image: File) => void
}

const ImageUpload = ({ sx, placeholder, error, helperText, setImage }: IImageUpload) =>
{
    const [preview, setPreview] = useState<string>()
    const inputStyle = {
        display: "none"
    }
    const imageStyle: CSSProperties = {
        display: "block",
        width: "100%",
        height: 200,
        objectFit: "cover",
        marginBottom: 8,
        borderRadius: 8
    }
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0]
            setImage(file)
            const fileReader = new FileReader()
            fileReader.onload = (event) => {
                if (event.target ) setPreview(`${event.target.result}`)
            }
            fileReader.readAsDataURL(file)
        }
    }
    return (
        <Box sx={ sx }>
            { preview || placeholder ? <img src={ preview || placeholder } alt="Quiz image" style={ imageStyle } /> : <Skeleton variant="rounded" sx={{ mb: 1 }} animation="wave" height={ 200 } /> }
            <Button fullWidth variant="contained" size="medium" startIcon={ <CloudUpload /> } component="label" sx={{ whiteSpace: "pre" }}>
                Upload image
                <input type="file" id="imageUpload" style={ inputStyle } onChange={ handleChange }/>
            </Button>
            <FormHelperText sx={{ mx: "14px", mt: "4px" }} error={ error }>{ helperText }</FormHelperText>
        </Box>
    )
}

export default ImageUpload