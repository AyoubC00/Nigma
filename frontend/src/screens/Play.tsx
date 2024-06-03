import { Button, Grid, Typography } from "@mui/material"
import Option from "../components/Option/Option"
import useQuestions from "../hooks/useQuestions"
import { useEffect, useState } from "react"
import Counter from "../components/Counter/Counter"
import { ChevronRight } from "@mui/icons-material"
import { useQuizzes } from "../contexts/QuizzesContext"

interface IPlay {
    questions?: IQuestion[]
    onGameOver: () => void
}

type IAnswer = {
    [id: number|string]: boolean
}

const colors = ["blue", "green", "red", "orange"]

const Play = ({ questions, onGameOver }: IPlay) =>
{
    const [question, setQuestion, over] = useQuestions(questions || null)
    const [countDown, setCountDown] = useState(false)
    const [time, setTime] = useState<Time|null>(null)
    const [pause, setPause] = useState<boolean|null>(null)
    const [processing, setProcessing] = useState<boolean>(true)
    const [answers, setAnswers] = useState<IAnswer>()
    const { checkAnswer } = useQuizzes()
    
    const handleAnswer = async (option_id: number | string) =>
    {
        if (pause) return
        setCountDown(false)
        setPause(true)
        setProcessing(true)
        const response = await checkAnswer(question?.id, option_id)
        setProcessing(false)
        if (response?.status === "success")
        {
            setAnswers(response.data)
        }
    }
    
    useEffect( () => {
        setCountDown(true)
        setTime({ seconds: 4, minutes: 0 })
    }, [question])

    useEffect( () => {
        if (pause === false) setQuestion()
    }, [pause])

    const handleTimeout = () =>
    {
        handleAnswer('')
        setPause(true)
    }

    useEffect( () => {
        if (over) onGameOver()
    }, [over])

    return (
        <>
            <Counter sx={{ mx: "auto", translate: "0 -50%" }} time={ time } start={ countDown } onTimeout={ handleTimeout }/>
            <Typography sx={{ mt: 4, mx: "auto" }}>{ question?.text }</Typography>
            { pause && !processing ? <Button variant="contained" color="error" sx={{ mt: "auto", mx: "auto" }} onClick={ () => setPause(false) }>Continue<ChevronRight /></Button> : null }
            <Grid container spacing={2} sx={{ mt: "auto" }}>
                {
                    question?.options.map((option, index) => 
                        <Grid item xs={ 12 } sm={ 6 } key={ index }>
                            <Option 
                                id={ option.id }
                                handleAnswer={ handleAnswer }
                                bgcolor={ colors[index] }
                                is_correct={ answers?.[option.id] }
                                value={ `${ option.text }` }
                            />
                        </Grid>
                    )
                }
            </Grid>
        </>
    )
}

export default Play