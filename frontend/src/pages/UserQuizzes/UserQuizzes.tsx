import { Add } from "@mui/icons-material"
import { Box, Button, Container, Grid, Skeleton } from "@mui/material"
import QuizCard from "../../components/QuizCard/QuizCard"
import { useNavigate } from "react-router-dom"
import { useQuizzes } from "../../contexts/QuizzesContext"
import { useEffect, useState } from "react"

const UserQuizzes = () =>
{
    const [userQuizzes, setUserQuizzes] = useState<IQuiz[]>([])
    const { getUserQuizzes } = useQuizzes()
    useEffect( () => {
        (async () => {
            const response = await getUserQuizzes()
            if (response?.status === "success") setUserQuizzes(response.data)
        })()
    }, [])
    const navigate = useNavigate()
    const handleClick = async () =>
    {
        navigate("create")
    }
    return (
        <Container>
            <Box sx={{ px: { xs: 1, sm: 2 }, py: 4 }}>
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
                        userQuizzes.length <= 0
                        ? [1, 2, 3, 4].map(quiz =>
                            <Grid xs={ 12 } sm={ 6 } lg={ 4 } item key={ quiz }>
                                <Skeleton variant="rounded" animation="wave" height={ 200 } />
                            </Grid>
                        )
                        : userQuizzes?.map(quiz =>
                            <Grid xs={ 12 } sm={ 6 } lg={ 4 } item key={ quiz.id }>
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