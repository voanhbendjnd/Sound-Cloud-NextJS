import TodoComponent from './todo.component'

function App() {
  const name = "Ben Tenysin"
  const handleTest = (name: string) => {
    alert(`My name is ${name}`);
  }
  return (
    <div>
      <TodoComponent
        handleTest={handleTest}
        name={name}
      />
    </div>
  )
}

export default App
