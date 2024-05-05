import { Box, Button, Container, List, ListItem, ListItemText, TextField, Typography } from "@mui/material"
import React, { useState } from "react"
import API from "../../api"

const Contact = () =>
{
    const [details, setDetails] = useState<IContact>(
        { first_name: '', last_name: '', email: '', topic: '', message: '' }
    )
    const [errors, setErrors] = useState<Partial<IContact>>({})
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        setDetails(prev => ( {...prev, [event.target.name]: event.target.value }))
    }
    const listItems = [
        "Contact form: Fill out the form below and we'll get back to you shortly.",
        "Email: Reach us directly at chchoukerayoub@gmail.com.",
        "Phone: Give us a call at 06 79 03 30 44 (during business hours).",
    ]
    const handleSubmit = async () =>
    {
        setErrors({})
        const response = await ( async function submit (details: IContact): Promise<ApiResponse<IContact>> {
            try
            {
                const response = await API.post("contact", details)
                return response.data
            } 
            catch (error)
            {
                return error as Partial<IContact>
            }
        })(details)
        if (response.status === "failure")
            setErrors(response.messages)
    }
    return (
        <Box>
            <Container>
                <Box sx={{ px: { xs: 2, sm: 3}, py: { xs: 10 }, display: { xs: "block", sm: "flex" }, gap: 8 }}>
                    <Box sx={{ mb: { xs: 4, sm: 0 } }}>
                        <Typography variant="body1" sx={{ mb: 3 }}>
                            Have a question? Need some help? We're here for you! Feel free to reach out using the following methods:
                        </Typography>
                        <List>
                            {
                                listItems.map((item, index) =>
                                    <ListItem key={ index }>
                                        <ListItemText>{ item }</ListItemText>
                                    </ListItem>
                                )
                            }
                        </List>
                    </Box>
                    <Box>
                        <Box sx={{ display: "flex", gap: 4 }}>
                            <TextField 
                                fullWidth 
                                size="small" 
                                label="First name" 
                                sx={{ mb: 2 }} 
                                name="first_name"
                                error={ errors.first_name ? true : false }
                                helperText={ errors.first_name }
                                value={ details.first_name }
                                onChange={ handleChange }
                            />
                            <TextField 
                                fullWidth 
                                size="small" 
                                label="Last name" 
                                sx={{ mb: 2 }} 
                                name="last_name"
                                error={ errors.last_name ? true : false }
                                helperText={ errors.last_name }
                                value={ details.last_name }
                                onChange={ handleChange }
                            />
                        </Box>
                        <TextField 
                            fullWidth 
                            size="small" 
                            label="Email" 
                            sx={{ mb: 2 }} 
                            name="email"
                            error={ errors.email ? true : false }
                            helperText={ errors.email }
                            value={ details.email }
                            onChange={ handleChange }
                        />
                        <TextField 
                            fullWidth 
                            size="small" 
                            label="Topic" 
                            sx={{ mb: 2 }} 
                            name="topic"
                            error={ errors.topic ? true : false }
                            helperText={ errors.topic }
                            value={ details.topic }
                            onChange={ handleChange }
                        />
                        <TextField 
                            fullWidth 
                            size="small" 
                            multiline 
                            label="Message" 
                            sx={{ mb: 2 }} 
                            rows={ 3 } 
                            name="message"
                            error={ errors.message ? true : false }
                            helperText={ errors.message }
                            value={ details.message }
                            onChange={ handleChange }
                        />
                        <Button fullWidth variant="contained" onClick={ handleSubmit }>Send</Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default Contact