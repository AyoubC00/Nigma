import { useState } from "react"

type IUseQuestions = [
    IQuestion | null,
    () => void,
    boolean | null
]

export default (questions: IQuestion[] | null): IUseQuestions => {
    const [position, setPosition] = useState(0)
    const question = questions?.[position] || null
    const over = questions && position >= questions.length
    const next = () => setPosition(prev => prev + 1)
    return [question, next, over]
}