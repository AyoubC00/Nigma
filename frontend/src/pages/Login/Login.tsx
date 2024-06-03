import { Box, Button, Checkbox, Container, FormControlLabel, TextField, Typography } from "@mui/material"
import { NavLink } from "react-router-dom"
import PasswordField from "../../components/PasswordField/PasswordField"
import { useState } from "react"
import { useAuth } from "../../contexts/AuthContext"

const Login = () =>
{
    const [details, setDetails] = useState({ username: '', password: '', remember_me: false })
    const { login } = useAuth()
    const [errors, setErrors] = useState<ILogin>({})
    const [loading, setLoading] = useState(false)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        if (event.target.name === "remember_me")
        {
            setDetails(prev => ( {...prev, [event.target.name]: !prev["remember_me"] }))
            return
        }
        setDetails(prev => ({ ...prev, [event.target.name]: event.target.value }))
    }
    const handleSubmit = async () =>
    {
        setErrors({})
        setLoading(true)
        const response = await login(details)
        setLoading(false)
        if (response?.status === "failure")
        {
            return setErrors(response.messages)
        }
    }
    return (
        <Box>
            <Container>
                <Box sx={{ px: { xs: 2, sm: 3 }, py: { xs: 8 }, maxWidth: 400, mx: "auto" }}>
                    <Typography sx={{ mb: 4 }}>
                        Don't have an account? 
                        <Button component={ NavLink } to="/register">Create one</Button>
                    </Typography>
                    <Box>
                        <TextField
                            fullWidth 
                            size="small" 
                            label="Username" 
                            name="username" 
                            error={ errors.username ? true : false }
                            helperText={ errors.username }
                            value={ details.username } 
                            onChange={ handleChange } 
                            sx={{ mb: 2 }}
                        />
                        <PasswordField
                            fullWidth 
                            size="small" 
                            label="Password" 
                            name="password" 
                            error={ errors.password ? true : false }
                            helperText={ errors.password }
                            value={ details.password } 
                            onChange={ handleChange } 
                            sx={{ mb: 2 }}
                        />
                        <Button sx={{ px: 0, display: "block" }}>Forgot password?</Button>
                        <FormControlLabel 
                            label="Remember me"
                            control={ 
                                <Checkbox 
                                    name="remember_me" 
                                    onChange={ handleChange } 
                                    checked={ details.remember_me ? true : false }
                                /> 
                            }
                            value={ details.remember_me }
                            sx={{ mb: 2 }}
                        />
                        <Button fullWidth disabled={ loading } variant="contained" color="primary" onClick={ handleSubmit }>Login</Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default Login