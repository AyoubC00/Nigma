import { createContext, useContext, useEffect, useState } from "react";
import API from "../api";


const QuizzesContext = createContext<IQuizzesContext>({ 
    quizzes: [],
    quiz: null,
    state: "show",
    getQuestions: () => null ,
    getQuiz: () => null,
    setState: () => {},
    setQuiz: () => null,
    save: () => null,
    get: () => null,
    checkAnswer: () => null
})

export const QuizzesContextProvider: React.FC<{children: React.ReactNode}> = ({ children }) =>
{
    const [state, setState] = useState<State>("show")
    const [quiz, setQuiz] = useState<IQuiz | null>(null)
    const [quizzes, setQuizzes] = useState<IQuiz[]>([])
    useEffect( () => {
        ( async () => {
            const response = await API.get("quiz")
            setQuizzes(response.data.data)
        })()
    }, [])
    const save = async (quiz: FormData) => {
        try
        {
            const response = await API.post(
                "quiz", 
                quiz, 
                { 
                    headers: { "Content-Type": "multipart/form-data" } 
                }
            )
            return response.data
        }
        catch (error)
        {
            return error
        }
    }
    const get = async (quiz_id: string | number) => {
        try
        {
            const response = await API.get(`quiz/${ quiz_id }`)
            return response.data
        }
        catch (error)
        {
            return error
        }
    }
    const getQuiz = (quiz_id: number | string) =>
    {
        return quizzes.filter((quiz: IQuiz) => quiz.id == quiz_id).pop() || null
    }
    const getQuestions = (quiz_id: number | string)  =>
    {
        const quiz = getQuiz(quiz_id)
        return quiz?.questions || null
    }
    const checkAnswer = async (option_id?: number | string) =>
    {
        try
        {
            const response = await API.get(`answer/${option_id}`)
            return response.data
        }
        catch (error)
        {
            return error
        }
    }
    
    return(
        <QuizzesContext.Provider value={{ state, setState, quizzes, getQuiz, getQuestions, setQuiz, quiz, save, get, checkAnswer } }>
            { children }
        </QuizzesContext.Provider>
    )
}

export const useQuizzes = () => useContext(QuizzesContext)