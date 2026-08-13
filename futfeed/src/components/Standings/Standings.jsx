import { useState, useEffect } from 'react'
import { StandingsModal } from './StandingsModal'

const FOOTBALL_API_KEY = import.meta.env.VITE_FOOTBALL_DATA_API_KEY

const leagueCodes = {
  'Brasileirão Série A': 'BSA',
  'brasileirao': 'BSA',
  'Premier League': 'PL',
  'premier': 'PL',
  'Champions League': 'CL',
  'champions': 'CL',
  'La Liga': 'PD',
  'laliga': 'PD'
}

const fallbacksByLeague = {
  premier: [
    { id: 65, pos: 1, team: 'Man City', pts: 28, j: 10, v: 9, e: 1, d: 0, sg: 18, crest: 'https://crests.football-data.org/65.png' },
    { id: 57, pos: 2, team: 'Arsenal', pts: 25, j: 10, v: 8, e: 1, d: 1, sg: 14, crest: 'https://crests.football-data.org/57.png' },
    { id: 64, pos: 3, team: 'Liverpool', pts: 24, j: 10, v: 7, e: 3, d: 0, sg: 12, crest: 'https://crests.football-data.org/64.png' },
    { id: 61, pos: 4, team: 'Chelsea', pts: 20, j: 10, v: 6, e: 2, d: 2, sg: 8, crest: 'https://crests.football-data.org/61.png' },
    { id: 73, pos: 5, team: 'Tottenham', pts: 18, j: 10, v: 5, e: 3, d: 2, sg: 6, crest: 'https://crests.football-data.org/73.png' }
  ],
  champions: [
    { id: 86, pos: 1, team: 'Real Madrid', pts: 15, j: 5, v: 5, e: 0, d: 0, sg: 10, crest: 'https://crests.football-data.org/86.png' },
    { id: 5, pos: 2, team: 'Bayern', pts: 13, j: 5, v: 4, e: 1, d: 0, sg: 9, crest: 'https://crests.football-data.org/5.png' },
    { id: 65, pos: 3, team: 'Man City', pts: 13, j: 5, v: 4, e: 1, d: 0, sg: 8, crest: 'https://crests.football-data.org/65.png' },
    { id: 521, pos: 4, team: 'PSG', pts: 12, j: 5, v: 4, e: 0, d: 1, sg: 6, crest: 'https://crests.football-data.org/521.png' },
    { id: 505, pos: 5, team: 'Inter', pts: 10, j: 5, v: 3, e: 1, d: 1, sg: 4, crest: 'https://crests.football-data.org/505.png' }
  ],
  laliga: [
    { id: 86, pos: 1, team: 'Real Madrid', pts: 27, j: 10, v: 9, e: 0, d: 1, sg: 16, crest: 'https://crests.football-data.org/86.png' },
    { id: 81, pos: 2, team: 'Barcelona', pts: 24, j: 10, v: 8, e: 0, d: 2, sg: 15, crest: 'https://crests.football-data.org/81.png' },
    { id: 78, pos: 3, team: 'Atlético Madrid', pts: 22, j: 10, v: 7, e: 1, d: 2, sg: 10, crest: 'https://crests.football-data.org/78.png' },
    { id: 90, pos: 4, team: 'Real Betis', pts: 19, j: 10, v: 6, e: 1, d: 3, sg: 5, crest: 'https://crests.football-data.org/90.png' },
    { id: 92, pos: 5, team: 'Real Sociedad', pts: 18, j: 10, v: 5, e: 3, d: 2, sg: 4, crest: 'https://crests.football-data.org/92.png' }
  ],
  brasileirao: [
    { id: 1783, pos: 1, team: 'Flamengo', pts: 28, j: 12, v: 8, e: 4, d: 0, sg: 14, crest: 'https://crests.football-data.org/1783.png' },
    { id: 1769, pos: 2, team: 'Palmeiras', pts: 25, j: 12, v: 7, e: 4, d: 1, sg: 10, crest: 'https://crests.football-data.org/1769.png' },
    { id: 1766, pos: 3, team: 'Atlético-MG', pts: 22, j: 12, v: 6, e: 4, d: 2, sg: 7, crest: 'https://crests.football-data.org/1766.png' },
    { id: 1776, pos: 4, team: 'São Paulo', pts: 21, j: 12, v: 6, e: 3, d: 3, sg: 5, crest: 'https://crests.football-data.org/1776.png' },
    { id: 1770, pos: 5, team: 'Botafogo', pts: 20, j: 12, v: 6, e: 2, d: 4, sg: 4, crest: 'https://crests.football-data.org/1770.png' }
  ]
}

