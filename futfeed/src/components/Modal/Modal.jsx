import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export const Modal = ({ news, onClose }) => {

    if (!news) {
        return null
    }

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50" >
            <div className="bg-[var(--bg-card)] max-w-lg w-full p-6 rounded-xl border border-text-muted/10 flex flex-col gap-4">
                <span className="text-[var(--brand)] font-semibold text-xs">
                    {news.category}
                </span>

                <h2 className="text-xl font-bold">
                    {news.title}
                </h2>

                <p className="text-sm text-text-muted">
                    Notícia completa sobre {news.title}...
                </p>

                <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-text-muted">
                        {news.time} • {news.league}
                    </span>

                    <button onClick={onClose} className="text-zinc-50 font-bold px-4 py-2 rounded-lg text-sm cursor-pointer ">
                        <FontAwesomeIcon icon={faXmark} className='text-2xl hover:text-[var(--brand)] transition-all ease-in' />
                    </button>
                </div>
            </div>
        </div>
    )
}
