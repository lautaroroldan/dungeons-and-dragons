import React from 'react'
import { Card, CardContent, CardFooter } from './ui/card'
import { Badge } from './ui/badge'
import Image from 'next/image'
import Link from 'next/link'

function CharacterCard({ name, race, type, level, image, id }: { name: string, race: string, type: string, level: number, image: string, id: number }) {
    return (
        <Link href={`/personajes/${id}`} key={id}>
            <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
                <div className="aspect-square relative">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover"
                        unoptimized
                    />
                </div>
                <CardContent className="p-4">
                    <h2 className="text-xl font-bold">{name}</h2>
                    <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="outline">{race}</Badge>
                        <Badge variant="secondary">{type}</Badge>
                        <Badge>Nivel {level}</Badge>
                    </div>
                </CardContent>
                <CardFooter className="bg-muted/50 p-4">
                    <span className="text-sm text-muted-foreground">Ver perfil completo</span>
                </CardFooter>
            </Card>
        </Link>
    )
}

export default CharacterCard