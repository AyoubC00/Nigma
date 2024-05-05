import { Box, Button, Container, TextField, Typography } from "@mui/material"
import PasswordField from "../../components/PasswordField/PasswordField"
import { NavLink, useNavigate } from "react-router-dom"
import React, { useState } from "react"
import { useAuth } from "../../contexts/AuthContext"

const Register = () =>
{
    const [details, setDetails] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
    })
    const [errors, setErrors] = useState<IRegister>({})
    const { register } = useAuth()
    const navigate = useNavigate()
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        setDetails(prev => ( { ...prev, [event.target.name]: event.target.value }))
    }
    const handleSubmit = async () =>
    {
        setErrors({})
        const response = await register(details)
        if (response?.status === "failure")
        {
            return setErrors(response.messages)
        }
        navigate("/login")
    }
    return (
        <Box>
            <Container>
                <Box sx={{ px: { xs: 2, sm: 3}, py: { xs: 8 }, maxWidth: 400, mx: "auto" }}>
                    <Typography sx={{ mb: 4 }}>
                        Already have an account? 
                        <Button component={ NavLink } to="/login">Login</Button>
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2 }}>
                        <TextField 
                            fullWidth 
                            size="small" 
                            label="First name" 
                            name="first_name" 
                            error={ errors.first_name ? true : false }
                            helperText={ errors.first_name }
                            value={ details.first_name } 
                            onChange={ handleChange } 
                            sx={{ mb: 2 }} 
                        />
                        <TextField 
                            fullWidth 
                            size="small" 
                            label="Last name" 
                            name="last_name" 
                            error={ errors.last_name ? true : false }
                            helperText={ errors.last_name }
                            value={ details.last_name } 
                            onChange={ handleChange } 
                            sx={{ mb: 2 }} 
                        />
                    </Box>
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
                    <TextField 
                        fullWidth 
                        size="small" 
                        label="Email" 
                        name="email" 
                        error={ errors.email ? true : false }
                        helperText={ errors.email }
                        value={ details.email } 
                        onChange={ handleChange } 
                        sx={{ mb: 2 }} 
                    />
                    <Box sx={{ display: { xs: "block", sm: "flex"  }, gap: 2 }}>
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
                        <PasswordField 
                            fullWidth 
                            size="small" 
                            label="Confirm password" 
                            name="password_confirmation" 
                            error={ errors.password_confirmation ? true : false }
                            helperText={ errors.password_confirmation }
                            value={ details.password_confirmation } 
                            onChange={ handleChange } 
                            sx={{ mb: 3 }} 
                        />
                    </Box>
                    <Button fullWidth variant="contained" onClick={ handleSubmit }>Register</Button>
                </Box>
            </Container>
        </Box>
    )
}

export default Register