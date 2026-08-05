const classificacao = [
    {
        id: 1,
        position: 1,
        points: 29,
        team: 'Vitória',
        games: 12
    },
    {
        id: 2,
        position: 2,
        points: 19,
        team: 'Cruzeiro',
        games: 11
    },
    {
        id: 3,
        position: 3,
        points: 18,
        team: 'Vasco da Gama',
        games: 12
    },
    {
        id: 4,
        position: 4,
        points: 16,
        team: 'Flamengo',
        games: 11
    },
]

export const Standings = () => {
    return (
        <div className="bg-bg-card p-5 rounded-2xl border border-text-muted/10">

            <div>
                Classificação
            </div>

            <div className="flex justify-between">
                <div className="flex gap-4">
                    <span>#</span>
                    <span>Time</span>
                </div>

                <div className="flex gap-4">
                    <span>JG</span>
                    <span>PT</span>
                </div>
            </div>


            {classificacao.map(time => (
                <div key={time.id} className="flex justify-between">
                    <div className="flex gap-4">
                        <span>{time.position}</span>
                        <span>{time.team}</span>
                    </div>

                    <div className="flex gap-4">
                        <span>{time.games}</span>
                        <span>{time.points}</span>
                    </div>
                </div>
            ))}


            <div>
                Tabela Completa
            </div>
        </div>
    )
}
