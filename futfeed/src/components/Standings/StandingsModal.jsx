import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

export const StandingsModal = ({ isOpen, onClose, league }) => {
  if (!isOpen) return null

  const fullStandingsMock = [
    { pos: 1, team: 'Flamengo', pts: 28, j: 12, v: 8, e: 4, d: 0, sg: 14, color: 'bg-red-600' },
    { pos: 2, team: 'Palmeiras', pts: 25, j: 12, v: 7, e: 4, d: 1, sg: 10, color: 'bg-emerald-600' },
    { pos: 3, team: 'Atlético-MG', pts: 22, j: 12, v: 6, e: 4, d: 2, sg: 7, color: 'bg-gray-800' },
    { pos: 4, team: 'São Paulo', pts: 21, j: 12, v: 6, e: 3, d: 3, sg: 5, color: 'bg-red-700' },
    { pos: 5, team: 'Botafogo', pts: 20, j: 12, v: 6, e: 2, d: 4, sg: 4, color: 'bg-black' },
    { pos: 6, team: 'Fluminense', pts: 19, j: 12, v: 5, e: 4, d: 3, sg: 3, color: 'bg-red-800' },
    { pos: 7, team: 'Grêmio', pts: 18, j: 12, v: 5, e: 3, d: 4, sg: 2, color: 'bg-blue-600' },
    { pos: 8, team: 'Cruzeiro', pts: 17, j: 12, v: 5, e: 2, d: 5, sg: 1, color: 'bg-blue-700' },
    { pos: 9, team: 'Internacional', pts: 16, j: 12, v: 4, e: 4, d: 4, sg: 0, color: 'bg-red-600' },
    { pos: 10, team: 'Bahia', pts: 15, j: 12, v: 4, e: 3, d: 5, sg: -1, color: 'bg-blue-500' },
    { pos: 11, team: 'Athletico-PR', pts: 15, j: 12, v: 4, e: 3, d: 5, sg: -2, color: 'bg-red-700' },
    { pos: 12, team: 'Vasco', pts: 14, j: 12, v: 4, e: 2, d: 6, sg: -3, color: 'bg-black' },
    { pos: 13, team: 'Fortaleza', pts: 13, j: 12, v: 3, e: 4, d: 5, sg: -3, color: 'bg-blue-800' },
    { pos: 14, team: 'Corinthians', pts: 12, j: 12, v: 3, e: 3, d: 6, sg: -4, color: 'bg-gray-900' },
    { pos: 15, team: 'Vitória', pts: 11, j: 12, v: 3, e: 2, d: 7, sg: -5, color: 'bg-red-600' },
    { pos: 16, team: 'Criciúma', pts: 10, j: 12, v: 2, e: 4, d: 6, sg: -6, color: 'bg-yellow-500' },
    { pos: 17, team: 'Juventude', pts: 9, j: 12, v: 2, e: 3, d: 7, sg: -7, color: 'bg-green-700' },
    { pos: 18, team: 'Cuiabá', pts: 8, j: 12, v: 2, e: 2, d: 8, sg: -8, color: 'bg-green-800' },
    { pos: 19, team: 'Atlético-GO', pts: 7, j: 12, v: 1, e: 4, d: 7, sg: -9, color: 'bg-red-700' },
    { pos: 20, team: 'Fluminense-PI', pts: 5, j: 12, v: 1, e: 2, d: 9, sg: -12, color: 'bg-gray-700' }
  ]

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-bg-card w-full max-w-2xl rounded-2xl ring-1 ring-white/10 p-5 flex flex-col gap-4 max-h-[85vh] shadow-2xl">
        
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <div>
            <h2 className="text-sm font-bold text-text-main uppercase tracking-wider">
              Tabela Completa • {league || 'Brasileirão Série A'}
            </h2>
            <p className="text-[10px] text-text-muted">Temporada Atual</p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-text-muted hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <FontAwesomeIcon icon={faXmark} className="text-sm" />
          </button>
        </div>

        <div className="flex flex-wrap gap-3 text-[10px] text-text-muted border-b border-white/5 pb-2">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span> Libertadores (G4)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500"></span> Sul-Americana
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500"></span> Rebaixamento (Z4)
          </span>
        </div>

        <div className="overflow-y-auto max-h-[50vh] scrollbar-thin scrollbar-thumb-white/10 pr-1">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 text-[10px] font-bold text-text-muted uppercase">
                <th className="py-2 px-1 text-center">#</th>
                <th className="py-2 px-2">Clube</th>
                <th className="py-2 px-1 text-center">P</th>
                <th className="py-2 px-1 text-center">J</th>
                <th className="py-2 px-1 text-center">V</th>
                <th className="py-2 px-1 text-center">E</th>
                <th className="py-2 px-1 text-center">D</th>
                <th className="py-2 px-1 text-center">SG</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {fullStandingsMock.map((item) => {
                let posColor = 'text-text-muted'
                if (item.pos <= 4) posColor = 'text-blue-400 font-bold'
                else if (item.pos <= 12) posColor = 'text-green-400'
                else if (item.pos >= 17) posColor = 'text-red-400 font-bold'

                return (
                  <tr key={item.pos} className="hover:bg-white/5 transition-colors">
                    <td className={`py-2 px-1 text-center text-[11px] ${posColor}`}>
                      {item.pos}
                    </td>
                    <td className="py-2 px-2 font-semibold text-text-main flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${item.color} inline-block shrink-0`}></span>
                      <span className="truncate max-w-[140px] sm:max-w-[220px]">{item.team}</span>
                    </td>
                    <td className="py-2 px-1 text-center font-bold text-text-main">{item.pts}</td>
                    <td className="py-2 px-1 text-center text-text-muted">{item.j}</td>
                    <td className="py-2 px-1 text-center text-text-muted">{item.v}</td>
                    <td className="py-2 px-1 text-center text-text-muted">{item.e}</td>
                    <td className="py-2 px-1 text-center text-text-muted">{item.d}</td>
                    <td className="py-2 px-1 text-center text-text-muted">
                      {item.sg > 0 ? `+${item.sg}` : item.sg}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}