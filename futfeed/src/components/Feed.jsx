import { mockNews } from "../data/news"

export const Feed = ({ league, searchTeam }) => {

  const filteredNews = mockNews.filter(news => {
    if (news.league === league && news.title.toLowerCase().includes(searchTeam.toLowerCase())) {
      return true
    }
  })

  return (
    <main className="max-w-4xl mx-auto p-6 flex flex-col gap-4">
      {filteredNews.length === 0 ? <p>Nenhuma notícia encontrada para essa busca.</p> : (
        filteredNews.map(noticia => (
          <article key={noticia.id} className="bg-bg-card p-4 rounded-xl border border-text-muted/10 flex flex-col">
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
    </main>
  )
}
