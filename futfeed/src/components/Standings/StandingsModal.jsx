const getLeagueConfig = (league) => {
  const l = (league || '').toLowerCase()

  if (l.includes('champions')) {
    return {
      title: 'CHAMPIONS LEAGUE',
      legends: [
        { label: 'Oitavas (1º - 8º)', color: 'bg-blue-500' },
        { label: 'Play-offs (9º - 24º)', color: 'bg-emerald-500' },
        { label: 'Eliminados (25º - 36º)', color: 'bg-red-500' }
      ],
      getPosColor: (pos) => {
        if (pos <= 8) return 'text-blue-400 font-bold'
        if (pos <= 24) return 'text-emerald-400 font-bold'
        if (pos >= 25) return 'text-red-400 font-bold'
        return 'text-text-muted'
      }
    }
  }

  if (l.includes('premier') || l.includes('laliga') || l.includes('la liga')) {
    return {
      title: l.includes('premier') ? 'PREMIER LEAGUE' : 'LA LIGA',
      legends: [
        { label: 'Champions League (G4)', color: 'bg-blue-500' },
        { label: 'Europa League (5º -  6º)', color: 'bg-emerald-500' },
        { label: 'Rebaixamento (Z3)', color: 'bg-red-500' }
      ],
      getPosColor: (pos) => {
        if (pos <= 4) return 'text-blue-400 font-bold'
        if (pos <= 6) return 'text-emerald-400 font-bold'
        if (pos >= 18) return 'text-red-400 font-bold'
        return 'text-text-muted'
      }
    }
  }

  if (l.includes('libertadores')) {
    return {
      title: 'COPA LIBERTADORES',
      legends: [
        { label: 'Oitavas de Final (G2)', color: 'bg-blue-500' },
        { label: 'Sul-Americana (3º lugar)', color: 'bg-emerald-500' },
        { label: 'Eliminado', color: 'bg-red-500' }
      ],
      getPosColor: (pos) => {
        if (pos <= 2) return 'text-blue-400 font-bold'
        if (pos === 3) return 'text-emerald-400 font-bold'
        return 'text-red-400 font-bold'
      }
    }
  }

  if (l.includes('serie-b') || l.includes('série b')) {
    return {
      title: 'BRASILEIRÃO SÉRIE B',
      legends: [
        { label: 'Acesso Série A (G4)', color: 'bg-blue-500' },
        { label: 'Rebaixamento (Z4)', color: 'bg-red-500' }
      ],
      getPosColor: (pos) => {
        if (pos <= 4) return 'text-blue-400 font-bold'
        if (pos >= 17) return 'text-red-400 font-bold'
        return 'text-text-muted'
      }
    }
  }

  return {
    title: 'BRASILEIRÃO SÉRIE A',
    legends: [
      { label: 'Libertadores (G6)', color: 'bg-blue-500' },
      { label: 'Sul-Americana (7º-12º)', color: 'bg-emerald-500' },
      { label: 'Rebaixamento (Z4)', color: 'bg-red-500' }
    ],
    getPosColor: (pos) => {
      if (pos <= 6) return 'text-blue-400 font-bold'
      if (pos <= 12) return 'text-emerald-400 font-bold'
      if (pos >= 17) return 'text-red-400 font-bold'
      return 'text-text-muted'
    }
  }
}

export const StandingsModal = ({ isOpen, onClose, league, standings = [] }) => {
  if (!isOpen) return null

  const config = getLeagueConfig(league)

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#121824] rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden ring-1 ring-white/10 shadow-2xl">
        
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div>
            <h2 className="text-base font-extrabold text-text-main tracking-wide">
              TABELA COMPLETA • {config.title}
            </h2>
            <p className="text-[11px] text-text-muted">Temporada Atual</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-text-muted hover:text-text-main transition-all cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="px-5 py-3 bg-black/20 border-b border-white/5 flex flex-wrap gap-4 text-[11px] font-semibold">
          {config.legends.map((item, idx) => (
            <div key={idx} className="flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-full ${item.color}`}></span>
              <span className="text-text-muted">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="p-4 overflow-y-auto scrollbar-thin">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] uppercase font-bold text-text-muted border-b border-white/10 pb-2">
                <th className="py-2 pl-2 w-8">#</th>
                <th className="py-2">Clube</th>
                <th className="py-2 text-center w-8">P</th>
                <th className="py-2 text-center w-8">J</th>
                <th className="py-2 text-center w-8">V</th>
                <th className="py-2 text-center w-8">E</th>
                <th className="py-2 text-center w-8">D</th>
                <th className="py-2 text-center w-10 pr-2">SG</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {standings.map((item) => (
                <tr key={item.pos} className="hover:bg-white/5 transition-colors">
                  <td className={`py-2.5 pl-2 font-bold ${config.getPosColor(item.pos)}`}>
                    {item.pos}
                  </td>
                  <td className="py-2.5 flex items-center gap-2 font-semibold text-text-main">
                    {item.crest && (
                      <img src={item.crest} alt={item.team} className="w-4 h-4 object-contain shrink-0" />
                    )}
                    <span className="truncate">{item.team}</span>
                  </td>
                  <td className="py-2.5 text-center font-extrabold text-text-main">{item.pts}</td>
                  <td className="py-2.5 text-center text-text-muted">{item.j}</td>
                  <td className="py-2.5 text-center text-text-muted">{item.v}</td>
                  <td className="py-2.5 text-center text-text-muted">{item.e}</td>
                  <td className="py-2.5 text-center text-text-muted">{item.d}</td>
                  <td className="py-2.5 text-center font-bold text-text-muted pr-2">
                    {item.sg > 0 ? `+${item.sg}` : item.sg}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}