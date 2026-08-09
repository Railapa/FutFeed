import { mockTeams } from '../../data/teams'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faBolt } from '@fortawesome/free-solid-svg-icons'

export const MyTeam = ({ myTeamId, setMyTeamId }) => {

    const currentTeam = mockTeams.find(t => t.id === myTeamId) || mockTeams[0]

    return (
        <div className="flex flex-col gap-2.5">
            <div className="bg-bg-card w-full ring-1 ring-white/5 rounded-2xl p-4 flex flex-col gap-3">

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                        <FontAwesomeIcon icon={faStar} className="text-yellow-400 text-[10px]" />
                        <h3 className="text-[11px] font-bold tracking-wider text-text-muted uppercase">
                            Meu Time
                        </h3>
                    </div>

                    <select
                        value={myTeamId}
                        onChange={(e) => setMyTeamId(e.target.value)}
                        className="bg-bg-main text-text-main text-[10px] font-semibold px-2 py-0.5 rounded-lg border border-white/5 cursor-pointer outline-none focus:ring-1 focus:ring-[var(--brand)]"
                    >
                        {mockTeams.map(team => (
                            <option key={team.id} value={team.id}>
                                {team.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center gap-2.5">
                    <div className={`w-9 h-9 rounded-xl ${currentTeam.color} text-white font-bold flex items-center justify-center text-[10px] shrink-0 shadow-sm`}>
                        {currentTeam.badge}
                    </div>
                    <div>
                        <h4 className="font-bold text-xs text-text-main">{currentTeam.name}</h4>
                        <span className="text-[9px] text-[var(--brand)] bg-[var(--brand)]/10 px-2 py-0.5 rounded-full font-semibold">
                            {currentTeam.status}
                        </span>
                    </div>
                </div>

                <div className="bg-bg-main/60 p-2.5 rounded-xl ring-1 ring-white/5 flex flex-col gap-1.5">
                    <span className="text-[9px] text-text-muted font-semibold tracking-wider uppercase">
                        Próxima Partida
                    </span>

                    <div className="flex justify-between items-center text-xs font-bold">
                        <div className="flex items-center gap-1">
                            <span className={`w-4 h-4 rounded-full ${currentTeam.nextMatch.homeColor} text-[7px] text-white flex items-center justify-center font-bold shrink-0`}>
                                {currentTeam.nextMatch.homeBadge}
                            </span>
                            <span className="text-text-main text-[11px]">{currentTeam.nextMatch.homeTeam}</span>
                        </div>

                        <span className="text-[9px] text-[var(--brand)] bg-[var(--brand)]/15 px-1.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                            {currentTeam.nextMatch.status.includes("'") && (
                                <span className="w-1 h-1 rounded-full bg-[var(--brand)] animate-pulse"></span>
                            )}
                            {currentTeam.nextMatch.status}
                        </span>

                        <div className="flex items-center gap-1">
                            <span className="text-text-main text-[11px]">{currentTeam.nextMatch.awayTeam}</span>
                            <span className={`w-4 h-4 rounded-full ${currentTeam.nextMatch.awayColor} text-[7px] text-white flex items-center justify-center font-bold shrink-0`}>
                                {currentTeam.nextMatch.awayBadge}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-1.5">
                    <span className="text-[9px] text-text-muted font-semibold tracking-wider uppercase">
                        Última Notícia
                    </span>

                    <div className="flex items-center gap-2.5 cursor-pointer group">
                        <img
                            src={currentTeam.latestNews.image}
                            alt={currentTeam.latestNews.title}
                            className="w-10 h-10 rounded-lg object-cover shrink-0"
                        />
                        <p className="text-[11px] font-medium text-text-main leading-tight group-hover:text-[var(--brand)] transition-colors line-clamp-2">
                            {currentTeam.latestNews.title}
                        </p>
                    </div>
                </div>

            </div>

            <div className="ring-1 ring-white/5 bg-[var(--brand)]/5 p-2.5 rounded-xl flex items-center gap-2.5 cursor-pointer hover:bg-[var(--brand)]/10 transition-colors">
                <div className="w-7 h-7 rounded-full bg-[var(--brand)]/20 text-[var(--brand)] flex items-center justify-center shrink-0">
                    <FontAwesomeIcon icon={faBolt} className="text-[10px]" />
                </div>
                <div>
                    <p className="text-[11px] font-bold text-[var(--brand)] flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand)] animate-ping"></span>
                        2 jogos ao vivo agora
                    </p>
                    <p className="text-[9px] text-text-muted">
                        Atualização em tempo real
                    </p>
                </div>
            </div>
        </div>
    )
}