export const Standings = ({ league, setStandings }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [localStandings, setLocalStandings] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let ignore = false

    const fetchStandings = async () => {
      setIsLoading(true)
      const code = leagueCodes[league]
      const currentFallback = fallbacksByLeague[league] || fallbacksByLeague['brasileirao']

      if (!code) {
        if (!ignore) {
          setLocalStandings(currentFallback)
          if (setStandings) setStandings(currentFallback)
          setIsLoading(false)
        }
        return
      }

      const fetchUrl = `/api/football/competitions/${code}/standings`

      try {
        const res = await fetch(fetchUrl, {
          headers: { 'X-Auth-Token': FOOTBALL_API_KEY }
        })

        if (!res.ok) throw new Error("Erro na API de classificação")

        const data = await res.json()

        if (!ignore && data.standings && data.standings[0]) {
          const tableData = data.standings[0].table.map(item => ({
            id: item.team.id,
            pos: item.position,
            team: item.team.shortName || item.team.name,
            pts: item.points,
            j: item.playedGames,
            v: item.won,
            e: item.draw,
            d: item.lost,
            sg: item.goalDifference,
            crest: item.team.crest
          }))

          setLocalStandings(tableData)
          if (setStandings) setStandings(tableData)
          setIsLoading(false)
        } else {
          throw new Error("Dados de classificação indisponíveis")
        }
      } catch (err) {
        if (!ignore) {
          console.log("Usando dados de reserva:", err)
          setLocalStandings(currentFallback)
          if (setStandings) setStandings(currentFallback)
          setIsLoading(false)
        }
      }
    }

    fetchStandings()

    return () => { ignore = true }
  }, [league, setStandings])

  const top5 = localStandings.slice(0, 5)

  return (
    <>
      <div className="bg-bg-card rounded-2xl ring-1 ring-white/5 p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between pb-2 border-b border-white/5">
          <h3 className="text-[11px] font-bold tracking-wider text-text-muted uppercase">
            Classificação
          </h3>
          <span className="text-[9px] bg-white/5 text-text-muted px-2 py-0.5 rounded font-medium truncate max-w-[100px]">
            {league || 'Série A'}
          </span>
        </div>

        {isLoading ? (
          <div className="flex flex-col gap-2 animate-pulse py-2">
            {[1, 2, 3, 4, 5].map(n => (
              <div key={n} className="h-5 bg-white/5 rounded w-full"></div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-[9px] font-bold text-text-muted uppercase px-1">
              <span className="w-4 text-center">#</span>
              <span className="flex-1 ml-2">Time</span>
              <span className="w-6 text-center">Pts</span>
            </div>

            <div className="flex flex-col gap-1.5">
              {top5.map((item) => (
                <div
                  key={item.pos}
                  className="flex items-center justify-between text-xs p-1 rounded hover:bg-white/5 transition-colors"
                >
                  <span className={`w-4 text-center font-bold text-[10px] ${item.pos <= 4 ? 'text-blue-400' : 'text-text-muted'}`}>
                    {item.pos}
                  </span>
                  
                  <div className="flex items-center gap-2 flex-1 ml-2 overflow-hidden">
                    {item.crest && (
                      <img src={item.crest} alt={item.team} className="w-3.5 h-3.5 object-contain shrink-0" />
                    )}
                    <span className="font-semibold text-text-main text-[11px] truncate">
                      {item.team}
                    </span>
                  </div>

                  <span className="w-6 text-center font-bold text-text-main text-[11px]">
                    {item.pts}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => setIsModalOpen(true)}
          className="text-[11px] font-bold text-[var(--brand)] hover:underline text-left mt-1 cursor-pointer"
        >
          Ver tabela completa &gt;
        </button>
      </div>

      <StandingsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        league={league}
        standings={localStandings}
      />
    </>
  )
}