import Title from '@/components/Title'
import { Locate, MapPin, Users } from 'lucide-react'
import React from 'react'
import { unstable_cacheTag as cacheTag } from 'next/cache'
import { db } from '@/db'
import { charactersTable, classesTable, racesTable } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'


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


function QuestItem({ characters }: { characters: string[] }) {

    const quest = {
        name: 'La Gema Perdida del Dragón',
        description: 'El mercader Thorne ha perdido una gema mágica de gran valor que fue robada por bandidos. La gema tiene poderes de protección y es esencial para su negocio.',
        ubication: 'Bosque de los Susurros',
        characters: characters.sort(() => Math.random() - 0.5).slice(0, 3),
        status: 'En progreso',
        givenBy: 'Thorne el Mercader',
        date: '2025-01-01',
    }

    return (
        <Card
            className='border-l-4 border-l-blue-500 hover:shadow-lg transition-all duration-200'
        >
            <div className="flex">
                <div className="w-16 bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-2 border-r">
                    <p className='text-xs px-1 py-0.5 rotate-90 whitespace-nowrap text-black font-semibold text-shadow-lg text-shadow-blue-500'>
                        {quest.status}
                    </p>
                </div>
                <div className='flex-1'>
                    <CardHeader>
                        <CardTitle>{quest.name}</CardTitle>
                        <CardDescription>{quest.description}</CardDescription>
                    </CardHeader>
                    <CardContent className='flex flex-col gap-2'>
                        <section className='flex gap-4'>
                            <div className='flex gap-1 text-xs text-muted-foreground items-center'>
                                <MapPin className='w-4 h-4' />
                                <p>{quest.ubication}</p>
                            </div>
                            <div className='flex gap-1 text-xs text-muted-foreground items-center'>
                                <Users className='w-4 h-4' />
                                <p>3</p>
                            </div>
                        </section>
                        <div className='flex gap-2 text-xs'>
                            {quest.characters.map((character) => (
                                <Badge key={character} variant='secondary'>{character}</Badge>
                            ))}
                        </div>
                        <Separator className='my-2' />
                        <div className='flex gap-2 text-xs'>
                            <p>{quest.givenBy}</p>
                            <p>•</p>
                            <p>{quest.date}</p>
                        </div>
                    </CardContent>
                </div>
            </div>
        </Card>
    )
}

async function QuestPage() {
    const characters = await getCharacters()
    const charactersName = characters.map((character) => character.name)
    console.log(charactersName)
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col gap-2 mb-6">
                <Title title='Gestor de misiones' icon={<Locate />} />
                <h2 className="mt-2 text-muted-foreground">Crea, gestiona y asigna misiones a los personajes de tu campaña</h2>
            </div>

            <QuestItem characters={charactersName} />
        </div>
    )
}

export default QuestPage