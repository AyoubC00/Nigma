import { Grid, Typography } from "@mui/material"
import Option from "../components/Option/Option"
import useQuestions from "../hooks/useQuestions"
import { useEffect } from "react"

interface IPlay {
    questions?: IQuestion[]
    onGameOver: () => void
}
const colors = ["blue", "green", "red", "orange"]

const Play = ({ questions, onGameOver }: IPlay) =>
{
    const [question, setQuestion, over] = useQuestions(questions || null)
    // const [gameOver, setGameOver] = useState(false)
    const handleClick = () =>
    {
        setQuestion()
    }

    useEffect( () => {
        if (over) onGameOver()
    }, [over])

    return (
        // gameOver
        // ? <Gameover />
        // : <>
        <>
            <Typography sx={{ mt: 4, mx: "auto" }}>{ question?.text }</Typography>
            <Grid container spacing={2} sx={{ mt: "auto" }}>
                {
                    [1,2,3,4].map((option, index) => 
                        <Grid item xs={ 12 } sm={ 6 } key={ index }>
                            <Option 
                                id={ index }
                                handleAnswer={ handleClick }
                                bgcolor={ colors[index] }
                                value={ `${option}` }
                            />
                        </Grid>
                    )
                }
            </Grid>
        </>
    )
}

export default Play