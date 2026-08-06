import './App.css'

import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import { Feed } from './components/Feed'
import { Matches } from './components/Matches/Matches'
import { Footer } from './components/Footer/Footer'
import { Standings } from './components/Standings/Standings'
import { MyTeam } from './components/MyTeam/MyTeam'

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

      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 py-5">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5 items-start">

          <div className="flex flex-col gap-5">
            <Matches league={league} />
            <Feed league={league} searchTeam={searchTerm} />
          </div>

          <aside className="flex flex-col gap-4 sticky top-4">
            <Standings league={league} />
            <MyTeam />
          </aside>

        </div>

      </div>

      <Footer />
    </div>
  )
}

export default App