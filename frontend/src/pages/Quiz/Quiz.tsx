import { ExitToApp } from "@mui/icons-material"
import { Box, Button, Container, Typography } from "@mui/material"
import bg from "../../assets/burst.svg"
import { useNavigate, useParams } from "react-router-dom"
import Counter from "../../components/Counter/Counter"
import Idle from "../../screens/Idle"
import Play from "../../screens/Play"
import { useEffect, useState } from "react"
import { useQuizzes } from "../../contexts/QuizzesContext"
import GameOver from "../../screens/GameOver"

const Quiz = () =>
{
    const navigate = useNavigate()
    const [start, setStart] = useState<boolean>(false)
    const [gameOver, setGameOver] = useState<boolean>(false)
    const [quiz, setQuiz] = useState<IQuiz|null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const { getQuiz } = useQuizzes()
    const { quiz_id } = useParams()

    useEffect( () => {
        if (quiz_id) setQuiz(getQuiz(quiz_id))
        if (quiz) setIsLoading(false)
    }, [quiz_id, getQuiz, quiz])

    const handleStart = () =>
    {
        setStart(true)
    }

    const handleGameOver = () =>
    {
        setGameOver(true)
    }

    const handleReplay = () =>
    {
        setStart(false)
        setGameOver(false)
    }
    
    const containerStyle = {
        height: 1, 
        backgroundImage: `url(${bg})`, 
        backgroundRepeat: "no-repeat", 
        backgroundPosition: "center", 
        backgroundSize: { xs: "200%", lg: "100%" }, 
        objectFit: "cover",
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
    return (
        <Container sx={ containerStyle }>
            <Box sx={ frameStyle }>
                <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                    <Typography color="inherit" variant="h6">
                        Nigma
                    </Typography>
                    <Counter sx={{ mx: "auto" }} />
                    <Button variant="contained" color="error" startIcon={<ExitToApp />} onClick={ () => navigate(-1) }>
                        Exit
                    </Button>
                </Box>
                <Box sx={ contentStyle }>
                    {
                        start
                        ? gameOver ? <GameOver onReplay={ handleReplay } /> : <Play questions={ quiz?.questions } onGameOver={ handleGameOver }/>
                        : <Idle is_loading={ isLoading } handleStart={ handleStart } title={ quiz?.title } />
                    }
                </Box>
            </Box>
        </Container>
    )
}

export default Quiz