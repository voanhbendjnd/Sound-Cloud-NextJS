import { useState } from 'react';
import TodoComponent from './todo.component'

function App() {
  const name = "Ben Tenysin"
  const handleTest = (name: string) => {
    alert(`My name is ${name}`);
  }
  const [list, setList] = useState(["todo 4", "todo 2", "todo 3", "todo 4"])
  return (
    <div>
      <TodoComponent
        handleTest={handleTest}
        name={name}
        list={list}
        setList={setList}
      />
    </div>
  )
}

export default App
