export const StandingsModal = ({ isOpen, onClose, league, standings = [] }) => {
  if (!isOpen) return null

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
            ✕
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
              {standings.map((item) => {
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
                      {item.crest && (
                        <img src={item.crest} alt={item.team} className="w-4 h-4 object-contain shrink-0" />
                      )}
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