import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export const Modal = ({ news, onClose }) => {
    if (!news) return null;

    return (
        <div 
          className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 backdrop-blur-xs"
          onClick={onClose}
        >
            <div 
              className="bg-[var(--bg-card)] max-w-lg w-full p-5 sm:p-6 rounded-2xl border border-text-muted/10 flex flex-col gap-4 max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
                <span className="text-[var(--brand)] font-semibold text-xs">
                    {news.category}
                </span>

                <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
                    {news.title}
                </h2>

                <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                    Notícia completa sobre {news.title}...
                </p>

                <div className="flex justify-between items-center mt-2 pt-2 border-t border-text-muted/10">
                    <span className="text-xs text-text-muted">
                        {news.time} • {news.league}
                    </span>

                    <button 
                      onClick={onClose} 
                      className="text-zinc-400 hover:text-[var(--brand)] transition-colors p-2 rounded-lg cursor-pointer"
                      aria-label="Fechar modal"
                    >
                        <FontAwesomeIcon icon={faXmark} className='text-xl' />
                    </button>
                </div>
            </div>
        </div>
    )
}