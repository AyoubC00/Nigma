interface IOption {
    id: number | string
    text: string
    is_correct: boolean
}

interface IQuestion {
    id?: number | string
    text: string
    options: IOption[]
}

interface IQuiz {
    id?: string | number
    title?: string
    questions: IQuestion[]
}

interface ICredentials {
    username: string
    password: string
    remember_me: boolean
}

interface IUser {

}

interface ILogin {
    username?: string[]
    password?: string[]
}

interface IRegister extends Partial<IUserData> {}

type ApiResponse<T> = 
    | { status: "success", data: T }
    | { status: "failure", messages: T}

interface IError<T> {
    messages: T
}


interface IUserData {
    first_name: string
    last_name: string
    username: string
    email: string
    password: string
    password_confirmation: string
}

interface QuizCard {
    id: number
    title: string
    image: string
    category: string
}

type Option = {
    id: number
    text: string
    is_is_correct: boolean
}

interface IQuestionElement {
    id: number
    text: string
    options: Option[]
    selectable?: boolean
    editable?: boolean
    order?: number
}

type Question = {
    id: number
    text: string
    options: Option[]
}

type MenuAction = () => void 

type Quiz = {
    id: number
    title: string
    category: string
    image: string
    questions: IQuestion[]
}

type State = "show" | "edit" | "create" 
type Answer = {
    status: "success"
    is_correct: boolean
}
interface IQuizzesContext {
    quizzes: IQuiz[]
    quiz: IQuiz | null,
    state: State
    getQuestions: (quiz_id: number | string) => IQuestion[] | null
    getQuiz: (quiz_id: number | string) => IQuiz | null
    setState: (state: State) => void
    setQuiz: (quiz:IQuiz) => void | null
    save: (quiz: FormData) => Promise<ApiResponse<IQuiz>> | null
    get: (quiz_id: string | number) => Promise<ApiResponse<IQuiz>> | null
    checkAnswer: (question_id?: number | string, option_id?: number | string) => Promise<ApiResponse<Answer>> | null
}

// type UpdateState<T> = (prev: T[]) => T[] | Partial<T>



interface Options {
    [name: string]: {
        text: string
        is_correct: boolean
    }
}

interface IOptionField {
    checked?: boolean
    onCheck?: (target?: string) => void
}

interface IMobileNav {
    onClick: (event: React.MouseEvent) => void
}

interface NavLink {
    name: string;
    to: string;
}

type Tier = {
    title: string
    price: string
    benifits: string[]
    color: string
}

interface ITiers {
    free: Tier
    paid: Tier
}


interface IContact {
    first_name: string
    last_name: string
    email: string
    topic: string
    message: string
}