// import { useState } from "react";

// interface IProps {
//     name: string;
//     handleTest: (name: string) => void;
//     setList: (v: string[]) => void;
//     list: () => string[];
// }
// const TodoComponent = (props: IProps) => {


//     const { handleTest, list, setList } = props
//     const handleClick = () => {
//         setList([...list, todos])
//         setTodos("");

//     }
//     const [fullName, setFullName] = useState("");

//     const [todos, setTodos] = useState("")
//     return (
//         <div>
//             <input type="text" onChange={(event) => {
//                 setFullName(event.target.value)
//             }}>
//             </input>
//             <button onClick={() => {
//                 handleClick()
//                 handleTest(fullName)
//             }}>Input</button>
//             <ul>
//                 {list.map((it, index) => {
//                     return (
//                         <li key={index}>{it}</li>
//                     )
//                 })}
//             </ul>
//         </div>
//     )
// }


// export default TodoComponent;