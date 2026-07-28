import './App.css'

import { useEffect, useState } from 'react'
import { Header } from './components/Header'

function App() {

  const [league, setLeague] = useState('brasileirao')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if(league === 'brasileirao'){
      document.documentElement.removeAttribute('data-league')
    } else {
      document.documentElement.setAttribute('data-league', league)
    }
  }, [league])


  return (
    <div className="min-h-screen bg-bg-main text-text-main transition-colors duration-300">
      <Header 
      league={league} 
      setLeague={setLeague} 
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      />
    </div>
  )
}

export default App
