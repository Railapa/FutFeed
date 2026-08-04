import './App.css'

import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import { Feed } from './components/Feed'
import { Matches } from './components/Matches/Matches'

function App() {

  const [league, setLeague] = useState(() => {
    return localStorage.getItem('league') || 'brasileirao'
  })
  const [searchTerm, setSearchTeam] = useState('')

  useEffect(() => {
    if (league === 'brasileirao') {
      document.documentElement.removeAttribute('data-league')
    } else {
      document.documentElement.setAttribute('data-league', league)
    }

    localStorage.setItem('league', league)
  }, [league])

  return (
    <div className="min-h-screen bg-bg-main text-text-main transition-colors duration-300">
      <Header
        league={league}
        setLeague={setLeague}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTeam}
      />

      <Matches league={league}/>

      <Feed league={league} searchTeam={searchTerm} />
    </div>
  )
}

export default App
