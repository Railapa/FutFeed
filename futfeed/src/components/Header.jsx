export const Header = ({ league, setLeague, searchTerm, setSearchTerm }) => {

    const leagues = [
        {id: 'brasileirao', label:'Brasileirão Serie A'},
        {id: 'premier', label:'Premier League'},
        {id: 'champions', label:'Champions League'},
        {id: 'laliga', label:'La Liga'},
        {id: 'libertadores', label:'Libertadores'},
        {id: 'brasileiraoB', label:'Brasileirão Serie B'},
    ]

  return (
    <header className="bg-bg-card border-b border-text-muted/10 p-4 flex items-center justify-between">
        <h1 className="text-brand text-xl font-bold">FutFeed</h1>

        <input 
        type="text"
        className="bg-bg-main text-text-main rounded-lg p-2 text-sm w-3/12"
        placeholder="Buscar times, notícias..."
        onChange={e => setSearchTerm(e.target.value)}
        value={searchTerm}
         />

         <select value={league} onChange={e => setLeague(e.target.value)} className="w-2/12 bg-bg-main text-sm p-2 rounded-lg">
            {leagues.map((item) => (
                <option key={item.id} value={item.id}>
                    {item.label}
                </option>
            ))}
         </select>
    </header>
  )
}
