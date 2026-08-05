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
    <header className="bg-bg-card  border-text-muted/10 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        
        <div className="flex items-center justify-between sm:contents">
          <h1 className="text-brand text-xl font-bold">FUT <b className="text-green-500">FEED</b></h1>

          <select 
            value={league} 
            onChange={e => setLeague(e.target.value)} 
            className="bg-bg-main text-sm p-2 rounded-lg w-auto sm:w-48 text-text-main border border-text-muted/10 sm:order-last"
          >
            {leagues.map((item) => (
                <option key={item.id} value={item.id}>
                    {item.label}
                </option>
            ))}
          </select>
        </div>

        <input 
          type="text"
          className="bg-bg-main text-text-main rounded-lg p-2 text-sm w-full sm:max-w-md border border-text-muted/10"
          placeholder="Buscar times, notícias..."
          onChange={e => setSearchTerm(e.target.value)}
          value={searchTerm}
        />

    </header>
  )
}