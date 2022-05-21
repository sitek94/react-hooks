// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStorageState(key, initialState) {
  const [state, setState] = React.useState(
    () => {
      try {
        const stateJson = window.localStorage.getItem(key)
        return JSON.parse(stateJson)
      } catch {
        return initialState
      }
    }
  )

  React.useEffect(() => {
    const stateJson = JSON.stringify(state)
    window.localStorage.setItem(key, stateJson)
  }, [key, state]);

  return [state, setState]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState('name', initialName)

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
