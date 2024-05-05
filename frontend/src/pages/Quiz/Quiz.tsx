import { ExitToApp } from "@mui/icons-material"
import { Box, Button, Container, Grid, Typography } from "@mui/material"
import bg from "../../assets/burst.svg"
import { FC, ReactNode, useEffect, useState } from "react"
import Option from "../../components/Option/Option"
import { useNavigate, useParams } from "react-router-dom"
import { useQuizzes } from "../../contexts/QuizzesContext"
import Counter from "../../components/Counter/Counter"
import getNextQuestion from "../../utils/getNextQuestion"

const Quiz = () =>
{
    const [start, setStart] = useState(false)
    const [gameover, setGameover] = useState<boolean>(false)
    const [quiz, setQuiz] = useState<IQuiz|null>(null)
    const { quiz_id } = useParams()
    const navigate = useNavigate()
    const { getQuiz, checkAnswer } = useQuizzes()
    useEffect( () => {
        if (quiz_id === undefined) return
        setQuiz(getQuiz(quiz_id))
    }, [quiz_id])
    const question = getNextQuestion(quiz?.questions)
    
    
    const [answers, setAnswers] = useState([])
    // const [score, setScore] = useState(0)
    

    const handleAnswer = async (option_id: number | string) => 
    {
        const response = await checkAnswer(question?.id, option_id)
        if (response?.status === "success")
        {
            const correct_options = Object.values(response.data)
            setAnswers(prev => ({ ...prev, option_id: correct_options.includes(option_id)}))
        }
    }
    const containerStyle = {
        height: 1, 
        backgroundImage: `url(${bg})`, 
        backgroundRepeat: "no-repeat", 
        backgroundPosition: "center", 
        backgroundSize: { xs: "200%", lg: "100%" }, 
        objectFit: "cover"
    }
    const frameStyle = {
        px: { xs: 0, sm: 3 }, 
        py: 4, 
        height: 1, 
        display: "flex", 
        flexDirection: "column", 
        boxSizing: "border-box",
        color: "white",
    }
    const contentStyle = {
        width: 1, 
        height: 1, 
        py: 6,
        px: { xs: 2, sm: 4, md: 16 },
        boxSizing: "border-box",
        bgcolor: "rgba(255, 255, 255, .1)", 
        backdropFilter: "blur(4px)",
        borderRadius: 1,
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 0 20px 0 rgba(0, 0, 0, .01)",
        
    }
    console.log(answers)
    const COLORS = ["blue", "green", "red", "orange"]
    const Idle: FC<{children: ReactNode}> = ({ children }) => !start && !gameover ? children : null
    const Start: FC<{children: ReactNode}> = ({ children }) => start && quiz !== null ? children : null
    const Gameover: FC<{children: ReactNode}> = ({ children }) => gameover ? children : null
    const handleGameover = () => {
        setStart(false)
        setGameover(true)
    }
    return (
        <Container sx={ containerStyle }>
            <Box sx={ frameStyle }>
                <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                    <Typography color="inherit" variant="h6">
                        Nigma
                    </Typography>
                    <Counter sx={{ mx: "auto" }} start={ start } onGameover={ handleGameover } />
                    <Button variant="contained" color="error" startIcon={<ExitToApp />} onClick={ () => navigate(-1) }>
                        Exit
                    </Button>
                </Box>
                <Box sx={ contentStyle }>
                    <Idle>
                        <Typography variant="h4" align="center" mt="auto" sx={{ fontWeight: "300" }}>
                            { quiz?.title }
                        </Typography>
                        <Typography variant="h6" align="center" mt="auto" sx={{ fontWeight: "300" }}>
                            Time limit: 10:00
                        </Typography>
                        <Button variant="contained" size="large" sx={{ m: "auto" }} onClick={ () => setStart(true) }>Start</Button>
                    </Idle>
                    <Start>
                        <Typography variant="h5" align="center" sx={{ mt: "auto" }}>{ question?.text }</Typography>
                        <Grid container spacing={ 4 } sx={{ mt: "auto" }}>
                            {
                                question?.options?.map((option, index) => 
                                    <Grid item xs={ 12 } sm={ 6 } key={ index }>
                                        <Option 
                                            id={ option.id } 
                                            bgcolor={ COLORS[index] } 
                                            value={ option.text } 
                                            // is_correct={    }
                                            handleAnswer={ () => handleAnswer(option.id) } 
                                        />
                                    </Grid>
                                )
                            }
                        </Grid>
                    </Start>
                    <Gameover>
                        <Typography variant="h2" align="center" sx={{ mb: 4 }}>Game Over!</Typography>
                        <Typography variant="h4" align="center">Score: 500</Typography>
                        <Button variant="contained" color="secondary" sx={{ mt: "auto" }}>Try Again</Button>
                    </Gameover>
                </Box>
            </Box>
        </Container>
    )
}

export default Quiz