const classificacao = [
    { id: 1, position: 1, team: 'Flamengo', badge: 'FLA', color: 'bg-red-600', games: 12, points: 28, highlighted: true },
    { id: 2, position: 2, team: 'Palmeiras', badge: 'PAL', color: 'bg-green-600', games: 12, points: 25 },
    { id: 3, position: 3, team: 'Atlético-MG', badge: 'CAM', color: 'bg-gray-600', games: 12, points: 22 },
    { id: 4, position: 4, team: 'São Paulo', badge: 'SPF', color: 'bg-red-500', games: 12, points: 21 },
    { id: 5, position: 5, team: 'Botafogo', badge: 'BOT', color: 'bg-black', games: 12, points: 20 },
]

export const Standings = () => {
    return (
        <div className="bg-bg-card p-4 rounded-2xl ring-1 ring-white/5">

            <div className="flex justify-between items-center mb-3">
                <h3 className="text-[11px] font-bold tracking-wider text-text-muted uppercase">
                    Classificação
                </h3>
                <span className="text-[11px] text-text-muted">Série A</span>
            </div>

            <div className="flex items-center text-[11px] text-text-muted font-semibold mb-1 px-2">
                <span className="w-5">#</span>
                <span className="flex-1">TIME</span>
                <span className="w-7 text-center">J</span>
                <span className="w-7 text-right">PTS</span>
            </div>

            {classificacao.map(time => (
                <div
                    key={time.id}
                    className={`flex items-center text-xs py-1.5 px-2 rounded-lg transition-all ${
                        time.highlighted 
                            ? 'bg-[var(--brand)]/10 text-[var(--brand)] font-bold' 
                            : 'text-text-main hover:bg-white/5'
                    }`}
                >
                    <span className="w-5 text-[11px] font-semibold">{time.position}</span>

                    <div className="flex-1 flex items-center gap-2">
                        <span className={`w-4 h-4 rounded-full ${time.color} text-[7px] font-bold text-white flex items-center justify-center shrink-0`}>
                            {time.badge}
                        </span>
                        <span className="truncate text-xs">{time.team}</span>
                    </div>

                    <span className="w-7 text-center text-text-muted font-normal text-[11px]">{time.games}</span>

                    <span className="w-7 text-right font-bold text-xs">{time.points}</span>
                </div>
            ))}

            <button className="w-full text-left text-xs text-[var(--brand)] hover:underline mt-3 cursor-pointer font-bold">
                Ver tabela completa &gt;
            </button>
        </div>
    )
}