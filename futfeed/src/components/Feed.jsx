import '../../src/index.css'
import { mockNews } from "../data/news"
import { useEffect, useState } from "react"
import { Modal } from "./Modal/Modal"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'

export const Feed = ({ league, searchTeam }) => {

  const [selectedNews, setSelectedNews] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('Todas')

  const categories = ['Todas', 'Notícia', 'Mercado', 'Pós-jogo', 'Salvas']

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('futfeed_favorites')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('futfeed_favorites', JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    )
  }

  const filteredNews = mockNews.filter(news => {
    const matchesLeague = news.league === league
    const matchesTitle = news.title.toLowerCase().includes(searchTeam.toLowerCase())

    if (selectedCategory === 'Salvas') {
      return favorites.includes(news.id) && matchesTitle
    }

    const matchesCategory = selectedCategory === 'Todas' || news.category === selectedCategory

    return matchesLeague && matchesTitle && matchesCategory
  })

  return (
    <div className="flex flex-col gap-4">

      <div className="flex gap-1.5 bg-bg-card p-1 rounded-xl overflow-x-auto scrollbar-none h-10">
        {categories.map(btn => (
          <button
            key={btn}
            onClick={() => setSelectedCategory(btn)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all shrink-0 whitespace-nowrap cursor-pointer ${
              btn === selectedCategory
                ? 'bg-[var(--brand)] text-[var(--bg-main)] font-bold'
                : 'bg-transparent text-text-muted hover:text-white hover:bg-bg-main'
            }`}
          >
            {btn === 'Salvas' ? `${btn} (${favorites.length})` : btn}
          </button>
        ))}
      </div>

      {filteredNews.length === 0 ? (
        <div className="text-center py-10 bg-bg-card/40 rounded-xl border border-text-muted/10">
          <p className="text-sm text-text-muted">
            {selectedCategory === 'Salvas' 
              ? 'Você ainda não salvou nenhuma notícia.' 
              : 'Nenhuma notícia encontrada para essa busca.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredNews.map(noticia => (
            <article
              key={noticia.id}
              onClick={() => setSelectedNews(noticia)}
              className="bg-bg-card rounded-2xl ring-1 ring-white/5 overflow-hidden flex flex-col cursor-pointer hover:ring-[var(--brand)]/40 transition-all group"
            >
              <div className="relative h-36 sm:h-40 w-full overflow-hidden bg-white/5">
                <img 
                  src={noticia.image || "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=500&auto=format&fit=crop"} 
                  alt={noticia.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2.5 left-2.5 text-[9px] bg-[var(--brand)] text-[var(--bg-main)] font-extrabold px-2 py-0.5 rounded-md shadow">
                  #{noticia.category}
                </span>
              </div>

              <div className="p-3.5 flex flex-col justify-between flex-1 gap-2">
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-text-main line-clamp-2 group-hover:text-[var(--brand)] transition-colors leading-snug">
                    {noticia.title}
                  </h3>
                  {noticia.description && (
                    <p className="text-[11px] text-text-muted line-clamp-2 mt-1 leading-relaxed">
                      {noticia.description}
                    </p>
                  )}
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-white/5 text-[10px] text-text-muted mt-auto">
                  <span>@{noticia.source || 'GloboEsporte'} • {noticia.time}</span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(noticia.id)
                    }}
                    className="p-1 cursor-pointer transition-colors"
                    title={favorites.includes(noticia.id) ? "Remover dos salvos" : "Salvar notícia"}
                  >
                    <FontAwesomeIcon
                      icon={faBookmark}
                      className={`text-xs transition-colors ${
                        favorites.includes(noticia.id)
                          ? 'text-[var(--brand)]'
                          : 'text-text-muted/30 hover:text-text-muted'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <Modal news={selectedNews} onClose={() => setSelectedNews(null)} />
    </div>
  )
}