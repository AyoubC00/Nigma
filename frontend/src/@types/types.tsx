interface IUser {
    id: number | string
    username: string
    first_name: string
    last_name: string
    email: string
}

type Errors = {
    [name: string]: string
}

type Time = { 
    seconds: number
    minutes: number 
}

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
type Quiz = {
    id?: string | number
    title?: string
    taken?: boolean
    image?: string
    category?: string
    questions?: IQuestion[]
}
interface IQuiz {
    id: string | number
    title: string
    taken: boolean
    image: string
    owner: IUser
    category: string
    questions: IQuestion[]
}
interface QuizCard {
    id: number | string
    owner: IUser
    title: string
    taken?: boolean
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


type State = "show" | "edit" | "create" 
type Answer = {
    [id: string|number]: boolean
}

interface IAttempt {
    id: number | string
    quiz_id: number | string
    title: string
    score: number
    since: string
    mode: "Solo" | "Multiplayer"
}

type Attempt = 
    | { status: "success" | "failure", message: string }
    | { status: "success" | "failure", data: string }

interface IQuizzesContext {
    quizzes: IQuiz[]
    userQuizzes: IQuiz[] | null
    attempts: IAttempt[] | null
    quiz: IQuiz | null
    state: State
    getQuestions: (quiz_id: number | string) => IQuestion[] | null
    getQuiz: (quiz_id: number | string) => IQuiz | null
    setState: (state: State) => void
    setQuiz: (quiz:IQuiz) => void | null
    get: (quiz_id: string | number) => Promise<ApiResponse<IQuiz>> | null
    save: (quiz: FormData) => Promise<ApiResponse<IQuiz>> | null
    update: (quiz: FormData, quiz_id: number | string) => Promise<ApiResponse<IQuiz>> | null
    destroy: (quiz_id: string | number) => Promise<ApiResponse<IQuiz>> | null
    saveAttempt: (quiz_id: number | string) => Promise<ApiResponse<Attempt>> | null
    checkAnswer: (question_id?: number | string, option_id?: number | string) => Promise<ApiResponse<Answer>> | null
    resetScore: (quiz_id?: number | string) => Promise<ApiResponse<Attempt>> | null
    getUserQuizzes: () => Promise<ApiResponse<IQuiz[]>> | null
}

// type UpdateState<T> = (prev: T[]) => T[] | Partial<T>

interface Options {
    [name: string]: {
        id: number | string
        text: string
        is_correct: boolean
    }
}

interface IOptionField {
    checked?: boolean
    helperText?: string
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