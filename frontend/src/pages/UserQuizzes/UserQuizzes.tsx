import { Add } from "@mui/icons-material"
import { Box, Button, Container, Grid } from "@mui/material"
import QuizCard from "../../components/QuizCard/QuizCard"
import { useNavigate } from "react-router-dom"
import { useQuizzes } from "../../contexts/QuizzesContext"

const UserQuizzes = () =>
{
    const { setState, quizzes } = useQuizzes()
    const navigate = useNavigate()
    const handleClick = async () =>
    {
        // setState("create")
        
        navigate("create")
    }
    return (
        <Container>
            <Box sx={{ py: 4 }}>
                <Button 
                    variant="contained" 
                    size="small" 
                    startIcon={ <Add /> } 
                    onClick={ handleClick }
                    sx={{ display: "flex", ml: "auto", mb: 4, width: "fit-content" }}>
                        Create
                </Button>
                <Grid container spacing={ 3 }>
                    {
                        quizzes.map((quiz, index) =>
                            <Grid xs={ 12 } sm={ 6 } lg={ 4 } item key={ index }>
                                <QuizCard { ...quiz }/>
                            </Grid>
                        )
                    }
                </Grid>
            </Box>
        </Container>
    )
}

export default UserQuizzes