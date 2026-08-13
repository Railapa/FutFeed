import { useState, useEffect } from 'react'

const FOOTBALL_API_KEY = import.meta.env.VITE_FOOTBALL_DATA_API_KEY

const leagueCodes = {
  'Brasileirão Série A': 'BSA',
  'brasileirao': 'BSA',
  'Champions League': 'CL',
  'champions': 'CL',
  'Premier League': 'PL',
  'premier': 'PL',
  'La Liga': 'PD',
  'laliga': 'PD'
}

export const MyTeam = ({ standings = [], league }) => {
  const storageKey = `futfeed_myteam_${league || 'brasileirao'}`

  const [prevLeague, setPrevLeague] = useState(league)
  const [selectedTeamId, setSelectedTeamId] = useState(() => {
    return localStorage.getItem(storageKey) || ''
  })

  if (prevLeague !== league) {
    setPrevLeague(league)
    setSelectedTeamId(localStorage.getItem(storageKey) || '')
  }

  const [matches, setMatches] = useState([])
  const [isLoadingMatches, setIsLoadingMatches] = useState(true)

  const handleTeamChange = (e) => {
    const id = e.target.value
    setSelectedTeamId(id)
    localStorage.setItem(storageKey, id)
  }

  useEffect(() => {
    let ignore = false

    const fetchMatches = async () => {
      setIsLoadingMatches(true)
      const code = leagueCodes[league] || 'BSA'
      
      const fetchUrl = `/api/football/competitions/${code}/matches`

      try {
        const res = await fetch(fetchUrl, {
          headers: { 'X-Auth-Token': FOOTBALL_API_KEY }
        })

        if (!res.ok) throw new Error("Erro na API de partidas")

        const data = await res.json()

        if (!ignore && data.matches) {
          setMatches(data.matches)
        }
      } catch (err) {
        if (!ignore) {
          console.log("Erro ao buscar partidas do Meu Time:", err)
          setMatches([])
        }
      } finally {
        if (!ignore) setIsLoadingMatches(false)
      }
    }

    fetchMatches()

    return () => { ignore = true }
  }, [league])

  const teamData = standings.find(item => String(item.id) === String(selectedTeamId)) || standings[0] || {
    id: null,
    team: 'Selecione',
    pos: '-',
    pts: 0,
    crest: null
  }

  const now = new Date()
  const validStatuses = ['SCHEDULED', 'TIMED', 'IN_PLAY', 'PAUSED']

  const nextMatchData = matches
    .filter(m => {
      const matchDate = new Date(m.utcDate)
      const isFutureOrNow = matchDate >= new Date(now.getTime() - 2 * 3600 * 1000)
      const isValidStatus = validStatuses.includes(m.status)
      return isFutureOrNow && isValidStatus
    })
    .filter(m => String(m.homeTeam.id) === String(teamData.id) || String(m.awayTeam.id) === String(teamData.id))
    .sort((a, b) => new Date(a.utcDate) - new Date(b.utcDate))[0]

  let formattedNextMatch = null

  if (nextMatchData) {
    const dateObj = new Date(nextMatchData.utcDate)
    
    const rawWeekday = dateObj.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '')
    const weekday = rawWeekday.charAt(0).toUpperCase() + rawWeekday.slice(1)
    
    const timeStr = dateObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })

    const homeTeam = nextMatchData.homeTeam.shortName || nextMatchData.homeTeam.name
    const awayTeam = nextMatchData.awayTeam.shortName || nextMatchData.awayTeam.name

    formattedNextMatch = {
      homeTeam,
      homeCrest: nextMatchData.homeTeam.crest,
      awayTeam,
      awayCrest: nextMatchData.awayTeam.crest,
      matchInfo: `${weekday} ${timeStr}`,
      isLive: nextMatchData.status === 'IN_PLAY' || nextMatchData.status === 'PAUSED'
    }
  }

  return (
    <div className="bg-bg-card rounded-2xl ring-1 ring-white/5 p-4 flex flex-col gap-3 shadow-lg">
      <div className="flex items-center justify-between pb-2 border-b border-white/5">
        <h3 className="text-[11px] font-bold tracking-wider text-text-muted uppercase flex items-center gap-1.5">
          <span className="text-yellow-400">★</span> Meu Time
        </h3>
        
        <div className="relative">
          <select
            value={teamData.id || ''}
            onChange={handleTeamChange}
            className="bg-white/5 hover:bg-white/10 text-text-main text-[11px] font-bold py-1.5 pl-3 pr-7 rounded-xl border border-white/10 focus:border-[var(--brand)] focus:ring-1 focus:ring-[var(--brand)] cursor-pointer outline-none transition-all appearance-none max-w-[140px] truncate"
          >
            {standings.map(item => (
              <option key={item.id} value={item.id} className="bg-[#121824] text-text-main py-1">
                {item.team}
              </option>
            ))}
          </select>
          
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-text-muted">
            <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 0l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl ring-1 ring-white/5">
        <div className="flex items-center gap-3">
          {teamData.crest ? (
            <img src={teamData.crest} alt={teamData.team} className="w-9 h-9 object-contain shrink-0" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-[var(--brand)]/20 text-[var(--brand)] flex items-center justify-center font-bold text-xs shrink-0">
              {teamData.team ? teamData.team.substring(0, 3).toUpperCase() : 'FUT'}
            </div>
          )}
          <div>
            <h4 className="text-xs font-bold text-text-main truncate max-w-[140px]">
              {teamData.team || 'Selecione um time'}
            </h4>
            <p className="text-[10px] text-green-400 font-semibold mt-0.5">
              {teamData.pos !== '-' ? `${teamData.pos}º colocado • ${teamData.pts} pts` : 'Buscando dados...'}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 pt-1 border-t border-white/5">
        <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider">
          Próxima Partida
        </span>

        {isLoadingMatches ? (
          <div className="h-10 bg-white/5 animate-pulse rounded-xl"></div>
        ) : formattedNextMatch ? (
          <div className="bg-white/5 p-2.5 rounded-xl flex items-center justify-between ring-1 ring-white/5">
            <div className="flex items-center gap-1.5 min-w-0 flex-1">
              {formattedNextMatch.homeCrest && (
                <img src={formattedNextMatch.homeCrest} alt={formattedNextMatch.homeTeam} className="w-4 h-4 object-contain shrink-0" />
              )}
              <span className="text-[11px] font-bold text-text-main truncate">{formattedNextMatch.homeTeam}</span>
            </div>

            <div className="px-2 py-0.5 rounded bg-black/40 border border-white/10 flex items-center gap-1 shrink-0 mx-1">
              <span className={`w-1.5 h-1.5 rounded-full ${formattedNextMatch.isLive ? 'bg-red-500 animate-pulse' : 'bg-green-400 animate-pulse'}`}></span>
              <span className="text-[10px] font-bold text-[var(--brand)]">
                {formattedNextMatch.isLive ? 'AO VIVO' : formattedNextMatch.matchInfo}
              </span>
            </div>

            <div className="flex items-center justify-end gap-1.5 min-w-0 flex-1 text-right">
              <span className="truncate text-[11px] font-bold text-text-main">{formattedNextMatch.awayTeam}</span>
              {formattedNextMatch.awayCrest && (
                <img src={formattedNextMatch.awayCrest} alt={formattedNextMatch.awayTeam} className="w-4 h-4 object-contain shrink-0" />
              )}
            </div>
          </div>
        ) : (
          <div className="py-2 px-3 text-center bg-white/[0.02] border border-white/5 rounded-xl">
            <p className="text-[10px] text-text-muted font-medium">
              Sem próximas partidas agendadas.
            </p>
          </div>
        )}
      </div>

      <div className="text-[10px] text-text-muted flex justify-between items-center px-1 pt-1">
        <span>Notificações ativadas</span>
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
      </div>
    </div>
  )
}