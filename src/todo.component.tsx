import { useState } from "react";

interface IProps {
    name: string;
}
let cnt = 1;
const TodoComponent = (props: IProps) => {
    const { name } = props
    const [fullName, setFullName] = useState("");
    const handleClick = () => {
        setList([...list, todos])

    }
    const [list, setList] = useState(["todo 4", "todo 2", "todo 3", "todo 4"])
    const increase = () => {
        cnt = cnt + 1;

    }
    const todos = ["todo 1", "todo 2", "todo 3", "todo 4"]
    return (
        <div>
            <button onClick={() => {
                increase()
            }}>Increase</button>
            <div>{cnt}</div>
            <div>{fullName}</div>
            <div>
                {name}
            </div>
            <input value={todos} type="text" onChange={(event) => {
                setFullName(event.target.value)
            }}>
            </input>
            <button onClick={() => {
                handleClick()
            }}>Input</button>
            <ul>
                {list.map((it, index) => {
                    return (
                        <li key={index}>{it}</li>
                    )
                })}
            </ul>
            <span>{cnt}</span>
        </div>
    )
}


export default TodoComponent;