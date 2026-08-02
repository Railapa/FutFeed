import '../../src/index.css'

import { mockNews } from "../data/news"
import { useState } from "react"
import { Modal } from "./Modal/Modal"

export const Feed = ({ league, searchTeam }) => {

  const [selectedNews, setSelectedNews] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  const categories = ['Todas', 'Notícia', 'Mercado', 'Pós-jogo']

  const filteredNews = mockNews.filter(news => {
    const matchesLeague = news.league === league
    const matchesTitle = news.title.toLowerCase().includes(searchTeam.toLowerCase())
    const matchesCategory = news.category === selectedCategory || selectedCategory === 'Todas'

    return matchesLeague && matchesTitle && matchesCategory
  })

  return (
    <main className="max-w-4xl mx-auto p-6 flex flex-col gap-4">

      <div className="flex gap-2 bg-bg-card p-1 rounded-md">
        {categories.map(btn => (
          <button
            key={btn}
            onClick={() => setSelectedCategory(btn)}
            className={`px-3 py-1 rounded-md text-sm ${btn === selectedCategory ? 'bg-[var(--brand)] italic' : 'bg-bg-card'}`}
          >

            {btn} {/* Texto botao */}
          </button>
        ))}
      </div>

      {filteredNews.length === 0 ? <p>Nenhuma notícia encontrada para essa busca.</p> : (
        filteredNews.map(noticia => (
          <article key={noticia.id} className="bg-bg-card p-4 rounded-xl border border-text-muted/10 flex flex-col cursor-pointer" onClick={() => setSelectedNews(noticia)}>
            <span className="text-xs text-brand font-semibold">{noticia.category}</span>
            <h3 className="text-base font-bold mt-1">{noticia.title}</h3>
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
