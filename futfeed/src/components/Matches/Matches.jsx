import { useState, useEffect } from 'react'

const FOOTBALL_API_KEY = import.meta.env.VITE_FOOTBALL_DATA_API_KEY

const leagueCodes = {
  'Brasileirão Série A': 'BSA',
  'Champions League': 'CL',
  'Premier League': 'PL',
  'La Liga': 'PD'
}

export const Matches = ({ league }) => {
  const [matches, setMatches] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let ignore = false

    const isToday = (dateString) => {
      const matchDate = new Date(dateString)
      const today = new Date()
      return (
        matchDate.getDate() === today.getDate() &&
        matchDate.getMonth() === today.getMonth() &&
        matchDate.getFullYear() === today.getFullYear()
      )
    }

    const fetchMatches = async () => {
      setIsLoading(true)
      const code = leagueCodes[league] || 'BSA'
      const targetUrl = `https://api.football-data.org/v4/competitions/${code}/matches`
      const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`

      try {
        const res = await fetch(proxyUrl, {
          headers: { 'X-Auth-Token': FOOTBALL_API_KEY }
        })

        if (!res.ok) throw new Error("Erro na API")

        const data = await res.json()

        if (!ignore && data.matches) {
          const matchesToday = data.matches.filter(m => isToday(m.utcDate))

          const formattedMatches = matchesToday.map(m => {
            let statusText = 'EM BREVE'
            if (m.status === 'FINISHED') statusText = 'FINALIZADO'
            if (m.status === 'IN_PLAY' || m.status === 'PAUSED') statusText = 'AO VIVO'

            const dateObj = new Date(m.utcDate)
            const formattedTime = dateObj.toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit'
            })

            return {
              id: m.id,
              status: statusText,
              matchTime: formattedTime,
              homeTeam: m.homeTeam.shortName || m.homeTeam.name,
              homeCrest: m.homeTeam.crest,
              homeScore: m.score.fullTime.home,
              awayTeam: m.awayTeam.shortName || m.awayTeam.name,
              awayCrest: m.awayTeam.crest,
              awayScore: m.score.fullTime.away,
              league: league
            }
          })

          setMatches(formattedMatches)
          setIsLoading(false)
        }
      } catch (err) {
        if (!ignore) {
          console.log("Sem partidas para hoje ou erro na busca:", err)
          setMatches([])
          setIsLoading(false)
        }
      }
    }

    fetchMatches()

    return () => {
      ignore = true
    }
  }, [league])

  return (
    <div className="bg-bg-card rounded-2xl ring-1 ring-white/5 p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between pb-2 border-b border-white/5">
        <h3 className="text-[11px] font-bold tracking-wider text-text-muted uppercase">
          Partidas de Hoje
        </h3>
        <span className="text-[9px] bg-white/5 text-text-muted px-2 py-0.5 rounded font-medium truncate max-w-[120px]">
          {league || 'Série A'}
        </span>
      </div>

      {isLoading ? (
        <div className="flex gap-3 overflow-x-auto scrollbar-none pb-1 animate-pulse">
          {[1, 2].map(n => (
            <div key={n} className="w-[220px] sm:w-[240px] shrink-0 h-20 bg-white/5 rounded-xl"></div>
          ))}
        </div>
      ) : matches.length === 0 ? (
        <div className="py-4 text-center bg-white/[0.02] border border-white/5 rounded-xl">
          <p className="text-xs text-text-muted font-medium">
            Nenhuma partida agendada para hoje nesta competição.
          </p>
        </div>
      ) : (
        <div className="flex gap-3 overflow-x-auto scrollbar-none pb-1">
          {matches.map(m => (
            <div
              key={m.id}
              className="bg-white/5 p-3 rounded-xl flex flex-col justify-between w-[220px] sm:w-[240px] shrink-0 ring-1 ring-white/5 hover:ring-[var(--brand)]/30 transition-all"
            >
              <div className="flex justify-between items-center text-[9px] mb-2">
                <span className="text-text-muted uppercase font-semibold truncate max-w-[100px]">{m.league}</span>
                <span className={`px-1.5 py-0.5 rounded font-extrabold shrink-0 ${
                  m.status === 'AO VIVO' 
                    ? 'bg-red-500/20 text-red-400 animate-pulse' 
                    : 'bg-white/10 text-text-muted'
                }`}>
                  {m.status}
                </span>
              </div>

              <div className="flex justify-between items-center text-xs font-bold text-text-main gap-1">
                <div className="flex items-center gap-1.5 min-w-0 flex-1">
                  {m.homeCrest && (
                    <img src={m.homeCrest} alt={m.homeTeam} className="w-4 h-4 object-contain shrink-0" />
                  )}
                  <span className="truncate">{m.homeTeam}</span>
                </div>

                {m.status === 'EM BREVE' ? (
                  <span className="text-xs font-extrabold text-[var(--brand)] px-2 whitespace-nowrap shrink-0">
                    {m.matchTime}
                  </span>
                ) : (
                  <span className="text-sm font-extrabold text-[var(--brand)] px-1 shrink-0 whitespace-nowrap">
                    {`${m.homeScore ?? 0} - ${m.awayScore ?? 0}`}
                  </span>
                )}

                <div className="flex items-center justify-end gap-1.5 min-w-0 flex-1 text-right">
                  <span className="truncate">{m.awayTeam}</span>
                  {m.awayCrest && (
                    <img src={m.awayCrest} alt={m.awayTeam} className="w-4 h-4 object-contain shrink-0" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}