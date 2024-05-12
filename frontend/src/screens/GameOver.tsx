import { Box, Button } from "@mui/material"
import LeaderBoard from "./Leaderboard"
import { useQuizzes } from "../contexts/QuizzesContext"

interface IGameOver {
    onReplay: () => void
    quiz_id?: number | string
}

const GameOver = ({ onReplay, quiz_id }: IGameOver) =>
{
    const { resetScore } = useQuizzes()
    const handleReplay = async () => 
    {
        const response = await resetScore(quiz_id)
        if (response?.status === "success")
        onReplay()
    }
    return (
        <>
            <Box sx={{ px: 2 }}>
                <LeaderBoard />
            </Box>
            <Button variant="contained" color="secondary" onClick={ handleReplay } sx={{ mt: "auto", mx: "auto" }}>Play Again</Button>
        </>
    )
}

export default GameOver