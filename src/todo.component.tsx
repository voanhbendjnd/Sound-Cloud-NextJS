
interface IProps {
    name: string;
}

const TodoComponent = (props: IProps) => {
    const { name } = props
    const handleClick = () => {
        alert("hi")
    }
    const todos = ["todo 1", "todo 2", "todo 3", "todo 4"]
    return (
        <div>
            <div>
                {name}
            </div>
            <input type="text" onChange={(event) => {
                console.log(event.target.value)
            }}>
            </input>
            <button onClick={() => {
                handleClick()
            }}>Input</button>
            <ul>
                {todos.map(it => {
                    return (
                        <li>
                            {it}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}


export default TodoComponent;