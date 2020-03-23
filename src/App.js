import React, { Component, useState } from 'react'
import logo from './logo.svg'
import './App.css'

const Browse = () => {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])

  const handleClick = (api) => (e) => {
    e.preventDefault()

    setLoading(true)
    fetch('/.netlify/functions/' + api)
      .then((response) => response.json())
      .then((json) => {
        setLoading(false)
        setResults(json.results)
      })
      .catch((err) => console.log(err))
  }
  return (
    <React.Fragment>
      <p>
        <button onClick={handleClick('hello')}>
          {loading ? 'Loading...' : 'Get mock prices'}
        </button>
        <br />
      </p>
      <span>
        <ol>
          {results.map((date) => (
            <li>{date}</li>
          ))}
        </ol>
      </span>
    </React.Fragment>
  )
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <Browse />
        </header>
      </div>
    )
  }
}

export default App
