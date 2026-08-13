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
  brasileirao: [
    { id: 1769, pos: 1, team: 'Palmeiras', pts: 48, j: 20, v: 14, e: 6, d: 2, sg: 22, crest: 'https://crests.football-data.org/1769.png' },
    { id: 1783, pos: 2, team: 'Flamengo', pts: 42, j: 21, v: 12, e: 6, d: 3, sg: 21, crest: 'https://crests.football-data.org/1783.png' },
    { id: 1764, pos: 3, team: 'Paranaense', pts: 40, j: 22, v: 12, e: 4, d: 6, sg: 11, crest: 'https://crests.football-data.org/1764.png' },
    { id: 1765, pos: 4, team: 'Fluminense', pts: 35, j: 22, v: 9, e: 8, d: 5, sg: 5, crest: 'https://crests.football-data.org/1765.png' },
    { id: 1780, pos: 5, team: 'Cruzeiro', pts: 33, j: 22, v: 9, e: 6, d: 7, sg: 5, crest: 'https://crests.football-data.org/1780.png' },
    { id: 1777, pos: 6, team: 'Bahia', pts: 33, j: 22, v: 9, e: 6, d: 7, sg: 4, crest: 'https://crests.football-data.org/1777.png' },
    { id: 1771, pos: 7, team: 'Corinthians', pts: 32, j: 22, v: 8, e: 8, d: 6, sg: 4, crest: 'https://crests.football-data.org/1771.png' },
    { id: 1775, pos: 8, team: 'Bragantino', pts: 31, j: 21, v: 8, e: 7, d: 6, sg: 2, crest: 'https://crests.football-data.org/1775.png' },
    { id: 1770, pos: 9, team: 'Botafogo', pts: 30, j: 22, v: 8, e: 6, d: 8, sg: 2, crest: 'https://crests.football-data.org/1770.png' },
    { id: 1772, pos: 10, team: 'Coritiba', pts: 26, j: 22, v: 8, e: 2, d: 12, sg: -2, crest: 'https://crests.football-data.org/1772.png' },
    { id: 1766, pos: 11, team: 'Mineiro', pts: 26, j: 21, v: 6, e: 8, d: 7, sg: -2, crest: 'https://crests.football-data.org/1766.png' },
    { id: 1776, pos: 12, team: 'São Paulo', pts: 26, j: 21, v: 7, e: 5, d: 9, sg: -1, crest: 'https://crests.football-data.org/1776.png' },
    { id: 1774, pos: 13, team: 'Vitória', pts: 26, j: 22, v: 7, e: 5, d: 10, sg: -11, crest: 'https://crests.football-data.org/1774.png' },
    { id: 1767, pos: 14, team: 'Grêmio', pts: 25, j: 21, v: 6, e: 7, d: 8, sg: -3, crest: 'https://crests.football-data.org/1767.png' },
    { id: 1785, pos: 15, team: 'Mirassol', pts: 23, j: 21, v: 6, e: 5, d: 10, sg: -6, crest: 'https://crests.football-data.org/1785.png' },
    { id: 1782, pos: 16, team: 'Internacional', pts: 23, j: 22, v: 5, e: 8, d: 9, sg: -8, crest: 'https://crests.football-data.org/1782.png' },
    { id: 1773, pos: 17, team: 'Santos', pts: 22, j: 22, v: 5, e: 7, d: 10, sg: -8, crest: 'https://crests.football-data.org/1773.png' },
    { id: 1779, pos: 18, team: 'Vasco da Gama', pts: 22, j: 21, v: 5, e: 7, d: 9, sg: -8, crest: 'https://crests.football-data.org/1779.png' },
    { id: 1778, pos: 19, team: 'Clube do Remo', pts: 22, j: 22, v: 5, e: 7, d: 10, sg: -10, crest: 'https://crests.football-data.org/1778.png' },
    { id: 1781, pos: 20, team: 'Chapecoense', pts: 18, j: 21, v: 1, e: 7, d: 13, sg: -23, crest: 'https://crests.football-data.org/1781.png' }
  ],
  champions: [
    { id: 57, pos: 1, team: 'Arsenal', pts: 24, j: 8, v: 8, e: 0, d: 0, sg: 19, crest: 'https://crests.football-data.org/57.png' },
    { id: 5, pos: 2, team: 'Bayern', pts: 21, j: 8, v: 7, e: 0, d: 1, sg: 14, crest: 'https://crests.football-data.org/5.png' },
    { id: 64, pos: 3, team: 'Liverpool', pts: 18, j: 8, v: 6, e: 0, d: 2, sg: 12, crest: 'https://crests.football-data.org/64.png' },
    { id: 73, pos: 4, team: 'Tottenham', pts: 17, j: 8, v: 5, e: 2, d: 1, sg: 10, crest: 'https://crests.football-data.org/73.png' },
    { id: 81, pos: 5, team: 'Barça', pts: 16, j: 8, v: 5, e: 1, d: 2, sg: 7, crest: 'https://crests.football-data.org/81.png' }
  ],
  premier: [
    { id: 57, pos: 1, team: 'Arsenal', pts: 85, j: 38, v: 26, e: 7, d: 5, sg: 44, crest: 'https://crests.football-data.org/57.png' },
    { id: 65, pos: 2, team: 'Man City', pts: 78, j: 38, v: 23, e: 9, d: 6, sg: 42, crest: 'https://crests.football-data.org/65.png' },
    { id: 66, pos: 3, team: 'Man United', pts: 71, j: 38, v: 20, e: 11, d: 7, sg: 19, crest: 'https://crests.football-data.org/66.png' },
    { id: 58, pos: 4, team: 'Aston Villa', pts: 65, j: 38, v: 19, e: 8, d: 11, sg: 7, crest: 'https://crests.football-data.org/58.png' },
    { id: 64, pos: 5, team: 'Liverpool', pts: 60, j: 38, v: 17, e: 9, d: 12, sg: 10, crest: 'https://crests.football-data.org/64.png' }
  ],
  laliga: [
    { id: 81, pos: 1, team: 'Barça', pts: 94, j: 38, v: 31, e: 1, d: 6, sg: 59, crest: 'https://crests.football-data.org/81.png' },
    { id: 86, pos: 2, team: 'Real Madrid', pts: 86, j: 38, v: 27, e: 5, d: 6, sg: 42, crest: 'https://crests.football-data.org/86.png' },
    { id: 94, pos: 3, team: 'Villarreal', pts: 72, j: 38, v: 22, e: 6, d: 10, sg: 26, crest: 'https://crests.football-data.org/94.png' },
    { id: 78, pos: 4, team: 'Atleti', pts: 69, j: 38, v: 21, e: 6, d: 11, sg: 18, crest: 'https://crests.football-data.org/78.png' },
    { id: 90, pos: 5, team: 'Real Betis', pts: 60, j: 38, v: 15, e: 15, d: 8, sg: 11, crest: 'https://crests.football-data.org/90.png' }
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

        if (!res.ok) throw new Error("Erro na API")

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
          throw new Error("Dados inválidos")
        }
      } catch (err) {
        if (!ignore) {
          console.log("Usando fallback de segurança:", err)
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