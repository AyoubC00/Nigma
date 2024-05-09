import { Box, Button } from "@mui/material"
import LeaderBoard from "./Leaderboard"

interface IGameOver {
    onReplay: () => void
}

const GameOver = ({ onReplay }: IGameOver) =>
{
    return (
        <>
            <Box sx={{ px: 2 }}>
                <LeaderBoard />
            </Box>
            <Button variant="contained" color="secondary" onClick={ onReplay } sx={{ mt: "auto", mx: "auto" }}>Play Again</Button>
        </>
    )
}

export default GameOver