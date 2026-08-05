import './App.css'

import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import { Feed } from './components/Feed'
import { Matches } from './components/Matches/Matches'
import { Footer } from './components/Footer/Footer'
import { Standings } from './components/Standings/Standings'

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

      <Matches league={league} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Feed league={league} searchTeam={searchTerm} />
        </div>

        <aside className="lg:col-span-1 flex flex-col gap-4">
           <Standings league={league} /> 
        </aside>
      </div>

      <Footer />
    </div>
  )
}

export default App
