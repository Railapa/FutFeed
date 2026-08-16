import { useState, useEffect } from 'react'

const GNEWS_API_KEY = import.meta.env.VITE_GNEWS_API_KEY

const leagueSearchTerms = {
  'Brasileirão Série A': 'Brasileirão OR "Série A"',
  'brasileirao': 'Brasileirão OR "Série A"',
  'Champions League': '"Champions League"',
  'champions': '"Champions League"',
  'Premier League': '"Premier League"',
  'premier': '"Premier League"',
  'La Liga': '"La Liga"',
  'laliga': '"La Liga"'
}

const categoryQueryMap = {
  'noticia': '',
  'mercado': ' AND (contratação OR transferência OR "mercado da bola")',
  'pos-jogo': ' AND (resultado OR jogo OR partida OR placar)'
}

export const Feed = ({ league, searchTeam }) => {
  const [news, setNews] = useState([])
  const [activeTab, setActiveTab] = useState('todas')
  const [retryCount, setRetryCount] = useState(0)
  const [savedNews, setSavedNews] = useState(() => {
    const saved = localStorage.getItem('futfeed_saved_news')
    return saved ? JSON.parse(saved) : []
  })
  const [selectedNews, setSelectedNews] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    localStorage.setItem('futfeed_saved_news', JSON.stringify(savedNews))
  }, [savedNews])

  const toggleSave = (article) => {
    setSavedNews(prev => {
      const exists = prev.some(item => item.url === article.url)
      if (exists) {
        return prev.filter(item => item.url !== article.url)
      } else {
        return [...prev, article]
      }
    })
  }

  useEffect(() => {
    if (activeTab === 'salvas') return

    let ignore = false

    const fetchNews = async () => {
      setIsLoading(true)
      setError(false)

      const leagueTerm = leagueSearchTerms[league] || 'futebol'
      const categoryTerm = categoryQueryMap[activeTab] || ''
      const searchTerm = searchTeam ? ` AND ${searchTeam}` : ''
      
      const queryStr = `${leagueTerm}${categoryTerm}${searchTerm}`
      const url = `/api/gnews/search?q=${encodeURIComponent(queryStr)}&lang=pt&country=br&max=10&apikey=${GNEWS_API_KEY}`

      try {
        const res = await fetch(url)
        if (!res.ok) throw new Error("Erro de resposta da API de notícias")

        const data = await res.json()
        
        if (!ignore) {
          if (data.articles && data.articles.length > 0) {
            setNews(data.articles)
          } else {
            setNews([])
          }
        }
      } catch (err) {
        if (!ignore) {
          console.log("Erro na API de Notícias:", err)
          setError(true)
          setNews([])
        }
      } finally {
        if (!ignore) {
          setIsLoading(false)
        }
      }
    }

    fetchNews()

    return () => {
      ignore = true
    }
  }, [league, activeTab, searchTeam, retryCount])

  const displayNews = activeTab === 'salvas' ? savedNews : news

  const getBadgeText = (tab) => {
    if (tab === 'mercado') return '#Mercado'
    if (tab === 'pos-jogo') return '#Pós-Jogo'
    if (tab === 'salvas') return '#Salva'
    return '#Notícia'
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
        {[
          { id: 'todas', label: 'Todas' },
          { id: 'noticia', label: 'Notícia' },
          { id: 'mercado', label: 'Mercado' },
          { id: 'pos-jogo', label: 'Pós-jogo' },
          { id: 'salvas', label: `Salvas (${savedNews.length})` }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? 'bg-[var(--brand)] text-bg-main shadow-md shadow-[var(--brand)]/20'
                : 'bg-white/5 text-text-muted hover:bg-white/10 hover:text-text-main'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab !== 'salvas' && isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
          {[1, 2, 3, 4].map(n => (
            <div key={n} className="h-64 bg-white/5 rounded-2xl"></div>
          ))}
        </div>
      ) : activeTab !== 'salvas' && error ? (
        <div className="py-12 text-center bg-white/5 rounded-2xl ring-1 ring-white/5 p-6 flex flex-col items-center gap-3">
          <p className="text-red-400 font-semibold text-sm">
            Não foi possível carregar notícias desta competição no momento.
          </p>
          <p className="text-text-muted text-xs max-w-md">
            O limite diário de requisições da API pode ter sido atingido ou ocorreu uma falha de conexão.
          </p>
          <button
            onClick={() => setRetryCount(prev => prev + 1)}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-text-main text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 mt-2"
          >
            🔄 Tentar Novamente
          </button>
        </div>
      ) : displayNews.length === 0 ? (
        <div className="py-12 text-center bg-white/5 rounded-2xl ring-1 ring-white/5 p-6">
          <p className="text-text-muted font-medium text-sm">
            {activeTab === 'salvas' 
              ? 'Você ainda não salvou nenhuma notícia.' 
              : 'Nenhuma notícia encontrada para essa busca.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayNews.map((article, idx) => {
            const isSaved = savedNews.some(item => item.url === article.url)

            return (
              <div
                key={article.url || idx}
                className="group bg-bg-card rounded-2xl ring-1 ring-white/5 overflow-hidden flex flex-col justify-between hover:ring-[var(--brand)]/40 transition-all shadow-lg"
              >
                <div 
                  className="relative h-44 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedNews(article)}
                >
                  <img
                    src={article.image || 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800'}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent"></div>

                  <span className="absolute top-3 left-3 bg-green-500/90 text-bg-main text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-sm">
                    {getBadgeText(activeTab)}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleSave(article)
                    }}
                    className={`absolute top-3 right-3 p-1.5 rounded-lg backdrop-blur-md transition-all cursor-pointer ${
                      isSaved ? 'bg-[var(--brand)] text-bg-main' : 'bg-black/50 text-white hover:bg-black/70'
                    }`}
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                    </svg>
                  </button>
                </div>

                <div className="p-4 flex flex-col justify-between flex-1 gap-2">
                  <div className="cursor-pointer" onClick={() => setSelectedNews(article)}>
                    <h3 className="text-sm font-bold text-text-main group-hover:text-[var(--brand)] transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-text-muted mt-1 line-clamp-2">
                      {article.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-text-muted pt-2 border-t border-white/5">
                    <span className="font-semibold text-text-main truncate max-w-[120px]">
                      @{article.source?.name || 'FutFeed'}
                    </span>
                    <span>
                      {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('pt-BR') : 'Recente'}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {selectedNews && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#121824] rounded-2xl max-w-lg w-full overflow-hidden ring-1 ring-white/10 flex flex-col max-h-[90vh]">
            {selectedNews.image && (
              <img src={selectedNews.image} alt={selectedNews.title} className="w-full h-48 object-cover" />
            )}
            <div className="p-5 flex flex-col gap-3 overflow-y-auto">
              <span className="text-[10px] font-extrabold text-[var(--brand)] uppercase tracking-wider">
                {selectedNews.source?.name || 'Notícia'}
              </span>
              <h2 className="text-lg font-bold text-text-main">{selectedNews.title}</h2>
              <p className="text-xs text-text-muted leading-relaxed">{selectedNews.content || selectedNews.description}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-2">
                <a
                  href={selectedNews.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[var(--brand)] text-bg-main font-bold text-xs rounded-xl hover:opacity-90 transition-all"
                >
                  Ler matéria completa ↗
                </a>
                <button
                  onClick={() => setSelectedNews(null)}
                  className="px-4 py-2 bg-white/10 text-text-main font-bold text-xs rounded-xl hover:bg-white/20 transition-all cursor-pointer"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}