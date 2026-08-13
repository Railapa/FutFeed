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
    { id: 73, pos: 5, team: 'Tottenham', pts: 18, j: 10, v: 5, e: 3, d: 2, sg: 6, crest: 'https://crests.football-data.org/73.png' },
    { id: 62, pos: 6, team: 'Everton', pts: 17, j: 10, v: 5, e: 2, d: 3, sg: 4, crest: 'https://crests.football-data.org/62.png' },
    { id: 66, pos: 7, team: 'Man United', pts: 16, j: 10, v: 5, e: 1, d: 4, sg: 2, crest: 'https://crests.football-data.org/66.png' },
    { id: 58, pos: 8, team: 'Aston Villa', pts: 15, j: 10, v: 4, e: 3, d: 3, sg: 1, crest: 'https://crests.football-data.org/58.png' },
    { id: 67, pos: 9, team: 'Newcastle', pts: 14, j: 10, v: 4, e: 2, d: 4, sg: 0, crest: 'https://crests.football-data.org/67.png' },
    { id: 397, pos: 10, team: 'Brighton', pts: 13, j: 10, v: 3, e: 4, d: 3, sg: -1, crest: 'https://crests.football-data.org/397.png' },
    { id: 354, pos: 11, team: 'Brentford', pts: 12, j: 10, v: 3, e: 3, d: 4, sg: -2, crest: 'https://crests.football-data.org/354.png' },
    { id: 563, pos: 12, team: 'West Ham', pts: 12, j: 10, v: 3, e: 3, d: 4, sg: -3, crest: 'https://crests.football-data.org/563.png' },
    { id: 351, pos: 13, team: 'Nottingham', pts: 11, j: 10, v: 3, e: 2, d: 5, sg: -4, crest: 'https://crests.football-data.org/351.png' },
    { id: 341, pos: 14, team: 'Leeds', pts: 10, j: 10, v: 2, e: 4, d: 4, sg: -5, crest: 'https://crests.football-data.org/341.png' },
    { id: 356, pos: 15, team: 'Sheffield', pts: 9, j: 10, v: 2, e: 3, d: 5, sg: -6, crest: 'https://crests.football-data.org/356.png' },
    { id: 328, pos: 16, team: 'Burnley', pts: 8, j: 10, v: 2, e: 2, d: 6, sg: -7, crest: 'https://crests.football-data.org/328.png' },
    { id: 76, pos: 17, team: 'Wolves', pts: 7, j: 10, v: 1, e: 4, d: 5, sg: -8, crest: 'https://crests.football-data.org/76.png' },
    { id: 340, pos: 18, team: 'Southampton', pts: 6, j: 10, v: 1, e: 3, d: 6, sg: -10, crest: 'https://crests.football-data.org/340.png' },
    { id: 338, pos: 19, team: 'Leicester', pts: 5, j: 10, v: 1, e: 2, d: 7, sg: -12, crest: 'https://crests.football-data.org/338.png' },
    { id: 402, pos: 20, team: 'Brentford B', pts: 3, j: 10, v: 0, e: 3, d: 7, sg: -15, crest: 'https://crests.football-data.org/402.png' }
  ],
  champions: [
    { id: 86, pos: 1, team: 'Real Madrid', pts: 15, j: 5, v: 5, e: 0, d: 0, sg: 10, crest: 'https://crests.football-data.org/86.png' },
    { id: 5, pos: 2, team: 'Bayern', pts: 13, j: 5, v: 4, e: 1, d: 0, sg: 9, crest: 'https://crests.football-data.org/5.png' },
    { id: 65, pos: 3, team: 'Man City', pts: 13, j: 5, v: 4, e: 1, d: 0, sg: 8, crest: 'https://crests.football-data.org/65.png' },
    { id: 521, pos: 4, team: 'PSG', pts: 12, j: 5, v: 4, e: 0, d: 1, sg: 6, crest: 'https://crests.football-data.org/521.png' },
    { id: 505, pos: 5, team: 'Inter', pts: 10, j: 5, v: 3, e: 1, d: 1, sg: 4, crest: 'https://crests.football-data.org/505.png' },
    { id: 81, pos: 6, team: 'Barcelona', pts: 10, j: 5, v: 3, e: 1, d: 1, sg: 3, crest: 'https://crests.football-data.org/81.png' },
    { id: 61, pos: 7, team: 'Chelsea', pts: 9, j: 5, v: 3, e: 0, d: 2, sg: 2, crest: 'https://crests.football-data.org/61.png' },
    { id: 57, pos: 8, team: 'Arsenal', pts: 9, j: 5, v: 3, e: 0, d: 2, sg: 1, crest: 'https://crests.football-data.org/57.png' },
    { id: 4, pos: 9, team: 'Dortmund', pts: 8, j: 5, v: 2, e: 2, d: 1, sg: 1, crest: 'https://crests.football-data.org/4.png' },
    { id: 78, pos: 10, team: 'Atlético', pts: 7, j: 5, v: 2, e: 1, d: 2, sg: 0, crest: 'https://crests.football-data.org/78.png' },
    { id: 109, pos: 11, team: 'Juventus', pts: 7, j: 5, v: 2, e: 1, d: 2, sg: -1, crest: 'https://crests.football-data.org/109.png' },
    { id: 98, pos: 12, team: 'Milan', pts: 6, j: 5, v: 2, e: 0, d: 3, sg: -2, crest: 'https://crests.football-data.org/98.png' }
  ],
  laliga: [
    { id: 86, pos: 1, team: 'Real Madrid', pts: 27, j: 10, v: 9, e: 0, d: 1, sg: 16, crest: 'https://crests.football-data.org/86.png' },
    { id: 81, pos: 2, team: 'Barcelona', pts: 24, j: 10, v: 8, e: 0, d: 2, sg: 15, crest: 'https://crests.football-data.org/81.png' },
    { id: 78, pos: 3, team: 'Atlético Madrid', pts: 22, j: 10, v: 7, e: 1, d: 2, sg: 10, crest: 'https://crests.football-data.org/78.png' },
    { id: 90, pos: 4, team: 'Real Betis', pts: 19, j: 10, v: 6, e: 1, d: 3, sg: 5, crest: 'https://crests.football-data.org/90.png' },
    { id: 92, pos: 5, team: 'Real Sociedad', pts: 18, j: 10, v: 5, e: 3, d: 2, sg: 4, crest: 'https://crests.football-data.org/92.png' },
    { id: 94, pos: 6, team: 'Villarreal', pts: 17, j: 10, v: 5, e: 2, d: 3, sg: 3, crest: 'https://crests.football-data.org/94.png' },
    { id: 559, pos: 7, team: 'Sevilla', pts: 16, j: 10, v: 4, e: 4, d: 2, sg: 2, crest: 'https://crests.football-data.org/559.png' },
    { id: 77, pos: 8, team: 'Athletic Bilbao', pts: 15, j: 10, v: 4, e: 3, d: 3, sg: 1, crest: 'https://crests.football-data.org/77.png' },
    { id: 82, pos: 9, team: 'Getafe', pts: 14, j: 10, v: 3, e: 5, d: 2, sg: 0, crest: 'https://crests.football-data.org/82.png' },
    { id: 89, pos: 10, team: 'Mallorca', pts: 13, j: 10, v: 3, e: 4, d: 3, sg: -1, crest: 'https://crests.football-data.org/89.png' },
    { id: 285, pos: 11, team: 'Girona', pts: 12, j: 10, v: 3, e: 3, d: 4, sg: -2, crest: 'https://crests.football-data.org/285.png' },
    { id: 95, pos: 12, team: 'Valencia', pts: 11, j: 10, v: 2, e: 5, d: 3, sg: -3, crest: 'https://crests.football-data.org/95.png' },
    { id: 263, pos: 13, team: 'Alavés', pts: 10, j: 10, v: 2, e: 4, d: 4, sg: -4, crest: 'https://crests.football-data.org/263.png' },
    { id: 87, pos: 14, team: 'Rayo Vallecano', pts: 10, j: 10, v: 2, e: 4, d: 4, sg: -5, crest: 'https://crests.football-data.org/87.png' },
    { id: 558, pos: 15, team: 'Celta Vigo', pts: 9, j: 10, v: 2, e: 3, d: 5, sg: -6, crest: 'https://crests.football-data.org/558.png' },
    { id: 298, pos: 16, team: 'Leganés', pts: 8, j: 10, v: 1, e: 5, d: 4, sg: -7, crest: 'https://crests.football-data.org/298.png' },
    { id: 264, pos: 17, team: 'Espanyol', pts: 7, j: 10, v: 1, e: 4, d: 5, sg: -8, crest: 'https://crests.football-data.org/264.png' },
    { id: 267, pos: 18, team: 'Las Palmas', pts: 6, j: 10, v: 1, e: 3, d: 6, sg: -10, crest: 'https://crests.football-data.org/267.png' },
    { id: 275, pos: 19, team: 'UD Almería', pts: 5, j: 10, v: 1, e: 2, d: 7, sg: -12, crest: 'https://crests.football-data.org/275.png' },
    { id: 268, pos: 20, team: 'Granada', pts: 4, j: 10, v: 0, e: 4, d: 6, sg: -14, crest: 'https://crests.football-data.org/268.png' }
  ],
  brasileirao: [
    { id: 1783, pos: 1, team: 'Flamengo', pts: 28, j: 12, v: 8, e: 4, d: 0, sg: 14, crest: 'https://crests.football-data.org/1783.png' },
    { id: 1769, pos: 2, team: 'Palmeiras', pts: 25, j: 12, v: 7, e: 4, d: 1, sg: 10, crest: 'https://crests.football-data.org/1769.png' },
    { id: 1766, pos: 3, team: 'Atlético-MG', pts: 22, j: 12, v: 6, e: 4, d: 2, sg: 7, crest: 'https://crests.football-data.org/1766.png' },
    { id: 1776, pos: 4, team: 'São Paulo', pts: 21, j: 12, v: 6, e: 3, d: 3, sg: 5, crest: 'https://crests.football-data.org/1776.png' },
    { id: 1770, pos: 5, team: 'Botafogo', pts: 20, j: 12, v: 6, e: 2, d: 4, sg: 4, crest: 'https://crests.football-data.org/1770.png' },
    { id: 1765, pos: 6, team: 'Fluminense', pts: 19, j: 12, v: 5, e: 4, d: 3, sg: 3, crest: 'https://crests.football-data.org/1765.png' },
    { id: 1767, pos: 7, team: 'Grêmio', pts: 18, j: 12, v: 5, e: 3, d: 4, sg: 2, crest: 'https://crests.football-data.org/1767.png' },
    { id: 1780, pos: 8, team: 'Cruzeiro', pts: 17, j: 12, v: 5, e: 2, d: 5, sg: 1, crest: 'https://crests.football-data.org/1780.png' },
    { id: 1782, pos: 9, team: 'Internacional', pts: 16, j: 12, v: 4, e: 4, d: 4, sg: 0, crest: 'https://crests.football-data.org/1782.png' },
    { id: 1777, pos: 10, team: 'Bahia', pts: 15, j: 12, v: 4, e: 3, d: 5, sg: -1, crest: 'https://crests.football-data.org/1777.png' },
    { id: 1771, pos: 11, team: 'Corinthians', pts: 14, j: 12, v: 3, e: 5, d: 4, sg: -2, crest: 'https://crests.football-data.org/1771.png' },
    { id: 1772, pos: 12, team: 'Vasco', pts: 14, j: 12, v: 4, e: 2, d: 6, sg: -3, crest: 'https://crests.football-data.org/1783.png' },
    { id: 1773, pos: 13, team: 'Fortaleza', pts: 13, j: 12, v: 3, e: 4, d: 5, sg: -3, crest: 'https://crests.football-data.org/1783.png' },
    { id: 1774, pos: 14, team: 'Vitória', pts: 11, j: 12, v: 3, e: 2, d: 7, sg: -5, crest: 'https://crests.football-data.org/1783.png' },
    { id: 1775, pos: 15, team: 'Red Bull Bragantino', pts: 11, j: 12, v: 2, e: 5, d: 5, sg: -4, crest: 'https://crests.football-data.org/1783.png' },
    { id: 1778, pos: 16, team: 'Criciúma', pts: 10, j: 12, v: 2, e: 4, d: 6, sg: -6, crest: 'https://crests.football-data.org/1783.png' },
    { id: 1779, pos: 17, team: 'Juventude', pts: 9, j: 12, v: 2, e: 3, d: 7, sg: -7, crest: 'https://crests.football-data.org/1783.png' },
    { id: 1781, pos: 18, team: 'Cuiabá', pts: 8, j: 12, v: 2, e: 2, d: 8, sg: -8, crest: 'https://crests.football-data.org/1783.png' },
    { id: 1784, pos: 19, team: 'Atlético-GO', pts: 7, j: 12, v: 1, e: 4, d: 7, sg: -9, crest: 'https://crests.football-data.org/1783.png' },
    { id: 1785, pos: 20, team: 'Mirassol', pts: 5, j: 12, v: 1, e: 2, d: 9, sg: -12, crest: 'https://crests.football-data.org/1783.png' }
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

      const targetUrl = `https://api.football-data.org/v4/competitions/${code}/standings`
      const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`

      try {
        const res = await fetch(proxyUrl, {
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
          console.log("Usando dados de reserva da liga:", err)
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