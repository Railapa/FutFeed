import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faBolt } from '@fortawesome/free-solid-svg-icons'

export const MyTeam = () => {
    return (
        <div className="flex flex-col gap-2.5">
            <div className="bg-bg-card w-full ring-1 ring-white/5 rounded-2xl p-4 flex flex-col gap-3">

                <div className="flex items-center gap-1.5">
                    <FontAwesomeIcon icon={faStar} className="text-yellow-400 text-[10px]" />
                    <h3 className="text-[11px] font-bold tracking-wider text-text-muted uppercase">
                        Meu Time
                    </h3>
                </div>

                <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-red-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0 shadow-sm">
                        VIT
                    </div>
                    <div>
                        <h4 className="font-bold text-xs text-text-main">Vitória</h4>
                        <span className="text-[9px] text-[var(--brand)] bg-[var(--brand)]/10 px-2 py-0.5 rounded-full font-semibold">
                            Líder • 28 pts
                        </span>
                    </div>
                </div>

                <div className="bg-bg-main/60 p-2.5 rounded-xl ring-1 ring-white/5 flex flex-col gap-1.5">
                    <span className="text-[9px] text-text-muted font-semibold tracking-wider uppercase">
                        Próxima Partida
                    </span>

                    <div className="flex justify-between items-center text-xs font-bold">
                        <div className="flex items-center gap-1">
                            <span className="w-4 h-4 rounded-full bg-red-600 text-[7px] text-white flex items-center justify-center font-bold shrink-0">
                                VIT
                            </span>
                            <span className="text-text-main text-[11px]">Vitória</span>
                        </div>

                        <span className="text-[9px] text-[var(--brand)] bg-[var(--brand)]/15 px-1.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-[var(--brand)] animate-pulse"></span>
                            67'
                        </span>

                        <div className="flex items-center gap-1">
                            <span className="text-text-main text-[11px]">Vasco</span>
                            <span className="w-4 h-4 rounded-full bg-black text-[7px] text-white flex items-center justify-center font-bold shrink-0">
                                VAS
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
                            src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=150&auto=format&fit=crop"
                            alt="Notícia do Vitória"
                            className="w-10 h-10 rounded-lg object-cover shrink-0"
                        />
                        <p className="text-[11px] font-medium text-text-main leading-tight group-hover:text-[var(--brand)] transition-colors line-clamp-2">
                            Vitória confirma contratação de novo atacante para o Brasileirão
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