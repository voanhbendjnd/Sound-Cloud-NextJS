import TodoComponent from './todo.component'

function App() {
  const name = "Ben Tenysin"
  return (
    <div>
      <TodoComponent
        name={name}
      />
    </div>
  )
}

export default App
