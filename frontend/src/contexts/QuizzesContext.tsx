import { createContext, useContext, useEffect, useState } from "react";
import API from "../api";
import { useAuth } from "./AuthContext";


const QuizzesContext = createContext<IQuizzesContext>({ 
    quizzes: [],
    userQuizzes: null,
    attempts: null,
    quiz: null,
    state: "show",
    getQuestions: () => null ,
    getQuiz: () => null,
    setState: () => {},
    setQuiz: () => null,
    save: () => null,
    get: () => null,
    saveAttempt: () => null,
    checkAnswer: () => null,
    resetScore: () => null,
})

export const QuizzesContextProvider: React.FC<{children: React.ReactNode}> = ({ children }) =>
{
    const [state, setState] = useState<State>("show")
    const [quiz, setQuiz] = useState<IQuiz | null>(null)
    const [quizzes, setQuizzes] = useState<IQuiz[]>([])
    const [userQuizzes, setUserQuizzes] = useState<IQuiz[]|null>(null)
    const [attempts, setAttempts] = useState<IAttempt[]|null>(null)
    const { token } = useAuth()
    useEffect( () => {
        ( async () => {
            if (!token)
            {
                const response = await API.get("quiz/popular")
                setQuizzes(response.data.data)
            }
            else
            {
                const quizResponse = await getQuizzes()
                if (quizResponse?.status === "success")
                {
                    setQuizzes(quizResponse.data)
                }
                const userQuizResponse = await getUserQuizzes()
                if (userQuizResponse?.status === "success")
                {
                    setUserQuizzes(userQuizResponse.data)
                }
                const attemptsResponse = await getAttempts()
                if (attemptsResponse?.status === "success")
                {
                    setAttempts(attemptsResponse.data)
                }
            }
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
    const saveAttempt = async (quiz_id: number | string) =>
    {
        try
        {
            const response = await API.post(`attempt/${ quiz_id }`)
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
    const checkAnswer = async (question_id?: number | string, option_id?: number | string) =>
    {
        try
        {
            const response = await API.post(`answer/${question_id}`, { option_id })
            return response.data
        }
        catch (error)
        {
            return error
        }
    }
    const resetScore = async (quiz_id?: number | string) =>
    {
        try
        {
            const response = await API.post(`attempt/${quiz_id}/reset`)
            return response.data
        }
        catch (error)
        {
            return error
        }
    }
    const getAttempts = async () =>
    {
        try
        {
            const response = await API.get('attempt')
            return response.data
        }
        catch (error)
        {
            return error
        }
    }
    const getQuizzes = async () =>
    {
        try
        {
            const response = await API.get("quiz")
            return response.data
        }
        catch (error)
        {
            return error
        }
    }
    const getUserQuizzes = async () =>
    {
        try
        {
            const response = await API.get("quiz/proprietary")
            return response.data
        }
        catch (error)
        {
            return error
        }
    }
    
    return(
        <QuizzesContext.Provider value={{ state, setState, quizzes, userQuizzes, getQuiz, getQuestions, setQuiz, quiz, save, get, checkAnswer, saveAttempt, resetScore, attempts } }>
            { children }
        </QuizzesContext.Provider>
    )
}

export const useQuizzes = () => useContext(QuizzesContext)