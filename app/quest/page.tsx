import Title from '@/components/Title'
import { Locate } from 'lucide-react'
import React from 'react'
import { unstable_cacheTag as cacheTag } from 'next/cache'
import { db } from '@/db'
import { charactersTable, classesTable, racesTable } from '@/db/schema'
import { eq } from 'drizzle-orm'
import QuestItem from '@/components/QuestItem'

async function getCharacters() {
    "use cache"
    cacheTag('characters')
    return await db
        .select({
            id: charactersTable.id,
            name: charactersTable.name,
            race: racesTable.name,
            class: classesTable.name,
            level: charactersTable.level,
            image: charactersTable.image,
        }).from(charactersTable)
        .leftJoin(classesTable, eq(charactersTable.class, classesTable.id))
        .leftJoin(racesTable, eq(charactersTable.race, racesTable.id))
}




async function QuestPage() {
    const characters = await getCharacters()
    const charactersName = characters.map((character) => character.name)

    const quests = [{
        id: 1,
        name: 'La Gema Perdida del Dragón',
        description: 'El mercader Thorne ha perdido una gema mágica de gran valor que fue robada por bandidos. La gema tiene poderes de protección y es esencial para su negocio.',
        ubication: 'Bosque de los Susurros',
        characters: charactersName.sort(() => Math.random() - 0.5).slice(0, 3),
        status: 'En progreso',
        objectives: ["Encontrar la gema perdida", "Luchar contra los bandidos", "Entregar la gema a Thorne"],
        givenBy: 'Thorne el Mercader',
        rewardBy: 'Thorne el Mercader',
        date: '2025-01-01'
    },
    {
        id: 2,
        name: "El Misterio de la Torre Abandonada",
        description: "Un misterioso y antiguo castillo ha aparecido en el bosque de los Susurros. Los habitantes locales aseguran que el castillo está lleno de espíritus malignos y que nadie ha entrado en él sin salir vivo. Un grupo de aventureros ha sido contratado para investigar el castillo y resolver el misterio.",
        ubication: "Bosque de los Susurros",
        characters: charactersName.sort(() => Math.random() - 0.5).slice(0, 3),
        status: "En progreso",
        objectives: ["Investigar el castillo", "Luchar contra los espíritus malignos", "Resolver el misterio"],
        givenBy: "Thorne el Mercader",
        rewardBy: "Thorne el Mercader",
        date: "2025-01-01"
    },
    {
        id: 3,
        name: "Rescate en las Minas Profundas",
        description: "Un grupo de mineros ha quedado atrapado en las minas después de un derrumbe. Se necesita un rescate urgente antes de que se agote el aire.",
        ubication: "Minas de Piedra Gris",
        characters: charactersName.sort(() => Math.random() - 0.5).slice(0, 2),
        status: "Finalizada",
        objectives: ["Rescatar a los mineros", "Luchar contra los monstruos", "Entregar a los mineros a Thorne"],
        givenBy: "Thorne el Mercader",
        rewardBy: "Thorne el Mercader",
        date: "2025-01-01"
    }
    ]
    console.log(charactersName)
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col gap-2 mb-6">
                <Title title='Gestor de misiones' icon={<Locate />} />
                <h2 className="mt-2 text-muted-foreground">Crea, gestiona y asigna misiones a los personajes de tu campaña</h2>
            </div>

            <div className='flex flex-col gap-4'>
                {quests.map((quest) => (
                    <QuestItem key={quest.id} quest={quest} />
                ))}
            </div>
        </div>
    )
}

export default QuestPage