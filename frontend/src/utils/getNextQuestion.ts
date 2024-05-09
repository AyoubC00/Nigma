export default (questions: IQuestion[]) => {
    let current = - 1
    return () => {
        current += 1
        return questions[current] || null
    }
}