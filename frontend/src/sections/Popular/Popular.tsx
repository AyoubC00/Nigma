import { Box, Container, Grid, Skeleton, Typography } from "@mui/material"
import QuizCard from "../../components/QuizCard/QuizCard"
import { useQuizzes } from "../../contexts/QuizzesContext"
const Popular = () =>
{
    const { quizzes } = useQuizzes()
    return (
        <Box>
            <Container>
                <Box sx={{ px: { xs: 2, sm: 3 }, py: { xs: 10 } }}>
                    <Typography variant="sectionTitle" color="primary" sx={{ mb: 8 }}>
                        Try out our most popular quizzes
                    </Typography>
                    <Grid container spacing={ 2 }>
                        {   
                            quizzes.length <= 0  
                            ? [1, 2, 3, 4]?.map(quiz =>
                                <Grid item xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 } key={ quiz }>
                                    <Skeleton variant="rounded" animation="wave" height={ 200 } />
                                </Grid>
                            )
                            : quizzes?.map(quiz =>
                                <Grid item xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 } key={ quiz.id }>
                                    <QuizCard 
                                        id={ quiz.id } 
                                        title={ quiz.title } 
                                        image={ quiz.image }
                                        taken={ quiz?.taken } 
                                        owner={ quiz.owner }
                                        category={ quiz.category }
                                    />
                                </Grid>
                            )
                        }
                    </Grid>
                </Box>
            </Container>
        </Box>
    )
}

export default Popular