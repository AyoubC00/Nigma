export default (() => 
{
    let current = 0
    return (questions?: IQuestion[]) => questions?.[current + 1]
})()