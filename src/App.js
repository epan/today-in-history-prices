import React, { Component, useState } from 'react'
import logo from './logo.svg'
import './App.css'

const Browse = () => {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState({
    history: {},
    matchedDates: [],
    mostRecentDate: '',
    oldestDate: '',
  })

  const handleClick = (api) => (e) => {
    e.preventDefault()

    setLoading(true)
    fetch('/.netlify/functions/' + api)
      .then((response) => response.json())
      .then((json) => {
        setLoading(false)
        setResults(json)
        console.log(json)
      })
      .catch((err) => console.log(err))
  }
  return (
    <React.Fragment>
      <p>
        {/* <button onClick={handleClick('hello')}>
          {loading ? 'Loading...' : 'Get static prices'}
        </button>
        <br /> */}
        <button onClick={handleClick('history')}>
          {loading ? 'Loading...' : 'Get latest ^DJI historical prices'}
        </button>
        <br />
      </p>

      {results.matchedDates && results.matchedDates.length > 0 && (
        <>
          <p>{`The most recent closing of ^DJI on ${
            results.mostRecentDate
          } was ${results.history[results.mostRecentDate].close} points.`}</p>
          <p>{`The last time since ${results.oldestDate} that ^DJI closed within 100 points of this was:`}</p>
        </>
      )}
      <span>
        <ol>
          {results.matchedDates &&
            results.matchedDates.map((date) =>
              date !== results.mostRecentDate ? (
                <li key={date}>{`${date} @ ${results.history[date].close}`}</li>
              ) : null
            )}
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
          <Browse />
        </header>
      </div>
    )
  }
}

export default App
