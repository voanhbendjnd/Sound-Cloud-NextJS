
interface IProps {
    name: string;
}

const TodoComponent = (props: IProps) => {
    const { name } = props
    return (
        <div>
            <div>
                {name}

            </div>
            <input>
            </input>
            <button>Input</button>
        </div>
    )
}


export default TodoComponent;