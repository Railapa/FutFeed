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
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-4">

      <div className="flex gap-2 bg-bg-card p-1.5 rounded-xl overflow-x-auto scrollbar-none">
        {categories.map(btn => (
          <button
            key={btn}
            onClick={() => setSelectedCategory(btn)}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all shrink-0 whitespace-nowrap cursor-pointer ${
              btn === selectedCategory
                ? 'bg-[var(--brand)] text-[var(--bg-main)] font-bold'
                : 'bg-transparent text-text-muted hover:text-white'
            }`}
          >
            {btn}
          </button>
        ))}
      </div>

      {filteredNews.length === 0 ? (
        <div className="text-center py-10 bg-bg-card/40 rounded-xl border border-text-muted/10">
          <p className="text-sm text-text-muted">Nenhuma notícia encontrada para essa busca.</p>
        </div>
      ) : (
        filteredNews.map(noticia => (
          <article
            key={noticia.id}
            onClick={() => setSelectedNews(noticia)}
            className="bg-bg-card p-4 sm:p-5 rounded-xl border border-text-muted/10 flex flex-col cursor-pointer hover:border-[var(--brand)]/50 active:scale-[0.99] transition-all"
          >
            <div className="flex justify-between items-center">
              <span className="text-xs text-[var(--brand)] font-semibold">
                {noticia.category}
              </span>

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
                  className={`text-sm transition-colors ${
                    favorites.includes(noticia.id)
                      ? 'text-[var(--brand)]'
                      : 'text-text-muted/30 hover:text-text-muted'
                  }`}
                />
              </button>
            </div>

            {/* Título e Rodapé */}
            <h3 className="text-sm sm:text-base font-bold mt-1 text-text-main">
              {noticia.title}
            </h3>

            <div className="text-xs text-text-muted mt-2 flex gap-2">
              <span>{noticia.time}</span>
              <span>•</span>
              <span className="capitalize">{noticia.league}</span>
            </div>
          </article>
        ))
      )}

      <Modal news={selectedNews} onClose={() => setSelectedNews(null)} />
    </main>
  )
}