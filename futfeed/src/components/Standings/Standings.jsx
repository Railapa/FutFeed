import { useState } from 'react'
import { StandingsModal } from './StandingsModal'

export const Standings = ({ league }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const top5Mock = [
    { pos: 1, team: 'Flamengo', pts: 28, color: 'bg-red-600' },
    { pos: 2, team: 'Palmeiras', pts: 25, color: 'bg-emerald-600' },
    { pos: 3, team: 'Atlético-MG', pts: 22, color: 'bg-gray-800' },
    { pos: 4, team: 'São Paulo', pts: 21, color: 'bg-red-700' },
    { pos: 5, team: 'Botafogo', pts: 20, color: 'bg-black' },
  ]

  return (
    <>
      <div className="bg-bg-card rounded-2xl ring-1 ring-white/5 p-4 flex flex-col gap-3">
        
        <div className="flex items-center justify-between pb-2 border-b border-white/5">
          <h3 className="text-[11px] font-bold tracking-wider text-text-muted uppercase">
            Classificação
          </h3>
          <span className="text-[9px] bg-white/5 text-text-muted px-2 py-0.5 rounded font-medium">
            Série A
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center text-[9px] font-bold text-text-muted uppercase px-1">
            <span className="w-4 text-center">#</span>
            <span className="flex-1 ml-2">Time</span>
            <span className="w-6 text-center">Pts</span>
          </div>

          <div className="flex flex-col gap-1.5">
            {top5Mock.map((item) => (
              <div
                key={item.pos}
                className="flex items-center justify-between text-xs p-1 rounded hover:bg-white/5 transition-colors"
              >
                <span className={`w-4 text-center font-bold text-[10px] ${item.pos <= 4 ? 'text-blue-400' : 'text-text-muted'}`}>
                  {item.pos}
                </span>
                <div className="flex items-center gap-2 flex-1 ml-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${item.color} shrink-0`}></span>
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
      />
    </>
  )
}