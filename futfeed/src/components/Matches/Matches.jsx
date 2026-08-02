import { mockMatches } from "../../data/matches";

export const Matches = ({ league }) => {

    const filteredMatches = mockMatches.filter(m => m.league === league)

    return (
        <section className="max-w-4xl mx-auto px-6 mt-4">
            <h2 className="text-xs font-bold text-text-muted mb-3 uppercase tracking-wider">Partidas de Hoje</h2>

            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
                {filteredMatches.length === 0 ? <p className="text-xs text-text-muted">Nenhum jogo agendado para hoje nesta liga.</p>
                    :
                    filteredMatches.map(matches => (
                        <div
                            key={matches.id}
                            className="min-w-[240px] bg-[var(--bg-card)] p-4 rounded-2xl border border-text-muted/10 flex flex-col gap-3 shrink-0"
                        >
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">
                                    {matches.league}
                                </span>

                                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${matches.status === 'AO VIVO'
                                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                                        : 'bg-white/5 text-text-muted'
                                    }`}>
                                    {matches.status === 'AO VIVO' && <span className="text-[8px] animate-pulse">●</span>}
                                    {matches.status === 'AO VIVO' ? matches.time : matches.status}
                                </span>
                            </div>

                            <div className="flex items-center justify-between px-1">

                                <div className="flex flex-col items-center gap-1.5 w-16 text-center">
                                    <div className="w-10 h-10 rounded-xl bg-red-600/90 text-white font-black text-xs flex items-center justify-center shadow-md">
                                        {matches.homeBadge}
                                    </div>
                                    <span className="text-xs font-semibold text-text-main truncate max-w-full">
                                        {matches.homeTeam}
                                    </span>
                                </div>

                                <div className="text-lg font-black tracking-wider text-white">
                                    {matches.status === 'EM BREVE'
                                        ? '-'
                                        : `${matches.homeScore} - ${matches.awayScore}`}
                                </div>

                                <div className="flex flex-col items-center gap-1.5 w-16 text-center">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-700/90 text-white font-black text-xs flex items-center justify-center shadow-md">
                                        {matches.awayBadge}
                                    </div>
                                    <span className="text-xs font-semibold text-text-main truncate max-w-full">
                                        {matches.awayTeam}
                                    </span>
                                </div>

                            </div>
                        </div>
                    ))}
            </div>
        </section>
    )
}
